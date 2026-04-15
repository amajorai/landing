import Link from "next/link";
import { ServiceLogo } from "@/components/services/service-logo";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { offeringsConfig } from "@/lib/offerings-config";
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

function OfferingNavItem({
  offering,
}: {
  offering: (typeof offeringsConfig)[number];
}) {
  return (
    <NavigationMenuLink asChild className="flex-row items-center gap-2.5 p-0">
      <Link
        className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 transition-colors hover:bg-accent"
        href={`/services/${offering.slug}` as any}
      >
        <ServiceLogo service={offering as unknown as ServiceConfig} size={16} />
        <span className="text-sm">{offering.name}</span>
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
    <div className="w-[540px]">
      <div className="max-h-[70vh] overflow-y-auto p-3">
        {/* Offerings */}
        <div className="mb-3 border-border border-b pb-3">
          <p className="mb-1 px-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Our services
          </p>
          <div className="grid grid-cols-2 gap-x-2">
            {offeringsConfig.map((o) => (
              <OfferingNavItem key={o.slug} offering={o} />
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-4">
          <div className="space-y-4">
            <Column
              label="Frontend Frameworks"
              services={frontendServices.slice(0, 8)}
            />
            <Column label="CMS" services={cmsServices} />
          </div>
          <div className="space-y-4">
            <Column
              label="Frontend Libraries"
              services={frontendServices.slice(8)}
            />
            <Column label="Mobile" services={mobileServices} />
            <Column label="Desktop" services={desktopServices} />
          </div>
          <div className="space-y-4">
            <Column label="Backend" services={backendServices.slice(0, 8)} />
            <Column
              label="APIs & Runtime"
              services={backendServices.slice(8)}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-4">
          <div className="space-y-4">
            <Column label="Database" services={databaseServices} />
          </div>
          <div className="space-y-4">
            <Column label="Auth" services={authServices} />
            <Column label="Payments" services={paymentsServices} />
            <Column label="Design" services={designServices} />
          </div>
          <div className="space-y-4">
            <Column label="Tooling & DevOps" services={toolingServices} />
          </div>
        </div>
      </div>

      <div className="border-border border-t px-3 py-2">
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
