"use client";
import { useEffect, useRef } from "react";

interface Pulse {
  targetIdx: number;
  progress: number;
  kind: "mutation" | "update";
}

const NUM_CLIENTS = 4;
const CYCLE_FRAMES = 150;

export function ConvexVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const pulsesRef = useRef<Pulse[]>([]);
  const activeMutatorRef = useRef(0);
  const flashRef = useRef<number[]>(new Array(NUM_CLIENTS).fill(0));

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
      const dbColor = isDark ? "#fbbf24" : "#d97706";
      const clientFill = isDark
        ? "rgba(251,191,36,0.15)"
        : "rgba(217,119,6,0.12)";
      const connectionColor = isDark
        ? "rgba(251,191,36,0.25)"
        : "rgba(217,119,6,0.20)";
      const mutationColor = "#fb923c";
      const updateColor = "#4ade80";
      const textColor = isDark ? "#fffbeb" : "#451a03";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const radius = Math.min(W, H) * 0.36;
      const clients = Array.from({ length: NUM_CLIENTS }, (_, i) => {
        const angle = (i / NUM_CLIENTS) * Math.PI * 2 - Math.PI / 2;
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        };
      });

      // Persistent connections
      for (const c of clients) {
        ctx.strokeStyle = connectionColor;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      if (frame === 0) {
        pulsesRef.current.push({
          targetIdx: activeMutatorRef.current,
          progress: 0,
          kind: "mutation",
        });
      }

      if (frame === 45) {
        for (let i = 0; i < NUM_CLIENTS; i++) {
          if (i !== activeMutatorRef.current) {
            pulsesRef.current.push({
              targetIdx: i,
              progress: 0,
              kind: "update",
            });
          }
        }
      }

      pulsesRef.current = pulsesRef.current.filter((p) => {
        p.progress += p.kind === "mutation" ? 0.035 : 0.03;
        const client = clients[p.targetIdx];
        let x: number, y: number;
        if (p.kind === "mutation") {
          x = client.x + (cx - client.x) * p.progress;
          y = client.y + (cy - client.y) * p.progress;
        } else {
          x = cx + (client.x - cx) * p.progress;
          y = cy + (client.y - cy) * p.progress;
        }

        const color = p.kind === "mutation" ? mutationColor : updateColor;

        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 9);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color + "00");
        ctx.fillStyle = grd;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (p.progress >= 1) {
          if (p.kind === "update") flashRef.current[p.targetIdx] = 28;
          return false;
        }
        return true;
      });

      // DB pulse
      const dbPulse =
        frame >= 35 && frame < 55 ? 1 - Math.abs(frame - 45) / 10 : 0;
      const dbRadius = 24 + dbPulse * 4;

      ctx.beginPath();
      ctx.arc(cx, cy, dbRadius + 8, 0, Math.PI * 2);
      const dbGlow = ctx.createRadialGradient(
        cx,
        cy,
        dbRadius,
        cx,
        cy,
        dbRadius + 14
      );
      dbGlow.addColorStop(0, dbColor + "66");
      dbGlow.addColorStop(1, dbColor + "00");
      ctx.fillStyle = dbGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, dbRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(251,191,36,0.2)" : "rgba(217,119,6,0.15)";
      ctx.fill();
      ctx.strokeStyle = dbColor;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Convex", cx, cy - 4);
      ctx.fillText("DB", cx, cy + 6);

      // Clients
      ctx.font = "7px var(--font-geist-mono, monospace)";
      for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        const flash = flashRef.current[i];
        const isMutator = i === activeMutatorRef.current && frame < 40;

        ctx.beginPath();
        ctx.roundRect(c.x - 24, c.y - 12, 48, 24, 4);
        ctx.fillStyle =
          flash > 0
            ? isDark
              ? "rgba(74,222,128,0.25)"
              : "rgba(22,163,74,0.18)"
            : clientFill;
        ctx.fill();
        ctx.strokeStyle = isMutator
          ? mutationColor
          : flash > 0
            ? updateColor
            : dbColor;
        ctx.lineWidth = isMutator || flash > 0 ? 1.8 : 1;
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`client ${i + 1}`, c.x, c.y - 2);

        if (flash > 0) {
          ctx.fillStyle = updateColor;
          ctx.font = "6px var(--font-geist-mono, monospace)";
          ctx.fillText("↑ updated", c.x, c.y + 7);
          ctx.font = "7px var(--font-geist-mono, monospace)";
          flashRef.current[i] = flash - 1;
        }
      }

      frameRef.current = frame + 1;
      if (frameRef.current >= CYCLE_FRAMES) {
        frameRef.current = 0;
        activeMutatorRef.current = (activeMutatorRef.current + 1) % NUM_CLIENTS;
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
