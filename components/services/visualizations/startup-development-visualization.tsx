"use client";

import { useEffect, useRef } from "react";

export function StartupDevelopmentVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE_FRAMES = 390;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const cards = [
      { label: "Auth flow", points: 5 },
      { label: "Dashboard", points: 8 },
      { label: "API layer", points: 3 },
      { label: "Payments", points: 8 },
      { label: "Analytics", points: 5 },
    ];

    const columns = ["BACKLOG", "SPRINT", "DONE"];

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
      const accent = dark ? "#f472b6" : "#ec4899";
      const accentFaint = dark
        ? "rgba(244,114,182,0.12)"
        : "rgba(236,72,153,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const arcCx = w / 2;
      const arcCy = h * 0.12;
      const arcR = Math.min(w * 0.12, h * 0.1);

      const sprintProgress = Math.max(0, Math.min(1, t / 0.85));

      ctx!.strokeStyle = cardBorder;
      ctx!.lineWidth = 3;
      ctx!.beginPath();
      ctx!.arc(arcCx, arcCy, arcR, Math.PI, 2 * Math.PI);
      ctx!.stroke();

      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 3;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      ctx!.arc(arcCx, arcCy, arcR, Math.PI, Math.PI + Math.PI * sprintProgress);
      ctx!.stroke();
      ctx!.lineCap = "butt";

      ctx!.fillStyle = accent;
      ctx!.font = `bold 12px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(`${Math.round(sprintProgress * 100)}%`, arcCx, arcCy + 5);

      ctx!.fillStyle = textSub;
      ctx!.font = `8px ${font}`;
      ctx!.fillText("SPRINT 1", arcCx, arcCy + 16);

      const boardTop = h * 0.28;
      const boardH = h * 0.62;
      const colW = w * 0.28;
      const colGap = (w - colW * 3) / 4;
      const cardH = boardH * 0.16;
      const cardGap = 6;

      for (let c = 0; c < 3; c++) {
        const cx = colGap + c * (colW + colGap);

        ctx!.fillStyle = textSub;
        ctx!.font = `bold 9px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(columns[c], cx, boardTop - 4);

        ctx!.strokeStyle = cardBorder;
        ctx!.lineWidth = 0.5;
        ctx!.setLineDash([2, 3]);
        ctx!.beginPath();
        ctx!.roundRect(cx - 2, boardTop, colW + 4, boardH, 4);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        const toSprintT = 0.08 + i * 0.1;
        const toDoneT = toSprintT + 0.35;

        let col: number;
        let moveProgress = 0;

        if (t < toSprintT) {
          col = 0;
        } else if (t < toSprintT + 0.08) {
          col = 0;
          moveProgress = (t - toSprintT) / 0.08;
        } else if (t < toDoneT) {
          col = 1;
        } else if (t < toDoneT + 0.08) {
          col = 1;
          moveProgress = (t - toDoneT) / 0.08;
        } else {
          col = 2;
        }

        const backlogX = colGap + 0 * (colW + colGap);
        const sprintX = colGap + 1 * (colW + colGap);
        const doneX = colGap + 2 * (colW + colGap);

        let cardX: number;
        let slotInCol: number;

        if (col === 0 && moveProgress > 0) {
          const easedMove = easeOut(moveProgress);
          cardX = backlogX + (sprintX - backlogX) * easedMove;
          slotInCol = i;
        } else if (col === 1 && moveProgress > 0) {
          const easedMove = easeOut(moveProgress);
          cardX = sprintX + (doneX - sprintX) * easedMove;
          slotInCol = cards.filter((_, j) => {
            const jToSprintT = 0.08 + j * 0.1;
            const jToDoneT = jToSprintT + 0.35;
            return j < i && t >= jToSprintT + 0.08 && t < jToDoneT;
          }).length;
        } else {
          cardX = colGap + col * (colW + colGap);

          if (col === 0) {
            slotInCol = cards.filter((_, j) => {
              const jT = 0.08 + j * 0.1;
              return j < i && t < jT;
            }).length;
          } else if (col === 1) {
            slotInCol = cards.filter((_, j) => {
              const jToSprintT = 0.08 + j * 0.1;
              const jToDoneT = jToSprintT + 0.35;
              return j < i && t >= jToSprintT + 0.08 && t < jToDoneT;
            }).length;
          } else {
            slotInCol = cards.filter((_, j) => {
              const jToDoneT = 0.08 + j * 0.1 + 0.35 + 0.08;
              return j < i && t >= jToDoneT;
            }).length;
          }
        }

        const cardY = boardTop + 8 + slotInCol * (cardH + cardGap);

        const isDone = col === 2 && moveProgress === 0;
        const isMoving = moveProgress > 0;

        ctx!.fillStyle = isDone ? accentFaint : cardBg;
        ctx!.strokeStyle = isDone ? accent : isMoving ? accent : cardBorder;
        ctx!.lineWidth = isMoving ? 1.5 : 1;
        ctx!.beginPath();
        ctx!.roundRect(cardX + 3, cardY, colW - 6, cardH, 4);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = textMain;
        ctx!.font = `10px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(card.label, cardX + 10, cardY + cardH / 2 - 2);

        ctx!.fillStyle = accent;
        ctx!.font = `bold 9px ${font}`;
        ctx!.textAlign = "right";
        ctx!.fillText(
          `${card.points}pt`,
          cardX + colW - 12,
          cardY + cardH / 2 - 2
        );

        if (isDone) {
          ctx!.fillStyle = accent;
          ctx!.font = `9px ${font}`;
          ctx!.textAlign = "right";
          ctx!.fillText("✓", cardX + colW - 12, cardY + cardH / 2 + 10);
        }
      }

      if (t > 0.9) {
        const completeAlpha = Math.min(1, (t - 0.9) / 0.06);
        ctx!.globalAlpha = completeAlpha;
        ctx!.fillStyle = accent;
        ctx!.font = `bold 10px ${font}`;
        ctx!.textAlign = "center";
        ctx!.fillText("✓ SPRINT COMPLETE", w / 2, h * 0.95);
        ctx!.globalAlpha = 1;
      } else {
        const totalPoints = cards.reduce((s, c) => s + c.points, 0);
        const donePoints = cards
          .filter((_, i) => {
            const toDoneT = 0.08 + i * 0.1 + 0.35 + 0.08;
            return t >= toDoneT;
          })
          .reduce((s, c) => s + c.points, 0);

        ctx!.fillStyle = textSub;
        ctx!.font = `9px ${font}`;
        ctx!.textAlign = "center";
        ctx!.fillText(
          `${donePoints}/${totalPoints} points completed`,
          w / 2,
          h * 0.95
        );
      }

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
