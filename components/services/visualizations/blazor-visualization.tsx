"use client";
import { useEffect, useRef } from "react";

const STAGES = [
  { label: ".razor", sub: "C# Component" },
  { label: "compile", sub: "dotnet" },
  { label: ".wasm", sub: "binary" },
  { label: "Browser", sub: "runtime" },
];

export function BlazorVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000;

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
      const stageColor = isDark ? "#a78bfa" : "#7c3aed";
      const wasmColor = isDark ? "#c084fc" : "#9333ea";
      const browserColor = isDark ? "#818cf8" : "#6d28d9";
      const signalrColor = "#4ade80";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";

      ctx.clearRect(0, 0, W, H);

      // --- Top half: pipeline ---
      const topH = H * 0.5;
      const pad = 8;
      const count = STAGES.length;
      const boxW = (W - pad * 2 - (count - 1) * 16) / count;
      const boxH = Math.min(46, topH - 20);
      const boxY = 14;

      const centers: number[] = [];
      for (let i = 0; i < count; i++) {
        const x = pad + i * (boxW + 16);
        centers.push(x + boxW / 2);
        const isLast = i === count - 1;
        const color = isLast ? browserColor : i === 2 ? wasmColor : stageColor;

        ctx.beginPath();
        ctx.roundRect(x, boxY, boxW, boxH, 6);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.12;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(STAGES[i].label, x + boxW / 2, boxY + boxH / 2 - 6);
        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = 0.7;
        ctx.fillText(STAGES[i].sub, x + boxW / 2, boxY + boxH / 2 + 7);
        ctx.globalAlpha = 1;

        // Arrow to next
        if (i < count - 1) {
          const ax1 = x + boxW;
          const ax2 = ax1 + 16;
          const ay = boxY + boxH / 2;
          ctx.beginPath();
          ctx.moveTo(ax1 + 1, ay);
          ctx.lineTo(ax2 - 1, ay);
          ctx.strokeStyle = stageColor;
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ax2 - 1, ay);
          ctx.lineTo(ax2 - 4, ay - 3);
          ctx.lineTo(ax2 - 4, ay + 3);
          ctx.closePath();
          ctx.fillStyle = stageColor;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Traveling packet along pipeline
      const cycle = 4; // seconds
      const pT = (t % cycle) / cycle;
      const totalStages = count - 1;
      const stageIdx = Math.min(totalStages - 1, Math.floor(pT * totalStages));
      const localT = pT * totalStages - stageIdx;
      const px =
        centers[stageIdx] +
        (centers[stageIdx + 1] - centers[stageIdx]) * localT;
      const py = boxY + boxH / 2;

      // packet changes shape per stage
      const labels = ["C#", "IL", "WASM", "WASM"];
      const packetLabel = labels[stageIdx];
      ctx.beginPath();
      ctx.roundRect(px - 14, py - 8, 28, 16, 3);
      ctx.fillStyle = "#fbbf24";
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = "#1f1500";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(packetLabel, px, py);

      // --- Bottom half: mode toggle ---
      const botY = topH + 8;
      const botH = H - botY - 4;
      const modeCycle = 4;
      const mode = Math.floor(t / modeCycle) % 2 === 0 ? "server" : "wasm";

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(mode === "server" ? "Server Mode" : "WASM Mode", pad, botY);

      // Two entities: browser (left), server (right if server mode)
      const ey = botY + botH / 2 + 4;
      const browserX = pad + 20;
      const serverX = W - pad - 20;

      // Browser icon
      ctx.beginPath();
      ctx.roundRect(browserX - 18, ey - 14, 36, 28, 4);
      ctx.strokeStyle = browserColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(browserX - 18, ey - 7);
      ctx.lineTo(browserX + 18, ey - 7);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(browserX - 14 + i * 5, ey - 10.5, 1, 0, Math.PI * 2);
        ctx.fillStyle = browserColor;
        ctx.fill();
      }

      if (mode === "server") {
        // Server box
        ctx.beginPath();
        ctx.roundRect(serverX - 18, ey - 14, 36, 28, 4);
        ctx.strokeStyle = stageColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("server", serverX, ey);

        // SignalR wire (animated dashes)
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.lineDashOffset = -t * 30;
        ctx.beginPath();
        ctx.moveTo(browserX + 18, ey);
        ctx.lineTo(serverX - 18, ey);
        ctx.strokeStyle = signalrColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = signalrColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("SignalR / WebSocket", (browserX + serverX) / 2, ey - 4);
      } else {
        // WASM standalone - show .wasm inside browser
        ctx.beginPath();
        ctx.roundRect(browserX - 12, ey - 4, 24, 10, 2);
        ctx.fillStyle = wasmColor;
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = wasmColor;
        ctx.stroke();
        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(".wasm", browserX, ey + 1);

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.7;
        ctx.textAlign = "left";
        ctx.fillText("standalone: no server", browserX + 26, ey);
        ctx.globalAlpha = 1;
      }

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
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
