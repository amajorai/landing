"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FuzzyText from "@/components/reactbits/fuzzy-text";
import SilkDynamic from "@/components/silk-dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CornerMark } from "@/components/ui/corner-mark";
import { CrossMark } from "@/components/ui/cross-mark";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { StarMark } from "@/components/ui/star-mark";

// ── Step 1: Refer visual ─────────────────────────────────────────────────────

const FORM_FIELDS = [
  { label: "Their name", value: "Sarah Chen" },
  { label: "Company", value: "Acme Pte Ltd" },
  { label: "What they need", value: "Mobile app" },
];

function ReferVisual() {
  const [visible, setVisible] = useState(0);
  const [filled, setFilled] = useState<boolean[]>([false, false, false]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    FORM_FIELDS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), delay));
      delay += 600;
    });

    FORM_FIELDS.forEach((_, i) => {
      timers.push(
        setTimeout(
          () =>
            setFilled((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            }),
          delay + i * 350
        )
      );
    });
    delay += FORM_FIELDS.length * 350;

    timers.push(
      setTimeout(() => {
        setVisible(0);
        setFilled([false, false, false]);
        setTick((t) => t + 1);
      }, delay + 1600)
    );

    return () => timers.forEach(clearTimeout);
  }, [tick]);

  return (
    <div className="mt-auto space-y-2 pt-5">
      {FORM_FIELDS.map((field, i) => (
        <div
          key={field.label}
          style={{
            opacity: i < visible ? 1 : 0,
            transform: i < visible ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <p className="mb-0.5 text-[9px] text-muted-foreground/40 uppercase tracking-wider">
            {field.label}
          </p>
          <div className="rounded border border-muted-foreground/20 bg-muted/10 px-2.5 py-1.5">
            <span
              className="text-[11px] transition-colors duration-300"
              style={{
                color: filled[i]
                  ? "hsl(var(--muted-foreground) / 0.8)"
                  : "hsl(var(--muted-foreground) / 0.4)",
              }}
            >
              {filled[i] ? field.value : "···"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Step 2: We close visual ──────────────────────────────────────────────────

type ClosePhase = "idle" | "intro" | "scoping" | "proposal" | "signed";

function WeCloseVisual() {
  const [phase, setPhase] = useState<ClosePhase>("idle");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const seq: Array<[ClosePhase, number]> = [
      ["intro", 0],
      ["scoping", 1300],
      ["proposal", 2500],
      ["signed", 3700],
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
    key: ClosePhase;
    active: boolean;
    done: boolean;
  }> = [
    {
      label: "Intro sent",
      key: "intro",
      active: phase === "intro",
      done: ["scoping", "proposal", "signed"].includes(phase),
    },
    {
      label: "Scoping",
      key: "scoping",
      active: phase === "scoping",
      done: ["proposal", "signed"].includes(phase),
    },
    {
      label: "Proposal sent",
      key: "proposal",
      active: phase === "proposal",
      done: phase === "signed",
    },
    { label: "Signed", key: "signed", active: phase === "signed", done: false },
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
                  ? "animate-pulse bg-primary/70"
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
          {s.key === "signed" && s.active && (
            <span className="ml-auto animate-pulse font-mono text-[9px] text-green-500/80">
              ✓ deal closed
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Step 3: Get paid visual ──────────────────────────────────────────────────

function GetPaidVisual() {
  const [projectValue, setProjectValue] = useState(0);
  const [commission, setCommission] = useState(0);
  const [paid, setPaid] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const target = 8000;
    let start: number | null = null;
    let raf: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1200, 1);
      const eased = 1 - (1 - progress) ** 3;
      const val = Math.round(eased * target);
      setProjectValue(val);
      setCommission(Math.round(val * 0.05));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setPaid(true), 400);
        setTimeout(() => {
          setProjectValue(0);
          setCommission(0);
          setPaid(false);
          setTick((t) => t + 1);
        }, 3000);
      }
    };

    const delay = setTimeout(() => {
      raf = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [tick]);

  return (
    <div className="mt-auto space-y-3 pt-5">
      <div className="space-y-1">
        <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">
          Project value
        </p>
        <p className="font-mono text-foreground/70 text-sm">
          ${projectValue.toLocaleString()}
        </p>
      </div>
      <div className="h-px w-full bg-border/30" />
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">
            Your 5%
          </p>
          <p
            className="font-mono font-semibold text-base transition-colors duration-500"
            style={{
              color: paid
                ? "hsl(var(--primary))"
                : "hsl(var(--foreground) / 0.7)",
            }}
          >
            ${commission.toLocaleString()}
          </p>
        </div>
        {paid && (
          <span className="animate-pulse font-mono text-[9px] text-green-500/80">
            transfer sent
          </span>
        )}
      </div>
    </div>
  );
}

// ── Steps config ─────────────────────────────────────────────────────────────

const steps = [
  {
    title: "Refer",
    description:
      "Know someone with a project? Send us their name and a brief description of what they need. That's it.",
    visual: <ReferVisual />,
  },
  {
    title: "We close",
    description:
      "We reach out, scope the project, and handle everything from there. You stay in the loop but don't need to do anything else.",
    visual: <WeCloseVisual />,
  },
  {
    title: "Get paid",
    description:
      "Once the project is completed and paid, we bank transfer you 5% of the total project value. No invoicing needed.",
    visual: <GetPaidVisual />,
  },
];

// ── Animated list ────────────────────────────────────────────────────────────

function AnimatedList({
  items,
  dotClass = "bg-muted-foreground/40",
  textClass = "text-foreground text-sm",
  delay: startDelay = 0,
}: {
  items: string[];
  dotClass?: string;
  textClass?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    items.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), startDelay + i * 180));
    });
    timers.push(
      setTimeout(
        () => {
          setVisible(0);
          setTick((t) => t + 1);
        },
        startDelay + items.length * 180 + 2400
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [tick, items, startDelay]);

  return (
    <ul className="space-y-2" ref={ref}>
      {items.map((item, i) => (
        <li
          className={`flex items-center gap-2 ${textClass}`}
          key={item}
          style={{
            opacity: i < visible ? 1 : 0,
            transform: i < visible ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <span className={`size-1 shrink-0 rounded-full ${dotClass}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Details ──────────────────────────────────────────────────────────────────

const details = [
  { label: "Commission", value: "5%", sub: "of total project cost" },
  {
    label: "When paid",
    value: "On completion",
    sub: "after project is delivered & paid",
  },
  {
    label: "Payment method",
    value: "Bank transfer",
    sub: "SGD or equivalent currency",
  },
  {
    label: "Who can refer",
    value: "Anyone",
    sub: "no contract or agreement needed",
  },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────

const faqItems = [
  {
    id: "item-1",
    question: "Who can submit a referral?",
    answer:
      "Anyone. You don't need to be a client, partner, or have any formal agreement with us. If you know someone who needs software built, send them our way.",
  },
  {
    id: "item-2",
    question: "How is the 5% calculated?",
    answer:
      "It's 5% of the total fixed project cost agreed between us and your referred client. If a project is $10,000, you receive $500 once it's complete.",
  },
  {
    id: "item-3",
    question: "When exactly do I get paid?",
    answer:
      "After the project is delivered and the final payment from your referred client is received. We'll notify you and process the bank transfer within 5 business days.",
  },
  {
    id: "item-4",
    question: "What if the referred person doesn't convert immediately?",
    answer:
      "If they sign within 6 months of your referral, the commission still applies. We track referrals by name and email so there's no ambiguity.",
  },
  {
    id: "item-5",
    question: "Do I need to be involved after making the referral?",
    answer:
      "No. Once you've made the introduction, we handle everything. You only hear from us again when it's time to pay you.",
  },
  {
    id: "item-6",
    question: "Is there a limit to how many referrals I can make?",
    answer:
      "No limit. Refer as many people as you like. Each qualifying project earns a separate commission.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReferralContent() {
  const handleReferral = () => {
    window.location.href =
      "mailto:contact@amajor.ai?subject=Referral&body=Name%20of%20referral%3A%0ACompany%20(if%20any)%3A%0AWhat%20they%20need%3A%0AYour%20name%20%26%20contact%3A";
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div>
        <FadeIn>
          <main className="relative pt-6 lg:pt-20">
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
            <section className="relative overflow-hidden bg-white dark:bg-transparent">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{ zIndex: 0, opacity: 0.18 }}
              >
                <SilkDynamic
                  color="#9B8EC4"
                  noiseIntensity={1.2}
                  rotation={0}
                  scale={1.2}
                  speed={3}
                />
              </div>
              <DotGridBackground
                className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.04]"
                dotRadius={1}
                spacing={28}
              />
              <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-14">
                <div className="relative z-10 mx-auto">
                  <FadeIn direction="down" duration={0.6}>
                    <PageHeader
                      eyebrow="Referral Program"
                      line1="Don't have a project?"
                      line2="Know someone who will?"
                    />
                  </FadeIn>

                  <FadeIn delay={0.3} duration={0.5}>
                    <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                      Refer a client to us and earn 5% of the total project cost
                      when it completes. No contracts, no complexity. Just a
                      bank transfer.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.4} duration={0.5}>
                    <div className="mt-8 flex items-center gap-4">
                      <Button
                        className="!py-0 !h-9 rounded-full px-4"
                        onClick={handleReferral}
                        size="lg"
                      >
                        <span className="btn-label">Submit a Referral</span>
                      </Button>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Commission callout strip */}
            <section className="relative bg-background">
              <FadeIn delay={0.5} duration={0.5}>
                <div className="relative border-border border-t border-dashed">
                  <CornerMark corner="tl" size={10} />
                  <CornerMark corner="tr" size={10} />
                  <div className="relative grid grid-cols-2 border-border border-t border-l border-dashed md:grid-cols-4">
                    <CornerMark corner="bl" size={10} />
                    <CornerMark corner="br" size={10} />
                    {details.map((d, i) => (
                      <div
                        className="border-border border-r border-b border-dashed p-5"
                        key={i}
                      >
                        <p className="mb-1 font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
                          {d.label}
                        </p>
                        <p className="font-medium text-lg tracking-tight">
                          {d.value}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                          {d.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </section>
          </main>
        </FadeIn>
      </div>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <FadeIn>
        <section
          className="relative scroll-mt-24 overflow-hidden pt-10 md:pt-14"
          id="how-it-works"
        >
          <div className="mb-6 px-6">
            <FadeIn duration={0.4}>
              <h2 className="font-medium text-2xl tracking-tighter">
                How it works
              </h2>
            </FadeIn>
          </div>

          <FadeIn duration={0.4}>
            <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
              <StarMark
                style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
              />
              <StarMark
                style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
              />
              <StarMark
                style={{
                  bottom: 0,
                  left: 0,
                  transform: "translate(-50%, 50%)",
                }}
              />
              <StarMark
                style={{
                  bottom: 0,
                  right: 0,
                  transform: "translate(50%, 50%)",
                }}
              />
              {/* Column divider crosses */}
              <div
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "33.333%",
                  transform: "translate(-50%, 0)",
                  width: 24,
                  height: 13,
                  overflow: "hidden",
                }}
              >
                <CrossMark style={{ top: -11, left: 0 }} />
              </div>
              <div
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "66.667%",
                  transform: "translate(-50%, 0)",
                  width: 24,
                  height: 13,
                  overflow: "hidden",
                }}
              >
                <CrossMark style={{ top: -11, left: 0 }} />
              </div>
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
      </FadeIn>

      {/* ── What qualifies ───────────────────────────────────────────────── */}
      <FadeIn>
        <section className="relative scroll-mt-24 overflow-hidden pt-10 md:pt-14">
          <div className="mx-auto mb-6 max-w-5xl px-6">
            <div className="relative z-10 max-w-xl space-y-3">
              <h2 className="font-medium text-2xl tracking-tighter">
                What qualifies
              </h2>
              <p className="text-muted-foreground text-sm">
                Any project we accept through our normal intake: websites, web
                apps, mobile apps, SaaS products, enterprise systems, or
                engineering consultancy. There is no minimum project size,
                though most projects start from a few thousand dollars.
              </p>
              <p className="text-muted-foreground text-sm">
                The only requirement is that your referred contact becomes a
                paying client and the project is delivered. If a project is
                cancelled before completion, the referral fee does not apply.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-1 border-border border-y border-dashed md:grid-cols-2">
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
            <div className="border-border border-r border-b border-dashed p-6">
              <p className="mb-3 font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
                Qualifying projects
              </p>
              <AnimatedList
                items={[
                  "Websites & landing pages",
                  "Web applications",
                  "Mobile apps (iOS, Android)",
                  "SaaS products",
                  "Enterprise systems",
                  "E-commerce platforms",
                  "AI agents & MCP servers",
                  "Engineering consultancy",
                ]}
              />
            </div>
            <div className="border-border border-b border-dashed p-6">
              <p className="mb-3 font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
                The fine print
              </p>
              <AnimatedList
                delay={200}
                dotClass="bg-muted-foreground/30"
                items={[
                  "Referral valid for 6 months from submission",
                  "One commission per referred client",
                  "Commission paid after project completion",
                  "Bank transfer within 5 business days",
                  "No minimum or maximum referrals",
                  "We reserve the right to decline projects",
                ]}
                textClass="text-muted-foreground text-sm"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FadeIn>
        <section className="scroll-mt-24 pt-10 md:pt-14" id="faq">
          <div className="mx-auto mb-2 max-w-5xl px-6">
            <h2 className="font-medium text-2xl tracking-tighter">
              Questions about the program
            </h2>
          </div>

          <div className="mx-auto mb-6 max-w-5xl px-6">
            <p className="text-muted-foreground text-sm">
              Something not covered here?{" "}
              <a
                className="font-medium text-primary hover:underline"
                href="mailto:contact@amajor.ai?subject=Referral%20Program%20Question"
              >
                Email us and we'll get back to you within 24 hours
              </a>
              .
            </p>
          </div>

          <div className="relative border-border border-y border-dashed">
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
            <div className="mx-auto max-w-5xl px-6 py-8">
              <Accordion className="w-full" collapsible type="single">
                {faqItems.map((item) => (
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
      </FadeIn>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <FadeIn>
        <section
          className="relative scroll-mt-24 overflow-hidden py-20"
          id="apply"
        >
          <StarMark
            style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
          />
          <StarMark
            style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-amber-500),var(--color-white)_100%)] dark:opacity-100"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="font-medium text-2xl tracking-tighter">
                Know someone building something?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Send us their details. If we close the deal, you get paid.
                Simple as that.
              </p>
              <div className="mx-auto mt-6 max-w-sm">
                <div className="flex justify-center">
                  <Button onClick={handleReferral}>Submit a Referral</Button>
                </div>
                <p className="mt-4 text-muted-foreground/60 text-xs">
                  Anyone can refer. No sign-ups, no agreements, no minimum.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <Link
          className="group flex items-center justify-between border-border border-t border-dashed px-6 py-4 transition-colors duration-200 hover:bg-muted/10"
          href="/agency"
        >
          <div>
            <p className="font-medium text-sm">Need something built?</p>
            <p className="text-muted-foreground text-xs">
              We build websites, apps, and enterprise systems with AI at the
              core.
            </p>
          </div>
          <span className="font-medium text-muted-foreground text-xs transition-colors duration-200 group-hover:text-foreground">
            A Major Agency →
          </span>
        </Link>
      </FadeIn>
    </>
  );
}
