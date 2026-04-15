"use client";
import { useEffect, useRef } from "react";

interface Node {
  id: string;
  label: string;
  angle: number;
  speed: number;
  radius: number;
  size: number;
}

const NODES: Node[] = [
  { id: "state", label: "State", angle: 0, speed: 0.4, radius: 80, size: 36 },
  { id: "props", label: "Props", angle: 60, speed: 0.55, radius: 90, size: 32 },
  {
    id: "hooks",
    label: "Hooks",
    angle: 130,
    speed: 0.35,
    radius: 75,
    size: 38,
  },
  { id: "ctx", label: "Context", angle: 200, speed: 0.5, radius: 88, size: 34 },
  {
    id: "effect",
    label: "Effect",
    angle: 270,
    speed: 0.45,
    radius: 82,
    size: 32,
  },
  { id: "memo", label: "Memo", angle: 330, speed: 0.6, radius: 85, size: 30 },
];

export function ReactVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const anglesRef = useRef<number[]>(
    NODES.map((n) => (n.angle * Math.PI) / 180)
  );
  const runningRef = useRef(false);

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

      // Resolve theme colors
      const style = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains("dark");
      const nodeColor = isDark ? "#38bdf8" : "#0284c7"; // sky-400 / sky-600
      const nodeColorLight = isDark ? "#7dd3fc" : "#38bdf8"; // sky-300 / sky-400
      const trackColor = isDark
        ? "rgba(56,189,248,0.08)"
        : "rgba(2,132,199,0.08)";
      const lineColor = isDark
        ? "rgba(56,189,248,0.25)"
        : "rgba(2,132,199,0.2)";
      const textColor = isDark ? "#f0f9ff" : "#0c4a6e";
      const atomColor = isDark ? "#38bdf8" : "#0284c7";

      ctx.clearRect(0, 0, W, H);

      // Draw orbit tracks
      for (const node of NODES) {
        ctx.beginPath();
        ctx.arc(cx, cy, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = trackColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update angles
      anglesRef.current = anglesRef.current.map((a, i) => {
        return a + (NODES[i].speed * Math.PI) / 180 / 4;
      });

      // Draw lines from center to nodes
      for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        const angle = anglesRef.current[i];
        const nx = cx + Math.cos(angle) * node.radius;
        const ny = cy + Math.sin(angle) * node.radius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw center React atom
      const atomRadius = 24;
      ctx.beginPath();
      ctx.arc(cx, cy, atomRadius, 0, Math.PI * 2);
      ctx.fillStyle = atomColor;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = atomColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // React logo circle
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = atomColor;
      ctx.fill();

      // React electron orbits (decorative)
      for (let e = 0; e < 3; e++) {
        const eAngle = (e * Math.PI * 2) / 3;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(eAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, atomRadius - 4, atomRadius / 3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = atomColor;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Draw orbiting nodes
      for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        const angle = anglesRef.current[i];
        const nx = cx + Math.cos(angle) * node.radius;
        const ny = cy + Math.sin(angle) * node.radius;
        const half = node.size / 2;
        const r = 6;

        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(nx - half, ny - half, node.size, node.size, r);
        ctx.fillStyle = nodeColorLight;
        ctx.globalAlpha = 0.15;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, nx, ny);
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
