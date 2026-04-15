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
  fullStackServices,
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
        className="flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-accent"
        href={`/services/${offering.slug}` as any}
      >
        <ServiceLogo
          className="shrink-0"
          service={offering as unknown as ServiceConfig}
          size={18}
        />
        <div className="min-w-0">
          <span className="font-medium text-sm leading-tight">
            {offering.name}
          </span>
          <p className="mt-0.5 line-clamp-1 text-muted-foreground text-xs leading-snug">
            {offering.tagline}
          </p>
        </div>
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
      <p className="mb-1.5 px-2 font-medium text-[11px] text-muted-foreground/70">
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
    <div className="w-[620px]">
      <div className="max-h-[70vh] overflow-y-auto">
        {/* Core services */}
        <div className="px-3 pt-3 pb-2">
          <p className="mb-1.5 px-2 font-medium text-[11px] text-muted-foreground/70">
            Our services
          </p>
          <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            {offeringsConfig
              .filter(
                (o) =>
                  ![
                    "website-migration",
                    "api-development",
                    "startup-development",
                  ].includes(o.slug)
              )
              .map((o) => (
                <OfferingNavItem key={o.slug} offering={o} />
              ))}
          </div>
        </div>

        {/* Specialist services */}
        <div className="border-border border-t px-3 pt-2 pb-2">
          <p className="mb-1.5 px-2 font-medium text-[11px] text-muted-foreground/70">
            Specialist
          </p>
          <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            {offeringsConfig
              .filter((o) =>
                [
                  "website-migration",
                  "api-development",
                  "startup-development",
                ].includes(o.slug)
              )
              .map((o) => (
                <OfferingNavItem key={o.slug} offering={o} />
              ))}
          </div>
        </div>

        {/* Tech stack — framed card */}
        <div className="rounded-t-lg border-border border-x border-t bg-muted/30 p-3">
          <div className="columns-3 gap-x-4">
            {[
              {
                label: "Frontend",
                services: frontendServices.slice(0, 8),
              },
              { label: "Full Stack", services: fullStackServices },
              { label: "Desktop", services: desktopServices },
              {
                label: "Frontend Libraries",
                services: frontendServices.slice(8),
              },
              { label: "Auth", services: authServices },
              { label: "Payments", services: paymentsServices },
              { label: "Backend", services: backendServices.slice(0, 8) },
              { label: "APIs & Runtime", services: backendServices.slice(8) },
              { label: "Mobile", services: mobileServices },
              { label: "Database", services: databaseServices },
              { label: "CMS", services: cmsServices },
              { label: "Design", services: designServices },
              { label: "Tooling & DevOps", services: toolingServices },
            ].map((group) => (
              <div className="mb-3 break-inside-avoid" key={group.label}>
                <Column label={group.label} services={group.services} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
