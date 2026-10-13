"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";
import { RYU_PITCH, RYU_STATUS, RYU_URL } from "@/lib/ryu";

// ── Inline visuals ────────────────────────────────────────────────────────────

const RYU_MESSAGES = [
  { role: "user" as const, text: "Summarise today's standups" },
  { role: "agent" as const, text: "Done. 3 blockers found, 2 need follow-up." },
  { role: "user" as const, text: "Draft the follow-up email" },
  { role: "agent" as const, text: "Drafted. Review before I send?" },
  { role: "user" as const, text: "Looks good, send it" },
  { role: "agent" as const, text: "Sent to 4 recipients." },
  { role: "user" as const, text: "Any blockers flagged?" },
  {
    role: "agent" as const,
    text: "Yes. Deployment blocked on API keys. Jia Wei is assigned.",
  },
  { role: "user" as const, text: "Escalate to urgent" },
  { role: "agent" as const, text: "Escalated. Jia Wei notified on Slack." },
];

function AgentAppVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= RYU_MESSAGES.length) {
      const id = setTimeout(() => {
        setVisibleCount(0);
        setCharIdx(0);
      }, 3000);
      return () => clearTimeout(id);
    }

    const msg = RYU_MESSAGES[visibleCount];
    if (charIdx < msg.text.length) {
      const id = setTimeout(() => {
        setCharIdx((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
      setCharIdx(0);
    }, 700);
    return () => clearTimeout(id);
  }, [visibleCount, charIdx]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, charIdx]);

  return (
    <div
      className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto"
      ref={scrollRef}
    >
      {RYU_MESSAGES.map((m, i) => {
        if (i > visibleCount) return null;
        const isTyping = i === visibleCount;
        const displayText = isTyping ? m.text.slice(0, charIdx) : m.text;
        return (
          <div
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            key={i}
          >
            <div
              className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[10px] leading-snug ${
                m.role === "user"
                  ? "rounded-tr-sm bg-amber-400/15 text-foreground/70"
                  : "rounded-tl-sm bg-muted/30 text-muted-foreground"
              }`}
            >
              {m.role === "agent" && (
                <span className="mb-0.5 flex items-center gap-1">
                  <img
                    alt="Ryu"
                    className="h-2.5 w-2.5 object-contain"
                    src="/logos/ryu.png"
                  />
                  <span className="font-medium text-[8px] text-amber-500/80">
                    Ryu
                  </span>
                </span>
              )}
              {displayText}
              {isTyping && charIdx < m.text.length && (
                <span className="animate-pulse">|</span>
              )}
            </div>
          </div>
        );
      })}
      {visibleCount >= RYU_MESSAGES.length && (
        <div className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-muted/10 px-2.5 py-1.5 text-[9px] text-muted-foreground/50">
          <span className="animate-pulse">▋</span>
          <span>Ask anything…</span>
        </div>
      )}
    </div>
  );
}

const ACCESS_RULES = [
  { agent: "Support agent", resource: "Gmail", access: "read" },
  { agent: "Ops agent", resource: "GitHub", access: "approval" },
  { agent: "Sales agent", resource: "Billing", access: "denied" },
] as const;

const ACCESS_STYLES = {
  read: "bg-green-500/10 text-green-500/80",
  approval: "bg-amber-400/10 text-amber-500/80",
  denied: "bg-red-500/10 text-red-500/80",
} as const;

function AccessVisual() {
  const [pulsing, setPulsing] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPulsing(Math.floor(Math.random() * ACCESS_RULES.length));
      setTimeout(() => setPulsing(null), 400);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 space-y-1.5">
      {ACCESS_RULES.map((r, i) => (
        <div className="flex items-center gap-2 text-[9px]" key={r.agent}>
          <span className="rounded bg-muted/30 px-1.5 py-0.5 font-mono text-muted-foreground/70">
            {r.agent}
          </span>
          <div
            className={`h-px flex-1 border-t transition-all duration-300 ${pulsing === i ? "border-foreground/40 border-solid" : "border-border/40 border-dashed"}`}
          />
          <span
            className={`rounded px-1.5 py-0.5 font-mono transition-opacity duration-300 ${ACCESS_STYLES[r.access]} ${pulsing === i ? "opacity-100" : "opacity-70"}`}
          >
            {r.access}
          </span>
          <div
            className={`h-px flex-1 border-t transition-all duration-300 ${pulsing === i ? "border-foreground/40 border-solid" : "border-border/40 border-dashed"}`}
          />
          <span className="rounded bg-muted/30 px-1.5 py-0.5 font-mono text-muted-foreground/70">
            {r.resource}
          </span>
        </div>
      ))}
    </div>
  );
}

const PLUGINS = [
  { label: "Slack", target: 90 },
  { label: "GitHub", target: 70 },
  { label: "Postgres", target: 55 },
];

function PluginsVisual() {
  const [widths, setWidths] = useState([0, 0, 0]);
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
    setWidths(PLUGINS.map((f) => f.target));
  }, [inView]);

  // Subtle pulse after in view
  const pulseDirRef = useRef(1);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setWidths((prev) => {
        const next = prev.map((w, i) => {
          const t = PLUGINS[i].target;
          return Math.max(t - 6, Math.min(t, w + pulseDirRef.current * 3));
        });
        // flip direction if all bars hit a bound
        const allAtTop = next.every((w, i) => w >= PLUGINS[i].target);
        const allAtBottom = next.every((w, i) => w <= PLUGINS[i].target - 6);
        if (allAtTop) pulseDirRef.current = -1;
        if (allAtBottom) pulseDirRef.current = 1;
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div className="mt-3 space-y-1.5" ref={ref}>
      {PLUGINS.map((f, i) => (
        <div className="flex items-center gap-2" key={f.label}>
          <div className="size-1.5 rounded-full bg-amber-400/60" />
          <div className="h-1.5 flex-1 rounded-full bg-muted/20">
            <div
              className="h-full rounded-full bg-amber-400/25 transition-all ease-out"
              style={{
                width: `${widths[i]}%`,
                transitionDuration:
                  inView && widths[i] === PLUGINS[i].target
                    ? "1000ms"
                    : "400ms",
                transitionDelay:
                  inView && widths[i] === 0 ? `${i * 150}ms` : "0ms",
              }}
            />
          </div>
          <span className="w-16 text-right text-[9px] text-muted-foreground/50">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const RUN_STEPS = [
  {
    label: "Run started",
    desc: "Triggered by Slack",
    color: "bg-blue-400/20 border-blue-400/30",
    activeColor: "bg-blue-400/40 border-blue-400/60",
  },
  {
    label: "Plan",
    desc: "Model call",
    color: "bg-amber-400/20 border-amber-400/30",
    activeColor: "bg-amber-400/40 border-amber-400/60",
  },
  {
    label: "Tool call",
    desc: "GitHub · read",
    color: "bg-violet-400/20 border-violet-400/30",
    activeColor: "bg-violet-400/40 border-violet-400/60",
  },
  {
    label: "Approval",
    desc: "Access checked",
    color: "bg-indigo-400/20 border-indigo-400/30",
    activeColor: "bg-indigo-400/40 border-indigo-400/60",
  },
  {
    label: "Completed",
    desc: "Logged",
    color: "bg-green-400/20 border-green-400/30",
    activeColor: "bg-green-400/40 border-green-400/60",
  },
];

function RunTraceVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % RUN_STEPS.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Mobile: 2-col grid, no arrows */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
        {RUN_STEPS.map((s, i) => (
          <div
            className={`flex flex-col gap-1 rounded-lg border p-3 transition-all duration-300 ${activeStep === i ? s.activeColor : s.color}`}
            key={i}
          >
            <span
              className={`font-medium text-[10px] leading-tight transition-colors duration-300 ${activeStep === i ? "text-foreground/90" : "text-foreground/70"}`}
            >
              {s.label}
            </span>
            <span className="text-[9px] text-muted-foreground/50 leading-tight">
              {s.desc}
            </span>
          </div>
        ))}
      </div>
      {/* Desktop: horizontal flow with arrows */}
      <div className="mt-4 hidden grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 sm:grid">
        {RUN_STEPS.flatMap((s, i) => [
          <div
            className={`flex min-w-0 flex-col gap-1 rounded-lg border p-3 transition-all duration-300 ${activeStep === i ? s.activeColor : s.color}`}
            key={s.label}
          >
            <span
              className={`truncate font-medium text-[10px] leading-tight transition-colors duration-300 ${activeStep === i ? "text-foreground/90" : "text-foreground/70"}`}
            >
              {s.label}
            </span>
            <span className="truncate text-[9px] text-muted-foreground/50 leading-tight">
              {s.desc}
            </span>
          </div>,
          ...(i < RUN_STEPS.length - 1
            ? [
                <span
                  className={`text-center text-xs transition-colors duration-300 ${activeStep > i ? "text-foreground/40" : "text-muted-foreground/30"}`}
                  key={`arrow-${i}`}
                >
                  →
                </span>,
              ]
            : []),
        ])}
      </div>
    </>
  );
}

const PLATFORM_LAYERS = [
  { label: "Your agent", stable: true },
  { label: "Plugins (12)", stable: true },
  { label: "Memory", stable: true },
  { label: "Open-source runtime", stable: true },
];

function PlatformVisual() {
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      // Pulse through layers sequentially
      setPulseIdx((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % PLATFORM_LAYERS.length;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 space-y-1">
      {PLATFORM_LAYERS.map((l, i) => (
        <div className="flex items-center gap-2" key={i}>
          <div
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              l.stable
                ? pulseIdx === i
                  ? "scale-125 bg-green-400"
                  : "bg-green-500"
                : "animate-pulse bg-amber-400"
            }`}
          />
          <div
            className={`flex-1 rounded border px-2 py-1 text-[9px] transition-all duration-300 ${
              pulseIdx === i
                ? l.stable
                  ? "border-green-500/40 bg-green-500/10 text-green-400/80"
                  : "border-amber-400/40 bg-amber-400/10 text-amber-500/90"
                : l.stable
                  ? "border-border/25 bg-muted/10 text-muted-foreground/60"
                  : "border-amber-400/20 bg-amber-400/5 text-amber-500/70"
            }`}
          >
            {l.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function Card({
  title,
  description,
  className = "",
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`col-span-1 flex min-w-0 flex-col space-y-2 overflow-hidden border-border border-r border-b border-dashed p-10 ${className}`}
    >
      <h3 className="font-medium text-base">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      {children}
    </div>
  );
}

export default function RyuSection() {
  return (
    <section className="relative scroll-mt-24 pt-10 md:pt-14" id="ryu">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <FadeIn duration={0.4}>
          <div className="space-y-3">
            <div className="flex flex-col items-start gap-1.5 md:flex-row md:items-center md:gap-3">
              <h2 className="flex items-center gap-2 font-medium text-2xl tracking-tighter">
                <img
                  alt="Ryu"
                  className="order-last h-5 w-5 object-contain md:order-first"
                  src="/logos/ryu.png"
                />
                How Ryu works
              </h2>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                {RYU_STATUS}
              </span>
            </div>
            <p className="text-muted-foreground">{RYU_PITCH}</p>
            <a
              className="inline-flex items-center gap-1 font-medium text-foreground text-sm underline-offset-4 hover:underline"
              href={RYU_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn more about Ryu →
            </a>
          </div>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="relative mt-6 grid min-w-0 grid-cols-1 overflow-hidden border-border border-t border-l border-dashed md:grid-cols-2">
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

          <Card
            className="h-[380px] md:row-span-2 md:h-[560px]"
            description="Give your agents an interface your team and customers can use."
            title="Turn your agents into apps"
          >
            <AgentAppVisual />
          </Card>

          <Card
            description="Ryu is built on open-source infrastructure, so you never start from scratch."
            title="Start without building from scratch"
          >
            <PlatformVisual />
          </Card>

          <Card
            description="Give your agents the tools they need by adding plugins."
            title="Add tools with plugins"
          >
            <PluginsVisual />
          </Card>

          <Card
            className="md:col-span-2"
            description="Decide which tools and data each agent can reach, and require approval where it matters."
            title="Control what your agents can access"
          >
            <AccessVisual />
          </Card>

          <Card
            className="md:col-span-2"
            description="See every run step by step, from trigger to tool call to result."
            title="Monitor every run"
          >
            <RunTraceVisual />
          </Card>
        </div>
      </FadeIn>
    </section>
  );
}
