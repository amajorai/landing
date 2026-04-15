"use client";
import { useEffect, useRef } from "react";

// Turborepo: DAG of tasks with cache miss/hit alternation
interface Task {
  id: string;
  label: string;
  deps: string[];
  x: number; // 0..1
  y: number; // 0..1
}

const TASKS: Task[] = [
  { id: "lint", label: "lint", deps: [], x: 0.25, y: 0.18 },
  { id: "test", label: "test", deps: [], x: 0.75, y: 0.18 },
  { id: "build", label: "build", deps: ["lint"], x: 0.25, y: 0.55 },
  { id: "deploy", label: "deploy", deps: ["build", "test"], x: 0.5, y: 0.88 },
];

const RUN_DURATION = 45; // frames per task in cache-miss
const CACHE_DURATION = 15; // frames per task in cache-hit
const PAUSE = 40;

export function TurborepoVisualization() {
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

      const isDark = document.documentElement.classList.contains("dark");
      const runningColor = "#fb923c";
      const doneColor = "#4ade80";
      const cachedColor = "#facc15";
      const nodeBase = isDark
        ? "rgba(248,113,113,0.15)"
        : "rgba(220,38,38,0.10)";
      const edgeColor = isDark
        ? "rgba(248,113,113,0.3)"
        : "rgba(220,38,38,0.25)";
      const textColor = isDark ? "#fff1f2" : "#7f1d1d";
      const baseStroke = isDark ? "#f87171" : "#dc2626";

      ctx.clearRect(0, 0, W, H);

      // Execution schedule considering deps (topological)
      // Build run: lint & test start at 0, build starts when lint done, deploy after build & test
      // Cache run: all simultaneous instant ✓
      const frame = frameRef.current;

      // Full sequence: [build run duration][pause][cache run duration][pause]
      const buildTotal = RUN_DURATION * 3 + PAUSE; // lint||test=RUN, build=RUN, deploy=RUN
      const cacheTotal = CACHE_DURATION + PAUSE;
      const FULL = buildTotal + cacheTotal;
      const pos = frame % FULL;

      const isCacheRun = pos >= buildTotal;
      const runPos = isCacheRun ? pos - buildTotal : pos;

      // Determine per-task status
      type Status = "idle" | "running" | "done" | "cached";
      const statuses: Record<string, Status> = {};

      if (isCacheRun) {
        // all go cached at runPos > 0
        for (const t of TASKS) {
          statuses[t.id] = runPos < CACHE_DURATION * 0.3 ? "idle" : "cached";
        }
      } else {
        // lint: 0..RUN, test: 0..RUN, build: RUN..2RUN, deploy: 2RUN..3RUN
        for (const t of TASKS) {
          let start = 0;
          if (t.id === "build") start = RUN_DURATION;
          else if (t.id === "deploy") start = RUN_DURATION * 2;
          const end = start + RUN_DURATION;
          if (runPos < start) statuses[t.id] = "idle";
          else if (runPos < end) statuses[t.id] = "running";
          else statuses[t.id] = "done";
        }
      }

      const pos2 = (t: Task) => ({ x: t.x * W, y: t.y * H });

      // Edges
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1.5;
      for (const t of TASKS) {
        for (const dep of t.deps) {
          const from = TASKS.find((x) => x.id === dep);
          if (!from) continue;
          const a = pos2(from);
          const b = pos2(t);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y + 16);
          ctx.lineTo(b.x, b.y - 16);
          ctx.stroke();
          // Arrowhead
          const angle = Math.atan2(b.y - 16 - (a.y + 16), b.x - a.x);
          ctx.beginPath();
          ctx.moveTo(b.x, b.y - 16);
          ctx.lineTo(
            b.x - 6 * Math.cos(angle - 0.4),
            b.y - 16 - 6 * Math.sin(angle - 0.4)
          );
          ctx.moveTo(b.x, b.y - 16);
          ctx.lineTo(
            b.x - 6 * Math.cos(angle + 0.4),
            b.y - 16 - 6 * Math.sin(angle + 0.4)
          );
          ctx.stroke();
        }
      }

      // Nodes
      for (const t of TASKS) {
        const { x, y } = pos2(t);
        const status = statuses[t.id];
        const w = 72;
        const h = 28;

        let stroke = baseStroke;
        let fill = nodeBase;
        let glyph = "";
        if (status === "running") {
          stroke = runningColor;
          fill = "rgba(251,146,60,0.2)";
        } else if (status === "done") {
          stroke = doneColor;
          fill = "rgba(74,222,128,0.18)";
          glyph = "OK";
        } else if (status === "cached") {
          stroke = cachedColor;
          fill = "rgba(250,204,21,0.2)";
          glyph = "CACHED";
        }

        ctx.beginPath();
        ctx.roundRect(x - w / 2, y - h / 2, w, h, 6);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.font = "700 11px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(t.label, x, y - 2);

        if (glyph) {
          ctx.font = "600 8px var(--font-geist-mono, monospace)";
          ctx.fillStyle = stroke;
          ctx.fillText(glyph, x, y + 9);
        } else if (status === "running") {
          // spinner arc
          const ang = (frame / 6) % (Math.PI * 2);
          ctx.beginPath();
          ctx.arc(x + w / 2 - 8, y, 4, ang, ang + Math.PI * 1.3);
          ctx.strokeStyle = runningColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Mode label bottom-left
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.fillText(
        isCacheRun ? "turbo run deploy  [CACHE HIT]" : "turbo run deploy",
        10,
        H - 10
      );

      frameRef.current = (frame + 1) % FULL;

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
