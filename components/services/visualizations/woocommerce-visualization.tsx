"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STAGES = ["shop", "cart", "done"] as const;
type Stage = (typeof STAGES)[number];

export function WoocommerceVisualization() {
  const [isDark, setIsDark] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const start = () => {
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setStageIndex((i) => (i + 1) % STAGES.length);
    }, 1800);
  };

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const mo = new MutationObserver(checkDark);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const container = containerRef.current;
    if (!container) return () => mo.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            start();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      observerRef.current?.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stage: Stage = STAGES[stageIndex];
  const colors = {
    primary: isDark ? "#a78bfa" : "#7c3aed",
    cardBg: isDark ? "rgba(167,139,250,0.10)" : "rgba(124,58,237,0.08)",
    success: "#4ade80",
    text: isDark ? "#f5f3ff" : "#2e1065",
    muted: isDark ? "rgba(245,243,255,0.65)" : "rgba(46,16,101,0.65)",
    border: isDark ? "rgba(167,139,250,0.3)" : "rgba(124,58,237,0.25)",
  };

  const stepLabels: Record<Stage, string> = {
    shop: "Shop",
    cart: "Cart",
    done: "Complete",
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col p-3">
        {/* Stepper */}
        <div className="mb-2 flex items-center justify-center gap-2">
          {STAGES.map((s, i) => (
            <div className="flex items-center gap-2" key={s}>
              <div
                className="flex h-4 w-4 items-center justify-center rounded-full font-bold text-[8px]"
                style={{
                  background: i <= stageIndex ? colors.primary : "transparent",
                  border: `1px solid ${colors.primary}`,
                  color: i <= stageIndex ? "#fff" : colors.primary,
                }}
              >
                {i + 1}
              </div>
              <span
                className="font-mono text-[9px]"
                style={{
                  color: i === stageIndex ? colors.text : colors.muted,
                  fontWeight: i === stageIndex ? 600 : 400,
                }}
              >
                {stepLabels[s]}
              </span>
              {i < STAGES.length - 1 && (
                <span
                  className="h-px w-4"
                  style={{ background: colors.border }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {stage === "shop" && (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex h-full items-center justify-center gap-2"
                exit={{ opacity: 0, x: -30 }}
                initial={{ opacity: 0, x: 30 }}
                key="shop"
                transition={{ duration: 0.35 }}
              >
                {[
                  { name: "Wireless Headphones", price: "$89", icon: "🎧" },
                  { name: "Leather Wallet", price: "$45", icon: "👛" },
                ].map((p) => (
                  <div
                    className="flex w-[44%] flex-col items-center gap-1 rounded-md border p-2"
                    key={p.name}
                    style={{
                      background: colors.cardBg,
                      borderColor: colors.border,
                    }}
                  >
                    <span className="text-[18px]">{p.icon}</span>
                    <p
                      className="text-center font-medium text-[9px] leading-tight"
                      style={{ color: colors.text }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="font-bold text-[10px]"
                      style={{ color: colors.primary }}
                    >
                      {p.price}
                    </p>
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      className="rounded px-2 py-0.5 font-semibold text-[8px]"
                      style={{ background: colors.primary, color: "#fff" }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      Add to Cart
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            )}

            {stage === "cart" && (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="mx-auto flex h-full w-[80%] flex-col justify-center gap-1"
                exit={{ opacity: 0, x: -30 }}
                initial={{ opacity: 0, x: 30 }}
                key="cart"
                transition={{ duration: 0.35 }}
              >
                <div
                  className="flex items-center justify-between rounded px-2 py-1 text-[9px]"
                  style={{ background: colors.cardBg, color: colors.text }}
                >
                  <span>✓ Wireless Headphones × 1</span>
                  <span className="font-semibold">$89</span>
                </div>
                <div
                  className="flex items-center justify-between rounded px-2 py-1 text-[9px]"
                  style={{ background: colors.cardBg, color: colors.text }}
                >
                  <span>✓ Leather Wallet × 1</span>
                  <span className="font-semibold">$45</span>
                </div>
                <div
                  className="mt-1 flex items-center justify-between border-t pt-1 font-bold text-[10px]"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <span>Total</span>
                  <span>$134</span>
                </div>
                <div
                  className="mt-1 rounded py-1 text-center font-semibold text-[9px]"
                  style={{ background: colors.primary, color: "#fff" }}
                >
                  Checkout →
                </div>
              </motion.div>
            )}

            {stage === "done" && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-1"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key="done"
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  animate={{ scale: 1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-[18px] text-white"
                  initial={{ scale: 0 }}
                  style={{ background: colors.success }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 15,
                    delay: 0.1,
                  }}
                >
                  ✓
                </motion.div>
                <p
                  className="font-bold text-[11px]"
                  style={{ color: colors.text }}
                >
                  Order #4821 confirmed
                </p>
                <p className="text-[9px]" style={{ color: colors.muted }}>
                  Thank you for your purchase!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
