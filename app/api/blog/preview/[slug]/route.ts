import { NextResponse } from "next/server";
import {
  extractDescriptionFromBlocks,
  extractReadingTimeFromBlocks,
  getBlogPost,
} from "@/lib/notion";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const description = post.description || extractDescriptionFromBlocks(blocks);
  const readingTime = extractReadingTimeFromBlocks(blocks);

  return NextResponse.json({
    title: post.title,
    date: post.date,
    description,
    readingTime,
    cover: post.cover,
  });
}
