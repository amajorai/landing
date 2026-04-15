"use client";
import { useEffect, useRef } from "react";

const MIDDLEWARES = ["logger", "cors", "auth", "router"];

// Scenario cycle: success (3s) -> failure (3s) -> ...
const CYCLE = 6000;

export function ExpressVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (ts: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const W = rect.width;
      const H = rect.height;
      const cy = H / 2;

      const isDark = document.documentElement.classList.contains("dark");
      const requestColor = isDark ? "#e4e4e7" : "#3f3f46";
      const successColor = "#4ade80";
      const errorColor = "#f87171";
      const boxColor = isDark
        ? "rgba(161,161,170,0.15)"
        : "rgba(113,113,122,0.10)";
      const activeBox = isDark ? "#a1a1aa" : "#52525b";
      const textColor = isDark ? "#fafafa" : "#18181b";

      ctx.clearRect(0, 0, W, H);

      // Layout: Request | M1 | M2 | M3 | M4 | Response
      const labels = ["Request", ...MIDDLEWARES, "Response"];
      const count = labels.length;
      const pad = 8;
      const slot = (W - pad * 2) / count;
      const boxW = slot * 0.86;
      const boxH = 30;

      const centers = labels.map((_, i) => pad + slot * i + slot / 2);

      // Scenario
      const inCycle = elapsed % CYCLE;
      const isFailure = inCycle >= CYCLE / 2;
      const scenarioT = (inCycle % (CYCLE / 2)) / (CYCLE / 2); // 0..1

      // Packet progress through slots
      // Success: 0 -> count-1 over scenarioT
      // Failure: 0 -> auth slot (index 3) by t=0.5, then reverse to 0 (Response error), then nothing.
      const authIdx = 3; // labels: Req(0) log(1) cors(2) auth(3) router(4) Res(5)

      let packetPos = 0; // floating index into `centers`
      let packetColor = requestColor;
      let showError = false;
      let activeIdx = -1;

      if (isFailure) {
        if (scenarioT < 0.5) {
          // forward to auth
          const t = scenarioT / 0.5;
          packetPos = t * authIdx;
          packetColor = requestColor;
          activeIdx = Math.round(packetPos);
        } else {
          // rejected: bounce back from auth to Response slot (last)
          const t = (scenarioT - 0.5) / 0.5;
          // Goes from auth (3) back to Response (5). Take a high arc.
          packetPos = authIdx + (count - 1 - authIdx) * t;
          packetColor = errorColor;
          showError = true;
          activeIdx = authIdx;
        }
      } else {
        // success flow — travels full width
        packetPos = scenarioT * (count - 1);
        packetColor = successColor;
        activeIdx = Math.round(packetPos);
      }

      // Draw arrows between boxes
      for (let i = 0; i < count - 1; i++) {
        const x1 = centers[i] + boxW / 2;
        const x2 = centers[i + 1] - boxW / 2;
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.lineTo(x2, cy);
        ctx.strokeStyle = isDark
          ? "rgba(161,161,170,0.35)"
          : "rgba(113,113,122,0.30)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // tiny arrowhead
        ctx.beginPath();
        ctx.moveTo(x2, cy);
        ctx.lineTo(x2 - 4, cy - 3);
        ctx.lineTo(x2 - 4, cy + 3);
        ctx.closePath();
        ctx.fillStyle = isDark
          ? "rgba(161,161,170,0.45)"
          : "rgba(113,113,122,0.40)";
        ctx.fill();
      }

      // Draw boxes
      for (let i = 0; i < count; i++) {
        const x = centers[i] - boxW / 2;
        const y = cy - boxH / 2;
        const isActive = i === activeIdx;
        const isAuth = labels[i] === "auth";
        const isRejected = isFailure && isAuth;

        ctx.beginPath();
        ctx.roundRect(x, y, boxW, boxH, 5);
        ctx.fillStyle = isActive
          ? isRejected
            ? "rgba(248,113,113,0.25)"
            : isDark
              ? "rgba(161,161,170,0.30)"
              : "rgba(113,113,122,0.20)"
          : boxColor;
        ctx.fill();
        ctx.strokeStyle = isActive
          ? isRejected
            ? errorColor
            : activeBox
          : isDark
            ? "rgba(161,161,170,0.4)"
            : "rgba(113,113,122,0.4)";
        ctx.lineWidth = isActive ? 1.6 : 1;
        ctx.stroke();

        // Label
        let label = labels[i];
        // Show "✓" once the packet has passed (index < packetPos rounded down, success only)
        if (!isFailure && i > 0 && i < count - 1 && i < packetPos - 0.3) {
          label = `${labels[i]}: ok`;
        }
        if (isRejected && isFailure && scenarioT >= 0.5) {
          label = "auth: x";
        }

        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, centers[i], cy);
      }

      // Draw packet
      // interpolate position between centers
      const lo = Math.floor(packetPos);
      const hi = Math.min(lo + 1, count - 1);
      const frac = packetPos - lo;
      const px = centers[lo] + (centers[hi] - centers[lo]) * frac;
      // arc lift for failure bounce
      let py = cy - boxH / 2 - 14;
      if (isFailure && scenarioT >= 0.5) {
        const t = (scenarioT - 0.5) / 0.5;
        py = cy - boxH / 2 - 14 - Math.sin(t * Math.PI) * 18;
      }

      ctx.beginPath();
      ctx.roundRect(px - 7, py - 7, 14, 14, 3);
      ctx.fillStyle = packetColor;
      ctx.fill();
      ctx.strokeStyle = isDark ? "#fafafa" : "#18181b";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (showError) {
        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = errorColor;
        ctx.textAlign = "center";
        ctx.fillText("401", px, py - 14);
      } else if (isFailure) {
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText("req", px, py - 12);
      } else {
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText("req", px, py - 12);
      }

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startTimeRef.current = 0;
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
