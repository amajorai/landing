import { Bot, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TocHeading } from "@/components/notion/TableOfContents";
import { ServiceCta } from "@/components/services/service-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { PageToc } from "@/components/ui/page-toc";
import type {
  MultiComparisonConfig,
  MultiComparisonGroup,
} from "@/lib/multi-compare-config";

function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function CategoryBadge({ category }: { category: "llm" | "agent" }) {
  const Icon = category === "llm" ? Brain : Bot;
  return (
    <span className="relative -top-px inline-flex items-center rounded-full border border-border p-1 align-middle text-muted-foreground">
      <Icon className="h-3 w-3" />
    </span>
  );
}

function ContestantAvatar({
  name,
  logo,
  logoDark,
  color,
  size = 28,
}: {
  name: string;
  logo?: string | null;
  logoDark?: string | null;
  color?: string;
  size?: number;
}) {
  if (logo) {
    const hasDark = !!logoDark && logoDark !== logo;
    return (
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          alt={name}
          className={`max-h-full max-w-full object-contain${hasDark ? "dark:hidden" : ""}`}
          height={size}
          src={logo}
          width={size}
        />
        {hasDark && (
          <Image
            alt={name}
            className="hidden max-h-full max-w-full object-contain dark:block"
            height={size}
            src={logoDark!}
            width={size}
          />
        )}
      </span>
    );
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: color ?? "#6B7280",
      }}
    >
      {initials}
    </span>
  );
}

function ContestantBadge({
  name,
  logo,
  logoDark,
  color,
  badge,
}: {
  name: string;
  logo?: string | null;
  logoDark?: string | null;
  color?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border border-dashed px-3 py-2">
      <ContestantAvatar
        color={color}
        logo={logo}
        logoDark={logoDark}
        name={name}
        size={24}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-sm leading-none">{name}</span>
        {badge && (
          <span className="text-muted-foreground text-xs">{badge}</span>
        )}
      </div>
    </div>
  );
}

function ComparisonGroup({ group }: { group: MultiComparisonGroup }) {
  const contestantIds = group.contestants.map((c) => c.id);

  return (
    <div className="space-y-12">
      {/* Group header */}
      <div className="space-y-2">
        <h2 className="font-semibold text-xl">{group.groupTitle}</h2>
        {group.groupDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {group.groupDescription}
          </p>
        )}
      </div>

      {/* Contestants row */}
      <div className="flex flex-wrap gap-2">
        {group.contestants.map((c) => (
          <ContestantBadge
            badge={c.badge}
            color={c.color}
            key={c.id}
            logo={c.logo}
            logoDark={c.logoDark}
            name={c.name}
          />
        ))}
      </div>

      {/* Comparison table */}
      <div className="-mx-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-border border-b border-dashed">
                <th className="sticky left-0 z-10 bg-background px-6 py-3 text-left font-semibold text-sm">
                  Dimension
                </th>
                {group.contestants.map((c) => (
                  <th
                    className="px-4 py-3 text-left font-semibold text-sm"
                    key={c.id}
                  >
                    <div className="flex items-center gap-2">
                      <ContestantAvatar
                        color={c.color}
                        logo={c.logo}
                        logoDark={c.logoDark}
                        name={c.name}
                        size={20}
                      />
                      <span>{c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.points.map((point) => (
                <tr
                  className="border-border border-b border-dashed"
                  key={point.category}
                >
                  <td className="sticky left-0 z-10 bg-background px-6 py-4 font-medium text-sm">
                    {point.category}
                  </td>
                  {contestantIds.map((id) => (
                    <td
                      className={`px-4 py-4 text-sm leading-relaxed ${
                        point.bestFor === id
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                      key={id}
                    >
                      {point.values[id] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use cases */}
      <div className="-mx-6">
        <h3 className="mb-6 px-6 font-semibold text-lg">When to choose each</h3>
        <div
          className="grid border-border border-t border-l border-dashed"
          style={{
            gridTemplateColumns: `repeat(${Math.min(group.contestants.length, 3)}, minmax(0, 1fr))`,
          }}
        >
          {group.useCases.map((uc) => {
            const contestant = group.contestants.find(
              (c) => c.id === uc.contestant
            );
            return (
              <div
                className="border-border border-r border-b border-dashed p-6"
                key={uc.contestant}
              >
                <div className="mb-3 flex items-center gap-2">
                  {contestant && (
                    <ContestantAvatar
                      color={contestant.color}
                      logo={contestant.logo}
                      logoDark={contestant.logoDark}
                      name={contestant.name}
                      size={20}
                    />
                  )}
                  <h4 className="font-semibold text-sm">
                    {contestant?.name ?? uc.contestant}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {uc.reasons.map((reason) => (
                    <li
                      className="flex items-start gap-2 text-muted-foreground text-xs leading-relaxed"
                      key={reason}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MultiComparisonPage({
  config,
}: {
  config: MultiComparisonConfig;
}) {
  const tocHeadings: TocHeading[] = [
    ...config.groups.map((g) => ({
      id: toId(g.groupTitle),
      text: g.groupTitle,
      level: 1 as const,
    })),
    { id: "verdict", text: "Our verdict", level: 1 as const },
    { id: "references", text: "References", level: 1 as const },
    ...(config.faq.length > 0
      ? [{ id: "faq", text: "FAQ", level: 1 as const }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-16">
      <PageToc headings={tocHeadings} />

      {/* Header */}
      <FadeIn>
        <section className="space-y-8">
          <PageHeader
            line1={config.title}
            line2={config.tagline}
            tag={<CategoryBadge category={config.category} />}
          />
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            {config.overview}
          </p>
        </section>
      </FadeIn>

      {/* Groups */}
      {config.groups.map((group, i) => (
        <FadeIn delay={i * 0.05} key={group.groupTitle}>
          <section className="space-y-0" id={toId(group.groupTitle)}>
            <ComparisonGroup group={group} />
          </section>
        </FadeIn>
      ))}

      {/* Verdict */}
      <FadeIn>
        <section className="-mx-6" id="verdict">
          <h2 className="mb-6 px-6 font-semibold text-xl">Our verdict</h2>
          <div className="border-border border-y border-dashed p-6">
            <div className="mb-2 font-semibold">{config.verdict}</div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {config.verdictDetail}
            </p>
          </div>
        </section>
      </FadeIn>

      {/* References */}
      <FadeIn>
        <section className="-mx-6" id="references">
          <h2 className="mb-6 px-6 font-semibold text-xl">
            Sources &amp; References
          </h2>
          <div className="border-border border-y border-dashed px-6 py-6">
            <ol className="space-y-3">
              {config.references.map((ref, i) => (
                <li className="flex items-start gap-3 text-sm" key={ref.url}>
                  <span className="mt-0.5 shrink-0 font-mono text-muted-foreground/50 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <a
                      className="font-medium underline-offset-4 hover:underline"
                      href={ref.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {ref.title}
                    </a>
                    {ref.note && (
                      <p className="mt-0.5 text-muted-foreground text-xs">
                        {ref.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </FadeIn>

      {/* FAQ */}
      {config.faq.length > 0 && (
        <FadeIn>
          <section className="-mx-6" id="faq">
            <h2 className="mb-6 px-6 font-semibold text-xl">
              Frequently asked questions
            </h2>
            <div className="border-border border-y border-dashed">
              <div className="px-6 py-6">
                <Accordion className="w-full" collapsible type="single">
                  {config.faq.map((item, i) => (
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
                      {i < config.faq.length - 1 && (
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

      {/* Related comparisons */}
      {config.relatedSlugs.length > 0 && (
        <FadeIn>
          <section>
            <h2 className="mb-2 font-semibold text-xl">Related comparisons</h2>
            <p className="mb-6 text-muted-foreground text-sm">
              Explore more technology comparisons.
            </p>
            <div className="flex flex-wrap gap-2">
              {config.relatedSlugs.map((slug) => (
                <Link
                  className="rounded-md border border-border border-dashed px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted/30 hover:text-foreground"
                  href={`/compare/${slug}` as any}
                  key={slug}
                >
                  {slug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* CTA */}
      <FadeIn>
        <div className="-mx-6 -mb-16">
          <ServiceCta targetAudience="both" techName="AI" />
        </div>
      </FadeIn>
    </div>
  );
}
