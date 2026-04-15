"use client";
import { useEffect, useRef } from "react";

type State = "FRESH" | "STALE" | "FETCHING";

export function TanstackVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const cycleStartRef = useRef(0);
  const dataVersionRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Phases (ms): 0..1500 FRESH, 1500..2800 STALE, 2800..4000 FETCHING, loop
    const FRESH_END = 1500;
    const STALE_END = 2800;
    const FETCH_END = 4000;

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
      const cacheColor = isDark ? "#f87171" : "#dc2626";
      const freshColor = "#4ade80";
      const staleColor = "#fb923c";
      const fetchColor = "#60a5fa";
      const textColor = isDark ? "#fff1f2" : "#7f1d1d";
      const dim = isDark ? "rgba(248,113,113,0.35)" : "rgba(220,38,38,0.35)";
      const bg = isDark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.08)";

      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      let t = now - cycleStartRef.current;
      if (t > FETCH_END) {
        cycleStartRef.current = now;
        dataVersionRef.current += 1;
        t = 0;
      }

      let state: State;
      let stateColor: string;
      let freshness: number; // 0..1 for bar fill
      if (t < FRESH_END) {
        state = "FRESH";
        stateColor = freshColor;
        freshness = 1 - t / FRESH_END;
      } else if (t < STALE_END) {
        state = "STALE";
        stateColor = staleColor;
        freshness = 0;
      } else {
        state = "FETCHING";
        stateColor = fetchColor;
        freshness = (t - STALE_END) / (FETCH_END - STALE_END);
      }

      // Layout: client left, cache center, server right
      const cy = H / 2;
      const clientX = 26;
      const cacheX = W / 2;
      const serverX = W - 32;

      // Client circle
      ctx.strokeStyle = dim;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(clientX, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.stroke();
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("client", clientX, cy);

      // Client reads from cache — dot travels client->cache constantly
      const readT = (now / 700) % 1;
      const rx = clientX + 16 + (cacheX - 55 - clientX - 16) * readT;
      ctx.fillStyle = cacheColor;
      ctx.beginPath();
      ctx.arc(rx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // arrow line
      ctx.strokeStyle = dim;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(clientX + 16, cy);
      ctx.lineTo(cacheX - 55, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Cache box (center)
      const cacheW = 108;
      const cacheH = 62;
      const cbX = cacheX - cacheW / 2;
      const cbY = cy - cacheH / 2;
      ctx.beginPath();
      ctx.roundRect(cbX, cbY, cacheW, cacheH, 8);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.strokeStyle = cacheColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cache content
      ctx.font = "bold 11px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`data v${dataVersionRef.current}`, cacheX, cbY + 16);

      // State label
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = stateColor;
      ctx.fillText(state, cacheX, cbY + 32);

      // Freshness bar
      const barX = cbX + 10;
      const barY = cbY + cacheH - 14;
      const barW = cacheW - 20;
      const barH = 6;
      ctx.strokeStyle = dim;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 2);
      ctx.stroke();
      ctx.fillStyle = stateColor;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW * freshness, barH, 2);
      ctx.fill();

      // Server box
      ctx.strokeStyle = dim;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(serverX - 18, cy - 22, 36, 44, 4);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(serverX - 12, cy - 14 + i * 10);
        ctx.lineTo(serverX + 12, cy - 14 + i * 10);
        ctx.stroke();
      }
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("server", serverX, cy + 24);

      // Fetching animation: spinner dots from cache to server and back
      if (state === "FETCHING") {
        const segStart = cbX + cacheW;
        const segEnd = serverX - 18;
        const span = segEnd - segStart;
        for (let i = 0; i < 3; i++) {
          const phase = (now / 400 + i * 0.33) % 1;
          const x = segStart + span * phase;
          ctx.fillStyle = fetchColor;
          ctx.globalAlpha = 1 - phase;
          ctx.beginPath();
          ctx.arc(x, cy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else {
        ctx.strokeStyle = dim;
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cbX + cacheW, cy);
        ctx.lineTo(serverX - 18, cy);
        ctx.stroke();
        ctx.setLineDash([]);
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
            cycleStartRef.current = performance.now();
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
