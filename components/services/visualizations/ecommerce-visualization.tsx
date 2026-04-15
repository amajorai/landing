"use client";

import { useEffect, useRef } from "react";

export function EcommerceVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE_FRAMES = 330;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const funnelStages = [
      { label: "VISITORS", count: 12_480, width: 1.0 },
      { label: "BROWSE", count: 8340, width: 0.78 },
      { label: "CART", count: 3120, width: 0.52 },
      { label: "CHECKOUT", count: 1560, width: 0.34 },
      { label: "PURCHASE", count: 624, width: 0.2 },
    ];

    function easeOut(x: number) {
      return 1 - (1 - x) ** 3;
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
      const accent = dark ? "#fb923c" : "#f97316";
      const accentFaint = dark
        ? "rgba(251,146,60,0.15)"
        : "rgba(249,115,22,0.1)";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const funnelX = w * 0.15;
      const funnelW = w * 0.45;
      const funnelTop = h * 0.1;
      const stageH = h * 0.15;
      const stageGap = h * 0.02;

      for (let i = 0; i < funnelStages.length; i++) {
        const stage = funnelStages[i];
        const stageRevealT = i * 0.12;
        const fillProgress = Math.max(
          0,
          Math.min(1, (t - stageRevealT) / 0.15)
        );
        const easedFill = easeOut(fillProgress);

        if (easedFill <= 0) continue;

        const sy = funnelTop + i * (stageH + stageGap);
        const barMaxW = funnelW * stage.width;
        const barX = funnelX + (funnelW - barMaxW) / 2;
        const barCurrentW = barMaxW * easedFill;

        ctx!.fillStyle = accentFaint;
        ctx!.beginPath();
        ctx!.roundRect(barX, sy, barMaxW, stageH, 3);
        ctx!.fill();

        ctx!.fillStyle = accent;
        ctx!.globalAlpha = 0.25 + 0.15 * (1 - i / funnelStages.length);
        ctx!.beginPath();
        ctx!.roundRect(barX, sy, barCurrentW, stageH, 3);
        ctx!.fill();
        ctx!.globalAlpha = 1;

        ctx!.strokeStyle = cardBorder;
        ctx!.lineWidth = 0.5;
        ctx!.beginPath();
        ctx!.roundRect(barX, sy, barMaxW, stageH, 3);
        ctx!.stroke();

        ctx!.fillStyle = textMain;
        ctx!.font = `bold 10px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(stage.label, barX + 8, sy + stageH / 2 - 4);

        const countRevealT = stageRevealT + 0.12;
        const countProgress = Math.max(
          0,
          Math.min(1, (t - countRevealT) / 0.1)
        );
        const displayCount = Math.round(stage.count * easeOut(countProgress));

        if (countProgress > 0) {
          ctx!.fillStyle = accent;
          ctx!.font = `bold 12px ${font}`;
          ctx!.textAlign = "right";
          ctx!.fillText(
            displayCount.toLocaleString(),
            barX + barMaxW - 8,
            sy + stageH / 2 - 4
          );

          if (i > 0) {
            const rate = (
              (stage.count / funnelStages[i - 1].count) *
              100
            ).toFixed(1);
            ctx!.fillStyle = textSub;
            ctx!.font = `9px ${font}`;
            ctx!.fillText(`${rate}%`, barX + barMaxW - 8, sy + stageH / 2 + 10);
          }
        }
      }

      const metricsX = w * 0.68;
      const metricsW = w * 0.26;
      const metricsRevealT = 0.6;
      const metricsAlpha = Math.max(0, Math.min(1, (t - metricsRevealT) / 0.1));

      if (metricsAlpha > 0) {
        ctx!.globalAlpha = metricsAlpha;

        const convRate = (624 / 12_480) * 100;
        const avgOrder = 87.5;
        const revenue = 624 * avgOrder;

        const metrics = [
          { label: "CONVERSION", value: `${convRate.toFixed(1)}%` },
          { label: "AVG ORDER", value: `$${avgOrder.toFixed(2)}` },
          {
            label: "REVENUE",
            value: `$${Math.round(revenue).toLocaleString()}`,
          },
        ];

        metrics.forEach((m, i) => {
          const my = funnelTop + 10 + i * (h * 0.22);

          ctx!.fillStyle = textSub;
          ctx!.font = `9px ${font}`;
          ctx!.textAlign = "left";
          ctx!.fillText(m.label, metricsX, my);

          const valueReveal = Math.max(
            0,
            Math.min(1, (t - metricsRevealT - i * 0.06) / 0.1)
          );
          if (valueReveal > 0) {
            ctx!.globalAlpha = metricsAlpha * valueReveal;
            ctx!.fillStyle = accent;
            ctx!.font = `bold 18px ${font}`;
            ctx!.fillText(m.value, metricsX, my + 22);
            ctx!.globalAlpha = metricsAlpha;
          }

          ctx!.strokeStyle = cardBorder;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(metricsX, my + 32);
          ctx!.lineTo(metricsX + metricsW, my + 32);
          ctx!.stroke();
        });

        if (t > 0.8) {
          const pulseAlpha = 0.5 + Math.sin(frame * 0.08) * 0.3;
          ctx!.globalAlpha = metricsAlpha * pulseAlpha;
          ctx!.fillStyle = accent;
          ctx!.beginPath();
          ctx!.arc(metricsX + metricsW - 6, funnelTop + 5, 4, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = metricsAlpha;
          ctx!.fillStyle = textSub;
          ctx!.font = `8px ${font}`;
          ctx!.textAlign = "right";
          ctx!.fillText("LIVE", metricsX + metricsW - 14, funnelTop + 8);
        }

        ctx!.globalAlpha = 1;
      }

      const footY = h * 0.94;
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText("Funnel analytics · Real-time", w / 2, footY);

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
