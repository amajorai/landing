"use client";
import { getCalApi } from "@calcom/embed-react";
import { BadgeCheck, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

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
      <main className="pt-16 lg:pt-20">
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-12 lg:py-14">
            <div className="relative z-10 mx-auto px-10 xl:px-0">
              <FadeIn direction="down" duration={0.6}>
                <h1 className="font-semibold text-2xl tracking-tighter">
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
                  <div className="relative flex size-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                    <BadgeCheck
                      className="relative size-5 text-blue-600 dark:text-blue-400"
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

          {/* Spots Grid - Full Width Bento Layout */}
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
              <div className="grid grid-cols-3 border-border border-t border-l border-dashed">
                <div
                  className="cursor-pointer border-border border-r border-b border-dashed p-8 transition-colors duration-200 hover:bg-accent/50"
                  onClick={handleBookCall}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleBookCall();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Check
                      className="size-8 text-green-600 dark:text-green-400"
                      strokeWidth={3}
                    />
                    <span className="font-medium text-green-600 text-xs dark:text-green-400">
                      Available
                    </span>
                  </div>
                </div>
                <div className="border-border border-r border-b border-dashed bg-muted/40 p-8 dark:bg-muted/10">
                  <div className="flex flex-col items-center gap-3">
                    <X
                      className="size-8 text-muted-foreground"
                      strokeWidth={3}
                    />
                    <span className="text-muted-foreground text-xs">Taken</span>
                  </div>
                </div>
                <div className="border-border border-r border-b border-dashed bg-muted/40 p-8 dark:bg-muted/10">
                  <div className="flex flex-col items-center gap-3">
                    <X
                      className="size-8 text-muted-foreground"
                      strokeWidth={3}
                    />
                    <span className="text-muted-foreground text-xs">Taken</span>
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
