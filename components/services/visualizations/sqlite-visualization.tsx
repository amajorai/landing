"use client";
import { useEffect, useRef } from "react";

interface WalEntry {
  id: number;
  age: number;
}

interface WriteFlight {
  progress: number;
  id: number;
  writerIdx: number;
}

interface ReadFlight {
  progress: number;
  readerIdx: number;
}

const CYCLE = 360;

export function SqliteVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const walRef = useRef<WalEntry[]>([]);
  const writesRef = useRef<WriteFlight[]>([]);
  const readsRef = useRef<ReadFlight[]>([]);
  const nextIdRef = useRef(0);

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
      const walColor = isDark ? "#60a5fa" : "#2563eb";
      const mainDbColor = isDark ? "#3b82f6" : "#1d4ed8";
      const writeColor = isDark ? "#818cf8" : "#6d28d9";
      const readColor = isDark ? "#86efac" : "#15803d";
      const checkpointColor = "#fbbf24";
      const textColor = isDark ? "#eff6ff" : "#1e3a8a";
      const boxBg = isDark ? "rgba(30,58,138,0.3)" : "rgba(239,246,255,0.85)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // Layout
      const writerX = 20;
      const walW = Math.min(80, W * 0.25);
      const walH = Math.min(H * 0.36, 82);
      const walX = W / 2 - walW / 2;
      const walY = 18;

      const mainW = walW;
      const mainH = Math.min(H * 0.22, 46);
      const mainX = W / 2 - mainW / 2;
      const mainY = H - mainH - 10;

      const readerX = W - 20;
      const numReaders = 3;
      const readerYs = Array.from(
        { length: numReaders },
        (_, i) => 30 + (i * (H - 60)) / (numReaders - 1)
      );
      const writerYs = [H * 0.35, H * 0.65];

      // Writer boxes
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < writerYs.length; i++) {
        ctx.beginPath();
        ctx.roundRect(writerX - 16, writerYs[i] - 9, 32, 18, 3);
        ctx.fillStyle = isDark
          ? "rgba(129,140,248,0.15)"
          : "rgba(109,40,217,0.12)";
        ctx.fill();
        ctx.strokeStyle = writeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = textColor;
        ctx.fillText(`W${i + 1}`, writerX, writerYs[i]);
      }

      // Reader boxes
      for (let i = 0; i < numReaders; i++) {
        ctx.beginPath();
        ctx.roundRect(readerX - 16, readerYs[i] - 9, 32, 18, 3);
        ctx.fillStyle = isDark
          ? "rgba(134,239,172,0.15)"
          : "rgba(21,128,61,0.12)";
        ctx.fill();
        ctx.strokeStyle = readColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = textColor;
        ctx.fillText(`R${i + 1}`, readerX, readerYs[i]);
      }

      // Subtle connection lines
      ctx.strokeStyle = isDark
        ? "rgba(96,165,250,0.15)"
        : "rgba(37,99,235,0.15)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 3]);
      for (const wy of writerYs) {
        ctx.beginPath();
        ctx.moveTo(writerX + 16, wy);
        ctx.lineTo(walX, walY + walH / 2);
        ctx.stroke();
      }
      ctx.strokeStyle = isDark
        ? "rgba(134,239,172,0.15)"
        : "rgba(21,128,61,0.15)";
      for (const ry of readerYs) {
        ctx.beginPath();
        ctx.moveTo(readerX - 16, ry);
        ctx.lineTo(mainX + mainW, mainY + mainH / 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // WAL box
      ctx.beginPath();
      ctx.roundRect(walX, walY, walW, walH, 5);
      ctx.fillStyle = boxBg;
      ctx.fill();
      ctx.strokeStyle = walColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = walColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("WAL", walX + walW / 2, walY + 3);

      // WAL entries
      ctx.font = "6px var(--font-geist-mono, monospace)";
      const maxVisible = 5;
      const visible = walRef.current.slice(-maxVisible);
      for (let i = 0; i < visible.length; i++) {
        const ey = walY + 14 + i * 8;
        const a = Math.max(0, 1 - visible[i].age / 80);
        ctx.globalAlpha = a;
        ctx.fillStyle = isDark
          ? "rgba(96,165,250,0.25)"
          : "rgba(37,99,235,0.2)";
        ctx.fillRect(walX + 5, ey, walW - 10, 6);
        ctx.fillStyle = textColor;
        ctx.textBaseline = "top";
        ctx.fillText(`tx:${visible[i].id}`, walX + walW / 2, ey);
        ctx.globalAlpha = 1;
      }

      // Main DB box
      ctx.beginPath();
      ctx.roundRect(mainX, mainY, mainW, mainH, 5);
      ctx.fillStyle = boxBg;
      ctx.fill();
      ctx.strokeStyle = mainDbColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mainDbColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Main DB", mainX + mainW / 2, mainY + mainH / 2);

      // Spawn writes
      if (frame % 35 === 0) {
        writesRef.current.push({
          progress: 0,
          id: nextIdRef.current++,
          writerIdx: Math.floor(Math.random() * writerYs.length),
        });
      }
      // Spawn reads
      if (frame % 20 === 5) {
        readsRef.current.push({
          progress: 0,
          readerIdx: Math.floor(Math.random() * numReaders),
        });
      }

      // Write flights
      writesRef.current = writesRef.current.filter((w) => {
        w.progress += 0.04;
        const sx = writerX + 16;
        const sy = writerYs[w.writerIdx];
        const ex = walX;
        const ey = walY + walH / 2;
        const x = sx + (ex - sx) * w.progress;
        const y = sy + (ey - sy) * w.progress;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = writeColor;
        ctx.fill();

        if (w.progress >= 1) {
          walRef.current.push({ id: w.id, age: 0 });
          return false;
        }
        return true;
      });

      // Read flights (bidirectional round-trip)
      readsRef.current = readsRef.current.filter((r) => {
        r.progress += 0.05;
        const ry = readerYs[r.readerIdx];
        const startX = readerX - 16;
        const endX = mainX + mainW;
        const midY = mainY + mainH / 2;
        let px: number, py: number;
        if (r.progress < 0.5) {
          const t = r.progress * 2;
          px = startX + (endX - startX) * t;
          py = ry + (midY - ry) * t;
        } else {
          const t = (r.progress - 0.5) * 2;
          px = endX + (startX - endX) * t;
          py = midY + (ry - midY) * t;
        }
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = readColor;
        ctx.fill();
        return r.progress < 1;
      });

      // Checkpoint (periodic)
      const checkpointEvery = 180;
      const checkpointPhase = frame % checkpointEvery;
      if (checkpointPhase < 40 && walRef.current.length > 0) {
        const t = checkpointPhase / 40;
        const startY = walY + walH;
        const endY = mainY;
        const x = walX + walW / 2;
        const y = startY + (endY - startY) * t;

        ctx.fillStyle = checkpointColor;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = checkpointColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("checkpoint", x + 8, (startY + endY) / 2);

        if (checkpointPhase === 39) {
          walRef.current = [];
        }
      }

      // Age WAL entries
      for (const e of walRef.current) e.age++;

      frameRef.current = (frame + 1) % CYCLE;

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
