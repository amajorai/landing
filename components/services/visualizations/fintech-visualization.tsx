"use client";

import { useEffect, useRef } from "react";

export function FintechVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE_FRAMES = 300;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const transactions = [
      { id: "TXN-8841", amount: 2450.0, from: "Acme Corp" },
      { id: "TXN-3327", amount: 18_900.5, from: "GlobalTech" },
      { id: "TXN-5519", amount: 750.25, from: "Smith LLC" },
      { id: "TXN-9102", amount: 34_200.0, from: "FinGroup" },
    ];

    const stages = ["KYC", "AML", "PROCESS", "SETTLE"];
    let runningBalance = 0;

    function draw() {
      if (!runningRef.current) return;
      const w = canvas!.getBoundingClientRect().width;
      const h = canvas!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      const dark = document.documentElement.classList.contains("dark");
      const bg = dark ? "#0a0a0a" : "#fafafa";
      const textMain = dark ? "#e5e5e5" : "#171717";
      const textSub = dark ? "#a3a3a3" : "#737373";
      const accent = dark ? "#4ade80" : "#22c55e";
      const accentFaint = dark
        ? "rgba(74,222,128,0.12)"
        : "rgba(34,197,94,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const errorColor = dark ? "#f87171" : "#ef4444";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;
      const txIdx = Math.floor((frame / CYCLE_FRAMES) % transactions.length);
      const tx = transactions[txIdx];

      if (t < 0.01) {
        runningBalance = transactions
          .slice(0, txIdx)
          .reduce((s, tr) => s + tr.amount, 0);
      }

      const stageW = w * 0.16;
      const stageH = h * 0.2;
      const pipeY = h * 0.15;
      const totalStageWidth = stageW * 4;
      const stageGap = (w * 0.85 - totalStageWidth) / 3;
      const startX = w * 0.075;

      for (let i = 0; i < 4; i++) {
        const sx = startX + i * (stageW + stageGap);
        const stageT = i * 0.2;
        const isActive = t > stageT && t < stageT + 0.25;
        const isDone = t > stageT + 0.2;

        ctx!.fillStyle = isActive ? accentFaint : "transparent";
        ctx!.strokeStyle = isDone ? accent : isActive ? accent : cardBorder;
        ctx!.lineWidth = isActive ? 1.5 : 1;
        ctx!.beginPath();
        ctx!.roundRect(sx, pipeY, stageW, stageH, 4);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = isDone ? accent : isActive ? textMain : textSub;
        ctx!.font = `bold 10px ${font}`;
        ctx!.textAlign = "center";
        ctx!.fillText(stages[i], sx + stageW / 2, pipeY + stageH / 2 - 2);

        if (isDone) {
          ctx!.fillStyle = accent;
          ctx!.font = `bold 14px ${font}`;
          ctx!.fillText("✓", sx + stageW / 2, pipeY + stageH / 2 + 16);
        }

        if (i < 3) {
          const ax1 = sx + stageW + 2;
          const ax2 = sx + stageW + stageGap - 2;
          const ay = pipeY + stageH / 2;
          const lineProgress = Math.max(
            0,
            Math.min(1, (t - stageT - 0.15) / 0.08)
          );

          ctx!.strokeStyle = accent;
          ctx!.lineWidth = 1;
          ctx!.globalAlpha = 0.4;
          ctx!.setLineDash([2, 2]);
          ctx!.beginPath();
          ctx!.moveTo(ax1, ay);
          ctx!.lineTo(ax1 + (ax2 - ax1) * lineProgress, ay);
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.globalAlpha = 1;
        }
      }

      const txCardW = w * 0.5;
      const txCardH = h * 0.22;
      const txCardX = w / 2 - txCardW / 2;
      const txCardY = h * 0.48;

      let txAlpha = 1;
      if (t < 0.08) txAlpha = t / 0.08;
      else if (t > 0.88) txAlpha = Math.max(0, (1 - t) / 0.12);

      ctx!.globalAlpha = txAlpha;
      ctx!.fillStyle = cardBg;
      ctx!.strokeStyle = cardBorder;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.roundRect(txCardX, txCardY, txCardW, txCardH, 6);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = textMain;
      ctx!.font = `bold 11px ${font}`;
      ctx!.textAlign = "left";
      ctx!.fillText(tx.id, txCardX + 12, txCardY + 20);

      ctx!.fillStyle = textSub;
      ctx!.font = `10px ${font}`;
      ctx!.fillText(`From: ${tx.from}`, txCardX + 12, txCardY + 38);

      ctx!.fillStyle = accent;
      ctx!.font = `bold 14px ${font}`;
      ctx!.textAlign = "right";
      ctx!.fillText(
        `$${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        txCardX + txCardW - 12,
        txCardY + 20
      );

      if (t > 0.75) {
        const settleAlpha = Math.min(1, (t - 0.75) / 0.1);
        ctx!.globalAlpha = txAlpha * settleAlpha;
        ctx!.fillStyle = accent;
        ctx!.font = `bold 10px ${font}`;
        ctx!.textAlign = "right";
        ctx!.fillText("SETTLED", txCardX + txCardW - 12, txCardY + 40);
      }
      ctx!.globalAlpha = 1;

      const balY = h * 0.88;
      const currentBalance =
        t > 0.8
          ? runningBalance + tx.amount * Math.min(1, (t - 0.8) / 0.1)
          : runningBalance;

      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "left";
      ctx!.fillText("RUNNING BALANCE", w * 0.075, balY);

      ctx!.fillStyle = accent;
      ctx!.font = `bold 13px ${font}`;
      ctx!.fillText(
        `$${currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        w * 0.075 + 130,
        balY
      );

      const barW = w * 0.3;
      const barH = 4;
      const barX = w - w * 0.075 - barW;
      ctx!.fillStyle = cardBorder;
      ctx!.fillRect(barX, balY - 8, barW, barH);
      ctx!.fillStyle = accent;
      ctx!.fillRect(barX, balY - 8, barW * Math.min(t / 0.85, 1), barH);

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
