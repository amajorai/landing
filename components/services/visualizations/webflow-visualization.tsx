"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 320;
const BUILD_END = 200;
const HOLD_END = 260;

interface LayoutBox {
  x: number;
  y: number;
  w: number;
  h: number;
  fromX: number;
  fromY: number;
  delay: number;
  label: string;
}

const LAYOUT: LayoutBox[] = [
  { x: 0, y: 0, w: 1, h: 0.12, fromX: 0, fromY: -0.3, delay: 0, label: "nav" },
  {
    x: 0,
    y: 0.15,
    w: 1,
    h: 0.28,
    fromX: -0.5,
    fromY: 0.15,
    delay: 15,
    label: "hero",
  },
  {
    x: 0,
    y: 0.46,
    w: 0.32,
    h: 0.22,
    fromX: 0,
    fromY: 1.2,
    delay: 35,
    label: "card",
  },
  {
    x: 0.34,
    y: 0.46,
    w: 0.32,
    h: 0.22,
    fromX: 0.34,
    fromY: 1.2,
    delay: 50,
    label: "card",
  },
  {
    x: 0.68,
    y: 0.46,
    w: 0.32,
    h: 0.22,
    fromX: 1.5,
    fromY: 0.46,
    delay: 65,
    label: "card",
  },
  {
    x: 0,
    y: 0.72,
    w: 0.48,
    h: 0.14,
    fromX: -0.6,
    fromY: 0.72,
    delay: 85,
    label: "form",
  },
  {
    x: 0.52,
    y: 0.72,
    w: 0.48,
    h: 0.14,
    fromX: 1.5,
    fromY: 0.72,
    delay: 95,
    label: "cta",
  },
  {
    x: 0,
    y: 0.9,
    w: 1,
    h: 0.1,
    fromX: 0,
    fromY: 1.3,
    delay: 110,
    label: "footer",
  },
];

export function WebflowVisualization() {
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
      const accent = "#4353FF";
      const accentDim = isDark
        ? "rgba(67,83,255,0.15)"
        : "rgba(67,83,255,0.08)";
      const boxFill = isDark ? "rgba(67,83,255,0.12)" : "rgba(67,83,255,0.06)";
      const boxStroke = isDark ? "rgba(67,83,255,0.4)" : "rgba(67,83,255,0.25)";
      const gridColor = isDark
        ? "rgba(67,83,255,0.08)"
        : "rgba(67,83,255,0.05)";
      const textColor = isDark ? "#e0e7ff" : "#1e1b4b";
      const mutedText = isDark ? "#818cf8" : "#4338ca";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const padX = 30;
      const padY = 16;
      const canvasW = W - padX * 2;
      const canvasH = H - padY * 2;

      // Grid background
      const gridStep = 20;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      for (let x = padX; x <= W - padX; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, padY);
        ctx.lineTo(x, H - padY);
        ctx.stroke();
      }
      for (let y = padY; y <= H - padY; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(W - padX, y);
        ctx.stroke();
      }

      // Canvas border
      ctx.strokeStyle = boxStroke;
      ctx.lineWidth = 1;
      ctx.strokeRect(padX, padY, canvasW, canvasH);

      // Dissolve phase
      const dissolving = frame > HOLD_END;
      const dissolveT = dissolving
        ? Math.min((frame - HOLD_END) / (TOTAL_FRAMES - HOLD_END), 1)
        : 0;

      for (const box of LAYOUT) {
        const slideFrames = 40;
        const progress = Math.min(
          Math.max((frame - box.delay) / slideFrames, 0),
          1
        );
        if (progress <= 0) continue;

        const eased = 1 - (1 - progress) ** 3;
        const alpha = dissolving ? Math.max(1 - dissolveT * 1.5, 0) : eased;

        if (alpha <= 0) continue;

        const curX = padX + (box.fromX + (box.x - box.fromX) * eased) * canvasW;
        const curY = padY + (box.fromY + (box.y - box.fromY) * eased) * canvasH;
        const bw = box.w * canvasW - 4;
        const bh = box.h * canvasH - 3;

        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.roundRect(curX + 2, curY + 1, bw, bh, 4);
        ctx.fillStyle = boxFill;
        ctx.fill();
        ctx.strokeStyle = boxStroke;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Snap indicator on landing
        if (progress >= 0.95 && progress < 1 && !dissolving) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.strokeRect(curX + 2, curY + 1, bw, bh);
        }

        // Label
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = mutedText;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(box.label, curX + 2 + bw / 2, curY + 1 + bh / 2);

        // Content lines for hero and form
        if (box.label === "hero" && eased > 0.5) {
          const lineAlpha = Math.min((eased - 0.5) * 2, 1) * alpha;
          ctx.globalAlpha = lineAlpha;
          for (let i = 0; i < 3; i++) {
            const lw = bw * (i === 0 ? 0.5 : i === 1 ? 0.35 : 0.2);
            const ly = curY + 1 + bh * 0.35 + i * 8;
            ctx.beginPath();
            ctx.roundRect(curX + 2 + (bw - lw) / 2, ly, lw, 3, 1.5);
            ctx.fillStyle = accentDim;
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
      }

      // Cursor indicator during build
      if (frame < BUILD_END && frame > 10) {
        const activeIdx = LAYOUT.findIndex(
          (b) => frame >= b.delay && frame < b.delay + 45
        );
        if (activeIdx >= 0) {
          const b = LAYOUT[activeIdx];
          const cx = padX + b.x * canvasW + (b.w * canvasW) / 2;
          const cy = padY + b.y * canvasH + (b.h * canvasH) / 2;
          ctx.beginPath();
          ctx.moveTo(cx - 4, cy - 5);
          ctx.lineTo(cx + 3, cy + 2);
          ctx.lineTo(cx - 1, cy + 2);
          ctx.lineTo(cx - 1, cy + 6);
          ctx.lineTo(cx - 4, cy + 6);
          ctx.closePath();
          ctx.fillStyle = accent;
          ctx.fill();
        }
      }

      // Title
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Visual Canvas", padX, 4);

      // Layer count
      if (frame > 30) {
        const visibleCount = LAYOUT.filter((b) => frame > b.delay).length;
        ctx.textAlign = "right";
        ctx.fillStyle = accent;
        ctx.fillText(`${visibleCount} layers`, W - padX, 4);
      }

      frameRef.current = (frame + 1) % TOTAL_FRAMES;

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
