"use client";
import { useEffect, useRef } from "react";

// Tauri: WebView <-> IPC <-> Rust
interface Packet {
  startFrame: number;
  direction: "toRust" | "toWeb";
  label: string;
  color: string;
}

const CYCLE = 180;
const PACKET_TRAVEL = 70;

export function TauriVisualization() {
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
      const webviewColor = isDark ? "#22d3ee" : "#0891b2";
      const rustColor = isDark ? "#fb923c" : "#ea580c";
      const ipcColor = isDark ? "#a78bfa" : "#7c3aed";
      const textColor = isDark ? "#ecfeff" : "#083344";

      ctx.clearRect(0, 0, W, H);

      const pad = 10;
      const leftW = W * 0.38;
      const rightW = W * 0.38;
      const leftX = pad;
      const rightX = W - pad - rightW;
      const boxY = H * 0.2;
      const boxH = H * 0.6;
      const centerX = W / 2;

      // --- WebView box ---
      ctx.beginPath();
      ctx.roundRect(leftX, boxY, leftW, boxH, 8);
      ctx.fillStyle = isDark ? "rgba(34,211,238,0.08)" : "rgba(8,145,178,0.06)";
      ctx.fill();
      ctx.strokeStyle = webviewColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Title bar dots
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(leftX + 10 + i * 8, boxY + 10, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = webviewColor;
        ctx.fill();
      }
      // Simulated HTML lines
      ctx.fillStyle = webviewColor;
      ctx.globalAlpha = 0.5;
      const lineStartY = boxY + 24;
      const lineLens = [0.7, 0.5, 0.85, 0.6, 0.75];
      for (let i = 0; i < lineLens.length; i++) {
        ctx.fillRect(
          leftX + 12,
          lineStartY + i * 8,
          (leftW - 24) * lineLens[i],
          3
        );
      }
      ctx.globalAlpha = 1;
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("WebView", leftX + leftW / 2, boxY + boxH - 8);

      // --- Rust box ---
      ctx.beginPath();
      ctx.roundRect(rightX, boxY, rightW, boxH, 8);
      ctx.fillStyle = isDark ? "rgba(251,146,60,0.08)" : "rgba(234,88,12,0.06)";
      ctx.fill();
      ctx.strokeStyle = rustColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // fn invoke and labels
      ctx.fillStyle = textColor;
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.textAlign = "left";
      ctx.fillText("fn invoke()", rightX + 10, boxY + 18);
      ctx.font = "500 9px var(--font-geist-mono, monospace)";
      const apis = ["fs::read", "net::get", "os::info"];
      for (let i = 0; i < apis.length; i++) {
        ctx.fillStyle = rustColor;
        ctx.globalAlpha = 0.85;
        ctx.fillText(apis[i], rightX + 14, boxY + 34 + i * 12);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = textColor;
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.fillText("Rust", rightX + rightW / 2, boxY + boxH - 8);

      // --- IPC bridge (vertical line in center) ---
      ctx.strokeStyle = ipcColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX, boxY + 4);
      ctx.lineTo(centerX, boxY + boxH - 4);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = ipcColor;
      ctx.font = "700 9px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.fillText("IPC", centerX, boxY - 2);

      // --- Packets ---
      const frame = frameRef.current;
      const cyclePos = frame % CYCLE;

      // Packet 1: invoke() left -> right (first half)
      // Packet 2: Result<T> right -> left (second half)
      const drawPacket = (
        progress: number,
        dir: "toRust" | "toWeb",
        label: string,
        color: string
      ) => {
        const laneY = boxY + boxH * 0.55;
        const startX = dir === "toRust" ? leftX + leftW : rightX;
        const endX = dir === "toRust" ? rightX : leftX + leftW;
        const px = startX + (endX - startX) * progress;
        const py = laneY;

        // Packet square
        ctx.beginPath();
        ctx.roundRect(px - 8, py - 6, 16, 12, 3);
        ctx.fillStyle = color;
        ctx.fill();

        // Arrow
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        const arrowX = dir === "toRust" ? px + 12 : px - 12;
        ctx.beginPath();
        ctx.moveTo(px + (dir === "toRust" ? 8 : -8), py);
        ctx.lineTo(arrowX, py);
        ctx.stroke();
        ctx.beginPath();
        if (dir === "toRust") {
          ctx.moveTo(arrowX, py);
          ctx.lineTo(arrowX - 4, py - 3);
          ctx.moveTo(arrowX, py);
          ctx.lineTo(arrowX - 4, py + 3);
        } else {
          ctx.moveTo(arrowX, py);
          ctx.lineTo(arrowX + 4, py - 3);
          ctx.moveTo(arrowX, py);
          ctx.lineTo(arrowX + 4, py + 3);
        }
        ctx.stroke();

        // Label above packet
        ctx.fillStyle = textColor;
        ctx.font = "600 9px var(--font-geist-mono, monospace)";
        ctx.textAlign = "center";
        ctx.fillText(label, px, py - 12);
      };

      if (cyclePos < PACKET_TRAVEL) {
        const p = cyclePos / PACKET_TRAVEL;
        drawPacket(p, "toRust", "invoke()", webviewColor);
      } else if (cyclePos < PACKET_TRAVEL + 20) {
        // held at rust side
        drawPacket(1, "toRust", "processing...", webviewColor);
      } else if (cyclePos < PACKET_TRAVEL * 2 + 20) {
        const p = (cyclePos - PACKET_TRAVEL - 20) / PACKET_TRAVEL;
        drawPacket(p, "toWeb", "Result<T>", rustColor);
      }

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
