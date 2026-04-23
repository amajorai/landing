import { Suspense } from "react";

import ContentSection from "@/components/about-section";
import CallToAction from "@/components/call-to-action";
import FAQsFour from "@/components/faq-section";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import HeroSection from "@/components/hero-section";
import Partners from "@/components/partners";
import ProcessSection from "@/components/process-section";
import FeaturesSection from "@/components/services-section";
import TeamSection from "@/components/team";
import { FadeIn } from "@/components/ui/fade-in";
import StatsSection from "@/components/why-us-section";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { generateMetadata } from "@/lib/metadata";

const GITHUB_USERNAME = "jiaweing";
const GITHUB_PROFILE_URL = "https://github.com/jiaweing";

export const metadata = generateMetadata({
  title: "Software that just works. Experts you can talk to. — A Major",
  description:
    "A Major is a founder-led Singapore software agency. We build web apps, mobile apps, SaaS products, and e-commerce platforms for startups and enterprises worldwide.",
  url: "/agency",
  tags: [
    "software agency Singapore",
    "web development Singapore",
    "mobile app development Singapore",
    "SaaS development",
    "MVP development",
    "startup development",
    "e-commerce development Singapore",
    "full stack development",
    "custom software Singapore",
    "Next.js agency Singapore",
    "React developer Singapore",
    "founder-led agency",
    "digital agency Singapore",
    "enterprise software Singapore",
  ],
});

export const revalidate = 3600;

export default function AgencyPage() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <>
      <div>
        <FadeIn>
          <HeroSection />
        </FadeIn>
      </div>

      <FadeIn>
        <ContentSection />
      </FadeIn>

      <FadeIn>
        <ProcessSection />
      </FadeIn>

      <FadeIn>
        <StatsSection />
      </FadeIn>

      <FadeIn>
        <FeaturesSection />
      </FadeIn>

      <FadeIn>
        <TeamSection />
      </FadeIn>

      <FadeIn>
        <section className="scroll-mt-24 pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="mb-6 px-6">
            <h2 className="font-medium text-2xl tracking-tighter">
              We ship. Constantly.
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-relaxed">
              Every square is a day we shipped something. Real work, real
              output, every single day. No quiet months, no ghost agencies. This
              is what consistent execution looks like.
            </p>
          </div>
          <Suspense fallback={<GitHubContributionsFallback />}>
            <GitHubContributions
              contributions={contributions}
              githubProfileUrl={GITHUB_PROFILE_URL}
            />
          </Suspense>
        </section>
      </FadeIn>

      <FadeIn>
        <FAQsFour />
      </FadeIn>

      <FadeIn>
        <Partners />
      </FadeIn>

      <FadeIn>
        <CallToAction />
      </FadeIn>
    </>
  );
}
