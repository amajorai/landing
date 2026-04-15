"use client";
import { useEffect, useRef } from "react";

// Kotlin Coroutines: 3 lanes with cooperative suspend/resume
interface Coroutine {
  color: string;
  offset: number;
  suspendAt: number;
  suspendDuration: number;
}

const COROUTINES: Coroutine[] = [
  { color: "#c084fc", offset: 0, suspendAt: 0.45, suspendDuration: 60 },
  { color: "#a78bfa", offset: 90, suspendAt: 0.7, suspendDuration: 50 },
  { color: "#818cf8", offset: 180, suspendAt: 0.3, suspendDuration: 70 },
];

const LANE_CYCLE = 260;

export function KotlinVisualization() {
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
      const trackColor = isDark
        ? "rgba(192,132,252,0.15)"
        : "rgba(147,51,234,0.12)";
      const textColor = isDark ? "#faf5ff" : "#3b0764";
      const suspendMarkerColor = "#6d28d9";

      ctx.clearRect(0, 0, W, H);

      const labelWidth = 80;
      const padX = 12;
      const laneStart = padX + labelWidth;
      const laneEnd = W - padX - 16;
      const laneWidth = laneEnd - laneStart;
      const laneCount = COROUTINES.length;
      const laneSpacing = H / (laneCount + 1);
      const blockSize = Math.min(laneSpacing * 0.55, 28);

      const totalCycle = LANE_CYCLE;

      ctx.font = "500 11px var(--font-geist-mono, monospace)";
      ctx.textBaseline = "middle";

      for (let i = 0; i < laneCount; i++) {
        const co = COROUTINES[i];
        const y = laneSpacing * (i + 1);

        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.fillText(`Coroutine ${i + 1}`, padX, y);

        ctx.beginPath();
        ctx.roundRect(laneStart, y - blockSize / 2, laneWidth, blockSize, 6);
        ctx.fillStyle = trackColor;
        ctx.fill();

        const suspendX = laneStart + laneWidth * co.suspendAt;
        ctx.strokeStyle = suspendMarkerColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(suspendX, y - blockSize / 2 - 4);
        ctx.lineTo(suspendX, y + blockSize / 2 + 4);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = suspendMarkerColor;
        ctx.fillRect(suspendX - 3, y - blockSize / 2 - 10, 2, 4);
        ctx.fillRect(suspendX + 1, y - blockSize / 2 - 10, 2, 4);

        const f =
          (frameRef.current + co.offset) % (totalCycle + co.suspendDuration);
        const preSuspendFrames = co.suspendAt * totalCycle;

        let progress: number;
        let suspended = false;

        if (f < preSuspendFrames) {
          progress = f / totalCycle;
        } else if (f < preSuspendFrames + co.suspendDuration) {
          progress = co.suspendAt;
          suspended = true;
        } else {
          const after = f - preSuspendFrames - co.suspendDuration;
          progress = co.suspendAt + after / totalCycle;
        }

        const bx = laneStart + laneWidth * progress - blockSize / 2;
        const by = y - blockSize / 2;

        ctx.globalAlpha = suspended ? 0.35 : 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, blockSize, blockSize, 5);
        ctx.fillStyle = co.color;
        ctx.fill();
        ctx.globalAlpha = suspended ? 0.6 : 1;
        ctx.strokeStyle = co.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (suspended) {
          ctx.fillStyle = "#faf5ff";
          ctx.fillRect(bx + blockSize / 2 - 4, by + blockSize / 2 - 4, 2, 8);
          ctx.fillRect(bx + blockSize / 2 + 2, by + blockSize / 2 - 4, 2, 8);
        }
      }

      frameRef.current += 1;

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
