"use client";

import { useEffect, useRef } from "react";

export function NetlifyVisualization() {
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
    const CYCLE = 420; // ~7 seconds at 60fps

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

    const sourceFiles = ["index.md", "about.md", "blog.md", "docs.md"];

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
      const accent = "#00C7B7";
      const accentDim = dark ? "#00897B" : "#80E3DB";
      const stageBg = dark ? "#1a1a1a" : "#f5f5f5";
      const barBg = dark ? "#262626" : "#e5e5e5";

      // Layout regions
      const leftX = w * 0.08;
      const centerX = w * 0.42;
      const rightX = w * 0.62;
      const midY = h * 0.5;
      const fileH = 22;
      const fileGap = 4;
      const totalFilesH =
        sourceFiles.length * fileH + (sourceFiles.length - 1) * fileGap;
      const filesTopY = midY - totalFilesH / 2;

      // Phase timing
      const pFiles = 0.18;
      const pBuild = 0.4;
      const pPages = 0.6;
      const pCdn = 0.8;

      // Source files appearing (left side)
      for (let i = 0; i < sourceFiles.length; i++) {
        const fileDelay = (i / sourceFiles.length) * pFiles;
        const fileAlpha = Math.max(0, Math.min(1, (t - fileDelay) / 0.06));
        const fadeOut = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

        if (fileAlpha > 0) {
          const fy = filesTopY + i * (fileH + fileGap);
          const slideX = leftX + (1 - fileAlpha) * -20;

          ctx.globalAlpha = fileAlpha * fadeOut;

          // File icon (small rectangle)
          ctx.fillStyle = stageBg;
          ctx.strokeStyle = muted;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.roundRect(slideX, fy, Math.min(90, w * 0.15), fileH, 3);
          ctx.fill();
          ctx.stroke();

          // File label
          ctx.fillStyle = fg;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(sourceFiles[i], slideX + 8, fy + fileH / 2);

          ctx.globalAlpha = 1;
        }
      }

      // Build arrow (center)
      if (t > pFiles * 0.6) {
        const buildProgress = Math.max(
          0,
          Math.min(1, (t - pFiles) / (pBuild - pFiles))
        );
        const fadeOut = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

        ctx.globalAlpha = Math.min(1, (t - pFiles * 0.6) / 0.08) * fadeOut;

        // Build box
        const bx = centerX - 35;
        const by = midY - 25;
        const bw = 70;
        const bh = 50;

        ctx.fillStyle = stageBg;
        ctx.strokeStyle = buildProgress > 0.1 ? accent : muted;
        ctx.lineWidth = buildProgress > 0.1 ? 1.5 : 0.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = fg;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 11px var(--font-geist-mono, monospace)";
        ctx.fillText("Build", bx + bw / 2, by + 16);
        ctx.font = "11px var(--font-geist-mono, monospace)";

        // Progress bar inside build box
        const pbx = bx + 8;
        const pby = by + bh - 16;
        const pbw = bw - 16;
        const pbh = 4;

        ctx.fillStyle = barBg;
        ctx.beginPath();
        ctx.roundRect(pbx, pby, pbw, pbh, 2);
        ctx.fill();

        if (buildProgress > 0) {
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.roundRect(pbx, pby, pbw * buildProgress, pbh, 2);
          ctx.fill();
        }

        // Arrows from files to build
        for (let i = 0; i < sourceFiles.length; i++) {
          const fy = filesTopY + i * (fileH + fileGap) + fileH / 2;
          const arrowProgress = Math.max(
            0,
            Math.min(1, (t - pFiles * 0.4 - i * 0.02) / 0.1)
          );
          if (arrowProgress > 0) {
            ctx.globalAlpha = arrowProgress * 0.4 * fadeOut;
            ctx.strokeStyle = accentDim;
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            const fromX = leftX + Math.min(90, w * 0.15) + 4;
            ctx.moveTo(fromX, fy);
            ctx.lineTo(bx, midY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
        ctx.globalAlpha = 1;
      }

      // Compiled HTML pages stacking (right side)
      const outputPages = [
        "index.html",
        "about.html",
        "blog.html",
        "docs.html",
      ];
      for (let i = 0; i < outputPages.length; i++) {
        const pageDelay = pBuild + (i / outputPages.length) * (pPages - pBuild);
        const pageAlpha = Math.max(0, Math.min(1, (t - pageDelay) / 0.06));
        const fadeOut = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

        if (pageAlpha > 0) {
          const py = filesTopY + i * (fileH + fileGap);
          const slideX = rightX + (1 - pageAlpha) * 20;

          ctx.globalAlpha = pageAlpha * fadeOut;

          // Page with slight offset for stacking effect
          const stackOffset = (outputPages.length - 1 - i) * 2;
          ctx.fillStyle = stageBg;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(
            slideX + stackOffset,
            py - stackOffset,
            Math.min(90, w * 0.15),
            fileH,
            3
          );
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = fg;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(
            outputPages[i],
            slideX + stackOffset + 8,
            py - stackOffset + fileH / 2
          );

          ctx.globalAlpha = 1;
        }
      }

      // Arrow from build to pages
      if (t > pBuild) {
        const fadeOut = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;
        ctx.globalAlpha = Math.min(1, (t - pBuild) / 0.06) * 0.4 * fadeOut;
        ctx.strokeStyle = accentDim;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(centerX + 35 + 4, midY);
        ctx.lineTo(rightX - 4, midY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // CDN burst animation
      if (t > pPages) {
        const cdnProgress = Math.max(
          0,
          Math.min(1, (t - pPages) / (pCdn - pPages))
        );
        const fadeOut = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

        const cx =
          rightX + Math.min(90, w * 0.15) / 2 + (outputPages.length - 1) * 2;
        const cy = midY + totalFilesH / 2 + 30;

        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = cdnProgress * fadeOut;
        ctx.fillStyle = accent;
        ctx.textAlign = "center";
        ctx.fillText("CDN", cx, cy - 12);
        ctx.font = "11px var(--font-geist-mono, monospace)";

        // Burst particles
        const particleCount = 12;
        const maxRadius = Math.min(30, w * 0.05);
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;
          const delay = (i / particleCount) * 0.3;
          const particleProgress = Math.max(
            0,
            Math.min(1, (cdnProgress - delay) * 2.5)
          );

          if (particleProgress > 0) {
            const px = cx + Math.cos(angle) * maxRadius * particleProgress;
            const py2 = cy + Math.sin(angle) * maxRadius * particleProgress;
            const size = 2 * (1 - particleProgress * 0.3);

            ctx.globalAlpha =
              particleProgress * (1 - particleProgress * 0.5) * fadeOut;
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(px, py2, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
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
