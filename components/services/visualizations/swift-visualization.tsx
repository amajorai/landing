"use client";
import { useEffect, useRef } from "react";

// SwiftUI: declarative view tree builds up, with a preview silhouette
interface TreeNode {
  id: string;
  label: string;
  x: number; // 0..1
  y: number; // 0..1
  parent: string | null;
}

const NODES: TreeNode[] = [
  { id: "content", label: "ContentView", x: 0.5, y: 0.12, parent: null },
  { id: "vstack", label: "VStack", x: 0.5, y: 0.38, parent: "content" },
  { id: "text", label: "Text", x: 0.25, y: 0.68, parent: "vstack" },
  { id: "hstack", label: "HStack", x: 0.62, y: 0.68, parent: "vstack" },
  { id: "image", label: "Image", x: 0.5, y: 0.92, parent: "hstack" },
  { id: "button", label: "Button", x: 0.78, y: 0.92, parent: "hstack" },
];

const STEP = 28; // frames per node
const HOLD = 90;
const FADE = 25;
const TOTAL = NODES.length * STEP + HOLD + FADE;

export function SwiftVisualization() {
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
      const nodeColor = isDark ? "#fb923c" : "#ea580c";
      const lineColor = isDark ? "rgba(251,146,60,0.4)" : "rgba(234,88,12,0.3)";
      const nodeFill = isDark
        ? "rgba(251,146,60,0.12)"
        : "rgba(234,88,12,0.10)";
      const textColor = isDark ? "#fff7ed" : "#431407";

      ctx.clearRect(0, 0, W, H);

      // Tree area takes left ~65%, preview on right ~30%
      const treeW = W * 0.62;
      const treeH = H;
      const previewX = W * 0.68;
      const previewY = H * 0.15;
      const previewW = W * 0.28;
      const previewH = H * 0.7;

      const frame = frameRef.current;
      const fadeStart = NODES.length * STEP + HOLD;
      let globalAlpha = 1;
      if (frame >= fadeStart) {
        globalAlpha = Math.max(0, 1 - (frame - fadeStart) / FADE);
      }
      ctx.globalAlpha = globalAlpha;

      const nodePos = NODES.map((n) => ({
        x: n.x * treeW + W * 0.02,
        y: n.y * treeH * 0.9 + H * 0.05,
      }));

      // Draw edges first, with draw-in progress
      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        if (!n.parent) continue;
        const parentIdx = NODES.findIndex((p) => p.id === n.parent);
        const childStart = i * STEP;
        if (frame < childStart) continue;
        const p = Math.min((frame - childStart) / (STEP * 0.6), 1);
        const px = nodePos[parentIdx].x;
        const py = nodePos[parentIdx].y;
        const cx = nodePos[i].x;
        const cy = nodePos[i].y;
        const ex = px + (cx - px) * p;
        const ey = py + (cy - py) * p;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      // Draw nodes
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < NODES.length; i++) {
        const nodeStart = i * STEP;
        if (frame < nodeStart) continue;
        const appear = Math.min((frame - nodeStart) / (STEP * 0.5), 1);
        const { x, y } = nodePos[i];
        const label = NODES[i].label;
        ctx.font = "600 10px var(--font-geist-mono, monospace)";
        const w = ctx.measureText(label).width + 14;
        const h = 18;

        ctx.globalAlpha = appear * globalAlpha;
        ctx.beginPath();
        ctx.roundRect(x - w / 2, y - h / 2, w, h, 5);
        ctx.fillStyle = nodeFill;
        ctx.fill();
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.fillText(label, x, y);
        ctx.globalAlpha = globalAlpha;
      }

      // Preview mockup silhouette on right
      const previewProgress = Math.min(frame / (NODES.length * STEP), 1);
      ctx.globalAlpha = previewProgress * 0.9 * globalAlpha;
      // Phone frame
      ctx.strokeStyle = nodeColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(previewX, previewY, previewW, previewH, 8);
      ctx.stroke();
      // Text bar (top of VStack)
      ctx.fillStyle = nodeFill;
      ctx.fillRect(previewX + 10, previewY + 14, previewW - 20, 10);
      // HStack with image + button
      const hstackY = previewY + previewH * 0.5;
      ctx.fillRect(previewX + 10, hstackY, (previewW - 28) * 0.45, 22);
      ctx.fillRect(
        previewX + 18 + (previewW - 28) * 0.45,
        hstackY,
        (previewW - 28) * 0.45,
        22
      );
      // Strokes
      ctx.strokeStyle = nodeColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(previewX + 10, previewY + 14, previewW - 20, 10);
      ctx.strokeRect(previewX + 10, hstackY, (previewW - 28) * 0.45, 22);
      ctx.strokeRect(
        previewX + 18 + (previewW - 28) * 0.45,
        hstackY,
        (previewW - 28) * 0.45,
        22
      );

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
