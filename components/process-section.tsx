"use client";

import { FadeIn } from "@/components/ui/fade-in";

const steps = [
  {
    title: "Scope",
    description:
      "We define what to build. Requirements, user flows, and technical decisions made upfront so nothing gets lost in translation.",
  },
  {
    title: "Build",
    description:
      "Fast, iterative development with regular check-ins. You see progress weekly, not just at the end.",
  },
  {
    title: "Ship",
    description:
      "Full deployment, handover, and documentation. We make sure it runs in production before we call it done.",
  },
];

export default function ProcessSection() {
  return (
    <section className="pt-10 md:pt-14" id="process">
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">How we work</h2>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="grid grid-cols-1 border-border border-y border-dashed md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              className={[
                "space-y-3 border-border border-r border-b border-dashed p-6",
                index === steps.length - 1 ? "md:border-r-0" : "",
              ].join(" ")}
              key={index}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border border-dashed font-medium text-muted-foreground text-sm">
                  {index + 1}
                </div>
                <h3 className="font-medium text-sm">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
