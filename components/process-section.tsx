"use client";

import { useEffect, useState } from "react";
import FuzzyText from "@/components/reactbits/fuzzy-text";
import { FadeIn } from "@/components/ui/fade-in";

// ── Step 1: Scope visual ─────────────────────────────────────────────────────

const SCOPE_ITEMS = [
  "User flows defined",
  "Requirements locked",
  "Tech decisions made",
  "Timeline agreed",
];

function ScopeVisual() {
  const [visible, setVisible] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    // Reveal items
    SCOPE_ITEMS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), delay));
      delay += 500;
    });

    // Check items off
    SCOPE_ITEMS.forEach((_, i) => {
      timers.push(
        setTimeout(
          () =>
            setChecked((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            }),
          delay + i * 400
        )
      );
    });
    delay += SCOPE_ITEMS.length * 400;

    // Reset
    timers.push(
      setTimeout(() => {
        setVisible(0);
        setChecked([false, false, false, false]);
        setTick((t) => t + 1);
      }, delay + 1800)
    );

    return () => timers.forEach(clearTimeout);
  }, [tick]);

  return (
    <div className="mt-auto space-y-2 pt-5">
      {SCOPE_ITEMS.map((item, i) => (
        <div
          className="flex items-center gap-2.5"
          key={item}
          style={{
            opacity: i < visible ? 1 : 0,
            transform: i < visible ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div
            className="relative flex size-5 shrink-0 items-center justify-center rounded-md transition-all duration-300"
            style={{
              border: checked[i]
                ? "1.5px solid hsl(var(--primary) / 0.6)"
                : "1.5px solid hsl(var(--border) / 0.5)",
              background: checked[i]
                ? "hsl(var(--primary) / 0.15)"
                : "hsl(var(--muted) / 0.2)",
              boxShadow: checked[i]
                ? "0 0 0 3px hsl(var(--primary) / 0.08)"
                : "none",
            }}
          >
            <svg
              className="transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              style={{
                width: 11,
                height: 11,
                color: checked[i] ? "hsl(var(--primary))" : "transparent",
                strokeDasharray: 16,
                strokeDashoffset: checked[i] ? 0 : 16,
                transition: "stroke-dashoffset 0.25s ease, color 0.2s ease",
              }}
              viewBox="0 0 12 12"
            >
              <path d="M2 6.5l3 3 5-5.5" />
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

// ── Step 2: Build visual ─────────────────────────────────────────────────────

const SPRINTS = [
  { label: "Sprint 1", target: 100 },
  { label: "Sprint 2", target: 72 },
  { label: "Sprint 3", target: 38 },
];

function BuildVisual() {
  const [widths, setWidths] = useState([0, 0, 0]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fill = SPRINTS.map((sprint, i) =>
      setTimeout(
        () =>
          setWidths((prev) => {
            const n = [...prev];
            n[i] = sprint.target;
            return n;
          }),
        i * 550
      )
    );
    const reset = setTimeout(
      () => {
        setWidths([0, 0, 0]);
        setTick((t) => t + 1);
      },
      SPRINTS.length * 550 + 2200
    );
    return () => {
      fill.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [tick]);

  return (
    <div className="mt-auto space-y-2.5 pt-5">
      {SPRINTS.map((sprint, i) => (
        <div className="space-y-1" key={sprint.label}>
          <div className="flex justify-between text-[9px] text-muted-foreground/60">
            <span>{sprint.label}</span>
            <span className="tabular-nums">{Math.round(widths[i])}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted/25">
            <div
              className="h-full rounded-full bg-primary/40 transition-all ease-out"
              style={{ width: `${widths[i]}%`, transitionDuration: "700ms" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Step 3: Ship visual ──────────────────────────────────────────────────────

type DeployPhase = "idle" | "build" | "test" | "deploy" | "live";

function ShipVisual() {
  const [phase, setPhase] = useState<DeployPhase>("idle");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const seq: Array<[DeployPhase, number]> = [
      ["build", 0],
      ["test", 1200],
      ["deploy", 2400],
      ["live", 3500],
    ];
    const timers = seq.map(([p, d]) => setTimeout(() => setPhase(p), d));
    const reset = setTimeout(() => {
      setPhase("idle");
      setTick((t) => t + 1);
    }, 6000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [tick]);

  const steps: Array<{
    label: string;
    key: DeployPhase;
    active: boolean;
    done: boolean;
  }> = [
    {
      label: "Build",
      key: "build",
      active: phase === "build",
      done: ["test", "deploy", "live"].includes(phase),
    },
    {
      label: "Test",
      key: "test",
      active: phase === "test",
      done: ["deploy", "live"].includes(phase),
    },
    {
      label: "Deploy",
      key: "deploy",
      active: phase === "deploy",
      done: phase === "live",
    },
    { label: "Live", key: "live", active: phase === "live", done: false },
  ];

  return (
    <div className="mt-auto space-y-2 pt-5">
      {steps.map((s) => (
        <div className="flex items-center gap-2.5" key={s.key}>
          <div
            className={[
              "size-2 shrink-0 rounded-full transition-all duration-400",
              s.done
                ? "bg-green-500"
                : s.active
                  ? "animate-pulse bg-blue-400"
                  : "bg-muted/40",
            ].join(" ")}
          />
          <span
            className={[
              "text-[10px] transition-colors duration-300",
              s.done || s.active
                ? "text-foreground/70"
                : "text-muted-foreground/40",
            ].join(" ")}
          >
            {s.label}
          </span>
          {s.key === "live" && s.active && (
            <span className="ml-auto animate-pulse font-mono text-[9px] text-green-500/80">
              ● amajor.ai
            </span>
          )}
          {s.done && (
            <svg
              className="ml-auto size-3 text-green-500/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

const steps = [
  {
    title: "Scope",
    description:
      "We define what to build. Requirements, user flows, and technical decisions made upfront so nothing gets lost in translation.",
    visual: <ScopeVisual />,
  },
  {
    title: "Build",
    description:
      "Fast, iterative development with regular check-ins. You see progress weekly, not just at the end.",
    visual: <BuildVisual />,
  },
  {
    title: "Ship",
    description:
      "Full deployment, handover, and documentation. We make sure it runs in production before we call it done.",
    visual: <ShipVisual />,
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-14" id="process">
      <div className="mb-6 px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">How we work</h2>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              className={[
                "flex flex-col space-y-3 border-border border-r border-b border-dashed p-6",
                index === steps.length - 1 ? "md:border-r-0" : "",
              ].join(" ")}
              key={index}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border border-dashed font-medium text-muted-foreground text-sm">
                  {index + 1}
                </div>
                <FuzzyText
                  baseIntensity={0}
                  color="currentColor"
                  enableHover
                  fontSize={14}
                  fontWeight={500}
                  fuzzRange={20}
                  hoverIntensity={0.4}
                  transitionDuration={200}
                >
                  {step.title}
                </FuzzyText>
              </div>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
              {step.visual}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
