"use client";

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Layers,
  Lightbulb,
  Rocket,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { StarMark } from "@/components/ui/star-mark";

// ── Visuals ──────────────────────────────────────────────────────────────────

function MvpCountdownVisual() {
  const [days, setDays] = useState(90);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let current = 90;
    const id = setInterval(() => {
      current -= 1;
      if (current < 0) current = 0;
      setDays(current);
      if (current <= 0) {
        clearInterval(id);
        setTimeout(() => {
          setDays(90);
          setTick((t) => t + 1);
        }, 1200);
      }
    }, 40);
    return () => clearInterval(id);
  }, [tick]);

  const pct = ((90 - days) / 90) * 100;

  return (
    <div className="mt-auto pt-6">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-semibold text-4xl tabular-nums leading-none tracking-tight">
          {days}
        </span>
        <span className="text-muted-foreground text-sm">days to launch</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/25">
        <div
          className="h-full rounded-full bg-primary/50 transition-all duration-75"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground/50">
        Scope → Build → Ship
      </p>
    </div>
  );
}

const IDEA_FRAMES = [
  {
    label: "napkin",
    lines: ["💡 my app idea", "users log in", "they do stuff"],
  },
  { label: "spec", lines: ["Auth flow", "Dashboard", "Notifications"] },
  { label: "wireframe", lines: ["[ Header ]", "[ Content  ]", "[ Footer  ]"] },
  {
    label: "shipped",
    lines: ["✓ Live at myapp.com", "✓ 142 signups", "✓ $0 spent on devs"],
  },
];

function FounderFlowVisual() {
  const [frame, setFrame] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setFrame((f) => (f + 1) % IDEA_FRAMES.length);
        setOpacity(1);
      }, 250);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const current = IDEA_FRAMES[frame];

  return (
    <div className="mt-auto pt-6">
      <p
        className="mb-1.5 text-[9px] text-muted-foreground/40 uppercase tracking-widest transition-opacity duration-250"
        style={{ opacity }}
      >
        {current.label}
      </p>
      <div
        className="space-y-1 rounded-md border border-border/30 bg-muted/10 px-3 py-2.5 font-mono text-[10px] transition-opacity duration-250"
        style={{ opacity }}
      >
        {current.lines.map((line, i) => (
          <div
            className={`transition-colors duration-300 ${frame === 3 ? "text-green-400/70" : "text-muted-foreground/60"}`}
            key={i}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

const TICKET_LABELS = [
  "Auth bug",
  "New feature",
  "API refactor",
  "Dashboard",
  "Mobile fix",
  "DB migration",
];

function CapacityVisual() {
  const [queue, setQueue] = useState(TICKET_LABELS.slice(0, 2));
  const [shipped, setShipped] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setQueue(TICKET_LABELS.slice(0, 2));
    setShipped([]);
    let step = 0;
    const id = setInterval(() => {
      step++;
      if (step <= 3) {
        setQueue((q) => {
          if (q.length === 0) return q;
          const [first, ...rest] = q;
          setShipped((s) => [first, ...s].slice(0, 2));
          return rest;
        });
      } else {
        clearInterval(id);
        setTimeout(() => setTick((t) => t + 1), 1000);
      }
    }, 900);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="mt-auto pt-6">
      <div className="flex h-[120px] items-start gap-3">
        <div className="flex-1">
          <p className="mb-1.5 text-[9px] text-muted-foreground/40 uppercase tracking-widest">
            Backlog
          </p>
          <div className="space-y-1">
            {queue.map((label, i) => (
              <div
                className={`truncate rounded border px-2 py-1 text-[9px] transition-all duration-400 ${
                  i === 0
                    ? "border-amber-400/30 bg-amber-400/8 text-amber-400/70"
                    : "border-border/25 text-muted-foreground/45"
                }`}
                key={label}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-1.5 text-[9px] text-primary/50 uppercase tracking-widest">
            Shipped
          </p>
          <div className="space-y-1">
            {shipped.map((label, i) => (
              <div
                className={`truncate rounded border px-2 py-1 text-[9px] transition-all duration-400 ${
                  i === 0
                    ? "border-green-500/35 bg-green-500/10 text-green-500/80"
                    : "border-green-500/15 bg-green-500/5 text-green-500/50"
                }`}
                key={label}
              >
                {label} ✓
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ORG_NODES = ["Finance", "HR", "Logistics", "Ops"];

function EnterpriseBacklogVisual() {
  const [connected, setConnected] = useState<number[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setConnected([]);
    let i = 0;
    const id = setInterval(() => {
      if (i < ORG_NODES.length) {
        setConnected((prev) => [...prev, i]);
        i++;
      } else {
        clearInterval(id);
        setTimeout(() => setTick((t) => t + 1), 1200);
      }
    }, 500);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="mt-auto pt-6">
      <div className="flex flex-col items-center gap-0">
        <div className="rounded-md border border-primary/35 bg-primary/10 px-4 py-1.5 font-medium text-[10px] text-primary/80">
          Central platform
        </div>
        <div className="flex w-full justify-around">
          {ORG_NODES.map((_, i) => (
            <div
              className={`h-5 w-px transition-all duration-400 ${connected.includes(i) ? "bg-primary/25" : "bg-transparent"}`}
              key={i}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-around">
          {ORG_NODES.map((node, i) => (
            <div
              className={`rounded border px-2 py-1 text-[9px] transition-all duration-300 ${
                connected.includes(i)
                  ? "border-border/40 bg-muted/20 text-foreground/60"
                  : "border-transparent text-transparent"
              }`}
              key={node}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const BRAND_TOKENS = [
  { brand: "Acme Corp", primary: "#3b82f6", radius: "4px", font: "Inter" },
  {
    brand: "Bloom Studio",
    primary: "#8b5cf6",
    radius: "12px",
    font: "Georgia",
  },
  { brand: "NorthEdge", primary: "#10b981", radius: "2px", font: "Mono" },
];

function AgencyVisual() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % BRAND_TOKENS.length);
        setFading(false);
      }, 300);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const token = BRAND_TOKENS[idx];

  return (
    <div className="mt-auto pt-6">
      <div
        className="overflow-hidden rounded-md border border-border/30 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="flex items-center justify-between border-border/20 border-b bg-muted/15 px-3 py-1.5">
          <span
            className="font-medium text-[10px]"
            style={{ fontFamily: token.font }}
          >
            {token.brand}
          </span>
          <div
            className="size-3 rounded-full"
            style={{
              backgroundColor: token.primary,
              borderRadius: token.radius,
            }}
          />
        </div>
        <div className="space-y-1.5 p-3">
          <div
            className="h-5 rounded"
            style={{
              backgroundColor: token.primary,
              opacity: 0.15,
              borderRadius: token.radius,
            }}
          />
          <div className="flex gap-1.5">
            <div
              className="h-6 flex-1 rounded"
              style={{
                backgroundColor: token.primary,
                opacity: 0.2,
                borderRadius: token.radius,
              }}
            />
            <div
              className="h-6 w-12 rounded border border-border/25"
              style={{ borderRadius: token.radius }}
            />
          </div>
          <p className="text-[8px] text-muted-foreground/30">
            Same codebase. Your brand.
          </p>
        </div>
      </div>
    </div>
  );
}

const CHANNEL_SEQUENCE = [
  { label: "Walk-in", icon: "🚶", value: 4, color: "text-muted-foreground/60" },
  {
    label: "Phone call",
    icon: "📞",
    value: 2,
    color: "text-muted-foreground/60",
  },
  { label: "Google search", icon: "🔍", value: 11, color: "text-green-500/80" },
  { label: "Instagram", icon: "📱", value: 8, color: "text-green-500/80" },
  { label: "Online booking", icon: "🗓️", value: 19, color: "text-green-500/80" },
];

function SmBRevenueVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [tick, setTick] = useState(0);
  const maxVal = Math.max(...CHANNEL_SEQUENCE.map((c) => c.value));

  useEffect(() => {
    setVisibleCount(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= CHANNEL_SEQUENCE.length) {
        clearInterval(id);
        setTimeout(() => setTick((t) => t + 1), 1800);
      }
    }, 400);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="mt-auto pt-6">
      <p className="mb-2 text-[9px] text-muted-foreground/40 uppercase tracking-widest">
        Where customers come from
      </p>
      <div className="h-[120px] space-y-1.5 overflow-hidden">
        {CHANNEL_SEQUENCE.slice(0, visibleCount).map((ch) => (
          <div className="flex items-center gap-2" key={ch.label}>
            <span className="w-4 text-center text-[11px]">{ch.icon}</span>
            <span className="w-24 shrink-0 text-[9px] text-muted-foreground/55">
              {ch.label}
            </span>
            <div
              className="flex-1 overflow-hidden rounded-full bg-muted/20"
              style={{ height: "5px" }}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${ch.value >= 8 ? "bg-green-500/50" : "bg-muted-foreground/25"}`}
                style={{ width: `${(ch.value / maxVal) * 100}%` }}
              />
            </div>
            <span
              className={`w-5 text-right text-[9px] tabular-nums ${ch.color}`}
            >
              {ch.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

interface Audience {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  className: string;
  visual: React.ReactNode;
}

const AUDIENCES: Audience[] = [
  {
    icon: Rocket,
    label: "Early-stage startups",
    title: "You have an idea. Let's get it in front of users.",
    description:
      "Pre-seed, pre-revenue, or pre-anything. We help you scope, build, and ship an MVP in weeks. No bloated agency, no full-time team you can't afford yet.",
    className: "md:col-span-2 flex flex-col",
    visual: <MvpCountdownVisual />,
  },
  {
    icon: Lightbulb,
    label: "Non-technical founders",
    title: "You know what to build. We know how.",
    description:
      "No engineers on your team? No problem. We translate your vision into working software and keep you in the loop in plain English. No jargon, no handoffs.",
    className: "col-span-1 flex flex-col",
    visual: <FounderFlowVisual />,
  },
  {
    icon: Users,
    label: "Scale-ups",
    title: "Growing faster than your team can handle.",
    description:
      "Your engineering team is at capacity. You need to ship more, faster. We slot in as extra bandwidth: same standards, no ramp-up time, no full-time headcount.",
    className: "col-span-1 flex flex-col",
    visual: <CapacityVisual />,
  },
  {
    icon: Building2,
    label: "Enterprises",
    title: "Internal tools, modern systems, real ROI.",
    description:
      "Legacy software slowing you down? Staff using spreadsheets where there should be dashboards? We build the internal tools and integrations your teams actually need.",
    className: "col-span-1 flex flex-col",
    visual: <EnterpriseBacklogVisual />,
  },
  {
    icon: Layers,
    label: "Agencies",
    title: "Your clients need tech. We build it under your brand.",
    description:
      "We're a white-label engineering partner for agencies who want to offer software without hiring in-house. Your name, our code. NDA-friendly, fully discreet.",
    className: "col-span-1 flex flex-col",
    visual: <AgencyVisual />,
  },
  {
    icon: ShoppingBag,
    label: "Established SMBs",
    title: "You run a real business. Time to bring it online.",
    description:
      "Restaurants, clinics, retail shops, logistics firms — businesses that have been operating offline and are ready to grow through digital. We handle the whole transition.",
    className: "md:col-span-2 flex flex-col",
    visual: <SmBRevenueVisual />,
  },
];

// ── Section ──────────────────────────────────────────────────────────────────

export default function WhoIsThisFor() {
  return (
    <section className="scroll-mt-24 pt-10 md:pt-14" id="who-is-this-for">
      <div className="mb-6 px-6">
        <h2 className="font-medium text-2xl tracking-tighter">
          Who is this for?
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-relaxed">
          We work with founders, product teams, and operators at every stage. If
          you need software built properly, quickly, and without drama, you're
          in the right place.
        </p>
      </div>

      <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed md:grid-cols-3">
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

        {AUDIENCES.map((audience) => {
          const Icon = audience.icon;
          return (
            <div
              className={[
                "group relative overflow-hidden border-border border-r border-b border-dashed p-8 transition-colors hover:bg-muted/20 md:p-10",
                audience.className,
              ].join(" ")}
              key={audience.label}
              style={{ minHeight: "280px" }}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground text-xs uppercase tracking-widest">
                  {audience.label}
                </span>
              </div>

              <h3 className="mt-4 font-medium text-base leading-snug tracking-tight">
                {audience.title}
              </h3>

              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {audience.description}
              </p>

              {audience.visual}
            </div>
          );
        })}
      </div>
    </section>
  );
}
