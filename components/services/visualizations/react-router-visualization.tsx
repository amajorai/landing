"use client";
import { useEffect, useRef } from "react";

const URL_SEGMENTS = ["/posts", "/123", "/comments"];
const LAYOUT_LABELS = ["RootLayout", "PostLayout", "CommentsView"];

export function ReactRouterVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000;

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
      const routeColor = isDark ? "#f87171" : "#dc2626";
      const activeRoute = isDark
        ? "rgba(248,113,113,0.2)"
        : "rgba(220,38,38,0.15)";
      const loaderColor = "#4ade80";
      const urlColor = isDark ? "#fca5a5" : "#ef4444";
      const textColor = isDark ? "#fff1f2" : "#7f1d1d";

      ctx.clearRect(0, 0, W, H);

      // URL bar
      const pad = 10;
      const urlY = 14;
      const urlH = 20;
      ctx.beginPath();
      ctx.roundRect(pad, urlY, W - pad * 2, urlH, 4);
      ctx.strokeStyle = urlColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cycle which segment is active
      const cycle = 4.5;
      const phase = (t % cycle) / cycle;
      const activeIdx = Math.min(2, Math.floor(phase * 3));

      // Draw URL segments
      ctx.font = "bold 11px var(--font-geist-mono, monospace)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      let cursorX = pad + 8;
      const segmentXs: number[] = [];
      for (let i = 0; i < URL_SEGMENTS.length; i++) {
        const seg = URL_SEGMENTS[i];
        const w = ctx.measureText(seg).width;
        segmentXs.push(cursorX + w / 2);
        if (i <= activeIdx) {
          ctx.fillStyle = urlColor;
          ctx.globalAlpha = i === activeIdx ? 1 : 0.6;
        } else {
          ctx.fillStyle = textColor;
          ctx.globalAlpha = 0.3;
        }
        ctx.fillText(seg, cursorX, urlY + urlH / 2);
        ctx.globalAlpha = 1;
        cursorX += w;
      }

      // Nested boxes (russian doll) — bottom area
      const boxAreaY = urlY + urlH + 12;
      const boxAreaH = H - boxAreaY - 26;
      const outerX = pad + 20;
      const outerW = Math.min(W - pad * 2 - 40, 280);
      const outerH = boxAreaH;

      const levels = [
        {
          x: outerX,
          y: boxAreaY,
          w: outerW,
          h: outerH,
          label: LAYOUT_LABELS[0],
          inset: 0,
        },
        {
          x: outerX + 14,
          y: boxAreaY + 20,
          w: outerW - 28,
          h: outerH - 34,
          label: LAYOUT_LABELS[1],
          inset: 1,
        },
        {
          x: outerX + 28,
          y: boxAreaY + 38,
          w: outerW - 56,
          h: outerH - 60,
          label: LAYOUT_LABELS[2],
          inset: 2,
        },
      ];

      for (let i = 0; i < levels.length; i++) {
        const l = levels[i];
        const isActive = i <= activeIdx;
        ctx.beginPath();
        ctx.roundRect(l.x, l.y, l.w, l.h, 5);
        if (isActive) {
          ctx.fillStyle = activeRoute;
          ctx.fill();
        }
        ctx.strokeStyle = routeColor;
        ctx.globalAlpha = isActive ? 1 : 0.35;
        ctx.lineWidth = i === activeIdx ? 2 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.globalAlpha = isActive ? 1 : 0.4;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(l.label, l.x + 6, l.y + 5);
        ctx.globalAlpha = 1;

        // Line from URL segment to this box when it becomes active
        if (i === activeIdx) {
          ctx.save();
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(segmentXs[i], urlY + urlH);
          ctx.lineTo(l.x + Math.min(60, l.w / 2), l.y);
          ctx.strokeStyle = urlColor;
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      // Loader arrows (parallel) - at bottom
      const dbY = H - 12;
      const dbX = outerX + outerW + 8;
      // DB icon
      ctx.beginPath();
      ctx.ellipse(dbX, dbY - 8, 7, 3, 0, 0, Math.PI * 2);
      ctx.strokeStyle = loaderColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dbX - 7, dbY - 8);
      ctx.lineTo(dbX - 7, dbY - 2);
      ctx.moveTo(dbX + 7, dbY - 8);
      ctx.lineTo(dbX + 7, dbY - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(dbX, dbY - 2, 7, 3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Parallel loader pulses from each active level
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = loaderColor;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("loaders (parallel)", dbX - 12, dbY + 6);

      for (let i = 0; i <= activeIdx; i++) {
        const l = levels[i];
        const fromX = l.x + l.w;
        const fromY = l.y + 10;
        // Animated dash offset — all sync (parallel, not waterfall)
        const pulsePhase = (t * 1.2) % 1;
        const midX = fromX + (dbX - 7 - fromX) * pulsePhase;
        const midY = fromY + (dbY - 8 - fromY) * pulsePhase;

        ctx.save();
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(dbX - 7, dbY - 8);
        ctx.strokeStyle = loaderColor;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(midX, midY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = loaderColor;
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
            startRef.current = 0;
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
