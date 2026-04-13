import { FadeIn } from "@/components/ui/fade-in";

export default function ContentSection() {
  return (
    <section className="py-10 md:py-14" id="about">
      <div className="mx-auto max-w-5xl space-y-4 px-6">
        <FadeIn duration={0.4}>
          <h2 className="relative z-10 max-w-xl font-medium text-2xl tracking-tighter">
            Who we are
          </h2>
        </FadeIn>

        <div>
          <div className="relative space-y-4">
            <FadeIn delay={0.2} direction="left" duration={0.5}>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A Major is a Singapore-based software agency. We build{" "}
                  websites, mobile and desktop apps, browser extensions, and
                  enterprise systems and stay directly involved from the first
                  conversation to launch day. If it runs on a screen, we can
                  build it.
                </p>
                <p className="text-muted-foreground">
                  We&apos;re also the team behind{" "}
                  <span className="inline-flex items-center gap-1 font-semibold text-accent-foreground">
                    <img
                      alt="Ryu"
                      className="inline-block h-3.5 w-3.5 object-contain"
                      src="/logos/ryu.png"
                    />
                    Ryu
                  </span>
                  , an orchestration layer for AI agents. A single binary that
                  wraps any agent engine with security, model routing, memory,
                  and tools.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.5}>
              <div className="pt-6">
                <blockquote className="border-l-4 pl-4">
                  <p>
                    In music theory, A Major is the key that defines the
                    structure, letting every instrument play in harmony.
                    That&apos;s what we build.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium">
                      Jia Wei Ng, Founder
                    </cite>
                  </div>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
