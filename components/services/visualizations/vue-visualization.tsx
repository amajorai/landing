"use client";
import { useEffect, useRef } from "react";

const VALUES = ["Hello", "World", "Vue!", "Reactive"];

export function VueVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueIndexRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cycleValue = () => {
      if (!runningRef.current) return;
      valueIndexRef.current = (valueIndexRef.current + 1) % VALUES.length;
      startTimeRef.current = performance.now();
      timeoutRef.current = setTimeout(cycleValue, 2000);
    };

    const draw = () => {
      const now = performance.now();
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
      const nodeColor = isDark ? "#10b981" : "#059669";
      const textColor = isDark ? "#ecfdf5" : "#064e3b";
      const bgBox = isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.10)";
      const dim = isDark ? "rgba(16,185,129,0.45)" : "rgba(5,150,105,0.45)";

      ctx.clearRect(0, 0, W, H);

      const boxW = 110;
      const boxH = 58;
      const cy = H / 2;
      const gap = (W - boxW * 2) / 3;
      const leftX = gap;
      const rightX = gap * 2 + boxW;
      const arrowStart = leftX + boxW + 8;
      const arrowEnd = rightX - 8;

      const sinceChange = now - startTimeRef.current;
      const glow = Math.max(0, 1 - sinceChange / 600);

      const drawBox = (
        x: number,
        label: string,
        content: string,
        highlight: number
      ) => {
        ctx.beginPath();
        ctx.roundRect(x, cy - boxH / 2, boxW, boxH, 8);
        ctx.fillStyle = bgBox;
        ctx.fill();
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1 + highlight * 2;
        ctx.globalAlpha = 0.5 + highlight * 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = dim;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(label, x + 8, cy - boxH / 2 + 6);

        ctx.font = "bold 11px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.fillText(content, x + 8, cy - 2);
      };

      const currentVal = VALUES[valueIndexRef.current];
      drawBox(leftX, "data", `msg: "${currentVal}"`, glow);
      drawBox(rightX, "template", `<p>${currentVal}</p>`, glow * 0.8);

      const arrowTop = cy - 10;
      const arrowBot = cy + 10;

      ctx.strokeStyle = dim;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(arrowStart, arrowTop);
      ctx.lineTo(arrowEnd, arrowTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(arrowEnd, arrowTop);
      ctx.lineTo(arrowEnd - 5, arrowTop - 3);
      ctx.lineTo(arrowEnd - 5, arrowTop + 3);
      ctx.closePath();
      ctx.fillStyle = dim;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(arrowEnd, arrowBot);
      ctx.lineTo(arrowStart, arrowBot);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(arrowStart, arrowBot);
      ctx.lineTo(arrowStart + 5, arrowBot - 3);
      ctx.lineTo(arrowStart + 5, arrowBot + 3);
      ctx.closePath();
      ctx.fill();

      const t = (now / 1400) % 1;
      const dotX1 = arrowStart + (arrowEnd - arrowStart) * t;
      const dotX2 = arrowEnd - (arrowEnd - arrowStart) * t;
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(dotX1, arrowTop, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dotX2, arrowBot, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = dim;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("reactive binding", (arrowStart + arrowEnd) / 2, cy + 26);

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startTimeRef.current = performance.now();
            rafRef.current = requestAnimationFrame(draw);
            timeoutRef.current = setTimeout(cycleValue, 2000);
          } else if (!entry.isIntersecting) {
            runningRef.current = false;
            cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
