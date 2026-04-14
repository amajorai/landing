"use client";

import { BadgeCheck, Check, Globe, LinkedinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import PixelCard from "@/components/reactbits/pixel-card";
import { FadeIn } from "@/components/ui/fade-in";

// ── Career timeline visual ────────────────────────────────────────────────────

const CAREER = [
  {
    year: "2019",
    role: "Blockchain Engineer",
    org: "1Citadel",
    color: "border-violet-500/40 bg-violet-500/10 text-violet-400",
    dot: "bg-violet-400",
    glow: "0 0 8px rgb(167 139 250 / 0.5)",
  },
  {
    year: "2022",
    role: "Lead Developer",
    org: "Better Age Solutions",
    color: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
    glow: "0 0 8px rgb(251 191 36 / 0.5)",
  },
  {
    year: "2023",
    role: "BSc Computer Science",
    org: "Univ. of Glasgow",
    color: "border-sky-500/40 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
    glow: "0 0 8px rgb(56 189 248 / 0.5)",
  },
  {
    year: "2025",
    role: "Business Director",
    org: "Base 7",
    color: "border-green-500/40 bg-green-500/10 text-green-400",
    dot: "bg-green-400",
    glow: "0 0 8px rgb(74 222 128 / 0.5)",
  },
  {
    year: "2026",
    role: "CEO & Co-Founder",
    org: "A Major",
    color: "border-primary/50 bg-primary/10 text-primary",
    dot: "bg-primary",
    glow: "0 0 10px hsl(var(--primary) / 0.6)",
  },
];

function CareerTimeline() {
  const [revealed, setRevealed] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 200;

    CAREER.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setRevealed(i + 1);
          setLineWidth((i / (CAREER.length - 1)) * 100);
        }, delay)
      );
      delay += 480;
    });

    // Final line reaches 100%
    timers.push(setTimeout(() => setLineWidth(100), delay - 250));

    // Reset
    timers.push(
      setTimeout(() => {
        setRevealed(0);
        setLineWidth(0);
        setTick((t) => t + 1);
      }, delay + 2800)
    );

    return () => timers.forEach(clearTimeout);
  }, [tick]);

  const isComplete = revealed === CAREER.length;

  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[480px] px-3 pt-5 pb-1">
        {/* Track line - top = pt-5 (20px) + half dot container (9px) = 29px */}
        <div className="absolute top-[29px] right-[32px] left-[32px] h-px bg-border/25">
          <div
            className="h-full bg-primary/35 transition-all ease-out"
            style={{ width: `${lineWidth}%`, transitionDuration: "420ms" }}
          />
        </div>

        {/* Nodes */}
        <div className="relative flex justify-between">
          {CAREER.map((item, i) => {
            const isLast = i === CAREER.length - 1;
            const isActive = isLast && isComplete;
            return (
              <div
                className="flex flex-col items-center gap-2"
                key={item.org}
                style={{
                  opacity: i < revealed ? 1 : 0,
                  transform: i < revealed ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.32s ease, transform 0.32s ease",
                }}
              >
                {/* Dot */}
                <div className="relative flex size-[18px] items-center justify-center">
                  {isActive && (
                    <span
                      className={`absolute size-[18px] animate-ping rounded-full opacity-40 ${item.dot}`}
                    />
                  )}
                  <div
                    className={`relative size-2.5 rounded-full transition-all duration-500 ${item.dot}`}
                    style={{ boxShadow: i < revealed ? item.glow : "none" }}
                  />
                </div>

                {/* Label */}
                <div
                  className={`rounded border px-2 py-0.5 text-center transition-all duration-500 ${item.color}`}
                  style={{
                    boxShadow: isActive ? item.glow : "none",
                  }}
                >
                  <p className="whitespace-nowrap font-medium text-[8px] leading-tight">
                    {item.org}
                  </p>
                </div>
                <p className="text-[8px] text-muted-foreground/40 tabular-nums">
                  {item.year}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TeamSection() {
  return (
    <section className="pt-10 md:pt-14" id="team">
      <div className="mb-6 px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">Our founder</h2>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="border-border border-y border-dashed">
          <div className="flex items-center gap-4 border-border border-b border-dashed p-6">
            <PixelCard
              className="size-16 shrink-0 rounded-full border border-dashed bg-background p-0.5 shadow shadow-zinc-950/5"
              variant="default"
            >
              <img
                alt="Jia Wei Ng"
                className="aspect-square rounded-full object-cover"
                height="460"
                loading="lazy"
                src="/team/jiawei-new.jpg"
                width="460"
              />
            </PixelCard>
            <div>
              <div className="inline-flex items-center gap-1.5">
                <p className="font-medium text-sm">Jia Wei Ng</p>
                <div className="relative flex size-4 items-center justify-center">
                  <BadgeCheck
                    className="size-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400"
                    strokeWidth={3}
                  />
                  <Check
                    className="absolute size-2 text-white"
                    strokeWidth={5}
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-xs">CEO & Co-Founder</p>
              <div className="mt-2 flex gap-3 text-muted-foreground">
                <a
                  href="https://www.linkedin.com/in/jiaweing"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedinIcon className="size-3.5" />
                </a>
                <a
                  href="https://jiaweing.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Globe className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Jia Wei holds a Bachelor&apos;s degree in Computer Science from
                the University of Glasgow and has over 7 years of professional
                experience in software engineering. He has led projects across
                web, mobile, and enterprise platforms.
              </p>
              <p>
                Prior to A Major, Jia Wei served as Business Director at{" "}
                <span className="inline-flex items-center gap-1 font-medium text-accent-foreground">
                  <img
                    alt="Base 7"
                    className="inline-block h-3 w-3 object-contain dark:invert"
                    src="/logos/base7-submark.svg"
                  />
                  Base 7
                </span>
                , designing and building apps for clients across industries. He
                also led development of a medicine delivery routing system for
                Singapore&apos;s public hospitals at Better Age Solutions, and
                delivered blockchain-based enterprise applications for document
                provenance and commodity tokenisation at 1Citadel.
              </p>
              <p>
                At A Major, Jia Wei remains personally involved in every
                engagement. You are not handed off to a junior designer or an
                outsourced team. Your project is led by the founder, with direct
                access throughout.
              </p>
            </div>
          </div>

          {/* Career timeline visualization */}
          <div className="border-border border-t border-dashed px-6 py-5">
            <p className="mb-4 text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              Career journey
            </p>
            <CareerTimeline />
          </div>

          <div className="border-border border-t border-dashed p-6">
            <blockquote className="border-l-4 pl-4">
              <p className="text-muted-foreground text-sm">
                In music theory, A Major is the key that defines the structure,
                letting every instrument play in harmony. That&apos;s what we
                build.
              </p>
              <cite className="mt-4 block font-medium text-sm">
                Jia Wei Ng, Founder
              </cite>
            </blockquote>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
