"use client";

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
      setDays(current);
      if (current <= 0) {
        setTimeout(() => {
          current = 90;
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

const FOUNDER_STEPS = [
  "You have an idea",
  "We scope it",
  "We build it",
  "You launch",
];

function FounderFlowVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % FOUNDER_STEPS.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto pt-6">
      <div className="space-y-1.5">
        {FOUNDER_STEPS.map((step, i) => (
          <div
            className={`flex items-center gap-2.5 rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${
              active === i
                ? "border-primary/30 bg-primary/8 text-foreground/80"
                : i < active
                  ? "border-border/20 text-muted-foreground/40 line-through"
                  : "border-border/20 text-muted-foreground/40"
            }`}
            key={step}
          >
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-full font-medium text-[9px] transition-all duration-300 ${
                active === i
                  ? "bg-primary/20 text-primary/80"
                  : i < active
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted/30 text-muted-foreground/40"
              }`}
            >
              {i < active ? "✓" : i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

const CAPACITY_ROWS = [
  { label: "Engineering", used: 8, total: 8 },
  { label: "Design", used: 3, total: 3 },
  { label: "DevOps", used: 2, total: 2 },
];

function CapacityVisual() {
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setOverflow((prev) => !prev);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto pt-6">
      <p className="mb-2 text-[9px] text-muted-foreground/45 uppercase tracking-widest">
        Team capacity
      </p>
      <div className="space-y-1.5">
        {CAPACITY_ROWS.map((row) => (
          <div key={row.label}>
            <div className="mb-0.5 flex items-center justify-between text-[9px]">
              <span className="text-muted-foreground/60">{row.label}</span>
              <span
                className={`tabular-nums transition-colors duration-300 ${overflow ? "text-red-400/70" : "text-muted-foreground/50"}`}
              >
                {overflow
                  ? `${row.used}/${row.total} full`
                  : `${row.used}/${row.total}`}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/20">
              <div
                className={`h-full rounded-full transition-all duration-500 ${overflow ? "bg-red-400/50" : "bg-primary/40"}`}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
      {overflow && (
        <p className="mt-2 text-[9px] text-primary/60 transition-all duration-300">
          + A Major steps in
        </p>
      )}
    </div>
  );
}

const ENTERPRISE_ITEMS = [
  { label: "Legacy ERP → Modern API", done: true },
  { label: "Staff portal", done: true },
  { label: "Analytics dashboard", done: false },
  { label: "Audit trail system", done: false },
];

function EnterpriseBacklogVisual() {
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) =>
        prev + 1 > ENTERPRISE_ITEMS.length - 1 ? 2 : prev + 1
      );
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto pt-6">
      <div className="space-y-1.5">
        {ENTERPRISE_ITEMS.map((item, i) => (
          <div
            className={`flex items-center gap-2.5 rounded border px-2.5 py-1.5 text-[10px] transition-all duration-300 ${
              item.done
                ? "border-border/20 text-muted-foreground/40 line-through"
                : activeIdx === i
                  ? "border-primary/30 bg-primary/8 text-foreground/75"
                  : "border-border/25 text-muted-foreground/55"
            }`}
            key={item.label}
          >
            <span
              className={`flex size-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 ${
                item.done
                  ? "border-green-500/40 bg-green-500/15 text-green-500"
                  : activeIdx === i
                    ? "border-primary/40 bg-primary/10"
                    : "border-border/30"
              }`}
            >
              {item.done && (
                <svg className="size-2" fill="none" viewBox="0 0 8 8">
                  <path
                    d="M1 4l2 2 4-4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const AGENCY_CLIENTS = [
  { name: "Client A", color: "bg-blue-500" },
  { name: "Client B", color: "bg-violet-500" },
  { name: "Client C", color: "bg-emerald-500" },
];

function AgencyVisual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % AGENCY_CLIENTS.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto pt-6">
      <p className="mb-2 text-[9px] text-muted-foreground/45 uppercase tracking-widest">
        Your clients, our tech
      </p>
      <div className="space-y-1.5">
        {AGENCY_CLIENTS.map((client, i) => (
          <div
            className={`flex items-center gap-3 rounded-md border px-3 py-1.5 transition-all duration-300 ${
              activeIdx === i
                ? "border-border/40 bg-muted/15"
                : "border-border/20 bg-transparent"
            }`}
            key={client.name}
          >
            <div
              className={`size-3 rounded-full ${client.color} transition-opacity duration-300 ${activeIdx === i ? "opacity-100" : "opacity-40"}`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                activeIdx === i ? `${client.color}/30` : "bg-muted/15"
              }`}
              style={{
                backgroundColor: activeIdx === i ? undefined : undefined,
              }}
            >
              <div
                className={`h-full rounded-full ${client.color} transition-opacity duration-300 ${activeIdx === i ? "opacity-30" : "opacity-15"}`}
              />
            </div>
            <span className="text-[9px] text-muted-foreground/50">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmBRevenueVisual() {
  const [online, setOnline] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step++;
      setOnline(Math.min(Math.round((step / 50) * 100), 100));
      if (step >= 50) {
        setTimeout(() => {
          step = 0;
          setOnline(0);
          setTick((t) => t + 1);
        }, 1500);
      }
    }, 60);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="mt-auto pt-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5 rounded-md border border-border/25 p-3">
          <p className="text-[9px] text-muted-foreground/45 uppercase tracking-widest">
            Walk-ins
          </p>
          <p className="font-semibold text-xl tabular-nums leading-none">
            12
            <span className="font-normal text-muted-foreground/50 text-sm">
              /day
            </span>
          </p>
          <div className="h-1 w-full rounded-full bg-muted/20">
            <div
              className="h-full rounded-full bg-muted-foreground/20"
              style={{ width: "20%" }}
            />
          </div>
        </div>
        <div className="space-y-1.5 rounded-md border border-green-500/25 bg-green-500/5 p-3">
          <p className="text-[9px] text-green-500/60 uppercase tracking-widest">
            Online
          </p>
          <p className="font-semibold text-green-500 text-xl tabular-nums leading-none">
            {online}
            <span className="font-normal text-green-500/50 text-sm">/day</span>
          </p>
          <div className="h-1 w-full rounded-full bg-green-500/15">
            <div
              className="h-full rounded-full bg-green-500/50 transition-all duration-75"
              style={{ width: `${online}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

interface Audience {
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  className: string;
  visual: React.ReactNode;
  tag?: string;
}

const AUDIENCES: Audience[] = [
  {
    icon: Rocket,
    label: "Early-stage startups",
    title: "You have an idea. Let's get it in front of users.",
    description:
      "Pre-seed, pre-revenue, or pre-anything. We help you scope, build, and ship an MVP in weeks — without burning your runway on a bloated agency or a full-time team you can't afford yet.",
    className: "md:col-span-2 flex flex-col",
    visual: <MvpCountdownVisual />,
    tag: "MVP in weeks",
  },
  {
    icon: Lightbulb,
    label: "Non-technical founders",
    title: "You know what to build. We know how.",
    description:
      "No engineers on your team? No problem. We translate your vision into working software and keep you in the loop in plain English — no jargon, no handoffs.",
    className: "col-span-1 flex flex-col",
    visual: <FounderFlowVisual />,
    tag: "No tech team needed",
  },
  {
    icon: Users,
    label: "Scale-ups",
    title: "Growing faster than your team can handle.",
    description:
      "Your engineering team is at capacity. You need to ship more, faster. We slot in as extra bandwidth — same standards, no ramp-up time, no full-time headcount.",
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
      "We're a white-label engineering partner for agencies who want to offer software without hiring in-house. Your name, our code. NDA-friendly and fully discreet.",
    className: "col-span-1 flex flex-col",
    visual: <AgencyVisual />,
    tag: "White-label",
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
    <section
      className="scroll-mt-24 pt-10 pb-16 md:pt-14 md:pb-20"
      id="who-is-this-for"
    >
      <div className="mb-6 px-6">
        <h2 className="font-medium text-2xl tracking-tighter">
          Who is this for?
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-relaxed">
          We work with founders, product teams, and operators at every stage. If
          you need software built properly, quickly, and without drama — you're
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
                {audience.tag && (
                  <span className="ml-auto rounded-full border border-primary/25 bg-primary/8 px-2 py-0.5 text-[10px] text-primary/70">
                    {audience.tag}
                  </span>
                )}
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
