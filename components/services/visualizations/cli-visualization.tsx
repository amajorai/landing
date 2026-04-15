"use client";
import { useEffect, useRef, useState } from "react";

type LineType = "command" | "prompt" | "answer" | "success" | "final";

interface Line {
  text: string;
  type: LineType;
  // Delay before this line starts (after previous completes)
  preDelay?: number;
  // For prompts: the answer that follows (typed on same line after delay)
  answer?: string;
}

const LINES: Line[] = [
  { text: "$ npx create-my-app", type: "command" },
  { text: "", type: "answer", preDelay: 400 }, // blank line
  {
    text: "? Project name > ",
    type: "prompt",
    answer: "my-awesome-app",
    preDelay: 300,
  },
  { text: "? Framework > ", type: "prompt", answer: "React", preDelay: 200 },
  { text: "? TypeScript? > ", type: "prompt", answer: "Yes", preDelay: 200 },
  { text: "? Tailwind CSS? > ", type: "prompt", answer: "Yes", preDelay: 200 },
  { text: "", type: "answer", preDelay: 300 },
  { text: "\u2713 Installing dependencies...", type: "success", preDelay: 500 },
  { text: "\u2713 Setting up project...", type: "success", preDelay: 600 },
  { text: "", type: "answer", preDelay: 200 },
  {
    text: "\ud83d\ude80 Ready! cd my-awesome-app && npm dev",
    type: "final",
    preDelay: 400,
  },
];

interface DisplayLine {
  lineIndex: number;
  text: string; // currently rendered text on the line
  done: boolean;
  waiting: boolean; // for prompt: waiting state with cursor
}

export function CliVisualization() {
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(false);

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const typeString = (
    full: string,
    lineIdx: number,
    baseText: string,
    onDone: () => void
  ) => {
    let i = 0;
    const step = () => {
      if (!runningRef.current) return;
      i++;
      setLines((prev) => {
        const updated = [...prev];
        const target = updated.find((l) => l.lineIndex === lineIdx);
        if (target) target.text = baseText + full.slice(0, i);
        return [...updated];
      });
      if (i < full.length) {
        timeoutRef.current = setTimeout(step, 35);
      } else {
        onDone();
      }
    };
    step();
  };

  const runLine = (idx: number) => {
    if (!runningRef.current) return;
    if (idx >= LINES.length) {
      // pause then restart
      timeoutRef.current = setTimeout(() => {
        if (runningRef.current) {
          setLines([]);
          timeoutRef.current = setTimeout(() => {
            if (runningRef.current) runLine(0);
          }, 300);
        }
      }, 2500);
      return;
    }

    const line = LINES[idx];
    const preDelay = line.preDelay ?? 0;
    timeoutRef.current = setTimeout(() => {
      if (!runningRef.current) return;
      setLines((prev) => [
        ...prev,
        { lineIndex: idx, text: "", done: false, waiting: false },
      ]);

      if (line.type === "prompt") {
        // Type the prompt text
        typeString(line.text, idx, "", () => {
          // Show waiting cursor
          setLines((prev) => {
            const updated = [...prev];
            const target = updated.find((l) => l.lineIndex === idx);
            if (target) target.waiting = true;
            return [...updated];
          });
          timeoutRef.current = setTimeout(() => {
            if (!runningRef.current) return;
            setLines((prev) => {
              const updated = [...prev];
              const target = updated.find((l) => l.lineIndex === idx);
              if (target) target.waiting = false;
              return [...updated];
            });
            // Then type the answer
            typeString(line.answer || "", idx, line.text, () => {
              setLines((prev) => {
                const updated = [...prev];
                const target = updated.find((l) => l.lineIndex === idx);
                if (target) target.done = true;
                return [...updated];
              });
              runLine(idx + 1);
            });
          }, 1000);
        });
      } else if (line.text === "") {
        // blank line
        setLines((prev) => {
          const updated = [...prev];
          const target = updated.find((l) => l.lineIndex === idx);
          if (target) target.done = true;
          return [...updated];
        });
        runLine(idx + 1);
      } else {
        typeString(line.text, idx, "", () => {
          setLines((prev) => {
            const updated = [...prev];
            const target = updated.find((l) => l.lineIndex === idx);
            if (target) target.done = true;
            return [...updated];
          });
          runLine(idx + 1);
        });
      }
    }, preDelay);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            setLines([]);
            runLine(0);
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
            setLines([]);
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

  const renderLine = (dl: DisplayLine, isLast: boolean) => {
    const meta = LINES[dl.lineIndex];
    const text = dl.text;

    if (meta.type === "command") {
      const match = text.match(/^(\$\s?)([\s\S]*)/);
      return (
        <div className="flex items-start leading-5">
          {match ? (
            <>
              <span style={{ color: "#22d3ee" }}>{match[1]}</span>
              <span className="text-zinc-100">{match[2]}</span>
            </>
          ) : (
            <span className="text-zinc-100">{text}</span>
          )}
          {isLast && !dl.done && (
            <span
              className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
              style={{ backgroundColor: "#22d3ee" }}
            />
          )}
        </div>
      );
    }

    if (meta.type === "prompt") {
      // Split into prompt portion and answer
      const promptLen = meta.text.length;
      const promptShown = text.slice(0, promptLen);
      const answerShown = text.slice(promptLen);
      // prompt has "? ... > " - color "?" cyan
      const qMatch = promptShown.match(/^(\?\s)([\s\S]*)/);
      return (
        <div className="flex items-start leading-5">
          {qMatch ? (
            <>
              <span style={{ color: "#22d3ee" }}>{qMatch[1]}</span>
              <span className="text-zinc-300">{qMatch[2]}</span>
            </>
          ) : (
            <span className="text-zinc-300">{promptShown}</span>
          )}
          <span className="text-white">{answerShown}</span>
          {isLast && (!dl.done || dl.waiting) && (
            <span
              className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
              style={{ backgroundColor: "#22d3ee" }}
            />
          )}
        </div>
      );
    }

    if (meta.type === "success") {
      return (
        <div className="leading-5" style={{ color: "#4ade80" }}>
          {text}
        </div>
      );
    }

    if (meta.type === "final") {
      return (
        <div
          className="leading-5"
          style={{ color: "#fbbf24", fontWeight: "bold" }}
        >
          {text}
        </div>
      );
    }

    return <div className="leading-5">&nbsp;</div>;
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col rounded-none">
        <div className="flex shrink-0 items-center gap-1.5 border-zinc-800 border-b bg-zinc-900 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-[10px] text-zinc-500">
            bash — create-my-app
          </span>
        </div>
        <div
          className="flex-1 overflow-hidden p-3 font-mono text-xs"
          style={{ backgroundColor: "#0f0f0f" }}
        >
          {lines.map((dl, idx) => (
            <div key={`${dl.lineIndex}-${idx}`}>
              {renderLine(dl, idx === lines.length - 1)}
            </div>
          ))}
          {lines.length === 0 && (
            <div className="flex items-center">
              <span style={{ color: "#22d3ee" }}>$ </span>
              <span
                className="ml-0.5 inline-block h-[1em] w-1.5 animate-pulse"
                style={{ backgroundColor: "#22d3ee" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
