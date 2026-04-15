"use client";

import { useEffect, useRef } from "react";

export function ApiDevelopmentVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const CYCLE_FRAMES = 360;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const endpoints = [
      {
        method: "GET",
        path: "/users",
        status: 200,
        response: '{"users":[...]}',
      },
      {
        method: "POST",
        path: "/orders",
        status: 201,
        response: '{"id":"ord-42"}',
      },
      {
        method: "PUT",
        path: "/users/:id",
        status: 200,
        response: '{"updated":true}',
      },
      {
        method: "DELETE",
        path: "/sessions",
        status: 204,
        response: '{"ok":true}',
      },
      {
        method: "GET",
        path: "/analytics",
        status: 200,
        response: '{"views":1847}',
      },
    ];

    const methodColors: Record<string, { dark: string; light: string }> = {
      GET: { dark: "#4ade80", light: "#22c55e" },
      POST: { dark: "#60a5fa", light: "#3b82f6" },
      PUT: { dark: "#fbbf24", light: "#f59e0b" },
      DELETE: { dark: "#f87171", light: "#ef4444" },
    };

    function easeOut(x: number) {
      return 1 - (1 - x) ** 3;
    }

    function draw() {
      if (!runningRef.current) return;
      const w = canvas!.getBoundingClientRect().width;
      const h = canvas!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      const dark = document.documentElement.classList.contains("dark");
      const bg = dark ? "#0a0a0a" : "#fafafa";
      const textMain = dark ? "#e5e5e5" : "#171717";
      const textSub = dark ? "#a3a3a3" : "#737373";
      const accent = dark ? "#a78bfa" : "#8b5cf6";
      const accentFaint = dark
        ? "rgba(167,139,250,0.12)"
        : "rgba(139,92,246,0.08)";
      const cardBg = dark ? "#1a1a1a" : "#ffffff";
      const cardBorder = dark ? "#2a2a2a" : "#e5e5e5";
      const font = "var(--font-geist-mono, monospace)";

      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      const t = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;

      const listX = w * 0.04;
      const listW = w * 0.32;
      const rowH = h * 0.14;
      const rowGap = h * 0.02;
      const listTop = h * 0.08;

      const cycleIdx = Math.floor((frame / CYCLE_FRAMES) % endpoints.length);
      const activeIdx = Math.floor(t / 0.2) % endpoints.length;

      for (let i = 0; i < endpoints.length; i++) {
        const ep = endpoints[i];
        const ry = listTop + i * (rowH + rowGap);
        const isActive = i === activeIdx && t < 0.95;

        ctx!.fillStyle = isActive ? accentFaint : cardBg;
        ctx!.strokeStyle = isActive ? accent : cardBorder;
        ctx!.lineWidth = isActive ? 1.5 : 0.8;
        ctx!.beginPath();
        ctx!.roundRect(listX, ry, listW, rowH, 4);
        ctx!.fill();
        ctx!.stroke();

        const mColor = methodColors[ep.method] || methodColors.GET;
        ctx!.fillStyle = dark ? mColor.dark : mColor.light;
        ctx!.font = `bold 9px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(ep.method, listX + 8, ry + rowH / 2 - 2);

        ctx!.fillStyle = textMain;
        ctx!.font = `10px ${font}`;
        ctx!.fillText(ep.path, listX + 55, ry + rowH / 2 - 2);

        if (isActive) {
          const pulseAlpha = 0.5 + Math.sin(frame * 0.15) * 0.3;
          ctx!.globalAlpha = pulseAlpha;
          ctx!.fillStyle = accent;
          ctx!.beginPath();
          ctx!.arc(listX + listW - 10, ry + rowH / 2, 3, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }
      }

      const ep = endpoints[activeIdx];
      const activeRowY = listTop + activeIdx * (rowH + rowGap);
      const arrowStartX = listX + listW + 4;
      const responseX = w * 0.54;
      const responseW = w * 0.42;
      const arrowEndX = responseX - 4;
      const arrowY = activeRowY + rowH / 2;

      const phaseInCycle = (t % 0.2) / 0.2;

      const requestProgress = Math.max(0, Math.min(1, phaseInCycle / 0.35));
      if (requestProgress > 0) {
        const reqEndX =
          arrowStartX + (arrowEndX - arrowStartX) * easeOut(requestProgress);

        ctx!.strokeStyle = accent;
        ctx!.lineWidth = 1.5;
        ctx!.globalAlpha = 0.7;
        ctx!.beginPath();
        ctx!.moveTo(arrowStartX, arrowY);
        ctx!.lineTo(reqEndX, arrowY);
        ctx!.stroke();

        if (requestProgress > 0.6) {
          ctx!.beginPath();
          ctx!.moveTo(reqEndX, arrowY);
          ctx!.lineTo(reqEndX - 6, arrowY - 3);
          ctx!.lineTo(reqEndX - 6, arrowY + 3);
          ctx!.closePath();
          ctx!.fillStyle = accent;
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
      }

      const responseAlpha = Math.max(
        0,
        Math.min(1, (phaseInCycle - 0.35) / 0.15)
      );
      if (responseAlpha > 0) {
        const respH = h * 0.28;
        const respY = Math.max(
          h * 0.05,
          Math.min(arrowY - respH / 2, h - respH - h * 0.1)
        );
        const slideOffset = (1 - easeOut(responseAlpha)) * 15;

        ctx!.globalAlpha = responseAlpha;

        ctx!.fillStyle = cardBg;
        ctx!.strokeStyle = accent;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.roundRect(responseX + slideOffset, respY, responseW, respH, 6);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = accent;
        ctx!.fillRect(responseX + slideOffset, respY, responseW, 3);

        const statusColor =
          ep.status < 300
            ? dark
              ? "#4ade80"
              : "#22c55e"
            : ep.status < 400
              ? dark
                ? "#fbbf24"
                : "#f59e0b"
              : dark
                ? "#f87171"
                : "#ef4444";

        ctx!.fillStyle = statusColor;
        ctx!.font = `bold 11px ${font}`;
        ctx!.textAlign = "left";
        ctx!.fillText(`${ep.status}`, responseX + slideOffset + 10, respY + 20);

        ctx!.fillStyle = textSub;
        ctx!.font = `9px ${font}`;
        ctx!.fillText(
          ep.status === 200
            ? "OK"
            : ep.status === 201
              ? "Created"
              : ep.status === 204
                ? "No Content"
                : "OK",
          responseX + slideOffset + 42,
          respY + 20
        );

        ctx!.fillStyle = textSub;
        ctx!.font = `8px ${font}`;
        ctx!.fillText("Response:", responseX + slideOffset + 10, respY + 40);

        ctx!.fillStyle = accent;
        ctx!.font = `10px ${font}`;

        const respText = ep.response;
        const maxChars = Math.floor((responseW - 20) / 6.5);
        const displayResp =
          respText.length > maxChars
            ? respText.slice(0, maxChars) + "…"
            : respText;
        ctx!.fillText(displayResp, responseX + slideOffset + 10, respY + 56);

        const latency =
          12 + activeIdx * 8 + Math.round(Math.sin(frame * 0.03) * 3);
        ctx!.fillStyle = textSub;
        ctx!.font = `8px ${font}`;
        ctx!.textAlign = "right";
        ctx!.fillText(
          `${latency}ms`,
          responseX + slideOffset + responseW - 10,
          respY + 20
        );

        ctx!.globalAlpha = 1;
      }

      const footY = h * 0.95;
      ctx!.fillStyle = textSub;
      ctx!.font = `9px ${font}`;
      ctx!.textAlign = "center";
      ctx!.fillText(`${endpoints.length} endpoints  ·  REST API`, w / 2, footY);

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          draw();
        } else {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(canvas);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
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
