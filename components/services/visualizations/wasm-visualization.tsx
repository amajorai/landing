"use client";
import { useEffect, useRef } from "react";

// WASM: source (Rust/C++) compiled to .wasm binary → runs near-native speed
// anywhere. Shows compilation pipeline and perf bars (~90% vs JS ~40%).

const SOURCE_LINES = [
  "fn fib(n: u32)",
  "  -> u32 {",
  "  if n<2 { n }",
  "  else { fib…",
  "}",
];

// Magic bytes visualized
const WASM_HEX = [
  "00",
  "61",
  "73",
  "6d",
  "01",
  "00",
  "00",
  "00",
  "01",
  "07",
  "01",
  "60",
  "02",
  "7f",
  "7f",
  "01",
];

const STEP_FRAMES = 45;
const TOTAL_FRAMES = STEP_FRAMES * 4 + 60;

export function WasmVisualization() {
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
      const sourceColor = isDark ? "#a78bfa" : "#7c3aed";
      const wasmColor = "#fbbf24";
      const runtimeColor = isDark ? "#818cf8" : "#6d28d9";
      const perfColor = "#4ade80";
      const jsPerfColor = "#f87171";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";
      const boxFill = isDark
        ? "rgba(167,139,250,0.12)"
        : "rgba(124,58,237,0.08)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const drawBox = (
        x: number,
        y: number,
        w: number,
        h: number,
        color: string
      ) => {
        ctx.fillStyle = boxFill;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      const drawArrow = (
        x1: number,
        y: number,
        x2: number,
        color: string,
        label: string
      ) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2 - 4, y);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(x2 - 5, y - 3);
        ctx.lineTo(x2 - 5, y + 3);
        ctx.closePath();
        ctx.fill();
        ctx.font = `${Math.round(H * 0.038)}px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(label, (x1 + x2) / 2, y - 2);
      };

      // Layout
      const topY = H * 0.06;
      const boxH = H * 0.44;
      const colW = W * 0.22;

      const srcX = W * 0.03;
      const wasmX = W * 0.4;
      const runX = W * 0.74;

      // ---- LEFT: Source ----
      drawBox(srcX, topY, colW, boxH, sourceColor);
      ctx.fillStyle = sourceColor;
      ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Rust / C++", srcX + 5, topY + 4);
      ctx.fillStyle = textColor;
      ctx.font = `${Math.round(H * 0.038)}px var(--font-geist-mono, monospace)`;
      for (let i = 0; i < SOURCE_LINES.length; i++) {
        ctx.fillText(SOURCE_LINES[i], srcX + 5, topY + 18 + i * 12);
      }

      // ---- Arrow 1 ----
      if (frame >= STEP_FRAMES * 0.3) {
        drawArrow(
          srcX + colW,
          topY + boxH / 2,
          wasmX,
          sourceColor,
          "wasm-pack"
        );
      }

      // ---- CENTER: .wasm binary ----
      drawBox(wasmX, topY, colW, boxH, wasmColor);
      ctx.fillStyle = wasmColor;
      ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.fillText(".wasm", wasmX + 5, topY + 4);

      // Hex grid
      const hexCols = 4;
      const cellW = (colW - 10) / hexCols;
      const cellH = (boxH - 22) / 4;
      const hexRevealUntil = Math.min(
        Math.floor(
          ((frame - STEP_FRAMES * 0.5) / STEP_FRAMES) * WASM_HEX.length
        ),
        WASM_HEX.length
      );
      ctx.font = `${Math.round(cellH * 0.5)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < WASM_HEX.length; i++) {
        if (i >= hexRevealUntil) break;
        const col = i % hexCols;
        const row = Math.floor(i / hexCols);
        const cx = wasmX + 5 + col * cellW + cellW / 2;
        const cy = topY + 20 + row * cellH + cellH / 2;
        // Highlight magic bytes (first 4)
        const isMagic = i < 4;
        ctx.fillStyle = isMagic
          ? "rgba(251,191,36,0.35)"
          : isDark
            ? "rgba(251,191,36,0.12)"
            : "rgba(251,191,36,0.15)";
        ctx.fillRect(
          wasmX + 5 + col * cellW + 1,
          topY + 20 + row * cellH + 1,
          cellW - 2,
          cellH - 2
        );
        ctx.fillStyle = isMagic ? wasmColor : textColor;
        ctx.fillText(WASM_HEX[i], cx, cy);
      }

      // ---- Arrow 2 ----
      if (frame >= STEP_FRAMES * 1.5) {
        drawArrow(wasmX + colW, topY + boxH / 2, runX, wasmColor, "deploy");
      }

      // ---- RIGHT: Runtimes column ----
      const runtimes = ["Browser", "Node.js", "CF Worker"];
      const rtH = (boxH - 4) / 3;
      for (let i = 0; i < runtimes.length; i++) {
        const ry = topY + i * rtH + 2;
        drawBox(runX, ry, colW, rtH - 4, runtimeColor);
        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(rtH * 0.35)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(runtimes[i], runX + colW / 2, ry + (rtH - 4) / 2);
      }

      // Lock / sandbox icon next to wasm box
      const lockX = wasmX + colW - 14;
      const lockY = topY + boxH - 14;
      ctx.strokeStyle = wasmColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(lockX, lockY - 2, 3, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = wasmColor;
      ctx.fillRect(lockX - 4, lockY, 8, 6);

      // ---- PERF BARS (bottom) ----
      const perfY = H * 0.62;
      const perfH = H * 0.11;
      const perfLabelX = W * 0.03;
      const perfBarX = W * 0.32;
      const perfBarW = W * 0.62;

      const fillP = Math.min(
        Math.max((frame - STEP_FRAMES * 2) / STEP_FRAMES, 0),
        1
      );

      // WASM bar ~90%
      ctx.fillStyle = textColor;
      ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("WASM", perfLabelX, perfY + perfH / 2);
      ctx.strokeStyle = perfColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(perfBarX, perfY, perfBarW, perfH);
      ctx.fillStyle = perfColor;
      ctx.fillRect(perfBarX, perfY, perfBarW * 0.9 * fillP, perfH);
      ctx.fillStyle = textColor;
      ctx.textAlign = "right";
      ctx.fillText("~90% native", perfBarX + perfBarW - 4, perfY + perfH / 2);

      // JS bar ~40%
      const perfY2 = perfY + perfH + 6;
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.fillText("JS", perfLabelX, perfY2 + perfH / 2);
      ctx.strokeStyle = jsPerfColor;
      ctx.strokeRect(perfBarX, perfY2, perfBarW, perfH);
      ctx.fillStyle = jsPerfColor;
      ctx.fillRect(perfBarX, perfY2, perfBarW * 0.4 * fillP, perfH);
      ctx.fillStyle = textColor;
      ctx.textAlign = "right";
      ctx.fillText("~40%", perfBarX + perfBarW - 4, perfY2 + perfH / 2);

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
