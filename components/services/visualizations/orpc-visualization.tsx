"use client";
import { useEffect, useRef } from "react";

// oRPC: one procedure definition → type-safe client AND OpenAPI spec
// Left: procedure types in, center: oRPC engine pulses, right: two outputs appear.

const DEFINITION_LINES = [
  "const getUser = orpc",
  "  .get('/user')",
  "  .input(z.object({",
  "    id: z.string()",
  "  }))",
  "  .output(UserSchema)",
  "  .handler(async…)",
];

const TYPING_FRAMES_PER_LINE = 14;
const ENGINE_FRAMES = 26;
const OUTPUT_FRAMES = 40;
const HOLD_FRAMES = 40;
const TOTAL_FRAMES =
  DEFINITION_LINES.length * TYPING_FRAMES_PER_LINE +
  ENGINE_FRAMES +
  OUTPUT_FRAMES +
  HOLD_FRAMES;

export function OrpcVisualization() {
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
      const procedureColor = isDark ? "#4ade80" : "#16a34a";
      const orpcColor = isDark ? "#34d399" : "#10b981";
      const clientColor = "#60a5fa";
      const openApiColor = "#fbbf24";
      const textColor = isDark ? "#f0fdf4" : "#14532d";
      const boxFill = isDark ? "rgba(74,222,128,0.1)" : "rgba(22,163,74,0.08)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // ---- LEFT: procedure definition ----
      const leftX = W * 0.03;
      const leftW = W * 0.4;
      const leftY = H * 0.12;
      const leftH = H * 0.76;

      ctx.fillStyle = boxFill;
      ctx.strokeStyle = procedureColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.rect(leftX, leftY, leftW, leftH);
      ctx.fill();
      ctx.stroke();

      // "header" label
      ctx.fillStyle = procedureColor;
      ctx.font = `${Math.round(H * 0.05)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("procedure.ts", leftX + 6, leftY + 4);

      // Typing lines
      const visibleLines = Math.min(
        Math.floor(frame / TYPING_FRAMES_PER_LINE),
        DEFINITION_LINES.length
      );
      const currentLineProgress =
        (frame % TYPING_FRAMES_PER_LINE) / TYPING_FRAMES_PER_LINE;

      ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = textColor;
      const lineY0 = leftY + H * 0.11;
      const lineH = H * 0.085;

      for (let i = 0; i <= visibleLines && i < DEFINITION_LINES.length; i++) {
        const line = DEFINITION_LINES[i];
        const progress = i < visibleLines ? 1 : currentLineProgress;
        const chars = Math.floor(line.length * progress);
        ctx.fillText(line.slice(0, chars), leftX + 6, lineY0 + i * lineH);
      }

      // ---- CENTER: oRPC engine ----
      const engineStart = DEFINITION_LINES.length * TYPING_FRAMES_PER_LINE;
      const cx = W * 0.58;
      const cy = H * 0.5;
      const engineR = Math.min(W, H) * 0.1;

      // Pulse effect
      let pulse = 0;
      if (frame >= engineStart && frame < engineStart + ENGINE_FRAMES) {
        const p = (frame - engineStart) / ENGINE_FRAMES;
        pulse = Math.sin(p * Math.PI) * 0.3;
      }

      if (frame >= engineStart) {
        ctx.beginPath();
        ctx.arc(cx, cy, engineR * (1 + pulse), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? "rgba(52,211,153,0.2)"
          : "rgba(16,185,129,0.15)";
        ctx.fill();
        ctx.strokeStyle = orpcColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = orpcColor;
        ctx.font = `bold ${Math.round(engineR * 0.5)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("oRPC", cx, cy);
      }

      // Line from definition to engine
      if (frame >= engineStart) {
        ctx.strokeStyle = procedureColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(leftX + leftW, cy);
        ctx.lineTo(cx - engineR, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ---- RIGHT: outputs ----
      const outputStart = engineStart + ENGINE_FRAMES;
      const outAlpha = Math.min(
        Math.max((frame - outputStart) / OUTPUT_FRAMES, 0),
        1
      );

      if (outAlpha > 0) {
        ctx.globalAlpha = outAlpha;
        const rightX = W * 0.72;
        const rightW = W * 0.26;
        const boxH = H * 0.3;

        // TOP: Type-safe client
        const topY = H * 0.12;
        ctx.fillStyle = boxFill;
        ctx.strokeStyle = clientColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.rect(rightX, topY, rightW, boxH);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = clientColor;
        ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Type-safe client", rightX + 5, topY + 4);
        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(H * 0.04)}px var(--font-geist-mono, monospace)`;
        ctx.fillText("orpc.getUser({", rightX + 5, topY + boxH * 0.35);
        ctx.fillText("  id: string", rightX + 5, topY + boxH * 0.58);
        ctx.fillText("})", rightX + 5, topY + boxH * 0.8);

        // Connector from engine to top
        ctx.strokeStyle = clientColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx + engineR, cy);
        ctx.lineTo(rightX, topY + boxH / 2);
        ctx.stroke();

        // BOTTOM: OpenAPI spec
        const botY = H * 0.58;
        ctx.fillStyle = boxFill;
        ctx.strokeStyle = openApiColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.rect(rightX, botY, rightW, boxH);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = openApiColor;
        ctx.font = `${Math.round(H * 0.045)}px var(--font-geist-mono, monospace)`;
        ctx.fillText("OpenAPI spec", rightX + 5, botY + 4);
        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(H * 0.04)}px var(--font-geist-mono, monospace)`;
        ctx.fillText('"GET /user":', rightX + 5, botY + boxH * 0.35);
        ctx.fillText("  params:", rightX + 5, botY + boxH * 0.58);
        ctx.fillText("    id", rightX + 5, botY + boxH * 0.8);

        ctx.beginPath();
        ctx.moveTo(cx + engineR, cy);
        ctx.lineTo(rightX, botY + boxH / 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
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
