import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/content";

export function GET() {
  const searchPosts = getBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
  }));
  return NextResponse.json(searchPosts);
}
