"use client";

import { useEffect, useRef } from "react";

export function RedisVisualization() {
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
    const CYCLE = 480; // ~8 seconds at 60fps

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

    interface KVEntry {
      key: string;
      value: string;
      ttl: number;
    }

    const entries: KVEntry[] = [
      { key: "user:1001", value: '{"name":"Alice"}', ttl: 120 },
      { key: "session:x9f", value: "token_abc123", ttl: 60 },
      { key: "cache:home", value: "<html>...</html>", ttl: 300 },
      { key: "rate:api", value: "42", ttl: 10 },
      { key: "config:app", value: '{"v":"2.1"}', ttl: 0 },
    ];

    function draw() {
      if (!(ctx && canvas)) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dark = isDark();
      const t = (frame % CYCLE) / CYCLE;

      ctx.clearRect(0, 0, w, h);

      const fg = dark ? "#e5e5e5" : "#171717";
      const muted = dark ? "#525252" : "#a3a3a3";
      const accent = "#DC382D";
      const accentDim = dark ? "#8B2318" : "#F09E99";
      const stageBg = dark ? "#1a1a1a" : "#f5f5f5";
      const barBg = dark ? "#262626" : "#e5e5e5";

      const rowH = 26;
      const rowGap = 3;
      const tableW = Math.min(320, w * 0.7);
      const tableX = (w - tableW) / 2;
      const totalTableH = entries.length * rowH + (entries.length - 1) * rowGap;
      const tableY = (h - totalTableH) / 2 + 10;
      const keyColW = tableW * 0.32;
      const valColW = tableW * 0.48;
      const ttlColW = tableW * 0.2;

      // Phase timing
      const pSet = 0.3;
      const pGet = 0.55;
      const pTtl = 0.8;

      // Header
      const headerY = tableY - 20;
      ctx.font = "bold 10px var(--font-geist-mono, monospace)";
      ctx.textBaseline = "middle";
      ctx.fillStyle = muted;
      ctx.textAlign = "left";
      ctx.fillText("KEY", tableX + 6, headerY);
      ctx.fillText("VALUE", tableX + keyColW + 6, headerY);
      ctx.textAlign = "right";
      ctx.fillText("TTL", tableX + tableW - 6, headerY);
      ctx.textAlign = "left";
      ctx.font = "11px var(--font-geist-mono, monospace)";

      // Determine which operation is active
      let opLabel = "";
      let opAlpha = 0;
      if (t < pSet) {
        opLabel = "SET";
        opAlpha = t < 0.04 ? t / 0.04 : t > pSet - 0.04 ? (pSet - t) / 0.04 : 1;
      } else if (t < pGet) {
        opLabel = "GET";
        opAlpha =
          t - pSet < 0.04
            ? (t - pSet) / 0.04
            : t > pGet - 0.04
              ? (pGet - t) / 0.04
              : 1;
      } else if (t < pTtl) {
        opLabel = "EXPIRE";
        opAlpha =
          t - pGet < 0.04
            ? (t - pGet) / 0.04
            : t > pTtl - 0.04
              ? (pTtl - t) / 0.04
              : 1;
      }

      // Op label at top
      if (opAlpha > 0) {
        ctx.globalAlpha = Math.max(0, opAlpha);
        ctx.fillStyle = accent;
        ctx.font = "bold 12px var(--font-geist-mono, monospace)";
        ctx.textAlign = "center";
        ctx.fillText(opLabel, w / 2, tableY - 38);
        ctx.font = "11px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = 1;
      }

      // Draw rows
      for (let i = 0; i < entries.length; i++) {
        const ry = tableY + i * (rowH + rowGap);
        const entry = entries[i];

        // SET phase: rows slide in one by one
        const setDelay = (i / entries.length) * pSet * 0.8;
        const setAlpha = Math.max(0, Math.min(1, (t - setDelay) / 0.06));
        const slideOffset = (1 - setAlpha) * 30;

        // TTL expiry: entries 1 and 3 fade out
        let ttlFade = 1;
        if (t > pGet) {
          const expiresIdx = [1, 3];
          if (expiresIdx.includes(i)) {
            const expireDelay = i === 1 ? 0 : 0.06;
            ttlFade = Math.max(
              0,
              1 - Math.max(0, (t - pGet - expireDelay) / 0.12)
            );
          }
        }

        // Cycle reset fade
        const endFade = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;

        const rowAlpha = setAlpha * ttlFade * endFade;
        if (rowAlpha <= 0) continue;

        ctx.globalAlpha = rowAlpha;

        // GET highlight flash
        let isHighlighted = false;
        if (t > pSet && t < pGet) {
          const getIdx = [0, 2, 4];
          const getPhaseT = (t - pSet) / (pGet - pSet);
          const myGetIdx = getIdx.indexOf(i);
          if (myGetIdx >= 0) {
            const getDelay = myGetIdx / getIdx.length;
            const getFlash = Math.max(
              0,
              Math.min(1, (getPhaseT - getDelay) * 4)
            );
            const getFade = Math.max(
              0,
              1 - Math.max(0, (getPhaseT - getDelay - 0.15) * 5)
            );
            if (getFlash > 0 && getFade > 0) {
              isHighlighted = true;
              ctx.fillStyle = accent;
              ctx.globalAlpha = rowAlpha * getFlash * getFade * 0.15;
              ctx.beginPath();
              ctx.roundRect(tableX + slideOffset, ry, tableW, rowH, 3);
              ctx.fill();
              ctx.globalAlpha = rowAlpha;
            }
          }
        }

        // Row background
        ctx.fillStyle = stageBg;
        ctx.beginPath();
        ctx.roundRect(tableX + slideOffset, ry, tableW, rowH, 3);
        ctx.fill();

        // Row border
        ctx.strokeStyle = isHighlighted ? accent : dark ? "#2a2a2a" : "#e0e0e0";
        ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
        ctx.beginPath();
        ctx.roundRect(tableX + slideOffset, ry, tableW, rowH, 3);
        ctx.stroke();

        // Key
        ctx.fillStyle = accent;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 10px var(--font-geist-mono, monospace)";
        ctx.fillText(entry.key, tableX + slideOffset + 6, ry + rowH / 2);

        // Value (truncated)
        ctx.fillStyle = fg;
        ctx.font = "10px var(--font-geist-mono, monospace)";
        const maxValChars = Math.floor((valColW - 12) / 6.5);
        const displayVal =
          entry.value.length > maxValChars
            ? entry.value.slice(0, maxValChars - 1) + "…"
            : entry.value;
        ctx.fillText(
          displayVal,
          tableX + slideOffset + keyColW + 6,
          ry + rowH / 2
        );

        // TTL countdown
        if (entry.ttl > 0) {
          ctx.textAlign = "right";
          ctx.fillStyle = muted;

          let ttlDisplay = entry.ttl;
          if (t > pGet && ttlFade < 1) {
            ttlDisplay = Math.max(0, Math.round(entry.ttl * ttlFade));
          } else if (t > pSet) {
            const elapsed = Math.max(0, t - pSet) / (pGet - pSet);
            ttlDisplay = Math.max(
              1,
              Math.round(entry.ttl * (1 - elapsed * 0.3))
            );
          }

          ctx.fillText(
            `${ttlDisplay}s`,
            tableX + slideOffset + tableW - 6,
            ry + rowH / 2
          );
        } else {
          ctx.textAlign = "right";
          ctx.fillStyle = muted;
          ctx.fillText("∞", tableX + slideOffset + tableW - 6, ry + rowH / 2);
        }

        ctx.textAlign = "left";
        ctx.font = "11px var(--font-geist-mono, monospace)";
        ctx.globalAlpha = 1;
      }

      // New keys sliding in after TTL expiry
      if (t > pTtl && t < 0.92) {
        const newEntries = [
          { key: "user:1042", value: '{"name":"Bob"}' },
          { key: "rate:ws", value: "7" },
        ];
        const replacedSlots = [1, 3];

        for (let ni = 0; ni < newEntries.length; ni++) {
          const slotIdx = replacedSlots[ni];
          const ry = tableY + slotIdx * (rowH + rowGap);
          const newDelay = ni * 0.03;
          const newAlpha = Math.max(
            0,
            Math.min(1, (t - pTtl - newDelay) / 0.06)
          );
          const endFade = t > 0.92 ? Math.max(0, 1 - (t - 0.92) / 0.08) : 1;
          const slideOffset = (1 - newAlpha) * -20;

          if (newAlpha > 0) {
            ctx.globalAlpha = newAlpha * endFade;

            ctx.fillStyle = stageBg;
            ctx.beginPath();
            ctx.roundRect(tableX + slideOffset, ry, tableW, rowH, 3);
            ctx.fill();

            ctx.strokeStyle = accentDim;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(tableX + slideOffset, ry, tableW, rowH, 3);
            ctx.stroke();

            ctx.fillStyle = accent;
            ctx.font = "bold 10px var(--font-geist-mono, monospace)";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(
              newEntries[ni].key,
              tableX + slideOffset + 6,
              ry + rowH / 2
            );

            ctx.fillStyle = fg;
            ctx.font = "10px var(--font-geist-mono, monospace)";
            ctx.fillText(
              newEntries[ni].value,
              tableX + slideOffset + keyColW + 6,
              ry + rowH / 2
            );

            ctx.textAlign = "right";
            ctx.fillStyle = accentDim;
            ctx.fillText(
              "NEW",
              tableX + slideOffset + tableW - 6,
              ry + rowH / 2
            );

            ctx.textAlign = "left";
            ctx.font = "11px var(--font-geist-mono, monospace)";
            ctx.globalAlpha = 1;
          }
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
