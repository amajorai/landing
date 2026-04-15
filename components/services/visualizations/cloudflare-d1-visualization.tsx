"use client";
import { useEffect, useRef } from "react";

// Request cycle frames. Slow side takes full SLOW duration, fast side is short.
const CYCLE_FRAMES = 180;
const SLOW_DUR = 140; // long round trip
const FAST_DUR = 30; // very short round trip

export function CloudflareD1Visualization() {
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
      const d1Color = isDark ? "#fbbf24" : "#d97706";
      const workerColor = isDark ? "#fb923c" : "#ea580c";
      const fastColor = "#4ade80";
      const slowColor = "#f87171";
      const popColor = isDark
        ? "rgba(251,191,36,0.10)"
        : "rgba(217,119,6,0.08)";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const mutedText = isDark ? "#fcd34d" : "#92400e";

      ctx.clearRect(0, 0, W, H);

      const halfW = W / 2;
      const divX = halfW;

      // Divider line
      ctx.beginPath();
      ctx.moveTo(divX, 10);
      ctx.lineTo(divX, H - 10);
      ctx.strokeStyle = isDark
        ? "rgba(251,191,36,0.15)"
        : "rgba(217,119,6,0.12)";
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      const frame = frameRef.current;

      // ===== LEFT SIDE: Traditional Remote =====
      const L_padX = 14;
      const L_workerX = L_padX + 30;
      const L_workerY = H * 0.25;
      const L_dbX = halfW - 14 - 40;
      const L_dbY = H * 0.72;
      const boxW = 70;
      const boxH = 28;

      // Worker box
      const drawBox = (
        cx: number,
        cy: number,
        label: string,
        color: string,
        fill: string
      ) => {
        ctx.beginPath();
        ctx.roundRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH, 5);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, cx, cy);
      };

      drawBox(
        L_workerX,
        L_workerY,
        "CF Worker",
        workerColor,
        isDark ? "rgba(251,146,60,0.12)" : "rgba(234,88,12,0.08)"
      );
      drawBox(
        L_dbX,
        L_dbY,
        "Remote DB",
        slowColor,
        isDark ? "rgba(248,113,113,0.10)" : "rgba(239,68,68,0.08)"
      );

      // Long arrow from worker to db
      ctx.beginPath();
      ctx.moveTo(L_workerX + boxW / 2 - 4, L_workerY + 6);
      ctx.lineTo(L_dbX - boxW / 2 + 4, L_dbY - 6);
      ctx.strokeStyle = slowColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // latency label
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = slowColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "~100ms",
        (L_workerX + L_dbX) / 2 + 6,
        (L_workerY + L_dbY) / 2 - 8
      );

      // Title
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "center";
      ctx.fillText("Traditional Remote", halfW / 2, 14);

      // slow animation progress 0..1
      const slowT = Math.min(frame / SLOW_DUR, 1);
      // round-trip: out then back
      let slowP = 0;
      if (slowT < 0.5) slowP = slowT * 2;
      else slowP = 1 - (slowT - 0.5) * 2;
      const slowX =
        L_workerX +
        (L_dbX - L_workerX) * (slowT < 0.5 ? slowT * 2 : 1 - (slowT - 0.5) * 2);
      const slowY =
        L_workerY +
        (L_dbY - L_workerY) * (slowT < 0.5 ? slowT * 2 : 1 - (slowT - 0.5) * 2);

      if (slowT < 1) {
        ctx.beginPath();
        ctx.arc(slowX, slowY, 4, 0, Math.PI * 2);
        ctx.fillStyle = slowColor;
        ctx.fill();
        // glow
        const grd = ctx.createRadialGradient(slowX, slowY, 1, slowX, slowY, 8);
        grd.addColorStop(0, "rgba(248,113,113,0.5)");
        grd.addColorStop(1, "rgba(248,113,113,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(slowX, slowY, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // ===== RIGHT SIDE: Cloudflare D1 =====
      const R_centerX = halfW + halfW / 2;
      const R_workerY = H * 0.32;
      const R_dbY = H * 0.62;

      // Same PoP bubble
      const popX = R_centerX;
      const popY = (R_workerY + R_dbY) / 2;
      const popW = boxW + 32;
      const popH = R_dbY - R_workerY + boxH + 24;
      ctx.beginPath();
      ctx.roundRect(popX - popW / 2, popY - popH / 2, popW, popH, 10);
      ctx.fillStyle = popColor;
      ctx.fill();
      ctx.strokeStyle = d1Color;
      ctx.setLineDash([4, 3]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = d1Color;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Same PoP", popX, popY - popH / 2 + 3);

      drawBox(
        R_centerX,
        R_workerY,
        "CF Worker",
        workerColor,
        isDark ? "rgba(251,146,60,0.12)" : "rgba(234,88,12,0.08)"
      );
      drawBox(
        R_centerX,
        R_dbY,
        "D1",
        d1Color,
        isDark ? "rgba(251,191,36,0.12)" : "rgba(217,119,6,0.08)"
      );

      // Short arrow
      ctx.beginPath();
      ctx.moveTo(R_centerX, R_workerY + boxH / 2);
      ctx.lineTo(R_centerX, R_dbY - boxH / 2);
      ctx.strokeStyle = fastColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = fastColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("~0ms", R_centerX + 10, (R_workerY + R_dbY) / 2);

      // Title right
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = d1Color;
      ctx.textAlign = "center";
      ctx.fillText("Cloudflare D1", halfW + halfW / 2, 14);

      // fast animation — bounces quickly, idle most of cycle
      const fastCycle = frame % Math.floor(CYCLE_FRAMES / 3);
      const fastT = fastCycle / FAST_DUR;
      if (fastT < 1) {
        const fp = fastT < 0.5 ? fastT * 2 : 1 - (fastT - 0.5) * 2;
        const fy = R_workerY + (R_dbY - R_workerY) * fp;
        ctx.beginPath();
        ctx.arc(R_centerX, fy, 4, 0, Math.PI * 2);
        ctx.fillStyle = fastColor;
        ctx.fill();
        const grd = ctx.createRadialGradient(
          R_centerX,
          fy,
          1,
          R_centerX,
          fy,
          8
        );
        grd.addColorStop(0, "rgba(74,222,128,0.6)");
        grd.addColorStop(1, "rgba(74,222,128,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(R_centerX, fy, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = (frame + 1) % CYCLE_FRAMES;

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
