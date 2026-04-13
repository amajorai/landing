import { Globe, LinkedinIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function TeamSection() {
  return (
    <section className="py-10 md:py-14" id="team">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="mb-4 font-medium text-2xl tracking-tighter">
            Our founder
          </h2>
        </FadeIn>

        <div className="space-y-8 pt-4">
          <FadeIn delay={0.1} duration={0.4}>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full border border-dashed bg-background p-0.5 shadow shadow-zinc-950/5">
                <img
                  alt="Jia Wei Ng"
                  className="aspect-square rounded-full object-cover"
                  height="460"
                  loading="lazy"
                  src="/team/jiawei.jpg"
                  width="460"
                />
              </div>
              <div>
                <p className="font-medium text-sm">Jia Wei Ng</p>
                <p className="text-muted-foreground text-xs">
                  CEO & Co-Founder
                </p>
                <div className="mt-1 flex gap-3 text-muted-foreground">
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
          </FadeIn>

          <FadeIn delay={0.2} duration={0.4}>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Jia Wei holds a Bachelor&apos;s degree in Computer Science from
                the University of Glasgow and has over 7 years of professional
                experience in software engineering. He has led projects across
                web, mobile, and enterprise platforms.
              </p>
              <p>
                Prior to A Major, Jia Wei served as Business Director at Base 7
                LLP, designing and building apps for clients across industries.
                He also led development of a medicine delivery routing system
                for Singapore&apos;s public hospitals at Better Age Solutions,
                and delivered blockchain-based enterprise applications for
                document provenance and commodity tokenisation at 1Citadel.
              </p>
              <p>
                At A Major, Jia Wei remains personally involved in every
                engagement. You are not handed off to a junior designer or an
                outsourced team,your project is led by the founder, with direct
                access throughout.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
