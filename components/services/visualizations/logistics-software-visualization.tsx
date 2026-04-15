"use client";

import { useEffect, useRef } from "react";

export function LogisticsSoftwareVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE_FRAMES = 360;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const deliveryPoints = [
      { x: 0.72, y: 0.2 },
      { x: 0.85, y: 0.35 },
      { x: 0.78, y: 0.55 },
      { x: 0.9, y: 0.7 },
      { x: 0.65, y: 0.75 },
      { x: 0.75, y: 0.88 },
    ];

    function easeInOut(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    }

    function draw() {
      if (!runningRef.current) return;
      const w = canvas!.getBoundingClientRect().width;
      const h = canvas!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      const dark = document.documentElement.classList.contains("dark");
      const bg = dark ? "#0a0a0a" : "#fafafa";
      const textMain = dark ? "#e5e5e5" : "#171717";
      const textSub = dark ? "#a3a3a3" : "#737373";
      const accent = dark ? "#94a3b8" : "#64748b";
      const accentBright = dark ? "#cbd5e1" : "#475569";
      const accentFaint = dark
        ? "rgba(148,163,184,0.12)"
        : "rgba(100,116,139,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const successColor = dark ? "#4ade80" : "#22c55e";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const whX = w * 0.08;
      const whY = h * 0.3;
      const whW = w * 0.2;
      const whH = h * 0.35;

      const whAlpha = Math.min(1, t / 0.08);
      ctx!.globalAlpha = whAlpha;

      ctx!.fillStyle = cardBg;
      ctx!.strokeStyle = accentBright;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.roundRect(whX, whY, whW, whH, 6);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = accent;
      ctx!.fillRect(whX, whY, whW, 3);

      ctx!.fillStyle = textMain;
      ctx!.font = `bold 10px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText("WAREHOUSE", whX + whW / 2, whY + 20);

      const boxRows = 3;
      const boxCols = 3;
      const boxSize = 10;
      const boxGap = 6;
      const boxStartX =
        whX + (whW - (boxCols * (boxSize + boxGap) - boxGap)) / 2;
      const boxStartY = whY + 32;

      for (let r = 0; r < boxRows; r++) {
        for (let c = 0; c < boxCols; c++) {
          const bx = boxStartX + c * (boxSize + boxGap);
          const by = boxStartY + r * (boxSize + boxGap);
          const idx = r * boxCols + c;
          const dispatched = t > 0.3 && idx < Math.floor((t - 0.3) / 0.06);

          ctx!.fillStyle = dispatched ? accentFaint : accent;
          ctx!.globalAlpha = whAlpha * (dispatched ? 0.3 : 0.6);
          ctx!.fillRect(bx, by, boxSize, boxSize);
          ctx!.globalAlpha = whAlpha;
        }
      }

      const statusText =
        t < 0.15
          ? "Initializing..."
          : t < 0.3
            ? "Optimizing routes"
            : t < 0.8
              ? "Dispatching"
              : "Batch complete";
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.fillText(statusText, whX + whW / 2, whY + whH - 10);

      ctx!.globalAlpha = 1;

      for (let i = 0; i < deliveryPoints.length; i++) {
        const dp = deliveryPoints[i];
        const px = dp.x * w;
        const py = dp.y * h;

        const routeT = 0.15 + i * 0.05;
        const routeDrawProgress = Math.max(0, Math.min(1, (t - routeT) / 0.12));

        if (routeDrawProgress > 0) {
          const fromX = whX + whW;
          const fromY = whY + whH / 2;
          const midX = (fromX + px) / 2 + (i % 2 === 0 ? 20 : -10);
          const midY = (fromY + py) / 2;

          ctx!.strokeStyle = accent;
          ctx!.lineWidth = 1;
          ctx!.globalAlpha = 0.3;
          ctx!.setLineDash([3, 4]);
          ctx!.beginPath();
          ctx!.moveTo(fromX, fromY);

          const steps = Math.floor(routeDrawProgress * 20);
          for (let s = 1; s <= steps; s++) {
            const st = s / 20;
            const cx =
              (1 - st) * (1 - st) * fromX +
              2 * (1 - st) * st * midX +
              st * st * px;
            const cy =
              (1 - st) * (1 - st) * fromY +
              2 * (1 - st) * st * midY +
              st * st * py;
            ctx!.lineTo(cx, cy);
          }
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.globalAlpha = 1;
        }

        const dotRevealT = routeT + 0.1;
        const dotAlpha = Math.max(0, Math.min(1, (t - dotRevealT) / 0.05));

        if (dotAlpha > 0) {
          ctx!.globalAlpha = dotAlpha;
          ctx!.fillStyle = accentFaint;
          ctx!.beginPath();
          ctx!.arc(px, py, 12, 0, Math.PI * 2);
          ctx!.fill();

          ctx!.fillStyle = accent;
          ctx!.beginPath();
          ctx!.arc(px, py, 4, 0, Math.PI * 2);
          ctx!.fill();

          ctx!.fillStyle = textSub;
          ctx!.font = `8px ${font}`;
          ctx!.textAlign = "center";
          ctx!.fillText(`D-${i + 1}`, px, py + 20);
        }

        const packageT = 0.35 + i * 0.07;
        const packageProgress = Math.max(0, Math.min(1, (t - packageT) / 0.15));

        if (packageProgress > 0 && packageProgress < 1) {
          const fromX = whX + whW;
          const fromY = whY + whH / 2;
          const midX = (fromX + px) / 2 + (i % 2 === 0 ? 20 : -10);
          const midY = (fromY + py) / 2;
          const eased = easeInOut(packageProgress);

          const pkgX =
            (1 - eased) * (1 - eased) * fromX +
            2 * (1 - eased) * eased * midX +
            eased * eased * px;
          const pkgY =
            (1 - eased) * (1 - eased) * fromY +
            2 * (1 - eased) * eased * midY +
            eased * eased * py;

          ctx!.fillStyle = accentBright;
          ctx!.beginPath();
          ctx!.roundRect(pkgX - 5, pkgY - 5, 10, 10, 2);
          ctx!.fill();
        }

        const deliveredT = packageT + 0.15;
        const deliveredAlpha = Math.max(
          0,
          Math.min(1, (t - deliveredT) / 0.05)
        );

        if (deliveredAlpha > 0) {
          ctx!.globalAlpha = deliveredAlpha;
          ctx!.fillStyle = successColor;
          ctx!.font = `bold 11px ${font}`;
          ctx!.textAlign = "center";
          ctx!.fillText("✓", px, py + 5);
          ctx!.globalAlpha = 1;
        }

        ctx!.globalAlpha = 1;
      }

      const delivered = deliveryPoints.filter(
        (_, i) => t > 0.35 + i * 0.07 + 0.15
      ).length;
      const footY = h * 0.95;
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(
        `${delivered}/${deliveryPoints.length} delivered  ·  Route optimized`,
        w / 2,
        footY
      );

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          draw();
        } else {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
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
