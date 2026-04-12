import { Suspense } from "react";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
  url: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <FadeIn>
        <h3 className="mb-4 font-semibold">blog</h3>
      </FadeIn>
      <Suspense
        fallback={
          <div className="text-muted-foreground text-sm">Loading...</div>
        }
      >
        <BlogPostList posts={posts} />
      </Suspense>
    </>
  );
}
