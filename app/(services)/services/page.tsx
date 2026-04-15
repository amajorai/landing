import Link from "next/link";
import { ServiceLogo } from "@/components/services/service-logo";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { offeringsConfig } from "@/lib/offerings-config";
import type { ServiceConfig } from "@/lib/services-config";
import {
  authServices,
  backendServices,
  cmsServices,
  databaseServices,
  designServices,
  desktopServices,
  frontendServices,
  mobileServices,
  paymentsServices,
  toolingServices,
} from "@/lib/services-config";

export const metadata = genMeta({
  title: "Services | Singapore Software Agency",
  description:
    "Full-stack software development services — web design, mobile apps, SaaS, enterprise systems, SEO, and 60+ technology stacks. Singapore-based agency serving clients worldwide.",
  url: "/services",
  tags: [
    "software development services",
    "web design Singapore",
    "mobile app development",
    "SaaS development",
    "software agency Singapore",
  ],
});

const categoryGroups = [
  { label: "Frontend", services: frontendServices },
  { label: "CMS", services: cmsServices },
  { label: "Backend", services: backendServices },
  { label: "Database", services: databaseServices },
  { label: "Auth", services: authServices },
  { label: "Payments", services: paymentsServices },
  { label: "Mobile", services: mobileServices },
  { label: "Desktop", services: desktopServices },
  { label: "Design", services: designServices },
  { label: "Tooling", services: toolingServices },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <FadeIn>
        <div className="mb-12 pt-4">
          <PageHeader
            line1="Services"
            line2="Whatever you need built, we've shipped it before."
          />
        </div>
      </FadeIn>

      {/* Offering services grid */}
      <FadeIn>
        <section className="mb-16" id="our-services">
          <h2 className="mb-4 font-medium text-muted-foreground/70 text-sm">
            Our Services
          </h2>
          <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 lg:grid-cols-3">
            {offeringsConfig.map((offering) => (
              <Link
                className="group block border-border border-r border-b border-dashed p-5 transition-colors hover:bg-muted/30"
                href={`/services/${offering.slug}` as any}
                key={offering.slug}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <ServiceLogo
                    service={offering as unknown as ServiceConfig}
                    size={20}
                  />
                  <h3 className="font-medium text-base">{offering.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {offering.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Technology stack grid */}
      <FadeIn>
        <div className="mb-6">
          <h2 className="font-semibold text-xl" id="tech-stack">
            Technology expertise
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            We work with 60+ technologies across the full stack. Each page below
            explains what we build with that technology and how we can help.
          </p>
        </div>
      </FadeIn>

      {categoryGroups.map((group) => (
        <FadeIn key={group.label}>
          <section className="mb-12">
            <h2 className="mb-4 font-medium text-muted-foreground/70 text-sm">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 lg:grid-cols-3">
              {group.services.map((service) => (
                <Link
                  className="group block border-border border-r border-b border-dashed p-5 transition-colors hover:bg-muted/30"
                  href={`/services/${service.slug}` as any}
                  key={service.slug}
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <ServiceLogo service={service} size={20} />
                    <h3 className="font-medium text-base">{service.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
      ))}
    </div>
  );
}
