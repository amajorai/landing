import { NextResponse } from "next/server";
import { compareConfig } from "@/lib/compare-config";
import { getBlogPosts, getPages } from "@/lib/notion";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

export async function GET() {
  const [posts, pages] = await Promise.all([getBlogPosts(), getPages()]);

  const routes = [
    "/",
    "/blog",
    "/services",
    "/products",
    "/consultancy",
    "/compare",
    "/agency",
    "/products/ryu",
    ...posts.map((post) => `/blog/${post.slug}`),
    ...Array.from(
      new Set(posts.flatMap((post) => post.authors.map((a) => a.slug)))
    ).map((slug) => `/blog/author/${slug}`),
    ...pages.map((page) => `/${page.slug}`),
    ...servicesConfig.map((service) => `/services/${service.slug}`),
    ...offeringsConfig.map((offering) => `/services/${offering.slug}`),
    ...compareConfig.map((comparison) => `/compare/${comparison.slug}`),
  ];

  return NextResponse.json(routes);
}
