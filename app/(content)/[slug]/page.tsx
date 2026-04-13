import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MobileTocSheet } from "@/components/blog/MobileTocSheet";
import { NotionRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/notion/TableOfContents";
import { FadeIn } from "@/components/ui/fade-in";
import {
  extractDescriptionFromBlocks,
  extractHeadingsFromBlocks,
  getPage,
  getPages,
} from "@/lib/notion";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page, blocks } = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const description = page.description || extractDescriptionFromBlocks(blocks);
  return generatePageMetadata({ ...page, description });
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { page, blocks } = await getPage(slug);

  if (!page) {
    notFound();
  }

  const headings = extractHeadingsFromBlocks(blocks);

  return (
    <>
      {headings.length > 0 && (
        <div className="fixed top-0 right-6 hidden h-screen w-64 items-center xl:flex">
          <TableOfContents headings={headings} />
        </div>
      )}
      {headings.length > 0 && <MobileTocSheet headings={headings} />}
      <FadeIn>
        <h3 className="mb-4 font-semibold">{page.title}</h3>
      </FadeIn>

      {blocks && blocks.length > 0 && (
        <FadeIn delay={0.2} duration={0.5}>
          <div className="mb-16">
            <NotionRenderer blocks={blocks} />
          </div>
        </FadeIn>
      )}
    </>
  );
}
