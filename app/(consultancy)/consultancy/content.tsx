"use client";

import { getCalApi } from "@calcom/embed-react";
import { BookOpen, Calendar, Check, Lightbulb, ListChecks, Search } from "lucide-react";
import Hyperspeed from "@/components/hyperspeed-dynamic";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CornerMark } from "@/components/ui/corner-mark";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";

// ── Animated visuals ─────────────────────────────────────────────────────────

const WORKFLOW_ROWS = [
  { label: "Email triage", tag: "automate" },
  { label: "Weekly reporting", tag: "AI draft" },
  { label: "Data entry", tag: "eliminate" },
  { label: "Meeting notes", tag: "automate" },
  { label: "Customer replies", tag: "AI draft" },
];

function WorkflowAuditVisual() {
  const [scanned, setScanned] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (scanned < WORKFLOW_ROWS.length) {
      const id = setTimeout(() => setScanned((s) => s + 1), 550);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setScanned(0);
      setTick((t) => t + 1);
    }, 2400);
    return () => clearTimeout(id);
  }, [scanned, tick]);

  return (
    <div className="mt-auto space-y-1.5 pt-5">
      {WORKFLOW_ROWS.map((row, i) => {
        const done = i < scanned;
        const active = i === scanned;
        return (
          <div
            className={`flex items-center justify-between rounded border px-2.5 py-1.5 transition-all duration-300 ${
              done
                ? "border-green-500/25 bg-green-500/5"
                : active
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/20 bg-transparent"
            }`}
            key={row.label}
          >
            <span
              className={`text-[10px] transition-colors duration-300 ${done || active ? "text-foreground/70" : "text-muted-foreground/35"}`}
            >
              {row.label}
            </span>
            {done && (
              <span className="rounded bg-green-500/15 px-1.5 py-0.5 font-medium text-[8px] text-green-500 uppercase tracking-wide">
                {row.tag}
              </span>
            )}
            {active && (
              <span className="animate-pulse font-mono text-[8px] text-primary/60">
                scanning...
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const AI_TOOLS = [
  { name: "Claude", category: "Writing & reasoning", fit: 96 },
  { name: "Cursor", category: "Dev workflow", fit: 91 },
  { name: "n8n", category: "Automation", fit: 88 },
  { name: "Notion AI", category: "Knowledge base", fit: 84 },
  { name: "Perplexity", category: "Research", fit: 79 },
];

function ToolRecsVisual() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (active < AI_TOOLS.length - 1) {
      const id = setTimeout(() => setActive((a) => a + 1), 700);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setActive(0);
      setTick((t) => t + 1);
    }, 2000);
    return () => clearTimeout(id);
  }, [active, tick]);

  return (
    <div className="mt-auto space-y-1.5 pt-5">
      {AI_TOOLS.map((tool, i) => {
        const shown = i <= active;
        return (
          <div
            className={`flex items-center gap-2 transition-all duration-400 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
            key={tool.name}
          >
            <div
              className={`h-4 w-4 shrink-0 rounded-sm transition-all duration-300 ${i === active ? "bg-primary/30" : "bg-muted/25"}`}
            />
            <span className={`flex-1 text-[10px] transition-colors duration-300 ${i === active ? "text-foreground/80" : "text-muted-foreground/60"}`}>
              {tool.name}
              <span className="ml-1 text-muted-foreground/35">{tool.category}</span>
            </span>
            <span className={`font-mono text-[9px] tabular-nums transition-colors duration-300 ${i === active ? "text-green-500" : "text-muted-foreground/30"}`}>
              {tool.fit}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

const PLAN_ITEMS = [
  "Pick one AI tool to trial this week",
  "Automate your biggest time-waster",
  "Set a 30-day AI review checkpoint",
  "Track time saved weekly",
];

function ActionPlanVisual() {
  const [visible, setVisible] = useState(0);
  const [checked, setChecked] = useState([false, false, false, false]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;
    PLAN_ITEMS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), delay));
      delay += 500;
    });
    PLAN_ITEMS.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setChecked((prev) => { const n = [...prev]; n[i] = true; return n; }),
          delay + i * 380
        )
      );
    });
    delay += PLAN_ITEMS.length * 380;
    timers.push(
      setTimeout(() => {
        setVisible(0);
        setChecked([false, false, false, false]);
        setTick((t) => t + 1);
      }, delay + 1600)
    );
    return () => timers.forEach(clearTimeout);
  }, [tick]);

  return (
    <div className="mt-auto space-y-2 pt-5">
      {PLAN_ITEMS.map((item, i) => (
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
            }}
          >
            <svg
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

const RESOURCES = [
  { type: "guide", label: "Prompt engineering fundamentals" },
  { type: "tool", label: "n8n automation starter template" },
  { type: "video", label: "Claude for business workflows" },
  { type: "article", label: "AI ROI measurement framework" },
];

function ResourceListVisual() {
  const [visible, setVisible] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (visible < RESOURCES.length) {
      const id = setTimeout(() => setVisible((v) => v + 1), 600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setVisible(0);
      setTick((t) => t + 1);
    }, 2200);
    return () => clearTimeout(id);
  }, [visible, tick]);

  const typeColor: Record<string, string> = {
    guide: "bg-blue-500/15 text-blue-400",
    tool: "bg-violet-500/15 text-violet-400",
    video: "bg-amber-500/15 text-amber-400",
    article: "bg-green-500/15 text-green-500",
  };

  return (
    <div className="mt-auto space-y-1.5 pt-5">
      {RESOURCES.map((r, i) => (
        <div
          className="overflow-hidden transition-all duration-300"
          key={r.label}
          style={{
            maxHeight: i < visible ? "40px" : "0px",
            opacity: i < visible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2 rounded border border-border/25 bg-muted/10 px-2.5 py-1.5">
            <span className={`shrink-0 rounded px-1.5 py-0.5 font-medium text-[8px] uppercase tracking-wide ${typeColor[r.type]}`}>
              {r.type}
            </span>
            <span className="truncate text-[10px] text-muted-foreground/70">{r.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── How It Works visuals ─────────────────────────────────────────────────────

const INTAKE_FIELDS = [
  { label: "Business type", value: "SaaS / B2B" },
  { label: "Team size", value: "5–15 people" },
  { label: "Biggest time-waster", value: "Manual reporting" },
  { label: "AI experience", value: "Tried ChatGPT" },
];

function BookVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = [true, false, false, true, true, false, false, true, true, false];
  const [bookedIdx, setBookedIdx] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const available = slots.reduce<number[]>((acc, s, i) => (s ? [...acc, i] : acc), []);
    const pick = available[tick % available.length];
    const id = setTimeout(() => setBookedIdx(pick), 400);
    const reset = setTimeout(() => {
      setBookedIdx(null);
      setTick((t) => t + 1);
    }, 2200);
    return () => { clearTimeout(id); clearTimeout(reset); };
  }, [tick]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-auto pt-5">
      <div className="mb-2 flex justify-between">
        {days.map((d) => (
          <span className="flex-1 text-center text-[9px] text-muted-foreground/40" key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1">
        {slots.map((open, i) => (
          <div
            className={`flex h-7 items-center justify-center rounded transition-all duration-400 ${
              !open
                ? "bg-muted/10 text-muted-foreground/20"
                : bookedIdx === i
                  ? "bg-green-500/20 ring-1 ring-green-500/40"
                  : "cursor-pointer bg-primary/10 hover:bg-primary/15"
            }`}
            key={i}
          >
            {bookedIdx === i ? (
              <Check className="size-3 text-green-500" strokeWidth={3} />
            ) : (
              <span className={`text-[9px] ${open ? "text-primary/60" : "text-muted-foreground/20"}`}>
                {open ? "○" : "×"}
              </span>
            )}
          </div>
        ))}
      </div>
      {bookedIdx !== null && (
        <p className="mt-2 text-center font-medium text-[9px] text-green-500">
          Slot booked. Intake form sent.
        </p>
      )}
    </div>
  );
}

function PrepareVisual() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (active < INTAKE_FIELDS.length - 1) {
      const id = setTimeout(() => setActive((a) => a + 1), 700);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setActive(0);
      setTick((t) => t + 1);
    }, 1800);
    return () => clearTimeout(id);
  }, [active, tick]);

  return (
    <div className="mt-auto overflow-hidden rounded-md border border-border/35 pt-5">
      <div className="flex bg-muted/25 px-2.5 py-1 text-[9px] text-muted-foreground/40 uppercase tracking-widest">
        Intake form
      </div>
      {INTAKE_FIELDS.map((f, i) => (
        <div
          className={`border-border/20 border-t px-2.5 py-1.5 transition-colors duration-300 ${active === i ? "bg-primary/5" : ""}`}
          key={f.label}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[9px] transition-colors duration-300 ${active === i ? "text-foreground/70" : "text-muted-foreground/40"}`}>
              {f.label}
            </span>
            <span className={`text-[9px] transition-colors duration-300 ${active === i ? "text-foreground/80 font-medium" : "text-muted-foreground/35"}`}>
              {f.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

type SessionPhase = "idle" | "audit" | "recommend" | "plan" | "done";

function SessionVisual() {
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const seq: Array<[SessionPhase, number]> = [
      ["audit", 0],
      ["recommend", 1300],
      ["plan", 2600],
      ["done", 3700],
    ];
    const timers = seq.map(([p, d]) => setTimeout(() => setPhase(p), d));
    const reset = setTimeout(() => {
      setPhase("idle");
      setTick((t) => t + 1);
    }, 6000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [tick]);

  const steps: Array<{ label: string; key: SessionPhase; active: boolean; done: boolean }> = [
    { label: "Audit", key: "audit", active: phase === "audit", done: ["recommend", "plan", "done"].includes(phase) },
    { label: "Recommend", key: "recommend", active: phase === "recommend", done: ["plan", "done"].includes(phase) },
    { label: "Plan", key: "plan", active: phase === "plan", done: phase === "done" },
    { label: "Done", key: "done", active: phase === "done", done: false },
  ];

  return (
    <div className="mt-auto space-y-2 pt-5">
      {steps.map((s) => (
        <div className="flex items-center gap-2.5" key={s.key}>
          <div
            className={[
              "size-2 shrink-0 rounded-full transition-all duration-400",
              s.done ? "bg-green-500" : s.active ? "animate-pulse bg-primary" : "bg-muted/40",
            ].join(" ")}
          />
          <span
            className={[
              "text-[10px] transition-colors duration-300",
              s.done || s.active ? "text-foreground/70" : "text-muted-foreground/35",
            ].join(" ")}
          >
            {s.label}
          </span>
          {s.key === "done" && s.active && (
            <span className="ml-auto animate-pulse font-mono text-[9px] text-green-500/80">
              ● follow-up sent
            </span>
          )}
          {s.done && (
            <svg className="ml-auto size-3 text-green-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const deliverables = [
  {
    icon: Search,
    title: "AI Workflow Audit",
    description:
      "We map what you're actually doing, not what you think you're doing. Then we find the two or three places where AI makes the biggest dent.",
    visual: <WorkflowAuditVisual />,
  },
  {
    icon: Lightbulb,
    title: "Personalised Tool Recommendations",
    description:
      "Specific tools for your situation. We build with these daily, so we know what works in production and what only looks good in demos.",
    visual: <ToolRecsVisual />,
  },
  {
    icon: ListChecks,
    title: "Quick-Start Action Plan",
    description:
      "Not a strategy deck. A short list of things you can start this week, ordered by impact.",
    visual: <ActionPlanVisual />,
  },
  {
    icon: BookOpen,
    title: "Follow-up Resource List",
    description:
      "Handpicked resources sent after the call. Exactly what you need to go further. Nothing you don't.",
    visual: <ResourceListVisual />,
  },
];

const steps = [
  {
    title: "Book",
    description:
      "Pick a slot. Free or $100, your call. An intake form lands in your inbox straight after so we can prepare properly.",
    visual: <BookVisual />,
  },
  {
    title: "Prepare",
    description:
      "We read your intake before the call. You don't get a cold start. We show up having thought about your situation already.",
    visual: <PrepareVisual />,
  },
  {
    title: "Session",
    description:
      "30 minutes, 1-on-1. We audit, recommend, and plan. A personalised resource list follows within 24 hours.",
    visual: <SessionVisual />,
  },
];

const faqItems = [
  {
    id: "faq-1",
    question: "What's the difference between free and $100?",
    answer:
      "Same session, same preparation, same outcome. The $100 option exists because some people book free calls and don't show up. Pay $100, show up, get $50 back. It's a commitment filter that works for both of us.",
  },
  {
    id: "faq-2",
    question: "What actually happens in the 30 minutes?",
    answer:
      "We audit your workflow, identify where AI makes the most sense for your situation, and give you a short list of specific next steps. You leave with a plan, not a pitch deck.",
  },
  {
    id: "faq-3",
    question: "Will you try to sell me something?",
    answer:
      "No. If Ryu or A Major's agency work genuinely fits, we'll say so and explain why. If something else fits better, we'll say that instead. We'd rather give you the right answer than close a deal.",
  },
  {
    id: "faq-4",
    question: "Who is this for?",
    answer:
      "Business owners, operators, and team leads who know AI is relevant to their work but haven't found a clear entry point. If you've tried a few tools and aren't sure what to build on, this is for you.",
  },
  {
    id: "faq-5",
    question: "What if I cancel?",
    answer:
      "Free slots: cancel anytime, no questions asked. $100 slot: full refund if you cancel more than 24 hours before. Cancel within 24 hours and the $100 is forfeited. That's the point of it.",
  },
  {
    id: "faq-6",
    question: "What happens after the session?",
    answer:
      "You get a follow-up email with a personalised resource list within 24 hours. If you want to go further, build something, or explore Ryu, we can talk about that too. No pressure.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export function ConsultancyContent() {
  const openCal = async (calLink: string) => {
    const cal = await getCalApi({ namespace: "amajor" });
    cal("modal", { calLink, config: { layout: "month_view" } });
  };

  const now = new Date();
  const currentMonth = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const lastMonth = prevDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <main className="relative pt-6 lg:pt-20">
        <section className="relative overflow-hidden bg-white dark:bg-transparent">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 opacity-20"
            style={{ zIndex: 0, height: "100%" }}
          >
            <Hyperspeed effectOptions={hyperspeedPresets.two} />
          </div>
          <DotGridBackground
            className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.04]"
            dotRadius={1}
            spacing={28}
          />
          <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-14">
            <div className="relative z-10">
              <FadeIn direction="down" duration={0.6}>
                <h1 className="font-semibold text-2xl text-foreground tracking-tighter">
                  The biggest gap in AI isn&apos;t the technology.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} duration={0.5}>
                <p className="font-semibold text-2xl text-muted-foreground tracking-tighter">
                  It&apos;s knowing where to start.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} duration={0.5}>
                <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                  We build AI agents and ship AI-native software for a living. One honest 30-minute audit before you spend a dollar on the wrong thing.
                </p>
              </FadeIn>
              <FadeIn delay={0.4} duration={0.5}>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      className="!py-0 !h-9 rounded-full px-4"
                      onClick={() => openCal("jiaweing/amajor-paid")}
                      size="lg"
                    >
                      Book $100 session →
                    </Button>
                    <Button
                      className="!py-0 !h-9 rounded-full px-4"
                      onClick={() => openCal("jiaweing/amajor")}
                      size="lg"
                      variant="outline"
                    >
                      Book free session
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    Get $50 back when you show up
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="relative bg-background">
          <FadeIn delay={0.5} duration={0.5}>
            <div className="relative border-border border-t border-dashed">
              <CornerMark corner="tl" size={10} />
              <CornerMark corner="tr" size={10} />
              {/* Perforation notches */}
              <div className="absolute -top-[7px] left-[calc(50%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
              <div className="absolute -bottom-[7px] left-[calc(50%-7px)] z-10 size-3.5 rounded-full border border-border border-dashed bg-background" />
              <CornerMark corner="bl" size={10} />
              <CornerMark corner="br" size={10} />
              <div className="relative grid grid-cols-2 border-border border-t border-dashed">
                {/* Free ticket */}
                <div
                  className="group cursor-pointer border-border border-r border-b border-dashed p-5 transition-colors duration-200 hover:bg-accent/50"
                  onClick={() => openCal("jiaweing/amajor")}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openCal("jiaweing/amajor"); }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[9px] text-green-600 uppercase tracking-widest dark:text-green-400">
                        Free
                      </span>
                      <div className="relative size-4">
                        <Check className="absolute inset-0 size-4 text-green-600 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0 dark:text-green-400" strokeWidth={3} />
                        <Calendar className="absolute inset-0 size-4 -rotate-90 scale-0 text-green-600 opacity-0 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 dark:text-green-400" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="relative h-2 w-20 overflow-hidden rounded-full border border-green-500/30 bg-green-500/15">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_0.5s_infinite] bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
                      </div>
                      <div className="relative h-1.5 w-12 overflow-hidden rounded-full bg-green-500/10">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_0.9s_infinite] bg-gradient-to-r from-transparent via-green-400/15 to-transparent" />
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50">
                      30-min AI audit, no payment
                    </span>
                  </div>
                </div>

                {/* $100 ticket */}
                <div
                  className="group cursor-pointer border-border border-b border-dashed p-5 transition-colors duration-200 hover:bg-accent/50"
                  onClick={() => openCal("jiaweing/amajor-paid")}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openCal("jiaweing/amajor-paid"); }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[9px] text-muted-foreground uppercase tracking-widest">
                        $100
                      </span>
                      <div className="relative size-4">
                        <Check className="absolute inset-0 size-4 text-muted-foreground transition-all duration-300 ease-out group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0" strokeWidth={3} />
                        <Calendar className="absolute inset-0 size-4 -rotate-90 scale-0 text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="relative h-2 w-16 overflow-hidden rounded-full bg-muted-foreground/15">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                      <div className="relative h-1.5 w-10 overflow-hidden rounded-full bg-muted-foreground/10">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_0.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50">
                      get $50 back when you show up
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col gap-2 border-border border-t border-dashed py-4 text-center">
                <span className="inline-flex items-center justify-center gap-2 text-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-medium text-foreground">Slots open in {currentMonth}</span>
                </span>
                <span className="text-muted-foreground text-sm">
                  <span className="font-medium text-muted-foreground/60 line-through">{lastMonth} fully booked</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* ── What You Get ─────────────────────────────────────── */}
      <FadeIn>
        <section className="relative overflow-hidden pt-10 md:pt-14" id="deliverables">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div className="mb-6 px-6">
            <h2 className="font-medium text-2xl tracking-tighter">One session. Four things you leave with.</h2>
          </div>
          <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  className={[
                    "flex flex-col border-border border-r border-b border-dashed p-6",
                    i % 2 === 1 ? "md:border-r-0" : "",
                  ].join(" ")}
                  key={d.title}
                  style={{ minHeight: "280px" }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <h3 className="font-medium text-sm">{d.title}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {d.description}
                  </p>
                  {d.visual}
                </div>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <FadeIn>
        <section className="relative overflow-hidden pt-10 md:pt-14" id="pricing">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div className="mb-6 px-6">
            <h2 className="font-medium text-2xl tracking-tighter">Two ways to book. Same session.</h2>
          </div>
          <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">

            <div className="flex flex-col gap-4 border-border border-r border-b border-dashed p-6 md:p-10">
              <div>
                <p className="font-medium text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                  Free
                </p>
                <p className="mt-2 font-semibold text-4xl tracking-tighter">$0</p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Same 30-minute session. Book any open slot. No payment, no catch.
              </p>
              <Button
                className="mt-auto w-full rounded-full"
                onClick={() => openCal("jiaweing/amajor")}
                variant="outline"
              >
                Book free session
              </Button>
            </div>

            <div className="relative flex flex-col gap-4 border-border border-r border-b border-dashed p-6 md:p-10">
              <DotGridBackground
                className="text-zinc-950 opacity-[0.04] dark:text-white dark:opacity-[0.07]"
                dotRadius={1}
                spacing={28}
              />
              <div className="relative z-10">
                <p className="font-medium text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                  Paid — net $50
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="font-semibold text-4xl tracking-tighter">$100</p>
                  <p className="text-muted-foreground text-sm">→ $50 back on arrival</p>
                </div>
              </div>
              <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
                Pay $100 upfront. Show up and we refund $50. Net cost: $50. We only keep it if you don&apos;t show up.
              </p>
              <Button
                className="relative z-10 mt-auto w-full rounded-full"
                onClick={() => openCal("jiaweing/amajor-paid")}
              >
                Book $100 session
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Credibility ──────────────────────────────────────── */}
      <FadeIn>
        <section className="relative overflow-hidden pt-10 md:pt-14" id="credibility">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div className="mx-auto mb-6 max-w-5xl px-6">
            <div className="relative z-10 max-w-xl space-y-3">
              <h2 className="font-medium text-2xl tracking-tighter">
                We build this stuff. We don&apos;t just talk about it.
              </h2>
              <p className="text-muted-foreground">
                A Major ships AI agents and AI-native software for real businesses. We know what works in production, what looks good in demos, and the difference between the two.
              </p>
            </div>
          </div>
          <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
            {[
              { stat: "Decosmic", label: "One of the world's first RAG-based AI startups. Before RAG was a buzzword.", logo: "/logos/decosmic.svg", logoAlt: "Decosmic", rounded: false, href: "https://decosmic.com" },
              { stat: "Ryu", label: "End-to-end AI agent infrastructure, built before agents went mainstream.", logo: "/logos/ryu.png", logoAlt: "Ryu", rounded: false, href: "/products/ryu" },
              { stat: "Update Night", label: "Calling AI trends before they go viral, because we're in the middle of them.", logo: "/logos/updatenight.png", logoAlt: "Update Night", rounded: true, href: "https://updatenight.com" },
            ].map((c, i) => (
              <a
                className={[
                  "flex flex-col gap-2 border-border border-r border-b border-dashed p-6 transition-colors duration-150 hover:bg-muted/10",
                  i === 2 ? "md:border-r-0" : "",
                ].join(" ")}
                href={c.href}
                key={c.stat}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={c.href.startsWith("http") ? "_blank" : undefined}
              >
                <div className="flex items-center gap-2">
                  <img alt={c.logoAlt} className={`h-5 w-5 object-contain ${c.rounded ? "rounded" : ""}`} src={c.logo} />
                  <p className="font-semibold text-2xl tracking-tighter">{c.stat}</p>
                </div>
                <p className="text-muted-foreground text-sm">{c.label}</p>
              </a>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── How It Works ─────────────────────────────────────── */}
      <FadeIn>
        <section className="relative overflow-hidden pt-10 md:pt-14" id="process">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div className="mb-6 px-6">
            <h2 className="font-medium text-2xl tracking-tighter">Simple. Three steps.</h2>
          </div>
          <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                className={[
                  "flex flex-col space-y-3 border-border border-r border-b border-dashed p-6",
                  index === steps.length - 1 ? "md:border-r-0" : "",
                ].join(" ")}
                key={index}
                style={{ minHeight: "260px" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border border-dashed font-medium text-muted-foreground text-sm">
                    {index + 1}
                  </div>
                  <p className="font-medium text-sm">{step.title}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
                {step.visual}
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FadeIn>
        <section className="relative pt-10 md:pt-14" id="faq">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div className="mx-auto mb-2 max-w-5xl px-6">
            <h2 className="font-medium text-2xl tracking-tighter">Things people usually ask</h2>
          </div>
          <div className="mx-auto mb-6 max-w-5xl px-6">
            <p className="text-muted-foreground text-sm">
              Still unsure? Book anyway. The session exists to answer exactly these questions.
            </p>
          </div>
          <div className="relative border-border border-y border-dashed">
            <div className="mx-auto max-w-5xl px-6 py-8">
              <Accordion className="w-full" collapsible type="single">
                {faqItems.map((item) => (
                  <div className="group" key={item.id}>
                    <AccordionItem className="peer border-none px-0 py-1" value={item.id}>
                      <AccordionTrigger className="cursor-pointer font-semibold text-base hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground text-sm">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                    <hr className="border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <FadeIn>
        <section className="relative overflow-hidden py-20" id="book">
          <StarMark style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }} />
          <StarMark style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }} />
          <StarMark style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }} />
          <StarMark style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-pink-600),var(--color-white)_100%)] dark:opacity-100"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="font-medium text-2xl tracking-tighter">
                Start here before you spend anything on AI.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Free slots available. Or pay $100 and get $50 back when you show up.
              </p>
              <div className="mx-auto mt-6 max-w-sm">
                <div className="flex justify-center gap-3">
                  <Button onClick={() => openCal("jiaweing/amajor")} variant="outline">
                    Book free
                  </Button>
                  <Button onClick={() => openCal("jiaweing/amajor-paid")}>
                    Book $100 session
                  </Button>
                </div>
                <p className="mt-4 text-muted-foreground/70 text-xs">
                  Show up and we refund $50. The refund is our skin in the game.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
