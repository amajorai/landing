"use client";
import { useEffect, useRef } from "react";

// Cloudflare Workers: globe with PoPs, user request routed to nearest
interface PoP {
  angle: number; // radians
  name: string;
}

const POPS: PoP[] = [
  { angle: -1.3, name: "IAD" },
  { angle: -0.5, name: "LHR" },
  { angle: 0.2, name: "FRA" },
  { angle: 0.9, name: "SIN" },
  { angle: 1.7, name: "NRT" },
  { angle: 2.4, name: "SYD" },
  { angle: 3.1, name: "GRU" },
  { angle: 3.9, name: "LAX" },
];

const USER_POSITIONS = [
  -1.1, // near IAD
  0.25, // near FRA
  1.75, // near NRT
  2.45, // near SYD
  3.85, // near LAX
];

const STEP_FRAMES = 140;

export function CloudflareWorkersVisualization() {
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
      const globeColor = isDark
        ? "rgba(251,146,60,0.15)"
        : "rgba(234,88,12,0.10)";
      const popColor = isDark ? "#fb923c" : "#ea580c";
      const activePopColor = "#fbbf24";
      const routeColor = isDark
        ? "rgba(251,191,36,0.6)"
        : "rgba(217,119,6,0.5)";
      const textColor = isDark ? "#fff7ed" : "#431407";

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2 + 6;
      const radius = Math.min(W, H) * 0.38;

      // Globe fill
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = globeColor;
      ctx.fill();
      ctx.strokeStyle = popColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Grid: latitude lines (ellipses) and longitude lines
      ctx.strokeStyle = isDark
        ? "rgba(251,146,60,0.2)"
        : "rgba(234,88,12,0.15)";
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        if (i === 0) continue;
        const ry = radius * Math.cos((i / 3) * (Math.PI / 2));
        const yy = cy + (i / 3) * radius;
        ctx.beginPath();
        ctx.ellipse(
          cx,
          yy,
          Math.abs(ry),
          Math.abs(ry) * 0.18,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      // Equator
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.22, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Meridians
      for (let i = 0; i < 4; i++) {
        const rx = radius * Math.cos((i / 4) * Math.PI);
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(rx), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      const frame = frameRef.current;
      const stepIdx = Math.floor(frame / STEP_FRAMES) % USER_POSITIONS.length;
      const localFrame = frame % STEP_FRAMES;
      const userAngle = USER_POSITIONS[stepIdx];

      // User pos
      const userX = cx + Math.cos(userAngle) * radius * 0.92;
      const userY = cy + Math.sin(userAngle) * radius * 0.92;

      // Find nearest PoP
      let nearestIdx = 0;
      let nearestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < POPS.length; i++) {
        let d = Math.abs(POPS[i].angle - userAngle);
        if (d > Math.PI) d = Math.PI * 2 - d;
        if (d < nearestDist) {
          nearestDist = d;
          nearestIdx = i;
        }
      }

      // Draw PoPs
      for (let i = 0; i < POPS.length; i++) {
        const p = POPS[i];
        const px = cx + Math.cos(p.angle) * radius;
        const py = cy + Math.sin(p.angle) * radius;
        const isActive =
          i === nearestIdx && localFrame > 30 && localFrame < 110;

        ctx.beginPath();
        ctx.arc(px, py, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? activePopColor : popColor;
        ctx.fill();

        if (isActive) {
          // Pulse
          const pulseP = ((localFrame - 30) % 30) / 30;
          ctx.beginPath();
          ctx.arc(px, py, 6 + pulseP * 10, 0, Math.PI * 2);
          ctx.strokeStyle = activePopColor;
          ctx.globalAlpha = 1 - pulseP;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // User (blinking dot)
      const blink = Math.sin(frame / 6) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(userX, userY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fde68a";
      ctx.globalAlpha = blink;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Route animation
      const pop = POPS[nearestIdx];
      const popX = cx + Math.cos(pop.angle) * radius;
      const popY = cy + Math.sin(pop.angle) * radius;

      // outbound: frames 10..50, inbound: 60..100
      const drawRoute = (progress: number, reverse: boolean) => {
        const ax = reverse ? popX : userX;
        const ay = reverse ? popY : userY;
        const bx = reverse ? userX : popX;
        const by = reverse ? userY : popY;
        const ex = ax + (bx - ax) * progress;
        const ey = ay + (by - ay) * progress;

        ctx.strokeStyle = routeColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);

        // Packet head
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = activePopColor;
        ctx.fill();
      };

      if (localFrame >= 10 && localFrame < 50) {
        drawRoute((localFrame - 10) / 40, false);
      } else if (localFrame >= 60 && localFrame < 100) {
        drawRoute((localFrame - 60) / 40, true);
      } else if (localFrame >= 50 && localFrame < 60) {
        // processing at PoP
        drawRoute(1, false);
      }

      // Labels
      if (localFrame >= 20 && localFrame < 110) {
        const midX = (userX + popX) / 2;
        const midY = (userY + popY) / 2 - 10;
        ctx.font = "600 10px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("~8ms", midX, midY);

        // V8 Isolates label near active PoP
        ctx.font = "500 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = activePopColor;
        const labelOffsetX = popX > cx ? 10 : -10;
        ctx.textAlign = popX > cx ? "left" : "right";
        ctx.fillText("V8 Isolates", popX + labelOffsetX, popY - 10);
      }

      frameRef.current = (frame + 1) % (STEP_FRAMES * USER_POSITIONS.length);

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
