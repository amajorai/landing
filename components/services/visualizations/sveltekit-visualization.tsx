"use client";
import { useEffect, useRef } from "react";

const ROUTES = [
  {
    url: "/",
    files: ["+layout.svelte", "+page.svelte"],
    serverFile: null,
    label: "Home",
  },
  {
    url: "/blog/[slug]",
    files: ["+layout.svelte", "+page.svelte"],
    serverFile: "+page.server.ts",
    label: "Blog",
  },
  {
    url: "/api/subscribe",
    files: ["+server.ts"],
    serverFile: "+server.ts",
    label: "API Route",
  },
];

const PHASE_DURATION = 2800;

export function SveltekitVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
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

      const elapsed = ts - startRef.current;
      const cycle =
        (elapsed % (PHASE_DURATION * ROUTES.length)) / PHASE_DURATION;
      const routeIdx = Math.floor(cycle) % ROUTES.length;
      const routeProgress = cycle - Math.floor(cycle); // 0→1 within this route

      const route = ROUTES[routeIdx];

      // ─── Colors ───────────────────────────────────────────────
      const bg = isDark ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)";
      const orange = isDark ? "#fb923c" : "#ea580c";
      const orangeDim = isDark
        ? "rgba(251,146,60,0.25)"
        : "rgba(234,88,12,0.15)";
      const textMain = isDark ? "#fafafa" : "#18181b";
      const textMuted = isDark ? "#71717a" : "#71717a";
      const borderColor = isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.10)";
      const serverColor = isDark ? "#818cf8" : "#4f46e5";
      const serverDim = isDark
        ? "rgba(129,140,248,0.18)"
        : "rgba(79,70,229,0.12)";

      ctx.clearRect(0, 0, W, H);

      // ─── Layout ───────────────────────────────────────────────
      const colW = Math.min(180, W * 0.38);
      const col1X = W * 0.04;
      const col2X = W / 2 - colW / 2;
      const col3X = W - W * 0.04 - colW;
      const midY = H / 2;

      // ─── Helper: rounded rect ─────────────────────────────────
      const rr = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        fill: string,
        stroke?: string,
        sw = 1
      ) => {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fillStyle = fill;
        ctx.fill();
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = sw;
          ctx.stroke();
        }
      };

      // ─── Column 1: URL bar (browser request) ─────────────────
      const urlBarH = 28;
      const urlBarY = midY - urlBarH / 2;
      rr(
        col1X,
        urlBarY,
        colW,
        urlBarH,
        6,
        isDark ? "#18181b" : "#f4f4f5",
        borderColor
      );
      // dots
      const dotColors = ["#ef4444", "#f59e0b", "#22c55e"];
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(col1X + 8 + i * 9, urlBarY + 14, 3, 0, Math.PI * 2);
        ctx.fillStyle = dotColors[i];
        ctx.fill();
      }
      ctx.font = "10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textMuted;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const urlText =
        route.url.length > 18 ? route.url.slice(0, 17) + "…" : route.url;
      ctx.fillText(urlText, col1X + 32, urlBarY + 14);

      // ─── Column 3: file tree ──────────────────────────────────
      const treeLineH = 20;
      const treeItems = route.serverFile
        ? [
            ...route.files.filter((f) => f !== route.serverFile),
            route.serverFile,
          ]
        : route.files;
      const treeH = treeItems.length * treeLineH + 28;
      const treeY = midY - treeH / 2;

      rr(
        col3X,
        treeY,
        colW,
        treeH,
        6,
        isDark ? "#18181b" : "#f4f4f5",
        borderColor
      );

      // folder header
      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textMuted;
      ctx.textAlign = "left";
      ctx.fillText("src/routes/", col3X + 8, treeY + 13);

      // files
      treeItems.forEach((file, i) => {
        const fileY = treeY + 28 + i * treeLineH;
        const isServer = file === route.serverFile;
        const col = isServer ? serverColor : orange;

        // highlight active file
        if (routeProgress > 0.3) {
          rr(
            col3X + 4,
            fileY,
            colW - 8,
            treeLineH - 2,
            3,
            isServer ? serverDim : orangeDim
          );
        }

        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = routeProgress > 0.3 ? col : textMuted;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`  ${file}`, col3X + 8, fileY + treeLineH / 2 - 1);
      });

      // ─── Center panel: server/client labels ───────────────────
      const panelW = colW;
      const panelH = route.serverFile ? 68 : 44;
      const panelX = col2X;
      const panelY = midY - panelH / 2;

      rr(
        panelX,
        panelY,
        panelW,
        panelH,
        6,
        isDark ? "#18181b" : "#f4f4f5",
        borderColor
      );

      const labelProgress = Math.min(1, routeProgress * 2);

      // "render" label
      ctx.globalAlpha = labelProgress;
      rr(panelX + 8, panelY + 8, panelW - 16, 22, 4, orangeDim);
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = orange;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("⬡ client render", panelX + panelW / 2, panelY + 19);
      ctx.globalAlpha = 1;

      if (route.serverFile) {
        ctx.globalAlpha = Math.min(1, Math.max(0, (routeProgress - 0.2) * 3));
        rr(panelX + 8, panelY + 38, panelW - 16, 22, 4, serverDim);
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = serverColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("⬡ server load()", panelX + panelW / 2, panelY + 49);
        ctx.globalAlpha = 1;
      }

      // ─── Animated arrows ──────────────────────────────────────
      const arrowProgress = Math.min(1, routeProgress * 2.5);

      // URL → center
      const a1Start = col1X + colW + 4;
      const a1End = col2X - 4;
      const arrowY1 = midY - 8;
      drawArrow(
        ctx,
        a1Start,
        arrowY1,
        a1End,
        arrowY1,
        orange,
        arrowProgress,
        "→"
      );

      // center → file tree
      const a2Start = col2X + colW + 4;
      const a2End = col3X - 4;
      const arrowY2 = midY + (route.serverFile ? 0 : 0);
      drawArrow(
        ctx,
        a2Start,
        arrowY2,
        a2End,
        arrowY2,
        orange,
        Math.max(0, arrowProgress - 0.2),
        "→"
      );

      // route label
      ctx.font = "bold 10px var(--font-geist-sans, sans-serif)";
      ctx.fillStyle = orange;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(route.label, W / 2, H - 6);

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startRef.current = performance.now();
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

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  progress: number,
  _dir: string
) {
  if (progress <= 0) return;
  const px = x1 + (x2 - x1) * progress;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(px, y1);
  ctx.stroke();
  if (progress > 0.9) {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 5, y2 - 3);
    ctx.lineTo(x2 - 5, y2 + 3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  // animated dot
  ctx.beginPath();
  ctx.arc(px, y1, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.globalAlpha = 1;
}
