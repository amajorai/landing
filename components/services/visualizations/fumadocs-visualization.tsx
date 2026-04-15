"use client";
import { useEffect, useRef, useState } from "react";

const SIDEBAR_LINES = [
  { text: "📁 Getting Started", depth: 0 },
  { text: "📄 Installation", depth: 1, active: true },
  { text: "📄 Quickstart", depth: 1 },
  { text: "📁 Components", depth: 0 },
  { text: "📄 Button", depth: 1 },
  { text: "📄 Input", depth: 1 },
  { text: "📁 API Reference", depth: 0 },
];

const CONTENT_LINES = [
  "# Installation",
  "Install via npm:",
  "$ npm install fumadocs-core",
  "💡 Tip: Works with Next.js App Router.",
];

export function FumadocsVisualization() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarStep, setSidebarStep] = useState(0);
  const [contentStep, setContentStep] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runningRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const t = setTimeout(() => {
      if (runningRef.current) fn();
    }, delay);
    timersRef.current.push(t);
  };

  const runCycle = () => {
    if (!runningRef.current) return;
    setSidebarStep(0);
    setContentStep(0);
    setShowSearch(false);

    // Build sidebar
    for (let i = 1; i <= SIDEBAR_LINES.length; i++) {
      schedule(() => setSidebarStep(i), i * 200);
    }
    const sidebarDone = SIDEBAR_LINES.length * 200;

    // Build content
    for (let i = 1; i <= CONTENT_LINES.length; i++) {
      schedule(() => setContentStep(i), sidebarDone + i * 300);
    }
    const contentDone = sidebarDone + CONTENT_LINES.length * 300;

    // Show search briefly
    schedule(() => setShowSearch(true), contentDone + 300);
    schedule(() => setShowSearch(false), contentDone + 1800);

    // Hold then restart
    schedule(() => runCycle(), contentDone + 3500);
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
            runCycle();
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
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
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colors = {
    sidebarActive: "#10b981",
    heading: isDark ? "#ecfdf5" : "#064e3b",
    code: isDark ? "#065f46" : "#d1fae5",
    codeText: isDark ? "#a7f3d0" : "#064e3b",
    searchHighlight: isDark ? "rgba(16,185,129,0.2)" : "rgba(5,150,105,0.15)",
    border: isDark ? "rgba(16,185,129,0.25)" : "rgba(5,150,105,0.2)",
    body: isDark ? "#a7f3d0" : "#065f46",
    muted: isDark ? "rgba(167,243,208,0.6)" : "rgba(6,78,59,0.6)",
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="flex h-full flex-col p-2">
        {/* Search bar */}
        <div
          className="mb-2 flex items-center gap-2 rounded-md border px-2 py-1.5"
          style={{
            borderColor: colors.border,
            background: colors.searchHighlight,
          }}
        >
          <span className="text-[10px]">🔍</span>
          <span
            className="font-mono text-[10px]"
            style={{ color: colors.muted }}
          >
            Search docs...
          </span>
          {showSearch && (
            <div className="fade-in ml-auto flex animate-in gap-1 duration-300">
              <span
                className="rounded px-1 font-mono text-[9px]"
                style={{ color: colors.body, background: colors.code }}
              >
                /installation
              </span>
            </div>
          )}
        </div>

        {/* Two-column layout */}
        <div className="flex flex-1 gap-2 overflow-hidden">
          {/* Sidebar */}
          <div
            className="w-[38%] rounded-md border p-1.5"
            style={{ borderColor: colors.border }}
          >
            {SIDEBAR_LINES.slice(0, sidebarStep).map((line, i) => (
              <div
                className="fade-in slide-in-from-left-1 animate-in truncate font-mono text-[9px] leading-[1.4] duration-300"
                key={i}
                style={{
                  paddingLeft: line.depth * 6,
                  color: line.active ? colors.sidebarActive : colors.body,
                  fontWeight: line.active ? 600 : 400,
                  background: line.active
                    ? colors.searchHighlight
                    : "transparent",
                  borderRadius: 2,
                }}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-hidden rounded-md border p-2"
            style={{ borderColor: colors.border }}
          >
            {contentStep >= 1 && (
              <p
                className="fade-in mb-1 animate-in font-bold text-[13px] duration-300"
                style={{ color: colors.heading }}
              >
                Installation
              </p>
            )}
            {contentStep >= 2 && (
              <p
                className="fade-in mb-1.5 animate-in text-[10px] duration-300"
                style={{ color: colors.body }}
              >
                Install via npm:
              </p>
            )}
            {contentStep >= 3 && (
              <div
                className="fade-in mb-1.5 animate-in rounded px-1.5 py-1 font-mono text-[9px] duration-300"
                style={{ background: colors.code, color: colors.codeText }}
              >
                npm install fumadocs-core
              </div>
            )}
            {contentStep >= 4 && (
              <div
                className="fade-in animate-in rounded border-l-2 px-1.5 py-1 text-[9px] duration-300"
                style={{
                  borderColor: colors.sidebarActive,
                  background: colors.searchHighlight,
                  color: colors.body,
                }}
              >
                💡 Tip: Works with Next.js.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
