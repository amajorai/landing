// Map Notion tag colors to Tailwind background classes
export const TAG_COLOR_CLASSES = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
] as const;

// Map Notion color names to Tailwind classes
export const NOTION_TAG_COLOR_CLASS_MAP: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  sky: "bg-sky-500",
  gray: "bg-gray-500",
  grey: "bg-gray-500",
  brown: "bg-amber-700",
};

/**
 * Get the appropriate Tailwind background class for a tag.
 * Uses Notion color if available, otherwise falls back to hash-based color.
 */
export function getTagColorClass(tag: string, notionColor?: string): string {
  if (notionColor && NOTION_TAG_COLOR_CLASS_MAP[notionColor]) {
    return NOTION_TAG_COLOR_CLASS_MAP[notionColor];
  }

  // Fallback: hash-based color selection
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash << 5) - hash + tag.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % TAG_COLOR_CLASSES.length;
  return TAG_COLOR_CLASSES[index];
}
