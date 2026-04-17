import { notFound } from "next/navigation";
import { TechPageLayout } from "@/components/services/tech-page-layout";
import {
  generateBreadcrumbJsonLd,
  generateJsonLd,
  generateMetadata as genMeta,
  siteConfig,
} from "@/lib/metadata";
import type { OfferingConfig } from "@/lib/offerings-config";
import { getOfferingBySlug, offeringsConfig } from "@/lib/offerings-config";
import type { ServiceConfig } from "@/lib/services-config";
import { getServiceBySlug, servicesConfig } from "@/lib/services-config";

type AnyService = ServiceConfig | OfferingConfig;

function findService(slug: string): AnyService | undefined {
  return getServiceBySlug(slug) ?? getOfferingBySlug(slug);
}

export function generateStaticParams() {
  const techSlugs = servicesConfig.map((s) => ({ slug: s.slug }));
  const offeringSlugs = offeringsConfig.map((s) => ({ slug: s.slug }));
  return [...techSlugs, ...offeringSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  const titleSuffix =
    service.pageType === "offering" ? "Services" : "Development";
  const description =
    service.description +
    (service.overview
      ? ` ${service.overview.split(".").slice(0, 2).join(".")}.`
      : "");

  return genMeta({
    title: `${service.name} ${titleSuffix}`,
    description: description.slice(0, 320),
    url: `/services/${service.slug}`,
    tags: buildKeywords(service),
  });
}

function buildKeywords(service: AnyService): string[] {
  const base = [service.name, "Singapore", "agency", "A Major"];
  const nameLower = service.name.toLowerCase();

  if (service.pageType === "tech") {
    return [
      ...base,
      `${service.name} developer`,
      `${service.name} development`,
      `${service.name} development company`,
      `hire ${service.name} developer`,
      `hire ${service.name} developer Singapore`,
      `${service.name} agency Singapore`,
      `${service.name} best practices`,
      `${service.name} consulting`,
      `${service.name} freelancer vs agency`,
      `${nameLower} development cost`,
      `build with ${service.name}`,
      `${service.name} for startups`,
      `${service.name} for enterprise`,
    ];
  }
  if (service.pageType === "cms") {
    return [
      ...base,
      `${service.name} agency`,
      `${service.name} redesign`,
      `${service.name} developer Singapore`,
      `${service.name} development company`,
      `${service.name} migration`,
      `${service.name} migration service`,
      `${service.name} maintenance`,
      `${service.name} customization`,
      `custom ${service.name} development`,
      `${service.name} speed optimization`,
      `${service.name} security`,
      `${nameLower} website cost`,
      `hire ${service.name} expert`,
    ];
  }
  return [
    ...base,
    `${service.name} company Singapore`,
    `${service.name} services`,
    `${service.name} agency`,
    `${nameLower} services Singapore`,
    `hire ${nameLower} experts`,
    `${nameLower} company`,
    `${nameLower} cost`,
    `${nameLower} for small business`,
    `${nameLower} for startups`,
    `best ${nameLower} agency`,
    `outsource ${nameLower}`,
    `${nameLower} consulting`,
  ];
}

function buildJsonLd(service: AnyService) {
  const scripts: object[] = [];
  const serviceUrl = `${siteConfig.url}/services/${service.slug}`;

  scripts.push(
    generateBreadcrumbJsonLd([
      { name: "Home", url: siteConfig.url },
      { name: "Services", url: `${siteConfig.url}/services` },
      { name: service.name, url: serviceUrl },
    ])
  );

  scripts.push(
    generateJsonLd("Service", {
      name: service.name,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "Worldwide",
      serviceType: service.name,
    })
  );

  if (service.faq && service.faq.length > 0) {
    scripts.push(
      generateJsonLd("FAQPage", {
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      })
    );
  }

  return scripts;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const jsonLd = buildJsonLd(service);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={i}
          type="application/ld+json"
        />
      ))}
      <TechPageLayout service={service as ServiceConfig} />
    </>
  );
}
