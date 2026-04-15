"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Logo } from "@/components/logo";
import { ServiceLogo } from "@/components/services/service-logo";
import { FadeIn } from "@/components/ui/fade-in";
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

const links = [
  { title: "Manifesto", href: "/manifesto" },
  { title: "Brand Story", href: "/story" },
  {
    title: "Careers",
    href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
  },
  {
    title: "Brand Kit",
    href: "https://amajor.notion.site/7917e0bbe55683feb1bb019132b83c9d?v=5b97e0bbe55682e09fc308819305d413",
  },
];

function FooterServiceLink({ service }: { service: ServiceConfig }) {
  return (
    <Link
      className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      href={`/services/${service.slug}` as any}
    >
      <ServiceLogo service={service} size={14} />
      <span>{service.name}</span>
    </Link>
  );
}

function FooterColumn({
  title,
  services,
}: {
  title: string;
  services: ServiceConfig[];
}) {
  return (
    <div>
      <h4 className="mb-4 font-semibold">{title}</h4>
      <div className="space-y-2 text-sm">
        {services.map((s) => (
          <FooterServiceLink key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-border border-t border-dashed bg-background pt-10 pb-28 md:pt-14 md:pb-48">
      {/* Giant watermark text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 flex select-none justify-center overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          className="whitespace-nowrap bg-gradient-to-b from-primary/6 to-transparent bg-clip-text font-bold text-transparent leading-none tracking-tighter"
          style={{
            fontSize: "clamp(7rem, 22vw, 30rem)",
            transform: "translateY(40%)",
            WebkitTextStroke: "8px hsl(var(--foreground) / 0.45)",
            textShadow:
              "3px 3px 0 hsl(var(--foreground)/0.22), 6px 6px 0 hsl(var(--foreground)/0.18), 9px 9px 0 hsl(var(--foreground)/0.14), 12px 12px 0 hsl(var(--foreground)/0.10), 15px 15px 0 hsl(var(--foreground)/0.07), 18px 18px 0 hsl(var(--foreground)/0.04)",
          }}
        >
          amajor
        </span>
      </div>
      <div className="relative mx-auto max-w-5xl px-6" style={{ zIndex: 1 }}>
        {/* Brand */}
        <div className="mb-12 space-y-4">
          <h3 className="font-semibold text-xl">A Major</h3>
          <p className="max-w-md text-muted-foreground">
            Singapore-based software agency specialising in web design, software
            development, and digital solutions for businesses.
          </p>
        </div>

        {/* Services columns with logos */}
        <FadeIn delay={0.1} duration={0.4}>
          <div className="mb-12 columns-2 gap-x-8 sm:columns-3 md:columns-4 lg:columns-5">
            {[
              {
                title: "Our Services",
                services: offeringsConfig as ServiceConfig[],
              },
              { title: "Frontend", services: frontendServices },
              { title: "Full Stack", services: fullStackServices },
              { title: "Backend", services: backendServices },
              { title: "Database", services: databaseServices },
              { title: "Tooling & DevOps", services: toolingServices },
              { title: "Mobile", services: mobileServices },
              { title: "Auth", services: authServices },
              { title: "Payments", services: paymentsServices },
              { title: "Desktop", services: desktopServices },
              { title: "Design", services: designServices },
              { title: "CMS", services: cmsServices },
            ].map((group) => (
              <div className="mb-6 break-inside-avoid" key={group.title}>
                <FooterColumn services={group.services} title={group.title} />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Centered logo */}
        <FadeIn delay={0.12} duration={0.4}>
          <Link
            aria-label="go home"
            className="mx-auto mb-4 block size-fit"
            href="/"
          >
            <Logo />
          </Link>
        </FadeIn>

        {/* Horizontal links */}
        <FadeIn delay={0.15} duration={0.4}>
          <div className="my-8 flex flex-col flex-wrap items-center justify-center gap-4 text-sm sm:flex-row md:gap-6">
            {links.map((link) => (
              <Fragment key={link.title}>
                {link.href.startsWith("/") ? (
                  <Link
                    className="block px-2 py-1 text-center text-muted-foreground duration-150 hover:text-primary"
                    href={link.href as any}
                  >
                    <span>{link.title}</span>
                  </Link>
                ) : (
                  <a
                    className="block px-2 py-1 text-center text-muted-foreground duration-150 hover:text-primary"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{link.title}</span>
                  </a>
                )}
              </Fragment>
            ))}
          </div>
        </FadeIn>

        {/* Socials */}
        <FadeIn delay={0.2} duration={0.4}>
          <div className="my-8 flex flex-row flex-wrap items-center justify-center gap-6 md:gap-10">
            <a
              aria-label="X/Twitter"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://x.com/amajorai"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="X/Twitter - Follow A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/x.svg"
                width={16}
              />
            </a>
            <a
              aria-label="LinkedIn"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://www.linkedin.com/company/amajor"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="LinkedIn - Connect with A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/linkedin.svg"
                width={16}
              />
            </a>
          </div>
        </FadeIn>

        <div className="mt-8 mb-4 px-4 text-center text-muted-foreground text-sm">
          <span itemScope itemType="http://schema.org/Organization">
            © {new Date().getFullYear()}{" "}
            <span itemProp="name">A Major Pte. Ltd.</span>,{" "}
            <span itemProp="location">Singapore</span>. <br />
            (UEN: <span itemProp="taxID">202616096G</span>)
            <meta content="2025-01-01" itemProp="foundingDate" />
            <meta content="https://amajor.ai" itemProp="url" />
            <meta
              content="A Major is a Singapore-based software agency specialising in web design, software development, and digital solutions for businesses."
              itemProp="description"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
