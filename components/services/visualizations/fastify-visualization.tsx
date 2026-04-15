"use client";
import { useEffect, useRef } from "react";

// Stages of the animation cycle (in ms)
const STAGE_DRAW_APP = 500;
const STAGE_DRAW_AUTH = 1000;
const STAGE_DRAW_DB = 1500;
const STAGE_DRAW_USER = 2000;
const STAGE_DRAW_ADMIN = 2500;
const STAGE_REQUEST = 3500;
const STAGE_ACCESS_AUTH = 4500;
const STAGE_DENY_DB = 5500;
const CYCLE = 7000;

export function FastifyVisualization() {
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
      const outerColor = isDark ? "#facc15" : "#ca8a04";
      const pluginColor = isDark
        ? "rgba(250,204,21,0.15)"
        : "rgba(202,138,4,0.10)";
      const borderColor = isDark ? "#facc15" : "#ca8a04";
      const textColor = isDark ? "#fefce8" : "#713f12";
      const errorColor = "#f87171";

      ctx.clearRect(0, 0, W, H);

      // Box progress helper (0..1)
      const prog = (from: number, to: number) =>
        Math.max(0, Math.min(1, (elapsed - from) / (to - from)));

      const drawBox = (
        x: number,
        y: number,
        w: number,
        h: number,
        label: string,
        drawProgress: number,
        labelSize = 9
      ) => {
        if (drawProgress <= 0) return;
        ctx.fillStyle = pluginColor;
        ctx.globalAlpha = drawProgress;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 6);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Animated stroke
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1.5;
        const perimeter = 2 * (w + h);
        ctx.setLineDash([perimeter]);
        ctx.lineDashOffset = perimeter * (1 - drawProgress);
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 6);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;

        if (drawProgress > 0.7) {
          ctx.globalAlpha = (drawProgress - 0.7) / 0.3;
          ctx.font = `bold ${labelSize}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = textColor;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(label, x + 8, y + 6);
          ctx.globalAlpha = 1;
        }
      };

      // Outer Fastify App
      const outerPad = 10;
      const outerX = outerPad;
      const outerY = outerPad;
      const outerW = W - outerPad * 2;
      const outerH = H - outerPad * 2;
      drawBox(
        outerX,
        outerY,
        outerW,
        outerH,
        "Fastify App",
        prog(0, STAGE_DRAW_APP),
        10
      );

      // Two inner plugin boxes side by side
      const innerPad = 12;
      const innerTop = outerY + 22;
      const innerH = outerH - 30;
      const innerW = (outerW - innerPad * 3) / 2;

      const authX = outerX + innerPad;
      const dbX = authX + innerW + innerPad;

      drawBox(
        authX,
        innerTop,
        innerW,
        innerH,
        "Auth Plugin",
        prog(STAGE_DRAW_APP, STAGE_DRAW_AUTH)
      );
      drawBox(
        dbX,
        innerTop,
        innerW,
        innerH,
        "DB Plugin",
        prog(STAGE_DRAW_AUTH, STAGE_DRAW_DB)
      );

      // User routes inside Auth plugin
      const routePad = 10;
      const routeY = innerTop + 22;
      const routeH = innerH - 32;
      const routeW = innerW - routePad * 2;

      drawBox(
        authX + routePad,
        routeY,
        routeW,
        routeH,
        "User Routes",
        prog(STAGE_DRAW_DB, STAGE_DRAW_USER)
      );
      drawBox(
        dbX + routePad,
        routeY,
        routeW,
        routeH,
        "Admin Routes",
        prog(STAGE_DRAW_USER, STAGE_DRAW_ADMIN)
      );

      // Request packet traveling into User Routes
      if (elapsed > STAGE_DRAW_ADMIN) {
        const userCx = authX + routePad + routeW / 2;
        const userCy = routeY + routeH / 2;

        const reqT = Math.max(
          0,
          Math.min(
            1,
            (elapsed - STAGE_DRAW_ADMIN) / (STAGE_REQUEST - STAGE_DRAW_ADMIN)
          )
        );
        const reqStartX = -20;
        const reqStartY = innerTop + 10;
        const rx = reqStartX + (userCx - reqStartX) * reqT;
        const ry = reqStartY + (userCy - reqStartY) * reqT;

        ctx.beginPath();
        ctx.roundRect(rx - 9, ry - 6, 18, 12, 3);
        ctx.fillStyle = outerColor;
        ctx.fill();
        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = "#422006";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("REQ", rx, ry);

        // Access to Auth plugin context (green arrow)
        if (elapsed > STAGE_REQUEST) {
          const accT = Math.max(
            0,
            Math.min(
              1,
              (elapsed - STAGE_REQUEST) / (STAGE_ACCESS_AUTH - STAGE_REQUEST)
            )
          );
          const fromX = userCx;
          const fromY = routeY + 4;
          const toX = authX + innerW / 2;
          const toY = innerTop + 14;
          const lineX = fromX + (toX - fromX) * accT;
          const lineY = fromY + (toY - fromY) * accT;
          ctx.strokeStyle = "#4ade80";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(lineX, lineY);
          ctx.stroke();
          ctx.setLineDash([]);

          if (accT >= 1) {
            ctx.font = "bold 8px var(--font-geist-mono, monospace)";
            ctx.fillStyle = "#4ade80";
            ctx.textAlign = "center";
            ctx.fillText("scope ok", (fromX + toX) / 2, (fromY + toY) / 2 - 4);
          }
        }

        // Denial arrow to DB Plugin
        if (elapsed > STAGE_ACCESS_AUTH) {
          const denT = Math.max(
            0,
            Math.min(
              1,
              (elapsed - STAGE_ACCESS_AUTH) /
                (STAGE_DENY_DB - STAGE_ACCESS_AUTH)
            )
          );
          const fromX = userCx;
          const fromY = userCy;
          const toX = dbX + innerW / 2;
          const toY = routeY + routeH / 2;
          ctx.strokeStyle = errorColor;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(
            fromX + (toX - fromX) * denT,
            fromY + (toY - fromY) * denT
          );
          ctx.stroke();
          ctx.setLineDash([]);

          if (denT >= 1) {
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            ctx.strokeStyle = errorColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(midX - 5, midY - 5);
            ctx.lineTo(midX + 5, midY + 5);
            ctx.moveTo(midX + 5, midY - 5);
            ctx.lineTo(midX - 5, midY + 5);
            ctx.stroke();
          }
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
