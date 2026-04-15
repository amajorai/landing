import Link from "next/link";
import { ServiceLogo } from "@/components/services/service-logo";
import type { ServiceConfig, SubTech } from "@/lib/services-config";

interface SubTechCardProps {
  subTech: SubTech;
  service?: ServiceConfig;
}

export function SubTechCard({ subTech, service }: SubTechCardProps) {
  return (
    <Link
      className="group block border-border border-r border-b border-dashed p-5 transition-colors hover:bg-muted/30"
      href={`/services/${subTech.slug}` as any}
    >
      <div className="mb-3 flex items-center gap-2.5">
        {service && <ServiceLogo service={service} size={20} />}
        <h3 className="font-medium text-base">
          {service?.name ?? subTech.slug}
        </h3>
      </div>
      {(service?.tagline ?? subTech.description) && (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service?.tagline ?? subTech.description}
        </p>
      )}
    </Link>
  );
}
