import type { MetadataRoute } from "next";

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
  const baseUrl = "https://base7.com";
  const currentDate = new Date();

  // Main pages
  const routes: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Section anchors
  const sections = [
    { path: "about", priority: 0.9, changeFreq: "monthly" as const },
    { path: "services", priority: 0.9, changeFreq: "monthly" as const },
    { path: "contact", priority: 0.8, changeFreq: "monthly" as const },
  ];

  // Add section anchors
  sections.forEach((section) => {
    routes.push({
      url: `${baseUrl}/#${section.path}`,
      lastModified: currentDate,
      changeFrequency: section.changeFreq,
      priority: section.priority,
    });
  });

  // Projects
  const projects = [
    { name: "decosmic", priority: 0.8 },
    { name: "been-place", priority: 0.8 },
  ];

  // Add project pages (if they exist as separate pages)
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
