import { NextResponse } from "next/server";
import { compareConfig } from "@/lib/compare-config";
import { getBlogPosts, getPages, getProjects } from "@/lib/notion";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

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
    "/services",
    "/products",
    "/consultancy",
    "/compare",
    ...posts.map((post) => `/blog/${post.slug}`),
    ...Array.from(
      new Set(posts.flatMap((post) => post.authors.map((a) => a.slug)))
    ).map((slug) => `/blog/author/${slug}`),
    ...pages.map((page) => `/${page.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...servicesConfig.map((service) => `/services/${service.slug}`),
    ...offeringsConfig.map((offering) => `/services/${offering.slug}`),
    ...compareConfig.map((comparison) => `/compare/${comparison.slug}`),
  ];

  return NextResponse.json(routes);
}
