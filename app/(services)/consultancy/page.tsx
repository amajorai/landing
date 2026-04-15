import { ArrowRight, BarChart3, Search, Users } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Engineering Consultancy",
  description:
    "Architecture reviews, tech stack audits, and team augmentation for growing software teams.",
  url: "/consultancy",
});

const services = [
  {
    icon: Search,
    title: "Tech Stack Audit",
    description:
      "We dig into your existing codebase and infrastructure to identify bottlenecks, security gaps, and opportunities for modernisation. You get a prioritised action plan, not a generic report.",
  },
  {
    icon: BarChart3,
    title: "Architecture Review",
    description:
      "From monolith-to-microservices migrations to database design and API contracts — we review your system architecture and recommend the right structure for your scale and team size.",
  },
  {
    icon: Users,
    title: "Team Augmentation",
    description:
      "Embed our engineers alongside your team for a sprint, a quarter, or longer. We ramp quickly, write code that lasts, and leave your team stronger than we found it.",
  },
];

export default function ConsultancyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <FadeIn>
        <div className="mb-12 pt-4">
          <PageHeader
            eyebrow="Consultancy"
            line1="Engineering Consultancy"
            line2="Expert support for teams that need more than extra hands."
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                className="rounded-lg border border-border p-6"
                key={service.title}
              >
                <Icon className="mb-3 h-6 w-6 text-muted-foreground" />
                <h2 className="mb-2 font-semibold text-base">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="rounded-lg border border-border border-dashed p-8 text-center">
          <h2 className="mb-2 font-semibold text-2xl tracking-tight">
            Let&apos;s talk about your team
          </h2>
          <p className="mb-6 text-muted-foreground">
            Free 30-minute discovery call. No commitment, no sales pitch.
          </p>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background text-sm transition-opacity hover:opacity-80"
            href="https://cal.com/jiaweing/amajor"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
