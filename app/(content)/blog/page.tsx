import { Suspense } from "react";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Insights on software engineering, web design, AI, and technology from the A Major team, a Singapore software agency.",
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
  const posts = await getBlogPosts();

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
