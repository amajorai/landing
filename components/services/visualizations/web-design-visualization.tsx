"use client";
import { useEffect, useRef } from "react";

interface LayoutRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Breakpoint {
  label: string;
  frameW: number;
  frameH: number;
  rects: LayoutRect[];
}

const BP: Breakpoint[] = [
  {
    label: "Desktop",
    frameW: 160,
    frameH: 100,
    rects: [
      { x: 4, y: 4, w: 152, h: 14 },
      { x: 4, y: 22, w: 100, h: 60 },
      { x: 108, y: 22, w: 48, h: 28 },
      { x: 108, y: 54, w: 48, h: 28 },
      { x: 4, y: 86, w: 152, h: 10 },
    ],
  },
  {
    label: "Tablet",
    frameW: 110,
    frameH: 100,
    rects: [
      { x: 4, y: 4, w: 102, h: 14 },
      { x: 4, y: 22, w: 102, h: 40 },
      { x: 4, y: 66, w: 48, h: 20 },
      { x: 56, y: 66, w: 50, h: 20 },
      { x: 4, y: 90, w: 102, h: 6 },
    ],
  },
  {
    label: "Mobile",
    frameW: 56,
    frameH: 100,
    rects: [
      { x: 4, y: 4, w: 48, h: 10 },
      { x: 4, y: 18, w: 48, h: 30 },
      { x: 4, y: 52, w: 48, h: 18 },
      { x: 4, y: 74, w: 48, h: 18 },
      { x: 4, y: 94, w: 48, h: 4 },
    ],
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function WebDesignVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const PHASE_MS = 2200;
    const TOTAL_MS = PHASE_MS * BP.length;

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
      const accent = isDark ? "#a78bfa" : "#7c3aed";
      const accentLight = isDark
        ? "rgba(167,139,250,0.15)"
        : "rgba(124,58,237,0.10)";
      const borderColor = isDark
        ? "rgba(167,139,250,0.35)"
        : "rgba(124,58,237,0.25)";
      const textColor = isDark ? "#ede9fe" : "#4c1d95";
      const rectFill = isDark
        ? "rgba(167,139,250,0.12)"
        : "rgba(124,58,237,0.08)";

      ctx.clearRect(0, 0, W, H);

      const t = (now % TOTAL_MS) / PHASE_MS;
      const fromIdx = Math.floor(t) % BP.length;
      const toIdx = (fromIdx + 1) % BP.length;
      const raw = t - Math.floor(t);
      const holdRatio = 0.35;
      const p =
        raw < holdRatio ? 0 : easeInOut((raw - holdRatio) / (1 - holdRatio));

      const from = BP[fromIdx];
      const to = BP[toIdx];

      const frameW = lerp(from.frameW, to.frameW, p);
      const frameH = lerp(from.frameH, to.frameH, p);
      const scale = Math.min((W * 0.6) / 160, (H * 0.7) / 100);
      const fx = cx - (frameW * scale) / 2;
      const fy = cy - (frameH * scale) / 2;

      ctx.beginPath();
      ctx.roundRect(fx - 3, fy - 3, frameW * scale + 6, frameH * scale + 6, 6);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < from.rects.length; i++) {
        const fr = from.rects[i];
        const tr = to.rects[i];
        const rx = fx + lerp(fr.x, tr.x, p) * scale;
        const ry = fy + lerp(fr.y, tr.y, p) * scale;
        const rw = lerp(fr.w, tr.w, p) * scale;
        const rh = lerp(fr.h, tr.h, p) * scale;

        ctx.beginPath();
        ctx.roundRect(rx, ry, rw, rh, 3);
        ctx.fillStyle = i === 0 ? accentLight : rectFill;
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.globalAlpha = i === 0 ? 0.6 : 0.3;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const label = p < 0.5 ? from.label : to.label;
      ctx.font = "bold 10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(label, cx, fy + frameH * scale + 12);

      const dotY = fy + frameH * scale + 28;
      for (let i = 0; i < BP.length; i++) {
        ctx.beginPath();
        ctx.arc(cx + (i - 1) * 12, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = i === fromIdx ? 1 : 0.25;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
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
