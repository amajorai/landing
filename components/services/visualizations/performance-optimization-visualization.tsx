"use client";
import { useEffect, useRef } from "react";

const CYCLE_MS = 3000;

export function PerformanceOptimizationVisualization() {
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
      const slowColor = isDark ? "#f87171" : "#dc2626";
      const fastColor = isDark ? "#4ade80" : "#16a34a";
      const bgColor = isDark ? "rgba(251,191,36,0.08)" : "rgba(217,119,6,0.05)";
      const borderColor = isDark
        ? "rgba(251,191,36,0.25)"
        : "rgba(217,119,6,0.15)";
      const textColor = isDark ? "#fef3c7" : "#78350f";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;

      const gaugeR = 50;
      const gaugeY = cy - 5;
      const startAngle = Math.PI * 0.8;
      const endAngle = Math.PI * 0.2;
      const totalArc = Math.PI * 1.4;

      ctx.beginPath();
      ctx.arc(cx, gaugeY, gaugeR + 8, startAngle, endAngle);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      const segments = 30;
      for (let i = 0; i < segments; i++) {
        const p = i / segments;
        const angle = startAngle + totalArc * p;
        const r = p < 0.33 ? slowColor : p < 0.66 ? "#fbbf24" : fastColor;
        ctx.beginPath();
        ctx.arc(cx, gaugeY, gaugeR, angle, angle + totalArc / segments + 0.02);
        ctx.strokeStyle = r;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const needleEase =
        t < 0.1
          ? 0
          : t < 0.5
            ? ((t - 0.1) / 0.4) ** 0.5
            : t < 0.9
              ? 1
              : 1 - ((t - 0.9) / 0.1) ** 2;

      const needleP = 0.15 + needleEase * 0.7;
      const needleAngle = startAngle + totalArc * needleP;
      const needleLen = gaugeR - 8;

      ctx.beginPath();
      ctx.moveTo(cx, gaugeY);
      ctx.lineTo(
        cx + Math.cos(needleAngle) * needleLen,
        gaugeY + Math.sin(needleAngle) * needleLen
      );
      const needleColor =
        needleP < 0.33 ? slowColor : needleP < 0.66 ? "#fbbf24" : fastColor;
      ctx.strokeStyle = needleColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, gaugeY, 4, 0, Math.PI * 2);
      ctx.fillStyle = needleColor;
      ctx.fill();

      const labels = ["Slow", "OK", "Fast"];
      const labelAngles = [0.15, 0.5, 0.85];
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < labels.length; i++) {
        const la = startAngle + totalArc * labelAngles[i];
        const lr = gaugeR + 18;
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.6;
        ctx.fillText(
          labels[i],
          cx + Math.cos(la) * lr,
          gaugeY + Math.sin(la) * lr
        );
        ctx.globalAlpha = 1;
      }

      const metrics = [
        { label: "LCP", val: (3.8 - needleEase * 2.2).toFixed(1) + "s" },
        { label: "CLS", val: (0.25 - needleEase * 0.22).toFixed(2) },
        { label: "INP", val: Math.round(350 - needleEase * 220) + "ms" },
      ];
      const metricY = gaugeY + gaugeR + 20;
      const metricSpacing = 60;
      const metricStartX = cx - ((metrics.length - 1) * metricSpacing) / 2;

      for (let i = 0; i < metrics.length; i++) {
        const mx = metricStartX + i * metricSpacing;
        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.5;
        ctx.textAlign = "center";
        ctx.fillText(metrics[i].label, mx, metricY);
        ctx.globalAlpha = 1;

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = needleColor;
        ctx.fillText(metrics[i].val, mx, metricY + 13);
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
