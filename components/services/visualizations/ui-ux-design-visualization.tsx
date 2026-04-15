"use client";
import { useEffect, useRef } from "react";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const CYCLE_MS = 4000;

export function UiUxDesignVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);

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
      const wireColor = isDark
        ? "rgba(236,72,153,0.3)"
        : "rgba(219,39,119,0.2)";
      const solidColor = isDark ? "#f472b6" : "#db2777";
      const bgFill = isDark ? "rgba(236,72,153,0.08)" : "rgba(219,39,119,0.05)";
      const textColor = isDark ? "#fce7f3" : "#831843";

      ctx.clearRect(0, 0, W, H);

      const t = (now % CYCLE_MS) / CYCLE_MS;
      const morphT =
        t < 0.3
          ? 0
          : t < 0.5
            ? easeInOut((t - 0.3) / 0.2)
            : t < 0.8
              ? 1
              : 1 - easeInOut((t - 0.8) / 0.2);

      const cardW = 140;
      const cardH = 90;
      const cardX = cx - cardW / 2;
      const cardY = cy - cardH / 2 - 5;

      ctx.setLineDash(morphT < 1 ? [4 * (1 - morphT), 3 * (1 - morphT)] : []);
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, lerp(2, 6, morphT));
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = lerp(1, 1.5, morphT);
      ctx.globalAlpha = lerp(0.5, 1, morphT);
      ctx.stroke();
      ctx.globalAlpha = morphT;
      ctx.fillStyle = bgFill;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);

      const headerH = 14;
      ctx.beginPath();
      ctx.roundRect(
        cardX + 6,
        cardY + 6,
        cardW - 12,
        headerH,
        lerp(1, 3, morphT)
      );
      const headerFill = isDark
        ? `rgba(244,114,182,${lerp(0.08, 0.2, morphT)})`
        : `rgba(219,39,119,${lerp(0.05, 0.12, morphT)})`;
      ctx.fillStyle = headerFill;
      ctx.fill();
      if (morphT < 0.5) {
        ctx.setLineDash([3, 2]);
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.font = `${morphT > 0.5 ? "bold " : ""}8px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = lerp(0.4, 1, morphT);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        morphT > 0.5 ? "Navigation" : "nav ----",
        cardX + 10,
        cardY + 6 + headerH / 2
      );
      ctx.globalAlpha = 1;

      const imgW = 56;
      const imgH = 36;
      const imgX = cardX + 6;
      const imgY = cardY + 26;

      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, lerp(1, 4, morphT));
      const imgFill = isDark
        ? `rgba(244,114,182,${lerp(0.05, 0.15, morphT)})`
        : `rgba(219,39,119,${lerp(0.03, 0.08, morphT)})`;
      ctx.fillStyle = imgFill;
      ctx.fill();
      if (morphT < 0.5) {
        ctx.strokeStyle = wireColor;
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(imgX, imgY);
        ctx.lineTo(imgX + imgW, imgY + imgH);
        ctx.moveTo(imgX + imgW, imgY);
        ctx.lineTo(imgX, imgY + imgH);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(imgX + imgW * 0.65, imgY + imgH * 0.35, 5, 0, Math.PI * 2);
        ctx.fillStyle = solidColor;
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.moveTo(imgX + 4, imgY + imgH - 4);
        ctx.lineTo(imgX + imgW * 0.4, imgY + imgH * 0.5);
        ctx.lineTo(imgX + imgW * 0.6, imgY + imgH * 0.7);
        ctx.lineTo(imgX + imgW - 4, imgY + imgH * 0.4);
        ctx.strokeStyle = solidColor;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const textX = imgX + imgW + 8;
      const textW = cardW - 12 - imgW - 8;
      for (let i = 0; i < 4; i++) {
        const ly = imgY + i * 9;
        const lw = textW * (i === 3 ? 0.6 : 0.85 + Math.sin(i) * 0.1);
        ctx.beginPath();
        ctx.roundRect(textX, ly, lw, lerp(3, 5, morphT), 1);
        const lineFill = isDark
          ? `rgba(244,114,182,${lerp(0.06, 0.12, morphT)})`
          : `rgba(219,39,119,${lerp(0.04, 0.08, morphT)})`;
        ctx.fillStyle = lineFill;
        ctx.fill();
      }

      const btnW = lerp(40, 50, morphT);
      const btnH = lerp(10, 14, morphT);
      const btnX = cardX + 6;
      const btnY = cardY + cardH - btnH - 8;
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, lerp(2, 4, morphT));
      ctx.fillStyle = solidColor;
      ctx.globalAlpha = lerp(0.15, 0.3, morphT);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = solidColor;
      ctx.lineWidth = lerp(0.8, 1.2, morphT);
      ctx.globalAlpha = lerp(0.4, 0.8, morphT);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.font = "6px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.globalAlpha = lerp(0.3, 0.8, morphT);
      ctx.textAlign = "center";
      ctx.fillText(
        morphT > 0.5 ? "Get started" : "CTA",
        btnX + btnW / 2,
        btnY + btnH / 2 + 1
      );
      ctx.globalAlpha = 1;

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(
        morphT < 0.3
          ? "Wireframe"
          : morphT > 0.7
            ? "High-fidelity"
            : "Morphing...",
        cx,
        cardY + cardH + 14
      );

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
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
