import ContentSection from "@/components/about-section";
import CallToAction from "@/components/call-to-action";
import FAQsFour from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import Partners from "@/components/partners";
import ProcessSection from "@/components/process-section";
import ProjectsShowcase from "@/components/projects-showcase";
import RyuSection from "@/components/ryu-section";
import FeaturesSection from "@/components/services-section";
import TeamSection from "@/components/team";
import { FadeIn } from "@/components/ui/fade-in";
import StatsSection from "@/components/why-us-section";
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
