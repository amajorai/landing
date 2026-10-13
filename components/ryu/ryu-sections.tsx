"use client";

import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bell,
  Blocks,
  Box,
  Building2,
  Check,
  Cloud,
  ExternalLink,
  Fingerprint,
  Gauge,
  Mail,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CrossMark } from "@/components/ui/cross-mark";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";
import { RYU_STATUS, RYU_URL } from "@/lib/ryu";

function Stars() {
  return (
    <>
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
    </>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 px-6">
      <FadeIn duration={0.4}>
        <h2 className="font-medium text-2xl tracking-tighter">{title}</h2>
        {description && (
          <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

// ── Get started ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "01",
    title: "Start from a working agent",
    description:
      "Ryu runs on open-source infrastructure, so your agent gets a runtime, memory and hosting from day one. Bring your own agent or start from one that already works.",
    tags: ["Open source", "Runs 24/7", "Cloud or self-hosted"],
  },
  {
    step: "02",
    title: "Plug in the tools it needs",
    description:
      "Add tools with plugins instead of writing integrations. Connect Gmail, Slack, Notion, GitHub and more, and choose exactly what each agent is allowed to do with them.",
    tags: ["Plugins", "Access rules", "Approvals"],
  },
  {
    step: "03",
    title: "Ship it as an app",
    description:
      "Turn your agent into an app your team or customers can use, then watch every run as it happens and step in when something needs a human.",
    tags: ["Agentic apps", "Run history", "Alerts"],
  },
];

export function RyuGetStarted() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden pt-10 md:pt-14"
      id="get-started"
    >
      <SectionHeading
        description="From an empty project to an agent your team relies on, in three steps."
        title="Get started without building from scratch"
      />
      <FadeIn duration={0.4}>
        <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
          <Stars />
          <CrossMark
            className="hidden md:block"
            style={{
              bottom: 0,
              left: "33.333%",
              transform: "translate(-50%, 50%)",
            }}
          />
          <CrossMark
            className="hidden md:block"
            style={{
              bottom: 0,
              left: "66.667%",
              transform: "translate(-50%, 50%)",
            }}
          />
          {STEPS.map((step, index) => (
            <div
              className={[
                "flex flex-col space-y-3 border-border border-r border-b border-dashed p-6 md:border-b-0",
                index === STEPS.length - 1 ? "md:border-r-0" : "",
              ].join(" ")}
              key={step.step}
            >
              <span className="font-mono text-muted-foreground/50 text-xs">
                {step.step}
              </span>
              <h3 className="font-medium text-base">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {step.tags.map((tag) => (
                  <span
                    className="rounded bg-muted/30 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/70"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Platform ─────────────────────────────────────────────────────────────────

const PLATFORM: {
  name: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Ryu Cloud",
    description: "Deploy agents and keep them running 24/7.",
    icon: Cloud,
  },
  {
    name: "Ryu Connect",
    description: "Plugins that give agents access to the tools they need.",
    icon: Blocks,
  },
  {
    name: "Ryu Gateway",
    description: "Access rules and approvals before agents act.",
    icon: ShieldCheck,
  },
  {
    name: "Ryu Console",
    description: "One place to see every agent and every run.",
    icon: Gauge,
  },
  {
    name: "Ryu Apps",
    description: "Turn agents into apps: sites, inboxes, boards and docs.",
    icon: AppWindow,
  },
  {
    name: "Ryu Passport",
    description: "A verified identity for each of your agents.",
    icon: Fingerprint,
  },
  {
    name: "Ryu Box",
    description: "Workspaces where agents build and preview their work.",
    icon: Box,
  },
  {
    name: "Ryu Mail",
    description: "An inbox your agents can send and receive from.",
    icon: Mail,
  },
  {
    name: "Ryu Notify",
    description: "Events and alerts when runs finish or need you.",
    icon: Bell,
  },
];

export function RyuPlatform() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden pt-10 md:pt-14"
      id="platform"
    >
      <SectionHeading
        description="Everything an agent needs to run in production, managed for you."
        title="One platform, every piece"
      />
      <FadeIn duration={0.4}>
        <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 md:grid-cols-3">
          <Stars />
          {PLATFORM.map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="group flex flex-col gap-2 border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/20"
                key={item.name}
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-md border border-border/50 bg-muted/20">
                    <Icon className="size-3.5 text-muted-foreground transition-colors group-hover:text-amber-500" />
                  </span>
                  <h3 className="font-medium text-sm">{item.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Who it's for ─────────────────────────────────────────────────────────────

const AUDIENCES: {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
}[] = [
  {
    label: "Teams",
    title: "Put agents to work without running servers",
    description:
      "Hand repetitive work to agents that run around the clock, with the tools and rules your team already uses.",
    icon: Building2,
    examples: ["Inbox triage", "Standup summaries", "CRM updates"],
  },
  {
    label: "Builders",
    title: "Ship agent products, not infrastructure",
    description:
      "Skip the plumbing. Start on open-source infrastructure, add plugins, and turn your agent into an app people can use.",
    icon: Wrench,
    examples: ["Customer-facing apps", "Internal tools", "Agent templates"],
  },
  {
    label: "Operators",
    title: "Know what every agent did, and why",
    description:
      "Monitor every run, set what each agent can access, and require approval before anything sensitive happens.",
    icon: Rocket,
    examples: ["Run history", "Access rules", "Approvals"],
  },
];

export function RyuWhoFor() {
  return (
    <section className="scroll-mt-24 pt-10 md:pt-14" id="who-is-this-for">
      <SectionHeading
        description="If you want agents doing real work without building the platform underneath them, Ryu is for you."
        title="Who is Ryu for?"
      />
      <FadeIn duration={0.4}>
        <div className="relative grid grid-cols-1 border-border border-t border-l border-dashed md:grid-cols-3">
          <Stars />
          {AUDIENCES.map((audience) => {
            const Icon = audience.icon;
            return (
              <div
                className="group relative flex flex-col overflow-hidden border-border border-r border-b border-dashed p-8 transition-colors hover:bg-muted/20 md:p-10"
                key={audience.label}
                style={{ minHeight: "260px" }}
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
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {audience.examples.map((example) => (
                    <span
                      className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground/80"
                      key={example}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Why Ryu ──────────────────────────────────────────────────────────────────

const PERKS = [
  "Built on open-source infrastructure",
  "Agents run 24/7 in the cloud",
  "Cloud, self-hosted or team setups",
  "Plugins for the tools you already use",
  "Approval before sensitive actions",
  "Every run monitored and logged",
  "A verified identity for every agent",
  "Turn any agent into an app",
];

const PERK_H = 52;
const PERK_VISIBLE = 5;

function AutoScrollPerks() {
  const posRef = useRef(0);
  const [pos, setPos] = useState(0);
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      posRef.current += PERK_H;
      if (posRef.current >= PERKS.length * PERK_H) {
        setTimeout(() => {
          setTransitioning(false);
          posRef.current = 0;
          setPos(0);
        }, 500);
      } else {
        setPos(posRef.current);
      }
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden" style={{ height: PERK_H * PERK_VISIBLE }}>
      <div
        style={{
          transform: `translateY(-${pos}px)`,
          transition: transitioning
            ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
            : "none",
        }}
      >
        {[...PERKS, ...PERKS].map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list is duplicated for looping
          <div className="pb-2" key={i} style={{ height: PERK_H }}>
            <div className="flex h-full items-center gap-3 rounded-lg border border-border/40 bg-muted/10 px-4">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-400/15">
                <Check className="size-3 text-amber-500" strokeWidth={3} />
              </span>
              <p className="text-sm">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RyuWhy() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden pt-10 md:pt-14"
      id="why-ryu"
    >
      <DotGridBackground
        className="text-zinc-950 opacity-[0.04] dark:text-white dark:opacity-[0.07]"
        fade="none"
        spacing={48}
        variant="grid"
      />
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <div className="relative z-10 max-w-xl space-y-3">
          <h2 className="font-medium text-2xl tracking-tighter">Why Ryu</h2>
          <p className="text-muted-foreground">
            Most AI agents never make it past the demo. The agent itself is
            rarely the problem. Everything around it is: hosting, tools,
            permissions, and knowing what it actually did.
          </p>
          <p className="text-muted-foreground">
            Ryu is that layer, managed for you, so your agents can do real work.
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">
        <Stars />
        <div className="border-border border-b border-dashed md:border-r md:border-b-0">
          <div className="grid grid-cols-2">
            {[
              ["Without Ryu", "Glue code, cron jobs, API keys everywhere"],
              ["With Ryu", "Plugins, managed runtime, scoped access"],
            ].map(([label, text], i) => (
              <div
                className={`space-y-2 border-border border-b border-dashed p-6 ${i === 0 ? "border-r" : ""}`}
                key={label}
              >
                <p
                  className={`font-medium text-xs uppercase tracking-widest ${i === 0 ? "text-muted-foreground/50 line-through" : "text-amber-500"}`}
                >
                  {label}
                </p>
                <p className="text-muted-foreground text-sm">{text}</p>
              </div>
            ))}
          </div>
          <div className="p-6">
            <blockquote className="space-y-3 border-amber-400/60 border-l-4 pl-4">
              <p className="text-muted-foreground text-sm">
                Most AI agents didn&apos;t deliver. We build the ones that do.
              </p>
            </blockquote>
            <cite className="mt-3 block pl-4 font-medium text-sm not-italic">
              A Major
            </cite>
          </div>
        </div>

        <div className="p-6">
          <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
            What you get
          </p>
          <AutoScrollPerks />
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    id: "what",
    question: "What is Ryu?",
    answer:
      "Ryu is a managed platform for AI agents, built on open-source infrastructure. It hosts your agents, connects them to tools through plugins, turns them into apps, and lets you monitor every run and control what they can access.",
  },
  {
    id: "scratch",
    question: "Do I need to build my own agent first?",
    answer:
      "No. Ryu is built so you can start without building from scratch. Bring an agent you already have, or start from one that works and customise it.",
  },
  {
    id: "tools",
    question: "Which tools can my agents use?",
    answer:
      "Agents get tools through plugins, such as Gmail, Slack, Notion and GitHub. You choose which plugins each agent has and what it is allowed to do with them.",
  },
  {
    id: "control",
    question: "How do I stay in control of what agents do?",
    answer:
      "Every run is monitored, so you can see what an agent did step by step. Access rules limit what each agent can reach, and sensitive actions can require your approval before they happen.",
  },
  {
    id: "hosting",
    question: "Where do my agents run?",
    answer:
      "In Ryu Cloud, where they keep running 24/7. Teams that need it can also run parts of Ryu self-hosted.",
  },
  {
    id: "preview",
    question: `What does "${RYU_STATUS}" mean?`,
    answer:
      "Ryu is available to use today while we keep building it in the open. Expect new plugins and features often, and some things to change as we learn from early users.",
  },
  {
    id: "start",
    question: "How do I get started?",
    answer: "Head to ryuhq.com to download Ryu or have us set it up for you.",
  },
];

export function RyuFaq() {
  return (
    <section className="scroll-mt-24 pt-10 md:pt-14" id="faq">
      <div className="mx-auto mb-2 max-w-5xl px-6">
        <h2 className="font-medium text-2xl tracking-tighter">
          Questions about Ryu
        </h2>
      </div>
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <p className="text-muted-foreground text-sm">
          Something else?{" "}
          <a
            className="font-medium text-primary hover:underline"
            href="mailto:contact@amajor.ai"
          >
            Email us at contact@amajor.ai
          </a>
          .
        </p>
      </div>
      <div className="relative border-border border-y border-dashed">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Accordion className="w-full" collapsible type="single">
            {FAQ.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  className="peer border-none px-0 py-1"
                  value={item.id}
                >
                  <AccordionTrigger className="cursor-pointer font-semibold text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────

export function RyuCta() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden py-20"
      id="contact"
    >
      <Stars />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-amber-500),var(--color-white)_100%)] dark:opacity-100"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-medium text-2xl tracking-tighter">
          Put your first agent to work.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start without building from scratch. Ryu is in{" "}
          {RYU_STATUS.toLowerCase()}.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild className="rounded-full">
            <a href={RYU_URL} rel="noopener noreferrer" target="_blank">
              Get started at ryuhq.com
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
