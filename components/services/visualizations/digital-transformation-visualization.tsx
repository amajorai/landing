"use client";
import { useEffect, useRef } from "react";

const CYCLE_MS = 4000;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function DigitalTransformationVisualization() {
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
      const cx = W / 2;
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const paperColor = isDark ? "#a8a29e" : "#78716c";
      const paperBg = isDark
        ? "rgba(168,162,158,0.08)"
        : "rgba(120,113,108,0.05)";
      const digitalColor = isDark ? "#2dd4bf" : "#0d9488";
      const digitalBg = isDark
        ? "rgba(45,212,191,0.10)"
        : "rgba(13,148,136,0.07)";
      const textColor = isDark ? "#f0fdfa" : "#134e4a";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const t = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS;
      const morphT =
        t < 0.25
          ? 0
          : t < 0.5
            ? easeInOut((t - 0.25) / 0.25)
            : t < 0.75
              ? 1
              : 1 - easeInOut((t - 0.75) / 0.25);

      const docW = 90;
      const docH = 110;
      const docX = cx - docW / 2;
      const docY = cy - docH / 2 - 5;

      const corner = 12 * (1 - morphT);
      ctx.beginPath();
      ctx.moveTo(docX, docY);
      ctx.lineTo(docX + docW - corner, docY);
      if (corner > 1) {
        ctx.lineTo(docX + docW, docY + corner);
      } else {
        ctx.lineTo(docX + docW, docY);
      }
      ctx.lineTo(docX + docW, docY + docH);
      ctx.lineTo(docX, docY + docH);
      ctx.closePath();

      ctx.fillStyle = morphT > 0.5 ? digitalBg : paperBg;
      ctx.fill();
      ctx.strokeStyle = morphT > 0.5 ? digitalColor : paperColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (corner > 1) {
        ctx.beginPath();
        ctx.moveTo(docX + docW - corner, docY);
        ctx.lineTo(docX + docW - corner, docY + corner);
        ctx.lineTo(docX + docW, docY + corner);
        ctx.strokeStyle = paperColor;
        ctx.globalAlpha = 1 - morphT;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const lineX = docX + 10;
      const lineW = docW - 20;
      const lineStart = docY + 20;
      const fields = [
        { label: "Name", w: 0.8 },
        { label: "Email", w: 0.65 },
        { label: "Phone", w: 0.5 },
        { label: "Date", w: 0.4 },
      ];

      for (let i = 0; i < fields.length; i++) {
        const fy = lineStart + i * 20;
        const fw = lineW * fields[i].w;

        if (morphT < 0.5) {
          ctx.font = "7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = paperColor;
          ctx.globalAlpha = 1 - morphT * 2;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(fields[i].label + ": ______", lineX, fy);
          ctx.globalAlpha = 1;
        }

        if (morphT > 0.3) {
          const fieldAlpha = Math.min(1, (morphT - 0.3) / 0.3);
          ctx.beginPath();
          ctx.roundRect(lineX, fy - 1, fw, 14, 3);
          ctx.fillStyle = isDark
            ? "rgba(45,212,191,0.08)"
            : "rgba(13,148,136,0.05)";
          ctx.globalAlpha = fieldAlpha;
          ctx.fill();
          ctx.strokeStyle = digitalColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = fieldAlpha * 0.6;
          ctx.stroke();
          ctx.globalAlpha = fieldAlpha;

          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = textColor;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(fields[i].label, lineX + 4, fy + 6);
          ctx.globalAlpha = 1;
        }
      }

      if (morphT > 0.7) {
        const btnAlpha = (morphT - 0.7) / 0.3;
        const btnW = 50;
        const btnH = 16;
        const btnX = docX + docW / 2 - btnW / 2;
        const btnY = lineStart + fields.length * 20 + 4;

        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 4);
        ctx.fillStyle = digitalColor;
        ctx.globalAlpha = btnAlpha * 0.25;
        ctx.fill();
        ctx.globalAlpha = btnAlpha;
        ctx.strokeStyle = digitalColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.font = "bold 7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Submit", btnX + btnW / 2, btnY + btnH / 2);
        ctx.globalAlpha = 1;
      }

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(
        morphT < 0.3
          ? "Paper form"
          : morphT > 0.7
            ? "Digital form"
            : "Transforming...",
        cx,
        docY + docH + 14
      );

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
