"use client";
import { useEffect, useRef } from "react";

// .NET MVC: HTTP Request → Filter Pipeline → Controller → (Model → DB) → View → Response
// A token travels through each stage of the pipeline, branches to Model then View.

const STAGES = {
  filters: ["Auth", "Authz", "Action"],
};

const FRAMES_PER_STAGE = 30;
// request → filter1 → filter2 → filter3 → controller → model → db → back → view → response
const STAGE_COUNT = 10;
const TOTAL_FRAMES = STAGE_COUNT * FRAMES_PER_STAGE + 40;

export function DotnetMvcVisualization() {
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
      const controllerColor = isDark ? "#c084fc" : "#9333ea";
      const modelColor = isDark ? "#818cf8" : "#6d28d9";
      const viewColor = isDark ? "#a78bfa" : "#7c3aed";
      const filterColor = "#fb923c";
      const dbColor = "#4ade80";
      const textColor = isDark ? "#faf5ff" : "#3b0764";
      const boxFill = isDark
        ? "rgba(192,132,252,0.12)"
        : "rgba(147,51,234,0.08)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;
      const stageIdx = Math.min(
        Math.floor(frame / FRAMES_PER_STAGE),
        STAGE_COUNT
      );
      const stageT = (frame % FRAMES_PER_STAGE) / FRAMES_PER_STAGE;

      const drawBox = (
        x: number,
        y: number,
        w: number,
        h: number,
        color: string,
        label: string,
        sub?: string,
        highlight = false
      ) => {
        ctx.fillStyle = highlight
          ? isDark
            ? "rgba(192,132,252,0.28)"
            : "rgba(147,51,234,0.2)"
          : boxFill;
        ctx.strokeStyle = color;
        ctx.lineWidth = highlight ? 1.8 : 1.2;
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.font = `${Math.round(h * 0.32)}px var(--font-geist-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x + w / 2, y + h / 2 - (sub ? 5 : 0));
        if (sub) {
          ctx.font = `${Math.round(h * 0.22)}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = color;
          ctx.fillText(sub, x + w / 2, y + h / 2 + 7);
        }
      };

      const line = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: string,
        dashed = false
      ) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        if (dashed) ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // ---- Layout ----
      // Top: HTTP Request pill
      const reqY = H * 0.02;
      const reqH = H * 0.1;
      drawBox(
        W * 0.35,
        reqY,
        W * 0.3,
        reqH,
        controllerColor,
        "HTTP Request",
        "GET /users"
      );

      // Filter pipeline (horizontal, above controller)
      const fpY = H * 0.2;
      const fpH = H * 0.1;
      const fpW = W * 0.17;
      const fpGap = W * 0.02;
      const fpStartX = W * 0.08;
      for (let i = 0; i < STAGES.filters.length; i++) {
        const x = fpStartX + i * (fpW + fpGap);
        drawBox(
          x,
          fpY,
          fpW,
          fpH,
          filterColor,
          STAGES.filters[i],
          "filter",
          stageIdx - 1 === i
        );
      }
      // arrow from last filter to controller
      ctx.strokeStyle = filterColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      const fpEndX = fpStartX + 3 * fpW + 2 * fpGap;
      ctx.moveTo(fpEndX, fpY + fpH / 2);
      ctx.lineTo(W * 0.78, fpY + fpH / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = filterColor;
      ctx.font = `${Math.round(H * 0.038)}px var(--font-geist-mono, monospace)`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Filter pipeline", fpStartX, fpY - 4);

      // Controller (center)
      const ctrlY = H * 0.36;
      const ctrlH = H * 0.18;
      const ctrlX = W * 0.32;
      const ctrlW = W * 0.36;
      drawBox(
        ctrlX,
        ctrlY,
        ctrlW,
        ctrlH,
        controllerColor,
        "UsersController",
        "[HttpGet] Index()",
        stageIdx === 4
      );

      // Model (bottom-left)
      const modelY = H * 0.62;
      const modelH = H * 0.14;
      const modelX = W * 0.04;
      const modelW = W * 0.28;
      drawBox(
        modelX,
        modelY,
        modelW,
        modelH,
        modelColor,
        "Model",
        "User.GetAll()",
        stageIdx === 5
      );

      // DB (below model)
      const dbY = H * 0.82;
      const dbH = H * 0.14;
      drawBox(
        modelX + modelW * 0.15,
        dbY,
        modelW * 0.7,
        dbH,
        dbColor,
        "EF Core DB",
        undefined,
        stageIdx === 6
      );

      // View (bottom-right)
      const viewY = H * 0.62;
      const viewX = W * 0.68;
      const viewW = W * 0.28;
      drawBox(
        viewX,
        viewY,
        viewW,
        modelH,
        viewColor,
        "View",
        "Razor HTML",
        stageIdx === 8
      );

      // Response pill (bottom right corner)
      drawBox(
        viewX + viewW * 0.08,
        dbY,
        viewW * 0.84,
        dbH,
        controllerColor,
        "HTTP Response",
        "200 OK",
        stageIdx === 9
      );

      // ---- Connectors ----
      // request down to filters
      line(W * 0.5, reqY + reqH, W * 0.5, fpY, controllerColor, true);
      // controller → model
      line(
        ctrlX + ctrlW * 0.25,
        ctrlY + ctrlH,
        modelX + modelW / 2,
        modelY,
        modelColor,
        true
      );
      // model → db
      line(
        modelX + modelW / 2,
        modelY + modelH,
        modelX + modelW / 2,
        dbY,
        dbColor,
        true
      );
      // controller → view
      line(
        ctrlX + ctrlW * 0.75,
        ctrlY + ctrlH,
        viewX + viewW / 2,
        viewY,
        viewColor,
        true
      );
      // view → response
      line(
        viewX + viewW / 2,
        viewY + modelH,
        viewX + viewW / 2,
        dbY,
        controllerColor,
        true
      );

      // ---- Traveling token ----
      // compute token position based on stageIdx
      const stageCenters: { x: number; y: number }[] = [
        { x: W * 0.5, y: reqY + reqH / 2 }, // 0 request
        { x: fpStartX + fpW / 2, y: fpY + fpH / 2 }, // 1 auth
        { x: fpStartX + fpW * 1.5 + fpGap, y: fpY + fpH / 2 }, // 2 authz
        { x: fpStartX + fpW * 2.5 + fpGap * 2, y: fpY + fpH / 2 }, // 3 action
        { x: ctrlX + ctrlW / 2, y: ctrlY + ctrlH / 2 }, // 4 controller
        { x: modelX + modelW / 2, y: modelY + modelH / 2 }, // 5 model
        { x: modelX + modelW / 2, y: dbY + dbH / 2 }, // 6 db
        { x: ctrlX + ctrlW / 2, y: ctrlY + ctrlH / 2 }, // 7 back to controller
        { x: viewX + viewW / 2, y: viewY + modelH / 2 }, // 8 view
        { x: viewX + viewW / 2, y: dbY + dbH / 2 }, // 9 response
      ];
      if (stageIdx < stageCenters.length) {
        const from = stageCenters[stageIdx];
        const to =
          stageCenters[Math.min(stageIdx + 1, stageCenters.length - 1)];
        const tx = from.x + (to.x - from.x) * stageT;
        const ty = from.y + (to.y - from.y) * stageT;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.stroke();
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
