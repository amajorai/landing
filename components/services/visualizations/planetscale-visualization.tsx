"use client";
import { useEffect, useRef } from "react";

// Phases (in frames):
// 0-40: idle, main branch drawn
// 40-80: branch forks off
// 80-130: commits appear on branch (ALTER TABLE)
// 130-170: PR/review marker
// 170-210: merge arrow back to main
// 210-260: deploy check + hold
// 260-300: reset fade
const PHASE_FORK = 40;
const PHASE_COMMITS = 80;
const PHASE_PR = 130;
const PHASE_MERGE = 170;
const PHASE_DEPLOY = 210;
const PHASE_HOLD = 260;
const TOTAL_FRAMES = 300;

export function PlanetscaleVisualization() {
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
      const mainColor = isDark ? "#a1a1aa" : "#52525b";
      const branchColor = isDark ? "#60a5fa" : "#2563eb";
      const mergeColor = "#4ade80";
      const prColor = "#fbbf24";
      const ddlColor = "#4ade80";
      const textColor = isDark ? "#fafafa" : "#18181b";
      const mutedText = isDark ? "#a1a1aa" : "#52525b";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const padX = 30;
      const mainY = H * 0.28;
      const branchY = H * 0.68;
      const forkX = padX + 60;
      const mergeX = W - padX - 60;

      // --- main branch line ---
      ctx.beginPath();
      ctx.moveTo(padX, mainY);
      ctx.lineTo(W - padX, mainY);
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // main label
      ctx.font = "bold 10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("main", padX, mainY - 12);

      // commits on main (before fork)
      const mainDots = [padX + 15, padX + 35, forkX];
      for (const dx of mainDots) {
        ctx.beginPath();
        ctx.arc(dx, mainY, 4, 0, Math.PI * 2);
        ctx.fillStyle = mainColor;
        ctx.fill();
      }

      // --- fork branch line (diagonal then horizontal) ---
      let forkProgress = 0;
      if (frame >= PHASE_FORK) {
        forkProgress = Math.min((frame - PHASE_FORK) / 30, 1);
      }
      if (forkProgress > 0) {
        const diagEndX = forkX + 40;
        const curX = forkX + (diagEndX - forkX) * Math.min(forkProgress * 2, 1);
        const curY = mainY + (branchY - mainY) * Math.min(forkProgress * 2, 1);

        ctx.beginPath();
        ctx.moveTo(forkX, mainY);
        ctx.lineTo(curX, curY);
        if (forkProgress > 0.5) {
          const hx =
            diagEndX + (mergeX - 40 - diagEndX) * (forkProgress - 0.5) * 2;
          ctx.lineTo(hx, branchY);
        }
        ctx.strokeStyle = branchColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // branch label
        if (forkProgress > 0.6) {
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = branchColor;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText("add-users-table", forkX + 42, branchY + 14);
        }
      }

      // --- commits on branch ---
      if (frame >= PHASE_COMMITS) {
        const commitT = Math.min((frame - PHASE_COMMITS) / 40, 1);
        const commitXs = [forkX + 70, forkX + 110, forkX + 150];
        const numVisible = Math.floor(commitT * 3) + 1;
        for (let i = 0; i < Math.min(numVisible, commitXs.length); i++) {
          ctx.beginPath();
          ctx.arc(commitXs[i], branchY, 4, 0, Math.PI * 2);
          ctx.fillStyle = branchColor;
          ctx.fill();
        }

        // ALTER TABLE preview box near branch
        const boxX = forkX + 5;
        const boxY = branchY - 52;
        const boxW = Math.min(160, W * 0.42);
        const boxH = 30;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 4);
        ctx.fillStyle = isDark
          ? "rgba(96,165,250,0.12)"
          : "rgba(37,99,235,0.08)";
        ctx.fill();
        ctx.strokeStyle = branchColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("ALTER TABLE users", boxX + 6, boxY + 10);
        ctx.fillStyle = ddlColor;
        ctx.fillText("+ avatar_url VARCHAR", boxX + 6, boxY + 22);
      }

      // --- PR / review marker ---
      if (frame >= PHASE_PR) {
        const prT = Math.min((frame - PHASE_PR) / 30, 1);
        ctx.globalAlpha = prT;
        const prX = mergeX - 30;
        ctx.beginPath();
        ctx.arc(prX, branchY, 7, 0, Math.PI * 2);
        ctx.fillStyle = prColor;
        ctx.fill();
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = prColor;
        ctx.textAlign = "center";
        ctx.fillText("PR", prX, branchY + 18);
        ctx.fillStyle = mutedText;
        ctx.fillText("Review & Approve", prX, branchY + 30);
        ctx.globalAlpha = 1;
      }

      // --- merge arrow back to main ---
      if (frame >= PHASE_MERGE) {
        const mT = Math.min((frame - PHASE_MERGE) / 30, 1);
        const startX = mergeX - 20;
        const endX = mergeX;
        const curX = startX + (endX - startX) * mT;
        const curY = branchY + (mainY - branchY) * mT;

        ctx.beginPath();
        ctx.moveTo(startX, branchY);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = mergeColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (mT >= 1) {
          // merge dot on main
          ctx.beginPath();
          ctx.arc(mergeX, mainY, 5, 0, Math.PI * 2);
          ctx.fillStyle = mergeColor;
          ctx.fill();
        }
      }

      // --- deploy check ---
      if (frame >= PHASE_DEPLOY) {
        const dT = Math.min((frame - PHASE_DEPLOY) / 30, 1);
        ctx.globalAlpha = dT;
        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = ddlColor;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText("Non-blocking DDL  OK", W - padX, mainY - 14);
        ctx.globalAlpha = 1;
      }

      // fade out in hold (last phase) for loop smoothness
      if (frame >= PHASE_HOLD) {
        const fadeT = (frame - PHASE_HOLD) / (TOTAL_FRAMES - PHASE_HOLD);
        ctx.globalAlpha = 1 - fadeT;
      }

      frameRef.current = (frame + 1) % TOTAL_FRAMES;
      ctx.globalAlpha = 1;

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
