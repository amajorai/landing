import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogAuthor } from "@/components/blog/BlogAuthor";
import { BlogLLMMenu } from "@/components/blog/BlogLLMMenu";
import { BlogTextToSpeech } from "@/components/blog/BlogTextToSpeech";
import { mdxComponents } from "@/components/content/mdx-components";
import { ReadingTime } from "@/components/content/ReadingTime";
import { FadeIn } from "@/components/ui/fade-in";
import { PageToc } from "@/components/ui/page-toc";
import {
  getBlogPost,
  getBlogPosts,
  getMarkdown,
  markdownToPlainText,
  markdownToSpeechText,
  readingTimeMinutes,
  tocToHeadings,
} from "@/lib/content";
import { serializeJsonLd } from "@/lib/json-ld";
import {
  generateBlogJsonLd,
  generateBlogMetadata,
  siteConfig,
} from "@/lib/metadata";
import { getTagColorClass } from "@/lib/tag-colors";

export const revalidate = 3600;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getBlogPost(slug);

  if (!result) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogMetadata(result.post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getBlogPost(slug);

  if (!result) {
    notFound();
  }

  const { post, entry } = result;
  const MDX = entry.data.body;
  const markdown = await getMarkdown(entry);
  const readingMinutes = readingTimeMinutes(markdownToPlainText(markdown));
  const headings = tocToHeadings(entry.data.toc);

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    `date: "${post.date}"`,
    `url: "${postUrl}"`,
    post.tags.length ? `tags: ${JSON.stringify(post.tags)}` : undefined,
    "---",
  ]
    .filter(Boolean)
    .join("\n");
  const postMarkdown = `${frontmatter}\n\n# ${post.title}\n\n${markdown}`;

  return (
    <>
      <PageToc headings={headings} />

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
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <BlogLLMMenu
              postMarkdown={postMarkdown}
              postTitle={post.title}
              postUrl={postUrl}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
            {post.authors.length > 0 && (
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

      <BlogTextToSpeech text={markdownToSpeechText(markdown)}>
        <FadeIn delay={0.2} duration={0.5}>
          <div className="mt-10 mb-16">
            <MDX components={mdxComponents} />
          </div>
        </FadeIn>
      </BlogTextToSpeech>
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateBlogJsonLd(post)),
        }}
        type="application/ld+json"
      />
    </>
  );
}
