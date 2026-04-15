"use client";
import { useEffect, useRef } from "react";

const DEPTS = ["HR", "Sales", "Ops", "Finance", "IT"];
const CYCLE_FRAMES = 160;

interface Pulse {
  from: number;
  to: number;
  progress: number;
}

export function EnterpriseSystemsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const pulsesRef = useRef<Pulse[]>([]);
  const flashRef = useRef<number[]>(new Array(DEPTS.length).fill(0));

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
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#94a3b8" : "#475569";
      const accentBg = isDark
        ? "rgba(148,163,184,0.12)"
        : "rgba(71,85,105,0.08)";
      const lineColor = isDark
        ? "rgba(148,163,184,0.2)"
        : "rgba(71,85,105,0.15)";
      const textColor = isDark ? "#f1f5f9" : "#1e293b";
      const pulseColor = isDark ? "#60a5fa" : "#3b82f6";
      const hubColor = isDark ? "#a78bfa" : "#7c3aed";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const radius = Math.min(W, H) * 0.32;
      const nodes = DEPTS.map((_, i) => {
        const angle = (i / DEPTS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        };
      });

      for (const n of nodes) {
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      if (frame === 0) {
        const from = Math.floor(Math.random() * DEPTS.length);
        let to = from;
        while (to === from) to = Math.floor(Math.random() * DEPTS.length);
        pulsesRef.current.push({ from, to, progress: 0 });
      }
      if (frame === Math.floor(CYCLE_FRAMES / 3)) {
        const from = Math.floor(Math.random() * DEPTS.length);
        let to = from;
        while (to === from) to = Math.floor(Math.random() * DEPTS.length);
        pulsesRef.current.push({ from, to, progress: 0 });
      }

      pulsesRef.current = pulsesRef.current.filter((p) => {
        p.progress += 0.025;

        let px: number;
        let py: number;
        const nFrom = nodes[p.from];
        const nTo = nodes[p.to];

        if (p.progress < 0.5) {
          const t = p.progress / 0.5;
          px = nFrom.x + (cx - nFrom.x) * t;
          py = nFrom.y + (cy - nFrom.y) * t;
        } else {
          const t = (p.progress - 0.5) / 0.5;
          px = cx + (nTo.x - cx) * t;
          py = cy + (nTo.y - cy) * t;
        }

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grd.addColorStop(0, pulseColor);
        grd.addColorStop(1, pulseColor + "00");
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor;
        ctx.fill();

        if (p.progress >= 1) {
          flashRef.current[p.to] = 20;
          return false;
        }
        return true;
      });

      const hubR = 22;
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? "rgba(167,139,250,0.15)"
        : "rgba(124,58,237,0.10)";
      ctx.fill();
      ctx.strokeStyle = hubColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Hub", cx, cy);

      for (let i = 0; i < DEPTS.length; i++) {
        const n = nodes[i];
        const flash = flashRef.current[i];

        ctx.beginPath();
        ctx.roundRect(n.x - 22, n.y - 12, 44, 24, 4);
        ctx.fillStyle =
          flash > 0
            ? isDark
              ? "rgba(96,165,250,0.20)"
              : "rgba(59,130,246,0.12)"
            : accentBg;
        ctx.fill();
        ctx.strokeStyle = flash > 0 ? pulseColor : accent;
        ctx.lineWidth = flash > 0 ? 1.5 : 1;
        ctx.stroke();

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(DEPTS[i], n.x, n.y);

        if (flash > 0) flashRef.current[i] = flash - 1;
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
