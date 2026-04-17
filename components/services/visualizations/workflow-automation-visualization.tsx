"use client";
import { useEffect, useRef } from "react";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const NODES = [
  { label: "Trigger", sub: "New lead" },
  { label: "Filter", sub: "Qualify" },
  { label: "Enrich", sub: "CRM sync" },
  { label: "Notify", sub: "Slack + Email" },
];
const PARTICLE_CYCLE = 2200;
const CYCLE_MS = 6000;

export function WorkflowAutomationVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
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

      const accent = isDark ? "#34d399" : "#059669";
      const accentDim = isDark
        ? "rgba(52,211,153,0.12)"
        : "rgba(5,150,105,0.08)";
      const borderColor = isDark
        ? "rgba(52,211,153,0.28)"
        : "rgba(5,150,105,0.20)";
      const textColor = isDark ? "#d1fae5" : "#064e3b";
      const subColor = isDark ? "rgba(209,250,229,0.5)" : "rgba(6,78,59,0.5)";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS;

      const n = NODES.length;
      const nodeR = Math.min(W * 0.1, H * 0.18, 28);
      const nodeSpacingX = (W - nodeR * 2) / (n - 1);
      const cy = H * 0.5;

      // node positions
      const positions = NODES.map((_, i) => ({
        x: nodeR + i * nodeSpacingX,
        y: cy,
      }));

      // draw connector lines
      for (let i = 0; i < n - 1; i++) {
        const lineT = t < 0.05 ? 0 : Math.min(1, (t - 0.05 - i * 0.05) / 0.2);
        if (lineT <= 0) continue;
        const from = positions[i];
        const to = positions[i + 1];
        const ex = from.x + nodeR + (to.x - from.x - nodeR * 2) * lineT;

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(from.x + nodeR, from.y);
        ctx.lineTo(ex, from.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // arrowhead
        if (lineT > 0.85) {
          const alpha = (lineT - 0.85) / 0.15;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = accent;
          const ax = ex;
          const ay = from.y;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax - 5, ay - 3);
          ctx.lineTo(ax - 5, ay + 3);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // animated particle along the pipeline
      const particleT =
        ((now - startRef.current) % PARTICLE_CYCLE) / PARTICLE_CYCLE;
      if (t > 0.3) {
        const totalLen = (n - 1) * nodeSpacingX;
        const particleX =
          positions[0].x +
          nodeR +
          easeInOut(particleT) * (totalLen - nodeR * 2 * (n - 1));
        const pAlpha = Math.min(1, (t - 0.3) / 0.15);
        ctx.globalAlpha = pAlpha;
        ctx.beginPath();
        ctx.arc(particleX, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
        // glow
        const grd = ctx.createRadialGradient(
          particleX,
          cy,
          0,
          particleX,
          cy,
          10
        );
        grd.addColorStop(
          0,
          isDark ? "rgba(52,211,153,0.4)" : "rgba(5,150,105,0.3)"
        );
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(particleX, cy, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // draw nodes
      for (let i = 0; i < n; i++) {
        const nodeT = t < 0.04 ? 0 : Math.min(1, (t - 0.04 - i * 0.06) / 0.22);
        if (nodeT <= 0) continue;
        const { x, y } = positions[i];
        const scale = easeInOut(nodeT);

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // node circle
        ctx.beginPath();
        ctx.arc(0, 0, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = accentDim;
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // label
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(NODES[i].label, 0, -3);

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = subColor;
        ctx.fillText(NODES[i].sub, 0, 7);

        ctx.restore();
      }

      // title
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = subColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Automated Workflow", W / 2, H * 0.1);

      // runs badge
      if (t > 0.5) {
        const alpha = Math.min(1, (t - 0.5) / 0.15);
        ctx.globalAlpha = alpha;
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("1,240 runs today", W / 2, H * 0.92);
        ctx.globalAlpha = 1;
      }

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startRef.current = 0;
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
