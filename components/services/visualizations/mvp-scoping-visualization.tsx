"use client";
import { useEffect, useRef } from "react";

const FEATURES = ["Auth", "Pay", "UI", "API", "Chat", "Mail", "CMS", "i18n"];
const CORE = ["Auth", "Pay", "UI", "API"];
const CYCLE_FRAMES = 240;

export function MvpScopingVisualization() {
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
      const accent = isDark ? "#fbbf24" : "#d97706";
      const accentBg = isDark
        ? "rgba(251,191,36,0.10)"
        : "rgba(217,119,6,0.07)";
      const borderColor = isDark
        ? "rgba(251,191,36,0.3)"
        : "rgba(217,119,6,0.2)";
      const textColor = isDark ? "#fef3c7" : "#78350f";
      const coreColor = isDark ? "#4ade80" : "#16a34a";
      const dimColor = isDark
        ? "rgba(251,191,36,0.15)"
        : "rgba(217,119,6,0.10)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const t = frame / CYCLE_FRAMES;

      const topY = H * 0.15;
      const chipW = 38;
      const chipH = 18;
      const chipGap = 6;
      const rowW = 4 * chipW + 3 * chipGap;
      const rowStartX = cx - rowW / 2;

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.5;
      ctx.textAlign = "center";
      ctx.fillText("All features", cx, topY - 6);
      ctx.globalAlpha = 1;

      for (let i = 0; i < FEATURES.length; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const fx = rowStartX + col * (chipW + chipGap);
        const fy = topY + row * (chipH + chipGap);
        const isCore = CORE.includes(FEATURES[i]);

        const funnelPhase = t < 0.3 ? 0 : t < 0.6 ? (t - 0.3) / 0.3 : 1;
        const ease = funnelPhase < 1 ? funnelPhase * funnelPhase : 1;

        let drawX = fx;
        let drawY = fy;
        let opacity = 1;

        if (isCore) {
          const targetCol = CORE.indexOf(FEATURES[i]);
          const mvpRowW = CORE.length * chipW + (CORE.length - 1) * chipGap;
          const mvpStartX = cx - mvpRowW / 2;
          const targetX = mvpStartX + targetCol * (chipW + chipGap);
          const targetY = H * 0.6;
          drawX = fx + (targetX - fx) * ease;
          drawY = fy + (targetY - fy) * ease;
        } else {
          opacity = 1 - ease * 0.7;
          drawX = fx + (fx < cx ? -20 : 20) * ease;
        }

        ctx.beginPath();
        ctx.roundRect(drawX, drawY, chipW, chipH, 3);
        ctx.fillStyle =
          isCore && funnelPhase > 0.5
            ? isDark
              ? "rgba(74,222,128,0.15)"
              : "rgba(22,163,74,0.08)"
            : accentBg;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.strokeStyle = isCore && funnelPhase > 0.5 ? coreColor : borderColor;
        ctx.lineWidth = isCore && funnelPhase > 0.5 ? 1.3 : 0.8;
        ctx.stroke();

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(FEATURES[i], drawX + chipW / 2, drawY + chipH / 2);
        ctx.globalAlpha = 1;
      }

      if (t > 0.3) {
        const funnelT = Math.min(1, (t - 0.3) / 0.3);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.globalAlpha = funnelT * 0.3;
        ctx.setLineDash([3, 3]);

        const fTop = topY + chipH * 2 + chipGap + 5;
        const fBot = H * 0.58;
        ctx.beginPath();
        ctx.moveTo(cx - rowW / 2 - 5, fTop);
        ctx.lineTo(cx - rowW / 4, fBot);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + rowW / 2 + 5, fTop);
        ctx.lineTo(cx + rowW / 4, fBot);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      if (t > 0.6) {
        const labelT = Math.min(1, (t - 0.6) / 0.15);
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = coreColor;
        ctx.globalAlpha = labelT;
        ctx.textAlign = "center";
        ctx.fillText("MVP Core", cx, H * 0.6 + chipH + 12);
        ctx.globalAlpha = 1;
      }

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
