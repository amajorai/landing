import { Check } from "lucide-react";
import Link from "next/link";
import { HomeHeroCta } from "@/components/home-hero-cta";
import { GridScan } from "@/components/GridScan";
import { TriggerResize } from "@/components/trigger-resize";
import PixelBlast from "@/components/PixelBlast";
import Prism from "@/components/reactbits/prism";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { CrossMark } from "@/components/ui/cross-mark";
import { generateMetadata } from "@/lib/metadata";

import HyperspeedFive from "@/components/hyperspeed-five";

export const metadata = generateMetadata({
  title: "The foundation for AI agents",
  description:
    "A software company for the agent era. We build agent-native products, and help teams ship theirs.",
  url: "/",
});

export default function RootPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center">
      <div aria-hidden className="fixed inset-0 z-0 opacity-10">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#B497CF"
          patternScale={2}
          patternDensity={1}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          speed={0.5}
          transparent
          edgeFade={0.5}
        />
      </div>
      {/* Hero */}
      <FadeIn className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 sm:py-14 min-h-[50vh] sm:min-h-0 flex flex-col justify-center sm:block">
        <h1 className="font-semibold text-2xl text-foreground tracking-tighter">
          The foundation for AI agents
        </h1>
        <p className="font-semibold text-2xl text-muted-foreground tracking-tighter">
          A software company for the agent era
        </p>
        <HomeHeroCta />
      </FadeIn>

      {/* Four selector panels */}
      <FadeIn className="relative z-10 mx-auto w-full max-w-5xl pb-14" delay={0.25} duration={0.5}>
        <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
          <CrossMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <CrossMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />
          <CrossMark
            style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
          />
          <CrossMark
            style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
          />

          {/* Products panel */}
          <Link
            className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
            href="/products"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden opacity-30 dark:block"
              style={{ zIndex: 0 }}
            >
              <GridScan style={{ width: "100%", height: "100%" }} />
              <TriggerResize />
            </div>
            <div className="relative z-10">
              <p className="mb-4 font-medium text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                Products
              </p>
              <p className="font-semibold text-xl tracking-tighter">
                Most AI agents didn't deliver.
              </p>
              <p className="font-semibold text-xl text-muted-foreground tracking-tighter">
                We build the ones that do.
              </p>
              <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
                Industry research puts real enterprise value from agents under 10%. We build the platform that makes delivering real value repeatable.
              </p>
            </div>
          </Link>

          {/* Agency panel */}
          <Link
            className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
            href="/agency"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden dark:block"
              style={{ zIndex: 0, opacity: 0.25 }}
            >
              <Prism
                animationType="rotate"
                bloom={0.8}
                colorFrequency={1.2}
                glow={0.8}
                noise={0.15}
                scale={3.8}
                timeScale={0.3}
                transparent={true}
              />
            </div>
            <DotGridBackground
              className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.09]"
              dotRadius={1}
              spacing={28}
            />
            <div className="relative z-10">
              <p className="mb-4 font-medium text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                Agency
              </p>
              <p className="font-semibold text-xl tracking-tighter">
                Software that just works. Experts you can talk to.
              </p>
              <div className="inline-flex items-center gap-2">
                <p className="font-semibold text-xl text-muted-foreground tracking-tighter">
                  Built for humans, by humans.
                </p>
                <div className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-400">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                  <Check className="relative size-3 text-white" strokeWidth={3} />
                </div>
              </div>
              <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
                Websites, apps, and enterprise systems, with AI agents at the core. We handle the build so you can focus on the business.
              </p>
            </div>
          </Link>

          {/* Ryu panel */}
          {/* <Link
            className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
            href="/products/ryu"
          >
            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-1.5 px-0 py-1 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
                </span>
                Shipping May 2026
              </span>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xl tracking-tighter">Ryu</p>
                <img alt="Ryu" className="h-5 w-5 object-contain" src="/logos/ryu.png" />
              </div>
              <p className="font-semibold text-xl text-muted-foreground tracking-tighter">
                End-to-end managed infrastructure for AI agents
              </p>
              <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
                Pick your engine: Hermes, OpenClaw, ZeroClaw, or any compatible
                agent. Ryu handles everything around it.
              </p>
            </div>
          </Link> */}

          {/* Consultancy panel — temporarily hidden */}
          {/* <Link
            className="group relative flex flex-col justify-center overflow-hidden border-border border-r border-b border-dashed px-10 py-12 transition-colors duration-200 hover:bg-muted/10"
            href="/consultancy"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{ zIndex: 0 }}
            >
              <HyperspeedFive />
            </div>
            <div className="relative z-10">
              <p className="mb-4 font-medium text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                Consultancy
              </p>
              <p className="font-semibold text-xl tracking-tighter">
                The biggest gap in AI isn&apos;t the technology.
              </p>
              <p className="font-semibold text-xl text-muted-foreground tracking-tighter">
                It&apos;s knowing where to start.
              </p>
              <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
                We build AI agents and ship AI-native software for a living. One honest 30-minute audit before you spend a dollar on the wrong thing.
              </p>
            </div>
          </Link>

          <div className="border-border border-r border-b border-dashed px-10 py-12" /> */}
        </div>
      </FadeIn>
    </main>
  );
}
