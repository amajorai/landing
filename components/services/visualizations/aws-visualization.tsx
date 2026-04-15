"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 400;
const APPEAR_END = 120;
const CONNECT_END = 200;
const PULSE_END = 340;

interface Service {
  label: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
}

const SERVICES: Service[] = [
  { label: "EC2", icon: "⬡", x: 0.18, y: 0.25, delay: 0 },
  { label: "S3", icon: "◈", x: 0.82, y: 0.25, delay: 20 },
  { label: "Lambda", icon: "λ", x: 0.18, y: 0.72, delay: 40 },
  { label: "RDS", icon: "◉", x: 0.82, y: 0.72, delay: 60 },
  { label: "API GW", icon: "⇋", x: 0.5, y: 0.15, delay: 80 },
  { label: "CloudFront", icon: "◎", x: 0.5, y: 0.82, delay: 100 },
];

interface Connection {
  from: number;
  to: number;
  delay: number;
}

const CONNECTIONS: Connection[] = [
  { from: 4, to: 0, delay: 125 },
  { from: 4, to: 1, delay: 135 },
  { from: 0, to: 2, delay: 145 },
  { from: 2, to: 3, delay: 155 },
  { from: 1, to: 3, delay: 165 },
  { from: 5, to: 4, delay: 175 },
  { from: 0, to: 1, delay: 185 },
];

const PULSE_ROUTES = [
  [5, 4, 0, 2, 3],
  [5, 4, 1, 3],
  [4, 0, 1],
  [5, 4, 0, 2],
];

export function AwsVisualization() {
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
      const accent = "#FF9900";
      const accentDim = isDark
        ? "rgba(255,153,0,0.15)"
        : "rgba(255,153,0,0.10)";
      const boxBg = isDark ? "rgba(255,153,0,0.08)" : "rgba(255,153,0,0.05)";
      const boxStroke = isDark ? "rgba(255,153,0,0.4)" : "rgba(255,153,0,0.25)";
      const connColor = isDark
        ? "rgba(255,153,0,0.25)"
        : "rgba(255,153,0,0.18)";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const mutedText = isDark ? "#fbbf24" : "#b45309";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const padX = 24;
      const padY = 14;
      const areaW = W - padX * 2;
      const areaH = H - padY * 2;

      // Fade phase
      const fading = frame > PULSE_END;
      const fadeT = fading
        ? Math.min((frame - PULSE_END) / (TOTAL_FRAMES - PULSE_END), 1)
        : 0;

      // Draw connections
      for (const conn of CONNECTIONS) {
        const progress = Math.min(Math.max((frame - conn.delay) / 25, 0), 1);
        if (progress <= 0) continue;

        const from = SERVICES[conn.from];
        const to = SERVICES[conn.to];
        const fx = padX + from.x * areaW;
        const fy = padY + from.y * areaH;
        const tx = padX + to.x * areaW;
        const ty = padY + to.y * areaH;

        const ex = fx + (tx - fx) * progress;
        const ey = fy + (ty - fy) * progress;

        ctx.globalAlpha = (1 - fadeT) * 0.8;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = connColor;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Draw data pulses
      if (frame > CONNECT_END) {
        for (let r = 0; r < PULSE_ROUTES.length; r++) {
          const route = PULSE_ROUTES[r];
          const routeDelay = r * 30;
          const pulseFrame = frame - CONNECT_END - routeDelay;
          if (pulseFrame < 0) continue;

          const segmentFrames = 25;
          const totalRouteFrames = (route.length - 1) * segmentFrames;
          const t = (pulseFrame % totalRouteFrames) / segmentFrames;
          const segIdx = Math.floor(t);
          const segT = t - segIdx;

          if (segIdx >= route.length - 1) continue;

          const fromS = SERVICES[route[segIdx]];
          const toS = SERVICES[route[segIdx + 1]];
          const px = padX + (fromS.x + (toS.x - fromS.x) * segT) * areaW;
          const py = padY + (fromS.y + (toS.y - fromS.y) * segT) * areaH;

          ctx.globalAlpha = 1 - fadeT;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.fill();

          // Trail
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = accentDim;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Draw service boxes
      const boxW = 56;
      const boxH = 36;
      for (const svc of SERVICES) {
        const progress = Math.min(Math.max((frame - svc.delay) / 25, 0), 1);
        if (progress <= 0) continue;

        const eased = 1 - (1 - progress) ** 3;
        const sx = padX + svc.x * areaW;
        const sy = padY + svc.y * areaH;
        const scale = eased;

        ctx.globalAlpha = eased * (1 - fadeT);

        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 6);
        ctx.fillStyle = boxBg;
        ctx.fill();
        ctx.strokeStyle = boxStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Icon
        ctx.font = "bold 12px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(svc.icon, 0, -5);

        // Label
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.fillText(svc.label, 0, 10);

        ctx.restore();
        ctx.globalAlpha = 1;
      }

      // Header
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("AWS Infrastructure", padX, 3);

      // Status indicator
      if (frame > CONNECT_END) {
        const pulse = Math.sin(frame / 8) * 0.3 + 0.7;
        ctx.globalAlpha = pulse * (1 - fadeT);
        ctx.beginPath();
        ctx.arc(W - padX - 4, 8, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#4ade80";
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = "#4ade80";
        ctx.textAlign = "right";
        ctx.fillText("HEALTHY", W - padX - 12, 3);
      }

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
