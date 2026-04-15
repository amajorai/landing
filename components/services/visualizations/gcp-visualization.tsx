"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 360;

export function GcpVisualization() {
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
      const accent = "#4285F4";
      const accentDim = isDark
        ? "rgba(66,133,244,0.15)"
        : "rgba(66,133,244,0.10)";
      const containerBg = isDark
        ? "rgba(66,133,244,0.10)"
        : "rgba(66,133,244,0.06)";
      const containerStroke = isDark
        ? "rgba(66,133,244,0.4)"
        : "rgba(66,133,244,0.25)";
      const graphLine = isDark
        ? "rgba(66,133,244,0.5)"
        : "rgba(66,133,244,0.35)";
      const graphFill = isDark
        ? "rgba(66,133,244,0.08)"
        : "rgba(66,133,244,0.05)";
      const textColor = isDark ? "#eff6ff" : "#1e3a5f";
      const mutedText = isDark ? "#93c5fd" : "#2563eb";
      const activeColor = "#34d399";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const t = frame / TOTAL_FRAMES;

      // Layout
      const graphH = H * 0.28;
      const graphY = H - graphH - 10;
      const containerAreaY = 22;
      const containerAreaH = graphY - containerAreaY - 12;
      const padX = 20;

      // Generate load curve (sinusoidal with spikes)
      const getLoad = (phase: number): number => {
        const base =
          Math.sin(phase * Math.PI * 2) * 0.35 +
          Math.sin(phase * Math.PI * 6) * 0.15 +
          0.5;
        return Math.max(0.05, Math.min(1, base));
      };

      const currentLoad = getLoad(t);
      const maxContainers = 8;
      const activeContainers = Math.max(
        1,
        Math.ceil(currentLoad * maxContainers)
      );

      // Draw request load graph
      ctx.beginPath();
      ctx.moveTo(padX, graphY + graphH);
      const graphW = W - padX * 2;
      const points: Array<{ x: number; y: number }> = [];
      for (let i = 0; i <= 60; i++) {
        const px = padX + (i / 60) * graphW;
        const phase = (t - ((60 - i) / 60) * 0.3 + 1) % 1;
        const load = getLoad(phase);
        const py = graphY + graphH - load * graphH;
        points.push({ x: px, y: py });
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineTo(padX + graphW, graphY + graphH);
      ctx.lineTo(padX, graphY + graphH);
      ctx.closePath();
      ctx.fillStyle = graphFill;
      ctx.fill();

      // Graph line
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(points[i].x, points[i].y);
        else ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = graphLine;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Current point highlight
      const lastP = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(lastP.x, lastP.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      // Graph labels
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Request Load", padX, graphY - 10);

      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(currentLoad * 100)}%`, W - padX, graphY - 10);

      // Graph axis
      ctx.beginPath();
      ctx.moveTo(padX, graphY);
      ctx.lineTo(padX, graphY + graphH);
      ctx.lineTo(W - padX, graphY + graphH);
      ctx.strokeStyle = isDark
        ? "rgba(66,133,244,0.15)"
        : "rgba(66,133,244,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw containers
      const containerCols = 4;
      const containerRows = 2;
      const cGap = 6;
      const totalW = W - padX * 2;
      const totalH = containerAreaH;
      const cw = (totalW - (containerCols - 1) * cGap) / containerCols;
      const ch = (totalH - (containerRows - 1) * cGap) / containerRows;

      for (let row = 0; row < containerRows; row++) {
        for (let col = 0; col < containerCols; col++) {
          const idx = row * containerCols + col;
          const isActive = idx < activeContainers;

          const cx = padX + col * (cw + cGap);
          const cy = containerAreaY + row * (ch + cGap);

          // Scale animation
          const targetScale = isActive ? 1 : 0.3;
          const scaleFrame = frame % 8 < 4 ? 0.02 : 0;
          const scale = isActive ? targetScale + scaleFrame : targetScale;

          ctx.globalAlpha = isActive ? 1 : 0.25;

          ctx.save();
          ctx.translate(cx + cw / 2, cy + ch / 2);
          ctx.scale(scale, scale);

          ctx.beginPath();
          ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 5);
          ctx.fillStyle = isActive ? containerBg : accentDim;
          ctx.fill();
          ctx.strokeStyle = isActive ? containerStroke : accentDim;
          ctx.lineWidth = isActive ? 1.5 : 0.8;
          ctx.stroke();

          // Container icon
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isActive ? accent : mutedText;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("▣", 0, -4);

          // Label
          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isActive ? textColor : mutedText;
          ctx.fillText(`run-${idx + 1}`, 0, 8);

          // Active indicator
          if (isActive) {
            const pulse = Math.sin(frame / 6 + idx) * 0.3 + 0.7;
            ctx.globalAlpha = pulse;
            ctx.beginPath();
            ctx.arc(cw / 2 - 6, -ch / 2 + 6, 3, 0, Math.PI * 2);
            ctx.fillStyle = activeColor;
            ctx.fill();
          }

          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      // Header
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Cloud Run Autoscaling", padX, 4);

      ctx.textAlign = "right";
      ctx.fillStyle = accent;
      ctx.fillText(
        `${activeContainers}/${maxContainers} instances`,
        W - padX,
        4
      );

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
