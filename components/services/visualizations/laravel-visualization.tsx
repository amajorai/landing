"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "$ php artisan make:model Post -m", type: "command" },
  { text: "Model created successfully.", type: "success" },
  { text: "$ composer install", type: "command" },
  { text: "Packages installed.", type: "success" },
  { text: "$ php artisan serve", type: "command" },
  { text: "Server running on http://127.0.0.1:8000", type: "success" },
] as const;

type LineEntry = { lineIndex: number; chars: number };

export function LaravelVisualization() {
  const [displayedLines, setDisplayedLines] = useState<LineEntry[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(false);

  // Typing state stored in ref to avoid closure stale state
  const stateRef = useRef({ lineIndex: 0, charIndex: 0 });

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

  const startTyping = () => {
    if (!runningRef.current) return;

    stateRef.current = { lineIndex: 0, charIndex: 0 };
    setDisplayedLines([{ lineIndex: 0, chars: 0 }]);

    intervalRef.current = setInterval(() => {
      if (!runningRef.current) {
        clearTimers();
        return;
      }

      const { lineIndex, charIndex } = stateRef.current;
      const currentLine = LINES[lineIndex];
      const nextChar = charIndex + 1;

      if (nextChar <= currentLine.text.length) {
        stateRef.current.charIndex = nextChar;
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            lineIndex,
            chars: nextChar,
          };
          return updated;
        });
      } else {
        // Line complete
        const nextLine = lineIndex + 1;
        if (nextLine < LINES.length) {
          stateRef.current = { lineIndex: nextLine, charIndex: 0 };
          setDisplayedLines((prev) => [
            ...prev,
            { lineIndex: nextLine, chars: 0 },
          ]);
        } else {
          // All lines done — pause then restart
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          timeoutRef.current = setTimeout(() => {
            if (runningRef.current) {
              setDisplayedLines([]);
              timeoutRef.current = setTimeout(() => {
                if (runningRef.current) startTyping();
              }, 200);
            }
          }, 2000);
        }
      }
    }, 30);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startTyping();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
            setDisplayedLines([]);
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
      {/* Browser chrome */}
      <div className="flex h-full flex-col rounded-none">
        {/* Title bar */}
        <div className="flex shrink-0 items-center gap-1.5 border-zinc-800 border-b bg-zinc-900 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-[10px] text-zinc-500">
            bash — laravel
          </span>
        </div>

        {/* Terminal area */}
        <div
          className="flex-1 overflow-hidden p-3 font-mono text-xs"
          style={{ backgroundColor: "#0f0f0f" }}
        >
          {displayedLines.map((entry, idx) => {
            const line = LINES[entry.lineIndex];
            const visibleText = line.text.slice(0, entry.chars);
            const isLast = idx === displayedLines.length - 1;

            if (line.type === "command") {
              // Split on leading "$" to color prompt separately
              const promptMatch = visibleText.match(/^(\$\s?)([\s\S]*)/);
              return (
                <div className="flex items-start leading-5" key={idx}>
                  {promptMatch ? (
                    <>
                      <span style={{ color: "#ef4444" }}>{promptMatch[1]}</span>
                      <span className="text-zinc-200">{promptMatch[2]}</span>
                    </>
                  ) : (
                    <span className="text-zinc-200">{visibleText}</span>
                  )}
                  {isLast && entry.chars < line.text.length && (
                    <span
                      className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
                      style={{ backgroundColor: "#ef4444" }}
                    />
                  )}
                </div>
              );
            }

            return (
              <div className="leading-5" key={idx} style={{ color: "#4ade80" }}>
                {visibleText}
                {isLast && entry.chars < line.text.length && (
                  <span
                    className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
                    style={{ backgroundColor: "#4ade80" }}
                  />
                )}
              </div>
            );
          })}

          {/* Idle cursor when nothing displayed */}
          {displayedLines.length === 0 && (
            <div className="flex items-center">
              <span style={{ color: "#ef4444" }}>$ </span>
              <span
                className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
                style={{ backgroundColor: "#ef4444" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
