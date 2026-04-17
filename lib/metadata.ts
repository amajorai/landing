import type { Metadata } from "next";
import type { BlogPost, Page, Project } from "@/lib/notion";

export const siteConfig = {
  name: "A Major",
  description:
    "A Major is a Singapore-based software agency specialising in web design, software development, and digital solutions for businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://amajor.ai",
  ogImage: "https://amajor.ai/og/index.png",
  links: {
    twitter: "https://x.com/amajorai",
    github: "https://github.com/amajor",
  },
  authors: [{ name: "A Major Team" }],
  creator: "A Major",
  keywords: [
    "amajor.ai",
    "A Major",
    "Singapore",
    "founder-led",
    "software agency Singapore",
    "web development Singapore",
    "web design Singapore",
    "mobile app development Singapore",
    "SaaS development Singapore",
    "enterprise software Singapore",
    "e-commerce development Singapore",
    "technical consultancy Singapore",
    "Next.js agency Singapore",
    "React developer Singapore",
    "web app development",
    "custom software development",
    "MVP development",
    "startup development",
    "full stack development",
    "AI agents",
    "AI runtime",
    "agent orchestration",
    "MCP server development",
    "MCP server Singapore",
    "AI agent development Singapore",
    "Model Context Protocol",
    "LLM integration",
    "AI infrastructure Singapore",
    "Ryu orchestration",
    "web design",
    "software development",
    "digital solutions",
  ],
};

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  category?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  crawlDelay?: number;
}

export function generateMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
    category,
    noIndex,
    noFollow,
    crawlDelay,
  } = options;

  const pageTitle =
    title && title !== siteConfig.name
      ? `${title} • ${siteConfig.name}`
      : siteConfig.name;
  const pageDescription = description || siteConfig.description;
  const pageUrl = url ? new URL(url, siteConfig.url) : siteConfig.url;

  // Use dynamic OG image route for per-page images
  let dynamicOgUrl = `${siteConfig.url}/api/og`;
  if (title && title !== siteConfig.name) {
    const params = new URLSearchParams({ title });
    if (description) params.set("subtitle", description.slice(0, 100));
    dynamicOgUrl = `${siteConfig.url}/api/og?${params.toString()}`;
  }

  // Use custom image if provided, otherwise use dynamic OG image
  const ogImageUrl = image || dynamicOgUrl;

  const openGraphImages = [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: title || siteConfig.name,
    },
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    applicationName: siteConfig.name,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    keywords: tags?.length
      ? [...new Set([...tags, ...siteConfig.keywords])]
      : siteConfig.keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: openGraphImages,
      locale: "en_US",
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      section: category,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
      creator:
        "@" +
        siteConfig.links.twitter.replace(
          /https?:\/\/(www\.)?(twitter\.com|x\.com)\//,
          ""
        ),
    },
    robots: {
      index: noIndex !== true,
      follow: noFollow !== true,
      googleBot: {
        index: noIndex !== true,
        follow: noFollow !== true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      ...(crawlDelay && { crawlDelay }),
    },
    other: {
      ...(publishedTime && { "article:published_time": publishedTime }),
      ...(modifiedTime && { "article:modified_time": modifiedTime }),
    },
  };
}

export function generateBlogMetadata(post: BlogPost): Metadata {
  const authorNames = post.authors?.map((author) => author.name) || [];

  return generateMetadata({
    title: post.title,
    description: extractDescription(post.description || ""),
    image: post.cover,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: authorNames,
    tags: post.tags,
    category: post.tags?.[0] || "blog",
  });
}

export function generatePageMetadata(page: Page): Metadata {
  return generateMetadata({
    title: page.title,
    description: page.description,
    image: page.cover,
    modifiedTime: page.lastEdited,
    url: `/${page.slug}`,
    type: "website",
  });
}

export function generateProjectMetadata(project: Project): Metadata {
  return generateMetadata({
    title: project.title,
    description: project.description,
    image: project.cover,
    url: `/projects/${project.slug}`,
    type: "article",
    category: "project",
    tags: project.techStack,
  });
}

export function generateServiceMetadata(service: {
  name: string;
  description: string;
  slug: string;
  pageType?: string;
  category?: string;
}): Metadata {
  const suffix = service.pageType === "offering" ? "Services" : "Development";
  return generateMetadata({
    title: `${service.name} ${suffix} | Singapore Software Agency`,
    description: service.description,
    url: `/services/${service.slug}`,
    tags: [
      service.name,
      `${service.name} Singapore`,
      `${service.name} agency`,
      "software development",
      "A Major",
    ],
  });
}

function extractDescription(content: string, maxLength = 160): string {
  if (!content) return "";
  // Remove markdown syntax
  const plainText = content
    .replace(/^#+\s+/gm, "") // Headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/\*(.*?)\*/g, "$1") // Italic
    .replace(/`(.*?)`/g, "$1") // Inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // Images
    .replace(/\n+/g, " ") // Newlines
    .trim();

  // Extract first sentence or truncate
  const sentences = plainText.split(". ");
  if (sentences[0] && sentences[0].length <= maxLength) {
    return sentences[0] + (sentences.length > 1 ? "." : "");
  }

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength).trim() + "..."
    : plainText;
}

export function generateJsonLd(type: string, data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

export function generateBreadcrumbJsonLd(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return generateJsonLd("BreadcrumbList", {
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  });
}

export function generateBlogJsonLd(post: BlogPost) {
  const authorNames = post.authors?.map((author) => author.name) || [];

  return generateJsonLd("BlogPosting", {
    headline: post.title,
    description: extractDescription(post.description || ""),
    image: post.cover ? [post.cover] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: authorNames.map((name) => ({
      "@type": "Person",
      name,
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  });
}
