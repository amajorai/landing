"use client";

import { Check, ExternalLink, Pause, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { GridScan } from "@/components/GridScan";
import { TriggerResize } from "@/components/trigger-resize";
import { Button } from "@/components/ui/button";
import { CornerMark } from "@/components/ui/corner-mark";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { StarMark } from "@/components/ui/star-mark";
import { RYU_PITCH, RYU_STATUS, RYU_TAGLINE, RYU_URL } from "@/lib/ryu";

const RUNS = [
  {
    agent: "support-agent",
    task: "Triage inbox",
    state: "running",
    target: 70,
  },
  {
    agent: "ops-agent",
    task: "Merge release PR",
    state: "approval",
    target: 45,
  },
  {
    agent: "sales-agent",
    task: "Update CRM",
    state: "done",
    target: 100,
  },
] as const;

const STATE_STYLE = {
  running: {
    label: "Running",
    text: "text-green-600 dark:text-green-400",
    bar: "bg-green-500/40",
    icon: null,
  },
  approval: {
    label: "Needs approval",
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-400/40",
    icon: ShieldCheck,
  },
  done: {
    label: "Completed",
    text: "text-muted-foreground/60",
    bar: "bg-muted-foreground/25",
    icon: Check,
  },
} as const;

function RunProgress({
  target,
  delay,
  className,
  animate,
}: {
  target: number;
  delay: number;
  className: string;
  animate: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const fill = setTimeout(() => setWidth(target), delay);
    if (!animate) return () => clearTimeout(fill);
    let dir = 1;
    const id = setInterval(() => {
      setWidth((prev) => {
        const next = prev + dir * 2;
        if (next >= target + 10) dir = -1;
        if (next <= target - 6) dir = 1;
        return next;
      });
    }, 900);
    return () => {
      clearTimeout(fill);
      clearInterval(id);
    };
  }, [target, delay, animate]);

  return (
    <div className="h-0.5 w-full rounded-full bg-muted/30">
      <div
        className={`h-full rounded-full transition-all duration-700 ${className}`}
        style={{ width: `${Math.min(width, 100)}%` }}
      />
    </div>
  );
}

export default function RyuHero() {
  return (
    <main className="relative pt-6 lg:pt-20">
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
      <section className="relative overflow-hidden bg-white dark:bg-transparent">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-30 dark:block"
          style={{ zIndex: 0 }}
        >
          <GridScan style={{ width: "100%", height: "100%" }} />
          <TriggerResize />
        </div>
        <DotGridBackground
          className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.09]"
          dotRadius={1}
          spacing={28}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-14">
          <div className="relative z-10 mx-auto">
            <FadeIn duration={0.4}>
              <span className="mb-5 inline-flex items-center gap-1.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
                </span>
                {RYU_STATUS}
              </span>
            </FadeIn>

            <FadeIn direction="down" duration={0.6}>
              <PageHeader
                line1={`Ryu. ${RYU_TAGLINE}.`}
                line2="Built on open-source infrastructure."
                tag={
                  <img
                    alt="Ryu"
                    className="h-6 w-6 object-contain"
                    src="/logos/ryu.png"
                  />
                }
              />
            </FadeIn>

            <FadeIn delay={0.3} duration={0.5}>
              <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                {RYU_PITCH}
              </p>
            </FadeIn>

            <FadeIn delay={0.4} duration={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild className="!py-0 !h-9 rounded-full px-4">
                  <a href={RYU_URL} rel="noopener noreferrer" target="_blank">
                    Get started
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
                <a
                  className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                  href="#ryu"
                >
                  See how it works →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Live runs strip */}
      <section className="relative bg-background">
        <FadeIn delay={0.5} duration={0.5}>
          <div className="relative border-border border-t border-dashed">
            <CornerMark corner="tl" size={10} />
            <CornerMark corner="tr" size={10} />
            <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-3">
              <CornerMark corner="bl" size={10} />
              <CornerMark corner="br" size={10} />
              {RUNS.map((run, i) => {
                const style = STATE_STYLE[run.state];
                const Icon = style.icon;
                return (
                  <div
                    className={`border-border border-r border-b border-dashed p-5 ${run.state === "done" ? "bg-muted/40 dark:bg-muted/10" : ""}`}
                    key={run.agent}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium text-[9px] uppercase tracking-widest ${style.text}`}
                        >
                          {style.label}
                        </span>
                        {Icon ? (
                          <Icon
                            className={`size-3.5 ${style.text}`}
                            strokeWidth={2.5}
                          />
                        ) : (
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-xs">{run.agent}</p>
                        <p className="text-[10px] text-muted-foreground/60">
                          {run.task}
                        </p>
                      </div>
                      <RunProgress
                        animate={run.state === "running"}
                        className={style.bar}
                        delay={300 + i * 200}
                        target={run.target}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative flex flex-col items-center gap-1 border-border border-t border-dashed py-4 text-center">
              <span className="inline-flex items-center gap-2 text-sm">
                <Pause className="size-3.5 text-amber-500" />
                <span className="font-medium text-foreground">
                  Every run monitored. Sensitive actions wait for you.
                </span>
              </span>
              <span className="text-muted-foreground text-xs">
                Agents run around the clock; you stay in control.
              </span>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
