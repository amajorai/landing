import { ExternalLink } from "lucide-react";
import Link from "next/link";
import RyuSection from "@/components/ryu-section";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { RYU_PITCH, RYU_STATUS, RYU_TAGLINE, RYU_URL } from "@/lib/ryu";

export const metadata = genMeta({
  title: `Ryu — ${RYU_TAGLINE}`,
  description: RYU_PITCH,
  url: "/products/ryu",
  tags: [
    "Ryu",
    "managed AI agent platform",
    "AI agents",
    "open-source agent infrastructure",
    "AI agent plugins",
    "agentic apps",
    "agent observability",
    "agent access control",
  ],
});

export default function RyuPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <DotGridBackground
          className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.09]"
          dotRadius={1}
          spacing={28}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 lg:pt-28">
          <StarMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <StarMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />

          <FadeIn>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Link className="hover:text-foreground" href="/products">
                  Products
                </Link>
                <span>/</span>
                <span>Ryu</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <img
                  alt="Ryu"
                  className="h-10 w-10 object-contain"
                  src="/logos/ryu.png"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold text-3xl tracking-tighter">
                      Ryu
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 font-medium text-muted-foreground text-xs">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
                      </span>
                      {RYU_STATUS}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{RYU_TAGLINE}</p>
                </div>
              </div>

              <p className="max-w-2xl text-muted-foreground leading-relaxed">
                {RYU_PITCH}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                  href={RYU_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit ryuhq.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn>
        <RyuSection />
      </FadeIn>

      <FadeIn>
        <section className="relative overflow-hidden py-20" id="contact">
          <StarMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <StarMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />
          <StarMark
            style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
          />
          <StarMark
            style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-purple-600),var(--color-white)_100%)] dark:opacity-100"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-medium text-2xl tracking-tighter">
              Start without building from scratch.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ryu is in {RYU_STATUS.toLowerCase()}. Get started at ryuhq.com.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                href={RYU_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit ryuhq.com
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
