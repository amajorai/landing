"use client";
import { useEffect, useRef } from "react";

type Path = "SSR" | "Cache" | "API";

export function NuxtVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const cycleStartRef = useRef(0);
  const reqIdxRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const CYCLE = 1500;
    const PATHS: Path[] = ["SSR", "Cache", "API"];

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
      const nitroColor = isDark ? "#10b981" : "#059669";
      const ssrColor = isDark ? "#34d399" : "#10b981";
      const cacheColor = isDark ? "#6ee7b7" : "#34d399";
      const apiColor = isDark ? "#a7f3d0" : "#6ee7b7";
      const textColor = isDark ? "#ecfdf5" : "#064e3b";
      const dim = isDark ? "rgba(16,185,129,0.35)" : "rgba(5,150,105,0.35)";

      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      let t = now - cycleStartRef.current;
      if (t > CYCLE) {
        cycleStartRef.current = now;
        reqIdxRef.current = (reqIdxRef.current + 1) % 3;
        t = 0;
      }

      const activePath = PATHS[reqIdxRef.current];
      const colorOf = (p: Path) =>
        p === "SSR" ? ssrColor : p === "Cache" ? cacheColor : apiColor;

      // Nitro box center
      const nitroW = 110;
      const nitroH = 38;
      const nitroX = W / 2 - nitroW / 2;
      const nitroY = H / 2 - nitroH / 2 - 6;

      // Request start (top)
      const reqStartY = 10;
      const reqEndY = nitroY;

      // Three output endpoints
      const outY = nitroY + nitroH + 40;
      const outXs = [W * 0.22, W * 0.5, W * 0.78];

      // Incoming arrow
      ctx.strokeStyle = dim;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(W / 2, reqStartY);
      ctx.lineTo(W / 2, reqEndY);
      ctx.stroke();
      // arrowhead
      ctx.beginPath();
      ctx.moveTo(W / 2, reqEndY);
      ctx.lineTo(W / 2 - 4, reqEndY - 5);
      ctx.lineTo(W / 2 + 4, reqEndY - 5);
      ctx.closePath();
      ctx.fillStyle = dim;
      ctx.fill();

      // Fan-out lines from Nitro box to 3 outputs
      for (let i = 0; i < 3; i++) {
        const p = PATHS[i];
        const active = i === reqIdxRef.current;
        ctx.strokeStyle = active ? colorOf(p) : dim;
        ctx.lineWidth = active ? 1.6 : 1;
        ctx.globalAlpha = active ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(W / 2, nitroY + nitroH);
        ctx.lineTo(outXs[i], outY - 10);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Nitro box
      ctx.beginPath();
      ctx.roundRect(nitroX, nitroY, nitroW, nitroH, 6);
      ctx.fillStyle = nitroColor;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = nitroColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = "bold 11px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Nitro", W / 2, nitroY + nitroH / 2);

      // Output labels
      const labels: Record<Path, string> = {
        SSR: "<html>",
        Cache: "[file]",
        API: "{ json }",
      };
      const titles: Record<Path, string> = {
        SSR: "SSR",
        Cache: "Static",
        API: "API",
      };
      for (let i = 0; i < 3; i++) {
        const p = PATHS[i];
        const active = i === reqIdxRef.current;
        const x = outXs[i];
        const w = 70;
        const h = 30;
        ctx.beginPath();
        ctx.roundRect(x - w / 2, outY, w, h, 5);
        ctx.fillStyle = colorOf(p);
        ctx.globalAlpha = active ? 0.25 : 0.08;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colorOf(p);
        ctx.lineWidth = active ? 1.5 : 0.8;
        ctx.globalAlpha = active ? 1 : 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[p], x, outY + h / 2);
        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = colorOf(p);
        ctx.fillText(titles[p], x, outY + h + 8);
      }

      // Packet animation
      const pkt = 7;
      let px = W / 2;
      let py = reqStartY;

      if (t < 500) {
        // top to nitro
        const p = t / 500;
        py = reqStartY + (nitroY + nitroH / 2 - reqStartY) * p;
      } else if (t < 1000) {
        // nitro to output
        const p = (t - 500) / 500;
        px = W / 2 + (outXs[reqIdxRef.current] - W / 2) * p;
        py = nitroY + nitroH / 2 + (outY + 15 - nitroY - nitroH / 2) * p;
      } else {
        px = outXs[reqIdxRef.current];
        py = outY + 15;
      }

      ctx.fillStyle = colorOf(activePath);
      ctx.beginPath();
      ctx.roundRect(px - pkt / 2, py - pkt / 2, pkt, pkt, 1.5);
      ctx.fill();

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
