"use client";
import { getCalApi } from "@calcom/embed-react";
import { Calendar, Check, X } from "lucide-react";
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
      <main className="pt-6 lg:pt-20">
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-14">
            <div className="relative z-10 mx-auto">
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
                  className="group cursor-pointer border-border border-t border-r border-b border-l border-dashed p-8 transition-colors duration-200 hover:bg-accent/50"
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
                    <div className="relative size-8">
                      <Check
                        className="absolute inset-0 size-8 text-green-600 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0 dark:text-green-400"
                        strokeWidth={3}
                      />
                      <Calendar
                        className="absolute inset-0 size-8 -rotate-90 scale-0 text-green-600 opacity-0 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 dark:text-green-400"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-medium text-green-600 text-xs transition-all duration-300 ease-out group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300">
                      Available
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center border-border border-r border-b border-dashed bg-muted/40 p-8 dark:bg-muted/10">
                  <X className="size-8 text-muted-foreground" strokeWidth={3} />
                </div>
                <div className="flex items-center justify-center border-border border-r border-b border-dashed bg-muted/40 p-8 dark:bg-muted/10">
                  <X className="size-8 text-muted-foreground" strokeWidth={3} />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
}
