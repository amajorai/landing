"use client";

import { useEffect, useRef } from "react";

export function WebsiteMigrationVisualization() {
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

    const blocks = [
      { label: "Header", h: 0.12 },
      { label: "Hero", h: 0.18 },
      { label: "Features", h: 0.14 },
      { label: "Pricing", h: 0.14 },
      { label: "Footer", h: 0.1 },
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
      const accent = dark ? "#60a5fa" : "#3b82f6";
      const accentFaint = dark
        ? "rgba(96,165,250,0.12)"
        : "rgba(59,130,246,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const dullColor = dark ? "#404040" : "#d4d4d4";
      const dullBg = dark ? "#171717" : "#f0f0f0";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const oldX = w * 0.04;
      const oldW = w * 0.28;
      const newX = w * 0.68;
      const newW = w * 0.28;
      const panelTop = h * 0.12;
      const panelH = h * 0.72;

      const oldAlpha = Math.min(1, t / 0.06);
      ctx!.globalAlpha = oldAlpha;

      ctx!.fillStyle = dullBg;
      ctx!.strokeStyle = dullColor;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.roundRect(oldX, panelTop, oldW, panelH, 6);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = textSub;
      ctx!.font = `bold 9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText("OLD SITE", oldX + oldW / 2, panelTop - 4);

      ctx!.globalAlpha = 1;

      const newPanelAlpha = Math.min(1, Math.max(0, (t - 0.1) / 0.08));
      ctx!.globalAlpha = newPanelAlpha;

      ctx!.fillStyle = cardBg;
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.roundRect(newX, panelTop, newW, panelH, 6);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = accent;
      ctx!.font = `bold 9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText("NEW SITE", newX + newW / 2, panelTop - 4);

      ctx!.globalAlpha = 1;

      const bridgeY = panelTop + panelH / 2;
      const bridgeX1 = oldX + oldW + 8;
      const bridgeX2 = newX - 8;
      const bridgeDrawT = Math.max(0, Math.min(1, (t - 0.15) / 0.1));

      if (bridgeDrawT > 0) {
        const bridgeEnd =
          bridgeX1 + (bridgeX2 - bridgeX1) * easeOut(bridgeDrawT);
        ctx!.strokeStyle = accent;
        ctx!.lineWidth = 2;
        ctx!.globalAlpha = 0.6;
        ctx!.beginPath();
        ctx!.moveTo(bridgeX1, bridgeY);
        ctx!.lineTo(bridgeEnd, bridgeY);
        ctx!.stroke();

        if (bridgeDrawT > 0.7) {
          ctx!.beginPath();
          ctx!.moveTo(bridgeEnd, bridgeY);
          ctx!.lineTo(bridgeEnd - 8, bridgeY - 4);
          ctx!.lineTo(bridgeEnd - 8, bridgeY + 4);
          ctx!.closePath();
          ctx!.fillStyle = accent;
          ctx!.fill();
        }

        ctx!.fillStyle = accent;
        ctx!.font = `8px ${font}`;
        ctx!.textAlign = "center";
        ctx!.globalAlpha = 0.5 * bridgeDrawT;
        ctx!.fillText("MIGRATING", (bridgeX1 + bridgeX2) / 2, bridgeY - 10);
        ctx!.globalAlpha = 1;
      }

      let blockY = panelTop + 8;
      const blockPad = 6;
      const blockInner = oldW - blockPad * 2;

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockH = panelH * block.h;
        const bx = oldX + blockPad;
        const by = blockY;

        const blockAppearT = 0.02 + i * 0.04;
        const blockAlpha = Math.min(1, Math.max(0, (t - blockAppearT) / 0.05));

        const migrateStartT = 0.28 + i * 0.1;
        const migrateProgress = Math.max(
          0,
          Math.min(1, (t - migrateStartT) / 0.12)
        );
        const migrated = migrateProgress >= 1;

        const fadeOut = migrated
          ? Math.max(0.2, 1 - (t - migrateStartT - 0.12) / 0.05)
          : 1;

        ctx!.globalAlpha = blockAlpha * fadeOut;
        ctx!.fillStyle = dullColor;
        ctx!.beginPath();
        ctx!.roundRect(bx, by, blockInner, blockH - 4, 3);
        ctx!.fill();

        ctx!.fillStyle = dark ? "#525252" : "#a3a3a3";
        ctx!.font = `8px ${font}`;
        ctx!.textAlign = "center";
        ctx!.fillText(block.label, bx + blockInner / 2, by + blockH / 2);

        ctx!.globalAlpha = 1;

        if (migrateProgress > 0) {
          const easedMigrate = easeOut(migrateProgress);
          const travX = bx + (newX + blockPad - bx) * easedMigrate;
          const travY = by + (panelTop + 8 + (blockY - panelTop - 8) - by) * 0;

          const colorLerp = easedMigrate;
          const r = Math.round(
            212 * (1 - colorLerp) + (dark ? 96 : 59) * colorLerp
          );
          const g = Math.round(
            212 * (1 - colorLerp) + (dark ? 165 : 130) * colorLerp
          );
          const b = Math.round(
            212 * (1 - colorLerp) + (dark ? 250 : 246) * colorLerp
          );

          ctx!.globalAlpha = migrateProgress < 1 ? 0.9 : 1;
          ctx!.fillStyle = `rgb(${r},${g},${b})`;
          ctx!.beginPath();
          ctx!.roundRect(travX, travY, blockInner, blockH - 4, 3);
          ctx!.fill();

          if (migrated) {
            ctx!.fillStyle = dark ? "#e5e5e5" : "#ffffff";
            ctx!.font = `bold 8px ${font}`;
            ctx!.textAlign = "center";
            ctx!.fillText(
              block.label,
              newX + blockPad + blockInner / 2,
              by + blockH / 2
            );
          }

          ctx!.globalAlpha = 1;
        }

        blockY += blockH;
      }

      const allMigrated = t > 0.28 + (blocks.length - 1) * 0.1 + 0.12;
      if (allMigrated) {
        const labelAlpha = Math.min(1, (t - 0.85) / 0.08);
        if (labelAlpha > 0) {
          ctx!.globalAlpha = labelAlpha;
          ctx!.fillStyle = accent;
          ctx!.font = `bold 11px ${font}`;
          ctx!.textAlign = "center";
          ctx!.fillText("✓ MIGRATED", newX + newW / 2, panelTop + panelH + 18);
          ctx!.globalAlpha = 1;
        }
      }

      const migratedCount = blocks.filter(
        (_, i) => t > 0.28 + i * 0.1 + 0.12
      ).length;
      const footY = h * 0.95;
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(
        `${migratedCount}/${blocks.length} sections migrated`,
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
