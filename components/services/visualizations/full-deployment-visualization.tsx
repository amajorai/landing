"use client";
import { useEffect, useRef } from "react";

const CYCLE_MS = 3000;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function FullDeploymentVisualization() {
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

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#38bdf8" : "#0284c7";
      const accentBg = isDark
        ? "rgba(56,189,248,0.10)"
        : "rgba(2,132,199,0.07)";
      const borderColor = isDark
        ? "rgba(56,189,248,0.3)"
        : "rgba(2,132,199,0.2)";
      const textColor = isDark ? "#e0f2fe" : "#0c4a6e";
      const successColor = isDark ? "#4ade80" : "#16a34a";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;

      const localW = 60;
      const localH = 40;
      const cloudW = 70;
      const cloudH = 44;
      const localX = cx - 70 - localW / 2;
      const cloudX = cx + 70 - cloudW / 2;
      const yCenter = H / 2 - 5;

      ctx.beginPath();
      ctx.roundRect(localX, yCenter - localH / 2, localW, localH, 4);
      ctx.fillStyle = accentBg;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Local", localX + localW / 2, yCenter - 4);
      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.globalAlpha = 0.5;
      ctx.fillText("staging", localX + localW / 2, yCenter + 7);
      ctx.globalAlpha = 1;

      const ccx = cloudX + cloudW / 2;
      const ccy = yCenter;
      const cr = 20;
      ctx.beginPath();
      ctx.arc(ccx - 8, ccy + 4, cr * 0.7, Math.PI, 0);
      ctx.arc(ccx + 4, ccy - 2, cr * 0.55, Math.PI * 1.2, Math.PI * 0.1);
      ctx.arc(ccx + 12, ccy + 4, cr * 0.5, Math.PI * 1.3, Math.PI * 0.4);
      ctx.lineTo(ccx - 8 - cr * 0.7, ccy + 4);
      ctx.closePath();
      ctx.fillStyle = accentBg;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText("Cloud", ccx, ccy + 10);
      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.globalAlpha = 0.5;
      ctx.fillText("production", ccx, ccy + 20);
      ctx.globalAlpha = 1;

      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(localX + localW + 4, yCenter);
      ctx.lineTo(cloudX - 4, yCenter);
      ctx.stroke();
      ctx.setLineDash([]);

      if (t < 0.6) {
        const p = easeOut(t / 0.6);
        const startPx = localX + localW + 4;
        const endPx = cloudX - 4;
        const px = startPx + (endPx - startPx) * p;

        ctx.beginPath();
        ctx.moveTo(px, yCenter - 5);
        ctx.lineTo(px + 4, yCenter);
        ctx.lineTo(px, yCenter + 5);
        ctx.lineTo(px - 2, yCenter + 3);
        ctx.lineTo(px + 1, yCenter);
        ctx.lineTo(px - 2, yCenter - 3);
        ctx.closePath();
        ctx.fillStyle = accent;
        ctx.fill();

        const trailLen = 20;
        const trailX = Math.max(startPx, px - trailLen);
        const grd = ctx.createLinearGradient(trailX, 0, px, 0);
        grd.addColorStop(0, accent + "00");
        grd.addColorStop(1, accent + "40");
        ctx.beginPath();
        ctx.moveTo(trailX, yCenter);
        ctx.lineTo(px, yCenter);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (t > 0.6 && t < 0.75) {
        const pulse = Math.sin(((t - 0.6) / 0.15) * Math.PI);
        ctx.beginPath();
        ctx.arc(ccx, ccy, cr + 5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pulse * 0.15;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (t > 0.75) {
        const checkT = Math.min(1, (t - 0.75) / 0.1);
        ctx.font = `${12 * checkT}px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = successColor;
        ctx.globalAlpha = checkT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✓", ccx, ccy - 4);
        ctx.globalAlpha = 1;

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = successColor;
        ctx.globalAlpha = checkT;
        ctx.fillText("Live", ccx, ccy + 26);
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
