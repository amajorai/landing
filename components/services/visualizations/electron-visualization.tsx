"use client";
import { useEffect, useRef } from "react";

interface Packet {
  progress: number;
  direction: 1 | -1; // 1 = main->renderer, -1 = renderer->main
  label: string;
  active: boolean;
}

export function ElectronVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef<number>(0);
  const packetsRef = useRef<Packet[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const spawnToggleRef = useRef<1 | -1>(1);
  const mainPulseRef = useRef<number>(0);
  const rendererPulseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startRef.current) startRef.current = now;
      const t = now - startRef.current;

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
      const mainColor = isDark ? "#38bdf8" : "#0284c7";
      const rendererColor = isDark ? "#7dd3fc" : "#38bdf8";
      const ipcColor = isDark ? "rgba(56,189,248,0.4)" : "rgba(2,132,199,0.3)";
      const packetColor = "#fbbf24";
      const textColor = isDark ? "#f0f9ff" : "#0c4a6e";

      ctx.clearRect(0, 0, W, H);

      // Layout
      const pad = 14;
      const boxW = Math.min(120, (W - pad * 2 - 60) / 2);
      const boxH = Math.min(130, H - pad * 2);
      const mainX = pad;
      const rendererX = W - pad - boxW;
      const boxY = (H - boxH) / 2;
      const ipcX = W / 2;

      // Main Process box
      ctx.save();
      if (mainPulseRef.current > 0) {
        ctx.shadowColor = mainColor;
        ctx.shadowBlur = 12 * mainPulseRef.current;
        mainPulseRef.current = Math.max(0, mainPulseRef.current - 0.03);
      }
      ctx.beginPath();
      ctx.roundRect(mainX, boxY, boxW, boxH, 8);
      ctx.fillStyle = mainColor;
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.font = "bold 10px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Main Process", mainX + boxW / 2, boxY + 10);

      ctx.font = "9px var(--font-geist-mono, monospace)";
      ctx.textAlign = "left";
      const apis = ["fs", "net", "child_process"];
      for (let i = 0; i < apis.length; i++) {
        const y = boxY + 34 + i * 18;
        ctx.fillStyle = mainColor;
        ctx.beginPath();
        ctx.arc(mainX + 12, y + 4, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.fillText(apis[i], mainX + 20, y);
      }

      // Renderer box (browser chrome)
      ctx.save();
      if (rendererPulseRef.current > 0) {
        ctx.shadowColor = rendererColor;
        ctx.shadowBlur = 12 * rendererPulseRef.current;
        rendererPulseRef.current = Math.max(0, rendererPulseRef.current - 0.03);
      }
      ctx.beginPath();
      ctx.roundRect(rendererX, boxY, boxW, boxH, 8);
      ctx.fillStyle = rendererColor;
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = rendererColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Title bar with dots
      const barH = 14;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(rendererX, boxY, boxW, boxH, 8);
      ctx.clip();
      ctx.fillStyle = rendererColor;
      ctx.globalAlpha = 0.2;
      ctx.fillRect(rendererX, boxY, boxW, barH);
      ctx.globalAlpha = 1;
      ctx.restore();
      const dots = ["#ef4444", "#fbbf24", "#4ade80"];
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(rendererX + 8 + i * 8, boxY + barH / 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = dots[i];
        ctx.fill();
      }
      // Content area - flash if pulse
      const contentY = boxY + barH + 6;
      const flashAlpha = rendererPulseRef.current * 0.3;
      ctx.fillStyle = rendererColor;
      ctx.globalAlpha = 0.1 + flashAlpha;
      ctx.fillRect(rendererX + 8, contentY, boxW - 16, 6);
      ctx.fillRect(rendererX + 8, contentY + 12, boxW - 24, 6);
      ctx.fillRect(rendererX + 8, contentY + 24, boxW - 20, 6);
      ctx.globalAlpha = 1;

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(
        "Renderer (Chromium)",
        rendererX + boxW / 2,
        boxY + boxH - 6
      );

      // IPC dashed line
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(ipcX, boxY + 4);
      ctx.lineTo(ipcX, boxY + boxH - 4);
      ctx.strokeStyle = ipcColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("IPC", ipcX, boxY - 2);

      // Spawn packets
      if (t - lastSpawnRef.current > 1500) {
        lastSpawnRef.current = t;
        const dir = spawnToggleRef.current;
        packetsRef.current.push({
          progress: 0,
          direction: dir,
          label: dir === 1 ? "invoke()" : "reply(data)",
          active: true,
        });
        if (dir === 1) mainPulseRef.current = 1;
        spawnToggleRef.current = dir === 1 ? -1 : 1;
      }

      // Draw packets
      const startX = mainX + boxW;
      const endX = rendererX;
      const travelMid = H / 2;
      packetsRef.current = packetsRef.current.filter((p) => {
        p.progress += 0.012;
        if (p.progress >= 1) {
          if (p.direction === 1) rendererPulseRef.current = 1;
          else mainPulseRef.current = 1;
          return false;
        }
        const from = p.direction === 1 ? startX : endX;
        const to = p.direction === 1 ? endX : startX;
        const x = from + (to - from) * p.progress;
        const y = travelMid + (p.direction === 1 ? -8 : 8);

        ctx.beginPath();
        ctx.roundRect(x - 6, y - 5, 12, 10, 2);
        ctx.fillStyle = packetColor;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = packetColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = p.direction === 1 ? "bottom" : "top";
        ctx.fillText(p.label, x, y + (p.direction === 1 ? -7 : 7));
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
