"use client";
import { useEffect, useRef } from "react";

function easeOut(t: number) {
  return 1 - (1 - t) ** 2;
}

const EXCHANGES = [
  {
    user: "What's my order status?",
    bot: "Order #4821 shipped! Arrives Friday.",
  },
  {
    user: "Can I change the address?",
    bot: "Yes — updated to your new address.",
  },
];
const CYCLE_MS = 6400;
const TYPING_DOTS_MS = 900;

export function AiChatbotVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (now: number) => {
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

      const accentUser = isDark ? "#818cf8" : "#4f46e5";
      const accentBot = isDark ? "#34d399" : "#059669";
      const userBubbleBg = isDark
        ? "rgba(129,140,248,0.14)"
        : "rgba(79,70,229,0.09)";
      const botBubbleBg = isDark
        ? "rgba(52,211,153,0.12)"
        : "rgba(5,150,105,0.08)";
      const userBorder = isDark
        ? "rgba(129,140,248,0.28)"
        : "rgba(79,70,229,0.20)";
      const botBorder = isDark
        ? "rgba(52,211,153,0.28)"
        : "rgba(5,150,105,0.20)";
      const textUser = isDark ? "#c7d2fe" : "#312e81";
      const textBot = isDark ? "#d1fae5" : "#064e3b";

      ctx.clearRect(0, 0, W, H);

      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS;

      const fontSize = Math.min(9, W * 0.029);
      const bubblePad = 8;
      const maxBubbleW = W * 0.62;
      const bubbleH = fontSize * 2.8;
      const gapY = bubbleH * 0.7;
      const startY = H * 0.12;

      // Timeline: 4 events (user1, bot1, user2, bot2), each at t = 0,0.2,0.5,0.7
      const eventTs = [0.04, 0.24, 0.5, 0.68];
      const typingDuration = 0.1;

      for (let ei = 0; ei < 2; ei++) {
        const exch = EXCHANGES[ei];
        const baseY = startY + ei * (bubbleH + gapY) * 2;

        // user bubble
        const userAppear = eventTs[ei * 2];
        const userT = t < userAppear ? 0 : Math.min(1, (t - userAppear) / 0.1);
        if (userT > 0) {
          const bubbleW = Math.min(
            ctx.measureText(exch.user).width * (fontSize / 9) +
              bubblePad * 2 +
              10,
            maxBubbleW
          );
          const bx = W - W * 0.05 - bubbleW;
          const by = baseY;
          ctx.globalAlpha = easeOut(userT);
          ctx.fillStyle = userBubbleBg;
          ctx.strokeStyle = userBorder;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(bx, by, bubbleW, bubbleH, [8, 2, 8, 8]);
          ctx.fill();
          ctx.stroke();
          ctx.font = `${fontSize}px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = textUser;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(exch.user, bx + bubblePad, by + bubbleH / 2);
          ctx.globalAlpha = 1;
        }

        // typing dots
        const botAppear = eventTs[ei * 2 + 1];
        const dotsT = t > userAppear + 0.08 && t < botAppear ? 1 : 0;
        const botY = baseY + bubbleH + gapY;

        if (dotsT > 0) {
          const dotCycle =
            ((now - startRef.current) % TYPING_DOTS_MS) / TYPING_DOTS_MS;
          ctx.fillStyle = accentBot;
          for (let d = 0; d < 3; d++) {
            const dAlpha =
              Math.sin(dotCycle * Math.PI * 2 - d * 0.8) * 0.5 + 0.5;
            ctx.globalAlpha = dAlpha;
            ctx.beginPath();
            ctx.arc(W * 0.06 + d * 10, botY + bubbleH / 2, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }

        // bot bubble
        const botT = t < botAppear ? 0 : Math.min(1, (t - botAppear) / 0.12);
        if (botT > 0) {
          const botText = exch.bot;
          ctx.font = `${fontSize}px var(--font-geist-mono, monospace)`;
          const bubbleW = Math.min(
            ctx.measureText(botText).width + bubblePad * 2 + 10,
            maxBubbleW
          );
          const bx = W * 0.05;
          ctx.globalAlpha = easeOut(botT);
          ctx.fillStyle = botBubbleBg;
          ctx.strokeStyle = botBorder;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(bx, botY, bubbleW, bubbleH, [2, 8, 8, 8]);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = textBot;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(botText, bx + bubblePad, botY + bubbleH / 2);
          ctx.globalAlpha = 1;
        }
      }

      // header bar
      ctx.fillStyle = isDark ? "rgba(52,211,153,0.07)" : "rgba(5,150,105,0.05)";
      ctx.strokeStyle = isDark
        ? "rgba(52,211,153,0.18)"
        : "rgba(5,150,105,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(W * 0.03, H * 0.02, W * 0.94, H * 0.1, [4, 4, 0, 0]);
      ctx.fill();
      ctx.stroke();
      ctx.font = `bold ${fontSize}px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = accentBot;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("● AI Support Assistant", W * 0.05, H * 0.07);

      // online indicator
      const pulse = Math.sin(now * 0.004) * 0.3 + 0.7;
      ctx.globalAlpha = pulse;
      ctx.beginPath();
      ctx.arc(W * 0.92, H * 0.07, 4, 0, Math.PI * 2);
      ctx.fillStyle = accentBot;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = "7px var(--font-geist-mono, monospace)";
      ctx.fillStyle = accentBot;
      ctx.textAlign = "right";
      ctx.fillText("online", W * 0.89, H * 0.07);

      if (runningRef.current) rafRef.current = requestAnimationFrame(draw);
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
