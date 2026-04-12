import { NextResponse } from "next/server";
import { getBlogPosts, getPages, getProjects } from "@/lib/notion";

export async function GET() {
  const [posts, pages, projects] = await Promise.all([
    getBlogPosts(),
    getPages(),
    getProjects(),
  ]);

  const routes = [
    "/",
    "/blog",
    "/projects",
    ...posts.map((post) => `/blog/${post.slug}`),
    ...pages.map((page) => `/${page.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return NextResponse.json(routes);
}
