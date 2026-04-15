"use client";
import { useEffect, useRef } from "react";

const BRANDS = [
  { name: "Brand A", primary: "#6366f1", secondary: "#818cf8" },
  { name: "Brand B", primary: "#ec4899", secondary: "#f472b6" },
  { name: "Brand C", primary: "#f59e0b", secondary: "#fbbf24" },
  { name: "Brand D", primary: "#10b981", secondary: "#34d399" },
];
const CYCLE_MS = 2400;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number): string {
  const ra = Number.parseInt(a.slice(1, 3), 16);
  const ga = Number.parseInt(a.slice(3, 5), 16);
  const ba = Number.parseInt(a.slice(5, 7), 16);
  const rb = Number.parseInt(b.slice(1, 3), 16);
  const gb = Number.parseInt(b.slice(3, 5), 16);
  const bb = Number.parseInt(b.slice(5, 7), 16);
  const r = Math.round(lerp(ra, rb, t));
  const g = Math.round(lerp(ga, gb, t));
  const blue = Math.round(lerp(ba, bb, t));
  return `rgb(${r},${g},${blue})`;
}

export function WhiteLabelVisualization() {
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
      const bgFill = isDark
        ? "rgba(161,161,170,0.06)"
        : "rgba(113,113,122,0.04)";
      const borderColor = isDark
        ? "rgba(161,161,170,0.25)"
        : "rgba(113,113,122,0.15)";
      const textColor = isDark ? "#fafafa" : "#27272a";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % (CYCLE_MS * BRANDS.length);
      const totalT = elapsed / CYCLE_MS;
      const fromIdx = Math.floor(totalT) % BRANDS.length;
      const toIdx = (fromIdx + 1) % BRANDS.length;
      const raw = totalT - Math.floor(totalT);
      const holdRatio = 0.4;
      const p =
        raw < holdRatio ? 0 : easeInOut((raw - holdRatio) / (1 - holdRatio));

      const from = BRANDS[fromIdx];
      const to = BRANDS[toIdx];
      const primary = lerpColor(from.primary, to.primary, p);
      const secondary = lerpColor(from.secondary, to.secondary, p);
      const brandName = p < 0.5 ? from.name : to.name;

      const cardW = 150;
      const cardH = 95;
      const cardX = cx - cardW / 2;
      const cardY = cy - cardH / 2 - 5;

      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 6);
      ctx.fillStyle = bgFill;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      const headerH = 18;
      ctx.beginPath();
      ctx.roundRect(cardX + 1, cardY + 1, cardW - 2, headerH, [5, 5, 0, 0]);
      ctx.fillStyle = primary;
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(cardX + 14, cardY + headerH / 2 + 1, 5, 0, Math.PI * 2);
      ctx.fillStyle = primary;
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(brandName, cardX + 24, cardY + headerH / 2 + 1);

      const contentY = cardY + headerH + 8;
      for (let i = 0; i < 3; i++) {
        const lw = (cardW - 16) * (0.7 + Math.sin(i * 2) * 0.15);
        ctx.beginPath();
        ctx.roundRect(cardX + 8, contentY + i * 11, lw, 6, 2);
        ctx.fillStyle = isDark
          ? "rgba(161,161,170,0.08)"
          : "rgba(113,113,122,0.05)";
        ctx.fill();
      }

      const btnW = 50;
      const btnH = 16;
      const btnX = cardX + 8;
      const btnY = cardY + cardH - btnH - 8;
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, 4);
      ctx.fillStyle = primary;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = primary;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      const accentDotX = cardX + cardW - 20;
      const accentDotY = btnY + btnH / 2;
      ctx.beginPath();
      ctx.arc(accentDotX, accentDotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = secondary;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;

      const dotsY = cardY + cardH + 12;
      for (let i = 0; i < BRANDS.length; i++) {
        ctx.beginPath();
        ctx.arc(
          cx + (i - (BRANDS.length - 1) / 2) * 12,
          dotsY,
          2.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = BRANDS[i].primary;
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
