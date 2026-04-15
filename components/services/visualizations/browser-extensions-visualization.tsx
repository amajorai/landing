"use client";
import { useEffect, useRef } from "react";

const CYCLE_FRAMES = 200;

export function BrowserExtensionsVisualization() {
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

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#fb923c" : "#ea580c";
      const accentBg = isDark
        ? "rgba(251,146,60,0.10)"
        : "rgba(234,88,12,0.07)";
      const borderColor = isDark
        ? "rgba(251,146,60,0.3)"
        : "rgba(234,88,12,0.2)";
      const textColor = isDark ? "#fff7ed" : "#7c2d12";
      const puzzleColor = isDark ? "#fb923c" : "#f97316";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const bW = Math.min(W * 0.7, 240);
      const bH = bW * 0.55;
      const bx = cx - bW / 2;
      const by = H / 2 - bH / 2 - 5;
      const tabBarH = 16;

      ctx.beginPath();
      ctx.roundRect(bx, by, bW, bH, 6);
      ctx.fillStyle = accentBg;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bx, by + tabBarH);
      ctx.lineTo(bx + bW, by + tabBarH);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(bx + 8 + i * 8, by + tabBarH / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.roundRect(bx + 30, by + 4, bW * 0.5, tabBarH - 8, 3);
      ctx.fillStyle = isDark ? "rgba(251,146,60,0.08)" : "rgba(234,88,12,0.05)";
      ctx.fill();

      const contentY = by + tabBarH + 6;
      const contentH = bH - tabBarH - 12;
      const lines = 5;
      for (let i = 0; i < lines; i++) {
        const lw = bW * (0.3 + Math.sin(i * 1.7) * 0.2);
        ctx.beginPath();
        ctx.roundRect(bx + 10, contentY + i * (contentH / lines), lw, 6, 2);
        ctx.fillStyle = isDark
          ? "rgba(251,146,60,0.06)"
          : "rgba(234,88,12,0.04)";
        ctx.fill();
      }

      const puzzleSize = 28;
      const puzzleX = bx + bW - 20;
      const puzzleY = by + 2;
      const slidePhase = frame / CYCLE_FRAMES;
      const slideT =
        slidePhase < 0.15
          ? slidePhase / 0.15
          : slidePhase < 0.85
            ? 1
            : 1 - (slidePhase - 0.85) / 0.15;
      const eased = slideT < 1 ? slideT * slideT * (3 - 2 * slideT) : 1;
      const puzzleOffsetY = (1 - eased) * -25;

      ctx.save();
      ctx.translate(puzzleX, puzzleY + puzzleOffsetY);
      ctx.globalAlpha = eased * 0.9 + 0.1;

      ctx.beginPath();
      ctx.roundRect(
        -puzzleSize / 2,
        -puzzleSize / 2,
        puzzleSize,
        puzzleSize,
        4
      );
      ctx.fillStyle = puzzleColor;
      ctx.globalAlpha *= 0.25;
      ctx.fill();
      ctx.globalAlpha = eased * 0.9 + 0.1;
      ctx.strokeStyle = puzzleColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const knobR = 5;
      ctx.beginPath();
      ctx.arc(0, -puzzleSize / 2, knobR, Math.PI, 0);
      ctx.fillStyle = puzzleColor;
      ctx.globalAlpha *= 0.4;
      ctx.fill();
      ctx.globalAlpha = eased * 0.9 + 0.1;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("EXT", 0, 0);
      ctx.restore();
      ctx.globalAlpha = 1;

      if (eased > 0.8) {
        const ripplePhase = ((frame % 60) / 60) * Math.PI * 2;
        const numRipples = 3;
        for (let i = 0; i < numRipples; i++) {
          const rp =
            (ripplePhase + (i * Math.PI * 2) / numRipples) % (Math.PI * 2);
          const rProgress = rp / (Math.PI * 2);
          const ry = contentY + rProgress * contentH;
          ctx.beginPath();
          ctx.moveTo(bx + 6, ry);
          ctx.lineTo(bx + bW - 6, ry);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - rProgress) * 0.2;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText("Content Script Injection", cx, by + bH + 14);

      frameRef.current = (frame + 1) % CYCLE_FRAMES;

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
