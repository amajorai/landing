"use client";
import { getCalApi } from "@calcom/embed-react";
import { Calendar, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import Prism from "@/components/reactbits/prism";
import { Button } from "@/components/ui/button";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";

function AnimatedBar({
  target,
  delay = 0,
}: {
  target: number;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const fill = setTimeout(() => {
      setWidth(target);
      setTimeout(() => setPulse(true), 1000);
    }, delay);
    return () => clearTimeout(fill);
  }, [target, delay]);

  useEffect(() => {
    if (!pulse) return;
    let dir = -1;
    const id = setInterval(() => {
      setWidth((prev) => {
        const next = prev + dir * 1.5;
        if (next <= target - 8) dir = 1;
        if (next >= target) dir = -1;
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, [pulse, target]);

  return (
    <div className="h-0.5 w-full rounded-full bg-muted/30">
      <div
        className="h-full rounded-full bg-muted-foreground/20 transition-all duration-700"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function HeroSection() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );
  const nextMonth = nextMonthDate.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const spots = process.env.NEXT_PUBLIC_SPOTS_REMAINING ?? "1";

  const handleBookCall = async () => {
    const cal = await getCalApi({ namespace: "amajor" });
    cal("modal", {
      calLink: "jiaweing/amajor",
      config: { layout: "month_view" },
    });
  };

  return (
    <>
      <main className="pt-6 lg:pt-20">
        <section className="relative overflow-hidden bg-white dark:bg-transparent">
          {/* Prism WebGL background - only behind text area, dark mode only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden dark:block"
            style={{ zIndex: 0, opacity: 0.35, bottom: "auto", height: "100%" }}
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
          <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-14">
            <div className="relative z-10 mx-auto">
              <FadeIn direction="down" duration={0.6}>
                <h1 className="font-semibold text-2xl text-foreground tracking-tighter">
                  Software that just works. Experts you can talk to.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <div className="inline-flex items-center gap-2">
                  <p
                    className="font-semibold text-2xl text-muted-foreground tracking-tighter"
                    itemProp="description"
                  >
                    Built for humans, by humans.
                  </p>
                  <div className="relative flex size-5 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-400">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                    <Check
                      className="relative size-3 text-white"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4} duration={0.5}>
                <div className="mt-8 flex items-center gap-4">
                  <Button
                    className="!py-0 !h-9 rounded-full px-4"
                    onClick={handleBookCall}
                    size="lg"
                  >
                    <span className="btn-label">Book a Call</span>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Spots Grid - below Prism area */}
        <section className="relative bg-background">
          <FadeIn delay={0.5} duration={0.5}>
            <div className="border-border border-t border-dashed">
              <div className="flex flex-col gap-2 py-4 text-center">
                <span className="text-muted-foreground text-sm">
                  <span className="font-medium text-muted-foreground/60 line-through">
                    {currentMonth} fully booked
                  </span>
                </span>
                <span className="inline-flex items-center justify-center gap-2 text-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-medium text-foreground">
                    1 of 3 spots available in {nextMonth}
                  </span>
                </span>
              </div>
              <div className="relative grid grid-cols-3 border-border border-t border-l border-dashed">
                {/* Perforation notches — left divider */}
                <div className="absolute -top-[7px] left-[calc(33.333%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
                <div className="absolute -bottom-[7px] left-[calc(33.333%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
                {/* Perforation notches — right divider */}
                <div className="absolute -top-[7px] left-[calc(66.667%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
                <div className="absolute -bottom-[7px] left-[calc(66.667%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
                {/* Available slot */}
                <div
                  className="group cursor-pointer border-border border-r border-b border-dashed p-5 transition-colors duration-200 hover:bg-accent/50"
                  onClick={handleBookCall}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleBookCall();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[9px] text-green-600 uppercase tracking-widest dark:text-green-400">
                        Available
                      </span>
                      <div className="relative size-4">
                        <Check
                          className="absolute inset-0 size-4 text-green-600 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0 dark:text-green-400"
                          strokeWidth={3}
                        />
                        <Calendar
                          className="absolute inset-0 size-4 -rotate-90 scale-0 text-green-600 opacity-0 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 dark:text-green-400"
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-20 rounded-full border border-green-500/30 bg-green-500/15" />
                      <div className="h-1.5 w-12 rounded-full bg-muted/30" />
                    </div>
                    <span className="text-[10px] text-muted-foreground/50">
                      from {nextMonth}
                    </span>
                  </div>
                </div>
                {/* Booked slot 1 */}
                <div className="border-border border-r border-b border-dashed bg-muted/40 p-5 dark:bg-muted/10">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                        In progress
                      </span>
                      <X
                        className="size-3 text-muted-foreground/30"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="relative h-2 w-16 overflow-hidden rounded-full bg-muted-foreground/15">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                      <div className="relative h-1.5 w-10 overflow-hidden rounded-full bg-muted-foreground/10">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </div>
                    <AnimatedBar delay={300} target={70} />
                  </div>
                </div>
                {/* Booked slot 2 */}
                <div className="border-border border-b border-dashed bg-muted/40 p-5 dark:bg-muted/10">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                        In progress
                      </span>
                      <X
                        className="size-3 text-muted-foreground/30"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="relative h-2 w-14 overflow-hidden rounded-full bg-muted-foreground/15">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                      <div className="relative h-1.5 w-8 overflow-hidden rounded-full bg-muted-foreground/10">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.7s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </div>
                    <AnimatedBar delay={500} target={45} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
}
