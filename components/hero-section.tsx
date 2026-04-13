"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export default function HeroSection() {
  return (
    <>
      <main className="pt-16 lg:pt-20">
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-12 lg:py-14">
            <div className="relative z-10 mx-auto px-10 xl:px-0">
              <FadeIn direction="down" duration={0.6}>
                <h1 className="font-semibold text-2xl tracking-tighter">
                  Software that just works. People you can talk to.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <p
                  className="mx-auto mt-0.5 mb-8 font-semibold text-2xl text-muted-foreground tracking-tighter"
                  itemProp="description"
                >
                  Built for humans, by humans.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} duration={0.5}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    className="!py-0 !h-9 rounded-full px-4"
                    size="lg"
                  >
                    <Link href="https://www.notion.so/f9ac6e86fafa4ca28ed6c2af11d498cf?pvs=106">
                      <span className="btn-label">Get Started</span>
                    </Link>
                  </Button>
                  <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                    <span>
                      <span className="font-medium text-foreground">
                        {process.env.NEXT_PUBLIC_SPOTS_REMAINING ?? "2"} client
                        spots
                      </span>{" "}
                      remaining in{" "}
                      {new Date().toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
