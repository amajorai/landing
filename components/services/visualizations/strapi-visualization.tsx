"use client";
import { useEffect, useRef } from "react";

interface ContentType {
  name: string;
  icon: string;
  fields: number;
}

const CONTENT_TYPES: ContentType[] = [
  { name: "Article", icon: "📄", fields: 6 },
  { name: "Author", icon: "👤", fields: 4 },
  { name: "Category", icon: "🏷️", fields: 3 },
  { name: "Page", icon: "📃", fields: 5 },
];

const ENDPOINTS = [
  "GET /api/articles",
  "GET /api/authors",
  "POST /api/pages",
  "PUT /api/categories/1",
];

export function StrapiVisualization() {
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

      const accent = isDark ? "#818cf8" : "#4f46e5";
      const accentLight = isDark
        ? "rgba(129,140,248,0.12)"
        : "rgba(79,70,229,0.08)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#94a3b8" : "#64748b";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(248,250,252,0.9)";
      const border = isDark ? "rgba(129,140,248,0.25)" : "rgba(79,70,229,0.15)";
      const successColor = "#22c55e";

      ctx.clearRect(0, 0, W, H);

      const panelW = W * 0.3;
      const panelH = H * 0.8;
      const panelX = W * 0.05;
      const panelY = (H - panelH) / 2;

      ctx.beginPath();
      ctx.roundRect(panelX, panelY, panelW, panelH, 6);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Content Types", panelX + 8, panelY + 8);

      const cycleDuration = 200;
      const t = (frame % cycleDuration) / cycleDuration;

      for (let i = 0; i < CONTENT_TYPES.length; i++) {
        const ct = CONTENT_TYPES[i];
        const iy = panelY + 24 + i * 28;
        const appear = Math.min(Math.max((t - i * 0.08) * 6, 0), 1);

        ctx.globalAlpha = appear;

        const activeIdx = Math.floor((frame / 80) % CONTENT_TYPES.length);
        const isActive = i === activeIdx;

        ctx.beginPath();
        ctx.roundRect(panelX + 4, iy, panelW - 8, 22, 4);
        ctx.fillStyle = isActive ? accentLight : "transparent";
        ctx.fill();
        if (isActive) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = text;
        ctx.textAlign = "left";
        ctx.fillText(`${ct.icon} ${ct.name}`, panelX + 10, iy + 7);

        ctx.font = "6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textDim;
        ctx.textAlign = "right";
        ctx.fillText(`${ct.fields} fields`, panelX + panelW - 10, iy + 8);
      }
      ctx.globalAlpha = 1;

      const apiW = W * 0.32;
      const apiH = H * 0.8;
      const apiX = W - apiW - W * 0.05;
      const apiY = (H - apiH) / 2;

      ctx.beginPath();
      ctx.roundRect(apiX, apiY, apiW, apiH, 6);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "left";
      ctx.fillText("REST API", apiX + 8, apiY + 8);

      for (let i = 0; i < ENDPOINTS.length; i++) {
        const ey = apiY + 26 + i * 24;
        const appear = Math.min(Math.max((t - 0.3 - i * 0.08) * 5, 0), 1);
        ctx.globalAlpha = appear;

        ctx.beginPath();
        ctx.roundRect(apiX + 4, ey, apiW - 8, 18, 4);
        ctx.fillStyle = accentLight;
        ctx.fill();

        const ep = ENDPOINTS[i];
        const method = ep.split(" ")[0];
        const path = ep.split(" ")[1];

        const methodColor =
          method === "GET"
            ? successColor
            : method === "POST"
              ? "#3b82f6"
              : "#eab308";

        ctx.font = "bold 6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = methodColor;
        ctx.textAlign = "left";
        ctx.fillText(method, apiX + 8, ey + 7);

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = text;
        ctx.fillText(path, apiX + 30, ey + 7);

        const statusProg = Math.min(Math.max((t - 0.5 - i * 0.1) * 5, 0), 1);
        if (statusProg > 0) {
          ctx.globalAlpha = appear * statusProg;
          ctx.font = "bold 6px var(--font-geist-mono, monospace)";
          ctx.fillStyle = successColor;
          ctx.textAlign = "right";
          ctx.fillText("200", apiX + apiW - 10, ey + 7);
        }
      }
      ctx.globalAlpha = 1;

      const arrowStartX = panelX + panelW + 4;
      const arrowEndX = apiX - 4;
      const arrowY = H / 2;
      const arrowMidX = (arrowStartX + arrowEndX) / 2;

      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(arrowStartX, arrowY);
      ctx.lineTo(arrowEndX, arrowY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(arrowEndX - 6, arrowY - 4);
      ctx.lineTo(arrowEndX, arrowY);
      ctx.lineTo(arrowEndX - 6, arrowY + 4);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const dotX =
        arrowStartX + (arrowEndX - arrowStartX) * ((frame % 90) / 90);
      const pulseCycle = (frame % 60) / 60;
      ctx.beginPath();
      ctx.arc(dotX, arrowY, 3 + pulseCycle * 6, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = (1 - pulseCycle) * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(dotX, arrowY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textDim;
      ctx.textAlign = "center";
      ctx.fillText("auto-generate", arrowMidX, arrowY - 10);

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
