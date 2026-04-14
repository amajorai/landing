"use client";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

function AnimatedItem({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}: {
  children: React.ReactNode;
  delay?: number;
  index: number;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      data-index={index}
      initial={{ scale: 0.7, opacity: 0 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={ref}
      style={{ marginBottom: "0.75rem", cursor: "pointer" }}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedListProps<T = string> {
  items?: T[];
  renderItem?: (item: T, index: number, selected: boolean) => React.ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  maxHeight?: number;
}

export default function AnimatedList<T = string>({
  items = [] as T[],
  renderItem,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = false,
  initialSelectedIndex = -1,
  maxHeight = 360,
}: AnimatedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(initialSelectedIndex);
  const [topOpacity, setTopOpacity] = useState(0);
  const [botOpacity, setBotOpacity] = useState(1);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setTopOpacity(Math.min(scrollTop / 50, 1));
    const bot = scrollHeight - (scrollTop + clientHeight);
    setBotOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bot / 50, 1));
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((p) => Math.min(p + 1, (items as unknown[]).length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Enter" && selected >= 0) {
        e.preventDefault();
        onItemSelect?.(items[selected], selected);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items, selected, onItemSelect, enableArrowNavigation]);

  return (
    <div className={`relative ${className}`}>
      <div
        onScroll={handleScroll}
        ref={listRef}
        style={{
          maxHeight,
          overflowY: "auto",
          padding: "0.75rem",
          scrollbarWidth: displayScrollbar ? "thin" : "none",
        }}
      >
        {(items as unknown[]).map((item, i) => (
          <AnimatedItem
            delay={0.05}
            index={i}
            key={i}
            onClick={() => {
              setSelected(i);
              onItemSelect?.(item as T, i);
            }}
            onMouseEnter={() => setSelected(i)}
          >
            {renderItem ? (
              renderItem(item as T, i, selected === i)
            ) : (
              <div
                className={`rounded-lg border border-border/50 px-4 py-3 transition-colors ${selected === i ? "bg-accent" : "bg-muted/20"} ${itemClassName}`}
              >
                <p className="text-sm">{String(item)}</p>
              </div>
            )}
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 48,
              background:
                "linear-gradient(to bottom, var(--background), transparent)",
              pointerEvents: "none",
              opacity: topOpacity,
              transition: "opacity 0.3s",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background:
                "linear-gradient(to top, var(--background), transparent)",
              pointerEvents: "none",
              opacity: botOpacity,
              transition: "opacity 0.3s",
            }}
          />
        </>
      )}
    </div>
  );
}
