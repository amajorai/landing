"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
  side: "ios" | "android";
}

export function ReactNativeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const lastBurstRef = useRef(0);
  const lastEmitRef = useRef(0);

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
      const codeColor = isDark ? "#38bdf8" : "#0284c7";
      const phoneColor = isDark ? "#7dd3fc" : "#38bdf8";
      const textColor = isDark ? "#f0f9ff" : "#0c4a6e";
      const iosTint = isDark ? "rgba(96,165,250,0.6)" : "rgba(37,99,235,0.6)";
      const androidTint = isDark
        ? "rgba(74,222,128,0.6)"
        : "rgba(22,163,74,0.6)";

      ctx.clearRect(0, 0, W, H);

      // Central component
      const compW = 120;
      const compH = 66;
      const cx = W / 2;
      const cy = H / 2;
      const compX = cx - compW / 2;
      const compY = cy - compH / 2;

      const now = performance.now();
      const sinceBurst = now - lastBurstRef.current;
      const updateGlow = Math.max(0, 1 - sinceBurst / 600);

      if (sinceBurst > 3000) {
        lastBurstRef.current = now;
        // Big burst
        for (let i = 0; i < 10; i++) {
          particlesRef.current.push({
            x: compX,
            y: cy + (Math.random() - 0.5) * 30,
            vx: -1.2 - Math.random() * 0.6,
            vy: (Math.random() - 0.5) * 0.3,
            life: 1,
            side: "ios",
          });
          particlesRef.current.push({
            x: compX + compW,
            y: cy + (Math.random() - 0.5) * 30,
            vx: 1.2 + Math.random() * 0.6,
            vy: (Math.random() - 0.5) * 0.3,
            life: 1,
            side: "android",
          });
        }
      }

      // Continuous emission
      if (now - lastEmitRef.current > 140) {
        lastEmitRef.current = now;
        particlesRef.current.push({
          x: compX,
          y: cy + (Math.random() - 0.5) * 20,
          vx: -0.8,
          vy: (Math.random() - 0.5) * 0.2,
          life: 1,
          side: "ios",
        });
        particlesRef.current.push({
          x: compX + compW,
          y: cy + (Math.random() - 0.5) * 20,
          vx: 0.8,
          vy: (Math.random() - 0.5) * 0.2,
          life: 1,
          side: "android",
        });
      }

      // Component box
      ctx.beginPath();
      ctx.roundRect(compX, compY, compW, compH, 8);
      ctx.fillStyle = codeColor;
      ctx.globalAlpha = 0.12 + updateGlow * 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = codeColor;
      ctx.lineWidth = 1.5 + updateGlow * 1.5;
      ctx.stroke();

      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("React Component", compX + 8, compY + 6);
      ctx.font = "bold 10px var(--font-geist-mono, monospace)";
      ctx.fillText("<View>", compX + 10, compY + 22);
      ctx.fillText("  <Text/>", compX + 10, compY + 36);
      ctx.fillText("</View>", compX + 10, compY + 50);

      // Phones
      const phW = 46;
      const phH = 84;
      const iosX = 12;
      const iosY = cy - phH / 2;
      const andX = W - phW - 12;
      const andY = cy - phH / 2;

      const drawPhone = (x: number, y: number, tint: string, label: string) => {
        ctx.beginPath();
        ctx.roundRect(x, y, phW, phH, 8);
        ctx.strokeStyle = phoneColor;
        ctx.lineWidth = 1.3;
        ctx.stroke();
        // Screen
        ctx.beginPath();
        ctx.roundRect(x + 4, y + 8, phW - 8, phH - 16, 3);
        ctx.fillStyle = tint;
        ctx.globalAlpha = 0.12;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = tint;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Simulated UI blocks with pulse
        const pulse = Math.sin(now / 400) * 0.2 + 0.6;
        ctx.fillStyle = tint;
        ctx.globalAlpha = pulse;
        ctx.fillRect(x + 7, y + 14, phW - 14, 6);
        ctx.globalAlpha = pulse * 0.7;
        ctx.fillRect(x + 7, y + 24, phW - 18, 4);
        ctx.globalAlpha = pulse * 0.5;
        ctx.fillRect(x + 7, y + 32, phW - 14, 14);
        ctx.globalAlpha = pulse * 0.6;
        ctx.fillRect(x + 7, y + 50, phW - 20, 4);
        ctx.fillRect(x + 7, y + 58, phW - 16, 4);
        ctx.globalAlpha = 1;

        // Speaker notch
        ctx.fillStyle = phoneColor;
        ctx.fillRect(x + phW / 2 - 5, y + 4, 10, 1.5);

        // Label
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = tint;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(label, x + phW / 2, y + phH + 4);
      };

      drawPhone(iosX, iosY, iosTint, "iOS");
      drawPhone(andX, andY, androidTint, "Android");

      // Update & draw particles
      const iosTarget = { x: iosX + phW / 2, y: cy };
      const andTarget = { x: andX + phW / 2, y: cy };
      particlesRef.current = particlesRef.current.filter((p) => {
        const target = p.side === "ios" ? iosTarget : andTarget;
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 6) return false;
        p.x += p.vx + (dx / dist) * 0.3;
        p.y += p.vy + (dy / dist) * 0.3;
        p.life -= 0.008;
        if (p.life <= 0) return false;

        ctx.fillStyle = p.side === "ios" ? iosTint : androidTint;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            lastBurstRef.current = performance.now() - 2500;
            rafRef.current = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting) {
            runningRef.current = false;
            cancelAnimationFrame(rafRef.current);
            particlesRef.current = [];
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
