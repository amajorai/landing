"use client";
import { useEffect, useRef } from "react";

type RouteKind = "SSG" | "SSR" | "ISR";
interface Route {
  path: string;
  kind: RouteKind;
}
const ROUTES: Route[] = [
  { path: "/blog", kind: "SSG" },
  { path: "/dashboard", kind: "SSR" },
  { path: "/product", kind: "ISR" },
];

export function NextjsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const cycleStartRef = useRef(0);
  const routeIdxRef = useRef(0);
  const isrWarmRef = useRef<boolean[]>([false, false, false]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const CYCLE_MS = 2500;

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
      const accent = isDark ? "#a1a1aa" : "#52525b";
      const ssr = isDark ? "#60a5fa" : "#2563eb";
      const ssg = isDark ? "#4ade80" : "#16a34a";
      const isr = isDark ? "#fb923c" : "#ea580c";
      const textColor = isDark ? "#f4f4f5" : "#18181b";

      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      let t = now - cycleStartRef.current;
      if (t > CYCLE_MS) {
        cycleStartRef.current = now;
        // mark current route warm if ISR
        const cur = ROUTES[routeIdxRef.current];
        if (cur.kind === "ISR") {
          isrWarmRef.current[routeIdxRef.current] = true;
        }
        routeIdxRef.current = (routeIdxRef.current + 1) % ROUTES.length;
        t = 0;
      }

      const idx = routeIdxRef.current;
      const route = ROUTES[idx];
      const colorFor = (k: RouteKind) =>
        k === "SSG" ? ssg : k === "SSR" ? ssr : isr;

      // Layout: browser left, routes center column, server right
      const browserW = 58;
      const browserH = 44;
      const browserX = 16;
      const browserY = H / 2 - browserH / 2;

      const serverW = 48;
      const serverH = 58;
      const serverX = W - serverW - 16;
      const serverY = H / 2 - serverH / 2;

      // Browser icon
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(browserX, browserY, browserW, browserH, 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(browserX, browserY + 10);
      ctx.lineTo(browserX + browserW, browserY + 10);
      ctx.stroke();
      // dots
      ctx.fillStyle = accent;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(browserX + 5 + i * 5, browserY + 5, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Server icon
      ctx.strokeStyle = accent;
      ctx.beginPath();
      ctx.roundRect(serverX, serverY, serverW, serverH, 3);
      ctx.stroke();
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(serverX + 6, serverY + 10 + i * 12);
        ctx.lineTo(serverX + serverW - 6, serverY + 10 + i * 12);
        ctx.stroke();
      }
      // Server pulse for SSR or cold ISR
      const serverBusy =
        route.kind === "SSR" ||
        (route.kind === "ISR" && !isrWarmRef.current[idx]);
      if (serverBusy && t > 600 && t < 1400) {
        const pulse = Math.sin((t - 600) / 120) * 0.5 + 0.5;
        ctx.fillStyle = colorFor(route.kind);
        ctx.globalAlpha = 0.2 + pulse * 0.3;
        ctx.fillRect(serverX, serverY, serverW, serverH);
        ctx.globalAlpha = 1;
      }

      // Routes stacked between
      const routeX = (browserX + browserW + serverX) / 2 - 45;
      const rowH = 22;
      const rowW = 90;
      const stackTop = H / 2 - (rowH * 3) / 2 - 2;

      for (let i = 0; i < ROUTES.length; i++) {
        const r = ROUTES[i];
        const y = stackTop + i * (rowH + 2);
        const active = i === idx;
        ctx.beginPath();
        ctx.roundRect(routeX, y, rowW, rowH, 4);
        ctx.fillStyle = colorFor(r.kind);
        ctx.globalAlpha = active ? 0.22 : 0.08;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colorFor(r.kind);
        ctx.lineWidth = active ? 1.6 : 0.8;
        ctx.globalAlpha = active ? 1 : 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(r.path, routeX + 8, y + rowH / 2);

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = colorFor(r.kind);
        ctx.textAlign = "right";
        ctx.fillText(r.kind, routeX + rowW - 8, y + rowH / 2);
      }

      // Packet animation
      const activeY = stackTop + idx * (rowH + 2) + rowH / 2;
      const pktSize = 7;
      let px = 0;
      let py = activeY;
      let show = true;

      // phases: 0..800ms browser->route, 800..1600 route->server, 1600..2400 server->browser
      const warmISR = route.kind === "ISR" && isrWarmRef.current[idx];
      if (route.kind === "SSG" || warmISR) {
        // cached: straight from browser -> route -> browser quickly
        if (t < 700) {
          const p = t / 700;
          px = browserX + browserW + (routeX - browserX - browserW) * p;
        } else if (t < 1400) {
          const p = (t - 700) / 700;
          px =
            routeX + rowW / 2 - (routeX + rowW / 2 - (browserX + browserW)) * p;
        } else show = false;
      } else {
        // SSR or cold ISR: browser->route->server->route->browser
        if (t < 600) {
          const p = t / 600;
          px = browserX + browserW + (routeX - browserX - browserW) * p;
        } else if (t < 1200) {
          const p = (t - 600) / 600;
          px = routeX + rowW + (serverX - routeX - rowW) * p;
          py = activeY + (H / 2 - activeY) * p;
        } else if (t < 1500) {
          // computing
          px = serverX + serverW / 2;
          py = H / 2;
        } else if (t < 2100) {
          const p = (t - 1500) / 600;
          px = serverX - (serverX - (routeX + rowW)) * p;
          py = H / 2 + (activeY - H / 2) * p;
        } else if (t < CYCLE_MS) {
          const p = (t - 2100) / 400;
          px = routeX - (routeX - (browserX + browserW)) * Math.min(1, p);
        } else show = false;
      }

      if (show) {
        ctx.fillStyle = colorFor(route.kind);
        ctx.beginPath();
        ctx.roundRect(
          px - pktSize / 2,
          py - pktSize / 2,
          pktSize,
          pktSize,
          1.5
        );
        ctx.fill();
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
            cycleStartRef.current = performance.now();
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
