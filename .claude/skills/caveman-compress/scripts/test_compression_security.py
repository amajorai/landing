import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from . import compress

class CompressionBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.target = self.root / "note.md"
        self.target.write_text("# Heading\nThis is ordinary natural language.\n")
        self.victim = self.root / "victim.md"
        self.victim.write_text("keep")
    def tearDown(self):
        self.temp.cleanup()
    def test_target_and_ancestor_links_are_rejected(self):
        linked = self.root / "link.md"
        linked.symlink_to(self.victim)
        with self.assertRaises(OSError): compress.compress_file(linked)
        directory = self.root / "linked-dir"
        directory.symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(OSError): compress.compress_file(directory / "note.md")
        self.assertEqual(self.victim.read_text(), "keep")
    def test_backup_links_and_files_are_never_overwritten(self):
        backup = self.root / "note.original.md"
        for destination in [self.victim, self.root / "missing"]:
            backup.symlink_to(destination)
            with self.assertRaises(FileExistsError): compress.compress_file(self.target)
            backup.unlink()
        backup.write_text("old backup")
        with self.assertRaises(FileExistsError): compress.compress_file(self.target)
        self.assertEqual(backup.read_text(), "old backup")
    def test_swap_during_model_call_cannot_write_victim(self):
        def swap(_):
            self.target.unlink()
            self.target.symlink_to(self.victim)
            return "# Heading\nOrdinary words.\n"
        with patch.object(compress, "call_claude", side_effect=swap):
            with self.assertRaises(RuntimeError): compress.compress_file(self.target)
        self.assertEqual(self.victim.read_text(), "keep")
    def test_success_and_failed_validation_preserve_contract(self):
        original = self.target.read_text()
        with patch.object(compress, "call_claude", return_value="# Heading\nOrdinary words.\n"):
            self.assertTrue(compress.compress_file(self.target))
        self.assertEqual((self.root / "note.original.md").read_text(), original)
        (self.root / "note.original.md").unlink()
        self.target.write_text(original)
        with patch.object(compress, "call_claude", return_value="Lost heading"):
            self.assertFalse(compress.compress_file(self.target))
        self.assertEqual(self.target.read_text(), original)
        self.assertEqual((self.root / "note.original.md").read_text(), original)

    def test_model_time_backup_swap_never_deletes_replacement_or_changes_source(self):
        original = self.target.read_text()
        backup = self.root / "note.original.md"
        def swap(_):
            if backup.read_text() != "replacement":
                backup.unlink()
                backup.write_text("replacement")
            return "Lost heading"
        with patch.object(compress, "call_claude", side_effect=swap):
            self.assertFalse(compress.compress_file(self.target))
        self.assertEqual(backup.read_text(), "replacement")
        self.assertEqual(self.target.read_text(), original)
        backup.unlink()
        def swap_valid(_):
            backup.unlink()
            backup.write_text("replacement")
            return "# Heading\nOrdinary words.\n"
        with patch.object(compress, "call_claude", side_effect=swap_valid):
            with self.assertRaises(RuntimeError): compress.compress_file(self.target)
        self.assertEqual(self.target.read_text(), original)
