import Link from "next/link";
import { CompareLogo } from "@/components/compare/compare-logo";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { compareConfig } from "@/lib/compare-config";
import {
  generateBreadcrumbJsonLd,
  generateJsonLd,
  generateMetadata as genMeta,
  siteConfig,
} from "@/lib/metadata";

export async function generateMetadata() {
  return genMeta({
    title: "Technology Comparisons | Singapore Software Agency",
    description:
      "Honest comparisons of popular web technologies, frameworks, and platforms — React vs Vue, Next.js vs Nuxt, Shopify vs WooCommerce, and more.",
    url: "/compare",
    tags: [
      "technology comparison",
      "framework comparison",
      "React vs Vue",
      "Shopify vs WooCommerce",
      "Singapore",
      "A Major",
    ],
  });
}

export default function ComparePage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Compare", url: `${siteConfig.url}/compare` },
  ]);

  const itemListJsonLd = generateJsonLd("ItemList", {
    name: "Technology Comparisons",
    itemListElement: compareConfig.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${c.nameA} vs ${c.nameB}`,
      url: `${siteConfig.url}/compare/${c.slug}`,
    })),
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />

      <div className="mx-auto max-w-4xl space-y-16">
        <FadeIn>
          <section className="space-y-8">
            <PageHeader
              line1="Technology Comparisons"
              line2="Honest breakdowns to help you choose the right stack"
              tag={
                <span className="relative -top-px inline-block rounded-full border border-border px-2 py-0.5 align-middle font-normal text-muted-foreground text-xs">
                  Compare
                </span>
              }
            />

            <p className="max-w-2xl text-muted-foreground leading-relaxed">
              Choosing between frameworks and platforms is one of the most
              consequential decisions in any project. These comparisons are
              written by engineers who have shipped production applications with
              all of the options below.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="-mx-6">
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              {compareConfig.map((comparison) => (
                <Link
                  className="group block border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/30"
                  href={`/compare/${comparison.slug}` as any}
                  key={comparison.slug}
                >
                  <div className="mb-3 flex items-center gap-2">
                    {comparison.logoA && (
                      <CompareLogo
                        alt={comparison.nameA}
                        logo={comparison.logoA}
                        logoDark={comparison.logoDarkA}
                        size={20}
                      />
                    )}
                    <span className="font-semibold text-sm">
                      {comparison.nameA}
                    </span>
                    <span className="text-muted-foreground text-xs">vs</span>
                    {comparison.logoB && (
                      <CompareLogo
                        alt={comparison.nameB}
                        logo={comparison.logoB}
                        logoDark={comparison.logoDarkB}
                        size={20}
                      />
                    )}
                    <span className="font-semibold text-sm">
                      {comparison.nameB}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {comparison.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
