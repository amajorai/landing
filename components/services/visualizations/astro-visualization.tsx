"use client";
import { useEffect, useRef } from "react";

interface Island {
  x: number; // relative
  y: number;
  w: number;
  h: number;
  label: string;
}

const ISLANDS: Island[] = [
  { x: 0.08, y: 0.12, w: 0.84, h: 0.18, label: "Header" },
  { x: 0.08, y: 0.38, w: 0.3, h: 0.48, label: "Sidebar" },
  { x: 0.44, y: 0.56, w: 0.48, h: 0.3, label: "Widget" },
];

export function AstroVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const cycleStartRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const CYCLE = 5500; // 1s each hydrate + 1.5s pause + 1s reset

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
      const islandColor = isDark ? "#a78bfa" : "#7c3aed";
      const islandGlow = isDark
        ? "rgba(167,139,250,0.2)"
        : "rgba(124,58,237,0.15)";
      const staticColor = isDark
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.04)";
      const staticStroke = isDark
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.15)";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";
      const dim = isDark ? "rgba(167,139,250,0.35)" : "rgba(124,58,237,0.35)";

      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      let t = now - cycleStartRef.current;
      if (t > CYCLE) {
        cycleStartRef.current = now;
        t = 0;
      }

      // Static HTML background page
      const pageX = 6;
      const pageY = 6;
      const pageW = W - 12;
      const pageH = H - 24;
      ctx.beginPath();
      ctx.roundRect(pageX, pageY, pageW, pageH, 6);
      ctx.fillStyle = staticColor;
      ctx.fill();
      ctx.strokeStyle = staticStroke;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Static content lines (simulate text)
      ctx.strokeStyle = staticStroke;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = pageY + 14 + i * 8;
        ctx.beginPath();
        ctx.moveTo(pageX + 8, y);
        ctx.lineTo(
          pageX + 8 + Math.random() * 0 + (i === 4 ? 40 : pageW - 20),
          y
        );
        ctx.stroke();
      }

      // Islands
      ISLANDS.forEach((isl, i) => {
        const hydrateStart = i * 1000;
        const hydrated = t >= hydrateStart && t < 4500;
        const hydrationProg = Math.max(
          0,
          Math.min(1, (t - hydrateStart) / 400)
        );

        const x = pageX + isl.x * pageW;
        const y = pageY + isl.y * pageH;
        const w = isl.w * pageW;
        const h = isl.h * pageH;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 4);

        if (hydrated) {
          ctx.fillStyle = islandGlow;
          ctx.globalAlpha = 0.5 + hydrationProg * 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = islandColor;
          ctx.lineWidth = 1.3 + hydrationProg * 0.8;
          ctx.stroke();

          // Pulsing border animation
          const pulse = (Math.sin(now / 300) * 0.5 + 0.5) * 0.4;
          ctx.strokeStyle = islandColor;
          ctx.globalAlpha = pulse;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Label
          ctx.font = "bold 9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = textColor;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(isl.label, x + 6, y + 5);

          // Cursor icon (simple arrow)
          const cx = x + w - 12;
          const cy = y + h - 12;
          ctx.fillStyle = islandColor;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + 6, cy + 2);
          ctx.lineTo(cx + 2, cy + 6);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = staticColor;
          ctx.fill();
          ctx.setLineDash([3, 2]);
          ctx.strokeStyle = dim;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.font = "9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = dim;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(isl.label, x + 6, y + 5);
        }
      });

      // Footer legend
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const legendY = H - 10;
      ctx.fillStyle = staticStroke;
      ctx.fillRect(10, legendY - 3, 8, 6);
      ctx.fillStyle = isDark ? "#a1a1aa" : "#52525b";
      ctx.fillText("Static HTML", 22, legendY);

      ctx.fillStyle = islandColor;
      ctx.fillRect(100, legendY - 3, 8, 6);
      ctx.fillText("Islands", 112, legendY);

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            cycleStartRef.current = performance.now();
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
