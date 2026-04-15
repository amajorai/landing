import { ChevronRight, Minus, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceCta } from "@/components/services/service-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { compareConfig, getComparisonBySlug } from "@/lib/compare-config";
import {
  generateBreadcrumbJsonLd,
  generateJsonLd,
  generateMetadata as genMeta,
  siteConfig,
} from "@/lib/metadata";

export function generateStaticParams() {
  return compareConfig.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return genMeta({
    title: `${comparison.nameA} vs ${comparison.nameB} | Singapore Software Agency`,
    description: comparison.description,
    url: `/compare/${comparison.slug}`,
    tags: [
      comparison.nameA,
      comparison.nameB,
      `${comparison.nameA} vs ${comparison.nameB}`,
      `${comparison.nameA} or ${comparison.nameB}`,
      "comparison",
      "Singapore",
      "A Major",
    ],
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const pageUrl = `${siteConfig.url}/compare/${comparison.slug}`;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Compare", url: `${siteConfig.url}/compare` },
    {
      name: `${comparison.nameA} vs ${comparison.nameB}`,
      url: pageUrl,
    },
  ]);

  const faqJsonLd = generateJsonLd("FAQPage", {
    mainEntity: comparison.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });

  const winnerCount = { a: 0, b: 0, tie: 0 };
  for (const p of comparison.points) {
    if (p.winner) winnerCount[p.winner]++;
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />

      <div className="mx-auto max-w-4xl space-y-16">
        <FadeIn>
          <section className="space-y-8">
            <PageHeader
              line1={`${comparison.nameA} vs ${comparison.nameB}`}
              line2={comparison.tagline}
              tag={
                <span className="relative -top-px inline-block rounded-full border border-border px-2 py-0.5 align-middle font-normal text-muted-foreground text-xs">
                  Comparison
                </span>
              }
            />

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-muted-foreground/60 text-xs"
            >
              <Link
                className="transition-colors hover:text-foreground"
                href="/"
              >
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                className="transition-colors hover:text-foreground"
                href="/compare"
              >
                Compare
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-muted-foreground">
                {comparison.nameA} vs {comparison.nameB}
              </span>
            </nav>

            <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
              <p>{comparison.overview}</p>
            </div>
          </section>
        </FadeIn>

        {/* Score summary */}
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl">
              Head-to-head summary
            </h2>
            <div className="grid grid-cols-3 border-border border-t border-l border-dashed">
              <div className="border-border border-r border-b border-dashed p-6 text-center">
                <div className="font-bold text-3xl">{winnerCount.a}</div>
                <div className="mt-1 text-muted-foreground text-sm">
                  {comparison.nameA} wins
                </div>
              </div>
              <div className="border-border border-r border-b border-dashed p-6 text-center">
                <div className="font-bold text-3xl">{winnerCount.tie}</div>
                <div className="mt-1 text-muted-foreground text-sm">Ties</div>
              </div>
              <div className="border-border border-r border-b border-dashed p-6 text-center">
                <div className="font-bold text-3xl">{winnerCount.b}</div>
                <div className="mt-1 text-muted-foreground text-sm">
                  {comparison.nameB} wins
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Comparison table */}
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl">
              Detailed comparison
            </h2>
            <div className="border-border border-t border-dashed">
              {comparison.points.map((point) => {
                const WinIcon =
                  point.winner === "a"
                    ? TrendingUp
                    : point.winner === "b"
                      ? TrendingDown
                      : Minus;
                return (
                  <div
                    className="grid grid-cols-1 border-border border-b border-dashed sm:grid-cols-3"
                    key={point.category}
                  >
                    <div className="border-border border-b p-4 sm:border-r sm:border-b-0 sm:border-dashed">
                      <div className="flex items-center gap-2">
                        <WinIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {point.category}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`border-border border-b p-4 text-sm sm:border-r sm:border-b-0 sm:border-dashed ${point.winner === "a" ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      <div className="mb-1 font-medium text-muted-foreground/60 text-xs">
                        {comparison.nameA}
                      </div>
                      {point.a}
                    </div>
                    <div
                      className={`p-4 text-sm ${point.winner === "b" ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      <div className="mb-1 font-medium text-muted-foreground/60 text-xs">
                        {comparison.nameB}
                      </div>
                      {point.b}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>

        {/* Our verdict */}
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl">Our verdict</h2>
            <div className="border-border border-y border-dashed p-6">
              <div className="mb-2 font-semibold">
                {comparison.verdict === "tie"
                  ? "It's a tie — context determines the winner"
                  : `We recommend: ${comparison.verdict}`}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {comparison.verdictDetail}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* When to choose each */}
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl">
              When to choose each
            </h2>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              <div className="border-border border-r border-b border-dashed p-6">
                <h3 className="mb-4 font-semibold text-sm">
                  Choose {comparison.nameA} when:
                </h3>
                <ul className="space-y-2">
                  {comparison.whenToChooseA.map((item) => (
                    <li
                      className="flex items-start gap-2 text-muted-foreground text-sm"
                      key={item}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-border border-r border-b border-dashed p-6">
                <h3 className="mb-4 font-semibold text-sm">
                  Choose {comparison.nameB} when:
                </h3>
                <ul className="space-y-2">
                  {comparison.whenToChooseB.map((item) => (
                    <li
                      className="flex items-start gap-2 text-muted-foreground text-sm"
                      key={item}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* FAQ */}
        {comparison.faq.length > 0 && (
          <FadeIn>
            <section className="-mx-6">
              <h2 className="mb-6 px-6 font-semibold text-xl">
                Frequently asked questions
              </h2>
              <div className="border-border border-y border-dashed">
                <div className="px-6 py-6">
                  <Accordion className="w-full" collapsible type="single">
                    {comparison.faq.map((item, i) => (
                      <div className="group" key={i}>
                        <AccordionItem
                          className="border-none px-0 py-1"
                          value={`faq-${i}`}
                        >
                          <AccordionTrigger className="cursor-pointer font-semibold text-base hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {item.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {i < comparison.faq.length - 1 && (
                          <hr className="border-dashed" />
                        )}
                      </div>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Related services */}
        {comparison.relatedSlugs.length > 0 && (
          <FadeIn>
            <section>
              <h2 className="mb-2 font-semibold text-xl">Related services</h2>
              <p className="mb-6 text-muted-foreground text-sm">
                We build with both {comparison.nameA} and {comparison.nameB}.
                View our service pages for more detail.
              </p>
              <div className="grid grid-cols-2 border-border border-t border-l border-dashed sm:grid-cols-4">
                {comparison.relatedSlugs.map((slug) => (
                  <Link
                    className="group block border-border border-r border-b border-dashed p-4 transition-colors hover:bg-muted/30"
                    href={`/services/${slug}` as any}
                    key={slug}
                  >
                    <span className="font-medium text-sm group-hover:text-foreground">
                      {slug
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* CTA */}
        <FadeIn>
          <div className="-mx-6 -mb-16">
            <ServiceCta
              targetAudience="both"
              techName={`${comparison.nameA} or ${comparison.nameB}`}
            />
          </div>
        </FadeIn>
      </div>
    </>
  );
}
