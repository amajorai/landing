"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 360;

interface HexNode {
  label: string;
  col: number;
  row: number;
}

const NODES: HexNode[] = [
  { label: "Auth", col: 1, row: 0 },
  { label: "API", col: 2, row: 0 },
  { label: "Users", col: 0, row: 1 },
  { label: "Orders", col: 1, row: 1 },
  { label: "Queue", col: 2, row: 1 },
  { label: "DB", col: 3, row: 1 },
  { label: "Cache", col: 0, row: 2 },
  { label: "Search", col: 1, row: 2 },
  { label: "Events", col: 2, row: 2 },
];

const MESSAGE_ROUTES = [
  [1, 3, 5],
  [0, 3, 4, 8],
  [2, 3, 7],
  [3, 4, 5],
  [1, 4, 8, 6],
  [6, 7, 8],
];

export function AzureVisualization() {
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
      const accent = "#0078D4";
      const accentDim = isDark
        ? "rgba(0,120,212,0.15)"
        : "rgba(0,120,212,0.10)";
      const hexBg = isDark ? "rgba(0,120,212,0.08)" : "rgba(0,120,212,0.05)";
      const hexStroke = isDark
        ? "rgba(0,120,212,0.35)"
        : "rgba(0,120,212,0.22)";
      const connColor = isDark
        ? "rgba(0,120,212,0.18)"
        : "rgba(0,120,212,0.12)";
      const textColor = isDark ? "#eff6ff" : "#1e3a5f";
      const mutedText = isDark ? "#93c5fd" : "#2563eb";
      const healthColor = "#4ade80";
      const msgColor = isDark ? "#60a5fa" : "#3b82f6";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // Hex grid positioning
      const hexR = Math.min(W / 12, H / 8, 28);
      const hexW = hexR * 2;
      const hexH = hexR * Math.sqrt(3);
      const gridStartX = W / 2 - hexW * 1.5;
      const gridStartY = 28;

      const getNodePos = (node: HexNode) => {
        const offsetX = node.row % 2 === 1 ? -hexW * 0.4 : 0;
        return {
          x: gridStartX + node.col * hexW * 0.85 + offsetX,
          y: gridStartY + node.row * hexH * 0.82,
        };
      };

      const drawHexagon = (cx: number, cy: number, r: number) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      };

      // Phase timing
      const lightUpEnd = 120;
      const messageEnd = 280;
      const healthEnd = 340;

      // Draw connections between adjacent nodes
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const pi = getNodePos(NODES[i]);
          const pj = getNodePos(NODES[j]);
          const dist = Math.hypot(pi.x - pj.x, pi.y - pj.y);

          if (dist < hexW * 1.2) {
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = connColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with sequential light-up
      for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        const pos = getNodePos(node);
        const nodeDelay = i * 12;
        const appearProgress = Math.min(
          Math.max((frame - nodeDelay) / 20, 0),
          1
        );

        if (appearProgress <= 0) continue;

        const eased = 1 - (1 - appearProgress) ** 3;
        const isLit = frame >= nodeDelay && frame < nodeDelay + 25;

        ctx.globalAlpha = eased;

        // Hex shape
        drawHexagon(pos.x, pos.y, hexR * eased);
        ctx.fillStyle = isLit ? accentDim : hexBg;
        ctx.fill();
        ctx.strokeStyle = isLit ? accent : hexStroke;
        ctx.lineWidth = isLit ? 2 : 1;
        ctx.stroke();

        // Light-up glow
        if (isLit) {
          drawHexagon(pos.x, pos.y, hexR * eased + 4);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.3 * eased;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = eased;
        }

        // Label
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y);

        // Health indicator
        if (frame > lightUpEnd) {
          const healthDelay = lightUpEnd + i * 5;
          const healthAlpha = Math.min(
            Math.max((frame - healthDelay) / 15, 0),
            1
          );

          // Pulse during health check phase
          const isPulsing =
            frame > healthEnd - 60 &&
            frame < healthEnd &&
            (frame - healthEnd + 60) % 30 < 15;
          const dotR = isPulsing ? 4 : 3;

          ctx.globalAlpha = healthAlpha * eased;
          ctx.beginPath();
          ctx.arc(pos.x + hexR * 0.6, pos.y - hexR * 0.5, dotR, 0, Math.PI * 2);
          ctx.fillStyle = healthColor;
          ctx.fill();

          if (isPulsing) {
            ctx.beginPath();
            ctx.arc(
              pos.x + hexR * 0.6,
              pos.y - hexR * 0.5,
              dotR + 4,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = healthColor;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
      }

      // Animated messages routing between nodes
      if (frame > lightUpEnd && frame < messageEnd) {
        const msgPhase = frame - lightUpEnd;
        for (let r = 0; r < MESSAGE_ROUTES.length; r++) {
          const route = MESSAGE_ROUTES[r];
          const routeDelay = r * 20;
          const mf = msgPhase - routeDelay;
          if (mf < 0) continue;

          const segFrames = 18;
          const totalMsgFrames = (route.length - 1) * segFrames;
          const mt = (mf % totalMsgFrames) / segFrames;
          const segIdx = Math.floor(mt);
          const segT = mt - segIdx;

          if (segIdx >= route.length - 1) continue;

          const fromPos = getNodePos(NODES[route[segIdx]]);
          const toPos = getNodePos(NODES[route[segIdx + 1]]);
          const mx = fromPos.x + (toPos.x - fromPos.x) * segT;
          const my = fromPos.y + (toPos.y - fromPos.y) * segT;

          // Message dot
          ctx.beginPath();
          ctx.arc(mx, my, 3, 0, Math.PI * 2);
          ctx.fillStyle = msgColor;
          ctx.fill();

          // Trail glow
          ctx.beginPath();
          ctx.arc(mx, my, 7, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? "rgba(96,165,250,0.15)"
            : "rgba(59,130,246,0.1)";
          ctx.fill();
        }
      }

      // Header
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Service Mesh", 14, 5);

      // Status
      if (frame > lightUpEnd) {
        const activeCount = NODES.filter((_, i) => frame > i * 12).length;
        ctx.textAlign = "right";
        ctx.fillStyle = mutedText;
        ctx.fillText(`${activeCount} services`, W - 14, 5);
      }

      // Messages counter
      if (frame > lightUpEnd && frame < messageEnd) {
        const msgCount = Math.floor((frame - lightUpEnd) / 3);
        ctx.font = "bold 8px var(--font-geist-mono, monospace)";
        ctx.fillStyle = msgColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${msgCount} msgs routed`, W / 2, H - 4);
      }

      frameRef.current = (frame + 1) % TOTAL_FRAMES;

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
