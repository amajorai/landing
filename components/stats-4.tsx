"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import AnimatedList from "@/components/reactbits/animated-list";
import { DotGridBackground } from "@/components/ui/dot-grid-background";

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5 });
    }
  }, [isInView, motionValue, value]);

  return (
    <div className="font-medium text-5xl" ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-14" id="services">
      <DotGridBackground
        className="text-zinc-950 opacity-[0.04] dark:text-white dark:opacity-[0.07]"
        fade="none"
        spacing={48}
        variant="grid"
      />
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <div className="relative z-10 max-w-xl space-y-3">
          <h2 className="font-medium text-2xl tracking-tighter">
            Why businesses choose us
          </h2>
          <p className="text-muted-foreground">
            Most agencies make you wait months, charge for every email, and hand
            your project to someone you&apos;ve never met. We do the opposite:
            scope upfront, direct access to the founder, and a finished product
            inside 30 days.
          </p>
          <p className="text-muted-foreground">
            Design, engineering, and project management under one roof. No
            subcontracting, no surprises, no scope creep.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">
        {/* Left: stats + blockquote */}
        <div className="border-border border-r border-dashed">
          <div className="grid grid-cols-2">
            <div className="space-y-2 border-border border-r border-b border-dashed p-6">
              <AnimatedNumber suffix="+" value={7} />
              <p className="text-muted-foreground text-sm">
                years of engineering experience
              </p>
            </div>
            <div className="space-y-2 border-border border-b border-dashed p-6">
              <AnimatedNumber suffix="+" value={20} />
              <p className="text-muted-foreground text-sm">
                projects delivered
              </p>
            </div>
          </div>
          <div className="p-6">
            <blockquote className="space-y-3 border-l-4 pl-4">
              <p className="text-muted-foreground text-sm">
                I&apos;ve seen too many businesses pay good money for software
                they can&apos;t maintain, understand, or grow with. That&apos;s
                the problem we exist to solve.
              </p>
              <p className="text-muted-foreground text-sm">
                You get direct access to me throughout. Not a project manager
                relaying messages.
              </p>
              <cite className="block font-medium text-sm">
                Jia Wei Ng, Founder
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Right: AnimatedList of key differentiators */}
        <div className="p-6">
          <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
            What you get
          </p>
          <AnimatedList
            enableArrowNavigation={false}
            items={[
              "Fixed scope, no billing surprises",
              "Direct access to the founder",
              "Fast turnaround, no long waits",
              "Design, engineering, PM in one team",
              "Full deployment included",
              "Post-launch support available",
              "Clean, documented handover",
              "No subcontracting, ever",
              "Weekly progress updates",
              "You own everything we build",
            ]}
            maxHeight={300}
            renderItem={(item, _index, selected) => (
              <div
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  selected
                    ? "border-border bg-accent"
                    : "border-border/40 bg-muted/10"
                }`}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                  <Check className="size-3 text-green-500" strokeWidth={3} />
                </span>
                <p className="text-sm">{item}</p>
              </div>
            )}
            showGradients={false}
          />
        </div>
      </div>
    </section>
  );
}
