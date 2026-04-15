"use client";
import { useEffect, useRef } from "react";

// Hexagon geometry helpers
function hexPoints(cx: number, cy: number, size: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    pts.push([cx + size * Math.cos(angle), cy + size * Math.sin(angle)]);
  }
  return pts;
}

function hexPerimeter(size: number): number {
  return 6 * size;
}

// Returns total number of frames for the full sequence
// center: 60 frames stroke-in, 20 fill, then 6 surrounding each 40 frames stroke + 10 fill
// fade out: 30 frames, hold: 20 frames
const STROKE_FRAMES = 60;
const FILL_FRAMES = 20;
const SURROUND_STROKE = 40;
const SURROUND_FILL = 10;
const FADE_FRAMES = 30;
const HOLD_FRAMES = 30;

const TOTAL_FRAMES =
  STROKE_FRAMES +
  FILL_FRAMES +
  6 * (SURROUND_STROKE + SURROUND_FILL) +
  FADE_FRAMES +
  HOLD_FRAMES;

export function DotnetVisualization() {
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
      const cx = W / 2;
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const strokeColor = isDark ? "#7c3aed" : "#6d28d9";
      const fillColor = isDark
        ? "rgba(124,58,237,0.18)"
        : "rgba(109,40,217,0.15)";
      const textColor = isDark ? "#ede9fe" : "#4c1d95";

      ctx.clearRect(0, 0, W, H);

      const hexSize = Math.min(W, H) * 0.13;
      const gap = hexSize * 2.1;

      // Center hex position
      const centerHex = { cx, cy };

      // 6 surrounding hex positions (flat-top layout, 60-deg spacing)
      const surroundHexes = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i);
        return {
          cx: cx + gap * Math.cos(angle),
          cy: cy + gap * Math.sin(angle),
        };
      });

      const frame = frameRef.current;

      // Compute alpha for fade-out phase
      const fadeStart =
        STROKE_FRAMES + FILL_FRAMES + 6 * (SURROUND_STROKE + SURROUND_FILL);
      let globalAlpha = 1;
      if (frame >= fadeStart && frame < fadeStart + FADE_FRAMES) {
        globalAlpha = 1 - (frame - fadeStart) / FADE_FRAMES;
      } else if (frame >= fadeStart + FADE_FRAMES) {
        globalAlpha = 0;
      }

      ctx.globalAlpha = globalAlpha;

      // --- Draw center hex ---
      const centerProgress = Math.min(frame / STROKE_FRAMES, 1);
      const perim = hexPerimeter(hexSize);

      const drawHexStroke = (
        hcx: number,
        hcy: number,
        progress: number,
        filled: boolean
      ) => {
        const pts = hexPoints(hcx, hcy, hexSize);
        if (filled) {
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }

        // Stroke with dash offset technique
        ctx.save();
        ctx.setLineDash([perim]);
        ctx.lineDashOffset = perim * (1 - progress);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      };

      // Center hex
      const centerFilled =
        frame >= STROKE_FRAMES && frame < STROKE_FRAMES + FILL_FRAMES;
      const centerFullyDone = frame >= STROKE_FRAMES + FILL_FRAMES;
      drawHexStroke(
        centerHex.cx,
        centerHex.cy,
        centerProgress,
        centerFilled || centerFullyDone
      );

      // Center label
      if (centerProgress > 0.5) {
        ctx.globalAlpha = Math.min((centerProgress - 0.5) * 2, 1) * globalAlpha;
        ctx.font = `bold ${Math.round(hexSize * 0.38)}px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(".NET", centerHex.cx, centerHex.cy);
        ctx.globalAlpha = globalAlpha;
      }

      // --- Draw surrounding hexes ---
      const surroundStart = STROKE_FRAMES + FILL_FRAMES;
      const labels = ["API", "Auth", "EF", "MAUI", "Blazor", "Workers"];

      for (let i = 0; i < 6; i++) {
        const hexStart = surroundStart + i * (SURROUND_STROKE + SURROUND_FILL);
        const hexStrokeEnd = hexStart + SURROUND_STROKE;
        const hexFillEnd = hexStrokeEnd + SURROUND_FILL;

        if (frame < hexStart) break;

        const strokeProgress = Math.min(
          (frame - hexStart) / SURROUND_STROKE,
          1
        );
        const isFilled = frame >= hexStrokeEnd;

        drawHexStroke(
          surroundHexes[i].cx,
          surroundHexes[i].cy,
          strokeProgress,
          isFilled
        );

        // Label
        if (strokeProgress > 0.6) {
          const labelAlpha =
            Math.min((strokeProgress - 0.6) / 0.4, 1) * globalAlpha;
          ctx.globalAlpha = labelAlpha;
          ctx.font = `bold ${Math.round(hexSize * 0.3)}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = textColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(labels[i], surroundHexes[i].cx, surroundHexes[i].cy);
          ctx.globalAlpha = globalAlpha;
        }

        // Connector line from center to this hex
        if (strokeProgress > 0) {
          const lineAlpha = Math.min(strokeProgress, 0.4) * globalAlpha;
          ctx.globalAlpha = lineAlpha;
          ctx.beginPath();
          ctx.moveTo(centerHex.cx, centerHex.cy);
          ctx.lineTo(surroundHexes[i].cx, surroundHexes[i].cy);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = globalAlpha;
        }
      }

      ctx.globalAlpha = 1;

      // Advance frame, loop
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
