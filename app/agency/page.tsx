import ContentSection from "@/components/about-section";
import CallToAction from "@/components/call-to-action";
import FAQsFour from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import Partners from "@/components/partners";
import ProcessSection from "@/components/process-section";
import FeaturesSection from "@/components/services-section";
import TeamSection from "@/components/team";
import { FadeIn } from "@/components/ui/fade-in";
import StatsSection from "@/components/why-us-section";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Software Agency Singapore — A Major",
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
