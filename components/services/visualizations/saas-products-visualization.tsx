"use client";
import { useEffect, useRef } from "react";

const TENANTS = ["Tenant A", "Tenant B", "Tenant C", "Tenant D"];
const CYCLE_FRAMES = 180;

export function SaasProductsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const activeRef = useRef(0);

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
      const accent = isDark ? "#818cf8" : "#4f46e5";
      const accentBg = isDark
        ? "rgba(129,140,248,0.10)"
        : "rgba(79,70,229,0.07)";
      const borderColor = isDark
        ? "rgba(129,140,248,0.3)"
        : "rgba(79,70,229,0.2)";
      const textColor = isDark ? "#e0e7ff" : "#312e81";
      const activeColor = isDark ? "#a5b4fc" : "#6366f1";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const platW = Math.min(W * 0.75, 280);
      const platH = 24;
      const platX = cx - platW / 2;
      const platY = H * 0.22;

      ctx.beginPath();
      ctx.roundRect(platX, platY, platW, platH, 5);
      ctx.fillStyle = isDark
        ? "rgba(129,140,248,0.18)"
        : "rgba(79,70,229,0.12)";
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SaaS Platform", cx, platY + platH / 2);

      const podW = 52;
      const podH = 44;
      const totalPodsW = TENANTS.length * podW + (TENANTS.length - 1) * 8;
      const podsStartX = cx - totalPodsW / 2;
      const podY = platY + platH + 30;

      for (let i = 0; i < TENANTS.length; i++) {
        const px = podsStartX + i * (podW + 8);
        const isActive = i === activeRef.current;
        const flashPhase = isActive
          ? Math.sin((frame / 30) * Math.PI) * 0.5 + 0.5
          : 0;

        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px + podW / 2, platY + platH);
        ctx.lineTo(px + podW / 2, podY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.roundRect(px, podY, podW, podH, 4);
        ctx.fillStyle = isActive
          ? isDark
            ? "rgba(165,180,252,0.18)"
            : "rgba(99,102,241,0.10)"
          : accentBg;
        ctx.fill();
        ctx.strokeStyle = isActive ? activeColor : borderColor;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        if (isActive && flashPhase > 0.3) {
          ctx.beginPath();
          ctx.roundRect(px + 4, podY + 16, podW - 8, 4, 1);
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = flashPhase * 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.roundRect(px + 4, podY + 24, (podW - 8) * flashPhase, 4, 1);
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(TENANTS[i], px + podW / 2, podY + 4);

        ctx.beginPath();
        ctx.arc(px + podW / 2, podY + podH + 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.15;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = "6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isDark
          ? "rgba(129,140,248,0.5)"
          : "rgba(79,70,229,0.4)";
        ctx.fillText("isolated", px + podW / 2, podY + podH + 18);
      }

      frameRef.current = frame + 1;
      if (frame % CYCLE_FRAMES === 0) {
        activeRef.current = (activeRef.current + 1) % TENANTS.length;
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
