import { loader } from "fumadocs-core/source";
import type { TOCItemType } from "fumadocs-core/toc";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { isValidElement, type ReactNode } from "react";
import { blog, pages } from "@/.source/server";
import type { TocHeading } from "@/components/content/TableOfContents";
import { isPublished, validPublicSlug } from "@/lib/content-visibility";

// Types
export interface Author {
  name: string;
  avatar?: string;
  slug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastEdited?: string;
  description: string;
  authors: Author[];
  tags: string[];
  tagColors?: Record<string, string>;
  cover?: string;
}

export interface Page {
  slug: string;
  title: string;
  cover?: string;
  lastEdited?: string;
  description?: string;
}

// Authors referenced by slug from blog frontmatter (`authors: [jiaweing]`)
export const authors: Record<string, Author> = {
  jiaweing: {
    slug: "jiaweing",
    name: "Jia Wei Ng",
    avatar: "/authors/jiaweing.png",
  },
};

// Tag name -> colour name (see lib/tag-colors.ts). Unlisted tags get a
// stable hash-based colour.
const TAG_COLORS: Record<string, string> = {
  Guides: "blue",
};

export const blogSource = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(
    blog.filter((entry) => !entry.draft),
    []
  ),
});

export const pagesSource = loader({
  baseUrl: "/",
  source: toFumadocsSource(
    pages.filter((entry) => !entry.draft),
    []
  ),
});

type BlogEntry = NonNullable<ReturnType<typeof blogSource.getPage>>;
type PageEntry = NonNullable<ReturnType<typeof pagesSource.getPage>>;

function toBlogPost(entry: BlogEntry): BlogPost {
  const { data } = entry;
  const slug = entry.slugs.join("/");
  return {
    slug,
    title: data.title,
    date: data.date.toISOString().slice(0, 10),
    lastEdited: data.lastModified?.toISOString(),
    description: data.description ?? "",
    authors: data.authors
      .map((authorSlug) => authors[authorSlug])
      .filter(Boolean),
    tags: data.tags,
    tagColors: Object.fromEntries(
      data.tags.filter((t) => TAG_COLORS[t]).map((t) => [t, TAG_COLORS[t]])
    ),
    cover: data.cover,
  };
}

function toPage(entry: PageEntry): Page {
  return {
    slug: entry.slugs.join("/"),
    title: entry.data.title,
    description: entry.data.description,
    cover: entry.data.cover,
  };
}

export function getBlogPosts(): BlogPost[] {
  // Publish dates are checked per request so scheduled posts go live on
  // their date without a redeploy.
  return blogSource
    .getPages()
    .filter((entry) => isPublished(entry.data))
    .map(toBlogPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string) {
  if (!validPublicSlug(slug)) return null;
  const entry = blogSource.getPage([slug]);
  if (!(entry && isPublished(entry.data))) return null;
  return { post: toBlogPost(entry), entry };
}

export function getPages(): Page[] {
  return pagesSource.getPages().map(toPage);
}

export function getPage(slug: string) {
  if (!validPublicSlug(slug)) return null;
  const entry = pagesSource.getPage([slug]);
  if (!entry) return null;
  return { page: toPage(entry), entry };
}

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return nodeToText(node.props.children);
  return "";
}

export function tocToHeadings(toc: TOCItemType[]): TocHeading[] {
  return toc
    .filter((item) => item.depth >= 1 && item.depth <= 3)
    .map((item) => ({
      id: item.url.replace(/^#/, ""),
      text: nodeToText(item.title),
      level: item.depth as 1 | 2 | 3,
    }));
}

/** Processed Markdown of an entry, for "copy as Markdown" and LLM use. */
export function getMarkdown(entry: BlogEntry | PageEntry): Promise<string> {
  return entry.data.getText("processed");
}

/** Plain text approximation of Markdown, for reading time and speech. */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---\n/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+\[[ xX]\]\s+/gm, "")
    .replace(/^\s*([-*+]|\d+\.)\s+/gm, "")
    .replace(/^\|?\s*-{3,}.*$/gm, "")
    .replace(/\|/g, " ")
    .replace(/(\*\*|__|~~|`)/g, "")
    .replace(/(^|\s)[*_](\S[^*_]*)[*_]/g, "$1$2")
    .replace(/\\([\\`*_{}[\]()#+\-.!<>|~])/g, "$1")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function readingTimeMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Text read aloud by the blog TTS player; stops at a "References" heading. */
export function markdownToSpeechText(markdown: string): string {
  const cut = markdown.search(/^#{1,6}\s+references\s*$/im);
  return markdownToPlainText(cut === -1 ? markdown : markdown.slice(0, cut));
}
