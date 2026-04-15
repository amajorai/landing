"use client";
import { useEffect, useRef } from "react";

const STAGES = ["Commit", "Build", "Test", "Deploy"];
const CYCLE_MS = 3200;

export function DevopsVisualization() {
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
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#22d3ee" : "#0891b2";
      const accentBg = isDark
        ? "rgba(34,211,238,0.10)"
        : "rgba(8,145,178,0.07)";
      const borderColor = isDark
        ? "rgba(34,211,238,0.3)"
        : "rgba(8,145,178,0.2)";
      const textColor = isDark ? "#ecfeff" : "#164e63";
      const doneColor = isDark ? "#4ade80" : "#16a34a";
      const activeColor = isDark ? "#22d3ee" : "#06b6d4";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;

      const stageW = 56;
      const stageH = 36;
      const arrowW = 20;
      const totalW = STAGES.length * stageW + (STAGES.length - 1) * arrowW;
      const startX = (W - totalW) / 2;

      const stageProgress = t * (STAGES.length + 0.5);

      for (let i = 0; i < STAGES.length; i++) {
        const sx = startX + i * (stageW + arrowW);
        const stageDone = stageProgress > i + 1;
        const stageActive = stageProgress > i && stageProgress <= i + 1;
        const localP = stageActive ? stageProgress - i : 0;

        ctx.beginPath();
        ctx.roundRect(sx, cy - stageH / 2, stageW, stageH, 4);
        ctx.fillStyle = stageDone
          ? isDark
            ? "rgba(74,222,128,0.15)"
            : "rgba(22,163,74,0.08)"
          : stageActive
            ? isDark
              ? "rgba(34,211,238,0.18)"
              : "rgba(8,145,178,0.10)"
            : accentBg;
        ctx.fill();
        ctx.strokeStyle = stageDone
          ? doneColor
          : stageActive
            ? activeColor
            : borderColor;
        ctx.lineWidth = stageDone || stageActive ? 1.5 : 1;
        ctx.stroke();

        if (stageActive) {
          const barW = stageW - 10;
          ctx.beginPath();
          ctx.roundRect(sx + 5, cy + 6, barW * localP, 3, 1);
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        if (stageDone) {
          ctx.font = "10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = doneColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", sx + stageW / 2, cy - 2);
        }

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(STAGES[i], sx + stageW / 2, cy - stageH / 2 - 4);

        if (i < STAGES.length - 1) {
          const ax1 = sx + stageW + 3;
          const ax2 = sx + stageW + arrowW - 3;
          const done = stageProgress > i + 1;

          ctx.strokeStyle = done ? doneColor : borderColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = done ? 0.6 : 0.3;
          ctx.beginPath();
          ctx.moveTo(ax1, cy);
          ctx.lineTo(ax2, cy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ax2 - 4, cy - 3);
          ctx.lineTo(ax2, cy);
          ctx.lineTo(ax2 - 4, cy + 3);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      const pktStage = Math.floor(stageProgress);
      const pktLocal = stageProgress - pktStage;
      if (pktStage < STAGES.length && pktLocal > 0.8) {
        const fromX = startX + pktStage * (stageW + arrowW) + stageW + 3;
        const toX = fromX + arrowW - 6;
        const pp = (pktLocal - 0.8) / 0.2;
        const px = fromX + (toX - fromX) * pp;
        ctx.beginPath();
        ctx.arc(px, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.fill();
      }

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText("CI/CD Pipeline", W / 2, cy + stageH / 2 + 18);

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
