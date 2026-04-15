"use client";
import { useEffect, useRef, useState } from "react";

const COMPONENTS = ["Button", "Card", "Badge", "Input", "Alert"] as const;
type Component = (typeof COMPONENTS)[number];

export function ShadcnVisualization() {
  const [index, setIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const start = () => {
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setIndex((i) => (i + 1) % COMPONENTS.length);
    }, 2500);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current: Component = COMPONENTS[index];

  const renderComponent = () => {
    switch (current) {
      case "Button":
        return (
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-zinc-100 px-3 py-1.5 font-medium text-[11px] text-zinc-900 shadow-sm">
              Default
            </div>
            <div className="rounded-md border border-zinc-700 px-3 py-1.5 font-medium text-[11px] text-zinc-200">
              Outline
            </div>
            <div className="rounded-md px-3 py-1.5 font-medium text-[11px] text-zinc-300">
              Ghost
            </div>
          </div>
        );
      case "Card":
        return (
          <div className="w-[200px] rounded-lg border border-zinc-700 bg-zinc-900/60 p-3 shadow-sm">
            <p className="font-semibold text-[12px] text-zinc-100">
              Invoice #1234
            </p>
            <p className="mb-2 text-[10px] text-zinc-400">Due May 1</p>
            <div className="inline-block rounded-md bg-zinc-100 px-2.5 py-1 font-medium text-[10px] text-zinc-900">
              Pay
            </div>
          </div>
        );
      case "Badge":
        return (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-medium text-[10px] text-emerald-300 ring-1 ring-emerald-500/30 ring-inset">
              New
            </span>
            <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 font-medium text-[10px] text-sky-300 ring-1 ring-sky-500/30 ring-inset">
              Popular
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-medium text-[10px] text-amber-300 ring-1 ring-amber-500/30 ring-inset">
              Beta
            </span>
          </div>
        );
      case "Input":
        return (
          <div className="flex w-[220px] items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2">
            <span className="text-zinc-500">🔍</span>
            <span className="text-[11px] text-zinc-500">Search...</span>
          </div>
        );
      case "Alert":
        return (
          <div className="flex w-[240px] items-start gap-2 rounded-md border border-zinc-700 bg-zinc-900/60 p-3">
            <span className="text-zinc-300">ℹ</span>
            <div>
              <p className="font-semibold text-[11px] text-zinc-100">
                Heads up!
              </p>
              <p className="text-[10px] text-zinc-400">
                You can add components.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 px-4">
        <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
          {current}
        </p>
        <div
          className="fade-in flex min-h-[70px] animate-in items-center justify-center duration-500"
          key={index}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
