"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INITIAL_BLOCKS = [
  { id: "image", label: "Image", icon: "🖼️" },
  { id: "heading", label: "Heading", icon: "📝" },
  { id: "paragraph", label: "Paragraph", icon: "¶" },
  { id: "button", label: "Button", icon: "🔘" },
  { id: "gallery", label: "Gallery", icon: "🖼️🖼️" },
];

type Block = (typeof INITIAL_BLOCKS)[number];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WordpressVisualization() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const startShuffling = () => {
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        return;
      }
      setBlocks((prev) => shuffleArray(prev));
    }, 2500);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startShuffling();
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-hidden px-4 lg:h-[280px]"
      ref={containerRef}
    >
      {/* Header label */}
      <p className="mb-1 font-mono text-[10px] text-blue-400/70 uppercase tracking-widest">
        Block Editor
      </p>

      {/* Block list */}
      <div className="flex w-full max-w-[220px] flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {blocks.map((block) => (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-1.5"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              key={block.id}
              layout
              layoutId={block.id}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
            >
              <span className="text-sm leading-none">{block.icon}</span>
              <span className="font-mono text-blue-200/80 text-xs">
                {block.label}
              </span>
              {/* Drag handle dots */}
              <span className="ml-auto flex flex-col gap-[3px] opacity-30">
                <span className="flex gap-[3px]">
                  <span className="h-[3px] w-[3px] rounded-full bg-blue-300" />
                  <span className="h-[3px] w-[3px] rounded-full bg-blue-300" />
                </span>
                <span className="flex gap-[3px]">
                  <span className="h-[3px] w-[3px] rounded-full bg-blue-300" />
                  <span className="h-[3px] w-[3px] rounded-full bg-blue-300" />
                </span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
