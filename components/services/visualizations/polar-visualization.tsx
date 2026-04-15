"use client";
import { useEffect, useRef, useState } from "react";

type Period = {
  label: string;
  mrr: number;
  subs: number;
  mrrDelta: number;
  subsDelta: number;
  churn: number;
  churnDelta: number;
  spark: number[];
};

const PERIODS: Period[] = [
  {
    label: "This Month",
    mrr: 12_480,
    subs: 342,
    mrrDelta: 18,
    subsDelta: 24,
    churn: 2.1,
    churnDelta: 0.3,
    spark: [30, 34, 32, 40, 44, 42, 52, 58, 62, 68],
  },
  {
    label: "Last Month",
    mrr: 10_580,
    subs: 318,
    mrrDelta: 12,
    subsDelta: 18,
    churn: 2.4,
    churnDelta: 0.2,
    spark: [24, 28, 26, 30, 34, 38, 36, 44, 48, 52],
  },
  {
    label: "YTD",
    mrr: 98_400,
    subs: 342,
    mrrDelta: 142,
    subsDelta: 210,
    churn: 2.3,
    churnDelta: 0.5,
    spark: [10, 18, 24, 30, 38, 46, 52, 60, 68, 78],
  },
];

export function PolarVisualization() {
  const [isDark, setIsDark] = useState(true);
  const [periodIndex, setPeriodIndex] = useState(0);
  const [counts, setCounts] = useState({ mrr: 0, subs: 0, churn: 0 });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const animateCounts = (target: Period) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      if (!runningRef.current) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setCounts({
        mrr: Math.round(target.mrr * eased),
        subs: Math.round(target.subs * eased),
        churn: +(target.churn * eased).toFixed(1),
      });
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    animateCounts(PERIODS[0]);
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setPeriodIndex((i) => {
        const next = (i + 1) % PERIODS.length;
        animateCounts(PERIODS[next]);
        return next;
      });
    }, 2800);
  };

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const mo = new MutationObserver(checkDark);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const container = containerRef.current;
    if (!container) return () => mo.disconnect();

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
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observerRef.current?.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const period = PERIODS[periodIndex];
  const colors = {
    metric: isDark ? "#60a5fa" : "#2563eb",
    positive: "#4ade80",
    cardBg: isDark ? "rgba(59,130,246,0.10)" : "rgba(37,99,235,0.08)",
    text: isDark ? "#eff6ff" : "#1e3a8a",
    muted: isDark ? "rgba(239,246,255,0.6)" : "rgba(30,58,138,0.6)",
    border: isDark ? "rgba(96,165,250,0.25)" : "rgba(37,99,235,0.2)",
  };

  // Sparkline path
  const sparkW = 120;
  const sparkH = 24;
  const sparkMax = Math.max(...period.spark);
  const sparkMin = Math.min(...period.spark);
  const sparkRange = sparkMax - sparkMin || 1;
  const points = period.spark
    .map((v, i) => {
      const x = (i / (period.spark.length - 1)) * sparkW;
      const y = sparkH - ((v - sparkMin) / sparkRange) * sparkH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col gap-2 p-3">
        <p
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: colors.muted }}
        >
          Revenue · {period.label}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {/* MRR */}
          <div
            className="rounded-md border p-2"
            style={{ background: colors.cardBg, borderColor: colors.border }}
          >
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.muted }}
            >
              MRR
            </p>
            <p
              className="font-bold text-[13px] tabular-nums"
              style={{ color: colors.text }}
            >
              ${counts.mrr.toLocaleString()}
            </p>
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.positive }}
            >
              ↑ {period.mrrDelta}%
            </p>
          </div>

          {/* Subs */}
          <div
            className="rounded-md border p-2"
            style={{ background: colors.cardBg, borderColor: colors.border }}
          >
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.muted }}
            >
              Active Subs
            </p>
            <p
              className="font-bold text-[13px] tabular-nums"
              style={{ color: colors.text }}
            >
              {counts.subs}
            </p>
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.positive }}
            >
              ↑ {period.subsDelta} new
            </p>
          </div>

          {/* Churn */}
          <div
            className="rounded-md border p-2"
            style={{ background: colors.cardBg, borderColor: colors.border }}
          >
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.muted }}
            >
              Churn
            </p>
            <p
              className="font-bold text-[13px] tabular-nums"
              style={{ color: colors.text }}
            >
              {counts.churn}%
            </p>
            <p
              className="font-medium text-[8px]"
              style={{ color: colors.positive }}
            >
              ↓ {period.churnDelta}%
            </p>
          </div>
        </div>

        {/* Sparkline */}
        <div
          className="flex-1 rounded-md border p-2"
          style={{ background: colors.cardBg, borderColor: colors.border }}
        >
          <p
            className="mb-1 font-medium text-[8px]"
            style={{ color: colors.muted }}
          >
            Revenue trend
          </p>
          <svg
            height={sparkH + 4}
            preserveAspectRatio="none"
            viewBox={`0 0 ${sparkW} ${sparkH + 4}`}
            width="100%"
          >
            <polyline
              fill="none"
              points={points}
              stroke={colors.metric}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <polyline
              fill={colors.metric}
              fillOpacity="0.15"
              points={`0,${sparkH + 4} ${points} ${sparkW},${sparkH + 4}`}
              stroke="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
