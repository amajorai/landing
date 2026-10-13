function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Drafts are never public. Dated entries (blog posts) only go live on or
 * after their publish date, so posts can be scheduled by committing them early.
 */
export function isPublished(
  entry: { draft?: boolean; date?: Date },
  now: Date = new Date()
): boolean {
  if (entry.draft) return false;
  if (!entry.date) return true;
  return entry.date.toISOString().slice(0, 10) <= toDateKey(now);
}

export function validPublicSlug(slug: string): boolean {
  return (
    slug.length > 0 &&
    slug.length <= 200 &&
    !/[/\\\u0000-\u001f\u007f]/.test(slug) &&
    slug !== "." &&
    slug !== ".."
  );
}
