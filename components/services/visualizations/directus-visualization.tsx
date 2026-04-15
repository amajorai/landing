"use client";
import { useEffect, useRef } from "react";

const TABLES = [
  { name: "products", rows: 4, cols: ["id", "name", "price"] },
  { name: "orders", rows: 3, cols: ["id", "user_id", "total"] },
];

const API_LINES = [
  "GET  /items/products",
  "GET  /items/orders",
  "POST /items/products",
  "GQL  { products { id } }",
];

export function DirectusVisualization() {
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
      const frame = frameRef.current;

      const accent = isDark ? "#a78bfa" : "#7c3aed";
      const accentLight = isDark
        ? "rgba(167,139,250,0.12)"
        : "rgba(124,58,237,0.08)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#94a3b8" : "#64748b";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(250,245,255,0.9)";
      const border = isDark
        ? "rgba(167,139,250,0.25)"
        : "rgba(124,58,237,0.15)";
      const successGreen = "#22c55e";

      ctx.clearRect(0, 0, W, H);

      const dbW = W * 0.26;
      const dbH = H * 0.78;
      const dbX = W * 0.04;
      const dbY = (H - dbH) / 2;

      ctx.beginPath();
      ctx.roundRect(dbX, dbY, dbW, dbH, 6);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("SQL Database", dbX + dbW / 2, dbY + 6);

      let tableY = dbY + 22;
      for (const table of TABLES) {
        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = text;
        ctx.textAlign = "left";
        ctx.fillText(table.name, dbX + 6, tableY);
        tableY += 10;

        ctx.beginPath();
        ctx.roundRect(dbX + 4, tableY, dbW - 8, 12, 2);
        ctx.fillStyle = accentLight;
        ctx.fill();

        const colW = (dbW - 12) / table.cols.length;
        for (let c = 0; c < table.cols.length; c++) {
          ctx.font = "bold 6px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "left";
          ctx.fillText(table.cols[c], dbX + 6 + c * colW, tableY + 3);
        }
        tableY += 14;

        const scanRow = Math.floor((frame / 30) % (table.rows + 1));
        for (let r = 0; r < table.rows; r++) {
          const isScanning = r === scanRow;
          if (isScanning) {
            ctx.beginPath();
            ctx.roundRect(dbX + 4, tableY, dbW - 8, 10, 2);
            ctx.fillStyle = isDark
              ? "rgba(167,139,250,0.08)"
              : "rgba(124,58,237,0.04)";
            ctx.fill();
          }
          for (let c = 0; c < table.cols.length; c++) {
            ctx.font = "6px var(--font-geist-mono, monospace)";
            ctx.fillStyle = textDim;
            ctx.textAlign = "left";
            const val =
              c === 0 ? `${r + 1}` : c === 1 ? "···" : `$${(r + 1) * 29}`;
            ctx.fillText(val, dbX + 6 + c * colW, tableY + 2);
          }
          tableY += 12;
        }
        tableY += 6;
      }

      const midW = W * 0.18;
      const midH = H * 0.5;
      const midX = (W - midW) / 2;
      const midY = (H - midH) / 2;

      ctx.beginPath();
      ctx.roundRect(midX, midY, midW, midH, 8);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.12;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Directus", midX + midW / 2, midY + midH / 2 - 6);
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textDim;
      ctx.fillText("wraps", midX + midW / 2, midY + midH / 2 + 8);

      const spinAngle = (frame * 0.03) % (Math.PI * 2);
      const gearR = 14;
      const gearCx = midX + midW / 2;
      const gearCy = midY + midH - 20;
      ctx.save();
      ctx.translate(gearCx, gearCy);
      ctx.rotate(spinAngle);
      const teeth = 8;
      for (let i = 0; i < teeth; i++) {
        const a = (i * Math.PI * 2) / teeth;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (gearR - 3), Math.sin(a) * (gearR - 3));
        ctx.lineTo(Math.cos(a) * gearR, Math.sin(a) * gearR);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, gearR - 5, 0, Math.PI * 2);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      const leftArrowStart = dbX + dbW + 4;
      const leftArrowEnd = midX - 4;
      const arrowMidY = H / 2;

      ctx.beginPath();
      ctx.moveTo(leftArrowStart, arrowMidY);
      ctx.lineTo(leftArrowEnd, arrowMidY);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      const lDotT = ((frame * 0.8) % 70) / 70;
      const lDotX = leftArrowStart + (leftArrowEnd - leftArrowStart) * lDotT;
      ctx.beginPath();
      ctx.arc(lDotX, arrowMidY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      const apiW = W * 0.26;
      const apiH = H * 0.78;
      const apiX = W - apiW - W * 0.04;
      const apiY = (H - apiH) / 2;

      ctx.beginPath();
      ctx.roundRect(apiX, apiY, apiW, apiH, 6);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.fillText("Auto APIs", apiX + apiW / 2, apiY + 8);

      for (let i = 0; i < API_LINES.length; i++) {
        const ly = apiY + 26 + i * 22;
        const appear = Math.min(
          Math.max(((frame % 180) / 180 - i * 0.1) * 5, 0),
          1
        );

        ctx.globalAlpha = appear;
        ctx.beginPath();
        ctx.roundRect(apiX + 4, ly, apiW - 8, 16, 3);
        ctx.fillStyle = accentLight;
        ctx.fill();

        const line = API_LINES[i];
        const method = line.split(/\s+/)[0];
        const rest = line.slice(method.length).trim();

        const methodColor =
          method === "GET"
            ? successGreen
            : method === "POST"
              ? "#3b82f6"
              : accent;

        ctx.font = "bold 6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = methodColor;
        ctx.textAlign = "left";
        ctx.fillText(method, apiX + 8, ly + 5);

        ctx.font = "6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textDim;
        ctx.fillText(rest, apiX + 28, ly + 5);
      }
      ctx.globalAlpha = 1;

      const rightArrowStart = midX + midW + 4;
      const rightArrowEnd = apiX - 4;

      ctx.beginPath();
      ctx.moveTo(rightArrowStart, arrowMidY);
      ctx.lineTo(rightArrowEnd, arrowMidY);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(rightArrowEnd - 5, arrowMidY - 4);
      ctx.lineTo(rightArrowEnd, arrowMidY);
      ctx.lineTo(rightArrowEnd - 5, arrowMidY + 4);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const rDotT = ((frame * 0.8 + 35) % 70) / 70;
      const rDotX = rightArrowStart + (rightArrowEnd - rightArrowStart) * rDotT;
      ctx.beginPath();
      ctx.arc(rDotX, arrowMidY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      frameRef.current = frame + 1;
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
