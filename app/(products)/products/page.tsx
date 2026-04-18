import Link from "next/link";
import { GridScan } from "@/components/GridScan";
import { TriggerResize } from "@/components/trigger-resize";
import { CrossMark } from "@/components/ui/cross-mark";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Products",
  description:
    "Agent-native products built by A Major. The agency is the runway. The products are the reason.",
  url: "/products",
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
                <h1 className="font-semibold text-2xl tracking-tighter">
                  Most AI agents didn't deliver.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <p className="font-semibold text-2xl text-muted-foreground tracking-tighter">
                  We build the ones that do.
                </p>
                <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                  Industry research puts real enterprise value from agents under 10%. We build the platform that makes delivering real value repeatable.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <FadeIn delay={0.15}>
          <div className="pb-16">
            <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              <CrossMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
              <CrossMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
              <CrossMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
              <CrossMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />

              {PRODUCTS.map((product) => (
                <Link
                  key={product.slug}
                  className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
                  href={product.href as any}
                >
                  <div className="relative z-10">
                    <span className="mb-5 inline-flex items-center gap-1.5 px-0 py-1 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
                      </span>
                      {product.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-xl tracking-tighter">{product.name}</p>
                      {product.logo && (
                        <img alt={product.name} className="h-5 w-5 object-contain" src={product.logo} />
                      )}
                    </div>
                    {product.tagline && (
                      <p className="font-semibold text-xl text-muted-foreground tracking-tighter">
                        {product.tagline}
                      </p>
                    )}
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
                  <p className="font-semibold text-xl tracking-tighter text-muted-foreground/40">
                    Something's brewing.
                  </p>
                  <p className="font-semibold text-xl text-muted-foreground/30 tracking-tighter">
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
