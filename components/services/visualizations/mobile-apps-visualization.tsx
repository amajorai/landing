"use client";
import { useEffect, useRef } from "react";

const CYCLE_FRAMES = 180;

export function MobileAppsVisualization() {
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
      const cx = W / 2;
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#4ade80" : "#16a34a";
      const accentBg = isDark
        ? "rgba(74,222,128,0.12)"
        : "rgba(22,163,74,0.08)";
      const borderColor = isDark
        ? "rgba(74,222,128,0.35)"
        : "rgba(22,163,74,0.25)";
      const textColor = isDark ? "#dcfce7" : "#14532d";
      const codeColor = isDark ? "#86efac" : "#22c55e";

      ctx.clearRect(0, 0, W, H);

      const phoneW = 48;
      const phoneH = 80;
      const spacing = 60;
      const bridgeW = spacing + 20;

      const iosX = cx - spacing / 2 - phoneW;
      const androidX = cx + spacing / 2;
      const phoneY = cy - phoneH / 2;

      for (const px of [iosX, androidX]) {
        ctx.beginPath();
        ctx.roundRect(px, phoneY, phoneW, phoneH, 8);
        ctx.fillStyle = accentBg;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(px + 4, phoneY + 14, phoneW - 8, phoneH - 22, 2);
        ctx.fillStyle = isDark
          ? "rgba(74,222,128,0.06)"
          : "rgba(22,163,74,0.04)";
        ctx.fill();
      }

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("iOS", iosX + phoneW / 2, phoneY + 8);
      ctx.fillText("Android", androidX + phoneW / 2, phoneY + 8);

      const frame = frameRef.current;
      const bridgeCx = cx;
      const bridgeY1 = cy - 6;
      const bridgeY2 = cy + 6;

      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(iosX + phoneW, bridgeY1);
      ctx.lineTo(androidX, bridgeY1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(iosX + phoneW, bridgeY2);
      ctx.lineTo(androidX, bridgeY2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.fillStyle = codeColor;
      ctx.globalAlpha = 0.6;
      ctx.textAlign = "center";
      ctx.fillText("shared code", bridgeCx, cy - 14);
      ctx.globalAlpha = 1;

      const numPackets = 3;
      for (let i = 0; i < numPackets; i++) {
        const offset = (frame + i * (CYCLE_FRAMES / numPackets)) % CYCLE_FRAMES;
        const p = offset / CYCLE_FRAMES;

        const startX = iosX + phoneW;
        const endX = androidX;
        const px = startX + (endX - startX) * p;
        const lineY = i % 2 === 0 ? bridgeY1 : bridgeY2;

        ctx.beginPath();
        ctx.arc(px, lineY, 3, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(px, lineY, 0, px, lineY, 5);
        grd.addColorStop(0, codeColor);
        grd.addColorStop(1, codeColor + "00");
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, lineY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = codeColor;
        ctx.fill();
      }

      const screenItems = 3;
      for (const px of [iosX, androidX]) {
        const screenX = px + 6;
        const screenW = phoneW - 12;
        const screenTop = phoneY + 18;
        for (let i = 0; i < screenItems; i++) {
          const iy = screenTop + i * 16;
          const flash = (frame + i * 20) % 90 < 15;
          ctx.beginPath();
          ctx.roundRect(screenX, iy, screenW, 12, 2);
          ctx.fillStyle = flash
            ? isDark
              ? "rgba(74,222,128,0.20)"
              : "rgba(22,163,74,0.12)"
            : isDark
              ? "rgba(74,222,128,0.06)"
              : "rgba(22,163,74,0.04)";
          ctx.fill();
          ctx.strokeStyle = accent;
          ctx.globalAlpha = flash ? 0.5 : 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText("React Native Bridge", cx, phoneY + phoneH + 14);

      frameRef.current = frame + 1;
      if (frameRef.current >= CYCLE_FRAMES) frameRef.current = 0;

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
