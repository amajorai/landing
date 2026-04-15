import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/notion";
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

  const [blogPosts, projects] = await Promise.all([
    getBlogPosts().catch(() => []),
    getProjects().catch(() => []),
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
  ];

  offeringsConfig.forEach((offering) => {
    routes.push({
      url: `${baseUrl}/services/${offering.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
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
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
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

  return routes;
}
