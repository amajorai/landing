import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/content/mdx-components";
import { FadeIn } from "@/components/ui/fade-in";
import { PageToc } from "@/components/ui/page-toc";
import { getPage, getPages, tocToHeadings } from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getPage(slug);

  if (!result) {
    return {
      title: "Page Not Found",
    };
  }

  return generatePageMetadata(result.page);
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getPage(slug);

  if (!result) {
    notFound();
  }

  const { page, entry } = result;
  const MDX = entry.data.body;

  return (
    <>
      <PageToc headings={tocToHeadings(entry.data.toc)} />
      <FadeIn>
        <h3 className="mb-4 font-semibold">{page.title}</h3>
      </FadeIn>

      <FadeIn delay={0.2} duration={0.5}>
        <div className="mb-16">
          <MDX components={mdxComponents} />
        </div>
      </FadeIn>
    </>
  );
}
