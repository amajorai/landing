import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/notion";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const searchPosts = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
    }));
    return NextResponse.json(searchPosts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
