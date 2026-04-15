"use client";
import { useEffect, useRef } from "react";

// Event Loop phases in order around a ring.
const PHASES = [
  { name: "Timers", angle: -Math.PI / 2 },
  { name: "I/O", angle: -Math.PI / 2 + (Math.PI * 2) / 5 },
  { name: "Poll", angle: -Math.PI / 2 + (Math.PI * 4) / 5 },
  { name: "Check", angle: -Math.PI / 2 + (Math.PI * 6) / 5 },
  { name: "Close", angle: -Math.PI / 2 + (Math.PI * 8) / 5 },
];

interface FlyingTask {
  phaseIndex: number;
  progress: number;
  angleOffset: number;
}

export function NodejsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startTimeRef = useRef<number>(0);
  const tasksRef = useRef<FlyingTask[]>([]);
  const pendingRef = useRef<boolean[]>([true, false, true, false, false]);
  const lastRevRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) / 1000;

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
      const radius = Math.min(W, H) * 0.34;

      const isDark = document.documentElement.classList.contains("dark");
      const phaseColor = isDark ? "#4ade80" : "#16a34a";
      const activePhaseColor = "#4ade80";
      const tickColor = isDark ? "#86efac" : "#15803d";
      const textColor = isDark ? "#f0fdf4" : "#14532d";
      const callbackColor = "#fbbf24";
      const ringBg = isDark ? "rgba(74,222,128,0.15)" : "rgba(22,163,74,0.12)";

      ctx.clearRect(0, 0, W, H);

      // Ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = ringBg;
      ctx.lineWidth = 18;
      ctx.stroke();

      // Tick cursor: full revolution every 3s
      const revDuration = 3;
      const rev = elapsed / revDuration;
      const wholeRev = Math.floor(rev);
      const tickT = rev - wholeRev;
      const cursorAngle = -Math.PI / 2 + tickT * Math.PI * 2;

      if (wholeRev !== lastRevRef.current) {
        lastRevRef.current = wholeRev;
        const newPhase = Math.floor(Math.random() * 5);
        pendingRef.current[newPhase] = true;
      }

      // Active phase
      let activePhaseIdx = 0;
      let minDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < PHASES.length; i++) {
        let d = Math.abs(PHASES[i].angle - cursorAngle);
        d = Math.min(d, Math.PI * 2 - d);
        if (d < minDist) {
          minDist = d;
          activePhaseIdx = i;
        }
      }
      const isActiveClose = minDist < 0.35;

      if (isActiveClose && pendingRef.current[activePhaseIdx]) {
        pendingRef.current[activePhaseIdx] = false;
        tasksRef.current.push({
          phaseIndex: activePhaseIdx,
          progress: 0,
          angleOffset: (Math.random() - 0.5) * 0.5,
        });
      }

      // Phase nodes
      for (let i = 0; i < PHASES.length; i++) {
        const phase = PHASES[i];
        const px = cx + Math.cos(phase.angle) * radius;
        const py = cy + Math.sin(phase.angle) * radius;
        const isActive = i === activePhaseIdx && isActiveClose;
        const hasPending = pendingRef.current[i];

        ctx.beginPath();
        ctx.arc(px, py, isActive ? 17 : 14, 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? activePhaseColor
          : isDark
            ? "rgba(74,222,128,0.2)"
            : "rgba(22,163,74,0.15)";
        ctx.fill();
        ctx.strokeStyle = phaseColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (hasPending && !isActive) {
          ctx.beginPath();
          ctx.arc(px + 11, py - 11, 3, 0, Math.PI * 2);
          ctx.fillStyle = callbackColor;
          ctx.fill();
        }

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isActive ? "#052e16" : textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(phase.name, px, py);
      }

      // Tick cursor triangle (pointing inward toward ring)
      const tipX = cx + Math.cos(cursorAngle) * (radius - 14);
      const tipY = cy + Math.sin(cursorAngle) * (radius - 14);
      const backX = cx + Math.cos(cursorAngle) * (radius + 14);
      const backY = cy + Math.sin(cursorAngle) * (radius + 14);
      const perp = cursorAngle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(backX + Math.cos(perp) * 6, backY + Math.sin(perp) * 6);
      ctx.lineTo(backX - Math.cos(perp) * 6, backY - Math.sin(perp) * 6);
      ctx.closePath();
      ctx.fillStyle = tickColor;
      ctx.fill();

      // Flying callback tasks
      const remaining: FlyingTask[] = [];
      for (const t of tasksRef.current) {
        t.progress += 0.02;
        if (t.progress < 1) {
          const phase = PHASES[t.phaseIndex];
          const startX = cx + Math.cos(phase.angle) * radius;
          const startY = cy + Math.sin(phase.angle) * radius;
          const flyDist = 30 + t.progress * 22;
          const flyAngle = phase.angle + t.angleOffset;
          const tx = startX + Math.cos(flyAngle) * flyDist;
          const ty = startY + Math.sin(flyAngle) * flyDist;
          ctx.globalAlpha = 1 - t.progress;
          ctx.beginPath();
          ctx.roundRect(tx - 13, ty - 7, 26, 13, 3);
          ctx.fillStyle = callbackColor;
          ctx.fill();
          ctx.font = "bold 8px var(--font-geist-mono, monospace)";
          ctx.fillStyle = "#422006";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("cb()", tx, ty);
          ctx.globalAlpha = 1;
          remaining.push(t);
        }
      }
      tasksRef.current = remaining;

      // Center Node.js label
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(74,222,128,0.12)" : "rgba(22,163,74,0.08)";
      ctx.fill();
      ctx.strokeStyle = phaseColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Node.js", cx, cy);

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startTimeRef.current = 0;
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
