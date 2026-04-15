"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 360;
const CARD_SLIDE_END = 80;
const PRICE_END = 140;
const CART_END = 220;
const CHECKOUT_END = 310;

const PRODUCTS = [
  { name: "Sneakers", price: "$89" },
  { name: "T-Shirt", price: "$35" },
  { name: "Watch", price: "$249" },
  { name: "Backpack", price: "$65" },
];

export function ShopifyVisualization() {
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
      const accent = "#95BF47";
      const accentDim = isDark
        ? "rgba(149,191,71,0.25)"
        : "rgba(149,191,71,0.15)";
      const cardBg = isDark ? "rgba(149,191,71,0.08)" : "rgba(149,191,71,0.06)";
      const cardBorder = isDark
        ? "rgba(149,191,71,0.35)"
        : "rgba(149,191,71,0.25)";
      const textColor = isDark ? "#f0fdf4" : "#14532d";
      const mutedText = isDark ? "#86efac" : "#166534";
      const btnBg = isDark ? "rgba(149,191,71,0.3)" : "rgba(149,191,71,0.2)";

      ctx.clearRect(0, 0, W, H);

      const frame = frameRef.current;

      const gridW = Math.min(W * 0.7, 260);
      const gridH = Math.min(H * 0.6, 160);
      const gridX = (W - gridW) / 2;
      const gridY = 20;
      const cellW = gridW / 2;
      const cellH = gridH / 2;
      const gap = 6;

      const positions = [
        { x: gridX, y: gridY },
        { x: gridX + cellW + gap, y: gridY },
        { x: gridX, y: gridY + cellH + gap },
        { x: gridX + cellW + gap, y: gridY + cellH + gap },
      ];

      // Cards slide in
      for (let i = 0; i < 4; i++) {
        const cardDelay = i * 15;
        const cardProgress = Math.min(
          Math.max((frame - cardDelay) / (CARD_SLIDE_END - cardDelay), 0),
          1
        );
        const eased = 1 - (1 - cardProgress) ** 3;

        if (cardProgress <= 0) continue;

        const fromX = i % 2 === 0 ? -cellW : W + cellW;
        const targetX = positions[i].x;
        const targetY = positions[i].y;
        const curX = fromX + (targetX - fromX) * eased;

        const cw = cellW - gap;
        const ch = cellH - gap;

        ctx.globalAlpha = eased;

        ctx.beginPath();
        ctx.roundRect(curX, targetY, cw, ch, 6);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.strokeStyle = cardBorder;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Product image placeholder
        const imgH = ch * 0.4;
        ctx.beginPath();
        ctx.roundRect(curX + 6, targetY + 6, cw - 12, imgH, 3);
        ctx.fillStyle = accentDim;
        ctx.fill();

        // Product icon (shopping bag)
        ctx.font = "bold 11px var(--font-geist-mono, monospace)";
        ctx.fillStyle = accent;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("□", curX + cw / 2, targetY + 6 + imgH / 2);

        // Product name
        ctx.font = "bold 9px var(--font-geist-mono, monospace)";
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(PRODUCTS[i].name, curX + 6, targetY + imgH + 10);

        // Price tag - appears in phase 2
        const priceDelay = CARD_SLIDE_END + i * 12;
        const priceProgress = Math.min(
          Math.max((frame - priceDelay) / 20, 0),
          1
        );
        if (priceProgress > 0) {
          ctx.globalAlpha = eased * priceProgress;
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "left";
          ctx.fillText(PRODUCTS[i].price, curX + 6, targetY + imgH + 22);
        }

        // Add to cart button - appears in phase 3
        const btnDelay = PRICE_END + i * 10;
        const btnProgress = Math.min(Math.max((frame - btnDelay) / 15, 0), 1);
        if (btnProgress > 0) {
          ctx.globalAlpha = eased * btnProgress;
          const btnW = cw - 12;
          const btnH = 14;
          const btnY = targetY + ch - btnH - 6;
          ctx.beginPath();
          ctx.roundRect(curX + 6, btnY, btnW, btnH, 3);
          ctx.fillStyle = btnBg;
          ctx.fill();
          ctx.strokeStyle = accent;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.font = "bold 7px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("+ Add to Cart", curX + 6 + btnW / 2, btnY + btnH / 2);

          // Cart fill animation
          if (frame > btnDelay + 15) {
            const fillDelay = btnDelay + 15;
            const fillP = Math.min((frame - fillDelay) / 12, 1);
            ctx.beginPath();
            ctx.roundRect(curX + 6, btnY, btnW * fillP, btnH, 3);
            ctx.fillStyle = isDark
              ? "rgba(149,191,71,0.2)"
              : "rgba(149,191,71,0.12)";
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
      }

      // Checkout progress bar
      const barY = gridY + gridH + gap + 20;
      const barX = gridX;
      const barW = gridW + gap;
      const barH = 16;

      if (frame > CART_END - 20) {
        const barAppear = Math.min((frame - (CART_END - 20)) / 20, 1);
        ctx.globalAlpha = barAppear;

        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 4);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.strokeStyle = cardBorder;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Progress fill
        const checkoutStart = CART_END;
        const fillProgress = Math.min(
          Math.max((frame - checkoutStart) / (CHECKOUT_END - checkoutStart), 0),
          1
        );
        const easedFill =
          fillProgress < 0.5
            ? 2 * fillProgress * fillProgress
            : 1 - (-2 * fillProgress + 2) ** 2 / 2;

        if (fillProgress > 0) {
          ctx.beginPath();
          ctx.roundRect(
            barX + 1,
            barY + 1,
            (barW - 2) * easedFill,
            barH - 2,
            3
          );
          ctx.fillStyle = accent;
          ctx.globalAlpha = barAppear * 0.6;
          ctx.fill();
        }

        ctx.globalAlpha = barAppear;

        // Steps text
        const steps = ["Cart", "Shipping", "Payment", "Done"];
        for (let i = 0; i < steps.length; i++) {
          const sx = barX + (barW / 4) * i + barW / 8;
          const stepReached = fillProgress >= i / 3;
          ctx.font = `${stepReached ? "bold " : ""}7px var(--font-geist-mono, monospace)`;
          ctx.fillStyle = stepReached ? textColor : mutedText;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(steps[i], sx, barY + barH / 2);
        }

        // Complete badge
        if (fillProgress >= 1) {
          const badgeAlpha = Math.min((frame - CHECKOUT_END) / 20, 1);
          ctx.globalAlpha = badgeAlpha;
          ctx.font = "bold 10px var(--font-geist-mono, monospace)";
          ctx.fillStyle = accent;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText("✓ Order Complete", W / 2, barY + barH + 8);
        }

        ctx.globalAlpha = 1;
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
