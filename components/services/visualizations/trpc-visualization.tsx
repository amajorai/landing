"use client";
import { useEffect, useRef } from "react";

// Cycle: tRPC (6s) -> REST (6s)
const TRPC_DURATION = 6000;
const REST_DURATION = 6000;
const CYCLE = TRPC_DURATION + REST_DURATION;

export function TrpcVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) % CYCLE;

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
      const serverColor = isDark ? "#3b82f6" : "#2563eb";
      const clientColor = isDark ? "#60a5fa" : "#3b82f6";
      const typeColor = "#a78bfa";
      const bridgeColor = isDark
        ? "rgba(96,165,250,0.3)"
        : "rgba(37,99,235,0.25)";
      const textColor = isDark ? "#eff6ff" : "#1e3a8a";

      ctx.clearRect(0, 0, W, H);

      const isTrpc = elapsed < TRPC_DURATION;
      const localT = isTrpc
        ? elapsed / TRPC_DURATION
        : (elapsed - TRPC_DURATION) / REST_DURATION;

      // Server and Client boxes
      const boxW = W * 0.34;
      const boxH = H * 0.55;
      const serverX = 10;
      const clientX = W - boxW - 10;
      const boxY = (H - boxH) / 2;

      // Server box
      ctx.beginPath();
      ctx.roundRect(serverX, boxY, boxW, boxH, 6);
      ctx.fillStyle = isDark ? "rgba(59,130,246,0.12)" : "rgba(37,99,235,0.08)";
      ctx.fill();
      ctx.strokeStyle = serverColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Client box
      ctx.beginPath();
      ctx.roundRect(clientX, boxY, boxW, boxH, 6);
      ctx.fillStyle = isDark
        ? "rgba(96,165,250,0.12)"
        : "rgba(59,130,246,0.08)";
      ctx.fill();
      ctx.strokeStyle = clientColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Headers
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = serverColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Server", serverX + 6, boxY + 4);
      ctx.fillStyle = clientColor;
      ctx.fillText("Client", clientX + 6, boxY + 4);

      // Server code
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.fillText("userRouter", serverX + 6, boxY + 20);
      ctx.fillText("  .query(...)", serverX + 6, boxY + 32);
      ctx.fillStyle = typeColor;
      ctx.fillText("-> User[]", serverX + 6, boxY + 44);

      // Client code
      ctx.fillStyle = textColor;
      ctx.fillText("const users =", clientX + 6, boxY + 20);
      ctx.fillText("  trpc.user", clientX + 6, boxY + 32);
      if (isTrpc && localT > 0.5) {
        const fadeT = Math.min(1, (localT - 0.5) * 4);
        ctx.globalAlpha = fadeT;
        ctx.fillStyle = typeColor;
        ctx.fillText("// User[]", clientX + 6, boxY + 44);
        ctx.globalAlpha = 1;
      }

      // Bridge / middle section
      const bridgeY = H / 2;
      const bridgeStart = serverX + boxW;
      const bridgeEnd = clientX;

      if (isTrpc) {
        // Direct type bridge
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bridgeStart, bridgeY);
        ctx.lineTo(bridgeEnd, bridgeY);
        ctx.stroke();

        // Flying T icon
        const t = localT;
        const tx = bridgeStart + (bridgeEnd - bridgeStart) * t;
        const ty = bridgeY;

        // T-shape
        ctx.fillStyle = typeColor;
        ctx.beginPath();
        ctx.roundRect(tx - 9, ty - 8, 18, 4, 1);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(tx - 2, ty - 8, 4, 16, 1);
        ctx.fill();

        // Glow
        const grd = ctx.createRadialGradient(tx, ty, 1, tx, ty, 14);
        grd.addColorStop(0, "rgba(167,139,250,0.5)");
        grd.addColorStop(1, "rgba(167,139,250,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(tx, ty, 14, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = typeColor;
        ctx.textAlign = "center";
        ctx.fillText("type-safe", (bridgeStart + bridgeEnd) / 2, boxY - 6);
      } else {
        // REST schema middleman + broken connection
        const midX = (bridgeStart + bridgeEnd) / 2;

        // Lines to middleman
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(bridgeStart, bridgeY);
        ctx.lineTo(midX - 10, bridgeY);
        ctx.moveTo(midX + 10, bridgeY);
        ctx.lineTo(bridgeEnd, bridgeY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Schema doc icon
        ctx.beginPath();
        ctx.roundRect(midX - 12, bridgeY - 12, 24, 24, 3);
        ctx.fillStyle = isDark
          ? "rgba(148,163,184,0.2)"
          : "rgba(100,116,139,0.15)";
        ctx.fill();
        ctx.strokeStyle = isDark ? "#94a3b8" : "#64748b";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isDark ? "#cbd5e1" : "#334155";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("doc", midX, bridgeY);

        // Broken connection mark when t > 0.5
        if (localT > 0.5) {
          const alpha = Math.min(1, (localT - 0.5) * 3);
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = "#f87171";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(midX - 18, bridgeY + 14);
          ctx.lineTo(midX + 18, bridgeY + 14);
          ctx.stroke();

          // X
          ctx.beginPath();
          ctx.moveTo(midX - 5, bridgeY + 10);
          ctx.lineTo(midX + 5, bridgeY + 18);
          ctx.moveTo(midX + 5, bridgeY + 10);
          ctx.lineTo(midX - 5, bridgeY + 18);
          ctx.stroke();

          ctx.font = "bold 9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = "#f87171";
          ctx.textAlign = "center";
          ctx.fillText("desync", midX, boxY + boxH + 10);
          ctx.globalAlpha = 1;
        }

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
        ctx.textAlign = "center";
        ctx.fillText("REST (schema)", midX, boxY - 6);
      }

      // Mode label (bottom)
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(
        isTrpc ? "tRPC: direct type flow" : "REST: schema middleman",
        W / 2,
        H - 8
      );

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startTimeRef.current = 0;
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
