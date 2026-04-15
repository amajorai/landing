"use client";
import { useEffect, useRef, useState } from "react";

interface Service {
  name: string;
  status: "live" | "idle" | "restarting";
}

const INITIAL_SERVICES: Service[] = [
  { name: "API", status: "live" },
  { name: "DB", status: "live" },
  { name: "Cache", status: "live" },
  { name: "Queue", status: "idle" },
];

export function TuiVisualization() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [bars, setBars] = useState<number[]>([42, 67, 35, 89, 51, 72, 44, 63]);
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(45);
  const [isDark, setIsDark] = useState(true);
  const [blink, setBlink] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const tickRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsDark(document.documentElement.classList.contains("dark"));

    const startTimers = () => {
      // Bars update every 800ms
      intervalsRef.current.push(
        setInterval(() => {
          if (!runningRef.current) return;
          setBars((prev) =>
            prev.map((v) => {
              const delta = Math.round((Math.random() - 0.5) * 30);
              return Math.max(10, Math.min(99, v + delta));
            })
          );
        }, 800)
      );

      // Blink dots every 500ms
      intervalsRef.current.push(
        setInterval(() => {
          if (!runningRef.current) return;
          setBlink((b) => !b);
        }, 500)
      );

      // Service status cycle every 3s
      intervalsRef.current.push(
        setInterval(() => {
          if (!runningRef.current) return;
          tickRef.current++;
          const phase = tickRef.current % 4;
          setServices((prev) => {
            const updated = prev.map((s) => ({ ...s }));
            // Cycle API through states
            if (phase === 1) updated[0].status = "restarting";
            else if (phase === 2) updated[0].status = "live";
            else if (phase === 3) updated[2].status = "restarting";
            else updated[2].status = "live";
            return updated;
          });
        }, 1500)
      );

      // CPU/MEM slow update
      intervalsRef.current.push(
        setInterval(() => {
          if (!runningRef.current) return;
          setCpu((c) =>
            Math.max(
              5,
              Math.min(95, c + Math.round((Math.random() - 0.5) * 10))
            )
          );
          setMem((m) =>
            Math.max(
              20,
              Math.min(90, m + Math.round((Math.random() - 0.5) * 6))
            )
          );
        }, 1200)
      );
    };

    const clearAll = () => {
      for (const id of intervalsRef.current) clearInterval(id);
      intervalsRef.current = [];
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            setIsDark(document.documentElement.classList.contains("dark"));
            startTimers();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearAll();
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      clearAll();
      observerRef.current?.disconnect();
    };
  }, []);

  const borderColor = isDark ? "#4ade80" : "#16a34a";
  const headerBg = isDark ? "#166534" : "#bbf7d0";
  const headerFg = isDark ? "#bbf7d0" : "#166534";
  const activeColor = "#4ade80";
  const idleColor = "#fbbf24";
  const restartColor = "#fb923c";
  const barColor = isDark ? "#4ade80" : "#16a34a";
  const bgColor = isDark ? "#0f0f0f" : "#052e16";
  const textColor = isDark ? "#86efac" : "#bbf7d0";

  const statusDotColor = (s: Service["status"]) =>
    s === "live" ? activeColor : s === "idle" ? idleColor : restartColor;

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
      style={{
        backgroundColor: bgColor,
        fontFamily: "var(--font-geist-mono, monospace)",
      }}
    >
      <div
        className="flex h-full flex-col text-[10px]"
        style={{ color: textColor }}
      >
        {/* Top bar */}
        <div
          className="flex shrink-0 items-center justify-between px-3 py-1 font-bold"
          style={{ backgroundColor: headerBg, color: headerFg }}
        >
          <span>My Dashboard</span>
          <span>[q]uit [r]efresh</span>
        </div>

        {/* Main content */}
        <div className="flex flex-1 gap-2 p-2">
          {/* Left panel - services table */}
          <div
            className="flex flex-col"
            style={{
              width: "40%",
              border: `1px solid ${borderColor}`,
              padding: "4px 6px",
            }}
          >
            <div
              className="mb-1 pb-1 text-center"
              style={{
                borderBottom: `1px dashed ${borderColor}`,
                color: activeColor,
              }}
            >
              Services
            </div>
            {services.map((s) => (
              <div
                className="flex items-center justify-between py-0.5"
                key={s.name}
              >
                <span>{s.name}</span>
                <div className="flex items-center gap-1">
                  <span
                    style={{
                      color: statusDotColor(s.status),
                      opacity: blink || s.status !== "restarting" ? 1 : 0.3,
                    }}
                  >
                    ●
                  </span>
                  <span
                    className="text-[9px]"
                    style={{ color: statusDotColor(s.status) }}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel - bar chart */}
          <div
            className="flex flex-1 flex-col"
            style={{
              border: `1px solid ${borderColor}`,
              padding: "4px 6px",
            }}
          >
            <div
              className="mb-1 pb-1 text-center"
              style={{
                borderBottom: `1px dashed ${borderColor}`,
                color: activeColor,
              }}
            >
              Requests/sec
            </div>
            <div className="flex flex-1 items-end justify-around gap-[2px]">
              {bars.map((v, i) => (
                <div
                  className="flex flex-1 flex-col items-center justify-end"
                  key={i}
                >
                  <span
                    className="mb-0.5 text-[8px]"
                    style={{ color: textColor }}
                  >
                    {v}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: `${v}%`,
                      backgroundColor: barColor,
                      transition: "height 0.6s ease-out",
                      opacity: 0.85,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          className="flex shrink-0 items-center justify-between px-3 py-1"
          style={{ backgroundColor: headerBg, color: headerFg }}
        >
          <span>Press [h] for help</span>
          <span>
            CPU: {cpu}% | MEM: {mem}%
          </span>
        </div>
      </div>
    </div>
  );
}
