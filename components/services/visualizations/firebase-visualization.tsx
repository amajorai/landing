"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 360;
const EXPAND_END = 100;
const VALUES_END = 200;
const ADD_END = 270;
const COLLAPSE_END = 340;

interface TreeNode {
  key: string;
  value: string;
  depth: number;
  parentIdx: number;
  delay: number;
  updateFrame: number;
  newValue: string;
}

const NODES: TreeNode[] = [
  {
    key: "root",
    value: "{}",
    depth: 0,
    parentIdx: -1,
    delay: 0,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "users",
    value: "{}",
    depth: 1,
    parentIdx: 0,
    delay: 15,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "posts",
    value: "{}",
    depth: 1,
    parentIdx: 0,
    delay: 25,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "uid_01",
    value: "{}",
    depth: 2,
    parentIdx: 1,
    delay: 40,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "uid_02",
    value: "{}",
    depth: 2,
    parentIdx: 1,
    delay: 50,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "name",
    value: '"Alice"',
    depth: 3,
    parentIdx: 3,
    delay: 60,
    updateFrame: 130,
    newValue: '"Alicia"',
  },
  {
    key: "online",
    value: "true",
    depth: 3,
    parentIdx: 3,
    delay: 70,
    updateFrame: 155,
    newValue: "false",
  },
  {
    key: "name",
    value: '"Bob"',
    depth: 3,
    parentIdx: 4,
    delay: 80,
    updateFrame: 170,
    newValue: '"Bobby"',
  },
  {
    key: "score",
    value: "42",
    depth: 3,
    parentIdx: 4,
    delay: 90,
    updateFrame: 145,
    newValue: "87",
  },
  {
    key: "post_1",
    value: "{...}",
    depth: 2,
    parentIdx: 2,
    delay: 55,
    updateFrame: 185,
    newValue: "{..+1}",
  },
];

const NEW_NODES: TreeNode[] = [
  {
    key: "uid_03",
    value: "{}",
    depth: 2,
    parentIdx: 1,
    delay: 210,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "name",
    value: '"Carol"',
    depth: 3,
    parentIdx: -2,
    delay: 230,
    updateFrame: -1,
    newValue: "",
  },
  {
    key: "online",
    value: "true",
    depth: 3,
    parentIdx: -2,
    delay: 245,
    updateFrame: -1,
    newValue: "",
  },
];

export function FirebaseVisualization() {
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
      const accent = "#FFA000";
      const accentDim = isDark
        ? "rgba(255,160,0,0.15)"
        : "rgba(255,160,0,0.10)";
      const nodeBg = isDark ? "rgba(255,160,0,0.08)" : "rgba(255,160,0,0.05)";
      const lineColor = isDark
        ? "rgba(255,160,0,0.25)"
        : "rgba(255,160,0,0.18)";
      const textColor = isDark ? "#fffbeb" : "#451a03";
      const keyColor = isDark ? "#fbbf24" : "#b45309";
      const valColor = isDark ? "#fcd34d" : "#d97706";
      const flashColor = "#ef4444";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const collapsing = frame > COLLAPSE_END - 40;
      const collapseT = collapsing
        ? Math.min((frame - (COLLAPSE_END - 40)) / 40, 1)
        : 0;

      const indentX = 18;
      const startX = 20;
      const startY = 16;
      const lineH = Math.min((H - 30) / 14, 18);

      let row = 0;

      const drawNode = (node: TreeNode, appeared: boolean, alpha: number) => {
        if (!appeared) return;

        const x = startX + node.depth * indentX;
        const y = startY + row * lineH;
        row++;

        ctx.globalAlpha = alpha * (1 - collapseT);

        // Connection line to parent
        if (node.depth > 0) {
          ctx.beginPath();
          ctx.moveTo(x - indentX / 2, y + lineH / 2 - lineH);
          ctx.lineTo(x - indentX / 2, y + lineH / 2 - 2);
          ctx.lineTo(x - 2, y + lineH / 2 - 2);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Expand indicator
        if (
          node.value === "{}" ||
          node.value === "{...}" ||
          node.value === "{..+1}"
        ) {
          ctx.font = "bold 9px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("▸", x + 4, y + lineH / 2);
        }

        // Key
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = keyColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.key + ":", x + 12, y + lineH / 2);

        // Value
        const keyW = ctx.measureText(node.key + ": ").width;
        const isUpdating =
          node.updateFrame > 0 && frame >= node.updateFrame && frame < ADD_END;
        const currentVal =
          isUpdating && frame >= node.updateFrame + 10
            ? node.newValue
            : node.value;

        // Flash on update
        if (isUpdating && frame - node.updateFrame < 20) {
          const flashT = (frame - node.updateFrame) / 20;
          const flashAlpha = flashT < 0.5 ? flashT * 2 : 2 - flashT * 2;

          ctx.beginPath();
          ctx.roundRect(
            x + 12 + keyW - 2,
            y + 1,
            ctx.measureText(currentVal).width + 8,
            lineH - 2,
            3
          );
          ctx.fillStyle = isDark
            ? `rgba(239,68,68,${flashAlpha * 0.3})`
            : `rgba(239,68,68,${flashAlpha * 0.15})`;
          ctx.fill();
        }

        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = isUpdating ? flashColor : valColor;
        ctx.fillText(currentVal, x + 12 + keyW, y + lineH / 2);

        ctx.globalAlpha = 1;
      };

      // Draw main nodes
      for (const node of NODES) {
        const appeared = frame >= node.delay;
        const alpha = Math.min(Math.max((frame - node.delay) / 15, 0), 1);
        drawNode(node, appeared, alpha);
      }

      // Draw new nodes
      if (frame >= ADD_END - 60) {
        for (const node of NEW_NODES) {
          const appeared = frame >= node.delay;
          const alpha = Math.min(Math.max((frame - node.delay) / 15, 0), 1);
          drawNode(node, appeared, alpha);
        }
      }

      // Real-time indicator
      const pulse = Math.sin(frame / 8) * 0.3 + 0.7;
      ctx.globalAlpha = pulse;
      ctx.beginPath();
      ctx.arc(W - 20, 12, 4, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accent;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText("REALTIME", W - 28, 12);

      // DB path header
      ctx.font = "bold 9px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.fillText("firestore://", startX, 8);

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
