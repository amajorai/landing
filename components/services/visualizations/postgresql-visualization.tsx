"use client";
import { useEffect, useRef } from "react";

interface PlanNode {
  label: string;
  cost: number;
  children: PlanNode[];
}

const PLAN: PlanNode = {
  label: "Sort",
  cost: 120,
  children: [
    {
      label: "Hash Join",
      cost: 90,
      children: [
        { label: "Seq Scan: users", cost: 30, children: [] },
        {
          label: "Hash",
          cost: 50,
          children: [{ label: "Index Scan: orders", cost: 40, children: [] }],
        },
      ],
    },
  ],
};

const DRAW_PER_NODE = 18;
const EXEC_PER_NODE = 24;

function flatten(
  node: PlanNode,
  depth = 0,
  out: { node: PlanNode; depth: number }[] = []
) {
  out.push({ node, depth });
  for (const c of node.children) flatten(c, depth + 1, out);
  return out;
}

function postOrder(node: PlanNode, out: PlanNode[] = []) {
  for (const c of node.children) postOrder(c, out);
  out.push(node);
  return out;
}

const FLAT = flatten(PLAN);
const EXEC_ORDER = postOrder(PLAN);
const DRAW_PHASE = FLAT.length * DRAW_PER_NODE;
const EXEC_PHASE = EXEC_ORDER.length * EXEC_PER_NODE;
const HOLD = 90;
const FADE = 30;
const TOTAL = DRAW_PHASE + EXEC_PHASE + HOLD + FADE;

export function PostgresqlVisualization() {
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
      const planColor = isDark ? "#38bdf8" : "#0284c7";
      const nodeFill = isDark
        ? "rgba(56,189,248,0.12)"
        : "rgba(2,132,199,0.10)";
      const activeColor = isDark ? "#7dd3fc" : "#38bdf8";
      const costColor = isDark ? "rgba(56,189,248,0.4)" : "rgba(2,132,199,0.3)";
      const textColor = isDark ? "#f0f9ff" : "#0c4a6e";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // Layout
      const levels: PlanNode[][] = [];
      for (const { node, depth } of FLAT) {
        if (!levels[depth]) levels[depth] = [];
        levels[depth].push(node);
      }
      const nodeW = Math.min(120, W * 0.34);
      const nodeH = 24;
      const levelGapY = (H - 24) / (levels.length + 0.5);
      const positions = new Map<PlanNode, { x: number; y: number }>();
      for (let d = 0; d < levels.length; d++) {
        const row = levels[d];
        const gap = W / (row.length + 1);
        for (let i = 0; i < row.length; i++) {
          positions.set(row[i], {
            x: gap * (i + 1),
            y: 16 + levelGapY * (d + 0.5),
          });
        }
      }

      // Fade alpha
      let alpha = 1;
      if (frame >= DRAW_PHASE + EXEC_PHASE + HOLD) {
        alpha = 1 - (frame - (DRAW_PHASE + EXEC_PHASE + HOLD)) / FADE;
      }
      ctx.globalAlpha = Math.max(0, alpha);

      const drawnCount =
        frame < DRAW_PHASE
          ? Math.floor(frame / DRAW_PER_NODE) + 1
          : FLAT.length;

      // Edges
      const drawSubtreeEdges = (node: PlanNode) => {
        const idx = FLAT.findIndex((f) => f.node === node);
        for (const c of node.children) {
          const cIdx = FLAT.findIndex((f) => f.node === c);
          if (idx < drawnCount && cIdx < drawnCount) {
            const pa = positions.get(node);
            const pb = positions.get(c);
            if (pa && pb) {
              ctx.strokeStyle = planColor;
              ctx.globalAlpha = 0.5 * alpha;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pa.x, pa.y + nodeH / 2);
              ctx.lineTo(pb.x, pb.y - nodeH / 2);
              ctx.stroke();
              ctx.globalAlpha = alpha;
            }
          }
          drawSubtreeEdges(c);
        }
      };
      drawSubtreeEdges(PLAN);

      // Lit nodes
      const litNodes = new Set<PlanNode>();
      if (frame >= DRAW_PHASE) {
        const execProgress = Math.min(
          Math.floor((frame - DRAW_PHASE) / EXEC_PER_NODE) + 1,
          EXEC_ORDER.length
        );
        for (let i = 0; i < execProgress; i++) litNodes.add(EXEC_ORDER[i]);
      }

      // Nodes
      for (let i = 0; i < drawnCount; i++) {
        const { node } = FLAT[i];
        const pos = positions.get(node);
        if (!pos) continue;

        const lit = litNodes.has(node);
        const x = pos.x - nodeW / 2;
        const y = pos.y - nodeH / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, nodeW, nodeH, 4);
        ctx.fillStyle = lit
          ? isDark
            ? "rgba(125,211,252,0.25)"
            : "rgba(56,189,248,0.2)"
          : nodeFill;
        ctx.fill();
        ctx.strokeStyle = lit ? activeColor : planColor;
        ctx.lineWidth = lit ? 1.8 : 1;
        ctx.stroke();

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y - 3);

        // Cost bar
        const barW = nodeW - 10;
        const barX = x + 5;
        const barY = y + nodeH - 7;
        ctx.fillStyle = isDark
          ? "rgba(56,189,248,0.15)"
          : "rgba(2,132,199,0.12)";
        ctx.fillRect(barX, barY, barW, 3);

        const fillRatio = lit ? Math.min(node.cost / 120, 1) : 0;
        ctx.fillStyle = costColor;
        ctx.fillRect(barX, barY, barW * fillRatio, 3);

        // Cost label
        ctx.font = "6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.7 * alpha;
        ctx.fillText(`cost=${node.cost}`, pos.x, y - 4);
        ctx.globalAlpha = alpha;
      }

      ctx.globalAlpha = 1;
      frameRef.current = (frame + 1) % TOTAL;

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
