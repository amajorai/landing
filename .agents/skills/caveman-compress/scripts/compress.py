#!/usr/bin/env python3
"""
Caveman Memory Compression Orchestrator

Usage:
    python scripts/compress.py <filepath>
"""

import os
import re
import subprocess
import stat
import secrets
import tempfile
from pathlib import Path
from typing import List

OUTER_FENCE_REGEX = re.compile(
    r"\A\s*(`{3,}|~{3,})[^\n]*\n(.*)\n\1\s*\Z", re.DOTALL
)


def strip_llm_wrapper(text: str) -> str:
    """Strip outer ```markdown ... ``` fence when it wraps the entire output."""
    m = OUTER_FENCE_REGEX.match(text)
    if m:
        return m.group(2)
    return text

from .detect import should_compress
from .validate import validate_text

MAX_RETRIES = 2


# ---------- Claude Calls ----------


def call_claude(prompt: str) -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if api_key:
        try:
            import anthropic

            client = anthropic.Anthropic(api_key=api_key)
            msg = client.messages.create(
                model=os.environ.get("CAVEMAN_MODEL", "claude-sonnet-4-5"),
                max_tokens=8192,
                messages=[{"role": "user", "content": prompt}],
            )
            return strip_llm_wrapper(msg.content[0].text.strip())
        except ImportError:
            pass  # anthropic not installed, fall back to CLI
    # Fallback: use claude CLI (handles desktop auth)
    try:
        result = subprocess.run(
            ["claude", "--print"],
            input=prompt,
            text=True,
            capture_output=True,
            check=True,
        )
        return strip_llm_wrapper(result.stdout.strip())
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Claude call failed:\n{e.stderr}")


def build_compress_prompt(original: str) -> str:
    return f"""
Compress this markdown into caveman format.

STRICT RULES:
- Do NOT modify anything inside ``` code blocks
- Do NOT modify anything inside inline backticks
- Preserve ALL URLs exactly
- Preserve ALL headings exactly
- Preserve file paths and commands
- Return ONLY the compressed markdown body — do NOT wrap the entire output in a ```markdown fence or any other fence. Inner code blocks from the original stay as-is; do not add a new outer fence around the whole file.

Only compress natural language.

TEXT:
{original}
"""


def build_fix_prompt(original: str, compressed: str, errors: List[str]) -> str:
    errors_str = "\n".join(f"- {e}" for e in errors)
    return f"""You are fixing a caveman-compressed markdown file. Specific validation errors were found.

CRITICAL RULES:
- DO NOT recompress or rephrase the file
- ONLY fix the listed errors — leave everything else exactly as-is
- The ORIGINAL is provided as reference only (to restore missing content)
- Preserve caveman style in all untouched sections

ERRORS TO FIX:
{errors_str}

HOW TO FIX:
- Missing URL: find it in ORIGINAL, restore it exactly where it belongs in COMPRESSED
- Code block mismatch: find the exact code block in ORIGINAL, restore it in COMPRESSED
- Heading mismatch: restore the exact heading text from ORIGINAL into COMPRESSED
- Do not touch any section not mentioned in the errors

ORIGINAL (reference only):
{original}

COMPRESSED (fix this):
{compressed}

Return ONLY the fixed compressed file. No explanation.
"""


# ---------- Core Logic ----------


def compress_file(filepath: Path) -> bool:
    if not hasattr(os, "O_NOFOLLOW") or not os.supports_dir_fd:
        raise RuntimeError("Compression requires no-follow descriptor access on this platform")
    filepath = Path(os.path.abspath(filepath))
    descriptors = []
    source = None
    backup = None
    staged = None
    staged_name = None
    committed = False
    try:
        parent = os.open(filepath.anchor, os.O_RDONLY | os.O_DIRECTORY)
        descriptors.append(parent)
        for component in filepath.parts[1:-1]:
            parent = os.open(component, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=parent)
            descriptors.append(parent)
        source = os.open(filepath.name, os.O_RDWR | os.O_NOFOLLOW, dir_fd=parent)
        original_stat = os.fstat(source)
        if not stat.S_ISREG(original_stat.st_mode) or original_stat.st_size > 500_000:
            raise ValueError("Compression requires a regular file of at most 500KB")
        if original_stat.st_nlink != 1:
            raise ValueError("Compression target must not have hardlink aliases")
        original_bytes = os.read(source, 500_001)
        if len(original_bytes) > 500_000:
            raise ValueError("File too large to compress safely")
        original_text = original_bytes.decode("utf-8", errors="strict")
        # Detection reads a private snapshot, never reopens the caller's path.
        with tempfile.TemporaryDirectory(prefix="caveman-detect-") as snapshot_dir:
            snapshot = Path(snapshot_dir) / filepath.name
            snapshot.write_text(original_text)
            if not should_compress(snapshot):
                return False
        backup_name = filepath.stem + ".original.md"
        # Exclusive creation rejects existing files and both live/dangling links.
        backup = os.open(backup_name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600, dir_fd=parent)
        with os.fdopen(os.dup(backup), "wb") as output:
            output.write(original_bytes)
            output.flush()
            os.fsync(output.fileno())
        compressed = call_claude(build_compress_prompt(original_text))
        for attempt in range(MAX_RETRIES):
            result = validate_text(original_text, compressed)
            if result.is_valid:
                break
            if attempt == MAX_RETRIES - 1:
                return False
            compressed = call_claude(build_fix_prompt(original_text, compressed, result.errors))
        # Revalidate the selected pathname after the model call, including all
        # retained ancestors: a renamed directory must not redirect the commit.
        check = os.open(filepath.anchor, os.O_RDONLY | os.O_DIRECTORY)
        try:
            for index, component in enumerate(filepath.parts[1:-1], start=1):
                next_check = os.open(component, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=check)
                os.close(check)
                check = next_check
                expected = os.fstat(descriptors[index])
                actual = os.fstat(check)
                if (actual.st_dev, actual.st_ino) != (expected.st_dev, expected.st_ino):
                    raise RuntimeError("Compression parent changed during processing")
        finally:
            os.close(check)
        current = os.stat(filepath.name, dir_fd=parent, follow_symlinks=False)
        if (current.st_dev, current.st_ino) != (original_stat.st_dev, original_stat.st_ino):
            raise RuntimeError("Compression target changed during processing")
        retained = os.stat(backup_name, dir_fd=parent, follow_symlinks=False)
        created = os.fstat(backup)
        if (retained.st_dev, retained.st_ino) != (created.st_dev, created.st_ino):
            raise RuntimeError("Compression backup changed during processing")
        encoded = compressed.encode("utf-8")
        if len(encoded) > 500_000:
            raise ValueError("Compressed output exceeds size limit")
        # Replace only the selected directory entry. A hardlink created during
        # the model call must never make an in-place write modify another path.
        staged_name = ".caveman-" + secrets.token_hex(16)
        staged = os.open(staged_name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600, dir_fd=parent)
        os.fchmod(staged, stat.S_IMODE(original_stat.st_mode))
        with os.fdopen(os.dup(staged), "wb") as output:
            output.write(encoded)
            output.flush()
            os.fsync(staged)
        os.rename(staged_name, filepath.name, src_dir_fd=parent, dst_dir_fd=parent)
        committed = True
        os.fsync(parent)
        return True
    finally:
        if staged is not None:
            if not committed:
                try:
                    entry = os.stat(staged_name, dir_fd=parent, follow_symlinks=False)
                    own = os.fstat(staged)
                    if (entry.st_dev, entry.st_ino) == (own.st_dev, own.st_ino):
                        os.unlink(staged_name, dir_fd=parent)
                except FileNotFoundError:
                    pass
            os.close(staged)
        if source is not None:
            os.close(source)
        if backup is not None:
            os.close(backup)
        for descriptor in reversed(descriptors):
            os.close(descriptor)
