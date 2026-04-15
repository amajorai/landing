"use client";
import { useEffect, useRef } from "react";

const CYCLE_MS = 7000;

interface Step {
  from: "browser" | "server" | "s3";
  to: "browser" | "server" | "s3";
  label: string;
  start: number;
  end: number;
  thick?: boolean;
  highlight?: boolean;
}

const STEPS: Step[] = [
  {
    from: "browser",
    to: "server",
    label: "Request upload URL",
    start: 200,
    end: 900,
  },
  {
    from: "server",
    to: "s3",
    label: "Generate presigned",
    start: 1000,
    end: 1700,
  },
  { from: "s3", to: "server", label: "presigned URL", start: 1800, end: 2500 },
  {
    from: "server",
    to: "browser",
    label: "presigned URL",
    start: 2600,
    end: 3300,
  },
  {
    from: "browser",
    to: "s3",
    label: "Direct upload - no server bandwidth cost",
    start: 3500,
    end: 5200,
    thick: true,
    highlight: true,
  },
];

export function S3Visualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % CYCLE_MS;

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
      const s3Color = isDark ? "#fbbf24" : "#d97706";
      const serverColor = isDark ? "#fb923c" : "#ea580c";
      const browserColor = isDark ? "#60a5fa" : "#2563eb";
      const directUploadColor = "#4ade80";
      const cdnColor = "#a78bfa";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const bg = isDark ? "#0f0f0f" : "#fffbeb";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cy = H / 2;
      const browserX = W * 0.12;
      const serverX = W * 0.5;
      const s3X = W * 0.88;
      const boxR = 22;

      const positions = {
        browser: { x: browserX, y: cy },
        server: { x: serverX, y: cy },
        s3: { x: s3X, y: cy },
      } as const;

      // Draw browser (circle with user)
      ctx.beginPath();
      ctx.arc(browserX, cy, boxR, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(96,165,250,0.15)" : "rgba(37,99,235,0.1)";
      ctx.fill();
      ctx.strokeStyle = browserColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // User icon
      ctx.beginPath();
      ctx.arc(browserX, cy - 4, 4, 0, Math.PI * 2);
      ctx.strokeStyle = browserColor;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(browserX, cy + 10, 8, Math.PI, 0);
      ctx.stroke();

      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Browser", browserX, cy + boxR + 4);

      // Draw server (square)
      ctx.fillStyle = isDark ? "rgba(251,146,60,0.15)" : "rgba(234,88,12,0.1)";
      ctx.fillRect(serverX - boxR, cy - boxR, boxR * 2, boxR * 2);
      ctx.strokeStyle = serverColor;
      ctx.strokeRect(serverX - boxR, cy - boxR, boxR * 2, boxR * 2);
      // server lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(serverX - boxR + 6, cy - 10 + i * 10);
        ctx.lineTo(serverX + boxR - 6, cy - 10 + i * 10);
        ctx.strokeStyle = serverColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.fillText("Your Server", serverX, cy + boxR + 4);

      // Draw S3 cloud
      const drawCloud = (cx: number, cy2: number, scale: number) => {
        ctx.beginPath();
        ctx.arc(cx - 10 * scale, cy2, 10 * scale, 0, Math.PI * 2);
        ctx.arc(cx, cy2 - 8 * scale, 12 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 12 * scale, cy2 - 2 * scale, 11 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 4 * scale, cy2 + 6 * scale, 10 * scale, 0, Math.PI * 2);
        ctx.closePath();
      };
      drawCloud(s3X, cy, 1);
      ctx.fillStyle = isDark ? "rgba(251,191,36,0.15)" : "rgba(217,119,6,0.1)";
      ctx.fill();
      ctx.strokeStyle = s3Color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = s3Color;
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.textBaseline = "middle";
      ctx.fillText("S3/R2", s3X + 2, cy);
      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textBaseline = "top";
      ctx.fillText("Object Store", s3X, cy + boxR + 4);

      // CDN edge nodes (top of s3)
      const edgeY = 18;
      const edgeXs = [s3X - 22, s3X, s3X + 22];
      for (const ex of edgeXs) {
        ctx.beginPath();
        ctx.arc(ex, edgeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = cdnColor;
        ctx.fill();
        // line from s3 to edge
        ctx.beginPath();
        ctx.moveTo(s3X, cy - boxR);
        ctx.lineTo(ex, edgeY + 3);
        ctx.strokeStyle = cdnColor;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = cdnColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Zero egress (R2)", s3X, edgeY - 9);

      // Draw arrows for active steps
      const drawArrow = (
        fx: number,
        fy: number,
        tx: number,
        ty: number,
        color: string,
        progress: number,
        thick: boolean,
        label: string,
        yOffset: number
      ) => {
        // Offset to not overlap boxes
        const dx = tx - fx;
        const dy = ty - fy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const pad = boxR + 4;
        const sx = fx + ux * pad;
        const sy = fy + uy * pad + yOffset;
        const ex = tx - ux * pad;
        const ey = ty - uy * pad + yOffset;

        const curX = sx + (ex - sx) * progress;
        const curY = sy + (ey - sy) * progress;

        ctx.strokeStyle = color;
        ctx.lineWidth = thick ? 3 : 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        if (progress >= 0.99) {
          // arrowhead
          const ah = thick ? 8 : 5;
          const angle = Math.atan2(ey - sy, ex - sx);
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(
            ex - ah * Math.cos(angle - Math.PI / 6),
            ey - ah * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            ex - ah * Math.cos(angle + Math.PI / 6),
            ey - ah * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();

          // label
          ctx.font = `${thick ? "bold " : ""}9px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = color;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(label, (sx + ex) / 2, Math.min(sy, ey) - 3);
        }
      };

      // Only show one arrow at a time
      for (let i = 0; i < STEPS.length; i++) {
        const step = STEPS[i];
        if (elapsed >= step.start && elapsed <= step.end + 400) {
          const dur = step.end - step.start;
          const progress = Math.min(1, (elapsed - step.start) / dur);
          const from = positions[step.from];
          const to = positions[step.to];
          const color = step.highlight
            ? directUploadColor
            : step.from === "browser"
              ? browserColor
              : step.from === "server"
                ? serverColor
                : s3Color;
          // Offset for reverse direction to avoid overlap
          const yOff =
            step.from === "s3" ||
            (step.from === "server" && step.to === "browser")
              ? 8
              : -8;
          drawArrow(
            from.x,
            from.y,
            to.x,
            to.y,
            color,
            progress,
            step.thick,
            step.label,
            yOff
          );
        }
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
