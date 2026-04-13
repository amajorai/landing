"use client";

import Link from "next/link";
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
      question: "What does A Major do?",
      answer:
        "A Major is a Singapore-based software studio. We build websites, web apps, and digital platforms for businesses. Clear process, direct communication, and the founder personally involved from first conversation to launch day.",
    },
    {
      id: "item-2",
      question: "What kind of software do you build?",
      answer:
        "Websites, web apps, mobile apps, desktop software, and digital platforms. We work with businesses that need high-performance software built properly, with transparent communication, a fixed scope, and a founder who stays accountable throughout.",
    },
    {
      id: "item-3",
      question: 'What does "founder-led" mean in practice?',
      answer:
        "It means Jia Wei, our founder, is directly involved in your project from discovery to launch. You're not handed off to a junior designer or an outsourced team. You get someone with 7+ years of engineering experience, a CS degree from the University of Glasgow, and a track record across web, mobile, and enterprise platforms.",
    },
    {
      id: "item-4",
      question: "Do you work with startups or established businesses?",
      answer:
        "Both. We work with early-stage startups who need to move fast, and with established businesses who need a reliable team that delivers. If you have a real problem and the motivation to solve it, we want to talk.",
    },
    {
      id: "item-5",
      question: "How long does a project take?",
      answer:
        "Most projects move from discovery to launch in under 30 days. We scope everything upfront so there are no surprises. More complex platforms take longer. We'll give you a clear timeline once we understand what you need.",
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
    <section className="py-10 md:py-14" id="faq">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-medium text-2xl tracking-tighter">
            You should know these before working with us
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            className="w-full rounded-2xl bg-muted p-1 dark:bg-muted/50"
            collapsible
            type="single"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  className="peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm dark:data-[state=open]:bg-muted"
                  value={item.id}
                >
                  <AccordionTrigger className="cursor-pointer font-semibold text-lg hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p className="mt-6 px-8 text-center text-muted-foreground">
            Have more questions?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="https://tally.so/r/wLoJKj"
              rel="noopener noreferrer"
              target="_blank"
            >
              Get in touch and we'll get back to you within 24 hours
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
