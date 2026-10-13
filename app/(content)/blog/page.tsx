import { Suspense } from "react";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { FadeIn } from "@/components/ui/fade-in";
import { getBlogPosts } from "@/lib/content";
import { generateMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Insights on AI agents, software engineering, and building for the agent era from the A Major team.",
  url: "/blog",
  tags: [
    "software engineering blog",
    "web development blog",
    "Singapore tech",
    "AI development",
    "software design",
    "Next.js",
    "React",
    "startup engineering",
    "A Major blog",
  ],
});

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <FadeIn>
        <h3 className="mb-4 font-semibold">Blog</h3>
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
