"use client";
import { useEffect, useRef } from "react";

const VARIANTS = {
  default: { gap: 5, speed: 35, colors: ["#a1a1aa", "#71717a", "#52525b"] },
  blue: { gap: 5, speed: 35, colors: ["#3b82f6", "#60a5fa", "#93c5fd"] },
  yellow: { gap: 5, speed: 35, colors: ["#eab308", "#facc15", "#fde047"] },
  pink: { gap: 5, speed: 35, colors: ["#ec4899", "#f472b6", "#f9a8d4"] },
};

interface PixelCardProps {
  variant?: keyof typeof VARIANTS;
  children?: React.ReactNode;
  className?: string;
  gap?: number;
  speed?: number;
  colors?: string[];
  noFocus?: boolean;
}

interface Pixel {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  speed: number;
  color: string;
  state: "appearing" | "shimmering" | "disappearing";
  phase: number;
  delay: number;
}

export default function PixelCard({
  variant = "default",
  children,
  className = "",
  gap,
  speed,
  colors,
  noFocus = false,
}: PixelCardProps) {
  const cfg = {
    ...VARIANTS[variant],
    ...(gap !== undefined ? { gap } : {}),
    ...(speed !== undefined ? { speed } : {}),
    ...(colors ? { colors } : {}),
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixels = useRef<Pixel[]>([]);
  const rafRef = useRef<number>(0);
  const active = useRef(false);

  const initPixels = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!(canvas && container)) return;
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    pixels.current = [];
    const cx = width / 2;
    const cy = height / 2;
    for (let x = 0; x < width; x += cfg.gap) {
      for (let y = 0; y < height; y += cfg.gap) {
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
        pixels.current.push({
          x,
          y,
          size: 0,
          maxSize: cfg.gap * 0.6,
          speed: (cfg.speed * (0.5 + Math.random() * 0.5)) / 1000,
          color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
          state: "appearing",
          phase: 0,
          delay: (dist / maxDist) * 0.5,
        });
      }
    }
  };

  const drawFrame = (elapsed: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allDone = true;
    for (const p of pixels.current) {
      const t = Math.max(0, elapsed - p.delay);
      void t;
      if (active.current) {
        p.phase = Math.min(1, p.phase + p.speed * 16);
      } else {
        p.phase = Math.max(0, p.phase - p.speed * 16);
      }
      const size = p.maxSize * p.phase;
      if (size > 0.2) {
        allDone = false;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, size, size);
      } else if (active.current) {
        allDone = false;
      }
    }
    if (!allDone || active.current) {
      rafRef.current = requestAnimationFrame(() => drawFrame(elapsed + 16));
    }
  };

  const start = () => {
    active.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(0));
  };
  const stop = () => {
    active.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    initPixels();
    const ro = new ResizeObserver(() => {
      initPixels();
      if (active.current) drawFrame(0);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.gap, cfg.speed]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onBlur={noFocus ? undefined : stop}
      onFocus={noFocus ? undefined : start}
      onMouseEnter={start}
      onMouseLeave={stop}
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      {children}
    </div>
  );
}
