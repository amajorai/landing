import type { MetadataRoute } from "next";
import { compareConfig } from "@/lib/compare-config";
import { getBlogPosts, getPages } from "@/lib/content";
import { multiCompareConfig } from "@/lib/multi-compare-config";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amajor.ai";

  const blogPosts = getBlogPosts();
  const pages = getPages();

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl },
    { url: `${baseUrl}/services` },
    { url: `${baseUrl}/agency` },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/products` },
    { url: `${baseUrl}/products/ryu` },
    { url: `${baseUrl}/products/backstage` },
    { url: `${baseUrl}/consultancy` },
    { url: `${baseUrl}/compare` },
  ];

  offeringsConfig.forEach((offering) => {
    routes.push({ url: `${baseUrl}/services/${offering.slug}` });
  });

  compareConfig.forEach((comparison) => {
    routes.push({ url: `${baseUrl}/compare/${comparison.slug}` });
  });

  multiCompareConfig.forEach((c) => {
    routes.push({ url: `${baseUrl}/compare/${c.slug}` });
  });

  servicesConfig.forEach((service) => {
    routes.push({ url: `${baseUrl}/services/${service.slug}` });
  });

  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.lastEdited ?? post.date),
    });
  });

  const authorSlugs = Array.from(
    new Set(blogPosts.flatMap((p) => p.authors?.map((a) => a.slug) ?? []))
  );
  authorSlugs.forEach((slug) => {
    routes.push({ url: `${baseUrl}/blog/author/${slug}` });
  });

  pages.forEach((page) => {
    routes.push({ url: `${baseUrl}/${page.slug}` });
  });

  return routes;
}
