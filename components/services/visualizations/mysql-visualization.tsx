"use client";
import { useEffect, useRef } from "react";

// Transaction phases (frames)
const P_BEGIN = 0;
const P_INSERT = 25;
const P_UPDATE = 55;
const P_COMMIT = 90;
const P_HOLD = 120;
const P_RESET = 160;
const TX_TOTAL = 170;

// Replication particle cycle
const REP_CYCLE = 120;

export function MysqlVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const frameRef = useRef(0);
  const cycleCountRef = useRef(0);

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
      const primaryColor = isDark ? "#60a5fa" : "#2563eb";
      const replicaColor = isDark ? "#3b82f6" : "#1d4ed8";
      const commitColor = "#4ade80";
      const rollbackColor = "#f87171";
      const rowFill = isDark ? "rgba(96,165,250,0.20)" : "rgba(37,99,235,0.15)";
      const textColor = isDark ? "#eff6ff" : "#1e3a8a";
      const mutedText = isDark ? "#93c5fd" : "#1e40af";
      const dividerColor = isDark
        ? "rgba(96,165,250,0.15)"
        : "rgba(37,99,235,0.12)";

      ctx.clearRect(0, 0, W, H);

      const midY = H / 2;

      // Horizontal divider
      ctx.beginPath();
      ctx.moveTo(10, midY);
      ctx.lineTo(W - 10, midY);
      ctx.strokeStyle = dividerColor;
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      const frame = frameRef.current;

      // ================= TOP HALF: Transaction =================
      const topCY = midY / 2;
      const isRollbackCycle = cycleCountRef.current % 2 === 1;

      // Title
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("InnoDB  ACID", 12, 6);

      // Steps labels (BEGIN, INSERT, UPDATE, COMMIT)
      const steps = [
        "BEGIN",
        "INSERT",
        "UPDATE",
        isRollbackCycle ? "ROLLBACK" : "COMMIT",
      ];
      const stepThresholds = [P_BEGIN, P_INSERT, P_UPDATE, P_COMMIT];
      let activeStep = 0;
      for (let i = 0; i < stepThresholds.length; i++) {
        if (frame >= stepThresholds[i]) activeStep = i;
      }

      const stepW = (W - 24) / 4;
      for (let i = 0; i < 4; i++) {
        const sx = 12 + stepW * i + stepW / 2;
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        if (i === activeStep && frame < P_HOLD) {
          ctx.fillStyle =
            i === 3
              ? isRollbackCycle
                ? rollbackColor
                : commitColor
              : primaryColor;
        } else if (i < activeStep) {
          ctx.fillStyle = mutedText;
        } else {
          ctx.fillStyle = isDark ? "#475569" : "#94a3b8";
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(steps[i], sx, topCY - 22);
      }

      // Rows (3 rows appear as transaction progresses)
      const rowW = Math.min(28, W * 0.08);
      const rowH = 10;
      const rowSpacing = 4;
      const rowsStartX = W / 2 - (rowW * 3 + rowSpacing * 2) / 2;
      const rowsY = topCY - rowH / 2 + 2;

      const insertedRows =
        frame >= P_INSERT
          ? Math.min(Math.floor((frame - P_INSERT) / 8) + 1, 3)
          : 0;

      for (let i = 0; i < 3; i++) {
        const rx = rowsStartX + i * (rowW + rowSpacing);
        if (i < insertedRows) {
          let color = primaryColor;
          let fill = rowFill;

          // UPDATE phase: rows change color
          if (frame >= P_UPDATE && frame < P_COMMIT) {
            color = "#a78bfa";
            fill = isDark ? "rgba(167,139,250,0.20)" : "rgba(124,58,237,0.15)";
          }
          // COMMIT / ROLLBACK phase
          if (frame >= P_COMMIT && frame < P_HOLD) {
            if (isRollbackCycle) {
              color = rollbackColor;
              fill = isDark ? "rgba(248,113,113,0.18)" : "rgba(239,68,68,0.12)";
            } else {
              color = commitColor;
              fill = isDark ? "rgba(74,222,128,0.18)" : "rgba(34,197,94,0.12)";
            }
          }
          // After hold (rollback): rows disappear
          if (frame >= P_HOLD && isRollbackCycle) {
            continue;
          }

          ctx.beginPath();
          ctx.roundRect(rx, rowsY, rowW, rowH, 2);
          ctx.fillStyle = fill;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // empty slot
          ctx.beginPath();
          ctx.roundRect(rx, rowsY, rowW, rowH, 2);
          ctx.strokeStyle = dividerColor;
          ctx.setLineDash([2, 2]);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Final status badge
      if (frame >= P_COMMIT && frame < P_RESET) {
        const bx = W - 12;
        const by = topCY + 18;
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isRollbackCycle ? rollbackColor : commitColor;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(isRollbackCycle ? "ROLLBACK X" : "COMMIT OK", bx, by);
      }

      // ================= BOTTOM HALF: Replication =================
      const botCY = midY + (H - midY) / 2;

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Replication", 12, midY + 6);

      const nodeW = Math.min(60, W * 0.18);
      const nodeH = 22;
      const primaryX = 12 + nodeW / 2 + 6;
      const primaryY = botCY + 4;
      const replicaX = W - 12 - nodeW / 2 - 6;
      const replica1Y = botCY - 14;
      const replica2Y = botCY + 22;

      const drawNode = (
        cx: number,
        cy: number,
        label: string,
        color: string
      ) => {
        ctx.beginPath();
        ctx.roundRect(cx - nodeW / 2, cy - nodeH / 2, nodeW, nodeH, 4);
        ctx.fillStyle = rowFill;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, cx, cy);
      };

      drawNode(primaryX, primaryY, "Primary", primaryColor);
      drawNode(replicaX, replica1Y, "Replica 1", replicaColor);
      drawNode(replicaX, replica2Y, "Replica 2", replicaColor);

      // binlog arrows primary -> replicas
      const lineStartX = primaryX + nodeW / 2;
      const lineEndX = replicaX - nodeW / 2;
      for (const ry of [replica1Y, replica2Y]) {
        ctx.beginPath();
        ctx.moveTo(lineStartX, primaryY);
        ctx.quadraticCurveTo((lineStartX + lineEndX) / 2, ry, lineEndX, ry);
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = mutedText;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("binlog", (lineStartX + lineEndX) / 2, primaryY - 14);

      // write particle (left -> primary)
      const rFrame = frame % REP_CYCLE;
      const wT = (rFrame % 60) / 60;
      if (wT < 0.5) {
        const wx = 10 + (primaryX - nodeW / 2 - 10) * (wT * 2);
        ctx.beginPath();
        ctx.arc(wx, primaryY, 3, 0, Math.PI * 2);
        ctx.fillStyle = commitColor;
        ctx.fill();
      } else {
        // flow along replication to replicas
        const rt = (wT - 0.5) * 2;
        for (const ry of [replica1Y, replica2Y]) {
          const rx = lineStartX + (lineEndX - lineStartX) * rt;
          const curveY = primaryY + (ry - primaryY) * rt * rt;
          ctx.beginPath();
          ctx.arc(rx, curveY, 3, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.fill();
        }
      }

      // read particles from right -> replicas
      const readT = ((frame + 30) % 60) / 60;
      if (readT < 0.5) {
        const rx = W - 10 - (W - 10 - (replicaX + nodeW / 2)) * (readT * 2);
        ctx.beginPath();
        ctx.arc(rx, replica1Y + 10, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = replicaColor;
        ctx.fill();
      }

      // Advance tx frame
      frameRef.current = frame + 1;
      if (frameRef.current >= TX_TOTAL) {
        frameRef.current = 0;
        cycleCountRef.current += 1;
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
