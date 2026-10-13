import { NextResponse } from "next/server";
import { compareConfig } from "@/lib/compare-config";
import { getBlogPosts, getPages } from "@/lib/content";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

export function GET() {
  const posts = getBlogPosts();
  const pages = getPages();

  const routes = [
    "/",
    "/blog",
    "/products",
    "/products/ryu",
    "/products/backstage",
    "/services",
    "/consultancy",
    "/compare",
    "/agency",
    "/referral",
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
