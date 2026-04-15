"use client";

import { useEffect, useRef } from "react";

export function VercelVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE = 360; // ~6 seconds at 60fps

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function draw() {
      if (!(ctx && canvas)) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dark = isDark();
      const t = (frame % CYCLE) / CYCLE;

      ctx.clearRect(0, 0, w, h);
      ctx.font = "11px var(--font-geist-mono, monospace)";

      const fg = dark ? "#e5e5e5" : "#171717";
      const muted = dark ? "#525252" : "#a3a3a3";
      const accent = dark ? "#fafafa" : "#000000";
      const bg = dark ? "#0a0a0a" : "#ffffff";
      const stageBg = dark ? "#1a1a1a" : "#f5f5f5";
      const barBg = dark ? "#262626" : "#e5e5e5";

      const commitHash = "a3f7c2d";
      const stages = ["Build", "Deploy", "Edge"];
      const stageW = Math.min(90, w * 0.14);
      const stageH = 40;
      const stageGap = Math.min(40, w * 0.06);
      const totalStagesW =
        stages.length * stageW + (stages.length - 1) * stageGap;
      const startX = (w - totalStagesW) / 2;
      const stageY = h * 0.35;

      // Phase timing
      const pCommit = 0.08;
      const pBuild = 0.3;
      const pDeploy = 0.5;
      const pEdge = 0.7;
      const pLive = 0.85;

      // Commit hash appearance
      const commitAlpha =
        t < pCommit
          ? t / pCommit
          : t > pLive + 0.1
            ? Math.max(0, 1 - (t - pLive - 0.1) / 0.05)
            : 1;
      if (commitAlpha > 0) {
        ctx.globalAlpha = commitAlpha;
        ctx.fillStyle = fg;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13px var(--font-geist-mono, monospace)";
        ctx.fillText(commitHash, startX - 30, stageY + stageH / 2);
        ctx.font = "11px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = 1;
      }

      // Draw connecting lines between commit and stages, and between stages
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      if (t > pCommit * 0.5) {
        ctx.beginPath();
        ctx.moveTo(startX - 10, stageY + stageH / 2);
        ctx.lineTo(startX, stageY + stageH / 2);
        ctx.stroke();
      }

      for (let i = 0; i < stages.length - 1; i++) {
        const x1 = startX + (i + 1) * stageW + i * stageGap;
        const x2 = x1 + stageGap;
        ctx.beginPath();
        ctx.moveTo(x1, stageY + stageH / 2);
        ctx.lineTo(x2, stageY + stageH / 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw stage boxes with progress bars
      for (let i = 0; i < stages.length; i++) {
        const sx = startX + i * (stageW + stageGap);

        let progress = 0;
        let active = false;
        if (i === 0) {
          progress = Math.max(
            0,
            Math.min(1, (t - pCommit) / (pBuild - pCommit))
          );
          active = t >= pCommit && t < pBuild + 0.03;
        } else if (i === 1) {
          progress = Math.max(
            0,
            Math.min(1, (t - pBuild) / (pDeploy - pBuild))
          );
          active = t >= pBuild && t < pDeploy + 0.03;
        } else {
          progress = Math.max(
            0,
            Math.min(1, (t - pDeploy) / (pEdge - pDeploy))
          );
          active = t >= pDeploy && t < pEdge + 0.03;
        }

        // Stage box
        ctx.fillStyle = stageBg;
        ctx.strokeStyle = active ? accent : muted;
        ctx.lineWidth = active ? 1.5 : 0.5;
        ctx.beginPath();
        ctx.roundRect(sx, stageY, stageW, stageH, 4);
        ctx.fill();
        ctx.stroke();

        // Stage label
        ctx.fillStyle = fg;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stages[i], sx + stageW / 2, stageY + 14);

        // Progress bar
        const barX = sx + 8;
        const barY = stageY + stageH - 14;
        const barW = stageW - 16;
        const barH = 4;

        ctx.fillStyle = barBg;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 2);
        ctx.fill();

        if (progress > 0) {
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.roundRect(barX, barY, barW * progress, barH, 2);
          ctx.fill();
        }
      }

      // Edge network - dots around circle
      if (t > pEdge) {
        const edgeProgress = Math.min(1, (t - pEdge) / (pLive - pEdge));
        const cx = w / 2;
        const cy = stageY + stageH + Math.min(60, h * 0.18);
        const radius = Math.min(35, w * 0.06);
        const nodeCount = 8;

        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
          const nodeDelay = i / nodeCount;
          const nodeAlpha = Math.max(
            0,
            Math.min(1, (edgeProgress - nodeDelay * 0.5) * 3)
          );

          if (nodeAlpha > 0) {
            const nx = cx + Math.cos(angle) * radius * edgeProgress;
            const ny = cy + Math.sin(angle) * radius * edgeProgress;

            // Connection line
            ctx.strokeStyle = muted;
            ctx.globalAlpha = nodeAlpha * 0.4;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            // Node dot
            ctx.globalAlpha = nodeAlpha;
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(nx, ny, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Center dot
        ctx.globalAlpha = edgeProgress;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // "Live" label
      if (t > pLive) {
        const liveAlpha = Math.min(1, (t - pLive) / 0.05);
        const fadeAlpha = t > 0.93 ? Math.max(0, 1 - (t - 0.93) / 0.07) : 1;
        ctx.globalAlpha = liveAlpha * fadeAlpha;
        ctx.fillStyle = "#22c55e";
        ctx.font = "bold 12px var(--font-geist-mono, monospace)";
        ctx.textAlign = "center";
        ctx.fillText(
          "● Live",
          w / 2,
          stageY + stageH + Math.min(60, h * 0.18) + Math.min(35, w * 0.06) + 18
        );
        ctx.font = "11px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = 1;
      }

      frame++;
      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          rafRef.current = requestAnimationFrame(draw);
        } else {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observerRef.current?.disconnect();
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
