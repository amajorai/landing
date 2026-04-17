import Link from "next/link";
import { ServiceLogo } from "@/components/services/service-logo";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import {
  generateBreadcrumbJsonLd,
  generateJsonLd,
  generateMetadata as genMeta,
  siteConfig,
} from "@/lib/metadata";
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
  title: "Software Development Services",
  description:
    "Full-stack software development services from a Singapore-based agency. Web design, mobile apps, SaaS platforms, e-commerce, enterprise systems, and 70+ technology stacks. From startups to enterprise, we build software that works.",
  url: "/services",
  tags: [
    "software development services",
    "software development company Singapore",
    "web design Singapore",
    "web development agency",
    "mobile app development Singapore",
    "SaaS development company",
    "custom software development",
    "e-commerce development",
    "enterprise software development",
    "React development agency",
    "Next.js developer Singapore",
    "WordPress agency Singapore",
    "MVP development",
    "startup software development",
    "fintech development",
    "healthcare software",
    "website migration services",
    "API development",
    "full-stack development",
  ],
});

const specialistOfferings = [
  {
    slug: "website-migration",
    name: "Website Migration",
    icon: "ArrowRightLeft",
  },
  { slug: "api-development", name: "API Development", icon: "Plug" },
  { slug: "startup-development", name: "Startup Development", icon: "Rocket" },
];

const categoryGroups = [
  { label: "Frontend", services: frontendServices },
  { label: "CMS & E-commerce Platforms", services: cmsServices },
  { label: "Backend & API", services: backendServices },
  { label: "Database & Storage", services: databaseServices },
  { label: "Authentication", services: authServices },
  { label: "Payments & Billing", services: paymentsServices },
  { label: "Mobile", services: mobileServices },
  { label: "Desktop", services: desktopServices },
  { label: "Design", services: designServices },
  { label: "Tooling, DevOps & Cloud", services: toolingServices },
];

export default function ServicesPage() {
  const itemListJsonLd = generateJsonLd("ItemList", {
    name: "A Major Software Development Services",
    description:
      "Full-stack software development services from a Singapore-based agency.",
    itemListElement: offeringsConfig.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.name,
      url: `${siteConfig.url}/services/${o.slug}`,
    })),
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
  ]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-12 pt-4">
            <PageHeader
              line1="Services"
              line2="Whatever you need built, we've shipped it before."
            />
          </div>
        </FadeIn>

        {/* SEO pillar content */}
        <FadeIn>
          <div className="mb-16 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A Major is a Singapore-based software agency that designs, builds,
              and deploys production-grade software for businesses worldwide. We
              work across the full stack, from pixel-perfect UI design to
              scalable backend architecture, from mobile apps on iOS and Android
              to complex enterprise systems that handle millions of
              transactions.
            </p>
            <p>
              Whether you&apos;re a startup building your first MVP, an
              enterprise modernising legacy systems, or an established business
              looking for a WordPress redesign or custom e-commerce solution, we
              bring the same rigour to every project. Our founder is personally
              involved from first conversation to launch day, which means no
              handoff gaps between sales and engineering.
            </p>
            <p>
              We specialise in React, Next.js, Node.js, and the modern
              JavaScript ecosystem, but we&apos;re not limited to it. We ship
              production software in Python, PHP, .NET, Rust, Swift, Kotlin, and
              Flutter. We&apos;ve built on WordPress, Shopify, WooCommerce,
              Webflow, and every major cloud platform including AWS, Google
              Cloud, Azure, Vercel, and Cloudflare.
            </p>
            <p>
              Every service page below explains what we build with that
              technology, the common challenges we solve, best practices we
              follow, and useful resources for your own research. If you&apos;re
              evaluating technologies or agencies, these pages are designed to
              give you the information you need to make a confident decision.
            </p>
          </div>
        </FadeIn>

        {/* Core services grid */}
        <FadeIn>
          <section className="mb-16" id="our-services">
            <h2 className="mb-2 font-semibold text-xl">What we build</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              End-to-end software development services, from web design to
              enterprise platforms.
            </p>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 lg:grid-cols-3">
              {offeringsConfig
                .filter(
                  (o) =>
                    ![
                      "website-migration",
                      "api-development",
                      "startup-development",
                    ].includes(o.slug)
                )
                .map((offering) => (
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

        {/* Specialist services */}
        <FadeIn>
          <section className="mb-16" id="specialist-services">
            <h2 className="mb-2 font-semibold text-xl">Specialist services</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Targeted services for specific business needs, from platform
              migrations to API integrations to startup-speed development.
            </p>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 lg:grid-cols-3">
              {specialistOfferings.map((spec) => {
                const offering = offeringsConfig.find(
                  (o) => o.slug === spec.slug
                );
                if (!offering) return null;
                return (
                  <Link
                    className="group block border-border border-r border-b border-dashed p-5 transition-colors hover:bg-muted/30"
                    href={`/services/${spec.slug}` as any}
                    key={spec.slug}
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <ServiceLogo
                        service={offering as unknown as ServiceConfig}
                        size={20}
                      />
                      <h3 className="font-medium text-base">{spec.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {offering.tagline}
                    </p>
                  </Link>
                );
              })}
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
              We work with 70+ technologies across the full stack. Each page
              below explains what we build with that technology, the challenges
              you&apos;ll face, best practices to follow, and how we can help.
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

        {/* Bottom SEO content */}
        <FadeIn>
          <section className="mb-16 max-w-3xl space-y-4 text-muted-foreground text-sm leading-relaxed">
            <h2 className="font-semibold text-foreground text-xl">
              Why businesses choose A Major
            </h2>
            <p>
              We&apos;re not a body shop or a freelance marketplace. A Major is
              a focused software agency where the founder personally oversees
              every project. That means direct communication with the person
              making technical decisions, not a project manager relaying
              messages between you and an anonymous team.
            </p>
            <p>
              Our clients range from pre-seed startups shipping their first MVP
              to established enterprises modernising decade-old platforms. We
              work across healthcare, fintech, e-commerce, education, logistics,
              and SaaS, bringing cross-industry perspective to every project we
              take on.
            </p>
            <p>
              Based in Singapore and serving clients worldwide, we combine
              Southeast Asian pragmatism with global engineering standards.
              Every project ships with clean code, proper documentation, CI/CD
              pipelines, and monitoring, because software that works on launch
              day needs to keep working on day 365.
            </p>
          </section>
        </FadeIn>

        {/* Compare section */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="mb-2 font-semibold text-xl">
              Not sure which to choose?
            </h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Honest technology comparisons written by engineers who have
              shipped with all options.
            </p>
            <Link
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted/50"
              href="/compare"
            >
              Browse technology comparisons →
            </Link>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
