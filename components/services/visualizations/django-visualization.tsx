"use client";
import { useEffect, useRef } from "react";

// Django MTV request-response cycle stages.
// Each stage has a [from, to] index into our node layout.
interface Node {
  label: string;
  x: number; // ratio 0..1
  y: number; // ratio 0..1
}

const NODES: Node[] = [
  { label: "Browser", x: 0.08, y: 0.5 },
  { label: "urls.py", x: 0.26, y: 0.5 },
  { label: "View", x: 0.46, y: 0.5 },
  { label: "Model", x: 0.66, y: 0.28 },
  { label: "Database", x: 0.88, y: 0.28 },
  { label: "Template", x: 0.66, y: 0.72 },
  { label: "Response", x: 0.88, y: 0.72 },
];

// Animation script: each step is a segment (fromIdx, toIdx, label?)
const STEPS: { from: number; to: number; info?: string }[] = [
  { from: 0, to: 1, info: 'path("/posts")' },
  { from: 1, to: 2, info: "PostListView" },
  { from: 2, to: 3, info: "Post.objects" },
  { from: 3, to: 4, info: "SELECT *" },
  { from: 4, to: 3 },
  { from: 3, to: 2 },
  { from: 2, to: 5, info: "render()" },
  { from: 5, to: 6 },
  { from: 6, to: 0 },
];

const STEP_DURATION = 500; // ms per step
const CYCLE = STEPS.length * STEP_DURATION + 400;

export function DjangoVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) % CYCLE;

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
      const activeColor = isDark ? "#4ade80" : "#16a34a";
      const boxColor = isDark
        ? "rgba(74,222,128,0.12)"
        : "rgba(22,163,74,0.10)";
      const edgeColor = isDark
        ? "rgba(74,222,128,0.3)"
        : "rgba(22,163,74,0.25)";
      const textColor = isDark ? "#f0fdf4" : "#14532d";
      const dbColor = isDark ? "#34d399" : "#10b981";

      ctx.clearRect(0, 0, W, H);

      const positions = NODES.map((n) => ({
        x: n.x * W,
        y: n.y * H,
      }));

      // Determine current step
      const stepIdx = Math.min(
        STEPS.length - 1,
        Math.floor(elapsed / STEP_DURATION)
      );
      const stepT = (elapsed - stepIdx * STEP_DURATION) / STEP_DURATION;
      const step = STEPS[stepIdx];

      // Draw edges
      const edgesToDraw: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [2, 5],
        [5, 6],
        [6, 0],
      ];

      for (const [a, b] of edgesToDraw) {
        ctx.beginPath();
        ctx.moveTo(positions[a].x, positions[a].y);
        ctx.lineTo(positions[b].x, positions[b].y);
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Packet
      const p1 = positions[step.from];
      const p2 = positions[step.to];
      const px = p1.x + (p2.x - p1.x) * stepT;
      const py = p1.y + (p2.y - p1.y) * stepT;

      // Node rendering
      for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        const pos = positions[i];
        const isActive = i === step.from || i === step.to;
        const boxW = 58;
        const boxH = 22;
        const x = pos.x - boxW / 2;
        const y = pos.y - boxH / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, boxW, boxH, 4);
        ctx.fillStyle = isActive
          ? isDark
            ? "rgba(74,222,128,0.25)"
            : "rgba(22,163,74,0.18)"
          : boxColor;
        ctx.fill();
        ctx.strokeStyle = i === 4 ? dbColor : activeColor;
        ctx.lineWidth = isActive ? 1.6 : 1;
        ctx.stroke();

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y);
      }

      // Packet on top
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.fill();
      const grd = ctx.createRadialGradient(px, py, 1, px, py, 10);
      grd.addColorStop(0, "rgba(74,222,128,0.5)");
      grd.addColorStop(1, "rgba(74,222,128,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fill();

      // Info label near packet
      if (step.info) {
        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText(step.info, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2 - 8);
      }

      // SQL flash effect during DB step
      if (stepIdx === 3) {
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = dbColor;
        ctx.textAlign = "center";
        ctx.fillText(
          "SELECT * FROM posts",
          positions[4].x,
          positions[4].y + 22
        );
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
