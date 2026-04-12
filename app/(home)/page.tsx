import CallToAction from "@/components/call-to-action";
import ContentSection from "@/components/content-1";
import FAQsFour from "@/components/faqs-4";
import FeaturesSection from "@/components/features-6";
import HeroSection from "@/components/hero-section";
import Partners from "@/components/partners";
import StatsSection from "@/components/stats-4";
import TeamSection from "@/components/team";
import { FadeIn } from "@/components/ui/fade-in";

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  return (
    <>
      <div>
        <FadeIn>
          <HeroSection />
        </FadeIn>
        <FadeIn>
          <Partners />
        </FadeIn>
      </div>

      <FadeIn>
        <ContentSection />
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
        <CallToAction />
      </FadeIn>
    </>
  );
}
