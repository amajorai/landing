import { generateMetadata as genMeta } from "@/lib/metadata";
import { ConsultancyContent } from "./content";

export const metadata = genMeta({
  title: "AI Adoption Consultancy",
  description:
    "Free 30-min AI audit session. Honest recommendations and an actionable AI adoption plan from A Major.",
  url: "/consultancy",
  tags: [
    "AI adoption consultancy",
    "AI consulting Singapore",
    "AI audit",
    "AI strategy",
    "AI for business",
    "AI tools recommendation",
    "A Major consultancy",
  ],
});

export default function ConsultancyPage() {
  return <ConsultancyContent />;
}
