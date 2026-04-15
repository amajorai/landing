"use client";
import { useEffect, useRef } from "react";

interface Step {
  from: number; // 0 browser, 1 app, 2 provider
  to: number;
  label: string;
}

const STEPS: Step[] = [
  { from: 0, to: 1, label: "Sign in with GitHub" },
  { from: 1, to: 2, label: "Authorization request" },
  { from: 2, to: 0, label: "Login page" },
  { from: 0, to: 2, label: "Grant permission" },
  { from: 2, to: 1, label: "Auth code" },
  { from: 1, to: 2, label: "Exchange code" },
  { from: 2, to: 1, label: "Access token" },
  { from: 1, to: 0, label: "Session cookie ✓" },
];

const FRAMES_PER_STEP = 36;
const HOLD_FRAMES = 60;
const CYCLE = STEPS.length * FRAMES_PER_STEP + HOLD_FRAMES;

export function BetterAuthVisualization() {
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
      const browserColor = isDark ? "#a78bfa" : "#7c3aed";
      const appColor = isDark ? "#c084fc" : "#9333ea";
      const providerColor = isDark ? "#818cf8" : "#6d28d9";
      const arrowColor = isDark
        ? "rgba(167,139,250,0.6)"
        : "rgba(124,58,237,0.5)";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";
      const successColor = "#4ade80";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const cols = [W * 0.15, W * 0.5, W * 0.85];
      const colColors = [browserColor, appColor, providerColor];
      const colLabels = ["Browser", "Your App", "GitHub"];

      const headerY = 14;
      const baseY = 30;
      const bottomY = H - 6;

      // Headers
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.roundRect(cols[i] - 36, headerY - 9, 72, 18, 4);
        ctx.fillStyle = isDark
          ? "rgba(124,58,237,0.15)"
          : "rgba(237,233,254,0.8)";
        ctx.fill();
        ctx.strokeStyle = colColors[i];
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = textColor;
        ctx.fillText(colLabels[i], cols[i], headerY);
      }

      // Lifelines
      ctx.strokeStyle = isDark
        ? "rgba(167,139,250,0.2)"
        : "rgba(124,58,237,0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      for (const x of cols) {
        ctx.beginPath();
        ctx.moveTo(x, baseY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Steps
      const stepSpacing = (bottomY - baseY - 6) / STEPS.length;
      const currentStep = Math.min(
        Math.floor(frame / FRAMES_PER_STEP),
        STEPS.length
      );

      for (let i = 0; i <= currentStep && i < STEPS.length; i++) {
        const step = STEPS[i];
        const y = baseY + 4 + (i + 0.5) * stepSpacing;

        const stepFrame = frame - i * FRAMES_PER_STEP;
        const progress =
          i < currentStep
            ? 1
            : Math.min(Math.max(stepFrame / (FRAMES_PER_STEP * 0.7), 0), 1);
        if (progress <= 0) continue;

        const x1 = cols[step.from];
        const x2 = cols[step.to];
        const cx = x1 + (x2 - x1) * progress;

        const isSuccess = i === STEPS.length - 1;
        const lineColor = isSuccess ? successColor : arrowColor;

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(cx, y);
        ctx.stroke();

        if (progress > 0.1) {
          const dir = x2 > x1 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(cx, y);
          ctx.lineTo(cx - 5 * dir, y - 3);
          ctx.lineTo(cx - 5 * dir, y + 3);
          ctx.closePath();
          ctx.fillStyle = lineColor;
          ctx.fill();
        }

        if (progress > 0.2) {
          const labelAlpha = Math.min((progress - 0.2) / 0.5, 1);
          ctx.globalAlpha = labelAlpha;
          ctx.font = "7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isSuccess ? successColor : textColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(step.label, (x1 + x2) / 2, y - 2);
          ctx.globalAlpha = 1;
        }
      }

      frameRef.current = (frame + 1) % CYCLE;

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
