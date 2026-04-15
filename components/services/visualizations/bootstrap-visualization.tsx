"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Bootstrap: 12-column responsive grid reflows across breakpoints
// Cycles through xl → lg → md → sm every 2s.

type Breakpoint = "xl" | "lg" | "md" | "sm";

type ColConfig = { id: string; label: string; className: string; span: number };

const LAYOUTS: Record<Breakpoint, ColConfig[]> = {
  xl: [
    { id: "a", label: "col-xl-4", className: "", span: 4 },
    { id: "b", label: "col-xl-4", className: "", span: 4 },
    { id: "c", label: "col-xl-4", className: "", span: 4 },
  ],
  lg: [
    { id: "a", label: "col-lg-4", className: "", span: 4 },
    { id: "b", label: "col-lg-4", className: "", span: 4 },
    { id: "c", label: "col-lg-4", className: "", span: 4 },
  ],
  md: [
    { id: "a", label: "col-md-6", className: "", span: 6 },
    { id: "b", label: "col-md-6", className: "", span: 6 },
    { id: "c", label: "col-md-12", className: "", span: 12 },
  ],
  sm: [
    { id: "a", label: "col-sm-12", className: "", span: 12 },
    { id: "b", label: "col-sm-12", className: "", span: 12 },
    { id: "c", label: "col-sm-12", className: "", span: 12 },
  ],
};

const ORDER: Breakpoint[] = ["xl", "lg", "md", "sm"];

const WIDTH_PCT: Record<Breakpoint, number> = {
  xl: 100,
  lg: 85,
  md: 65,
  sm: 40,
};

export function BootstrapVisualization() {
  const [bp, setBp] = useState<Breakpoint>("xl");
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const start = () => {
      let idx = 0;
      intervalRef.current = setInterval(() => {
        if (!runningRef.current) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          return;
        }
        idx = (idx + 1) % ORDER.length;
        setBp(ORDER[idx]);
      }, 2000);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            start();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      observerRef.current?.disconnect();
    };
  }, []);

  const cols = LAYOUTS[bp];
  const widthPct = WIDTH_PCT[bp];

  return (
    <div
      className="relative flex h-[200px] w-full flex-col items-center justify-center gap-3 overflow-hidden px-4 lg:h-[280px]"
      ref={containerRef}
    >
      {/* Breakpoint label */}
      <div className="flex w-full items-center justify-between font-mono text-[10px] text-violet-400/80 uppercase tracking-widest dark:text-violet-300/80">
        <span>Breakpoint</span>
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="rounded border border-violet-500/40 bg-violet-500/10 px-2 py-0.5 text-violet-600 dark:text-violet-300"
          initial={{ opacity: 0, y: -2 }}
          key={bp}
        >
          {bp.toUpperCase()}
        </motion.span>
      </div>

      {/* Viewport resize indicator */}
      <motion.div
        animate={{ width: `${widthPct}%` }}
        className="relative flex h-2 items-center rounded-full border border-violet-500/40 bg-violet-500/10"
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <span className="absolute -left-1 h-3 w-1 rounded-sm bg-violet-500/70" />
        <span className="absolute -right-1 h-3 w-1 rounded-sm bg-violet-500/70" />
      </motion.div>

      {/* Responsive grid */}
      <motion.div
        animate={{ width: `${widthPct}%` }}
        className="flex flex-wrap gap-1"
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {cols.map((c) => (
          <motion.div
            className="flex h-12 min-w-0 items-center justify-center rounded-md border border-violet-500/60 bg-violet-500/15 px-2 text-center font-mono text-[10px] text-violet-700 lg:h-16 lg:text-xs dark:border-violet-400/60 dark:bg-violet-400/15 dark:text-violet-200"
            key={c.id}
            layout
            layoutId={c.id}
            style={{ width: `calc(${(c.span / 12) * 100}% - 4px)` }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {c.label}
          </motion.div>
        ))}
      </motion.div>

      {/* 12-col grid guide */}
      <div className="flex w-full gap-[2px] opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="h-1 flex-1 rounded-sm bg-violet-500/60 dark:bg-violet-400/60"
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
