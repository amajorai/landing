"use client";
import { useEffect, useRef } from "react";

const LINES = [
  { text: "Why Content Strategy Matters", heading: true },
  { text: "Engaging readers starts with clarity.", heading: false },
  { text: "Every paragraph earns its place.", heading: false },
  { text: "Strong hooks. Clear structure.", heading: false },
  { text: "Words that convert.", heading: false },
];
const CYCLE_MS = 5200;

export function ContentWritingVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
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
      const accent = isDark ? "#a78bfa" : "#7c3aed";
      const textColor = isDark ? "#e2e8f0" : "#1e293b";
      const subColor = isDark
        ? "rgba(226,232,240,0.40)"
        : "rgba(30,41,59,0.40)";
      const bgCard = isDark ? "rgba(139,92,246,0.06)" : "rgba(124,58,237,0.04)";
      const borderColor = isDark
        ? "rgba(139,92,246,0.22)"
        : "rgba(124,58,237,0.14)";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS;

      const cardX = W * 0.07;
      const cardY = H * 0.07;
      const cardW = W * 0.86;
      const cardH = H * 0.86;

      ctx.fillStyle = bgCard;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 6);
      ctx.fill();
      ctx.stroke();

      // ruler lines (decorative)
      ctx.strokeStyle = isDark
        ? "rgba(139,92,246,0.08)"
        : "rgba(124,58,237,0.06)";
      ctx.lineWidth = 0.5;
      const lineSpacing = cardH / (LINES.length + 2);
      for (let i = 1; i <= LINES.length + 1; i++) {
        const ly = cardY + i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(cardX + 10, ly);
        ctx.lineTo(cardX + cardW - 10, ly);
        ctx.stroke();
      }

      const totalChars = LINES.reduce((s, l) => s + l.text.length, 0);
      const typeT = t < 0.72 ? t / 0.72 : 1;
      const charsToShow = Math.floor(typeT * totalChars);

      const padX = cardX + 16;
      const startY = cardY + lineSpacing * 1.1;

      let charCount = 0;
      for (let i = 0; i < LINES.length; i++) {
        const { text, heading } = LINES[i];
        const lineY = startY + i * lineSpacing;
        const fontSize = heading
          ? Math.min(13, cardW * 0.042)
          : Math.min(10, cardW * 0.034);

        ctx.font = heading
          ? `bold ${fontSize}px var(--font-geist-mono, monospace)`
          : `${fontSize}px var(--font-geist-mono, monospace)`;
        ctx.fillStyle = heading ? accent : textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const charsAvail = Math.max(0, charsToShow - charCount);
        const visible = text.slice(0, charsAvail);
        charCount += text.length;

        if (visible.length > 0) ctx.fillText(visible, padX, lineY);

        const isActive =
          charCount > charsToShow && charCount - text.length <= charsToShow;
        if (isActive && t < 0.88) {
          const tw = ctx.measureText(visible).width;
          const blink = Math.sin(now * 0.0045) > 0;
          if (blink) {
            ctx.fillStyle = accent;
            ctx.fillRect(
              padX + tw + 2,
              lineY - fontSize * 0.55,
              1.5,
              fontSize * 1.1
            );
          }
        }
      }

      // word count badge
      if (t > 0.28) {
        const wc = Math.floor(((t - 0.28) / 0.72) * 320);
        const alpha = Math.min(1, (t - 0.28) / 0.12);
        ctx.globalAlpha = alpha;
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = subColor;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${wc} words`, cardX + cardW - 12, cardY + cardH - 8);
        ctx.globalAlpha = 1;
      }

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startRef.current = 0;
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
