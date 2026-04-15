"use client";
import { useEffect, useRef, useState } from "react";

const SOURCE_LINES = [
  "<script>",
  "  let count = 0;",
  "</script>",
  "",
  "<button on:click={",
  "  () => count++",
  "}>",
  "  {count}",
  "</button>",
];

const OUTPUT_LINES = [
  "// vanilla JS",
  "let count = 0;",
  "",
  "btn.addEventListener(",
  "  'click',",
  "  () => {",
  "    count++;",
  "    update();",
  "  }",
  ");",
];

export function SvelteVisualization() {
  const [srcChars, setSrcChars] = useState(0);
  const [outChars, setOutChars] = useState(0);
  const [phase, setPhase] = useState<"src" | "compiling" | "out" | "pause">(
    "src"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const srcTotal = SOURCE_LINES.join("\n").length;
  const outTotal = OUTPUT_LINES.join("\n").length;

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

  const startCycle = () => {
    if (!runningRef.current) return;
    clearTimers();
    setSrcChars(0);
    setOutChars(0);
    setPhase("src");

    let s = 0;
    intervalRef.current = setInterval(() => {
      if (!runningRef.current) return clearTimers();
      s += 1;
      setSrcChars(s);
      if (s >= srcTotal) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setPhase("compiling");
        timeoutRef.current = setTimeout(() => {
          if (!runningRef.current) return;
          setPhase("out");
          let o = 0;
          intervalRef.current = setInterval(() => {
            if (!runningRef.current) return clearTimers();
            o += 1;
            setOutChars(o);
            if (o >= outTotal) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              setPhase("pause");
              timeoutRef.current = setTimeout(() => {
                if (runningRef.current) startCycle();
              }, 2000);
            }
          }, 25);
        }, 700);
      }
    }, 25);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            startCycle();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
          }
        }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(el);
    return () => {
      runningRef.current = false;
      clearTimers();
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliceText = (lines: string[], chars: number) => {
    const joined = lines.join("\n");
    return joined.slice(0, chars).split("\n");
  };

  const srcVisible = sliceText(SOURCE_LINES, srcChars);
  const outVisible = sliceText(OUTPUT_LINES, outChars);

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 gap-2 p-2">
          {/* Source panel */}
          <div
            className="flex min-w-0 flex-1 flex-col overflow-hidden rounded border border-zinc-800"
            style={{ backgroundColor: "#0f0f0f" }}
          >
            <div className="flex shrink-0 items-center gap-1.5 border-zinc-800 border-b bg-zinc-900 px-2 py-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#fb923c" }}
              />
              <span className="font-mono text-[9px] text-zinc-500">
                App.svelte
              </span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[10px] leading-[14px]">
              {srcVisible.map((line, i) => (
                <div className="whitespace-pre text-zinc-200" key={i}>
                  {line || "\u00A0"}
                  {i === srcVisible.length - 1 &&
                    phase === "src" &&
                    srcChars < srcTotal && (
                      <span
                        className="ml-0.5 inline-block h-[1em] w-1 animate-pulse align-middle"
                        style={{ backgroundColor: "#fb923c" }}
                      />
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Center arrow */}
          <div className="flex w-12 shrink-0 flex-col items-center justify-center">
            <div
              className="flex items-center font-mono text-[9px]"
              style={{
                color: "#fb923c",
                opacity: phase === "compiling" ? 1 : 0.5,
              }}
            >
              <div className="flex flex-col items-center">
                <span
                  className={phase === "compiling" ? "animate-pulse" : ""}
                  style={{ fontSize: "9px" }}
                >
                  compile
                </span>
                <svg
                  className={phase === "compiling" ? "animate-pulse" : ""}
                  height="10"
                  viewBox="0 0 28 10"
                  width="28"
                >
                  <path
                    d="M0 5 L24 5 M20 1 L24 5 L20 9"
                    fill="none"
                    stroke="#fb923c"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Output panel */}
          <div
            className="flex min-w-0 flex-1 flex-col overflow-hidden rounded border border-zinc-800"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div className="flex shrink-0 items-center gap-1.5 border-zinc-800 border-b bg-zinc-900 px-2 py-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#4ade80" }}
              />
              <span className="font-mono text-[9px] text-zinc-500">App.js</span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[10px] leading-[14px]">
              {outVisible.map((line, i) => (
                <div
                  className="whitespace-pre"
                  key={i}
                  style={{
                    color: line.trim().startsWith("//") ? "#52525b" : "#4ade80",
                  }}
                >
                  {line || "\u00A0"}
                  {i === outVisible.length - 1 &&
                    phase === "out" &&
                    outChars < outTotal && (
                      <span
                        className="ml-0.5 inline-block h-[1em] w-1 animate-pulse align-middle"
                        style={{ backgroundColor: "#4ade80" }}
                      />
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shrink-0 pb-1 text-center font-mono text-[9px] text-zinc-500">
          No Runtime · compile-time transform
        </div>
      </div>
    </div>
  );
}
