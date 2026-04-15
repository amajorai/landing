import type { MetadataRoute } from "next";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amajor.ai";
  const currentDate = new Date();

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
      url: `${baseUrl}/consultancy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const sections = [
    { path: "about", priority: 0.9, changeFreq: "monthly" as const },
    { path: "contact", priority: 0.8, changeFreq: "monthly" as const },
  ];

  sections.forEach((section) => {
    routes.push({
      url: `${baseUrl}/#${section.path}`,
      lastModified: currentDate,
      changeFrequency: section.changeFreq,
      priority: section.priority,
    });
  });

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

  const projects = [
    { name: "decosmic", priority: 0.8 },
    { name: "been-place", priority: 0.8 },
  ];

  projects.forEach((project) => {
    routes.push({
      url: `${baseUrl}/projects/${project.name}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: project.priority,
    });
  });

  return routes;
}
