"use client";
import { useEffect, useRef } from "react";

interface DocNode {
  label: string;
  x: number;
  y: number;
}

export function SanityVisualization() {
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
      const frame = frameRef.current;

      const accent = isDark ? "#f97316" : "#ea580c";
      const accentLight = isDark
        ? "rgba(249,115,22,0.12)"
        : "rgba(234,88,12,0.08)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#94a3b8" : "#64748b";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(255,247,237,0.9)";
      const border = isDark ? "rgba(249,115,22,0.25)" : "rgba(234,88,12,0.15)";

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const lakeR = Math.min(W, H) * 0.22;

      const pulsePhase = (frame % 120) / 120;
      for (let ring = 3; ring >= 0; ring--) {
        const r = lakeR + ring * 12 + pulsePhase * 12;
        const alpha = (1 - ring / 4) * 0.15 * (1 - pulsePhase);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(cx, cy, lakeR, 0, Math.PI * 2);
      ctx.fillStyle = accentLight;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Content", cx, cy - 6);
      ctx.fillText("Lake", cx, cy + 6);

      const nodes: DocNode[] = [
        { label: "Web", x: 0, y: 0 },
        { label: "Mobile", x: 0, y: 0 },
        { label: "Kiosk", x: 0, y: 0 },
        { label: "API", x: 0, y: 0 },
        { label: "Email", x: 0, y: 0 },
      ];

      const orbitR = lakeR + 55;
      for (let i = 0; i < nodes.length; i++) {
        const baseAngle = (i * Math.PI * 2) / nodes.length - Math.PI / 2;
        const wobble = Math.sin(frame * 0.02 + i * 1.2) * 0.08;
        const angle = baseAngle + wobble;
        nodes[i].x = cx + Math.cos(angle) * orbitR;
        nodes[i].y = cy + Math.sin(angle) * orbitR;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const dx = n.x - cx;
        const dy = n.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const edgeX = cx + (dx / dist) * lakeR;
        const edgeY = cy + (dy / dist) * lakeR;

        ctx.beginPath();
        ctx.moveTo(edgeX, edgeY);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        const dataDotT = ((frame * 0.8 + i * 30) % 90) / 90;
        const ddx = edgeX + (n.x - edgeX) * dataDotT;
        const ddy = edgeY + (n.y - edgeY) * dataDotT;
        ctx.beginPath();
        ctx.arc(ddx, ddy, 2, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 1 - dataDotT * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;

        const nw = 42;
        const nh = 22;
        ctx.beginPath();
        ctx.roundRect(n.x - nw / 2, n.y - nh / 2, nw, nh, 5);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = text;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      }

      const groqW = W * 0.24;
      const groqH = 18;
      const groqX = cx - groqW / 2;
      const groqY = H - 24;
      const queryChars = "*[_type == 'post']{ title, slug }";
      const visibleChars = Math.floor((frame * 0.5) % (queryChars.length + 20));
      const visibleQuery = queryChars.slice(
        0,
        Math.min(visibleChars, queryChars.length)
      );

      ctx.beginPath();
      ctx.roundRect(groqX, groqY, groqW, groqH, 4);
      ctx.fillStyle = accentLight;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("GROQ›", groqX + 4, groqY + groqH / 2);

      ctx.fillStyle = textDim;
      ctx.fillText(visibleQuery, groqX + 30, groqY + groqH / 2);

      frameRef.current = frame + 1;
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
