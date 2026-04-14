import { BadgeCheck, Check, Globe, LinkedinIcon } from "lucide-react";
import PixelCard from "@/components/reactbits/pixel-card";
import { FadeIn } from "@/components/ui/fade-in";

export default function TeamSection() {
  return (
    <section className="pt-10 md:pt-14" id="team">
      <div className="mx-auto mb-6 max-w-5xl px-6">
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
