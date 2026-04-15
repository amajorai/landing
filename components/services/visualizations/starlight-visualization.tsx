"use client";
import { useEffect, useRef, useState } from "react";

type PageType = "guide" | "reference" | "blog";

const PAGES: { type: PageType; navId: string }[] = [
  { type: "guide", navId: "getting-started" },
  { type: "reference", navId: "authoring" },
  { type: "blog", navId: "customization" },
];

const NAV = [
  { id: "intro-header", label: "▼ Introduction", depth: 0, selectable: false },
  {
    id: "getting-started",
    label: "Getting Started",
    depth: 1,
    selectable: true,
  },
  {
    id: "project-structure",
    label: "Project Structure",
    depth: 1,
    selectable: false,
  },
  { id: "guides-header", label: "▼ Guides", depth: 0, selectable: false },
  { id: "authoring", label: "Authoring Content", depth: 1, selectable: true },
  { id: "customization", label: "Customization", depth: 1, selectable: true },
];

export function StarlightVisualization() {
  const [isDark, setIsDark] = useState(true);
  const [index, setIndex] = useState(0);

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
      setIndex((i) => (i + 1) % PAGES.length);
    }, 2500);
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

  const current = PAGES[index];
  const colors = {
    accent: isDark ? "#a78bfa" : "#7c3aed",
    activeNav: isDark ? "rgba(167,139,250,0.2)" : "rgba(124,58,237,0.12)",
    heading: isDark ? "#f5f3ff" : "#2e1065",
    body: isDark ? "#c4b5fd" : "#4c1d95",
    topbar: isDark ? "rgba(167,139,250,0.08)" : "rgba(124,58,237,0.06)",
    border: isDark ? "rgba(167,139,250,0.25)" : "rgba(124,58,237,0.2)",
    muted: isDark ? "rgba(196,181,253,0.6)" : "rgba(76,29,149,0.6)",
  };

  const renderPage = () => {
    if (current.type === "guide") {
      return (
        <div className="fade-in animate-in duration-500" key="guide">
          <p
            className="mb-1 font-bold text-[12px]"
            style={{ color: colors.heading }}
          >
            Getting Started
          </p>
          <ol className="space-y-0.5">
            {["Install Starlight", "Add first page", "Deploy to web"].map(
              (s, i) => (
                <li
                  className="flex items-start gap-1.5 text-[9px]"
                  key={i}
                  style={{ color: colors.body }}
                >
                  <span
                    className="mt-0.5 flex h-3 w-3 items-center justify-center rounded-full font-bold text-[7px] text-white"
                    style={{ background: colors.accent }}
                  >
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              )
            )}
          </ol>
        </div>
      );
    }
    if (current.type === "reference") {
      return (
        <div className="fade-in animate-in duration-500" key="ref">
          <p
            className="mb-1 font-bold text-[12px]"
            style={{ color: colors.heading }}
          >
            defineConfig()
          </p>
          <div
            className="mb-1 rounded px-1.5 py-1 font-mono text-[8px] leading-tight"
            style={{
              background: colors.activeNav,
              color: colors.body,
              border: `1px solid ${colors.border}`,
            }}
          >
            defineConfig(opts: UserConfig)
          </div>
          <p className="text-[9px]" style={{ color: colors.body }}>
            Configure your Starlight site.
          </p>
        </div>
      );
    }
    return (
      <div className="fade-in animate-in duration-500" key="blog">
        <p className="text-[8px]" style={{ color: colors.muted }}>
          April 15, 2026
        </p>
        <p
          className="mb-1 font-bold text-[12px] leading-tight"
          style={{ color: colors.heading }}
        >
          Theming Starlight
        </p>
        <p className="text-[9px] leading-snug" style={{ color: colors.body }}>
          Learn how to customize fonts, colors, and layout...
        </p>
      </div>
    );
  };

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div
        className="flex h-full flex-col rounded-md border"
        style={{ borderColor: colors.border }}
      >
        {/* Top bar */}
        <div
          className="flex shrink-0 items-center gap-3 border-b px-2 py-1.5"
          style={{ background: colors.topbar, borderColor: colors.border }}
        >
          <span
            className="font-bold text-[10px]"
            style={{ color: colors.accent }}
          >
            ⭐ Starlight
          </span>
          <div className="flex gap-2 text-[9px]" style={{ color: colors.body }}>
            <span>Guides</span>
            <span>Reference</span>
            <span>Blog</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className="w-[38%] border-r p-1.5"
            style={{ borderColor: colors.border }}
          >
            {NAV.map((item) => {
              const isActive = item.id === current.navId;
              return (
                <div
                  className="truncate rounded px-1 py-0.5 text-[8px] transition-colors"
                  key={item.id}
                  style={{
                    paddingLeft: 4 + item.depth * 6,
                    color: isActive ? colors.accent : colors.body,
                    fontWeight: item.depth === 0 ? 600 : isActive ? 600 : 400,
                    background: isActive ? colors.activeNav : "transparent",
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden p-2">{renderPage()}</div>
        </div>
      </div>
    </div>
  );
}
