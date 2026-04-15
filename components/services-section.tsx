"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Building2,
  FileBox,
  Gauge,
  Globe,
  Lightbulb,
  MessageCircle,
  Palette,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Smartphone,
  Upload,
  Zap,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";

// ── Visual components ───────────────────────────────────────────────────────

function BrowserMockup() {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 3000;
    let raf: number;
    let resetTimeout: ReturnType<typeof setTimeout> | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        resetTimeout = setTimeout(() => {
          start = null;
          setProgress(0);
          raf = requestAnimationFrame(animate);
        }, 400);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      if (resetTimeout !== null) clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <div
      className="mt-auto pt-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-lg border border-border/50">
        {/* Loading bar */}
        <div className="h-0.5 w-full bg-muted/20">
          <div
            className="h-full bg-primary/50 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 border-border/50 border-b bg-muted/30 px-3 py-2">
          <div className="flex gap-1.5">
            <div
              className={`size-2 rounded-full transition-all duration-200 ${hovered ? "bg-red-400/70" : "bg-muted-foreground/20"}`}
            />
            <div
              className={`size-2 rounded-full transition-all duration-200 ${hovered ? "bg-amber-400/70" : "bg-muted-foreground/20"}`}
            />
            <div
              className={`size-2 rounded-full transition-all duration-200 ${hovered ? "bg-green-400/70" : "bg-muted-foreground/20"}`}
            />
          </div>
          <div className="h-3.5 flex-1 rounded-full bg-muted/50" />
        </div>
        <div className="space-y-2.5 bg-background/40 p-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded-full bg-muted/60" />
            <div className="flex gap-2">
              <div className="h-2 w-7 rounded-full bg-muted/40" />
              <div className="h-2 w-7 rounded-full bg-muted/40" />
              <div className="h-2 w-7 rounded-full bg-muted/40" />
            </div>
          </div>
          <div className="h-16 rounded-md bg-muted/30" />
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-muted/30" />
            <div className="h-2 w-1/2 rounded-full bg-muted/25" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-md bg-muted-foreground/20" />
            <div className="h-6 w-16 rounded-md bg-muted/20" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[1, 2, 3].map((i) => (
              <div className="h-8 rounded-md bg-muted/25" key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const METRICS_BARS_BASE = [38, 52, 48, 70, 63, 85, 74];
const METRICS_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function MetricsChart() {
  const [heights, setHeights] = useState(METRICS_BARS_BASE.map(() => 0));
  const [revenue, setRevenue] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Trigger on first scroll into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Loop animation after entry
  useEffect(() => {
    if (!hasEntered) return;
    // Animate bars up
    setHeights(METRICS_BARS_BASE);
    // Count revenue
    let frame = 0;
    const total = 248;
    const counter = setInterval(() => {
      frame++;
      setRevenue(Math.min(Math.round((frame / 40) * total), total));
      if (frame >= 40) clearInterval(counter);
    }, 35);
    // Reset and loop
    const reset = setTimeout(() => {
      setHeights(METRICS_BARS_BASE.map(() => 0));
      setRevenue(0);
      setTimeout(() => setTick((t) => t + 1), 300);
    }, 3800);
    return () => {
      clearInterval(counter);
      clearTimeout(reset);
    };
  }, [hasEntered, tick]);

  return (
    <div className="mt-auto pt-6" ref={ref}>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-semibold text-xl tracking-tight">
          ${(revenue / 10).toFixed(1)}k
        </span>
        <span className="font-medium text-green-500 text-xs">↑ 12.4%</span>
        <span className="text-muted-foreground/50 text-xs">this week</span>
      </div>
      <div className="flex h-14 items-end gap-1">
        {heights.map((h, i) => (
          <div
            className="flex-1 rounded-t-sm bg-muted-foreground/15 transition-all ease-out"
            key={i}
            style={{
              height: `${h}%`,
              transitionDuration: "800ms",
              transitionDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-1 flex">
        {METRICS_LABELS.map((l, i) => (
          <div
            className="flex-1 text-center text-[9px] text-muted-foreground/35"
            key={i}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeedGauge() {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const [score, setScore] = useState(0);
  const [dashValue, setDashValue] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    // Count from 0 → 98 then loop
    let frame = 0;
    const target = 98;
    const counter = setInterval(() => {
      frame++;
      const v = Math.min(Math.round((frame / 45) * target), target);
      setScore(v);
      setDashValue((v / 100) * circ * 0.97);
      if (frame >= 45) clearInterval(counter);
    }, 30);
    const reset = setTimeout(() => {
      setScore(0);
      setDashValue(0);
      setTimeout(() => setTick((t) => t + 1), 400);
    }, 4500);
    return () => {
      clearInterval(counter);
      clearTimeout(reset);
    };
  }, [hasEntered, tick, circ]);

  return (
    <div className="mt-auto flex items-center gap-4 pt-4" ref={ref}>
      <svg className="size-14 shrink-0 -rotate-90" viewBox="0 0 36 36">
        <circle
          className="text-muted/50"
          cx="18"
          cy="18"
          fill="none"
          r={r}
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          className="text-green-500"
          cx="18"
          cy="18"
          fill="none"
          r={r}
          stroke="currentColor"
          strokeDasharray={`${dashValue} ${circ}`}
          strokeLinecap="round"
          strokeWidth="2.5"
          style={{ transition: "stroke-dasharray 0.06s linear" }}
        />
      </svg>
      <div>
        <div className="font-semibold text-2xl tabular-nums leading-none tracking-tight">
          {score}
        </div>
        <div className="mt-1 text-[10px] text-muted-foreground/55">
          Lighthouse score
        </div>
      </div>
    </div>
  );
}

function KanbanBoard() {
  // "API design" moves: Backlog → Building → Shipped → Backlog
  const [movingCardCol, setMovingCardCol] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMovingCardCol((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const movingCard = "API design";
  const staticCols = [
    { label: "Backlog", items: ["User auth", "Payments", "Dashboard"] },
    { label: "Building", items: ["DB schema"] },
    { label: "Shipped", items: ["Onboarding", "Landing"] },
  ];

  return (
    <div className="mt-auto pt-6">
      <div className="grid grid-cols-3 gap-2">
        {staticCols.map(({ label, items }, colIdx) => (
          <div className="space-y-1.5" key={label}>
            <p className="font-medium text-[9px] text-muted-foreground/40 uppercase tracking-widest">
              {label}
            </p>
            {items.map((item) => (
              <div
                className="rounded border border-border/35 bg-muted/20 px-2 py-1.5 text-[10px] text-muted-foreground leading-tight"
                key={item}
              >
                {item}
              </div>
            ))}
            {movingCardCol === colIdx && (
              <div className="rounded border border-primary/30 bg-primary/10 px-2 py-1.5 text-[10px] text-primary/70 leading-tight transition-all duration-500">
                {movingCard}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DeployPipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stageLabels = ["Build", "Test", "Deploy"];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (stageLabels.length + 1));
    }, 900);
    return () => clearInterval(id);
  }, [stageLabels.length]);

  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center">
        {stageLabels.map((label, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <div
              className="flex flex-1 items-center last:flex-none"
              key={label}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={[
                    "size-2.5 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all duration-300",
                    done
                      ? "bg-green-500 ring-green-500/30"
                      : active
                        ? "animate-pulse bg-blue-500 ring-blue-500/30"
                        : "bg-muted/40 ring-muted/20",
                  ].join(" ")}
                />
                <span className="text-[9px] text-muted-foreground/55">
                  {label}
                </span>
              </div>
              {i < stageLabels.length - 1 && (
                <div
                  className={`mx-1 mb-3.5 h-px flex-1 transition-all duration-500 ${
                    i < activeStep ? "bg-green-500/50" : "bg-muted/20"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const STATUS_RESPONSES = [
  {
    method: "GET",
    path: "/api/users",
    code: "200 OK",
    color: "bg-green-500/15 text-green-500",
  },
  {
    method: "POST",
    path: "/api/orders",
    code: "201 Created",
    color: "bg-blue-500/15 text-blue-500",
  },
  {
    method: "GET",
    path: "/api/unknown",
    code: "404 Not Found",
    color: "bg-red-500/15 text-red-500",
  },
];

function WebAppVisual() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % STATUS_RESPONSES.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const resp = STATUS_RESPONSES[idx];

  return (
    <div className="mt-auto pt-4">
      <div className="overflow-hidden rounded-md border border-border/35 bg-muted/10 font-mono text-[10px]">
        <div
          className="flex items-center gap-1.5 border-border/25 border-b bg-muted/20 px-2.5 py-1.5 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <span className="font-semibold text-green-500">{resp.method}</span>
          <span className="text-muted-foreground/70">{resp.path}</span>
          <span
            className={`ml-auto rounded px-1 py-0.5 text-[9px] ${resp.color}`}
          >
            {resp.code}
          </span>
        </div>
        <div className="space-y-0.5 px-2.5 py-2 text-muted-foreground/60">
          <div>
            <span className="text-blue-400/70">&quot;data&quot;</span>: [···]
          </div>
          <div>
            <span className="text-blue-400/70">&quot;total&quot;</span>: 142
          </div>
          <div>
            <span className="text-blue-400/70">&quot;latency&quot;</span>:{" "}
            <span className="text-green-400/70">42ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="mt-auto flex justify-center pt-4">
      <div className="w-20 rounded-2xl border-2 border-border/40 bg-muted/10 p-1.5">
        <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-border/50" />
        <div className="space-y-1.5 rounded-xl bg-background/30 p-1.5">
          {/* Shimmer skeleton lines */}
          <div className="relative h-6 overflow-hidden rounded-lg bg-muted/30">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="relative h-8 overflow-hidden rounded-lg bg-muted/25">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-8 overflow-hidden rounded-lg bg-muted/25">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          <div className="relative h-2 w-3/4 overflow-hidden rounded-full bg-muted/20">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="relative h-2 w-1/2 overflow-hidden rounded-full bg-muted/15">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="mt-1 h-5 rounded-lg bg-primary/15" />
        </div>
        <div className="mx-auto mt-1.5 h-1 w-6 rounded-full bg-border/30" />
      </div>
    </div>
  );
}

const EXTENSIONS = [
  {
    name: "A Major Assistant",
    desc: "AI-powered writing helper",
    active: true,
  },
  {
    name: "Client Portal",
    desc: "Project updates & file sharing",
    active: false,
  },
  { name: "Lead Capture", desc: "Qualify visitors, book calls", active: true },
];

function ExtensionVisual() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [toggled, setToggled] = useState([true, false, true]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % EXTENSIONS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setToggled((prev) => {
        const n = [...prev];
        n[activeIdx] = !n[activeIdx];
        return n;
      });
    }, 900);
    return () => clearTimeout(t);
  }, [activeIdx]);

  return (
    <div className="mt-auto w-full space-y-2 pt-4">
      {EXTENSIONS.map((ext, i) => (
        <div
          className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300 ${
            activeIdx === i
              ? "border-border/50 bg-muted/15"
              : "border-border/25 bg-transparent"
          }`}
          key={ext.name}
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15">
            <div className="size-3 rounded-sm bg-primary/40" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-[10px]">{ext.name}</p>
            <p className="truncate text-[9px] text-muted-foreground/55">
              {ext.desc}
            </p>
          </div>
          <div
            className={`relative h-4 w-7 shrink-0 cursor-pointer rounded-full transition-all duration-400 ${
              toggled[i] ? "bg-green-500/60" : "bg-muted/40"
            }`}
          >
            <div
              className="absolute top-0.5 size-3 rounded-full bg-white shadow transition-all duration-300"
              style={{ left: toggled[i] ? "calc(100% - 14px)" : "2px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EnterpriseVisual() {
  const rows = [
    { dept: "Engineering", users: 24, pct: 85 },
    { dept: "Operations", users: 12, pct: 55 },
    { dept: "Finance", users: 8, pct: 35 },
  ];
  const [highlighted, setHighlighted] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlighted((prev) => (prev + 1) % rows.length);
    }, 1500);
    return () => clearInterval(id);
  }, [rows.length]);

  return (
    <div className="mt-auto pt-4">
      <div className="overflow-hidden rounded-md border border-border/35">
        <div className="flex bg-muted/25 px-2.5 py-1 font-medium text-[9px] text-muted-foreground/45 uppercase tracking-widest">
          <span className="flex-1">Department</span>
          <span>Users</span>
        </div>
        {rows.map((row, i) => (
          <div
            className={`border-border/20 border-t px-2.5 py-1.5 transition-colors duration-300 ${
              highlighted === i ? "bg-primary/5" : ""
            }`}
            key={row.dept}
          >
            <div className="flex items-center">
              <span
                className={`flex-1 text-[10px] transition-colors duration-300 ${highlighted === i ? "text-foreground/80" : "text-muted-foreground"}`}
              >
                {row.dept}
              </span>
              <span className="text-[10px] text-muted-foreground/60">
                {row.users}
              </span>
            </div>
            <div className="mt-1 h-1 w-full rounded-full bg-muted/20">
              <div
                className={`h-full rounded-full transition-all duration-300 ${highlighted === i ? "bg-primary/50" : "bg-primary/30"}`}
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SWATCHES = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-400",
  "bg-rose-500",
];

function DesignVisual() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSelected((prev) => (prev + 1) % SWATCHES.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto space-y-2.5 pt-4">
      <div className="flex gap-1">
        {SWATCHES.map((c, i) => (
          <div
            className={`h-6 flex-1 rounded-md ${c} transition-all duration-300 ${
              selected === i
                ? "origin-bottom scale-y-110 opacity-100"
                : "opacity-50"
            }`}
            key={i}
          />
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-3/4 rounded-full bg-muted-foreground/25" />
        <div className="h-1.5 w-full rounded-full bg-muted/30" />
        <div className="h-1.5 w-4/5 rounded-full bg-muted/25" />
        <div className="h-1.5 w-3/5 rounded-full bg-muted/20" />
      </div>
    </div>
  );
}

const TERMINAL_LINES = [
  { prompt: "$", cmd: "terraform apply", delay: 0 },
  { prompt: " ", cmd: "Plan: 3 to add, 0 to change", delay: 800 },
  { prompt: "✓", cmd: "Apply complete! (12s)", delay: 1600 },
];

function DevOpsVisual() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [charIdx, setCharIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) {
      // Restart after pause
      const resetId = setTimeout(() => {
        setVisibleLines([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 2000);
      return () => clearTimeout(resetId);
    }

    const line = TERMINAL_LINES[lineIdx];
    const fullText = line.cmd;

    if (charIdx <= fullText.length) {
      const id = setTimeout(
        () => {
          if (charIdx === 0 && lineIdx > 0) {
            // commit previous line
            setVisibleLines((prev) => [
              ...prev,
              `${TERMINAL_LINES[lineIdx - 1].prompt} ${TERMINAL_LINES[lineIdx - 1].cmd}`,
            ]);
          }
          setCharIdx((prev) => prev + 1);
        },
        charIdx === 0 ? (lineIdx === 0 ? 0 : line.delay) : 45
      );
      return () => clearTimeout(id);
    }
    // Line done, move to next
    const id = setTimeout(() => {
      if (lineIdx === TERMINAL_LINES.length - 1) {
        setVisibleLines((prev) => [...prev, `${line.prompt} ${line.cmd}`]);
      }
      setLineIdx((prev) => prev + 1);
      setCharIdx(0);
    }, 300);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx]);

  const currentLine =
    lineIdx < TERMINAL_LINES.length ? TERMINAL_LINES[lineIdx] : null;
  const currentText = currentLine ? currentLine.cmd.slice(0, charIdx) : "";

  return (
    <div className="mt-auto pt-3">
      <div className="min-h-[64px] space-y-0.5 rounded-md border border-border/35 bg-zinc-950 px-3 py-2 font-mono text-[10px] dark:bg-zinc-900/80">
        {visibleLines.map((l, i) => (
          <div
            className={`flex items-center gap-1.5 ${l.startsWith("✓") ? "text-green-400/70" : l.startsWith("$") ? "" : "pl-3 text-muted-foreground/40"}`}
            key={i}
          >
            <span className="text-muted-foreground/40">{l.split(" ")[0]}</span>
            <span className={l.startsWith("$") ? "text-green-400/80" : ""}>
              {l.slice(l.indexOf(" ") + 1)}
            </span>
          </div>
        ))}
        {currentLine && (
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground/40">
              {currentLine.prompt}
            </span>
            <span
              className={
                currentLine.prompt === "$"
                  ? "text-green-400/80"
                  : currentLine.prompt === "✓"
                    ? "text-green-400/70"
                    : "text-muted-foreground/40"
              }
            >
              {currentText}
            </span>
            <span className="animate-pulse text-blue-400/70">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function LegacyVisual() {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
      <div className="space-y-1">
        <p
          className={`text-[9px] uppercase tracking-widest transition-colors duration-300 ${showAfter ? "text-muted-foreground/40" : "text-muted-foreground/70"}`}
        >
          Before
        </p>
        <div
          className={`space-y-0.5 rounded border p-2 font-mono text-[9px] transition-all duration-500 ${showAfter ? "border-red-500/15 bg-red-500/5 text-red-400/50" : "border-red-500/30 bg-red-500/10 text-red-400/70"}`}
        >
          <div>PHP 5.6</div>
          <div>jQuery</div>
          <div>MySQL</div>
          <div className="text-red-400/30">···</div>
        </div>
      </div>
      <div className="space-y-1">
        <p
          className={`text-[9px] uppercase tracking-widest transition-colors duration-300 ${showAfter ? "text-muted-foreground/70" : "text-muted-foreground/40"}`}
        >
          After
        </p>
        <div
          className={`space-y-0.5 rounded border p-2 font-mono text-[9px] transition-all duration-500 ${showAfter ? "border-green-500/40 bg-green-500/10 text-green-400/80" : "border-green-500/20 bg-green-500/5 text-green-400/60"}`}
        >
          <div>Next.js</div>
          <div>React</div>
          <div>Postgres</div>
          <div className="text-green-400/30">···</div>
        </div>
      </div>
    </div>
  );
}

function DigitalTransformVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const steps = [
    {
      label: "Manual",
      icon: (
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      ),
    },
    { label: "Online", icon: <Globe className="size-4" /> },
    { label: "Automated", icon: <Zap className="size-4" /> },
  ];

  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div className="flex flex-1 items-center" key={step.label}>
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`flex size-8 items-center justify-center rounded-full border transition-all duration-500 ${
                  activeStep === i
                    ? "scale-110 border-primary/40 bg-primary/20 text-primary/80"
                    : "border-border/40 bg-muted/20 text-muted-foreground/50"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[8px] transition-colors duration-300 ${activeStep === i ? "text-foreground/60" : "text-muted-foreground/45"}`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`mb-4 shrink-0 text-xs transition-colors duration-300 ${activeStep > i ? "text-primary/50" : "text-muted-foreground/25"}`}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const BRAND_COLORS = [
  { dot: "bg-blue-500", bar: "bg-blue-500/30", name: "Brand A" },
  { dot: "bg-violet-500", bar: "bg-violet-500/30", name: "Brand B" },
  { dot: "bg-emerald-500", bar: "bg-emerald-500/30", name: "Brand C" },
];

function WhiteLabelVisual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % BRAND_COLORS.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto space-y-1.5 pt-4">
      {BRAND_COLORS.map((brand, i) => (
        <div
          className={`flex items-center gap-2 rounded-md border px-2 py-1.5 transition-all duration-300 ${
            activeIdx === i
              ? "border-border/40 bg-muted/20"
              : "border-border/25 bg-muted/10"
          }`}
          key={brand.name}
        >
          <div
            className={`size-3.5 rounded-full ${brand.dot} transition-all duration-300 ${activeIdx === i ? "opacity-100" : "opacity-50"}`}
          />
          <div
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${activeIdx === i ? brand.bar : "bg-muted/20"}`}
          />
          <div className="text-[9px] text-muted-foreground/40">
            {brand.name}
          </div>
        </div>
      ))}
    </div>
  );
}

function SEOVisual() {
  const initialRankings = [
    { keyword: "ai software agency", startPos: 8, endPos: 1, width: "92%" },
    { keyword: "mvp development sg", startPos: 12, endPos: 3, width: "72%" },
    { keyword: "saas app builder", startPos: 18, endPos: 5, width: "55%" },
  ];
  const [positions, setPositions] = useState(
    initialRankings.map((r) => r.startPos)
  );
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const targets = initialRankings.map((r) => r.endPos);
    const starts = initialRankings.map((r) => r.startPos);
    const steps = 20;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setPositions(
        starts.map((s, i) => Math.round(s + ((targets[i] - s) * step) / steps))
      );
      if (step >= steps) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-auto space-y-2 pt-4" ref={ref}>
      {initialRankings.map((r, i) => (
        <div className="space-y-0.5" key={r.keyword}>
          <div className="flex items-center justify-between">
            <span className="max-w-[75%] truncate text-[9px] text-muted-foreground/60">
              {r.keyword}
            </span>
            <span
              className={`font-semibold text-[9px] tabular-nums ${positions[i] <= 3 ? "text-green-500" : "text-muted-foreground/60"}`}
            >
              #{positions[i]}
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-muted/20">
            <div
              className={`h-full rounded-full ${positions[i] <= 3 ? "bg-green-500/50" : "bg-muted-foreground/25"}`}
              style={{ width: r.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "We need an app but have no idea where to start or what it'll cost.",
  },
  {
    role: "agent" as const,
    text: "Let's scope it first. No cost until you're sure. Here's what I'd recommend...",
  },
];

function ConsultancyVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (visibleCount >= CHAT_MESSAGES.length) {
      // Restart after pause
      const id = setTimeout(() => {
        setVisibleCount(0);
        setCharIdx(0);
      }, 3000);
      return () => clearTimeout(id);
    }

    const msg = CHAT_MESSAGES[visibleCount];
    if (charIdx < msg.text.length) {
      const id = setTimeout(() => {
        setCharIdx((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
      setCharIdx(0);
    }, 600);
    return () => clearTimeout(id);
  }, [visibleCount, charIdx]);

  return (
    <div className="mt-auto space-y-2 pt-4">
      {CHAT_MESSAGES.map((m, i) => {
        if (i > visibleCount) return null;
        const isTyping = i === visibleCount;
        const displayText = isTyping ? m.text.slice(0, charIdx) : m.text;
        return (
          <div
            className={`flex gap-2 ${m.role === "user" ? "" : "flex-row-reverse"}`}
            key={i}
          >
            <div
              className={`size-6 shrink-0 rounded-full ring-1 ${m.role === "user" ? "bg-muted/40 ring-border/30" : "bg-primary/20 ring-primary/20"}`}
            />
            <div
              className={`max-w-[75%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${
                m.role === "user"
                  ? "rounded-tl-sm bg-muted/25 text-muted-foreground"
                  : "rounded-tr-sm bg-primary/10 text-foreground/70"
              }`}
            >
              {displayText}
              {isTyping && charIdx < m.text.length && (
                <span className="animate-pulse">|</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

interface FeatureLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  darkInvert?: boolean;
}

interface Feature {
  title: string;
  description: string;
  className: string;
  icon: LucideIcon;
  logos?: FeatureLogo[];
  visual?: ReactNode;
}

const features: Feature[] = [
  {
    title: "Web design",
    description:
      "Websites that load fast, look sharp, and turn visitors into leads. Not just good-looking mockups.",
    className: "md:col-span-2 flex flex-col",
    icon: Palette,
    visual: <BrowserMockup />,
  },
  {
    title: "Web apps",
    description:
      "Full-stack web applications built for real users. From simple tools to complex platforms.",
    className: "col-span-1 flex flex-col",
    icon: Globe,
    visual: <WebAppVisual />,
  },
  {
    title: "Mobile apps",
    description:
      "iOS and Android apps, built natively or cross-platform depending on what your users need.",
    className: "col-span-1 flex flex-col",
    icon: Smartphone,
    logos: [
      {
        src: "/logos/apple.svg",
        alt: "Apple",
        width: 16,
        height: 16,
        darkInvert: true,
      },
      {
        src: "/logos/android.svg",
        alt: "Android",
        width: 16,
        height: 16,
        darkInvert: true,
      },
    ],
    visual: <MobileVisual />,
  },
  {
    title: "Browser extensions",
    description:
      "Chrome, Firefox, and Edge extensions that integrate directly into the tools your users already use.",
    className: "col-span-1 flex flex-col",
    icon: Puzzle,
    logos: [
      { src: "/logos/chrome.svg", alt: "Chrome", width: 16, height: 16 },
      { src: "/logos/firefox.svg", alt: "Firefox", width: 16, height: 16 },
      { src: "/logos/edge.svg", alt: "Edge", width: 16, height: 16 },
    ],
    visual: <ExtensionVisual />,
  },
  {
    title: "Enterprise systems",
    description:
      "Internal tools, dashboards, and integrations built to handle real business complexity.",
    className: "col-span-1 flex flex-col",
    icon: Building2,
    visual: <EnterpriseVisual />,
  },
  {
    title: "SaaS products",
    description:
      "Subscription software built to scale. Auth, billing, multi-tenancy, and everything else included.",
    className: "col-span-1 flex flex-col",
    icon: Rocket,
    visual: <MetricsChart />,
  },
  {
    title: "UI/UX design",
    description:
      "Standalone design work. User flows, wireframes, prototypes, and high-fidelity interfaces.",
    className: "col-span-1 flex flex-col",
    icon: Palette,
    visual: <DesignVisual />,
  },
  {
    title: "DevOps & infrastructure",
    description:
      "CI/CD pipelines, cloud setup on AWS, GCP, or Azure, and infrastructure that doesn't fall over.",
    className: "col-span-1 flex flex-col",
    icon: Server,
    logos: [
      { src: "/logos/aws_light.svg", alt: "AWS", width: 28, height: 16 },
      { src: "/logos/azure.svg", alt: "Azure", width: 24, height: 16 },
      {
        src: "/logos/google-cloud.svg",
        alt: "Google Cloud",
        width: 24,
        height: 16,
      },
    ],
    visual: <DevOpsVisual />,
  },
  {
    title: "Performance optimisation",
    description:
      "Slow software loses users. We find the bottlenecks and fix them in code, queries, or infrastructure.",
    className: "col-span-1 flex flex-col",
    icon: Gauge,
    visual: <SpeedGauge />,
  },
  {
    title: "MVP scoping",
    description:
      "Not sure what to build first? We'll help you define the smallest version that proves the idea.",
    className: "md:col-span-2 flex flex-col",
    icon: Lightbulb,
    visual: <KanbanBoard />,
  },
  {
    title: "Legacy modernisation",
    description:
      "Old, brittle software rebuilt on a stack that can actually support where your business is going.",
    className: "col-span-1 flex flex-col",
    icon: RefreshCw,
    visual: <LegacyVisual />,
  },
  {
    title: "Digital transformation",
    description:
      "Moving offline or manual processes online. We've done it for hospitals, logistics, and finance.",
    className: "col-span-1 flex flex-col",
    icon: ArrowRightLeft,
    visual: <DigitalTransformVisual />,
  },
  {
    title: "White-label builds",
    description:
      "Software built for agencies or businesses to rebrand and resell as their own product.",
    className: "col-span-1 flex flex-col",
    icon: FileBox,
    visual: <WhiteLabelVisual />,
  },
  {
    title: "SEO optimisation",
    description:
      "Technical SEO baked in from the start. Fast sites, clean markup, structured data, and content that ranks.",
    className: "col-span-1 flex flex-col",
    icon: Search,
    visual: <SEOVisual />,
  },
  {
    title: "Full deployment",
    description:
      "We don't just hand over code. We ship it, host it, and make sure it runs in production.",
    className: "col-span-1 flex flex-col",
    icon: Upload,
    visual: <DeployPipeline />,
  },
  {
    title: "Consultancy",
    description:
      "Not sure what you need? We'll help you figure it out before you spend a dollar on development.",
    className: "col-span-1 flex flex-col",
    icon: MessageCircle,
    visual: <ConsultancyVisual />,
  },
];

// ── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  return (
    <section className="pt-10 md:pt-14" id="what-we-do">
      <div className="mb-6 px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">What we do</h2>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed md:grid-cols-2">
          {/* Side border stars */}
          <StarMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <StarMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />
          <StarMark
            style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
          />
          <StarMark
            style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
          />
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isFullWidth = feature.className.includes("col-span-2");
            return (
              <div
                className={[
                  "relative space-y-6 overflow-hidden border-border border-r border-b border-dashed p-10",
                  feature.className,
                ].join(" ")}
                key={index}
                style={{
                  minHeight: "300px",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <h3 className="font-medium text-base">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
                {feature.logos && feature.logos.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {feature.logos.map((logo, logoIndex) => (
                      <Image
                        alt={logo.alt}
                        className={`h-4 w-auto${logo.darkInvert ? "dark:invert" : ""}`}
                        height={logo.height}
                        key={logoIndex}
                        src={logo.src}
                        width={logo.width}
                      />
                    ))}
                  </div>
                )}
                {feature.visual}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
