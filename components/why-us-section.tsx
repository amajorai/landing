"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { StarMark } from "@/components/ui/star-mark";

const PERKS = [
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
];

const PERK_H = 52;
const PERK_VISIBLE = 5;

function AutoScrollList() {
  const posRef = useRef(0);
  const [pos, setPos] = useState(0);
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      posRef.current += PERK_H;
      if (posRef.current >= PERKS.length * PERK_H) {
        setTimeout(() => {
          setTransitioning(false);
          posRef.current = 0;
          setPos(0);
        }, 500);
      } else {
        setPos(posRef.current);
      }
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const doubled = [...PERKS, ...PERKS];

  return (
    <div className="overflow-hidden" style={{ height: PERK_H * PERK_VISIBLE }}>
      <div
        style={{
          transform: `translateY(-${pos}px)`,
          transition: transitioning
            ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
            : "none",
        }}
      >
        {doubled.map((item, i) => (
          <div className="pb-2" key={i} style={{ height: PERK_H }}>
            <div className="flex h-full items-center gap-3 rounded-lg border border-border/40 bg-muted/10 px-4">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                <Check className="size-3 text-green-500" strokeWidth={3} />
              </span>
              <p className="text-sm">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

      <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">
        {/* Side border stars */}
        <StarMark
          style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
        />
        <StarMark
          style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
        />
        <StarMark
          style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
        />
        <StarMark
          style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
        />
        {/* Left: stats + blockquote */}
        <div className="border-border border-r border-dashed">
          <div className="relative grid grid-cols-2">
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
            </blockquote>
            <cite className="mt-3 block pl-4 font-medium text-sm not-italic">
              Jia Wei Ng, Founder
            </cite>
          </div>
        </div>

        {/* Right: auto-scrolling perks */}
        <div className="p-6">
          <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
            What you get
          </p>
          <AutoScrollList />
        </div>
      </div>
    </section>
  );
}
