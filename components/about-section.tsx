"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";

// ── 1. Live activity feed ─────────────────────────────────────────────────────

const FEED_ITEMS = [
  {
    tag: "shipped",
    label: "User auth",
    detail: "deployed to prod",
    color: "bg-green-500/20 text-green-500",
  },
  {
    tag: "live",
    label: "iOS app",
    detail: "App Store approved",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    tag: "merged",
    label: "API v2",
    detail: "zero downtime migration",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    tag: "shipped",
    label: "Dashboard",
    detail: "client signed off",
    color: "bg-green-500/20 text-green-500",
  },
  {
    tag: "live",
    label: "AI agent",
    detail: "42ms avg latency",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    tag: "merged",
    label: "Extension",
    detail: "Chrome Store live",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    tag: "shipped",
    label: "Ryu gateway",
    detail: "routing 3 models",
    color: "bg-green-500/20 text-green-500",
  },
  {
    tag: "live",
    label: "SaaS backend",
    detail: "serving 2k users",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    tag: "merged",
    label: "Handover docs",
    detail: "delivered + reviewed",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    tag: "shipped",
    label: "Payments",
    detail: "Stripe integration",
    color: "bg-green-500/20 text-green-500",
  },
];

const ITEM_H = 36; // px
const VISIBLE = 5;

function ActivityFeed() {
  const posRef = useRef(0);
  const [pos, setPos] = useState(0);
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      posRef.current += ITEM_H;

      // Reset silently when we've scrolled one full set
      if (posRef.current >= FEED_ITEMS.length * ITEM_H) {
        setTimeout(() => {
          setTransitioning(false);
          posRef.current = 0;
          setPos(0);
        }, 500);
      } else {
        setPos(posRef.current);
      }
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const doubled = [...FEED_ITEMS, ...FEED_ITEMS];

  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ height: ITEM_H * VISIBLE }}
    >
      <div
        style={{
          transform: `translateY(-${pos}px)`,
          transition: transitioning
            ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
            : "none",
        }}
      >
        {doubled.map((item, i) => (
          <div
            className="flex items-center gap-2.5 py-1"
            key={i}
            style={{ height: ITEM_H }}
          >
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 font-medium text-[8px] uppercase tracking-wide ${item.color}`}
            >
              {item.tag}
            </span>
            <span className="font-medium text-[11px] text-foreground/70">
              {item.label}
            </span>
            <span className="truncate text-[10px] text-muted-foreground/45">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 5. Architecture diagram ────────────────────────────────────────────────────

const LAYERS = [
  {
    label: "Client App",
    sub: "Web · Mobile · Extension",
    color: "border-blue-500/30 bg-blue-500/5",
  },
  {
    label: "API Layer",
    sub: "REST · GraphQL · WebSocket",
    color: "border-violet-500/30 bg-violet-500/5",
  },
  {
    label: "Database",
    sub: "PostgreSQL · Redis · S3",
    color: "border-amber-500/30 bg-amber-500/5",
  },
  {
    label: "Cloud Infra",
    sub: "AWS · Vercel · Docker",
    color: "border-green-500/30 bg-green-500/5",
  },
];

function FlowDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-6 items-center justify-center">
      <div className="absolute inset-x-0 flex justify-center">
        <div className="h-6 w-px bg-border/40" />
      </div>
      <div
        className="relative z-10 size-1.5 rounded-full transition-all duration-300"
        style={{
          background: active
            ? "hsl(var(--primary))"
            : "hsl(var(--border) / 0.4)",
          boxShadow: active ? "0 0 6px hsl(var(--primary) / 0.5)" : "none",
        }}
      />
    </div>
  );
}

function ArchDiagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % LAYERS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-0">
      {LAYERS.map((layer, i) => (
        <div key={layer.label}>
          <div
            className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-400 ${layer.color} ${
              active === i ? "opacity-100" : "opacity-50"
            }`}
          >
            <span className="font-medium text-[11px]">{layer.label}</span>
            <span className="text-[9px] text-muted-foreground/50">
              {layer.sub}
            </span>
          </div>
          {i < LAYERS.length - 1 && <FlowDot active={active === i} />}
        </div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ContentSection() {
  return (
    <section className="relative scroll-mt-24 pt-10 md:pt-14" id="about">
      <StarMark
        style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
      />
      <StarMark
        style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="relative z-10 font-medium text-2xl tracking-tighter">
            Who we are
          </h2>
        </FadeIn>
      </div>

      <FadeIn delay={0.2} duration={0.5}>
        <div className="relative mt-6 grid grid-cols-1 border-border border-t border-l border-dashed md:grid-cols-2">
          {/* Description */}
          <div className="col-span-1 space-y-4 border-border border-r border-b border-dashed p-6 md:col-span-2 md:p-10">
            <p className="text-muted-foreground">
              A Major is a Singapore-based software agency. We build websites,
              mobile and desktop apps, browser extensions, and enterprise
              systems and stay directly involved from the first conversation to
              launch day. If it runs on a screen, we can build it.
            </p>
            <p className="text-muted-foreground">
              We&apos;re also the team behind{" "}
              <a
                className="inline-flex items-center gap-1 font-semibold text-accent-foreground underline-offset-2 hover:underline"
                href="/products/ryu"
              >
                <img
                  alt="Ryu"
                  className="inline-block h-3.5 w-3.5 object-contain"
                  src="/logos/ryu.png"
                />
                Ryu
              </a>
              , end-to-end managed infrastructure for AI agents. Pick your
              engine (Hermes, OpenClaw, ZeroClaw, or any compatible agent) and
              Ryu handles everything around it.
            </p>
          </div>

          {/* Activity feed */}
          <div className="col-span-1 border-border border-r border-b border-dashed p-6 md:p-10">
            <p className="mb-3 text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              Live activity
            </p>
            <ActivityFeed />
          </div>

          {/* Architecture diagram */}
          <div className="col-span-1 border-border border-r border-b border-dashed p-6 md:p-10">
            <p className="mb-3 text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              How we ship
            </p>
            <ArchDiagram />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
