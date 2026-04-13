"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

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
    <div
      className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text font-medium text-5xl text-transparent dark:from-white dark:to-zinc-800"
      ref={ref}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="pt-10 md:pt-14" id="services">
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

      <div className="grid grid-cols-2 border-border border-y border-dashed md:grid-cols-3">
        <div className="space-y-2 border-border border-r border-b border-dashed p-6">
          <AnimatedNumber suffix="+" value={7} />
          <p className="text-muted-foreground text-sm">
            years of engineering experience
          </p>
        </div>
        <div className="space-y-2 border-border border-r border-b border-dashed p-6">
          <AnimatedNumber suffix="+" value={20} />
          <p className="text-muted-foreground text-sm">projects delivered</p>
        </div>
        <div className="space-y-2 border-border border-b border-dashed p-6 md:border-r-0">
          <AnimatedNumber value={30} />
          <p className="text-muted-foreground text-sm">
            days from idea to launch
          </p>
        </div>
        <div className="col-span-2 p-6 md:col-span-3">
          <blockquote className="space-y-2 border-l-4 pl-4">
            <p className="text-muted-foreground text-sm">
              I&apos;ve seen too many businesses pay good money for software
              they can&apos;t maintain, understand, or grow with. That&apos;s
              the problem we exist to solve. You get direct access to me
              throughout. Not a project manager relaying messages.
            </p>
            <cite className="block font-medium text-sm">
              Jia Wei Ng, Founder
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
