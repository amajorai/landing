"use client";
import { useEffect, useRef } from "react";

const DOCS = [
  ['{ "_id": "1",', '  "name": "Alice",', '  "age": 30 }'],
  [
    '{ "_id": "2",',
    '  "name": "Bob",',
    '  "hobbies":',
    '    ["js","rust"],',
    '  "verified": true }',
  ],
  ['{ "_id": "3",', '  "company": "ACME",', '  "employees": 42 }'],
];

const FADE_IN_EACH = 40;
const GAP_BETWEEN = 10;
const QUERY_START_DELAY = 30;
const QUERY_DURATION = 70;
const HOLD = 60;

const TOTAL =
  DOCS.length * (FADE_IN_EACH + GAP_BETWEEN) +
  QUERY_START_DELAY +
  QUERY_DURATION +
  HOLD;

export function MongodbVisualization() {
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
      const docColor = isDark
        ? "rgba(74,222,128,0.12)"
        : "rgba(22,163,74,0.10)";
      const docBorder = isDark ? "#4ade80" : "#16a34a";
      const queryColor = "#fbbf24";
      const matchColor = "#4ade80";
      const textColor = isDark ? "#f0fdf4" : "#14532d";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      // Title
      ctx.font = "bold 8px var(--font-geist-mono, monospace)";
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.7;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("collection: users  //  No fixed schema", 10, 6);
      ctx.globalAlpha = 1;

      const docW = (W - 40) / 3;
      const docH = H * 0.56;
      const docY = 22;
      const gap = 8;
      const totalW = 3 * docW + 2 * gap;
      const startX = (W - totalW) / 2;

      const queryStart =
        DOCS.length * (FADE_IN_EACH + GAP_BETWEEN) + QUERY_START_DELAY;
      const queryPhase = frame >= queryStart;
      const queryProgress = queryPhase
        ? Math.min((frame - queryStart) / QUERY_DURATION, 1)
        : 0;

      for (let i = 0; i < DOCS.length; i++) {
        const appearStart = i * (FADE_IN_EACH + GAP_BETWEEN);
        const appearEnd = appearStart + FADE_IN_EACH;
        let docAlpha = 0;
        if (frame >= appearEnd) docAlpha = 1;
        else if (frame >= appearStart)
          docAlpha = (frame - appearStart) / FADE_IN_EACH;
        if (docAlpha <= 0) continue;

        const x = startX + i * (docW + gap);
        const y = docY + (1 - docAlpha) * 10;

        const doc = DOCS[i];
        const hasNameA = doc.some((line) => /name": "A/.test(line));
        const isMatched = queryPhase && queryProgress > 0.4 && hasNameA;

        ctx.globalAlpha = docAlpha;

        ctx.beginPath();
        ctx.roundRect(x, y, docW, docH, 6);
        ctx.fillStyle = isMatched
          ? isDark
            ? "rgba(74,222,128,0.22)"
            : "rgba(22,163,74,0.18)"
          : docColor;
        ctx.fill();
        ctx.strokeStyle = isMatched ? matchColor : docBorder;
        ctx.lineWidth = isMatched ? 2 : 1;
        ctx.stroke();

        ctx.font = "7px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const revealRatio = Math.min(
          (frame - appearStart) / (FADE_IN_EACH * 0.9),
          1
        );
        let ly = y + 7;
        for (const line of doc) {
          const shown = line.slice(
            0,
            Math.max(0, Math.floor(line.length * revealRatio))
          );
          ctx.fillText(shown, x + 6, ly);
          ly += 9;
        }

        if (isMatched) {
          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = matchColor;
          ctx.textAlign = "right";
          ctx.fillText("✓ match", x + docW - 6, y + docH - 10);
        }
      }
      ctx.globalAlpha = 1;

      // Query bar
      if (queryPhase) {
        const queryText = "db.users.find({ name: /A/ })";
        const qH = 16;
        const qY = H - qH - 6;
        const qX = 10;
        const qW = W - 20;

        ctx.beginPath();
        ctx.roundRect(qX, qY, qW, qH, 4);
        ctx.fillStyle = isDark
          ? "rgba(251,191,36,0.12)"
          : "rgba(217,119,6,0.12)";
        ctx.fill();
        ctx.strokeStyle = queryColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        const charsShown = Math.floor(queryProgress * 2 * queryText.length);
        const shown = queryText.slice(
          0,
          Math.min(charsShown, queryText.length)
        );
        ctx.font = "9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = queryColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(shown, qX + 6, qY + qH / 2);
      }

      frameRef.current = (frame + 1) % TOTAL;

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
