"use client";
import { useEffect, useRef } from "react";

const SERVICES = [
  { label: "REST", angle: -Math.PI / 2 }, // top
  { label: "Realtime", angle: -Math.PI / 2 + (2 * Math.PI) / 5 }, // top-right
  { label: "Auth", angle: -Math.PI / 2 + (4 * Math.PI) / 5 }, // bottom-right
  { label: "Storage", angle: -Math.PI / 2 + (6 * Math.PI) / 5 }, // bottom-left
  { label: "Edge Fn", angle: -Math.PI / 2 + (8 * Math.PI) / 5 }, // top-left
];

const CYCLE_FRAMES = 90; // frames per service
const TOTAL_FRAMES = CYCLE_FRAMES * SERVICES.length;

export function SupabaseVisualization() {
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
      const cx = W / 2;
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const postgresColor = isDark ? "#4ade80" : "#16a34a";
      const serviceFill = isDark
        ? "rgba(74,222,128,0.15)"
        : "rgba(22,163,74,0.12)";
      const activeColor = "#34d399";
      const connectionColor = isDark
        ? "rgba(74,222,128,0.25)"
        : "rgba(22,163,74,0.20)";
      const textColor = isDark ? "#f0fdf4" : "#14532d";

      ctx.clearRect(0, 0, W, H);

      const radius = Math.min(W, H) * 0.32;
      const coreR = Math.min(W, H) * 0.12;
      const nodeW = Math.min(76, W * 0.22);
      const nodeH = 26;

      const frame = frameRef.current;
      const activeIdx = Math.floor(frame / CYCLE_FRAMES) % SERVICES.length;
      const localFrame = frame % CYCLE_FRAMES;
      const localT = localFrame / CYCLE_FRAMES; // 0..1

      // Compute service node positions
      const servicePos = SERVICES.map((s) => ({
        x: cx + Math.cos(s.angle) * radius,
        y: cy + Math.sin(s.angle) * radius,
      }));

      // Draw persistent connection lines
      for (let i = 0; i < SERVICES.length; i++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(servicePos[i].x, servicePos[i].y);
        ctx.strokeStyle = connectionColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Flow animation:
      // 0.0-0.4: user request from outside → active service
      // 0.4-0.7: service → postgres core
      // 0.7-1.0: response back core → service → outside
      const active = servicePos[activeIdx];
      const activeAngle = SERVICES[activeIdx].angle;
      // Outside point extends beyond the service
      const outsideX = cx + Math.cos(activeAngle) * (radius + 40);
      const outsideY = cy + Math.sin(activeAngle) * (radius + 40);

      const drawDot = (x: number, y: number, color: string, r = 4) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r + 3, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(x, y, 1, x, y, r + 3);
        grd.addColorStop(0, "rgba(52,211,153,0.5)");
        grd.addColorStop(1, "rgba(52,211,153,0)");
        ctx.fillStyle = grd;
        ctx.fill();
      };

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      let px = 0;
      let py = 0;
      const showParticle = true;
      if (localT < 0.35) {
        const t = localT / 0.35;
        px = lerp(outsideX, active.x, t);
        py = lerp(outsideY, active.y, t);
      } else if (localT < 0.55) {
        const t = (localT - 0.35) / 0.2;
        px = lerp(active.x, cx, t);
        py = lerp(active.y, cy, t);
      } else if (localT < 0.8) {
        const t = (localT - 0.55) / 0.25;
        px = lerp(cx, active.x, t);
        py = lerp(cy, active.y, t);
      } else {
        const t = (localT - 0.8) / 0.2;
        px = lerp(active.x, outsideX, t);
        py = lerp(active.y, outsideY, t);
      }
      // Pulse opacity on service node when particle is at it
      const nearService =
        (localT > 0.3 && localT < 0.4) ||
        (localT > 0.55 && localT < 0.85 && localT < 0.6);

      // Draw Postgres core
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = serviceFill;
      ctx.fill();
      ctx.strokeStyle = postgresColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Core pulse when particle is in center
      if (localT > 0.5 && localT < 0.6) {
        const pt = (localT - 0.5) / 0.1;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR + pt * 8, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor;
        ctx.globalAlpha = 1 - pt;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // PG label
      ctx.font = `bold ${Math.round(coreR * 0.42)}px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Postgres", cx, cy - 4);
      // RLS shield (small text below)
      ctx.font = `${Math.round(coreR * 0.28)}px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = postgresColor;
      ctx.fillText("[RLS]", cx, cy + coreR * 0.45);

      // Draw service nodes
      for (let i = 0; i < SERVICES.length; i++) {
        const s = SERVICES[i];
        const pos = servicePos[i];
        const isActive = i === activeIdx;
        const x = pos.x - nodeW / 2;
        const y = pos.y - nodeH / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, nodeW, nodeH, 6);
        ctx.fillStyle =
          isActive && nearService ? "rgba(52,211,153,0.25)" : serviceFill;
        ctx.fill();
        ctx.strokeStyle = isActive ? activeColor : postgresColor;
        ctx.lineWidth = isActive ? 2 : 1.2;
        ctx.stroke();

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, pos.x, pos.y);
      }

      // Draw moving particle
      if (showParticle) {
        drawDot(px, py, activeColor, 4);
      }

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
