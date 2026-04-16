import type { MetadataRoute } from "next";
import { compareConfig } from "@/lib/compare-config";
import { multiCompareConfig } from "@/lib/multi-compare-config";
import { getBlogPosts, getPages, getProjects } from "@/lib/notion";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://amajor.ai";
  const currentDate = new Date();

  const [blogPosts, projects, pages] = await Promise.all([
    getBlogPosts().catch(() => []),
    getProjects().catch(() => []),
    getPages().catch(() => []),
  ]);

  const routes: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultancy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  offeringsConfig.forEach((offering) => {
    routes.push({
      url: `${baseUrl}/services/${offering.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  compareConfig.forEach((comparison) => {
    routes.push({
      url: `${baseUrl}/compare/${comparison.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  multiCompareConfig.forEach((c) => {
    routes.push({
      url: `${baseUrl}/compare/${c.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  servicesConfig.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date ?? currentDate),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Blog author pages
  const authorSlugs = Array.from(
    new Set(blogPosts.flatMap((p) => p.authors?.map((a) => a.slug) ?? []))
  );
  authorSlugs.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/blog/author/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  projects.forEach((project) => {
    routes.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // Static CMS pages (about, manifesto, story, etc.)
  pages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page.lastEdited),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
