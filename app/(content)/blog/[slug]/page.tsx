import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogAuthor } from "@/components/blog/BlogAuthor";
import { BlogTextToSpeech } from "@/components/blog/BlogTextToSpeech";
import { MobileTocSheet } from "@/components/blog/MobileTocSheet";
import { NotionRenderer } from "@/components/markdown-renderer";
import { ReadingTime } from "@/components/notion/ReadingTime";
import { TableOfContents } from "@/components/notion/TableOfContents";
import { FadeIn } from "@/components/ui/fade-in";
import {
  extractDescriptionFromBlocks,
  extractHeadingsFromBlocks,
  extractReadingTimeFromBlocks,
  getBlogPost,
  getBlogPosts,
} from "@/lib/notion";
import { highlightCode } from "@/lib/shiki";
import { getTagColorClass } from "@/lib/tag-colors";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

import { generateBlogJsonLd, generateBlogMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description = post.description || extractDescriptionFromBlocks(blocks);
  return generateBlogMetadata({ ...post, description });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingMinutes = extractReadingTimeFromBlocks(blocks);
  const headings = extractHeadingsFromBlocks(blocks);

  // Build Shiki-highlighted HTML map for all code blocks (server-side only)
  const highlightedCodeMap: Record<string, string> = {};
  await Promise.all(
    blocks
      .filter((b) => b.type === "code")
      .map(async (b) => {
        const code = (b as any).code.rich_text
          .map((t: any) => t.plain_text)
          .join("");
        const lang = (b as any).code.language;
        const html = await highlightCode(code, lang);
        if (html) highlightedCodeMap[b.id] = html;
      })
  );

  return (
    <>
      {/* Fixed TOC sidebar — only shown on wide viewports */}
      {headings.length > 0 && (
        <div className="fixed top-0 right-6 hidden h-screen w-64 items-center xl:flex">
          <TableOfContents headings={headings} />
        </div>
      )}
      {headings.length > 0 && <MobileTocSheet headings={headings} />}

      <FadeIn>
        <Link
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/blog"
        >
          <ArrowLeft className="h-4 w-4" />
          back to blog
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <header className="mb-4 space-y-4">
          <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
            {post.authors && post.authors.length > 0 && (
              <>
                <BlogAuthor authors={post.authors} avatarSize="medium" />
                <span>•</span>
              </>
            )}
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
            <ReadingTime minutes={readingMinutes} />
            {post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    className={`${getTagColorClass(tag, post.tagColors?.[tag])} rounded-full px-2.5 py-0.5 font-medium text-white text-xs`}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
      </FadeIn>

      {blocks && blocks.length > 0 && (
        <BlogTextToSpeech blocks={blocks}>
          <FadeIn delay={0.2} duration={0.5}>
            <div className="mt-10 mb-16">
              <NotionRenderer
                blocks={blocks}
                highlightedCodeMap={highlightedCodeMap}
              />
            </div>
          </FadeIn>
        </BlogTextToSpeech>
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogJsonLd(post)),
        }}
        type="application/ld+json"
      />
    </>
  );
}
