import { NextResponse } from "next/server";
import {
  getBlogPost,
  getMarkdown,
  markdownToPlainText,
  readingTimeMinutes,
} from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = getBlogPost(slug);

  if (!result) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const { post, entry } = result;
  const text = markdownToPlainText(await getMarkdown(entry));

  return NextResponse.json({
    title: post.title,
    date: post.date,
    description: post.description,
    readingTime: readingTimeMinutes(text),
    cover: post.cover,
  });
}
