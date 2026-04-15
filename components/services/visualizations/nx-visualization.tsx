"use client";
import { useEffect, useRef } from "react";

// Nx: project graph with affected detection
interface Project {
  id: string;
  label: string;
  type: "app" | "lib";
  x: number;
  y: number;
}

const PROJECTS: Project[] = [
  { id: "web-app", label: "web-app", type: "app", x: 0.18, y: 0.22 },
  { id: "mobile-app", label: "mobile", type: "app", x: 0.5, y: 0.15 },
  { id: "api", label: "api", type: "app", x: 0.82, y: 0.25 },
  { id: "ui-lib", label: "ui-lib", type: "lib", x: 0.25, y: 0.62 },
  { id: "utils", label: "utils", type: "lib", x: 0.5, y: 0.78 },
  { id: "auth-lib", label: "auth", type: "lib", x: 0.72, y: 0.62 },
  { id: "data-access", label: "data", type: "lib", x: 0.5, y: 0.48 },
];

// edges: from lib -> who uses it (dependent)
// We'll model "A depends on B" as edges[A] = [B...]
const DEPENDS_ON: Record<string, string[]> = {
  "web-app": ["ui-lib", "utils", "data-access"],
  "mobile-app": ["ui-lib", "utils"],
  api: ["auth-lib", "utils", "data-access"],
  "ui-lib": ["utils"],
  "auth-lib": ["utils"],
  "data-access": ["utils"],
  utils: [],
};

const CHANGE_TARGETS = ["utils", "ui-lib", "auth-lib", "data-access"];
const STEP_FRAMES = 180;

function affectedOf(changed: string): Set<string> {
  const affected = new Set<string>([changed]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [proj, deps] of Object.entries(DEPENDS_ON)) {
      if (affected.has(proj)) continue;
      if (deps.some((d) => affected.has(d))) {
        affected.add(proj);
        grew = true;
      }
    }
  }
  return affected;
}

export function NxVisualization() {
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
      const affectedColor = isDark ? "#fb923c" : "#ea580c";
      const changedColor = isDark ? "#f87171" : "#dc2626";
      const normalColor = isDark
        ? "rgba(96,165,250,0.3)"
        : "rgba(37,99,235,0.25)";
      const nodeText = isDark ? "#eff6ff" : "#1e3a8a";
      const edgeColor = isDark
        ? "rgba(96,165,250,0.2)"
        : "rgba(37,99,235,0.15)";
      const affectedEdge = isDark
        ? "rgba(251,146,60,0.6)"
        : "rgba(234,88,12,0.5)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const stepIdx = Math.floor(frame / STEP_FRAMES) % CHANGE_TARGETS.length;
      const localFrame = frame % STEP_FRAMES;
      const changed = CHANGE_TARGETS[stepIdx];
      const affected = affectedOf(changed);

      // ripple expansion gating
      // stage 0: 0..20 show all dim
      // 20..40 changed lights up
      // 40..100 ripple outward (increase affected visible)
      // 100..160 all affected lit
      // 160..180 fade back to normal
      let affectedVisible = new Set<string>();
      if (localFrame < 20) {
        affectedVisible = new Set();
      } else if (localFrame < 40) {
        affectedVisible = new Set([changed]);
      } else if (localFrame < 140) {
        // gradually add
        const progress = (localFrame - 40) / 100;
        const list = Array.from(affected);
        // sort by BFS distance from changed
        const dist: Record<string, number> = { [changed]: 0 };
        const queue = [changed];
        while (queue.length) {
          const cur = queue.shift() as string;
          for (const [proj, deps] of Object.entries(DEPENDS_ON)) {
            if (deps.includes(cur) && dist[proj] === undefined) {
              dist[proj] = dist[cur] + 1;
              queue.push(proj);
            }
          }
        }
        list.sort((a, b) => (dist[a] ?? 0) - (dist[b] ?? 0));
        const count = Math.ceil(progress * list.length);
        affectedVisible = new Set(list.slice(0, count));
      } else {
        affectedVisible = affected;
      }

      const pos = (p: Project) => ({ x: p.x * W, y: p.y * H });

      // Edges
      for (const [proj, deps] of Object.entries(DEPENDS_ON)) {
        for (const dep of deps) {
          const a = PROJECTS.find((p) => p.id === proj);
          const b = PROJECTS.find((p) => p.id === dep);
          if (!(a && b)) continue;
          const pa = pos(a);
          const pb = pos(b);
          const bothAffected =
            affectedVisible.has(proj) && affectedVisible.has(dep);
          ctx.strokeStyle = bothAffected ? affectedEdge : edgeColor;
          ctx.lineWidth = bothAffected ? 1.8 : 1;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const p of PROJECTS) {
        const { x, y } = pos(p);
        const r = p.type === "app" ? 18 : 14;
        const isChanged = p.id === changed && localFrame >= 20;
        const isAffected = affectedVisible.has(p.id);

        let stroke = normalColor;
        let fill = isDark ? "rgba(96,165,250,0.08)" : "rgba(37,99,235,0.06)";
        if (isChanged) {
          stroke = changedColor;
          fill = isDark ? "rgba(248,113,113,0.25)" : "rgba(220,38,38,0.18)";
        } else if (isAffected) {
          stroke = affectedColor;
          fill = isDark ? "rgba(251,146,60,0.22)" : "rgba(234,88,12,0.14)";
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = isChanged ? 2.2 : isAffected ? 1.8 : 1.2;
        ctx.stroke();

        // Pulse ring on changed
        if (isChanged && localFrame >= 20 && localFrame < 140) {
          const pulseP = ((localFrame - 20) % 40) / 40;
          ctx.beginPath();
          ctx.arc(x, y, r + pulseP * 18, 0, Math.PI * 2);
          ctx.strokeStyle = changedColor;
          ctx.globalAlpha = 1 - pulseP;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.font = "600 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = nodeText;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, x, y);
      }

      // Status label
      ctx.font = "600 10px var(--font-geist-mono, monospace)";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = nodeText;
      ctx.fillText(
        localFrame < 20
          ? "nx affected"
          : `changed: ${changed}  affected: ${affectedVisible.size}`,
        10,
        H - 8
      );

      frameRef.current = (frame + 1) % (STEP_FRAMES * CHANGE_TARGETS.length);

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
