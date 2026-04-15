"use client";

import { useEffect, useRef } from "react";

export function EducationSoftwareVisualization() {
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

    const modules = [
      { name: "Intro to React", score: 92 },
      { name: "State & Props", score: 87 },
      { name: "Hooks Deep Dive", score: 95 },
      { name: "Testing Patterns", score: 88 },
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
      const accent = dark ? "#818cf8" : "#6366f1";
      const accentFaint = dark
        ? "rgba(129,140,248,0.12)"
        : "rgba(99,102,241,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const lockColor = dark ? "#525252" : "#a3a3a3";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const listX = w * 0.06;
      const listW = w * 0.48;
      const moduleH = h * 0.16;
      const moduleGap = h * 0.03;
      const listTop = h * 0.08;

      for (let i = 0; i < modules.length; i++) {
        const mod = modules[i];
        const unlockT = i * 0.15;
        const unlocked = t > unlockT;
        const unlockAlpha = Math.min(1, Math.max(0, (t - unlockT) / 0.08));

        const my = listTop + i * (moduleH + moduleGap);

        ctx!.fillStyle = unlocked ? cardBg : bg;
        ctx!.strokeStyle = unlocked ? accent : cardBorder;
        ctx!.lineWidth = unlocked ? 1.2 : 0.8;
        ctx!.globalAlpha = unlocked ? unlockAlpha : 0.4;
        ctx!.beginPath();
        ctx!.roundRect(listX, my, listW, moduleH, 5);
        ctx!.fill();
        ctx!.stroke();
        ctx!.globalAlpha = 1;

        if (unlocked) {
          ctx!.fillStyle = accent;
          ctx!.font = `11px ${font}`;
          ctx!.textAlign = "left";
          ctx!.fillText("✓", listX + 10, my + 18);
        } else {
          ctx!.fillStyle = lockColor;
          ctx!.font = `12px ${font}`;
          ctx!.textAlign = "center";
          ctx!.globalAlpha = 0.4;
          ctx!.fillText("🔒", listX + 16, my + moduleH / 2 + 4);
          ctx!.globalAlpha = 1;
        }

        ctx!.fillStyle = unlocked ? textMain : textSub;
        ctx!.font = `${unlocked ? "bold " : ""}10px ${font}`;
        ctx!.textAlign = "left";
        ctx!.globalAlpha = unlocked ? unlockAlpha : 0.4;
        ctx!.fillText(`${i + 1}. ${mod.name}`, listX + 28, my + 18);
        ctx!.globalAlpha = 1;

        if (unlocked) {
          const barT = unlockT + 0.08;
          const barProgress = Math.max(0, Math.min(1, (t - barT) / 0.12));
          const easedBar = easeOut(barProgress);

          const barX = listX + 28;
          const barY = my + 28;
          const barW = listW - 50;
          const barH = 6;

          ctx!.fillStyle = cardBorder;
          ctx!.beginPath();
          ctx!.roundRect(barX, barY, barW, barH, 3);
          ctx!.fill();

          ctx!.fillStyle = accent;
          ctx!.beginPath();
          ctx!.roundRect(barX, barY, barW * easedBar, barH, 3);
          ctx!.fill();

          if (barProgress > 0.5) {
            ctx!.fillStyle = textSub;
            ctx!.font = `9px ${font}`;
            ctx!.textAlign = "right";
            ctx!.fillText(
              `${Math.round(100 * easedBar)}%`,
              listX + listW - 12,
              barY + 6
            );
          }

          const scoreT = barT + 0.12;
          const scoreAlpha = Math.max(0, Math.min(1, (t - scoreT) / 0.06));
          if (scoreAlpha > 0) {
            ctx!.globalAlpha = scoreAlpha;
            ctx!.fillStyle = accent;
            ctx!.font = `bold 10px ${font}`;
            ctx!.textAlign = "right";
            ctx!.fillText(
              `Score: ${mod.score}`,
              listX + listW - 12,
              my + moduleH - 8
            );
            ctx!.globalAlpha = 1;
          }
        }
      }

      const certT = 0.72;
      const certAlpha = Math.max(0, Math.min(1, (t - certT) / 0.1));

      if (certAlpha > 0) {
        const certX = w * 0.58;
        const certW = w * 0.36;
        const certH = h * 0.55;
        const certY = h * 0.15;
        const slideOffset = (1 - easeOut(certAlpha)) * 30;

        ctx!.globalAlpha = certAlpha;
        ctx!.fillStyle = cardBg;
        ctx!.strokeStyle = accent;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.roundRect(certX + slideOffset, certY, certW, certH, 8);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = accent;
        ctx!.fillRect(certX + slideOffset, certY, certW, 4);

        ctx!.fillStyle = textSub;
        ctx!.font = `9px ${font}`;
        ctx!.textAlign = "center";
        const cx = certX + slideOffset + certW / 2;
        ctx!.fillText("CERTIFICATE OF COMPLETION", cx, certY + 30);

        ctx!.fillStyle = textMain;
        ctx!.font = `bold 13px ${font}`;
        ctx!.fillText("React Mastery", cx, certY + 55);

        ctx!.fillStyle = textSub;
        ctx!.font = `10px ${font}`;
        ctx!.fillText("4 Modules Completed", cx, certY + 75);

        const avgScore = Math.round(
          modules.reduce((s, m) => s + m.score, 0) / modules.length
        );
        ctx!.fillStyle = accent;
        ctx!.font = `bold 28px ${font}`;
        ctx!.fillText(`${avgScore}%`, cx, certY + certH * 0.6);

        ctx!.fillStyle = textSub;
        ctx!.font = `9px ${font}`;
        ctx!.fillText("Average Score", cx, certY + certH * 0.6 + 18);

        if (t > 0.85) {
          const starAlpha = Math.min(1, (t - 0.85) / 0.08);
          ctx!.globalAlpha = certAlpha * starAlpha;
          ctx!.fillStyle = accent;
          ctx!.font = `16px ${font}`;
          ctx!.fillText("★ ★ ★", cx, certY + certH - 20);
        }

        ctx!.globalAlpha = 1;
      }

      const overallProgress = Math.min(1, t / 0.7);
      const footY = h * 0.92;
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(
        `Course progress: ${Math.round(overallProgress * 100)}%  ·  ${Math.round(overallProgress * 4)}/4 modules`,
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
