"use client";
import { useEffect, useRef } from "react";

const DOC_SECTIONS = [
  { type: "h1", text: "# API Reference" },
  { type: "h2", text: "## Authentication" },
  { type: "code", text: "Authorization: Bearer <token>" },
  { type: "h2", text: "## Endpoints" },
  { type: "code", text: "GET  /v1/users/:id" },
  { type: "code", text: "POST /v1/users" },
];
const CYCLE_MS = 4600;

export function TechnicalDocumentationVisualization() {
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

      const accent = isDark ? "#fb923c" : "#ea580c";
      const accentCode = isDark ? "#fbbf24" : "#b45309";
      const accentH1 = isDark ? "#f97316" : "#c2410c";
      const accentH2 = isDark ? "#fdba74" : "#9a3412";
      const bgSidebar = isDark
        ? "rgba(251,146,60,0.07)"
        : "rgba(234,88,12,0.05)";
      const bgCode = isDark ? "rgba(251,191,36,0.09)" : "rgba(180,83,9,0.06)";
      const borderColor = isDark
        ? "rgba(251,146,60,0.22)"
        : "rgba(234,88,12,0.15)";
      const textColor = isDark ? "#fed7aa" : "#431407";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS;

      // sidebar TOC
      const sideW = W * 0.26;
      const mainX = W * 0.32;
      const mainW = W * 0.62;
      const padY = H * 0.08;
      const padH = H * 0.84;

      // sidebar bg
      ctx.fillStyle = bgSidebar;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(W * 0.04, padY, sideW, padH, 4);
      ctx.fill();
      ctx.stroke();

      // sidebar label
      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("CONTENTS", W * 0.04 + 8, padY + 8);

      const tocItems = ["Authentication", "Endpoints", "Errors", "Rate Limits"];
      for (let i = 0; i < tocItems.length; i++) {
        const itemT = t < 0.1 ? 0 : Math.min(1, (t - 0.1 - i * 0.06) / 0.2);
        if (itemT <= 0) continue;
        ctx.globalAlpha = itemT;
        const iy = padY + 26 + i * 16;
        const isActive = i < 2;
        ctx.font = `${isActive ? "bold " : ""}8px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = isActive ? accent : textColor;
        ctx.fillText(tocItems[i], W * 0.04 + 10, iy);
        if (isActive) {
          ctx.fillStyle = accent;
          ctx.fillRect(W * 0.04 + 2, iy + 1, 2, 9);
        }
        ctx.globalAlpha = 1;
      }

      // main content
      ctx.fillStyle = isDark ? "rgba(251,146,60,0.04)" : "rgba(234,88,12,0.03)";
      ctx.strokeStyle = borderColor;
      ctx.beginPath();
      ctx.roundRect(mainX, padY, mainW, padH, 4);
      ctx.fill();
      ctx.stroke();

      const lineH = padH / (DOC_SECTIONS.length + 2);
      const contentX = mainX + 12;

      for (let i = 0; i < DOC_SECTIONS.length; i++) {
        const sec = DOC_SECTIONS[i];
        const lineT = t < 0.05 ? 0 : Math.min(1, (t - 0.05 - i * 0.09) / 0.25);
        if (lineT <= 0) continue;

        const ly = padY + lineH * (i + 1.1);
        ctx.globalAlpha = lineT;

        if (sec.type === "code") {
          const codeW = mainW - 24;
          ctx.fillStyle = bgCode;
          ctx.strokeStyle = isDark
            ? "rgba(251,191,36,0.2)"
            : "rgba(180,83,9,0.15)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.roundRect(contentX - 4, ly - 7, codeW, 14, 2);
          ctx.fill();
          ctx.stroke();
          ctx.font = "9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accentCode;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(sec.text, contentX + 2, ly);
        } else {
          const isH1 = sec.type === "h1";
          ctx.font = `${isH1 ? "bold " : ""}${isH1 ? 11 : 9}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = isH1 ? accentH1 : accentH2;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(sec.text, contentX, ly);
        }
        ctx.globalAlpha = 1;
      }

      // search bar pulse
      if (t > 0.65) {
        const alpha =
          Math.min(1, (t - 0.65) / 0.15) * (1 - Math.max(0, (t - 0.88) / 0.12));
        ctx.globalAlpha = alpha;
        const sbX = mainX + mainW * 0.15;
        const sbW = mainW * 0.7;
        const sbY = padY + padH + 6;
        ctx.fillStyle = isDark
          ? "rgba(251,146,60,0.12)"
          : "rgba(234,88,12,0.08)";
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(sbX, sbY, sbW, 14, 7);
        ctx.fill();
        ctx.stroke();
        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("Search docs...", sbX + 8, sbY + 7);
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
