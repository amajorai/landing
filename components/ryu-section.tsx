import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

export default function RyuSection() {
  return (
    <section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <FadeIn duration={0.4}>
          <div className="space-y-3">
            <div className="flex flex-col items-start gap-1.5 md:flex-row md:items-center md:gap-3">
              <h2 className="flex items-center gap-2 font-medium text-2xl tracking-tighter">
                <img
                  alt="Ryu"
                  className="order-last h-5 w-5 object-contain md:order-first"
                  src="/logos/ryu.png"
                />
                The agency behind Ryu
              </h2>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                Shipping May 2026
              </span>
            </div>
            <p className="text-muted-foreground">
              We built Ryu because running AI agents in production
              shouldn&apos;t require a team of ML engineers. A single binary
              that wraps any agent engine with security, model routing, memory,
              and tools. Swap one URL. Get everything else for free.
            </p>
          </div>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="mt-6 grid grid-cols-2 border-border border-t border-l border-dashed md:grid-cols-4">
          {/* Ryu App — tall left card */}
          <div className="col-span-2 space-y-2 border-border border-r border-b border-dashed p-6 md:row-span-2">
            <h3 className="flex items-center gap-1.5 font-medium text-sm">
              <img
                alt="Ryu"
                className="h-3.5 w-3.5 object-contain"
                src="/logos/ryu.png"
              />
              Ryu App
            </h3>
            <p className="text-muted-foreground text-sm">
              Premium desktop agent UI. Pick your engine: Claude, GPT, Gemini,
              or any local model. One interface, any backend.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-muted-foreground text-xs">
                Available on:
              </span>
              <Image
                alt="Apple macOS"
                className="h-3.5 w-auto dark:invert"
                height={14}
                src="/logos/apple.svg"
                width={14}
              />
              <Image
                alt="Microsoft Windows"
                className="h-3.5 w-auto"
                height={14}
                src="/logos/microsoft.svg"
                width={14}
              />
            </div>
          </div>
          {/* Ryu Gateway */}
          <div className="col-span-2 space-y-2 border-border border-r border-b border-dashed p-6 md:border-r-0">
            <h3 className="flex items-center gap-1.5 font-medium text-sm">
              <img
                alt="Ryu"
                className="h-3.5 w-3.5 object-contain"
                src="/logos/ryu.png"
              />
              Ryu Gateway
            </h3>
            <p className="text-muted-foreground text-sm">
              Self-hostable AI proxy. Swap one URL and get model routing,
              logging, rate limiting, and access control. No code changes.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-muted-foreground text-xs">Works with:</span>
              <Image
                alt="Anthropic Claude"
                className="h-3.5 w-auto dark:invert"
                height={14}
                src="/logos/anthropic_black_wordmark.svg"
                width={60}
              />
              <Image
                alt="OpenAI"
                className="h-3 w-auto dark:invert"
                height={12}
                src="/logos/openai_wordmark_light.svg"
                width={50}
              />
            </div>
          </div>
          {/* AI integration */}
          <div className="col-span-1 space-y-2 border-border border-r border-b border-dashed p-6">
            <h3 className="font-medium text-sm">AI integration</h3>
            <p className="text-muted-foreground text-sm">
              Add AI capabilities to existing products. Copilots, summaries,
              semantic search, generation, and more.
            </p>
          </div>
          {/* Chatbots — no right border (last in row on desktop) */}
          <div className="col-span-1 space-y-2 border-border border-r border-b border-dashed p-6 md:border-r-0">
            <h3 className="font-medium text-sm">Chatbots & AI interfaces</h3>
            <p className="text-muted-foreground text-sm">
              Conversational interfaces powered by LLMs. Customer support, lead
              capture, or internal assistants.
            </p>
          </div>
          {/* Workflow automation — wide bottom left */}
          <div className="col-span-1 space-y-2 border-border border-r border-b border-dashed p-6 md:col-span-3">
            <h3 className="font-medium text-sm">Workflow automation</h3>
            <p className="text-muted-foreground text-sm">
              Replace manual processes with code. If your team is doing it by
              hand, we can automate it.
            </p>
          </div>
          {/* Ryu agent deployments */}
          <div className="col-span-1 space-y-2 border-border border-r border-b border-dashed p-6 md:border-r-0">
            <h3 className="font-medium text-sm">Ryu agent deployments</h3>
            <p className="text-muted-foreground text-sm">
              Production-ready AI agent infrastructure using Ryu. Security,
              routing, memory, and tools out of the box.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="mx-auto mt-6 max-w-5xl px-6 pb-10 md:pb-14">
        <FadeIn duration={0.4}>
          <a
            className="inline-flex items-center gap-1 font-medium text-sm underline-offset-4 hover:underline"
            href="https://ryuhq.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn more about Ryu →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
