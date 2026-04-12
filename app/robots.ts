import type { MetadataRoute } from "next";

// Extended type to include custom properties
type ExtendedRobots = MetadataRoute.Robots & {
  llmsPath?: string;
  securityTxt?: string;
};

export default function robots(): ExtendedRobots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
    ],
    sitemap: "https://base7.com/sitemap.xml",
    llmsPath: "/llms.txt",
    securityTxt: "/.well-known/security.txt",
  };
}
