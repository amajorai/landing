"use client";
import { useEffect, useRef } from "react";

// 9 steps × 28 frames each + hold
const STEP_FRAMES = 28;
const STEPS = 9;
const HOLD_FRAMES = 40;
const TOTAL_FRAMES = STEPS * STEP_FRAMES + HOLD_FRAMES;

// Each step defined by: [fromCol, toCol, label]. col 0=client, 1=server, 2=stripe
// -1 = self (no arrow, in-place activity)
const STEP_DEFS: Array<{ from: number; to: number; label: string }> = [
  { from: 0, to: 1, label: "create intent" },
  { from: 1, to: 2, label: "POST /intents" },
  { from: 2, to: 1, label: "{ client_secret }" },
  { from: 1, to: 0, label: "client_secret" },
  { from: 0, to: -1, label: "Stripe Elements" },
  { from: 0, to: 2, label: "confirmPayment()" },
  { from: 2, to: -1, label: "processing..." },
  { from: 2, to: 1, label: "webhook: succeeded" },
  { from: 1, to: -1, label: "Fulfill order OK" },
];

export function StripeVisualization() {
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
      const clientColor = isDark ? "#a78bfa" : "#7c3aed";
      const serverColor = isDark ? "#818cf8" : "#6d28d9";
      const stripeColor = isDark ? "#60a5fa" : "#2563eb";
      const successColor = "#4ade80";
      const arrowColor = isDark
        ? "rgba(167,139,250,0.5)"
        : "rgba(124,58,237,0.4)";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";
      const mutedText = isDark ? "#c4b5fd" : "#5b21b6";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // Column X positions
      const padX = 20;
      const colXs = [padX + 40, W / 2, W - padX - 40];
      const colColors = [clientColor, serverColor, stripeColor];
      const colLabels = ["Client", "Server", "Stripe"];
      const topY = 18;
      const bottomY = H - 12;

      // Draw header boxes
      const boxW = 70;
      const boxH = 22;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.roundRect(colXs[i] - boxW / 2, topY - boxH / 2, boxW, boxH, 5);
        ctx.fillStyle = isDark
          ? "rgba(167,139,250,0.10)"
          : "rgba(124,58,237,0.08)";
        ctx.fill();
        ctx.strokeStyle = colColors[i];
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(colLabels[i], colXs[i], topY);
      }

      // Vertical lifelines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(colXs[i], topY + boxH / 2);
        ctx.lineTo(colXs[i], bottomY);
        ctx.strokeStyle = arrowColor;
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Determine which step we're on
      const activeStep = Math.min(Math.floor(frame / STEP_FRAMES), STEPS - 1);
      const inHold = frame >= STEPS * STEP_FRAMES;
      const localT = inHold ? 1 : (frame % STEP_FRAMES) / STEP_FRAMES;

      const usableH = bottomY - (topY + boxH / 2) - 12;
      const stepYStart = topY + boxH / 2 + 12;
      const stepSpacing = usableH / STEPS;

      // Draw completed steps (faded) + active step
      for (let i = 0; i <= activeStep; i++) {
        const def = STEP_DEFS[i];
        const y = stepYStart + stepSpacing * (i + 0.5);
        const isActive = i === activeStep && !inHold;
        const alpha = isActive ? 1 : 0.45;
        ctx.globalAlpha = alpha;

        if (def.to === -1) {
          // Self activity - draw small indicator at column
          const x = colXs[def.from];
          if (i === 4) {
            // Stripe Elements card silhouette
            const cw = 44;
            const chh = 14;
            ctx.beginPath();
            ctx.roundRect(x - cw / 2, y - chh / 2, cw, chh, 3);
            ctx.fillStyle = isDark
              ? "rgba(167,139,250,0.18)"
              : "rgba(124,58,237,0.12)";
            ctx.fill();
            ctx.strokeStyle = colColors[def.from];
            ctx.lineWidth = 1;
            ctx.stroke();
            // card stripe
            ctx.beginPath();
            ctx.rect(x - cw / 2 + 3, y - 4, cw - 6, 2);
            ctx.fillStyle = colColors[def.from];
            ctx.fill();
            // number dots
            for (let d = 0; d < 4; d++) {
              ctx.beginPath();
              ctx.arc(x - cw / 2 + 8 + d * 9, y + 3, 1, 0, Math.PI * 2);
              ctx.fillStyle = colColors[def.from];
              ctx.fill();
            }
          } else if (i === 6) {
            // Processing spinner dots
            const spinT = isActive ? localT * Math.PI * 4 : 0;
            for (let d = 0; d < 3; d++) {
              const ang = spinT + (d * Math.PI * 2) / 3;
              const dx = x + Math.cos(ang) * 8;
              const dy = y + Math.sin(ang) * 4;
              ctx.beginPath();
              ctx.arc(dx, dy, 2, 0, Math.PI * 2);
              ctx.fillStyle = colColors[def.from];
              ctx.fill();
            }
          } else if (i === 8) {
            // Fulfill OK checkmark
            ctx.font = "bold 10px var(--font-geist-mono, monospace)";
            ctx.fillStyle = successColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("OK", x, y);
          }

          // Label
          ctx.font = "9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isActive ? textColor : mutedText;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(def.label, x, y + 12);
        } else {
          // Arrow from col[from] -> col[to]
          const fx = colXs[def.from];
          const tx = colXs[def.to];
          const progress = isActive ? Math.min(localT * 1.3, 1) : 1;
          const curX = fx + (tx - fx) * progress;
          const dir = tx > fx ? 1 : -1;

          ctx.beginPath();
          ctx.moveTo(fx, y);
          ctx.lineTo(curX, y);
          ctx.strokeStyle = isActive ? colColors[def.from] : arrowColor;
          ctx.lineWidth = isActive ? 2 : 1.2;
          ctx.stroke();

          if (progress >= 1) {
            // arrow head
            ctx.beginPath();
            ctx.moveTo(tx, y);
            ctx.lineTo(tx - 5 * dir, y - 3);
            ctx.lineTo(tx - 5 * dir, y + 3);
            ctx.closePath();
            ctx.fillStyle = isActive ? colColors[def.from] : arrowColor;
            ctx.fill();
          }

          // label
          ctx.font = "9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = isActive ? textColor : mutedText;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(def.label, (fx + tx) / 2, y - 3);
        }

        ctx.globalAlpha = 1;
      }

      // Completion banner during hold
      if (inHold) {
        const bannerY = bottomY - 10;
        ctx.font = "bold 11px var(--font-geist-mono, monospace)";
        ctx.fillStyle = successColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Payment Complete OK", W / 2, bannerY);
      }

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
