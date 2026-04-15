import Link from "next/link";
import { ServiceLogo } from "@/components/services/service-logo";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
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
  type ServiceConfig,
  toolingServices,
} from "@/lib/services-config";

function ServiceNavItem({ service }: { service: ServiceConfig }) {
  return (
    <NavigationMenuLink asChild className="flex-row items-center gap-2.5 p-0">
      <Link
        className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 transition-colors hover:bg-accent"
        href={`/services/${service.slug}` as any}
      >
        <ServiceLogo service={service} size={16} />
        <span className="text-sm">{service.name}</span>
      </Link>
    </NavigationMenuLink>
  );
}

function Column({
  label,
  services,
}: {
  label: string;
  services: ServiceConfig[];
}) {
  return (
    <div>
      <p className="mb-1 px-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <div>
        {services.map((s) => (
          <ServiceNavItem key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}

export function ServicesNavContent() {
  return (
    <div className="w-[600px] p-3">
      <div className="grid grid-cols-4 gap-x-4 gap-y-4">
        <div className="space-y-4">
          <Column label="Frontend" services={frontendServices} />
          <Column label="CMS" services={cmsServices} />
        </div>
        <div className="space-y-4">
          <Column label="Backend" services={backendServices} />
          <Column label="Mobile" services={mobileServices} />
        </div>
        <div className="space-y-4">
          <Column label="Database" services={databaseServices} />
          <Column label="Auth" services={authServices} />
          <Column label="Payments" services={paymentsServices} />
        </div>
        <div className="space-y-4">
          <Column label="Desktop" services={desktopServices} />
          <Column label="Design" services={designServices} />
          <Column label="Tooling" services={toolingServices} />
        </div>
      </div>

      <div className="mt-3 border-border border-t pt-2">
        <NavigationMenuLink asChild className="flex-row items-center gap-0 p-0">
          <Link
            className="block rounded-sm px-2 py-1.5 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            href={"/services" as any}
          >
            View all services →
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}
