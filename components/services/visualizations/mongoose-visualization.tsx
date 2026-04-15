"use client";
import { useEffect, useRef } from "react";

type Field = { key: string; value: string; valid: boolean };

const VALID_DOC: Field[] = [
  { key: "name", value: '"Alice"', valid: true },
  { key: "email", value: '"alice@…"', valid: true },
  { key: "age", value: "30", valid: true },
];

const INVALID_DOC: Field[] = [
  { key: "name", value: '"Bob"', valid: true },
  { key: "email", value: '"bob@…"', valid: true },
  { key: "age", value: "-5", valid: false },
];

const SCHEMA_RULES = ["name:  required", "email: /regex/", "age:   min: 0"];

const SLIDE_IN = 30;
const CHECK_PER_FIELD = 28;
const CHECK_TOTAL = 3 * CHECK_PER_FIELD;
const ROUTE = 40;
const HOLD = 50;
const CYCLE = SLIDE_IN + CHECK_TOTAL + ROUTE + HOLD;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function MongooseVisualization() {
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
      const validColor = "#4ade80";
      const errorColor = "#f87171";
      const schemaBg = isDark
        ? "rgba(248,113,113,0.15)"
        : "rgba(220,38,38,0.10)";
      const borderColor = isDark ? "#f87171" : "#dc2626";
      const textColor = isDark ? "#fff1f2" : "#7f1d1d";
      const docBg = isDark ? "rgba(31,41,55,0.6)" : "rgba(255,241,242,0.9)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const doc = cycleCountRef.current % 2 === 0 ? VALID_DOC : INVALID_DOC;
      const isDocValid = doc.every((f) => f.valid);

      const docW = W * 0.26;
      const docH = H * 0.58;
      const docY = (H - docH) / 2;

      const schemaW = W * 0.3;
      const schemaH = H * 0.72;
      const schemaY = (H - schemaH) / 2;
      const schemaX = (W - schemaW) / 2;

      const slideProg = Math.min(frame / SLIDE_IN, 1);
      const docTargetX = 10;
      const docX = -docW + (docTargetX + docW) * easeOut(slideProg);

      // Schema panel
      ctx.beginPath();
      ctx.roundRect(schemaX, schemaY, schemaW, schemaH, 6);
      ctx.fillStyle = schemaBg;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = borderColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Schema", schemaX + schemaW / 2, schemaY + 6);

      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      for (let i = 0; i < SCHEMA_RULES.length; i++) {
        ctx.fillText(SCHEMA_RULES[i], schemaX + 6, schemaY + 22 + i * 12);
      }

      // Document panel
      ctx.beginPath();
      ctx.roundRect(docX, docY, docW, docH, 5);
      ctx.fillStyle = docBg;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("document", docX + docW / 2, docY + 5);

      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.textAlign = "left";
      for (let i = 0; i < doc.length; i++) {
        const fy = docY + 20 + i * 12;
        const f = doc[i];
        ctx.fillStyle = textColor;
        ctx.fillText(`${f.key}: ${f.value}`, docX + 6, fy);

        const fieldStart = SLIDE_IN + i * CHECK_PER_FIELD;
        if (frame >= fieldStart + 10) {
          ctx.font = "bold 9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = f.valid ? validColor : errorColor;
          ctx.fillText(f.valid ? "✓" : "✗", docX + docW - 14, fy - 1);
          ctx.font = "7px var(--font-geist-mono, monospace)";
        }
      }

      // Outcome boxes
      const outW = W * 0.24;
      const outH = H * 0.28;
      const outX = W - outW - 10;
      const topY = H * 0.1;
      const botY = H - outH - 10;

      const drawOutcome = (
        y: number,
        label: string,
        color: string,
        active: boolean
      ) => {
        ctx.beginPath();
        ctx.roundRect(outX, y, outW, outH, 5);
        if (active) {
          ctx.fillStyle =
            color === validColor
              ? isDark
                ? "rgba(74,222,128,0.22)"
                : "rgba(22,163,74,0.15)"
              : isDark
                ? "rgba(248,113,113,0.22)"
                : "rgba(220,38,38,0.15)";
        } else {
          ctx.fillStyle = isDark
            ? "rgba(55,65,81,0.3)"
            : "rgba(229,231,235,0.5)";
        }
        ctx.fill();
        ctx.strokeStyle = active ? color : isDark ? "#475569" : "#cbd5e1";
        ctx.lineWidth = active ? 1.8 : 0.8;
        ctx.stroke();

        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = active ? color : isDark ? "#64748b" : "#94a3b8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, outX + outW / 2, y + outH / 2);
      };

      const routePhase = frame >= SLIDE_IN + CHECK_TOTAL;
      const routeProg = routePhase
        ? Math.min((frame - (SLIDE_IN + CHECK_TOTAL)) / ROUTE, 1)
        : 0;

      drawOutcome(topY, "Saved ✓", validColor, routePhase && isDocValid);
      drawOutcome(
        botY,
        "ValidationError",
        errorColor,
        routePhase && !isDocValid
      );

      // Route pulse
      if (routePhase) {
        const targetY = isDocValid ? topY + outH / 2 : botY + outH / 2;
        const sx = schemaX + schemaW;
        const sy = schemaY + schemaH / 2;
        const ex = outX;
        const ey = targetY;

        const cx = sx + (ex - sx) * routeProg;
        const cy = sy + (ey - sy) * routeProg;

        ctx.strokeStyle = isDocValid ? validColor : errorColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDocValid ? validColor : errorColor;
        ctx.fill();
      }

      frameRef.current = frame + 1;
      if (frameRef.current >= CYCLE) {
        frameRef.current = 0;
        cycleCountRef.current++;
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
