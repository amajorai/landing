import { Bot, Brain } from "lucide-react";
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
import { multiCompareConfig } from "@/lib/multi-compare-config";

export async function generateMetadata() {
  return genMeta({
    title: "Technology Comparisons",
    description:
      "Honest comparisons of popular web technologies, frameworks, LLMs, and AI agents: React vs Vue, Next.js vs Nuxt, Claude vs GPT, Cursor vs OpenHands, and more.",
    url: "/compare",
    tags: [
      "technology comparison",
      "LLM comparison",
      "AI agent comparison",
      "framework comparison",
      "React vs Vue",
      "Claude vs GPT",
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

  const stackItems = compareConfig.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${c.nameA} vs ${c.nameB}`,
    url: `${siteConfig.url}/compare/${c.slug}`,
  }));

  const multiItems = multiCompareConfig.map((c, i) => ({
    "@type": "ListItem",
    position: compareConfig.length + i + 1,
    name: c.title,
    url: `${siteConfig.url}/compare/${c.slug}`,
  }));

  const itemListJsonLd = generateJsonLd("ItemList", {
    name: "Technology Comparisons",
    itemListElement: [...stackItems, ...multiItems],
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
              line1="Comparisons"
              line2="Honest breakdowns to help you choose the right stack, model, or agent"
            />

            <p className="max-w-2xl text-muted-foreground leading-relaxed">
              Choosing between frameworks, platforms, LLMs, and AI agents is one
              of the most consequential decisions in any project. These
              comparisons are written by engineers who have shipped production
              applications with all of the options below.
            </p>
          </section>
        </FadeIn>

        {/* Section 1: Stacks */}
        <FadeIn>
          <section className="space-y-6">
            <div>
              <h2 className="font-semibold text-xl">Stacks &amp; Frameworks</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                1-on-1 comparisons of popular web frameworks, databases, and
                deployment platforms.
              </p>
            </div>
            <div className="-mx-6">
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
            </div>
          </section>
        </FadeIn>

        {/* Section 2: LLMs */}
        <FadeIn>
          <section className="space-y-6">
            <div>
              <h2 className="font-semibold text-xl">Large Language Models</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Proprietary models (Claude, GPT, Gemini, Grok) and open-weight
                models (Llama 4, DeepSeek V3.2, Gemma 4, MiniMax M2.5, Mistral,
                Qwen3.5) compared on benchmarks, pricing, and licensing.
              </p>
            </div>
            <div className="-mx-6">
              <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
                {multiCompareConfig
                  .filter((c) => c.category === "llm")
                  .map((c) => (
                    <Link
                      className="group block border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/30"
                      href={`/compare/${c.slug}` as any}
                      key={c.slug}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-border p-1 text-muted-foreground">
                          <Brain className="h-3 w-3" />
                        </span>
                        <span className="font-semibold text-sm">{c.title}</span>
                      </div>
                      <p className="mb-3 text-muted-foreground text-xs leading-relaxed">
                        {c.tagline}
                      </p>
                      {c.previewText && (
                        <p className="text-muted-foreground/60 text-xs">
                          {c.previewText}
                        </p>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Section 3: Agents */}
        <FadeIn>
          <section className="space-y-6">
            <div>
              <h2 className="font-semibold text-xl">AI Agents</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Coding agents compared on SWE-bench Verified, and the full Claw
                ecosystem of self-hosted personal AI assistants (OpenClaw,
                ZeroClaw, IronClaw, Hermes Agent, NanoClaw, NullClaw + more).
              </p>
            </div>
            <div className="-mx-6">
              <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
                {multiCompareConfig
                  .filter((c) => c.category === "agent")
                  .map((c) => (
                    <Link
                      className="group block border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/30"
                      href={`/compare/${c.slug}` as any}
                      key={c.slug}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-border p-1 text-muted-foreground">
                          <Bot className="h-3 w-3" />
                        </span>
                        <span className="font-semibold text-sm">{c.title}</span>
                      </div>
                      <p className="mb-3 text-muted-foreground text-xs leading-relaxed">
                        {c.tagline}
                      </p>
                      {c.previewText && (
                        <p className="text-muted-foreground/60 text-xs">
                          {c.previewText}
                        </p>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
