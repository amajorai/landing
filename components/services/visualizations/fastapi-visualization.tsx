"use client";
import { useEffect, useRef, useState } from "react";

const PYTHON_LINES = [
  '@app.get("/items")',
  "async def get_items(",
  "  limit: int = 10",
  ") -> list[Item]:",
  "  ...",
];

const OPENAPI_LINES = [
  "GET /items",
  "Query: limit (integer)",
  "Response: Item[]",
  "Status: 200 OK",
];

// Trigger thresholds: each OpenAPI line shows after a Python line completes.
const LINE_TRIGGERS = [0, 2, 3, 3];

export function FastapiVisualization() {
  const [pyChars, setPyChars] = useState(0);
  const [linesRevealed, setLinesRevealed] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullText = PYTHON_LINES.join("\n");

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const run = () => {
    if (!runningRef.current) return;
    setPyChars(0);
    setLinesRevealed(0);
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) return;
      i += 1;
      setPyChars(i);

      // Count completed python lines
      const upTo = fullText.slice(0, i);
      const completedLines = upTo.split("\n").length - 1;
      // Determine revealed openapi lines
      let reveal = 0;
      for (let k = 0; k < LINE_TRIGGERS.length; k++) {
        if (completedLines >= LINE_TRIGGERS[k]) reveal = k + 1;
      }
      setLinesRevealed(reveal);

      if (i >= fullText.length) {
        clearTimers();
        timeoutRef.current = setTimeout(() => {
          if (runningRef.current) run();
        }, 2500);
      }
    }, 40);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            run();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
            setPyChars(0);
            setLinesRevealed(0);
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      clearTimers();
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full items-center gap-1">
        {/* LEFT: Python */}
        <div className="flex h-full flex-1 flex-col rounded-md border border-teal-500/40 bg-[#042f2e] p-2">
          <div className="mb-1 font-mono text-[9px] text-teal-300">main.py</div>
          <pre className="whitespace-pre font-mono text-[9px] text-teal-100 leading-[1.35] lg:text-[10px]">
            {fullText.slice(0, pyChars)}
            {pyChars < fullText.length && (
              <span className="inline-block h-[1em] w-1 animate-pulse bg-teal-300" />
            )}
          </pre>
        </div>

        {/* CENTER: Arrow + FastAPI label */}
        <div className="flex shrink-0 flex-col items-center px-1">
          <div className="font-bold font-mono text-[8px] text-teal-500 dark:text-teal-300">
            FastAPI
          </div>
          <div className="my-0.5 text-teal-500 dark:text-teal-300">
            <svg fill="none" height="14" viewBox="0 0 26 14" width="26">
              <path
                d="M1 7h22m0 0l-5-5m5 5l-5 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="text-[9px] text-teal-500 dark:text-teal-300">*</div>
        </div>

        {/* RIGHT: OpenAPI */}
        <div className="flex h-full flex-1 flex-col rounded-md border border-emerald-500/40 bg-[#022c22] p-2">
          <div className="mb-1 font-mono text-[9px] text-emerald-300">
            openapi.json
          </div>
          <pre className="whitespace-pre font-mono text-[9px] text-emerald-100 leading-[1.35] lg:text-[10px]">
            {OPENAPI_LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: i < linesRevealed ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                {line}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
