"use client";

import { useEffect, useRef } from "react";

export function HealthcareSoftwareVisualization() {
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

    const patients = [
      { id: "P-4821", hr: 72, bp: "120/80", spo2: 98 },
      { id: "P-3195", hr: 88, bp: "135/90", spo2: 96 },
      { id: "P-7634", hr: 65, bp: "118/76", spo2: 99 },
      { id: "P-2058", hr: 91, bp: "142/88", spo2: 95 },
    ];

    function draw() {
      if (!runningRef.current) return;
      const w = canvas!.getBoundingClientRect().width;
      const h = canvas!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      const dark = document.documentElement.classList.contains("dark");
      const bg = dark ? "#0a0a0a" : "#fafafa";
      const textMain = dark ? "#e5e5e5" : "#171717";
      const textSub = dark ? "#a3a3a3" : "#737373";
      const accent = dark ? "#34d399" : "#10b981";
      const accentFaint = dark
        ? "rgba(52,211,153,0.12)"
        : "rgba(16,185,129,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;
      const patientIdx = Math.floor((frame / CYCLE_FRAMES) % patients.length);
      const patient = patients[patientIdx];

      const stages = ["INTAKE", "PROCESSING", "DASHBOARD"];
      const stageW = w * 0.22;
      const stageH = h * 0.18;
      const stageY = h * 0.12;
      const gap = (w - stageW * 3) / 4;

      for (let i = 0; i < 3; i++) {
        const sx = gap + i * (stageW + gap);
        const isActive = t > i * 0.25 && t < (i + 1) * 0.35 + 0.15;

        ctx!.fillStyle = isActive ? accentFaint : "transparent";
        ctx!.strokeStyle = isActive ? accent : cardBorder;
        ctx!.lineWidth = isActive ? 1.5 : 1;
        ctx!.beginPath();
        ctx!.roundRect(sx, stageY, stageW, stageH, 4);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = isActive ? accent : textSub;
        ctx!.font = `bold 10px ${font}`;
        ctx!.textAlign = "center";
        ctx!.fillText(stages[i], sx + stageW / 2, stageY + stageH / 2 + 4);

        if (i < 2) {
          const arrowX1 = sx + stageW + 4;
          const arrowX2 = sx + stageW + gap - 4;
          const arrowY = stageY + stageH / 2;
          const progress = Math.max(0, Math.min(1, (t - i * 0.25) / 0.15));
          const drawTo = arrowX1 + (arrowX2 - arrowX1) * progress;

          ctx!.strokeStyle = accent;
          ctx!.lineWidth = 1;
          ctx!.globalAlpha = 0.5;
          ctx!.setLineDash([3, 3]);
          ctx!.beginPath();
          ctx!.moveTo(arrowX1, arrowY);
          ctx!.lineTo(drawTo, arrowY);
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.globalAlpha = 1;

          if (progress > 0.8) {
            ctx!.beginPath();
            ctx!.moveTo(drawTo, arrowY);
            ctx!.lineTo(drawTo - 5, arrowY - 3);
            ctx!.lineTo(drawTo - 5, arrowY + 3);
            ctx!.closePath();
            ctx!.fillStyle = accent;
            ctx!.fill();
          }
        }
      }

      const cardW = w * 0.35;
      const cardH = h * 0.42;
      const cardStartX = -cardW - 20;
      const cardEndX = w / 2 - cardW / 2;
      const cardY = h * 0.48;

      let cardX: number;
      let cardAlpha = 1;

      if (t < 0.15) {
        const p = t / 0.15;
        const ease = 1 - (1 - p) ** 3;
        cardX = cardStartX + (cardEndX - cardStartX) * ease;
      } else if (t < 0.7) {
        cardX = cardEndX;
      } else if (t < 0.85) {
        const p = (t - 0.7) / 0.15;
        const ease = p * p * p;
        cardX = cardEndX + (w + 20 - cardEndX) * ease;
      } else {
        cardX = w + 20;
        cardAlpha = 0;
      }

      if (cardAlpha > 0) {
        ctx!.globalAlpha = cardAlpha;
        ctx!.fillStyle = cardBg;
        ctx!.strokeStyle = cardBorder;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.roundRect(cardX, cardY, cardW, cardH, 6);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = accent;
        ctx!.fillRect(cardX, cardY, cardW, 3);

        ctx!.fillStyle = textMain;
        ctx!.font = `bold 12px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(patient.id, cardX + 12, cardY + 22);

        const vitalsY = cardY + 40;
        const vitals = [
          {
            label: "HR",
            value: patient.hr + Math.round(Math.sin(frame * 0.08) * 3),
            unit: "bpm",
          },
          { label: "BP", value: patient.bp, unit: "mmHg" },
          {
            label: "SpO2",
            value: patient.spo2 + (Math.sin(frame * 0.05) > 0.5 ? -1 : 0),
            unit: "%",
          },
        ];

        vitals.forEach((v, i) => {
          const vy = vitalsY + i * 28;
          ctx!.fillStyle = textSub;
          ctx!.font = `10px ${font}`;
          ctx!.fillText(v.label, cardX + 12, vy);

          const pulse =
            t > 0.2 && t < 0.65 ? 0.7 + Math.sin(frame * 0.1 + i) * 0.3 : 1;
          ctx!.globalAlpha = cardAlpha * pulse;
          ctx!.fillStyle = accent;
          ctx!.font = `bold 13px ${font}`;
          ctx!.fillText(`${v.value}`, cardX + 50, vy);
          ctx!.fillStyle = textSub;
          ctx!.font = `10px ${font}`;
          ctx!.fillText(v.unit, cardX + 100, vy);
          ctx!.globalAlpha = cardAlpha;
        });

        if (t > 0.5 && t < 0.85) {
          const statusP = Math.min(1, (t - 0.5) / 0.1);
          ctx!.globalAlpha = cardAlpha * statusP;
          ctx!.fillStyle = accent;
          ctx!.font = `bold 9px ${font}`;
          ctx!.fillText("✓ PROCESSED", cardX + cardW - 90, cardY + 22);
          ctx!.globalAlpha = cardAlpha;
        }

        ctx!.globalAlpha = 1;
      }

      const dashY = h * 0.92;
      const queueCount = Math.floor(t * 8);
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(
        `Queue: ${Math.max(0, 12 - queueCount)} pending  ·  ${queueCount} processed`,
        w / 2,
        dashY
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
