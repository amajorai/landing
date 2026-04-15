"use client";
import { useEffect, useRef } from "react";

// REST API: HTTP verbs + request/response cycle with status codes
// Each row lights up sequentially; request travels to server, server pulses, response returns.

type Route = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  status: number;
  ok: boolean;
};

const ROUTES: Route[] = [
  { method: "GET", path: "/users", status: 200, ok: true },
  { method: "POST", path: "/users", status: 201, ok: true },
  { method: "PUT", path: "/users/1", status: 200, ok: true },
  { method: "DELETE", path: "/users/1", status: 204, ok: true },
  { method: "GET", path: "/users/999", status: 404, ok: false },
];

const CYCLE_FRAMES = 50; // per route
const TOTAL_FRAMES = ROUTES.length * CYCLE_FRAMES + 60;

export function RestApiVisualization() {
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
      const methodColors: Record<string, string> = {
        GET: "#4ade80",
        POST: "#60a5fa",
        PUT: "#fb923c",
        DELETE: "#f87171",
      };
      const successColor = "#4ade80";
      const errorColor = "#f87171";
      const serverColor = isDark ? "#3b82f6" : "#2563eb";
      const textColor = isDark ? "#eff6ff" : "#1e3a8a";
      const dim = isDark ? "rgba(147,197,253,0.4)" : "rgba(30,58,138,0.4)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const activeIdx = Math.floor(frame / CYCLE_FRAMES) % ROUTES.length;
      const cyclePhase = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      // ---- Layout: routes on left, server on right ----
      const listX = W * 0.03;
      const listW = W * 0.52;
      const rowH = Math.min(H * 0.12, 22);
      const listY0 = H * 0.08;

      // Server position
      const serverCx = W * 0.82;
      const serverCy = H * 0.45;
      const serverW = Math.min(W * 0.15, 70);
      const serverH = Math.min(H * 0.3, 70);

      // Draw routes
      ctx.font = `${Math.round(rowH * 0.55)}px var(--font-geist-mono, monospace)`;
      ctx.textBaseline = "middle";
      for (let i = 0; i < ROUTES.length; i++) {
        const r = ROUTES[i];
        const y = listY0 + i * (rowH + 3);
        const isActive = i === activeIdx;

        ctx.globalAlpha = isActive ? 1 : 0.4;

        // method badge
        const badgeW = W * 0.13;
        ctx.fillStyle = methodColors[r.method];
        ctx.fillRect(listX, y, badgeW, rowH);
        ctx.fillStyle = "#0b0f19";
        ctx.textAlign = "center";
        ctx.fillText(r.method, listX + badgeW / 2, y + rowH / 2);

        // path
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.fillText(r.path, listX + badgeW + 6, y + rowH / 2);

        // status (shown once response has returned)
        if (isActive && cyclePhase > 0.7) {
          const color = r.ok ? successColor : errorColor;
          ctx.fillStyle = color;
          ctx.textAlign = "right";
          ctx.fillText(
            `${r.status} ${r.ok ? "✓" : "✗"}`,
            listX + listW - 4,
            y + rowH / 2
          );
        } else if (!isActive) {
          ctx.fillStyle = dim;
          ctx.textAlign = "right";
          ctx.fillText(`${r.status}`, listX + listW - 4, y + rowH / 2);
        }
        ctx.globalAlpha = 1;
      }

      // ---- Draw server ----
      const pulse =
        cyclePhase > 0.35 && cyclePhase < 0.6
          ? Math.sin(((cyclePhase - 0.35) / 0.25) * Math.PI) * 0.15
          : 0;
      const sw = serverW * (1 + pulse);
      const sh = serverH * (1 + pulse);
      ctx.fillStyle = isDark ? "rgba(59,130,246,0.18)" : "rgba(37,99,235,0.12)";
      ctx.strokeStyle = serverColor;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.rect(serverCx - sw / 2, serverCy - sh / 2, sw, sh);
      ctx.fill();
      ctx.stroke();
      // Server "rack lines"
      ctx.strokeStyle = serverColor;
      ctx.lineWidth = 1;
      for (let k = 0; k < 3; k++) {
        const ly = serverCy - sh / 2 + 10 + k * 10;
        ctx.beginPath();
        ctx.moveTo(serverCx - sw / 2 + 6, ly);
        ctx.lineTo(serverCx + sw / 2 - 6, ly);
        ctx.stroke();
        ctx.fillStyle = successColor;
        ctx.beginPath();
        ctx.arc(serverCx + sw / 2 - 10, ly, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = textColor;
      ctx.font = `${Math.round(H * 0.05)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Server", serverCx, serverCy + sh / 2 + 2);

      // ---- Request/response arcs ----
      const activeRoute = ROUTES[activeIdx];
      const activeRowY = listY0 + activeIdx * (rowH + 3) + rowH / 2;
      const methodColor = methodColors[activeRoute.method];
      const startX = listX + listW;
      const endX = serverCx - sw / 2;

      // Request phase: 0..0.4
      if (cyclePhase < 0.45) {
        const t = Math.min(cyclePhase / 0.4, 1);
        const tipX = startX + (endX - startX) * t;
        const tipY = activeRowY + (serverCy - activeRowY) * t;
        ctx.strokeStyle = methodColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, activeRowY);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
        // arrow head
        ctx.fillStyle = methodColor;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Response phase: 0.55..1
      if (cyclePhase > 0.55) {
        const t = Math.min((cyclePhase - 0.55) / 0.4, 1);
        const color = activeRoute.ok ? successColor : errorColor;
        const tipX = endX - (endX - startX) * t;
        const tipY = serverCy - (serverCy - activeRowY) * t;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(endX, serverCy);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- Bottom badges ----
      ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const badgeY = H - 12;
      ctx.fillStyle = isDark ? "rgba(251,191,36,0.18)" : "rgba(251,191,36,0.2)";
      ctx.fillRect(listX, badgeY - 7, 80, 14);
      ctx.fillStyle = "#fbbf24";
      ctx.fillText("OpenAPI", listX + 6, badgeY);

      ctx.fillStyle = isDark ? "rgba(96,165,250,0.18)" : "rgba(37,99,235,0.15)";
      ctx.fillRect(listX + 90, badgeY - 7, 100, 14);
      ctx.fillStyle = "#60a5fa";
      ctx.fillText("SDK gen", listX + 96, badgeY);

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
