"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";

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
    text: "Yes — deployment blocked on API keys. Jia Wei is assigned.",
  },
  { role: "user" as const, text: "Escalate to urgent" },
  { role: "agent" as const, text: "Escalated. Jia Wei notified on Slack." },
];

function RyuAppVisual() {
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

const GATEWAY_ROUTES = [
  { from: "Your app", to: "Claude Opus 4.6", latency: 42 },
  { from: "Your app", to: "GPT 5.4", latency: 61 },
  { from: "Your app", to: "Gemini 3.1 Pro", latency: 38 },
];

function GatewayVisual() {
  const [latencies, setLatencies] = useState(
    GATEWAY_ROUTES.map((r) => r.latency)
  );
  const [pulsing, setPulsing] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * GATEWAY_ROUTES.length);
      const base = GATEWAY_ROUTES[idx].latency;
      const jitter = Math.floor(Math.random() * 20) - 10;
      setPulsing(idx);
      setLatencies((prev) => {
        const next = [...prev];
        next[idx] = base + jitter;
        return next;
      });
      setTimeout(() => setPulsing(null), 400);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 space-y-1.5">
      {GATEWAY_ROUTES.map((r, i) => (
        <div className="flex items-center gap-2 text-[9px]" key={i}>
          <span className="rounded bg-muted/30 px-1.5 py-0.5 font-mono text-muted-foreground/70">
            {r.from}
          </span>
          <div className="flex flex-1 items-center gap-1">
            <div
              className={`h-px flex-1 border-t transition-all duration-300 ${pulsing === i ? "border-green-500/60 border-solid" : "border-border/40 border-dashed"}`}
            />
            <span
              className={`tabular-nums transition-all duration-300 ${pulsing === i ? "text-green-400" : "text-green-500/60"}`}
            >
              {latencies[i]}ms
            </span>
            <div
              className={`h-px flex-1 border-t transition-all duration-300 ${pulsing === i ? "border-green-500/60 border-solid" : "border-border/40 border-dashed"}`}
            />
          </div>
          <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-amber-500/70">
            {r.to}
          </span>
        </div>
      ))}
    </div>
  );
}

const AI_FEATURES = [
  { label: "Copilot", target: 90 },
  { label: "Summaries", target: 70 },
  { label: "Semantic search", target: 55 },
];

function AIIntegrationVisual() {
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
    setWidths(AI_FEATURES.map((f) => f.target));
  }, [inView]);

  // Subtle pulse after in view
  const pulseDirRef = useRef(1);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setWidths((prev) => {
        const next = prev.map((w, i) => {
          const t = AI_FEATURES[i].target;
          return Math.max(t - 6, Math.min(t, w + pulseDirRef.current * 3));
        });
        // flip direction if all bars hit a bound
        const allAtTop = next.every((w, i) => w >= AI_FEATURES[i].target);
        const allAtBottom = next.every(
          (w, i) => w <= AI_FEATURES[i].target - 6
        );
        if (allAtTop) pulseDirRef.current = -1;
        if (allAtBottom) pulseDirRef.current = 1;
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div className="mt-3 space-y-1.5" ref={ref}>
      {AI_FEATURES.map((f, i) => (
        <div className="flex items-center gap-2" key={f.label}>
          <div className="size-1.5 rounded-full bg-amber-400/60" />
          <div className="h-1.5 flex-1 rounded-full bg-muted/20">
            <div
              className="h-full rounded-full bg-amber-400/25 transition-all ease-out"
              style={{
                width: `${widths[i]}%`,
                transitionDuration:
                  inView && widths[i] === AI_FEATURES[i].target
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

const CHATBOT_FULL_RESPONSE = "Go to Settings → Account → Reset password.";

function ChatbotVisual() {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");

  useEffect(() => {
    const startId = setTimeout(() => setPhase("typing"), 800);
    return () => clearTimeout(startId);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed.length < CHATBOT_FULL_RESPONSE.length) {
      const id = setTimeout(() => {
        setTyped(CHATBOT_FULL_RESPONSE.slice(0, typed.length + 1));
      }, 40);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setPhase("done");
      // Restart
      setTimeout(() => {
        setTyped("");
        setPhase("typing");
      }, 3000);
    }, 500);
    return () => clearTimeout(id);
  }, [phase, typed]);

  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex items-start gap-1.5">
        <div className="mt-0.5 size-4 shrink-0 rounded-full bg-muted/30" />
        <div className="rounded-xl rounded-tl-sm bg-muted/25 px-2 py-1 text-[9px] text-muted-foreground/70">
          How do I reset my password?
        </div>
      </div>
      <div className="flex flex-row-reverse items-start gap-1.5">
        <div className="mt-0.5 size-4 shrink-0 rounded-full bg-amber-400/20" />
        <div className="min-h-[24px] rounded-xl rounded-tr-sm bg-amber-400/10 px-2 py-1 text-[9px] text-muted-foreground/70">
          {typed}
          {phase === "typing" &&
            typed.length < CHATBOT_FULL_RESPONSE.length && (
              <span className="animate-pulse">|</span>
            )}
        </div>
      </div>
    </div>
  );
}

const WORKFLOW_STEPS = [
  {
    label: "Form submit",
    desc: "User fills form",
    color: "bg-blue-400/20 border-blue-400/30",
    activeColor: "bg-blue-400/40 border-blue-400/60",
  },
  {
    label: "Validate",
    desc: "Rules checked",
    color: "bg-amber-400/20 border-amber-400/30",
    activeColor: "bg-amber-400/40 border-amber-400/60",
  },
  {
    label: "Notify team",
    desc: "Slack + email",
    color: "bg-violet-400/20 border-violet-400/30",
    activeColor: "bg-violet-400/40 border-violet-400/60",
  },
  {
    label: "Update CRM",
    desc: "Record synced",
    color: "bg-indigo-400/20 border-indigo-400/30",
    activeColor: "bg-indigo-400/40 border-indigo-400/60",
  },
  {
    label: "Done",
    desc: "All automated",
    color: "bg-green-400/20 border-green-400/30",
    activeColor: "bg-green-400/40 border-green-400/60",
  },
];

function WorkflowVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 flex items-stretch gap-2">
      {WORKFLOW_STEPS.map((s, i) => (
        <div className="flex flex-1 items-center gap-2" key={i}>
          <div
            className={`flex flex-1 flex-col gap-1 rounded-lg border p-3 transition-all duration-300 ${activeStep === i ? s.activeColor : s.color}`}
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
          {i < WORKFLOW_STEPS.length - 1 && (
            <span
              className={`shrink-0 text-xs transition-colors duration-300 ${activeStep > i ? "text-foreground/40" : "text-muted-foreground/30"}`}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const AGENT_LAYERS = [
  { label: "Your agent", stable: true },
  { label: "Memory", stable: true },
  { label: "Tools (12)", stable: true },
  { label: "Ryu runtime", stable: false },
];

function AgentDeployVisual() {
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      // Pulse through layers sequentially
      setPulseIdx((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % AGENT_LAYERS.length;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 space-y-1">
      {AGENT_LAYERS.map((l, i) => (
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

export default function RyuSection() {
  return (
    <section className="relative pt-10 md:pt-14">
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
                The agency behind Ryu
              </h2>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                Shipping May 2026
              </span>
            </div>
            <p className="text-muted-foreground">
              We built Ryu because running AI agents in production
              shouldn&apos;t require a team of ML engineers. A single binary
              that wraps any agent engine with security, model routing, memory,
              and tools. Swap one URL. Get everything else for free.
            </p>
            <a
              className="inline-flex items-center gap-1 font-medium text-foreground text-sm underline-offset-4 hover:underline"
              href="https://ryuhq.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn more about Ryu →
            </a>
          </div>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="mt-6 grid grid-cols-1 border-border border-t border-l border-dashed md:grid-cols-2">
          {/* Ryu App — tall left card */}
          <div className="relative col-span-1 flex flex-col space-y-2 overflow-hidden border-border border-r border-b border-dashed p-10 md:row-span-2">
            <h3 className="flex items-center gap-1.5 font-medium text-base">
              <img
                alt="Ryu"
                className="h-3.5 w-3.5 object-contain"
                src="/logos/ryu.png"
              />
              Ryu App
            </h3>
            <p className="text-muted-foreground text-sm">
              Premium desktop agent UI. Pick your engine: Claude, GPT, Gemini,
              or any local model. One interface, any backend.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-muted-foreground text-xs">
                Available on:
              </span>
              <Image
                alt="Apple macOS"
                className="h-3.5 w-auto dark:invert"
                height={14}
                src="/logos/apple.svg"
                width={14}
              />
              <Image
                alt="Microsoft Windows"
                className="h-3.5 w-auto"
                height={14}
                src="/logos/microsoft.svg"
                width={14}
              />
            </div>
            <RyuAppVisual />
          </div>

          {/* Ryu Gateway */}
          <div className="col-span-1 flex flex-col space-y-2 border-border border-r border-b border-dashed p-10">
            <h3 className="flex items-center gap-1.5 font-medium text-base">
              <img
                alt="Ryu"
                className="h-3.5 w-3.5 object-contain"
                src="/logos/ryu.png"
              />
              Ryu Gateway
            </h3>
            <p className="text-muted-foreground text-sm">
              Self-hostable AI proxy. Swap one URL and get model routing,
              logging, rate limiting, and access control. No code changes.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-muted-foreground text-xs">Works with:</span>
              <Image
                alt="Anthropic Claude"
                className="h-3.5 w-auto dark:invert"
                height={14}
                src="/logos/anthropic_black_wordmark.svg"
                width={60}
              />
              <Image
                alt="OpenAI"
                className="h-4 w-auto dark:invert"
                height={16}
                src="/logos/openai_wordmark_light.svg"
                width={66}
              />
            </div>
            <GatewayVisual />
          </div>

          {/* AI integration */}
          <div className="col-span-1 flex flex-col space-y-2 border-border border-r border-b border-dashed p-10">
            <h3 className="font-medium text-base">AI integration</h3>
            <p className="text-muted-foreground text-sm">
              Add AI capabilities to existing products. Copilots, summaries,
              semantic search, generation, and more.
            </p>
            <AIIntegrationVisual />
          </div>

          {/* Chatbots */}
          <div className="col-span-1 flex flex-col space-y-2 border-border border-r border-b border-dashed p-10">
            <h3 className="font-medium text-base">Chatbots & AI interfaces</h3>
            <p className="text-muted-foreground text-sm">
              Conversational interfaces powered by LLMs. Customer support, lead
              capture, or internal assistants.
            </p>
            <ChatbotVisual />
          </div>

          {/* Ryu agent deployments — beside Chatbots */}
          <div className="col-span-1 flex flex-col space-y-2 border-border border-r border-b border-dashed p-10">
            <h3 className="font-medium text-base">Ryu agent deployments</h3>
            <p className="text-muted-foreground text-sm">
              Production-ready AI agent infrastructure using Ryu. Security,
              routing, memory, and tools out of the box.
            </p>
            <AgentDeployVisual />
          </div>

          {/* Workflow automation */}
          <div className="col-span-1 flex flex-col space-y-2 border-border border-r border-b border-dashed p-10 md:col-span-2">
            <h3 className="font-medium text-base">Workflow automation</h3>
            <p className="text-muted-foreground text-sm">
              Replace manual processes with code. If your team is doing it by
              hand, we can automate it.
            </p>
            <WorkflowVisual />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
