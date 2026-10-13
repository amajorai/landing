import RyuHero from "@/components/ryu/ryu-hero";
import {
  RyuCta,
  RyuFaq,
  RyuGetStarted,
  RyuPlatform,
  RyuWhoFor,
  RyuWhy,
} from "@/components/ryu/ryu-sections";
import RyuSection from "@/components/ryu-section";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { RYU_PITCH, RYU_TAGLINE } from "@/lib/ryu";

export const metadata = genMeta({
  title: `Ryu — ${RYU_TAGLINE}`,
  description: RYU_PITCH,
  url: "/products/ryu",
  tags: [
    "Ryu",
    "managed AI agent platform",
    "AI agents",
    "open-source agent infrastructure",
    "AI agent plugins",
    "agentic apps",
    "agent observability",
    "agent access control",
  ],
});

export default function RyuPage() {
  return (
    <>
      <FadeIn>
        <RyuHero />
      </FadeIn>

      <FadeIn>
        <RyuSection />
      </FadeIn>

      <FadeIn>
        <RyuGetStarted />
      </FadeIn>

      <FadeIn>
        <RyuPlatform />
      </FadeIn>

      <FadeIn>
        <RyuWhoFor />
      </FadeIn>

      <FadeIn>
        <RyuWhy />
      </FadeIn>

      <FadeIn>
        <RyuFaq />
      </FadeIn>

      <FadeIn>
        <RyuCta />
      </FadeIn>
    </>
  );
}
