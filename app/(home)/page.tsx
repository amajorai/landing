import CallToAction from "@/components/call-to-action";
import ContentSection from "@/components/content-1";
import FAQsFour from "@/components/faqs-4";
import FeaturesSection from "@/components/features-6";
import HeroSection from "@/components/hero-section";
import Partners from "@/components/partners";
import ProcessSection from "@/components/process-section";
import ProjectsShowcase from "@/components/projects-showcase";
import RyuSection from "@/components/ryu-section";
import StatsSection from "@/components/stats-4";
import TeamSection from "@/components/team";
import { FadeIn } from "@/components/ui/fade-in";
import { getProjects } from "@/lib/notion";

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();

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

      {projects.length > 0 && (
        <FadeIn>
          <ProjectsShowcase projects={projects} />
        </FadeIn>
      )}

      <FadeIn>
        <RyuSection />
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
