"use client";
import { useEffect, useRef } from "react";

interface Layer {
  cmd: string;
  cached: boolean;
}

const LAYERS: Layer[] = [
  { cmd: "FROM node:20-alpine", cached: true },
  { cmd: "WORKDIR /app", cached: true },
  { cmd: "COPY package.json .", cached: true },
  { cmd: "RUN npm ci", cached: true },
  { cmd: "COPY . .", cached: false },
  { cmd: "RUN npm run build", cached: false },
];

const CYCLE_MS = 6000;

export function DockerVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % CYCLE_MS;

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
      const bg = isDark ? "#0f0f0f" : "#1a1a1a";
      const layerColor = isDark
        ? "rgba(56,189,248,0.15)"
        : "rgba(2,132,199,0.12)";
      const layerBorder = isDark ? "#38bdf8" : "#0284c7";
      const cachedColor = "#fbbf24";
      const buildingColor = "#fb923c";
      const doneColor = "#4ade80";
      const textColor = isDark ? "#e2e8f0" : "#e2e8f0";
      const cmdColor = "#38bdf8";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const padX = 10;
      const topPad = 8;
      const bottomPad = 22;
      const gap = 3;
      const available = H - topPad - bottomPad;
      const layerH = Math.min(
        22,
        (available - gap * (LAYERS.length - 1)) / LAYERS.length
      );

      // Timing: cached appear fast 0-800ms, building layers 1000-4000ms
      for (let i = 0; i < LAYERS.length; i++) {
        const layer = LAYERS[i];
        const y = topPad + i * (layerH + gap);
        let visible = false;
        let progress = 1;
        let status: "hidden" | "cached" | "building" | "done" = "hidden";

        if (layer.cached) {
          const appearAt = i * 150;
          if (elapsed > appearAt) {
            visible = true;
            status = "cached";
          }
        } else {
          const buildIdx = i - 4;
          const buildStart = 900 + buildIdx * 1200;
          const buildEnd = buildStart + 1000;
          if (elapsed > buildStart) {
            visible = true;
            if (elapsed < buildEnd) {
              status = "building";
              progress = (elapsed - buildStart) / (buildEnd - buildStart);
            } else {
              status = "done";
            }
          }
        }

        if (!visible) continue;

        // Slide-in offset
        const slideStart = layer.cached ? i * 150 : 900 + (i - 4) * 1200;
        const slideDur = 250;
        const slideT = Math.min(1, (elapsed - slideStart) / slideDur);
        const offsetX = (1 - slideT) * -30;
        const alpha = slideT;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Layer rect
        ctx.fillStyle = layerColor;
        ctx.fillRect(padX + offsetX, y, W - padX * 2, layerH);
        ctx.strokeStyle = layerBorder;
        ctx.lineWidth = 1;
        ctx.strokeRect(padX + offsetX, y, W - padX * 2, layerH);

        // Command text
        ctx.font = "10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = cmdColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.cmd, padX + 6 + offsetX, y + layerH / 2);

        // Building progress bar
        if (status === "building") {
          const barX = padX + offsetX;
          const barW = (W - padX * 2) * progress;
          ctx.fillStyle = "rgba(251,146,60,0.25)";
          ctx.fillRect(barX, y, barW, layerH);
        }

        // Badge on right
        const badgeText =
          status === "cached"
            ? "CACHED"
            : status === "building"
              ? "BUILDING..."
              : "DONE";
        const badgeColor =
          status === "cached"
            ? cachedColor
            : status === "building"
              ? buildingColor
              : doneColor;

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = badgeColor;
        ctx.textAlign = "right";
        ctx.fillText(badgeText, W - padX - 6 + offsetX, y + layerH / 2);

        ctx.restore();
      }

      // Final summary after all done
      if (elapsed > 5200) {
        const fadeT = Math.min(1, (elapsed - 5200) / 400);
        ctx.globalAlpha = fadeT;
        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = doneColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("Image: 42MB", padX, H - 10);

        ctx.fillStyle = cachedColor;
        ctx.textAlign = "right";
        ctx.fillText("multi-stage", W - padX, H - 10);
        ctx.globalAlpha = 1;
      }

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
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
