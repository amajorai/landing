"use client";
import { useEffect, useRef } from "react";

export function PwaVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000;

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
      const swColor = isDark ? "#818cf8" : "#4f46e5";
      const cacheColor = "#4ade80";
      const networkColor = isDark ? "#60a5fa" : "#2563eb";
      const cacheHitColor = "#4ade80";
      const cacheMissColor = "#fb923c";
      const textColor = isDark ? "#eef2ff" : "#1e1b4b";

      ctx.clearRect(0, 0, W, H);

      // Cycle: 0..3s miss (network), 3..6s hit (cache)
      const cycle = 6;
      const tt = t % cycle;
      const isHit = tt >= 3;
      const localT = isHit ? (tt - 3) / 3 : tt / 3;

      // Layout
      // Browser (left), SW (center), Network (top-right), Cache (bottom-right)
      const browserX = 24;
      const browserY = H / 2;
      const swX = W / 2 - 20;
      const swY = H / 2;
      const networkX = W - 32;
      const networkY = 28;
      const cacheX = W - 32;
      const cacheY = H - 40;

      // Browser icon
      ctx.beginPath();
      ctx.roundRect(browserX - 16, browserY - 14, 32, 26, 3);
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(browserX - 16, browserY - 7);
      ctx.lineTo(browserX + 16, browserY - 7);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(browserX - 12 + i * 5, browserY - 10.5, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = textColor;
        ctx.fill();
      }
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("browser", browserX, browserY + 15);

      // Service Worker box (center)
      ctx.beginPath();
      ctx.roundRect(swX - 28, swY - 18, 56, 36, 6);
      ctx.fillStyle = swColor;
      ctx.globalAlpha = 0.12;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = swColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Service", swX, swY - 4);
      ctx.fillText("Worker", swX, swY + 6);

      // Network (cloud) top-right
      ctx.strokeStyle = networkColor;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(networkX - 6, networkY + 2, 5, Math.PI, Math.PI * 1.8);
      ctx.arc(networkX, networkY - 2, 6, Math.PI * 1.2, Math.PI * 1.9);
      ctx.arc(networkX + 6, networkY + 2, 5, Math.PI * 1.5, 0);
      ctx.lineTo(networkX + 10, networkY + 6);
      ctx.lineTo(networkX - 10, networkY + 6);
      ctx.closePath();
      ctx.stroke();
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = networkColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("network", networkX, networkY + 10);

      // Cache box bottom-right
      ctx.beginPath();
      ctx.roundRect(cacheX - 16, cacheY - 10, 32, 20, 3);
      ctx.strokeStyle = cacheColor;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = cacheColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Cache", cacheX, cacheY);
      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textBaseline = "top";
      ctx.fillText("< 1ms", cacheX, cacheY + 12);

      // Arrow: browser -> SW (always)
      drawArrow(ctx, browserX + 16, browserY, swX - 28, swY, textColor, 0.5);

      // Path arrows
      if (isHit) {
        // SW -> Cache (down), green
        drawArrow(ctx, swX, swY + 18, cacheX - 16, cacheY, cacheHitColor, 0.9);
        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = cacheHitColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          "cache hit",
          (swX + cacheX) / 2,
          swY + (cacheY - swY) / 2 - 4
        );

        // moving packet from SW to cache and back
        const phase = localT;
        let px: number, py: number;
        if (phase < 0.5) {
          const lp = phase / 0.5;
          px = swX + (cacheX - swX) * lp;
          py = swY + (cacheY - swY) * lp;
        } else {
          const lp = (phase - 0.5) / 0.5;
          px = cacheX + (swX - cacheX) * lp;
          py = cacheY + (swY - cacheY) * lp;
        }
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = cacheHitColor;
        ctx.fill();

        // dim miss path
        drawArrow(
          ctx,
          swX,
          swY - 18,
          networkX - 10,
          networkY + 6,
          cacheMissColor,
          0.2
        );
      } else {
        // SW -> Network (up), orange
        drawArrow(
          ctx,
          swX,
          swY - 18,
          networkX - 10,
          networkY + 6,
          cacheMissColor,
          0.9
        );
        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = cacheMissColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          "cache miss",
          (swX + networkX) / 2,
          swY - (swY - networkY) / 2 + 4
        );

        const phase = localT;
        let px: number, py: number;
        if (phase < 0.5) {
          const lp = phase / 0.5;
          px = swX + (networkX - swX) * lp;
          py = swY + (networkY - swY) * lp;
        } else {
          const lp = (phase - 0.5) / 0.5;
          px = networkX + (swX - networkX) * lp;
          py = networkY + (swY - networkY) * lp;
        }
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = cacheMissColor;
        ctx.fill();

        // dim hit path
        drawArrow(ctx, swX, swY + 18, cacheX - 16, cacheY, cacheHitColor, 0.2);
      }

      // Installed badge (bottom-left)
      const iconX = 18;
      const iconY = H - 22;
      ctx.beginPath();
      ctx.roundRect(iconX - 8, iconY - 8, 16, 16, 3);
      ctx.fillStyle = swColor;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = swColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      // little app silhouette
      ctx.fillStyle = swColor;
      ctx.fillRect(iconX - 4, iconY - 4, 8, 2);
      ctx.fillRect(iconX - 4, iconY, 5, 2);
      ctx.fillRect(iconX - 4, iconY + 3, 6, 2);

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Installed \u2713", iconX + 12, iconY);

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const drawArrow = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const ah = 5;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - ah * Math.cos(angle - 0.4),
        y2 - ah * Math.sin(angle - 0.4)
      );
      ctx.lineTo(
        x2 - ah * Math.cos(angle + 0.4),
        y2 - ah * Math.sin(angle + 0.4)
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
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
