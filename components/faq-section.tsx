"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsFour() {
  const faqItems = [
    {
      id: "item-1",
      question: "How much does a project cost?",
      answer:
        "It depends on scope, and we don't quote before we understand what you actually need. We work on a fixed-project basis, not hourly, so everything is agreed upfront. No billing surprises. Reach out and we'll give you a straight answer once we've had a conversation.",
    },
    {
      id: "item-2",
      question: "Do you work with clients outside Singapore?",
      answer:
        "Yes. Most of our work is done remotely and we've worked with clients across Asia and beyond. We communicate over video, async tools, and whatever works for your timezone.",
    },
    {
      id: "item-3",
      question: "Do you work with startups or established businesses?",
      answer:
        "Both. We work with early-stage startups who need to move fast, and with established businesses who need a reliable team that delivers. If you have a real problem and the motivation to solve it, we want to talk.",
    },
    {
      id: "item-4",
      question: "Can you work with our existing codebase or team?",
      answer:
        "Yes. We can jump into an existing project, extend what's already built, or work alongside your in-house team. We assess what's there first and give you an honest read before committing.",
    },
    {
      id: "item-5",
      question: "What happens after we launch?",
      answer:
        "We don't disappear at launch. We offer post-launch support and can stay on for ongoing development, maintenance, or iteration. That's something we agree on before we start, so there are no gaps.",
    },
    {
      id: "item-6",
      question: "What's it like working with you?",
      answer:
        "Straightforward. We start with a discovery conversation, agree on a scope and timeline, then build in stages with regular check-ins. No jargon, no surprise invoices. You have direct access to the founder throughout, and you end up with a product you actually understand and can grow with.",
    },
    {
      id: "item-7",
      question: "How do we get started?",
      answer:
        "Fill out the project form or book a call. Tell us what you're building or what problem you're trying to solve, and we'll take it from there. We respond to every inquiry within 24 hours.",
    },
  ];

  return (
    <section className="scroll-mt-24 pt-10 md:pt-14" id="faq">
      <div className="mx-auto mb-2 max-w-5xl px-6">
        <h2 className="font-medium text-2xl tracking-tighter">
          You should know these before working with us
        </h2>
      </div>

      <div className="mx-auto mb-6 max-w-5xl px-6">
        <p className="text-muted-foreground text-sm">
          Have more questions?{" "}
          <a
            className="font-medium text-primary hover:underline"
            href="https://www.notion.so/f9ac6e86fafa4ca28ed6c2af11d498cf?pvs=106"
            rel="noopener noreferrer"
            target="_blank"
          >
            Get in touch and we'll get back to you within 24 hours
          </a>
          .
        </p>
      </div>

      <div className="relative border-border border-y border-dashed">
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
  );
}
