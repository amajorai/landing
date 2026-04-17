"use client";
import { useEffect, useRef } from "react";

interface Channel {
  label: string;
  icon: string;
  angle: number;
}

const CHANNELS: Channel[] = [
  { label: "Web", icon: "🌐", angle: -90 },
  { label: "iOS", icon: "📱", angle: -30 },
  { label: "Android", icon: "🤖", angle: 30 },
  { label: "Kiosk", icon: "🖥️", angle: 90 },
  { label: "Watch", icon: "⌚", angle: 150 },
  { label: "TV", icon: "📺", angle: 210 },
];

const CONTENT_TYPES = ["BlogPost", "Product", "Landing", "Author"];

export function ContentfulVisualization() {
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

      const accent = isDark ? "#facc15" : "#ca8a04";
      const accentLight = isDark
        ? "rgba(250,204,21,0.10)"
        : "rgba(202,138,4,0.07)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#94a3b8" : "#64748b";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(254,252,232,0.9)";
      const border = isDark ? "rgba(250,204,21,0.25)" : "rgba(202,138,4,0.15)";

      ctx.clearRect(0, 0, W, H);

      const hubW = W * 0.22;
      const hubH = H * 0.6;
      const hubX = (W - hubW) / 2;
      const hubY = (H - hubH) / 2;

      ctx.beginPath();
      ctx.roundRect(hubX, hubY, hubW, hubH, 8);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Contentful", hubX + hubW / 2, hubY + 8);

      const activeType = Math.floor((frame / 60) % CONTENT_TYPES.length);
      for (let i = 0; i < CONTENT_TYPES.length; i++) {
        const ty = hubY + 24 + i * 16;
        const isActive = i === activeType;

        ctx.beginPath();
        ctx.roundRect(hubX + 4, ty, hubW - 8, 13, 3);
        ctx.fillStyle = isActive ? accentLight : "transparent";
        ctx.fill();
        if (isActive) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.font = `${isActive ? "bold " : ""}7px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = isActive ? text : textDim;
        ctx.textAlign = "left";
        ctx.fillText(CONTENT_TYPES[i], hubX + 8, ty + 3);
      }

      const hubCx = hubX + hubW / 2;
      const hubCy = hubY + hubH / 2;
      const channelR = Math.min(W, H) * 0.34;

      for (let i = 0; i < CHANNELS.length; i++) {
        const ch = CHANNELS[i];
        const baseAngle = (ch.angle * Math.PI) / 180;
        const wobble = Math.sin(frame * 0.015 + i * 1.5) * 0.05;
        const angle = baseAngle + wobble;
        const nx = hubCx + Math.cos(angle) * channelR;
        const ny = hubCy + Math.sin(angle) * channelR;

        const dx = nx - hubCx;
        const dy = ny - hubCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const edgeX = hubCx + (dx / dist) * (hubW / 2 + 2);
        const edgeY = hubCy + (dy / dist) * (hubH / 2 + 2);

        ctx.beginPath();
        ctx.moveTo(edgeX, edgeY);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        const dotT = ((frame * 0.7 + i * 25) % 80) / 80;
        const dotX = edgeX + (nx - edgeX) * dotT;
        const dotY = edgeY + (ny - edgeY) * dotT;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 2 + (1 - dotT) * 2, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.8 - dotT * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;

        const nw = 44;
        const nh = 28;
        ctx.beginPath();
        ctx.roundRect(nx - nw / 2, ny - nh / 2, nw, nh, 5);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ch.icon, nx, ny - 4);
        ctx.font = "bold 6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textDim;
        ctx.fillText(ch.label, nx, ny + 8);
      }

      const cdnY = hubY + hubH + 14;
      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textDim;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const deliverBlink = Math.sin(frame * 0.08) > 0;
      ctx.globalAlpha = deliverBlink ? 1 : 0.5;
      ctx.fillText("CDN: 99.95% uptime", hubCx, cdnY);
      ctx.globalAlpha = 1;

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
