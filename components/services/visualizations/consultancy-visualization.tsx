"use client";
import { useEffect, useRef } from "react";

const CYCLE_FRAMES = 200;

interface Branch {
  label: string;
  angle: number;
  children: string[];
}

const TREE: Branch[] = [
  { label: "Goal", angle: 0, children: ["Web App", "Mobile", "SaaS"] },
];

export function ConsultancyVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const activePathRef = useRef(0);

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

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? "#fb7185" : "#e11d48";
      const accentBg = isDark
        ? "rgba(251,113,133,0.10)"
        : "rgba(225,29,72,0.07)";
      const borderColor = isDark
        ? "rgba(251,113,133,0.3)"
        : "rgba(225,29,72,0.2)";
      const textColor = isDark ? "#fff1f2" : "#881337";
      const activeColor = isDark ? "#fb7185" : "#f43f5e";
      const dimColor = isDark
        ? "rgba(251,113,133,0.15)"
        : "rgba(225,29,72,0.10)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const activePath = activePathRef.current;

      const rootX = cx;
      const rootY = H * 0.22;
      const rootW = 50;
      const rootH = 22;

      ctx.beginPath();
      ctx.roundRect(rootX - rootW / 2, rootY - rootH / 2, rootW, rootH, 4);
      ctx.fillStyle = isDark
        ? "rgba(251,113,133,0.18)"
        : "rgba(225,29,72,0.10)";
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Goal", rootX, rootY);

      const children = TREE[0].children;
      const childY = H * 0.48;
      const childSpacing = 70;
      const childStartX = cx - ((children.length - 1) * childSpacing) / 2;
      const childW = 56;
      const childH = 22;

      const grandchildren = [
        ["React", "Next.js"],
        ["RN", "Expo"],
        ["Stripe", "Auth"],
      ];
      const gcY = H * 0.72;
      const gcW = 42;
      const gcH = 18;

      for (let i = 0; i < children.length; i++) {
        const childX = childStartX + i * childSpacing;
        const isActive = i === activePath;
        const glowPhase = isActive
          ? Math.sin((frame / 20) * Math.PI) * 0.5 + 0.5
          : 0;

        ctx.strokeStyle = isActive ? activeColor : borderColor;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.globalAlpha = isActive ? 0.6 + glowPhase * 0.4 : 0.3;
        ctx.beginPath();
        ctx.moveTo(rootX, rootY + rootH / 2);
        ctx.quadraticCurveTo(rootX, childY - 15, childX, childY - childH / 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.roundRect(
          childX - childW / 2,
          childY - childH / 2,
          childW,
          childH,
          4
        );
        ctx.fillStyle = isActive
          ? isDark
            ? "rgba(251,113,133,0.20)"
            : "rgba(225,29,72,0.12)"
          : accentBg;
        ctx.fill();
        ctx.strokeStyle = isActive ? activeColor : borderColor;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        ctx.font = `${isActive ? "bold " : ""}8px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = textColor;
        ctx.globalAlpha = isActive ? 1 : 0.5;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(children[i], childX, childY);
        ctx.globalAlpha = 1;

        const gcs = grandchildren[i];
        const gcSpacing = 48;
        const gcStartX = childX - ((gcs.length - 1) * gcSpacing) / 2;

        for (let j = 0; j < gcs.length; j++) {
          const gx = gcStartX + j * gcSpacing;
          const gcActive = isActive;

          ctx.strokeStyle = gcActive ? activeColor : borderColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = gcActive ? 0.4 + glowPhase * 0.3 : 0.15;
          ctx.beginPath();
          ctx.moveTo(childX, childY + childH / 2);
          ctx.quadraticCurveTo(childX, gcY - 10, gx, gcY - gcH / 2);
          ctx.stroke();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.roundRect(gx - gcW / 2, gcY - gcH / 2, gcW, gcH, 3);
          ctx.fillStyle = gcActive ? dimColor : accentBg;
          ctx.globalAlpha = gcActive ? 0.8 : 0.3;
          ctx.fill();
          ctx.strokeStyle = gcActive ? activeColor : borderColor;
          ctx.lineWidth = gcActive ? 1 : 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;

          ctx.font = "7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = textColor;
          ctx.globalAlpha = gcActive ? 0.8 : 0.3;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(gcs[j], gx, gcY);
          ctx.globalAlpha = 1;
        }
      }

      frameRef.current = frame + 1;
      if (frame % CYCLE_FRAMES === 0) {
        activePathRef.current = (activePath + 1) % children.length;
      }

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
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
