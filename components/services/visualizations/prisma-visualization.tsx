"use client";
import { useEffect, useRef } from "react";

const CYCLE_FRAMES = 240;
const STAGE1_END = 70;
const STAGE2_END = 120;
const STAGE3_END = 180;
const STAGE4_END = 230;

const SCHEMA_LINES = [
  "model User {",
  "  id    Int    @id",
  "  name  String",
  "  posts Post[]",
  "}",
];

const TYPE_LINES = [
  "type User = {",
  "  id: number",
  "  name: string",
  "  posts: Post[]",
  "}",
];

const QUERY = "prisma.user.findMany()";

export function PrismaVisualization() {
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
      const schemaColor = isDark ? "#2dd4bf" : "#0d9488";
      const generateColor = isDark ? "#5eead4" : "#14b8a6";
      const typeColor = isDark ? "#99f6e4" : "#2dd4bf";
      const textColor = isDark ? "#f0fdfa" : "#042f2e";
      const panelBg = isDark ? "rgba(4,47,46,0.6)" : "rgba(240,253,250,0.85)";
      const panelBorder = isDark
        ? "rgba(45,212,191,0.35)"
        : "rgba(13,148,136,0.3)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const stage =
        frame < STAGE1_END
          ? 1
          : frame < STAGE2_END
            ? 2
            : frame < STAGE3_END
              ? 3
              : 4;

      const panelW = (W - 32) / 3;
      const panelH = H * 0.78;
      const panelY = (H - panelH) / 2;
      const panelXs = [8, 8 + panelW + 8, 8 + 2 * (panelW + 8)];

      const drawPanel = (x: number, active: boolean, label: string) => {
        ctx.beginPath();
        ctx.roundRect(x, panelY, panelW, panelH, 6);
        ctx.fillStyle = panelBg;
        ctx.fill();
        ctx.strokeStyle = active ? generateColor : panelBorder;
        ctx.lineWidth = active ? 1.5 : 1;
        ctx.stroke();

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.6;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(label, x + 6, panelY + 5);
        ctx.globalAlpha = 1;
      };

      drawPanel(panelXs[0], stage === 1, "schema.prisma");
      drawPanel(panelXs[1], stage === 2, "prisma generate");
      drawPanel(
        panelXs[2],
        stage >= 3,
        stage === 4 ? "query (typed)" : "types.d.ts"
      );

      // Connector arrows
      const drawArrow = (x1: number, x2: number, active: boolean) => {
        const y = H / 2;
        ctx.globalAlpha = active ? 1 : 0.3;
        ctx.strokeStyle = generateColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2 - 3, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(x2 - 4, y - 3);
        ctx.lineTo(x2 - 4, y + 3);
        ctx.closePath();
        ctx.fillStyle = generateColor;
        ctx.fill();
        ctx.globalAlpha = 1;
      };
      drawArrow(panelXs[0] + panelW, panelXs[1], stage >= 2);
      drawArrow(panelXs[1] + panelW, panelXs[2], stage >= 3);

      // Stage 1: schema typing in left panel
      ctx.font = "8px var(--font-geist-mono, monospace)";
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      const schemaFull = SCHEMA_LINES.join("\n");
      const schemaReveal =
        stage === 1
          ? Math.floor((frame / STAGE1_END) * schemaFull.length)
          : schemaFull.length;
      ctx.fillStyle = schemaColor;
      let sy = panelY + 18;
      for (const line of schemaFull.slice(0, schemaReveal).split("\n")) {
        ctx.fillText(line, panelXs[0] + 6, sy);
        sy += 11;
      }

      // Stage 2+: generate spinning dots
      if (stage >= 2) {
        const cx = panelXs[1] + panelW / 2;
        const cy = H / 2 + 4;
        ctx.fillStyle = generateColor;
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + frame * 0.15;
          const r = 10;
          const alpha = stage === 2 ? (i / 8) * 0.9 + 0.1 : 0.3;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(
            cx + Math.cos(a) * r,
            cy + Math.sin(a) * r,
            1.8,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText("generating…", cx, panelY + 18);
        ctx.textAlign = "left";
      }

      // Stage 3+: types appearing
      if (stage >= 3) {
        const typeFull = TYPE_LINES.join("\n");
        const typeReveal =
          stage === 3
            ? Math.floor(
                ((frame - STAGE2_END) / (STAGE3_END - STAGE2_END)) *
                  typeFull.length
              )
            : typeFull.length;

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = typeColor;
        ctx.textAlign = "left";
        let ty = panelY + 18;
        const text = typeFull.slice(0, typeReveal);
        for (const line of text.split("\n")) {
          ctx.fillText(line, panelXs[2] + 6, ty);
          ty += 11;
        }
      }

      // Stage 4: query autocomplete
      if (stage === 4) {
        const queryReveal = Math.floor(
          ((frame - STAGE3_END) / (STAGE4_END - STAGE3_END)) * QUERY.length
        );
        const shown = QUERY.slice(0, Math.min(queryReveal, QUERY.length));

        const qBoxY = panelY + panelH - 18;
        ctx.fillStyle = isDark
          ? "rgba(20,184,166,0.18)"
          : "rgba(20,184,166,0.12)";
        ctx.beginPath();
        ctx.roundRect(panelXs[2] + 6, qBoxY, panelW - 12, 14, 3);
        ctx.fill();
        ctx.strokeStyle = generateColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = generateColor;
        ctx.textBaseline = "middle";
        ctx.fillText(shown, panelXs[2] + 9, qBoxY + 7);
      }

      frameRef.current = (frame + 1) % CYCLE_FRAMES;

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
