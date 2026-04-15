"use client";
import { useEffect, useRef, useState } from "react";

type Variant = {
  classes: string;
  label: string;
};

const VARIANTS: Variant[] = [
  {
    classes: "bg-sky-500 text-white rounded-full px-6 py-2",
    label: "Get started",
  },
  {
    classes:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl p-4 shadow-lg",
    label: "Upgrade plan",
  },
  {
    classes:
      "border-2 border-emerald-400 text-emerald-400 rounded-lg px-8 py-3",
    label: "Subscribe",
  },
  {
    classes:
      "bg-amber-400 text-amber-900 font-bold rounded-md px-4 py-2 uppercase tracking-wider",
    label: "Shop now",
  },
];

export function TailwindVisualization() {
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
      setIndex((i) => (i + 1) % VARIANTS.length);
    }, 2000);
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

  const current = VARIANTS[index];

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 px-4">
        <p className="font-mono text-[10px] text-cyan-400/70 uppercase tracking-widest">
          Utility-First Preview
        </p>

        {/* Live element */}
        <div className="flex min-h-[60px] items-center justify-center">
          <div
            className={`${current.classes} fade-in zoom-in-95 animate-in text-sm duration-500`}
            key={index}
          >
            {current.label}
          </div>
        </div>

        {/* Classes display */}
        <div className="w-full max-w-[340px] rounded-md border border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
          <p className="break-words text-center font-mono text-[10px] text-cyan-300 leading-relaxed">
            {current.classes}
          </p>
        </div>
      </div>
    </div>
  );
}
