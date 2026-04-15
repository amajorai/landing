"use client";

import { useEffect, useRef } from "react";

export function GraphqlVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE = 420; // ~7 seconds at 60fps

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    const queryLines = [
      "query {",
      "  user(id: 1) {",
      "    name",
      "    posts {",
      "      title",
      "    }",
      "  }",
      "}",
    ];

    const resolvers = [
      { label: "Users DB", y: 0.25 },
      { label: "Posts API", y: 0.5 },
      { label: "Auth Svc", y: 0.75 },
    ];

    function draw() {
      if (!(ctx && canvas)) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dark = isDark();
      const t = (frame % CYCLE) / CYCLE;

      ctx.clearRect(0, 0, w, h);
      ctx.font = "10px var(--font-geist-mono, monospace)";

      const fg = dark ? "#e5e5e5" : "#171717";
      const muted = dark ? "#525252" : "#a3a3a3";
      const accent = "#E535AB";
      const accentDim = dark ? "#9B2574" : "#F19ED5";
      const stageBg = dark ? "#1a1a1a" : "#f5f5f5";

      // Layout
      const queryX = w * 0.04;
      const resolverX = w * 0.68;
      const resolverW = Math.min(80, w * 0.14);
      const responseX = w * 0.04;
      const midX = w * 0.45;

      // Phase timing
      const pQuery = 0.18;
      const pParse = 0.38;
      const pResolve = 0.6;
      const pMerge = 0.78;

      // Query text appearing (left side, top half)
      const lineH = 14;
      const queryTopY = h * 0.15;
      const endFade = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

      for (let i = 0; i < queryLines.length; i++) {
        const lineDelay = (i / queryLines.length) * pQuery;
        const lineAlpha = Math.max(0, Math.min(1, (t - lineDelay) / 0.04));

        // After merge phase, query fades for response
        const queryFade = t > pMerge ? Math.max(0, 1 - (t - pMerge) / 0.06) : 1;

        if (lineAlpha > 0) {
          ctx.globalAlpha = lineAlpha * queryFade * endFade;
          ctx.fillStyle = i === 0 || i === queryLines.length - 1 ? accent : fg;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";

          // Typing effect
          const fullLine = queryLines[i];
          const charProgress = Math.min(1, (lineAlpha - 0.3) / 0.7);
          const visibleChars = Math.max(
            0,
            Math.floor(fullLine.length * charProgress)
          );
          const displayLine = fullLine.slice(0, visibleChars);

          ctx.fillText(displayLine, queryX, queryTopY + i * lineH);

          // Cursor blink at end of typing line
          if (charProgress < 1 && charProgress > 0) {
            const cursorX = queryX + ctx.measureText(displayLine).width;
            if (Math.floor(frame / 15) % 2 === 0) {
              ctx.fillStyle = accent;
              ctx.fillRect(cursorX + 1, queryTopY + i * lineH, 1.5, lineH - 2);
            }
          }

          ctx.globalAlpha = 1;
        }
      }

      // Parse arrows fanning to resolvers
      if (t > pQuery) {
        const parseProgress = Math.max(
          0,
          Math.min(1, (t - pQuery) / (pParse - pQuery))
        );

        for (let i = 0; i < resolvers.length; i++) {
          const resolver = resolvers[i];
          const arrowDelay = i / resolvers.length;
          const arrowProgress = Math.max(
            0,
            Math.min(1, (parseProgress - arrowDelay * 0.3) * 2)
          );

          if (arrowProgress > 0) {
            const startY = queryTopY + (queryLines.length * lineH) / 2;
            const endY = h * resolver.y;
            const queryEndX = queryX + Math.min(140, w * 0.22);

            // Arrow line
            const currentX =
              queryEndX + (resolverX - queryEndX) * arrowProgress;
            const currentY = startY + (endY - startY) * arrowProgress;

            ctx.globalAlpha = arrowProgress * 0.6 * endFade;
            ctx.strokeStyle = accent;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(queryEndX, startY);
            ctx.quadraticCurveTo(midX, (startY + endY) / 2, currentX, currentY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Arrow tip
            if (arrowProgress > 0.8) {
              ctx.globalAlpha = (arrowProgress - 0.8) * 5 * endFade;
              ctx.fillStyle = accent;
              ctx.beginPath();
              ctx.moveTo(currentX, currentY);
              ctx.lineTo(currentX - 6, currentY - 3);
              ctx.lineTo(currentX - 6, currentY + 3);
              ctx.closePath();
              ctx.fill();
            }

            ctx.globalAlpha = 1;
          }
        }
      }

      // Resolver boxes (right side)
      for (let i = 0; i < resolvers.length; i++) {
        const resolver = resolvers[i];
        const ry = h * resolver.y - 16;

        const boxAppear =
          t > pQuery * 0.5
            ? Math.min(1, (t - pQuery * 0.5 - i * 0.03) / 0.08)
            : 0;

        if (boxAppear > 0) {
          ctx.globalAlpha = boxAppear * endFade;

          // Is resolver active?
          const isActive = t > pParse && t < pResolve;
          const resolvePhaseT = isActive
            ? (t - pParse) / (pResolve - pParse)
            : 0;
          const myActiveT = Math.max(
            0,
            Math.min(1, (resolvePhaseT - i * 0.15) * 3)
          );

          // Box
          ctx.fillStyle = stageBg;
          ctx.strokeStyle = isActive && myActiveT > 0 ? accent : muted;
          ctx.lineWidth = isActive && myActiveT > 0 ? 1.5 : 0.5;
          ctx.beginPath();
          ctx.roundRect(resolverX, ry, resolverW, 32, 4);
          ctx.fill();
          ctx.stroke();

          // Label
          ctx.fillStyle = fg;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillText(resolver.label, resolverX + resolverW / 2, ry + 16);
          ctx.font = "10px var(--font-geist-mono, monospace)";

          // Activity indicator (spinning dot)
          if (isActive && myActiveT > 0 && myActiveT < 1) {
            const spinAngle = frame * 0.1 + i;
            const dotX = resolverX + resolverW + 10 + Math.cos(spinAngle) * 4;
            const dotY = ry + 16 + Math.sin(spinAngle) * 4;
            ctx.fillStyle = accent;
            ctx.globalAlpha = myActiveT * (1 - myActiveT) * 4 * endFade;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.globalAlpha = 1;
        }
      }

      // Return arrows (data flowing back)
      if (t > pResolve - 0.05) {
        const returnProgress = Math.max(
          0,
          Math.min(1, (t - pResolve + 0.05) / (pMerge - pResolve))
        );

        for (let i = 0; i < resolvers.length; i++) {
          const resolver = resolvers[i];
          const arrowDelay = i / resolvers.length;
          const arrowProgress = Math.max(
            0,
            Math.min(1, (returnProgress - arrowDelay * 0.2) * 2)
          );

          if (arrowProgress > 0) {
            const startY = h * resolver.y;
            const endY = h * 0.55;
            const endX = queryX + Math.min(140, w * 0.22);

            const currentX = resolverX - (resolverX - endX) * arrowProgress;
            const currentY = startY + (endY - startY) * arrowProgress;

            ctx.globalAlpha = arrowProgress * 0.5 * endFade;
            ctx.strokeStyle = accentDim;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(resolverX, startY);
            ctx.quadraticCurveTo(midX, (startY + endY) / 2, currentX, currentY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
          }
        }
      }

      // Merged response appearing (left side, bottom half after query fades)
      if (t > pMerge) {
        const responseProgress = Math.min(1, (t - pMerge) / 0.12);
        const responseLines = [
          "{",
          '  "user": {',
          '    "name": "Alice",',
          '    "posts": [{',
          '      "title": "Hello"',
          "    }]",
          "  }",
          "}",
        ];

        const respY = h * 0.15;

        for (let i = 0; i < responseLines.length; i++) {
          const lineDelay = (i / responseLines.length) * 0.8;
          const lineAlpha = Math.max(
            0,
            Math.min(1, (responseProgress - lineDelay) * 3)
          );

          if (lineAlpha > 0) {
            ctx.globalAlpha = lineAlpha * endFade;
            ctx.fillStyle =
              i === 0 || i === responseLines.length - 1 ? accent : fg;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(responseLines[i], responseX, respY + i * lineH);
            ctx.globalAlpha = 1;
          }
        }

        // "200 OK" label
        if (responseProgress > 0.5) {
          const okAlpha = Math.min(1, (responseProgress - 0.5) * 4);
          ctx.globalAlpha = okAlpha * endFade;
          ctx.fillStyle = "#22c55e";
          ctx.font = "bold 11px var(--font-geist-mono, monospace)";
          ctx.textAlign = "left";
          ctx.fillText(
            "200 OK",
            responseX,
            respY + responseLines.length * lineH + 8
          );
          ctx.font = "10px var(--font-geist-mono, monospace)";
          ctx.globalAlpha = 1;
        }
      }

      frame++;
      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          rafRef.current = requestAnimationFrame(draw);
        } else {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observerRef.current?.disconnect();
      window.removeEventListener("resize", resize);
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
