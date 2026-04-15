"use client";
import { useEffect, useRef } from "react";

interface Packet {
  progress: number; // 0..1 full trip
}

export function TanstackStartVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);
  const packetRef = useRef<Packet>({ progress: 0 });
  const dbFlashRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000;

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
      const clientColor = isDark ? "#fb923c" : "#ea580c";
      const serverColor = isDark ? "#f87171" : "#dc2626";
      const boundaryColor = isDark
        ? "rgba(251,146,60,0.3)"
        : "rgba(234,88,12,0.25)";
      const packetColor = "#fbbf24";
      const textColor = isDark ? "#fff7ed" : "#431407";

      ctx.clearRect(0, 0, W, H);

      // Top label
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.7;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("SSR + Streaming", W / 2, 4);
      ctx.globalAlpha = 1;

      const pad = 8;
      const topY = 18;
      const boxH = H - topY - 30;
      const boxW = (W - pad * 2 - 30) / 2;
      const clientX = pad;
      const serverX = W - pad - boxW;
      const boundaryX = W / 2;

      // Client panel
      ctx.beginPath();
      ctx.roundRect(clientX, topY, boxW, boxH, 6);
      ctx.fillStyle = clientColor;
      ctx.globalAlpha = 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = clientColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = clientColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("client", clientX + 6, topY + 5);

      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      const clientLines = [
        "const data =",
        "  await getUser(",
        "    { id: 1 }",
        "  )",
        "",
        "// { name, role }",
      ];
      for (let i = 0; i < clientLines.length; i++) {
        ctx.fillText(clientLines[i], clientX + 6, topY + 20 + i * 11);
      }

      // Server panel
      ctx.beginPath();
      ctx.roundRect(serverX, topY, boxW, boxH, 6);
      ctx.fillStyle = serverColor;
      ctx.globalAlpha = 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = serverColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = serverColor;
      ctx.textAlign = "left";
      ctx.fillText("server", serverX + 6, topY + 5);

      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      const serverLines = [
        "async function",
        "  getUser({ id }) {",
        "  return db",
        "    .user",
        "    .findOne({id})",
        "}",
      ];
      for (let i = 0; i < serverLines.length; i++) {
        ctx.fillText(serverLines[i], serverX + 6, topY + 20 + i * 11);
      }

      // Boundary dashed line
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(boundaryX, topY);
      ctx.lineTo(boundaryX, topY + boxH);
      ctx.strokeStyle = boundaryColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(boundaryX, topY + boxH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.7;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("Server Boundary", 0, -3);
      ctx.globalAlpha = 1;
      ctx.restore();

      // Packet trip: 0..0.5 client->server, 0.5..1 server->client
      const cycle = 2.5;
      packetRef.current.progress = (t % cycle) / cycle;
      const p = packetRef.current.progress;

      const midY = topY + boxH / 2;
      const leftEdge = clientX + boxW;
      const rightEdge = serverX;

      let px: number, py: number, label: string;
      if (p < 0.5) {
        const lp = p / 0.5;
        px = leftEdge + (rightEdge - leftEdge) * lp;
        py = midY - 6;
        label = "{ id: 1 }";
      } else {
        const lp = (p - 0.5) / 0.5;
        px = rightEdge + (leftEdge - rightEdge) * lp;
        py = midY + 6;
        label = "{ name, role }";
      }

      // trigger db flash at midpoint
      if (p > 0.48 && p < 0.52) dbFlashRef.current = 1;

      ctx.beginPath();
      ctx.roundRect(px - 8, py - 5, 16, 10, 2);
      ctx.fillStyle = packetColor;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = p < 0.5 ? "bottom" : "top";
      ctx.fillText(label, px, py + (p < 0.5 ? -6 : 6));

      // DB icon under server
      const dbX = serverX + boxW / 2;
      const dbY = H - 10;
      ctx.save();
      if (dbFlashRef.current > 0) {
        ctx.shadowColor = serverColor;
        ctx.shadowBlur = 10 * dbFlashRef.current;
        dbFlashRef.current = Math.max(0, dbFlashRef.current - 0.04);
      }
      ctx.beginPath();
      ctx.ellipse(dbX, dbY - 6, 7, 2.5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = serverColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dbX - 7, dbY - 6);
      ctx.lineTo(dbX - 7, dbY - 1);
      ctx.moveTo(dbX + 7, dbY - 6);
      ctx.lineTo(dbX + 7, dbY - 1);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(dbX, dbY - 1, 7, 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

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
