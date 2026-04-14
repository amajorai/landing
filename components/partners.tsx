"use client";
import Image from "next/image";
import LogoLoop from "@/components/reactbits/logo-loop";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";

export default function PartnersSection() {
  return (
    <section className="relative z-10 bg-background py-10 md:py-14">
      <StarMark
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
      />
      <StarMark
        style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
      />
      <div className="m-auto max-w-5xl px-6">
        <FadeIn duration={0.5}>
          <p className="mb-4 text-center text-muted-foreground text-sm">
            We are partners with the world's leading technology companies
          </p>
          <LogoLoop>
            <Image
              alt="AWS Logo - Cloud Partner"
              className="h-4 w-auto"
              height={20}
              priority
              src="/logos/aws_light.svg"
              width={60}
            />
            <Image
              alt="GitHub Logo - Development Partner"
              className="h-5 w-auto dark:invert"
              height={16}
              priority
              src="/logos/github_light.svg"
              width={50}
            />
            <Image
              alt="Notion Logo - Productivity Partner"
              className="h-5 w-auto dark:invert"
              height={20}
              priority
              src="/logos/notion.svg"
              width={55}
            />
            <Image
              alt="Anthropic Logo - AI Partner"
              className="h-5 w-auto dark:invert"
              height={20}
              priority
              src="/logos/anthropic_black_wordmark.svg"
              width={70}
            />
            <Image
              alt="OpenAI Logo - AI Partner"
              className="h-5 w-auto dark:invert"
              height={24}
              priority
              src="/logos/openai_wordmark_light.svg"
              width={100}
            />
            <Image
              alt="Microsoft Logo - Technology Partner"
              className="h-4 w-auto"
              height={16}
              priority
              src="/logos/microsoft.svg"
              width={80}
            />
            <Image
              alt="Vercel Logo - Hosting Partner"
              className="h-4 w-auto dark:invert"
              height={20}
              priority
              src="/logos/vercel_wordmark.svg"
              width={60}
            />
          </LogoLoop>
        </FadeIn>
      </div>
    </section>
  );
}
