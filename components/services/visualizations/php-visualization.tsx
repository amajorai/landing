"use client";
import { useEffect, useRef } from "react";

// Vertical waterfall request lifecycle.
// Last stage splits into View and JSON — we'll handle branch visually.
interface Stage {
  label: string;
  detail?: string;
}

const STAGES: Stage[] = [
  { label: "HTTP Request" },
  { label: "Web Server", detail: "nginx" },
  { label: "index.php" },
  { label: "Router", detail: "/users" },
  { label: "Controller" },
  { label: "Model -> DB", detail: "SELECT *" },
];

const STAGE_DURATION = 500;
const BRANCH_DURATION = 800;
const CYCLE = STAGES.length * STAGE_DURATION + BRANCH_DURATION + 800;

export function PhpVisualization() {
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
      const boxColor = isDark
        ? "rgba(129,140,248,0.15)"
        : "rgba(99,102,241,0.10)";
      const activeColor = isDark ? "#818cf8" : "#4f46e5";
      const edgeColor = isDark
        ? "rgba(129,140,248,0.3)"
        : "rgba(79,70,229,0.25)";
      const textColor = isDark ? "#eef2ff" : "#1e1b4b";
      const sqlColor = "#fbbf24";

      ctx.clearRect(0, 0, W, H);

      // Layout: stages distributed vertically in top 80%, branches at bottom
      const topPad = 8;
      const bottomPad = 32;
      const usableH = H - topPad - bottomPad;
      const stageGap = usableH / (STAGES.length - 0);
      const boxW = Math.min(150, W * 0.62);
      const boxH = 18;
      const cx = W / 2;

      // Current stage
      const totalStageTime = STAGES.length * STAGE_DURATION;
      const inBranch = elapsed >= totalStageTime;

      let activeStageIdx = -1;
      let activeStageT = 0;
      if (inBranch) {
        activeStageIdx = STAGES.length - 1;
        activeStageT = 1;
      } else {
        activeStageIdx = Math.floor(elapsed / STAGE_DURATION);
        activeStageT =
          (elapsed - activeStageIdx * STAGE_DURATION) / STAGE_DURATION;
      }

      // Draw edges
      for (let i = 0; i < STAGES.length - 1; i++) {
        const y1 = topPad + stageGap * i + boxH / 2;
        const y2 = topPad + stageGap * (i + 1) - boxH / 2;
        ctx.beginPath();
        ctx.moveTo(cx, y1);
        ctx.lineTo(cx, y2);
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        // arrow head
        ctx.beginPath();
        ctx.moveTo(cx, y2);
        ctx.lineTo(cx - 3, y2 - 4);
        ctx.lineTo(cx + 3, y2 - 4);
        ctx.closePath();
        ctx.fillStyle = edgeColor;
        ctx.fill();
      }

      // Draw boxes
      for (let i = 0; i < STAGES.length; i++) {
        const stage = STAGES[i];
        const y = topPad + stageGap * i;
        const x = cx - boxW / 2;
        const isActive = i === activeStageIdx;
        const isPast = i < activeStageIdx || (inBranch && i <= activeStageIdx);

        ctx.beginPath();
        ctx.roundRect(x, y - boxH / 2, boxW, boxH, 4);
        ctx.fillStyle = isActive
          ? isDark
            ? "rgba(129,140,248,0.35)"
            : "rgba(99,102,241,0.25)"
          : boxColor;
        ctx.fill();
        ctx.strokeStyle = isActive || isPast ? activeColor : edgeColor;
        ctx.lineWidth = isActive ? 1.6 : 1;
        ctx.stroke();

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = stage.detail
          ? `${stage.label} - ${stage.detail}`
          : stage.label;
        ctx.fillText(label, cx, y);
      }

      // Packet
      if (
        !inBranch &&
        activeStageIdx >= 0 &&
        activeStageIdx < STAGES.length - 1
      ) {
        const y1 = topPad + stageGap * activeStageIdx;
        const y2 = topPad + stageGap * (activeStageIdx + 1);
        const py = y1 + (y2 - y1) * activeStageT;
        ctx.beginPath();
        ctx.roundRect(cx - 6, py - 5, 12, 10, 2);
        ctx.fillStyle = activeColor;
        ctx.fill();
      }

      // SQL flash during Model -> DB stage
      if (activeStageIdx === 5 && !inBranch) {
        const y = topPad + stageGap * 5;
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = sqlColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const alpha = Math.sin(activeStageT * Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fillText("SELECT * FROM users", cx + boxW / 2 + 6, y);
        ctx.globalAlpha = 1;
      }

      // Branches at bottom: View (HTML) | JSON
      const lastY = topPad + stageGap * (STAGES.length - 1);
      const branchY = H - 18;
      const viewX = cx - 55;
      const jsonX = cx + 55;

      // Branch edges from last stage
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, lastY + boxH / 2);
      ctx.lineTo(viewX, branchY - 10);
      ctx.moveTo(cx, lastY + boxH / 2);
      ctx.lineTo(jsonX, branchY - 10);
      ctx.stroke();

      const drawBranch = (bx: number, label: string, isActive: boolean) => {
        ctx.beginPath();
        ctx.roundRect(bx - 38, branchY - 10, 76, 18, 4);
        ctx.fillStyle = isActive
          ? isDark
            ? "rgba(129,140,248,0.35)"
            : "rgba(99,102,241,0.25)"
          : boxColor;
        ctx.fill();
        ctx.strokeStyle = isActive ? activeColor : edgeColor;
        ctx.lineWidth = isActive ? 1.6 : 1;
        ctx.stroke();

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, bx, branchY - 1);
      };

      const branchT = inBranch
        ? Math.min(1, (elapsed - totalStageTime) / BRANCH_DURATION)
        : 0;
      const useView = Math.floor(elapsed / CYCLE) % 2 === 0;

      drawBranch(viewX, "View (HTML)", inBranch && useView && branchT > 0.3);
      drawBranch(jsonX, "JSON", inBranch && !useView && branchT > 0.3);

      // Branch packet
      if (inBranch && branchT < 1) {
        const targetX = useView ? viewX : jsonX;
        const bx = cx + (targetX - cx) * branchT;
        const by =
          lastY + boxH / 2 + (branchY - 10 - (lastY + boxH / 2)) * branchT;
        ctx.beginPath();
        ctx.roundRect(bx - 6, by - 5, 12, 10, 2);
        ctx.fillStyle = activeColor;
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
