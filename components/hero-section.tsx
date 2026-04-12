"use client";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <main className="pt-16 lg:pt-20">
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-12 lg:py-14">
            <div className="relative z-10 mx-auto px-10 xl:px-0">
              <FadeIn direction="down" duration={0.6}>
                <h1 className="font-medium text-2xl tracking-tighter">
                  The foundation layer for agents
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <p
                  className="mx-auto mt-2 mb-8 text-muted-foreground"
                  itemProp="description"
                >
                  We don't build the AI. We make it all play together.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} duration={0.5}>
                <Button
                  asChild
                  className="!py-0 !h-9 rounded-full px-4"
                  size="lg"
                >
                  <Link href="https://www.notion.so/f9ac6e86fafa4ca28ed6c2af11d498cf?pvs=106">
                    <span className="btn-label">Get Started</span>
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
