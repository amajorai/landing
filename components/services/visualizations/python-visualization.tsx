"use client";
import { useEffect, useRef } from "react";

const NODE_LABELS = ["Data In", "Transform", "Output"];
const NUM_PARTICLES = 8;
const PARTICLE_SPEED = 0.006;

interface Particle {
  progress: number; // 0 → 1 along path 0 or path 1
  pathIndex: number; // 0 = left→center, 1 = center→right
  offset: number; // stagger offset
}

function initParticles(): Particle[] {
  return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
    progress: i / NUM_PARTICLES,
    pathIndex: i % 2 === 0 ? 0 : 1,
    offset: 0,
  }));
}

export function PythonVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const particlesRef = useRef<Particle[]>(initParticles());

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
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const nodeColor = "#eab308"; // yellow-500
      const nodeFill = isDark ? "rgba(234,179,8,0.10)" : "rgba(234,179,8,0.12)";
      const textColor = isDark ? "#fef9c3" : "#713f12"; // yellow-100 / yellow-900
      const labelColor = isDark ? "#ca8a04" : "#854d0e"; // yellow-600 / yellow-800
      const bgPath = isDark ? "rgba(234,179,8,0.08)" : "rgba(234,179,8,0.06)";

      ctx.clearRect(0, 0, W, H);

      // Node dimensions
      const nodeW = Math.min(72, W * 0.2);
      const nodeH = 34;
      const nodeR = 6;

      // Three node centers, evenly spaced
      const margin = nodeW / 2 + 10;
      const usableW = W - margin * 2;
      const nodeXs = [margin, margin + usableW / 2, margin + usableW];

      // Draw background bezier paths
      const drawPath = (x1: number, x2: number, above: boolean) => {
        const cpOffset = above ? -30 : 30;
        const midX = (x1 + x2) / 2;
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.bezierCurveTo(
          midX - (x2 - x1) * 0.1,
          cy + cpOffset,
          midX + (x2 - x1) * 0.1,
          cy + cpOffset,
          x2,
          cy
        );
        ctx.strokeStyle = bgPath;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawPath(nodeXs[0], nodeXs[1], true);
      drawPath(nodeXs[1], nodeXs[2], false);

      // Helper: point on bezier at t
      const bezierPoint = (
        x1: number,
        x2: number,
        above: boolean,
        t: number
      ): { x: number; y: number } => {
        const cpOffset = above ? -30 : 30;
        const midX = (x1 + x2) / 2;
        const cp1x = midX - (x2 - x1) * 0.1;
        const cp1y = cy + cpOffset;
        const cp2x = midX + (x2 - x1) * 0.1;
        const cp2y = cy + cpOffset;
        const mt = 1 - t;
        const x =
          mt * mt * mt * x1 +
          3 * mt * mt * t * cp1x +
          3 * mt * t * t * cp2x +
          t * t * t * x2;
        const y =
          mt * mt * mt * cy +
          3 * mt * mt * t * cp1y +
          3 * mt * t * t * cp2y +
          t * t * t * cy;
        return { x, y };
      };

      // Update and draw particles
      const particles = particlesRef.current;
      for (const p of particles) {
        p.progress += PARTICLE_SPEED;
        if (p.progress >= 1) {
          p.progress = 0;
          // Alternate paths to distribute
          p.pathIndex = p.pathIndex === 0 ? 1 : 0;
        }

        const isPath0 = p.pathIndex === 0;
        const x1 = isPath0 ? nodeXs[0] : nodeXs[1];
        const x2 = isPath0 ? nodeXs[1] : nodeXs[2];
        const above = isPath0;

        const pos = bezierPoint(x1, x2, above, p.progress);

        // Opacity: fade in near start, fade out near end
        const t = p.progress;
        const alpha =
          t < 0.15
            ? 0.4 + (t / 0.15) * 0.6
            : t > 0.85
              ? 1 - ((t - 0.85) / 0.15) * 0.6
              : 1;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = alpha * 0.85;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(pos.x, pos.y, 1, pos.x, pos.y, 6);
        grd.addColorStop(0, "rgba(234,179,8,0.4)");
        grd.addColorStop(1, "rgba(234,179,8,0)");
        ctx.fillStyle = grd;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw nodes (on top of particles)
      for (let i = 0; i < 3; i++) {
        const nx = nodeXs[i];
        const x = nx - nodeW / 2;
        const y = cy - nodeH / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, nodeW, nodeH, nodeR);
        ctx.fillStyle = nodeFill;
        ctx.fill();
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(NODE_LABELS[i], nx, cy);
      }

      // Arrow heads on path ends (before each node)
      const arrowPositions = [
        bezierPoint(nodeXs[0], nodeXs[1], true, 0.88),
        bezierPoint(nodeXs[1], nodeXs[2], false, 0.88),
      ];
      const arrowTargets = [nodeXs[1], nodeXs[2]];
      const arrowAbove = [true, false];

      for (let i = 0; i < 2; i++) {
        const tip = bezierPoint(
          i === 0 ? nodeXs[0] : nodeXs[1],
          arrowTargets[i],
          arrowAbove[i],
          0.94
        );
        const base = arrowPositions[i];
        const angle = Math.atan2(tip.y - base.y, tip.x - base.x);
        const len = 6;

        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(
          tip.x - len * Math.cos(angle - 0.4),
          tip.y - len * Math.sin(angle - 0.4)
        );
        ctx.lineTo(
          tip.x - len * Math.cos(angle + 0.4),
          tip.y - len * Math.sin(angle + 0.4)
        );
        ctx.closePath();
        ctx.fillStyle = labelColor;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
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
