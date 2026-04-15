"use client";
import { useEffect, useRef } from "react";

const OLD_BLOCKS = ["jQuery", "PHP 5", "MySQL", "FTP"];
const NEW_BLOCKS = ["React", "Node 22", "Prisma", "CI/CD"];
const CYCLE_MS = 4000;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function LegacyModernisationVisualization() {
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
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const oldColor = isDark ? "#a8a29e" : "#78716c";
      const oldBg = isDark
        ? "rgba(168,162,158,0.10)"
        : "rgba(120,113,108,0.07)";
      const newColor = isDark ? "#4ade80" : "#16a34a";
      const newBg = isDark ? "rgba(74,222,128,0.12)" : "rgba(22,163,74,0.08)";
      const textColor = isDark ? "#f5f5f4" : "#292524";
      const arrowColor = isDark
        ? "rgba(168,162,158,0.3)"
        : "rgba(120,113,108,0.2)";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;

      const blockW = 60;
      const blockH = 22;
      const gap = 6;
      const colH = OLD_BLOCKS.length * blockH + (OLD_BLOCKS.length - 1) * gap;
      const leftX = cx - 55 - blockW / 2;
      const rightX = cx + 55 - blockW / 2;
      const startY = cy - colH / 2;

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.fillStyle = oldColor;
      ctx.globalAlpha = 0.5;
      ctx.fillText("Legacy", leftX + blockW / 2, startY - 10);
      ctx.fillStyle = newColor;
      ctx.fillText("Modern", rightX + blockW / 2, startY - 10);
      ctx.globalAlpha = 1;

      for (let i = 0; i < OLD_BLOCKS.length; i++) {
        const by = startY + i * (blockH + gap);

        const stagger = i * 0.12;
        const blockT = Math.max(0, Math.min(1, (t - stagger) / 0.25));
        const fadeOut =
          t < 0.8 ? easeInOut(blockT) : easeInOut(1 - (t - 0.8) / 0.2);
        const fadeIn =
          t < 0.8 ? easeInOut(blockT) : easeInOut(1 - (t - 0.8) / 0.2);

        ctx.beginPath();
        ctx.roundRect(leftX, by, blockW, blockH, 3);
        ctx.fillStyle = oldBg;
        ctx.globalAlpha = 1 - fadeOut * 0.6;
        ctx.fill();
        ctx.strokeStyle = oldColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1 - fadeOut * 0.5;
        ctx.setLineDash(fadeOut > 0.5 ? [3, 3] : []);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 1 - fadeOut * 0.5;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(OLD_BLOCKS[i], leftX + blockW / 2, by + blockH / 2);
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.roundRect(rightX, by, blockW, blockH, 3);
        ctx.fillStyle = newBg;
        ctx.globalAlpha = fadeIn;
        ctx.fill();
        ctx.strokeStyle = newColor;
        ctx.lineWidth = fadeIn > 0.5 ? 1.3 : 1;
        ctx.globalAlpha = fadeIn;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = fadeIn;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(NEW_BLOCKS[i], rightX + blockW / 2, by + blockH / 2);
        ctx.globalAlpha = 1;

        if (fadeOut > 0.1 && fadeOut < 0.9) {
          const arrowP = fadeOut;
          const ax =
            leftX + blockW + 4 + (rightX - leftX - blockW - 8) * arrowP;
          const ay = by + blockH / 2;
          ctx.beginPath();
          ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = newColor;
          ctx.globalAlpha = 0.6;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      ctx.strokeStyle = arrowColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy - colH / 2 + 2);
      ctx.lineTo(cx + 2, cy);
      ctx.lineTo(cx - 6, cy + colH / 2 - 2);
      ctx.stroke();
      ctx.setLineDash([]);

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
