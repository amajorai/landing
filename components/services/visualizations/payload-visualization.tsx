"use client";
import { useEffect, useRef } from "react";

interface Collection {
  name: string;
  fields: string[];
  y: number;
}

const COLLECTIONS: Collection[] = [
  { name: "Posts", fields: ["title", "slug", "content", "author"], y: 0 },
  { name: "Users", fields: ["email", "role", "name"], y: 0 },
  { name: "Media", fields: ["url", "alt", "width"], y: 0 },
];

export function PayloadVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
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
      const frame = frameRef.current;

      const accent = isDark ? "#3b82f6" : "#2563eb";
      const accentLight = isDark
        ? "rgba(59,130,246,0.15)"
        : "rgba(37,99,235,0.10)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#64748b" : "#94a3b8";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(241,245,249,0.9)";
      const border = isDark ? "rgba(59,130,246,0.3)" : "rgba(37,99,235,0.2)";
      const pulseColor = isDark ? "#60a5fa" : "#3b82f6";

      ctx.clearRect(0, 0, W, H);

      const colW = W * 0.22;
      const colH = H * 0.7;
      const gap = (W - colW * 3) / 4;
      const baseY = H * 0.18;

      const cycleDuration = 240;
      const t = (frame % cycleDuration) / cycleDuration;

      for (let i = 0; i < COLLECTIONS.length; i++) {
        const col = COLLECTIONS[i];
        const x = gap + i * (colW + gap);
        const y = baseY;

        const stagger = i * 0.15;
        const appear = Math.min(Math.max((t - stagger) * 4, 0), 1);
        if (appear <= 0) continue;

        ctx.globalAlpha = appear;

        ctx.beginPath();
        ctx.roundRect(x, y, colW, colH, 6);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(x, y, colW, 22, [6, 6, 0, 0]);
        ctx.fillStyle = accentLight;
        ctx.fill();

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(col.name, x + colW / 2, y + 11);

        for (let f = 0; f < col.fields.length; f++) {
          const fy = y + 30 + f * 16;
          const fieldAppear = Math.min(
            Math.max((t - stagger - 0.1 - f * 0.05) * 6, 0),
            1
          );
          if (fieldAppear <= 0) continue;

          ctx.globalAlpha = appear * fieldAppear;
          ctx.font = "7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = textDim;
          ctx.textAlign = "left";
          ctx.fillText(col.fields[f], x + 8, fy);

          const typeW = colW * 0.3;
          ctx.beginPath();
          ctx.roundRect(x + colW - typeW - 6, fy - 5, typeW, 10, 3);
          ctx.fillStyle = accentLight;
          ctx.fill();
          ctx.font = "6px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "center";
          ctx.fillText(
            f === 0 ? "text" : f === 1 ? "slug" : "rel",
            x + colW - typeW / 2 - 6,
            fy
          );
        }

        ctx.globalAlpha = 1;
      }

      const hookPhase = Math.max(t - 0.5, 0) * 2;
      if (hookPhase > 0) {
        const hookAlpha = Math.min(hookPhase, 1);
        const pulseCycle = (frame % 60) / 60;
        const pulseR = 3 + pulseCycle * 8;
        const pulseAlpha = hookAlpha * (1 - pulseCycle) * 0.6;

        for (let i = 0; i < 2; i++) {
          const x1 = gap + i * (colW + gap) + colW;
          const x2 = gap + (i + 1) * (colW + gap);
          const midY = baseY + colH * 0.4 + i * 20;

          ctx.globalAlpha = hookAlpha;
          ctx.beginPath();
          ctx.moveTo(x1, midY);
          ctx.lineTo(x2, midY);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          const arrowX = x2 - 4;
          ctx.beginPath();
          ctx.moveTo(arrowX, midY - 4);
          ctx.lineTo(x2, midY);
          ctx.lineTo(arrowX, midY + 4);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          const dotX = x1 + (x2 - x1) * ((frame % 90) / 90);
          ctx.beginPath();
          ctx.arc(dotX, midY, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = pulseColor;
          ctx.globalAlpha = pulseAlpha;
          ctx.fill();
          ctx.globalAlpha = hookAlpha;
          ctx.beginPath();
          ctx.arc(dotX, midY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pulseColor;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textDim;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Payload Config-as-Code", W / 2, H - 16);

      frameRef.current = frame + 1;
      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
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
