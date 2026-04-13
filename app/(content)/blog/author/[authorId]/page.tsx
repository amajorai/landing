import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ authorId: string }>;
}): Promise<Metadata> {
  const { authorId } = await params;
  const posts = await getBlogPosts();
  const author = posts
    .flatMap((p) => p.authors)
    .find((a) => a.slug === authorId);

  if (!author) return { title: "Author Not Found" };

  const authorPosts = posts.filter((p) =>
    p.authors.some((a) => a.slug === authorId)
  );

  return genMeta({
    title: author.name,
    description: `${authorPosts.length} post${authorPosts.length === 1 ? "" : "s"} by ${author.name}`,
    url: `/blog/author/${authorId}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;
  const posts = await getBlogPosts();

  const author = posts
    .flatMap((p) => p.authors)
    .find((a) => a.slug === authorId);

  if (!author) notFound();

  const authorPosts = posts.filter((p) =>
    p.authors.some((a) => a.slug === authorId)
  );

  return (
    <>
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
        <div className="mb-8 flex items-center gap-4">
          {author.avatar && (
            <img
              alt={author.name}
              className="h-16 w-16 rounded-full object-cover"
              src={author.avatar}
            />
          )}
          <div>
            <h1 className="font-medium text-2xl tracking-tight">
              {author.name}
            </h1>
            <p className="text-muted-foreground text-sm">
              {authorPosts.length} post{authorPosts.length === 1 ? "" : "s"}{" "}
              published
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <BlogPostList posts={authorPosts} />
      </FadeIn>
    </>
  );
}
