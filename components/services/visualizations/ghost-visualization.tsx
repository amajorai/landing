"use client";
import { useEffect, useRef } from "react";

const LINES = [
  "# Welcome to Ghost",
  "",
  "Ghost is a powerful publishing",
  "platform for creators who want",
  "to turn their audience into a",
  "business.",
  "",
  "---",
  "",
  "Members: 1,247 · Open rate: 62%",
];

export function GhostVisualization() {
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
      const frame = frameRef.current;

      const accent = isDark ? "#a78bfa" : "#7c3aed";
      const accentLight = isDark
        ? "rgba(167,139,250,0.12)"
        : "rgba(124,58,237,0.08)";
      const text = isDark ? "#e2e8f0" : "#1e293b";
      const textDim = isDark ? "#94a3b8" : "#64748b";
      const cardBg = isDark ? "rgba(30,41,59,0.7)" : "rgba(248,250,252,0.9)";
      const border = isDark
        ? "rgba(167,139,250,0.25)"
        : "rgba(124,58,237,0.15)";
      const cursorColor = accent;

      ctx.clearRect(0, 0, W, H);

      const editorW = W * 0.52;
      const editorH = H * 0.82;
      const editorX = (W - editorW) / 2;
      const editorY = (H - editorH) / 2;

      ctx.beginPath();
      ctx.roundRect(editorX, editorY, editorW, editorH, 8);
      ctx.fillStyle = cardBg;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(editorX, editorY, editorW, 20, [8, 8, 0, 0]);
      ctx.fillStyle = accentLight;
      ctx.fill();

      const dots = ["#ef4444", "#eab308", "#22c55e"];
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(editorX + 12 + i * 10, editorY + 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = dots[i];
        ctx.globalAlpha = 0.6;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const charsPerFrame = 0.8;
      const totalChars = LINES.reduce((s, l) => s + l.length + 1, 0);
      const typedChars = Math.floor(
        (frame * charsPerFrame) % (totalChars + 80)
      );

      let charCount = 0;
      const lineStartX = editorX + 10;
      let lineY = editorY + 32;
      const lineHeight = 13;

      for (let li = 0; li < LINES.length; li++) {
        const line = LINES[li];
        if (charCount > typedChars) break;

        const visibleLen = Math.min(line.length, typedChars - charCount);
        const visibleText = line.slice(0, visibleLen);

        if (line.startsWith("# ")) {
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = text;
        } else if (line === "---") {
          ctx.strokeStyle = border;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(lineStartX, lineY);
          ctx.lineTo(editorX + editorW - 10, lineY);
          ctx.stroke();
          charCount += line.length + 1;
          lineY += lineHeight;
          continue;
        } else if (line.startsWith("Members:")) {
          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
        } else {
          ctx.font = "8px var(--font-geist-mono, monospace)";
          ctx.fillStyle = textDim;
        }

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        if (visibleText.length > 0) {
          ctx.fillText(visibleText, lineStartX, lineY);
        }

        if (typedChars >= charCount && typedChars <= charCount + line.length) {
          const cursorX = lineStartX + ctx.measureText(visibleText).width + 1;
          const blink = Math.sin(frame * 0.15) > 0;
          if (blink) {
            ctx.fillStyle = cursorColor;
            ctx.fillRect(cursorX, lineY, 1.5, 10);
          }
        }

        charCount += line.length + 1;
        lineY += lineHeight;
      }

      const sideW = W * 0.16;
      const sideH = H * 0.5;
      const sideX = editorX + editorW + 12;
      const sideY = editorY + 20;

      ctx.beginPath();
      ctx.roundRect(sideX, sideY, sideW, sideH, 6);
      ctx.fillStyle = accentLight;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.fillText("Members", sideX + sideW / 2, sideY + 10);

      const barData = [0.4, 0.65, 0.8, 0.55, 0.9, 0.7];
      const barW = (sideW - 16) / barData.length - 2;
      const barMaxH = sideH * 0.55;
      const barBaseY = sideY + sideH - 8;

      for (let i = 0; i < barData.length; i++) {
        const growPhase = Math.min(
          Math.max(((frame % 180) / 180 - i * 0.08) * 5, 0),
          1
        );
        const bh = barData[i] * barMaxH * growPhase;
        const bx = sideX + 8 + i * (barW + 2);

        ctx.beginPath();
        ctx.roundRect(bx, barBaseY - bh, barW, bh, [2, 2, 0, 0]);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.3 + growPhase * 0.5;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const emailX = editorX - sideW - 12;
      const emailY = editorY + 20;

      ctx.beginPath();
      ctx.roundRect(emailX, emailY, sideW, sideH, 6);
      ctx.fillStyle = accentLight;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "center";
      ctx.fillText("Newsletter", emailX + sideW / 2, emailY + 10);

      const envW = sideW - 12;
      const envH = 14;
      for (let i = 0; i < 3; i++) {
        const ey = emailY + 24 + i * 18;
        const sendProg = Math.min(
          Math.max(((frame % 150) / 150 - 0.2 - i * 0.15) * 4, 0),
          1
        );
        ctx.globalAlpha = 0.3 + sendProg * 0.7;
        ctx.beginPath();
        ctx.roundRect(emailX + 6, ey, envW, envH, 3);
        ctx.fillStyle = isDark
          ? "rgba(167,139,250,0.08)"
          : "rgba(124,58,237,0.05)";
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.font = "6px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textDim;
        ctx.textAlign = "left";
        ctx.fillText(
          sendProg >= 1 ? "✓ Sent" : "Sending…",
          emailX + 10,
          ey + 7
        );
      }
      ctx.globalAlpha = 1;

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
