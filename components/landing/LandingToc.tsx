"use client";

import type { TocHeading } from "@/components/notion/TableOfContents";
import { PageToc } from "@/components/ui/page-toc";

const BASE_SECTIONS: TocHeading[] = [
  { id: "about", text: "Who we are", level: 1 },
  { id: "process", text: "How we work", level: 1 },
  { id: "ryu", text: "The agency behind Ryu", level: 1 },
  { id: "services", text: "Why businesses choose us", level: 1 },
  { id: "what-we-do", text: "What we do", level: 1 },
  { id: "team", text: "Our founder", level: 1 },
  { id: "faq", text: "You should know these", level: 1 },
  { id: "partners", text: "Our partners", level: 1 },
  { id: "contact", text: "Ready to build?", level: 1 },
];

const PORTFOLIO_SECTION: TocHeading = {
  id: "portfolio",
  text: "Our work",
  level: 1,
};

interface LandingTocProps {
  hasProjects?: boolean;
}

export function LandingToc({ hasProjects = false }: LandingTocProps) {
  const sections = hasProjects
    ? [
        BASE_SECTIONS[0],
        BASE_SECTIONS[1],
        PORTFOLIO_SECTION,
        ...BASE_SECTIONS.slice(2),
      ]
    : BASE_SECTIONS;

  return <PageToc headings={sections} />;
}
