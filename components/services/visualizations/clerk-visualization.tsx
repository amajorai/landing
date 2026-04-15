"use client";
import { useEffect, useRef, useState } from "react";

const STATES = ["signin", "otp", "done"] as const;
type State = (typeof STATES)[number];

export function ClerkVisualization() {
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
      setIndex((i) => (i + 1) % STATES.length);
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

  const state: State = STATES[index];

  const Step = ({ filled }: { filled: number }) => (
    <div className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? "bg-violet-400" : "bg-violet-400/20"
          }`}
          key={i}
        />
      ))}
    </div>
  );

  const renderContent = () => {
    if (state === "signin") {
      return (
        <>
          <p className="mb-3 text-center font-semibold text-[12px] text-violet-100">
            Sign in to continue
          </p>
          <div className="mb-2 rounded-md border border-violet-500/30 bg-violet-950/40 px-2.5 py-1.5 text-[10px] text-violet-300/70">
            alice@example.com
          </div>
          <div className="mb-3 flex items-center justify-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1.5 font-medium text-[10px] text-violet-200">
            <span>⌘</span>
            <span>Continue with GitHub</span>
          </div>
          <Step filled={1} />
        </>
      );
    }
    if (state === "otp") {
      return (
        <>
          <p className="mb-1 text-center font-semibold text-[12px] text-violet-100">
            Check your email
          </p>
          <p className="mb-2 text-center text-[9px] text-violet-300/60">
            alice@example.com
          </p>
          <div className="mb-3 flex items-center justify-center gap-1">
            {["4", "1", "2", "8", "·", "·"].map((d, i) => (
              <div
                className="flex h-6 w-5 items-center justify-center rounded border border-violet-500/30 bg-violet-500/10 font-mono text-[10px] text-violet-200"
                key={i}
              >
                {d}
              </div>
            ))}
          </div>
          <Step filled={2} />
        </>
      );
    }
    return (
      <>
        <div className="mb-2 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 font-bold text-[12px] text-white">
            AW
          </div>
        </div>
        <p className="mb-1 text-center font-semibold text-[12px] text-violet-100">
          Welcome back, Alice!
        </p>
        <p className="mb-3 text-center font-medium text-[10px] text-emerald-400">
          You&apos;re signed in ✓
        </p>
        <Step filled={3} />
      </>
    );
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full items-center justify-center px-4">
        <div
          className="fade-in w-[230px] animate-in rounded-xl border border-violet-500/30 bg-gradient-to-b from-violet-950/60 to-zinc-950/60 p-4 shadow-lg shadow-violet-500/10 duration-500"
          key={index}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
