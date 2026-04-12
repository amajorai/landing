/**
 * Converts plain text to the form that TTS engines will speak.
 * URLs are skipped (browsers don't read them naturally), and other
 * characters map 1-to-1 so highlight offsets stay accurate.
 */
export function toSpeechText(text: string): string {
  return text.replace(/https?:\/\/\S+/g, "");
}

/**
 * Builds a mapping between "spoken text" (what TTS reads) and the
 * original display text. Returns:
 *  - spokenText: the transformed string the TTS engine will say
 *  - spokenToOriginal: for each spoken char index, the corresponding
 *    original char index. Used to map TTS boundary events back to the
 *    display text for per-word highlighting.
 */
export function buildSpeechTextMapping(plainText: string): {
  spokenText: string;
  spokenToOriginal: number[];
} {
  const spokenToOriginal: number[] = [];
  let spokenText = "";

  const urlRegex = /https?:\/\/\S+/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: intentional loop pattern
  while ((match = urlRegex.exec(plainText)) !== null) {
    for (let i = lastIndex; i < match.index; i++) {
      spokenToOriginal.push(i);
      spokenText += plainText[i];
    }
    lastIndex = match.index + match[0].length;
  }

  for (let i = lastIndex; i < plainText.length; i++) {
    spokenToOriginal.push(i);
    spokenText += plainText[i];
  }

  return { spokenText, spokenToOriginal };
}
