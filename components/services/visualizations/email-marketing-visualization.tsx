"use client";
import { useEffect, useRef } from "react";

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

const STAGES = [
  { label: "Sent", value: 1.0, sublabel: "10,000" },
  { label: "Opened", value: 0.42, sublabel: "4,200" },
  { label: "Clicked", value: 0.18, sublabel: "1,800" },
  { label: "Converted", value: 0.07, sublabel: "700" },
];
const CYCLE_MS = 3800;

export function EmailMarketingVisualization() {
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

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#38bdf8" : "#0284c7";
      const accentDim = isDark
        ? "rgba(56,189,248,0.14)"
        : "rgba(2,132,199,0.09)";
      const borderColor = isDark
        ? "rgba(56,189,248,0.25)"
        : "rgba(2,132,199,0.18)";
      const textColor = isDark ? "#e0f2fe" : "#0c4a6e";
      const subColor = isDark
        ? "rgba(224,242,254,0.45)"
        : "rgba(12,74,110,0.45)";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS;

      const growT = t < 0.08 ? 0 : t < 0.55 ? easeOut((t - 0.08) / 0.47) : 1;

      const n = STAGES.length;
      const totalGap = W * 0.06;
      const barAreaW = (W - totalGap * 2) / n;
      const maxBarH = H * 0.52;
      const baseY = H * 0.78;

      for (let i = 0; i < n; i++) {
        const stage = STAGES[i];
        const stagger = i * 0.07;
        const barT = Math.max(
          0,
          Math.min(1, (growT - stagger) / (1 - stagger * n * 0.5))
        );
        const bh = maxBarH * stage.value * barT;
        const bx = totalGap + i * barAreaW + barAreaW * 0.2;
        const bw = barAreaW * 0.6;
        const by = baseY - bh;

        // bar fill
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, [3, 3, 0, 0]);
        ctx.fillStyle = accentDim;
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.25 + barT * 0.75;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // connector line between bars
        if (i < n - 1 && barT > 0.3) {
          const nextStage = STAGES[i + 1];
          const nextT = Math.max(
            0,
            Math.min(
              1,
              (growT - (i + 1) * 0.07) / (1 - (i + 1) * 0.07 * n * 0.5)
            )
          );
          const nextH = maxBarH * nextStage.value * nextT;
          const nx = totalGap + (i + 1) * barAreaW + barAreaW * 0.2;
          ctx.strokeStyle = isDark
            ? "rgba(56,189,248,0.18)"
            : "rgba(2,132,199,0.12)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(bx + bw, by);
          ctx.lineTo(nx, baseY - nextH);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // label below
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(stage.label, bx + bw / 2, baseY + 6);

        // count above bar
        if (barT > 0.5) {
          ctx.globalAlpha = (barT - 0.5) / 0.5;
          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textBaseline = "bottom";
          ctx.fillText(stage.sublabel, bx + bw / 2, by - 3);
          ctx.globalAlpha = 1;
        }
      }

      // base line
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(totalGap * 0.6, baseY);
      ctx.lineTo(W - totalGap * 0.6, baseY);
      ctx.stroke();

      // title
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = subColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("Email Campaign Funnel", W / 2, H * 0.12);

      // open rate badge
      if (growT > 0.7) {
        const alpha = (growT - 0.7) / 0.3;
        ctx.globalAlpha = alpha;
        const badgeX = W - totalGap - 2;
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText("42% open rate", badgeX, H * 0.12);
        ctx.globalAlpha = 1;
      }

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
