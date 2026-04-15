"use client";
import { useEffect, useRef, useState } from "react";

export function TanstackRouterVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);
  const [scenario, setScenario] = useState<"valid" | "error">("valid");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsDark(document.documentElement.classList.contains("dark"));

    const tick = () => {
      setScenario((s) => (s === "valid" ? "error" : "valid"));
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            setIsDark(document.documentElement.classList.contains("dark"));
            intervalRef.current = setInterval(tick, 2500);
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
    };
  }, []);

  const validColor = "#4ade80";
  const errorColor = "#f87171";
  const typeColor = isDark ? "#fb923c" : "#ea580c";
  const codeColor = isDark ? "#fde68a" : "#78350f";
  const textColor = isDark ? "#fff7ed" : "#431407";
  const panelBg = isDark ? "rgba(120,53,15,0.25)" : "rgba(255,247,237,0.8)";
  const panelBorder = isDark ? "rgba(251,146,60,0.4)" : "rgba(234,88,12,0.35)";

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
      style={{ color: textColor }}
    >
      <div className="grid h-full grid-cols-2 gap-2 p-2 font-mono text-[10px] lg:text-[11px]">
        {/* LEFT: route definition */}
        <div
          className="flex flex-col rounded border p-2"
          style={{ backgroundColor: panelBg, borderColor: panelBorder }}
        >
          <div
            className="mb-1 text-[9px] uppercase tracking-wider"
            style={{ color: typeColor, opacity: 0.8 }}
          >
            route definition
          </div>
          <pre className="leading-4" style={{ color: codeColor }}>
            <span style={{ color: typeColor }}>const</span>{" "}
            <span>userRoute</span> ={"\n"}
            {"  "}
            <span style={{ color: typeColor }}>createRoute</span>({"{\n"}
            {"    "}path:{" "}
            <span style={{ color: validColor }}>'/users/$userId'</span>,{"\n"}
            {"    "}component: UserPage,{"\n"}
            {"  "}
            {"}"}){"\n\n"}
            <span style={{ opacity: 0.6 }}>// search params</span>
            {"\n"}?page=<span style={{ color: validColor }}>1</span>
            &sort=<span style={{ color: validColor }}>name</span>
            {"\n"}
            <span style={{ color: typeColor }}>
              {"{ page: number, sort: string }"}
            </span>
          </pre>
        </div>

        {/* RIGHT: scenarios */}
        <div
          className="flex flex-col rounded border p-2"
          style={{ backgroundColor: panelBg, borderColor: panelBorder }}
        >
          <div
            className="mb-1 text-[9px] uppercase tracking-wider"
            style={{ color: typeColor, opacity: 0.8 }}
          >
            usage
          </div>
          {scenario === "valid" ? (
            <pre className="leading-4" style={{ color: codeColor }}>
              <span style={{ color: typeColor }}>const</span> {"{ "}
              <span style={{ color: validColor }}>userId</span>
              {" }"} ={"\n"}
              {"  "}useParams();{"\n\n"}
              <span style={{ color: validColor }}>{"\u2713 "} OK</span>
              {"\n"}
              <span style={{ opacity: 0.7 }}>TypeScript happy</span>
              {"\n"}
              <span style={{ color: typeColor }}>userId: string</span>
            </pre>
          ) : (
            <pre className="leading-4" style={{ color: codeColor }}>
              <span style={{ color: typeColor }}>const</span> {"{ "}
              <span
                style={{
                  color: errorColor,
                  textDecoration: "underline wavy",
                  textDecorationColor: errorColor,
                }}
              >
                userID
              </span>
              {" }"} ={"\n"}
              {"  "}useParams();{"\n\n"}
              <span style={{ color: errorColor }}>{"\u2717 TS error"}</span>
              {"\n"}
              <span style={{ color: errorColor, opacity: 0.85 }}>
                Property 'userID'{"\n"}does not exist on{"\n"}
                {"{ userId: string }"}
              </span>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
