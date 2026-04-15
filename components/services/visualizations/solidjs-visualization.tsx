"use client";
import { useEffect, useRef } from "react";

// Nodes in the reactive graph
type NodeKind = "signal" | "memo" | "effect";
interface GNode {
  id: string;
  kind: NodeKind;
  label: string;
  x: number; // relative 0..1
  y: number;
}

const NODES: GNode[] = [
  { id: "sig", kind: "signal", label: "Signal", x: 0.5, y: 0.18 },
  { id: "m1", kind: "memo", label: "Memo", x: 0.28, y: 0.5 },
  { id: "m2", kind: "memo", label: "Memo", x: 0.72, y: 0.5 },
  { id: "e1", kind: "effect", label: "Effect", x: 0.28, y: 0.82 },
  { id: "e2", kind: "effect", label: "Effect", x: 0.72, y: 0.82 },
];

const EDGES: Array<[string, string]> = [
  ["sig", "m1"],
  ["sig", "m2"],
  ["m1", "e1"],
  ["m2", "e2"],
];

export function SolidJsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const cycleStartRef = useRef(0);

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
      const signalColor = isDark ? "#60a5fa" : "#2563eb";
      const memoColor = isDark ? "#818cf8" : "#6d28d9";
      const effectColor = isDark ? "#c084fc" : "#9333ea";
      const edgeColor = isDark
        ? "rgba(96,165,250,0.3)"
        : "rgba(37,99,235,0.25)";
      const textColor = isDark ? "#eff6ff" : "#1e3a8a";

      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      const cyclePeriod = 1800;
      if (now - cycleStartRef.current > cyclePeriod) {
        cycleStartRef.current = now;
      }
      const t = now - cycleStartRef.current; // 0..cyclePeriod

      // Determine lit state of nodes (signal lights at 0, memo at 200, effect at 400; each stays lit ~500ms)
      const litWindow = (start: number) => {
        const d = t - start;
        if (d < 0 || d > 600) return 0;
        return Math.max(0, 1 - d / 600);
      };

      const sigLit = litWindow(0);
      const memoLit = litWindow(250);
      const effLit = litWindow(500);

      const nodePos = (n: GNode) => ({ x: n.x * W, y: n.y * H });
      const colorOf = (kind: NodeKind) =>
        kind === "signal"
          ? signalColor
          : kind === "memo"
            ? memoColor
            : effectColor;
      const litOf = (kind: NodeKind) =>
        kind === "signal" ? sigLit : kind === "memo" ? memoLit : effLit;

      // Draw edges with traveling pulses
      for (const [a, b] of EDGES) {
        const na = NODES.find((n) => n.id === a)!;
        const nb = NODES.find((n) => n.id === b)!;
        const pa = nodePos(na);
        const pb = nodePos(nb);
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();

        // arrowhead
        const ang = Math.atan2(pb.y - pa.y, pb.x - pa.x);
        const ah = 6;
        const tipX = pb.x - Math.cos(ang) * 22;
        const tipY = pb.y - Math.sin(ang) * 22;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(
          tipX - Math.cos(ang - 0.4) * ah,
          tipY - Math.sin(ang - 0.4) * ah
        );
        ctx.lineTo(
          tipX - Math.cos(ang + 0.4) * ah,
          tipY - Math.sin(ang + 0.4) * ah
        );
        ctx.closePath();
        ctx.fillStyle = edgeColor;
        ctx.fill();

        // traveling pulse along edge - signal->memo during 0-400ms, memo->effect during 250-650ms
        const edgePhaseStart = a === "sig" ? 0 : 250;
        const edgePhaseDur = 400;
        const p = (t - edgePhaseStart) / edgePhaseDur;
        if (p >= 0 && p <= 1) {
          const px = pa.x + (pb.x - pa.x) * p;
          const py = pa.y + (pb.y - pa.y) * p;
          ctx.fillStyle = colorOf(na.kind);
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Draw nodes
      for (const n of NODES) {
        const p = nodePos(n);
        const c = colorOf(n.kind);
        const lit = litOf(n.kind);

        if (n.kind === "signal") {
          const r = 22 + lit * 4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.globalAlpha = 0.15 + lit * 0.4;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = c;
          ctx.lineWidth = 1.5 + lit * 1.5;
          ctx.stroke();
        } else {
          const w = 62;
          const h = 26;
          ctx.beginPath();
          ctx.roundRect(p.x - w / 2, p.y - h / 2, w, h, 6);
          ctx.fillStyle = c;
          ctx.globalAlpha = 0.15 + lit * 0.4;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = c;
          ctx.lineWidth = 1.2 + lit * 1.3;
          ctx.stroke();
        }

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, p.x, p.y);
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
