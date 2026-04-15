"use client";
import { useEffect, useRef } from "react";

// Unistyles: JSI-powered styling bypasses the JS bridge → zero bridge overhead
// Two parallel lanes compare StyleSheet (with bridge) vs Unistyles (direct JSI).

export function UnistylesVisualization() {
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
      const jsiColor = isDark ? "#a78bfa" : "#7c3aed";
      const bridgeColor = "#f87171";
      const fastColor = "#4ade80";
      const slowColor = "#fb923c";
      const textColor = isDark ? "#f5f3ff" : "#2e1065";
      const boxFill = isDark
        ? "rgba(167,139,250,0.12)"
        : "rgba(124,58,237,0.10)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const cycle = (frame % 180) / 180;

      // Two lanes, top = StyleSheet, bottom = Unistyles
      const laneH = H * 0.34;
      const perfH = H * 0.22;

      const drawBox = (
        x: number,
        y: number,
        w: number,
        h: number,
        color: string,
        label: string,
        sub?: string
      ) => {
        ctx.fillStyle = boxFill;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(h * 0.35)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x + w / 2, y + h / 2 - (sub ? 5 : 0));
        if (sub) {
          ctx.font = `${Math.round(h * 0.25)}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = color;
          ctx.fillText(sub, x + w / 2, y + h / 2 + 7);
        }
      };

      const arrow = (
        x1: number,
        y: number,
        x2: number,
        color: string,
        dashed: boolean,
        progress: number
      ) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        if (dashed) ctx.setLineDash([4, 4]);
        const cx = x1 + (x2 - x1) * progress;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(cx, y);
        ctx.stroke();
        ctx.setLineDash([]);
        // arrow head at progress tip
        if (progress > 0.02) {
          ctx.beginPath();
          ctx.moveTo(cx, y);
          ctx.lineTo(cx - 5, y - 3);
          ctx.lineTo(cx - 5, y + 3);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.restore();
      };

      // Lane positions
      const topY = H * 0.06;
      const midY = topY + laneH + 6;

      // Box widths (4 boxes per lane)
      const pad = 6;
      const boxW = (W - pad * 5) / 4;
      const boxH = laneH * 0.6;

      // ----- TOP LANE: StyleSheet (slow, via bridge) -----
      const topProgress = Math.min(cycle * 2, 1);
      drawBox(pad, topY, boxW, boxH, slowColor, "JS", "StyleSheet");
      arrow(
        pad + boxW,
        topY + boxH / 2,
        pad * 2 + boxW * 2,
        slowColor,
        true,
        topProgress
      );
      drawBox(pad * 2 + boxW, topY, boxW, boxH, bridgeColor, "Bridge", "~2ms");
      // Red X on bridge
      ctx.strokeStyle = bridgeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad * 2 + boxW + 6, topY + 6);
      ctx.lineTo(pad * 2 + boxW * 2 - 6, topY + boxH - 6);
      ctx.moveTo(pad * 2 + boxW * 2 - 6, topY + 6);
      ctx.lineTo(pad * 2 + boxW + 6, topY + boxH - 6);
      ctx.stroke();
      arrow(
        pad * 2 + boxW * 2,
        topY + boxH / 2,
        pad * 3 + boxW * 3,
        slowColor,
        true,
        Math.min(Math.max(cycle * 2 - 0.5, 0) * 2, 1)
      );
      drawBox(pad * 3 + boxW * 2, topY, boxW, boxH, slowColor, "Native");
      arrow(
        pad * 3 + boxW * 3,
        topY + boxH / 2,
        pad * 4 + boxW * 4,
        slowColor,
        false,
        Math.min(Math.max(cycle * 2 - 1, 0) * 2, 1)
      );
      drawBox(pad * 4 + boxW * 3, topY, boxW, boxH, slowColor, "Render");

      // Lane label
      ctx.fillStyle = slowColor;
      ctx.font = `${Math.round(H * 0.05)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("StyleSheet", pad, topY + boxH + 2);

      // ----- BOTTOM LANE: Unistyles (fast, JSI) -----
      const bottomProgress = Math.min(cycle * 3, 1);
      drawBox(pad, midY, boxW, boxH, jsiColor, "C++ JSI");
      arrow(
        pad + boxW,
        midY + boxH / 2,
        pad * 2 + boxW * 2,
        fastColor,
        false,
        bottomProgress
      );
      drawBox(pad * 2 + boxW, midY, boxW, boxH, fastColor, "Native");
      arrow(
        pad * 2 + boxW * 2,
        midY + boxH / 2,
        pad * 3 + boxW * 3,
        fastColor,
        false,
        Math.min(Math.max(cycle * 3 - 0.3, 0) * 2, 1)
      );
      drawBox(pad * 3 + boxW * 2, midY, boxW, boxH, fastColor, "Render");
      // "0ms" badge where the bridge would be
      ctx.fillStyle = fastColor;
      ctx.font = `bold ${Math.round(H * 0.05)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "center";
      ctx.fillText("0ms bridge", pad * 3.5 + boxW * 3.5, midY + boxH / 2);

      ctx.fillStyle = jsiColor;
      ctx.font = `${Math.round(H * 0.05)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.fillText("Unistyles", pad, midY + boxH + 2);

      // ----- Performance: 120fps meter -----
      const perfY = H - perfH;
      const bars = 24;
      const barW = (W - pad * 2) / bars;
      for (let i = 0; i < bars; i++) {
        // Smooth sine wave for unistyles lane
        const t = frame * 0.08 + i * 0.4;
        const smooth = 0.6 + Math.sin(t) * 0.08;
        const barH = smooth * (perfH - 14);
        ctx.fillStyle = fastColor;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(
          pad + i * barW + 1,
          perfY + (perfH - 14) - barH + 8,
          barW - 2,
          barH
        );
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.round(H * 0.065)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("120fps", W - pad - 2, perfY - 2);

      frameRef.current = frame + 1;

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
