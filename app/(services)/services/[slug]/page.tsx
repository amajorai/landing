import { notFound } from "next/navigation";
import { TechPageLayout } from "@/components/services/tech-page-layout";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getServiceBySlug, servicesConfig } from "@/lib/services-config";

export function generateStaticParams() {
  return servicesConfig.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return genMeta({
    title: `${service.name} Development`,
    description: service.description,
    url: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <TechPageLayout service={service} />;
}
