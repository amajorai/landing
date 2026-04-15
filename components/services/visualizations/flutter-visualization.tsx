"use client";
import { useEffect, useRef } from "react";

// Flutter: one Dart codebase → widget tree → renders on iOS, Android, Web simultaneously
// Draws a widget tree in the center, three platform silhouettes around it, and
// particles flowing from the tree out to each platform.

const TREE_NODES = [
  { id: "app", label: "MaterialApp", depth: 0, order: 0 },
  { id: "scaffold", label: "Scaffold", depth: 1, order: 1 },
  { id: "appbar", label: "AppBar", depth: 2, order: 2 },
  { id: "column", label: "Column", depth: 2, order: 3 },
  { id: "text", label: "Text", depth: 3, order: 4 },
  { id: "btn", label: "ElevatedButton", depth: 3, order: 5 },
];

const NODE_STROKE_FRAMES = 18;
const PARTICLE_FRAMES = 260;
const TOTAL_FRAMES =
  TREE_NODES.length * NODE_STROKE_FRAMES + PARTICLE_FRAMES + 40;

export function FlutterVisualization() {
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
      const treeColor = isDark ? "#38bdf8" : "#0284c7";
      const iosColor = "#a78bfa";
      const androidColor = "#4ade80";
      const webColor = "#fb923c";
      const textColor = isDark ? "#f0f9ff" : "#0c4a6e";
      const subtle = isDark ? "rgba(56,189,248,0.15)" : "rgba(2,132,199,0.12)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // ---- Widget tree layout (center) ----
      const treeCx = W * 0.5;
      const treeTop = H * 0.18;
      const rowGap = Math.min(H * 0.14, 30);
      const nodeW = Math.min(W * 0.22, 110);
      const nodeH = Math.min(H * 0.11, 22);

      // Positions for each node
      const nodePos: Record<string, { x: number; y: number }> = {
        app: { x: treeCx, y: treeTop },
        scaffold: { x: treeCx, y: treeTop + rowGap },
        appbar: { x: treeCx - nodeW * 0.7, y: treeTop + rowGap * 2 },
        column: { x: treeCx + nodeW * 0.7, y: treeTop + rowGap * 2 },
        text: { x: treeCx + nodeW * 0.2, y: treeTop + rowGap * 3 },
        btn: { x: treeCx + nodeW * 1.2, y: treeTop + rowGap * 3 },
      };

      const edges: [string, string][] = [
        ["app", "scaffold"],
        ["scaffold", "appbar"],
        ["scaffold", "column"],
        ["column", "text"],
        ["column", "btn"],
      ];

      // Which nodes are drawn so far
      const drawnCount = Math.min(
        Math.floor(frame / NODE_STROKE_FRAMES),
        TREE_NODES.length
      );
      const currentProgress = (frame % NODE_STROKE_FRAMES) / NODE_STROKE_FRAMES;

      // Draw edges for drawn nodes
      ctx.strokeStyle = treeColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      for (const [a, b] of edges) {
        const ai = TREE_NODES.findIndex((n) => n.id === a);
        const bi = TREE_NODES.findIndex((n) => n.id === b);
        if (drawnCount > Math.max(ai, bi)) {
          ctx.beginPath();
          ctx.moveTo(nodePos[a].x, nodePos[a].y + nodeH / 2);
          ctx.lineTo(nodePos[b].x, nodePos[b].y - nodeH / 2);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);

      // Draw nodes
      for (let i = 0; i < TREE_NODES.length; i++) {
        if (i > drawnCount) break;
        const node = TREE_NODES[i];
        const pos = nodePos[node.id];
        const progress = i < drawnCount ? 1 : currentProgress;
        if (progress <= 0) continue;

        ctx.globalAlpha = progress;
        ctx.fillStyle = subtle;
        const x = pos.x - nodeW / 2;
        const y = pos.y - nodeH / 2;
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + nodeW - r, y);
        ctx.quadraticCurveTo(x + nodeW, y, x + nodeW, y + r);
        ctx.lineTo(x + nodeW, y + nodeH - r);
        ctx.quadraticCurveTo(x + nodeW, y + nodeH, x + nodeW - r, y + nodeH);
        ctx.lineTo(x + r, y + nodeH);
        ctx.quadraticCurveTo(x, y + nodeH, x, y + nodeH - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = treeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(nodeH * 0.55)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y);
        ctx.globalAlpha = 1;
      }

      // ---- Platform silhouettes ----
      const platforms = [
        {
          name: "iOS",
          color: iosColor,
          x: W * 0.12,
          y: H * 0.28,
          w: Math.min(W * 0.14, 58),
          h: Math.min(H * 0.32, 80),
          type: "phone" as const,
        },
        {
          name: "Android",
          color: androidColor,
          x: W * 0.12,
          y: H * 0.72,
          w: Math.min(W * 0.14, 58),
          h: Math.min(H * 0.3, 72),
          type: "phone" as const,
        },
        {
          name: "Web",
          color: webColor,
          x: W * 0.88,
          y: H * 0.5,
          w: Math.min(W * 0.18, 80),
          h: Math.min(H * 0.32, 78),
          type: "browser" as const,
        },
      ];

      for (const p of platforms) {
        const x = p.x - p.w / 2;
        const y = p.y - p.h / 2;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.4;
        ctx.fillStyle = `${p.color}22`;

        if (p.type === "phone") {
          // phone rounded rect
          const r = 6;
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + p.w - r, y);
          ctx.quadraticCurveTo(x + p.w, y, x + p.w, y + r);
          ctx.lineTo(x + p.w, y + p.h - r);
          ctx.quadraticCurveTo(x + p.w, y + p.h, x + p.w - r, y + p.h);
          ctx.lineTo(x + r, y + p.h);
          ctx.quadraticCurveTo(x, y + p.h, x, y + p.h - r);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // "rendered" mockup blocks inside
          ctx.fillStyle = p.color;
          ctx.fillRect(x + 6, y + 8, p.w - 12, 4);
          ctx.globalAlpha = 0.6;
          ctx.fillRect(x + 6, y + 16, p.w - 20, 3);
          ctx.fillRect(x + 6, y + 22, p.w - 14, 3);
          ctx.globalAlpha = 0.4;
          ctx.fillRect(x + 6, y + p.h - 14, p.w - 12, 6);
          ctx.globalAlpha = 1;
        } else {
          // browser window
          ctx.fillRect(x, y, p.w, p.h);
          ctx.strokeRect(x, y, p.w, p.h);
          ctx.fillStyle = p.color;
          ctx.fillRect(x, y, p.w, 6);
          ctx.globalAlpha = 0.6;
          ctx.fillRect(x + 6, y + 12, p.w - 12, 4);
          ctx.fillRect(x + 6, y + 20, p.w - 20, 3);
          ctx.fillRect(x + 6, y + 26, p.w - 14, 3);
          ctx.globalAlpha = 0.4;
          ctx.fillRect(x + 6, y + 36, (p.w - 18) / 2, 12);
          ctx.fillRect(x + 12 + (p.w - 18) / 2, y + 36, (p.w - 18) / 2, 12);
          ctx.globalAlpha = 1;
        }

        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(Math.min(W, H) * 0.04)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(p.name, p.x, y + p.h + 2);
      }

      // ---- Particles from tree → platforms ----
      const particleStart = TREE_NODES.length * NODE_STROKE_FRAMES;
      if (frame >= particleStart) {
        const pf = frame - particleStart;
        const origin = nodePos.app;
        for (let i = 0; i < platforms.length; i++) {
          const p = platforms[i];
          for (let k = 0; k < 3; k++) {
            const t = ((pf + k * 30 + i * 17) % 90) / 90;
            const px = origin.x + (p.x - origin.x) * t;
            const py = origin.y + (p.y - origin.y) * t;
            ctx.globalAlpha = 1 - Math.abs(t - 0.5) * 1.4;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      // Label
      ctx.fillStyle = textColor;
      ctx.font = `${Math.round(Math.min(W, H) * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("Same Dart code → 6 targets", W / 2, H - 4);

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
