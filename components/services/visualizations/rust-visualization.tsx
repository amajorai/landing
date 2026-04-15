"use client";
import { useEffect, useRef } from "react";

// Rust ownership: x owns A, y = x (move), z = &y (borrow), drop
type Step = {
  label: string;
  frames: number;
  xState: "owns" | "moved" | "gone";
  yState: "none" | "owns" | "gone";
  zState: "none" | "borrow" | "gone";
  cellState: "alloc" | "freed";
  checker: boolean;
};

const STEPS: Step[] = [
  {
    label: "let x = Box::new(42);",
    frames: 80,
    xState: "owns",
    yState: "none",
    zState: "none",
    cellState: "alloc",
    checker: true,
  },
  {
    label: "let y = x;  // move",
    frames: 80,
    xState: "moved",
    yState: "owns",
    zState: "none",
    cellState: "alloc",
    checker: true,
  },
  {
    label: "let z = &y; // borrow",
    frames: 80,
    xState: "moved",
    yState: "owns",
    zState: "borrow",
    cellState: "alloc",
    checker: true,
  },
  {
    label: "drop(z); // borrow ends",
    frames: 60,
    xState: "moved",
    yState: "owns",
    zState: "gone",
    cellState: "alloc",
    checker: true,
  },
  {
    label: "drop(y); // freed",
    frames: 70,
    xState: "gone",
    yState: "gone",
    zState: "gone",
    cellState: "freed",
    checker: true,
  },
];

const TOTAL = STEPS.reduce((a, s) => a + s.frames, 0);

export function RustVisualization() {
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
      const cellColor = isDark ? "#fbbf24" : "#d97706";
      const ownerColor = isDark ? "#fbbf24" : "#d97706";
      const borrowColor = isDark ? "#fb923c" : "#ea580c";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const freedColor = "#f87171";

      ctx.clearRect(0, 0, W, H);

      // Determine current step
      const frame = frameRef.current;
      let acc = 0;
      let step = STEPS[0];
      for (const s of STEPS) {
        if (frame < acc + s.frames) {
          step = s;
          break;
        }
        acc += s.frames;
      }

      // Layout: variables row top, cells row bottom
      const varY = H * 0.28;
      const cellY = H * 0.68;
      const cellW = Math.min(W * 0.22, 80);
      const cellH = 34;
      const cellCx = W / 2;
      const cellX = cellCx - cellW / 2;

      // Variables: x, y, z
      const vars: { id: "x" | "y" | "z"; x: number }[] = [
        { id: "x", x: W * 0.25 },
        { id: "y", x: W * 0.5 },
        { id: "z", x: W * 0.75 },
      ];

      ctx.font = "600 12px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw code label at top
      ctx.fillStyle = textColor;
      ctx.font = "500 11px var(--font-geist-mono, monospace)";
      ctx.fillText(step.label, W / 2, 14);

      // Draw cell
      const isFreed = step.cellState === "freed";
      ctx.beginPath();
      ctx.roundRect(cellX, cellY, cellW, cellH, 6);
      ctx.fillStyle = isFreed
        ? "rgba(248,113,113,0.15)"
        : isDark
          ? "rgba(251,191,36,0.15)"
          : "rgba(217,119,6,0.12)";
      ctx.fill();
      ctx.strokeStyle = isFreed ? freedColor : cellColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = isFreed ? freedColor : textColor;
      ctx.font = "600 11px var(--font-geist-mono, monospace)";
      ctx.fillText(isFreed ? "freed" : "Cell A: 42", cellCx, cellY + cellH / 2);

      // Variables
      for (const v of vars) {
        const state =
          v.id === "x" ? step.xState : v.id === "y" ? step.yState : step.zState;

        if (state === "none") continue;

        // Variable label box
        const boxW = 40;
        const boxH = 22;
        ctx.beginPath();
        ctx.roundRect(v.x - boxW / 2, varY - boxH / 2, boxW, boxH, 5);
        ctx.fillStyle =
          state === "moved" || state === "gone"
            ? "rgba(148,163,184,0.15)"
            : isDark
              ? "rgba(251,191,36,0.15)"
              : "rgba(217,119,6,0.12)";
        ctx.fill();
        ctx.strokeStyle =
          state === "moved" || state === "gone"
            ? "rgba(148,163,184,0.6)"
            : state === "borrow"
              ? borrowColor
              : ownerColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.font = "700 12px var(--font-geist-mono, monospace)";
        ctx.fillText(v.id, v.x, varY);

        // X marker for moved
        if (state === "moved" || state === "gone") {
          ctx.strokeStyle = freedColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(v.x + boxW / 2 + 2, varY - 6);
          ctx.lineTo(v.x + boxW / 2 + 10, varY + 2);
          ctx.moveTo(v.x + boxW / 2 + 10, varY - 6);
          ctx.lineTo(v.x + boxW / 2 + 2, varY + 2);
          ctx.stroke();
        }

        // Arrow down to cell
        if (state === "owns" || state === "borrow") {
          const ax = v.x;
          const ay1 = varY + boxH / 2 + 2;
          const ay2 = cellY - 2;
          const tx = cellCx + (v.id === "x" ? -20 : v.id === "y" ? 0 : 20);
          ctx.strokeStyle = state === "borrow" ? borrowColor : ownerColor;
          ctx.lineWidth = 1.8;
          if (state === "borrow") ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.moveTo(ax, ay1);
          ctx.lineTo(tx, ay2);
          ctx.stroke();
          ctx.setLineDash([]);
          // Arrowhead
          const angle = Math.atan2(ay2 - ay1, tx - ax);
          ctx.beginPath();
          ctx.moveTo(tx, ay2);
          ctx.lineTo(
            tx - 6 * Math.cos(angle - 0.4),
            ay2 - 6 * Math.sin(angle - 0.4)
          );
          ctx.moveTo(tx, ay2);
          ctx.lineTo(
            tx - 6 * Math.cos(angle + 0.4),
            ay2 - 6 * Math.sin(angle + 0.4)
          );
          ctx.stroke();
        }
      }

      // Borrow checker label
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.textAlign = "right";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("Borrow Checker: OK", W - 10, H - 10);

      frameRef.current = (frame + 1) % TOTAL;

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
