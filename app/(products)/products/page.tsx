import Link from "next/link";
import { GridScan } from "@/components/GridScan";
import { TriggerResize } from "@/components/trigger-resize";
import { CrossMark } from "@/components/ui/cross-mark";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Products",
  description:
    "Most AI agents didn't deliver. A Major builds the ones that do — starting with Ryu, end-to-end managed infrastructure for AI agents.",
  url: "/products",
  tags: [
    "AI agents",
    "AI agent infrastructure",
    "agent-native products",
    "Ryu",
    "Ryu AI agents",
    "managed AI infrastructure",
    "agent orchestration",
    "LLM integration",
    "MCP server",
    "A Major Products",
  ],
});

const PRODUCTS = [
  {
    slug: "ryu",
    name: "Ryu",
    tagline: "End-to-end managed infrastructure for AI agents",
    description:
      "The engines (OpenClaw, Hermes, ZeroClaw, Claude Code) already exist. Ryu is the entire car built around them: security, model routing, memory, tools, workflows, and deployment, all sourced, assembled, and managed.",
    status: "Shipping May 2026",
    statusType: "upcoming" as const,
    href: "/products/ryu",
    externalUrl: "https://ryuhq.com",
    logo: "/logos/ryu.png",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <main className="relative pt-6 lg:pt-20">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden opacity-30 dark:block"
            style={{ zIndex: 0 }}
          >
            <GridScan style={{ width: "100%", height: "100%" }} />
            <TriggerResize />
          </div>
          <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-20 lg:pt-14 lg:pb-16">
            <div className="relative z-10 mx-auto">
              <FadeIn duration={0.6}>
                <PageHeader
                  line1="Most AI agents didn't deliver."
                  line2="We build the ones that do."
                />
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                  Industry research puts real enterprise value from agents under
                  10%. We build the platform that makes delivering real value
                  repeatable.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <FadeIn delay={0.15}>
          <div className="pb-16">
            <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              <CrossMark
                style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
              />
              <CrossMark
                style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
              />
              <CrossMark
                style={{
                  bottom: 0,
                  left: 0,
                  transform: "translate(-50%, 50%)",
                }}
              />
              <CrossMark
                style={{
                  bottom: 0,
                  right: 0,
                  transform: "translate(50%, 50%)",
                }}
              />

              {PRODUCTS.map((product) => (
                <Link
                  className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
                  href={product.href as any}
                  key={product.slug}
                >
                  <div className="relative z-10">
                    <span className="mb-5 inline-flex items-center gap-1.5 px-0 py-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
                      </span>
                      {product.status}
                    </span>
                    <div className="font-medium text-xl tracking-tighter">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{product.name}</span>
                        {product.logo && (
                          <img
                            alt={product.name}
                            className="h-5 w-5 object-contain"
                            src={product.logo}
                          />
                        )}
                      </div>
                      {product.tagline && (
                        <span className="block text-muted-foreground">
                          {product.tagline}
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}

              {/* Mystery teaser */}
              <div className="flex flex-col justify-center border-border border-r border-b border-dashed px-10 py-12">
                <div className="relative z-10">
                  <p className="font-semibold text-muted-foreground/40 text-xl tracking-tighter">
                    Something's brewing.
                  </p>
                  <p className="font-semibold text-muted-foreground/30 text-xl tracking-tighter">
                    We're not ready to talk about it yet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
