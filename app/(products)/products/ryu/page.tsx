import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RyuSection from "@/components/ryu-section";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Ryu — AI Agent Orchestration Platform",
  description:
    "Run AI agents in production without a team of ML engineers. Ryu wraps any agent framework with security, memory, routing, and tools.",
  url: "/products/ryu",
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
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 lg:pt-28">
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
                      Shipping May 2026
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    End-to-end managed infrastructure for AI agents
                  </p>
                </div>
              </div>

              <p className="max-w-2xl text-muted-foreground leading-relaxed">
                End-to-end managed infrastructure for AI agents. The engines
                (OpenClaw, Hermes, ZeroClaw, IronClaw, Claude Code) already
                exist. Ryu is the entire car built around them: security, model
                routing, memory, tools, workflows, deployment, all sourced,
                assembled, and managed. One Rust binary, three entry points.
                Not another agent. The managed infrastructure everything runs
                through.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                  href="https://ryuhq.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit ryuhq.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span>Available on:</span>
                  <Image
                    alt="macOS"
                    className="h-4 w-auto dark:invert"
                    height={16}
                    src="/logos/apple.svg"
                    width={16}
                  />
                  <Image
                    alt="Windows"
                    className="h-4 w-auto"
                    height={16}
                    src="/logos/microsoft.svg"
                    width={16}
                  />
                </div>
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
              Agents are commoditized. The orchestration layer is not.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Shipping May 2026. Follow the build at ryuhq.com.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                href="https://ryuhq.com"
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
