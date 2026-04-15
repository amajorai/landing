"use client";
import { useEffect, useRef } from "react";

const LAYERS = ["Client", "API", "DB"];
const CYCLE_MS = 2800;

export function WebAppsVisualization() {
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
      const accent = isDark ? "#60a5fa" : "#2563eb";
      const accentBg = isDark
        ? "rgba(96,165,250,0.12)"
        : "rgba(37,99,235,0.08)";
      const lineColor = isDark
        ? "rgba(96,165,250,0.25)"
        : "rgba(37,99,235,0.18)";
      const textColor = isDark ? "#dbeafe" : "#1e3a5f";
      const reqColor = isDark ? "#60a5fa" : "#3b82f6";
      const resColor = isDark ? "#4ade80" : "#16a34a";

      ctx.clearRect(0, 0, W, H);

      const colW = 80;
      const colH = 50;
      const gap = (W - colW * 3) / 4;
      const yCenter = H / 2 - 5;
      const cols = LAYERS.map((_, i) => ({
        x: gap + i * (colW + gap),
        y: yCenter - colH / 2,
      }));

      for (let i = 0; i < 3; i++) {
        const c = cols[i];
        ctx.beginPath();
        ctx.roundRect(c.x, c.y, colW, colH, 5);
        ctx.fillStyle = accentBg;
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(LAYERS[i], c.x + colW / 2, c.y + colH / 2);
      }

      for (let i = 0; i < 2; i++) {
        const x1 = cols[i].x + colW;
        const x2 = cols[i + 1].x;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x1 + 4, yCenter - 4);
        ctx.lineTo(x2 - 4, yCenter - 4);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2 - 4, yCenter + 4);
        ctx.lineTo(x1 + 4, yCenter + 4);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;

      const pktSize = 6;
      if (t < 0.2) {
        const p = t / 0.2;
        const x1 = cols[0].x + colW + 4;
        const x2 = cols[1].x - 4;
        const px = x1 + (x2 - x1) * p;
        ctx.fillStyle = reqColor;
        ctx.beginPath();
        ctx.arc(px, yCenter - 4, pktSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (t < 0.35) {
        const p = (t - 0.2) / 0.15;
        const x1 = cols[1].x + colW + 4;
        const x2 = cols[2].x - 4;
        const px = x1 + (x2 - x1) * p;
        ctx.fillStyle = reqColor;
        ctx.beginPath();
        ctx.arc(px, yCenter - 4, pktSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (t < 0.5) {
        const pulse = Math.sin(((t - 0.35) / 0.15) * Math.PI);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.15 + pulse * 0.2;
        ctx.fillRect(cols[2].x, cols[2].y, colW, colH);
        ctx.globalAlpha = 1;
      } else if (t < 0.65) {
        const p = (t - 0.5) / 0.15;
        const x1 = cols[2].x - 4;
        const x2 = cols[1].x + colW + 4;
        const px = x1 - (x1 - x2) * p;
        ctx.fillStyle = resColor;
        ctx.beginPath();
        ctx.arc(px, yCenter + 4, pktSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (t < 0.8) {
        const p = (t - 0.65) / 0.15;
        const x1 = cols[1].x - 4;
        const x2 = cols[0].x + colW + 4;
        const px = x1 - (x1 - x2) * p;
        ctx.fillStyle = resColor;
        ctx.beginPath();
        ctx.arc(px, yCenter + 4, pktSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const pulse = Math.sin(((t - 0.8) / 0.2) * Math.PI);
        ctx.fillStyle = resColor;
        ctx.globalAlpha = 0.1 + pulse * 0.15;
        ctx.fillRect(cols[0].x, cols[0].y, colW, colH);
        ctx.globalAlpha = 1;
      }

      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = isDark ? "rgba(96,165,250,0.5)" : "rgba(37,99,235,0.4)";
      ctx.textAlign = "center";
      const labelY = yCenter + colH / 2 + 14;
      ctx.fillText("request →", (cols[0].x + colW + cols[1].x) / 2, labelY - 6);
      ctx.fillText(
        "← response",
        (cols[0].x + colW + cols[1].x) / 2,
        labelY + 4
      );

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
