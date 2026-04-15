"use client";
import { useEffect, useRef } from "react";

const TOOLS = [
  { name: "query_users", target: 0 }, // Database
  { name: "create_ticket", target: 1 }, // CRM
  { name: "open_issue", target: 2 }, // GitHub
];

const DATA_SOURCES = ["Database", "CRM API", "GitHub"];

const CYCLE_MS = 3500;

export function McpVisualization() {
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
      const totalElapsed = ts - startRef.current;
      const cycle = Math.floor(totalElapsed / CYCLE_MS);
      const elapsed = totalElapsed % CYCLE_MS;
      const tool = TOOLS[cycle % TOOLS.length];

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
      const aiColor = isDark ? "#fbbf24" : "#d97706";
      const mcpColor = isDark ? "#fb923c" : "#ea580c";
      const dataBg = isDark ? "rgba(251,191,36,0.15)" : "rgba(217,119,6,0.12)";
      const dataBorder = isDark ? "#fbbf24" : "#d97706";
      const toolCallColor = isDark ? "#fbbf24" : "#d97706";
      const responseColor = "#4ade80";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const bg = isDark ? "#0f0f0f" : "#fffbeb";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cy = H / 2;
      const aiX = W * 0.12;
      const mcpX = W * 0.48;
      const dataX = W * 0.82;

      // Draw AI Agent (circle)
      const aiR = 24;
      ctx.beginPath();
      ctx.arc(aiX, cy, aiR, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(251,191,36,0.12)" : "rgba(217,119,6,0.08)";
      ctx.fill();
      ctx.strokeStyle = aiColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // brain-ish: 3 small arcs
      ctx.strokeStyle = aiColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(aiX, cy - 4 + i * 3, 8 - i * 1.5, Math.PI, 0);
        ctx.stroke();
      }
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("AI Agent", aiX, cy + aiR + 4);

      // AI response flash
      if (elapsed > 2800) {
        const flashT = Math.min(1, (elapsed - 2800) / 400);
        ctx.globalAlpha = flashT * (1 - (elapsed - 2800) / 700);
        ctx.strokeStyle = responseColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(aiX, cy, aiR + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = responseColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("\u2713 Used", aiX, cy - aiR - 4);
      }

      // Draw MCP Server (rounded box)
      const mcpW = 90;
      const mcpH = 70;
      const mcpLeft = mcpX - mcpW / 2;
      const mcpTop = cy - mcpH / 2;
      ctx.beginPath();
      ctx.roundRect(mcpLeft, mcpTop, mcpW, mcpH, 6);
      ctx.fillStyle = isDark ? "rgba(251,146,60,0.12)" : "rgba(234,88,12,0.08)";
      ctx.fill();
      ctx.strokeStyle = mcpColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mcpColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("MCP Server", mcpX, mcpTop + 4);

      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.fillText("- Tools", mcpLeft + 8, mcpTop + 20);
      ctx.fillText("- Resources", mcpLeft + 8, mcpTop + 32);

      // Auth shield at bottom of MCP
      const shieldX = mcpX;
      const shieldY = mcpTop + mcpH - 14;
      ctx.beginPath();
      ctx.moveTo(shieldX - 6, shieldY - 4);
      ctx.lineTo(shieldX + 6, shieldY - 4);
      ctx.lineTo(shieldX + 6, shieldY + 2);
      ctx.quadraticCurveTo(shieldX, shieldY + 8, shieldX - 6, shieldY + 2);
      ctx.closePath();
      ctx.fillStyle = responseColor;
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = responseColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = responseColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Auth \u2713", shieldX + 10, shieldY + 1);

      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Draw data sources (3 small boxes)
      const dataW = 70;
      const dataH = 16;
      const dataGap = 4;
      const dataTotal = dataH * 3 + dataGap * 2;
      const dataTop = cy - dataTotal / 2;

      for (let i = 0; i < DATA_SOURCES.length; i++) {
        const dy = dataTop + i * (dataH + dataGap);
        ctx.beginPath();
        ctx.roundRect(dataX - dataW / 2, dy, dataW, dataH, 3);
        ctx.fillStyle = dataBg;
        ctx.fill();
        ctx.strokeStyle = dataBorder;
        ctx.lineWidth =
          tool.target === i && elapsed > 900 && elapsed < 2500 ? 2 : 1;
        ctx.stroke();
        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(DATA_SOURCES[i], dataX, dy + dataH / 2);
      }

      // Arrow helper
      const drawArrow = (
        fx: number,
        fy: number,
        tx: number,
        ty: number,
        color: string,
        progress: number,
        label?: string
      ) => {
        const dx = tx - fx;
        const dy = ty - fy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const sx = fx + ux * 4;
        const sy = fy + uy * 4;
        const ex = tx - ux * 6;
        const ey = ty - uy * 6;
        const curX = sx + (ex - sx) * progress;
        const curY = sy + (ey - sy) * progress;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        if (progress >= 0.99) {
          const ah = 5;
          const ang = Math.atan2(ey - sy, ex - sx);
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(
            ex - ah * Math.cos(ang - Math.PI / 6),
            ey - ah * Math.sin(ang - Math.PI / 6)
          );
          ctx.lineTo(
            ex - ah * Math.cos(ang + Math.PI / 6),
            ey - ah * Math.sin(ang + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();

          if (label) {
            ctx.font = "8px var(--font-geist-mono, monospace)";
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(label, (sx + ex) / 2, Math.min(sy, ey) - 2);
          }
        }
      };

      // Step 1: AI -> MCP (0-800ms) tool call
      if (elapsed < 900) {
        const p = Math.min(1, elapsed / 700);
        drawArrow(
          aiX + aiR,
          cy - 4,
          mcpLeft,
          cy - 4,
          toolCallColor,
          p,
          tool.name
        );
      }

      // Step 2: MCP -> Data (900-1600ms)
      const targetY = dataTop + tool.target * (dataH + dataGap) + dataH / 2;
      if (elapsed >= 900 && elapsed < 1700) {
        const p = Math.min(1, (elapsed - 900) / 700);
        drawArrow(
          mcpLeft + mcpW,
          cy - 4,
          dataX - dataW / 2,
          targetY,
          toolCallColor,
          p
        );
      }

      // Step 3: Data -> MCP (1700-2300ms)
      if (elapsed >= 1700 && elapsed < 2400) {
        const p = Math.min(1, (elapsed - 1700) / 600);
        drawArrow(
          dataX - dataW / 2,
          targetY + 2,
          mcpLeft + mcpW,
          cy + 4,
          responseColor,
          p
        );
      }

      // Step 4: MCP -> AI (2400-2900ms)
      if (elapsed >= 2400 && elapsed < 3000) {
        const p = Math.min(1, (elapsed - 2400) / 500);
        drawArrow(
          mcpLeft,
          cy + 6,
          aiX + aiR,
          cy + 6,
          responseColor,
          p,
          "result"
        );
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
