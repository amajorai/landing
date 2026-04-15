"use client";
import { useEffect, useRef } from "react";

const BARS = [
  { label: "#1", target: 0.95 },
  { label: "#2", target: 0.82 },
  { label: "#3", target: 0.7 },
  { label: "#4", target: 0.55 },
  { label: "#5", target: 0.42 },
];
const CYCLE_MS = 3200;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function SeoOptimizationVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const W = rect.width;
      const H = rect.height;
      const cx = W / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#34d399" : "#059669";
      const accentBg = isDark
        ? "rgba(52,211,153,0.12)"
        : "rgba(5,150,105,0.08)";
      const borderColor = isDark
        ? "rgba(52,211,153,0.25)"
        : "rgba(5,150,105,0.15)";
      const textColor = isDark ? "#ecfdf5" : "#064e3b";
      const goldColor = isDark ? "#fbbf24" : "#d97706";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;
      const growT =
        t < 0.05
          ? 0
          : t < 0.45
            ? easeOut((t - 0.05) / 0.4)
            : t < 0.85
              ? 1
              : 1 - (t - 0.85) / 0.15;

      const chartX = cx - 100;
      const chartY = H * 0.18;
      const chartW = 200;
      const chartH = H * 0.55;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(chartX, chartY);
      ctx.lineTo(chartX, chartY + chartH);
      ctx.lineTo(chartX + chartW, chartY + chartH);
      ctx.stroke();

      const barW = chartW / BARS.length - 10;
      const barGap = 10;

      for (let i = 0; i < BARS.length; i++) {
        const bar = BARS[i];
        const stagger = i * 0.06;
        const barT = Math.max(
          0,
          Math.min(1, (growT - stagger) / (1 - stagger * BARS.length))
        );
        const barH = chartH * bar.target * barT;
        const bx = chartX + 5 + i * (barW + barGap);
        const by = chartY + chartH - barH;

        const isTop = i === 0;

        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, [3, 3, 0, 0]);
        ctx.fillStyle =
          isTop && barT > 0.8
            ? isDark
              ? "rgba(251,191,36,0.20)"
              : "rgba(217,119,6,0.12)"
            : accentBg;
        ctx.fill();
        ctx.strokeStyle = isTop && barT > 0.8 ? goldColor : accent;
        ctx.lineWidth = isTop && barT > 0.8 ? 1.3 : 1;
        ctx.globalAlpha = 0.3 + barT * 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(bar.label, bx + barW / 2, chartY + chartH + 5);

        if (barT > 0.5) {
          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isTop && barT > 0.8 ? goldColor : accent;
          ctx.globalAlpha = (barT - 0.5) / 0.5;
          ctx.textBaseline = "bottom";
          ctx.fillText(
            Math.round(bar.target * 100).toString(),
            bx + barW / 2,
            by - 3
          );
          ctx.globalAlpha = 1;
        }
      }

      if (growT > 0.8) {
        const crownAlpha = (growT - 0.8) / 0.2;
        ctx.font = "10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = goldColor;
        ctx.globalAlpha = crownAlpha;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        const topBarX = chartX + 5 + barW / 2;
        const topBarY = chartY + chartH - chartH * BARS[0].target * growT;
        ctx.fillText("★", topBarX, topBarY - 6);
        ctx.globalAlpha = 1;
      }

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText("Search Rankings", cx, chartY + chartH + 22);

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startRef.current = 0;
            rafRef.current = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting) {
            runningRef.current = false;
            cancelAnimationFrame(rafRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <canvas
      className="h-[200px] w-full lg:h-[280px]"
      ref={canvasRef}
      style={{ display: "block" }}
    />
  );
}
