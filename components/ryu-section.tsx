import { FadeIn } from "@/components/ui/fade-in";

export default function RyuSection() {
  return (
    <section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <FadeIn duration={0.4}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="font-medium text-2xl tracking-tighter">
                The company behind Ryu
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
        <div className="mt-6 grid grid-cols-2 border-border border-y border-dashed">
          <div className="space-y-2 border-border border-r border-dashed p-6">
            <h3 className="font-medium text-sm">Ryu App</h3>
            <p className="text-muted-foreground text-sm">
              Premium desktop agent UI. Pick your engine: Claude, GPT, Gemini,
              or any local model. One interface, any backend.
            </p>
          </div>
          <div className="space-y-2 p-6">
            <h3 className="font-medium text-sm">Ryu Gateway</h3>
            <p className="text-muted-foreground text-sm">
              Self-hostable AI proxy. Swap one URL and get model routing,
              logging, rate limiting, and access control. No code changes.
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
