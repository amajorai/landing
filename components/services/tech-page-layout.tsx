import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { MobileTocSheet } from "@/components/blog/MobileTocSheet";
import type { TocHeading } from "@/components/notion/TableOfContents";
import { TableOfContents } from "@/components/notion/TableOfContents";
import { ServiceLogo } from "@/components/services/service-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { type ServiceConfig, servicesConfig } from "@/lib/services-config";
import { FeatureCards } from "./feature-cards";
import { QuickstartBlock } from "./quickstart-block";
import { ServiceCta } from "./service-cta";
import { SubTechCard } from "./sub-tech-card";
import { AstroVisualization } from "./visualizations/astro-visualization";
import { BetterAuthVisualization } from "./visualizations/better-auth-visualization";
import { BlazorVisualization } from "./visualizations/blazor-visualization";
import { BootstrapVisualization } from "./visualizations/bootstrap-visualization";
import { BrowserExtensionsVisualization } from "./visualizations/browser-extensions-visualization";
import { ClerkVisualization } from "./visualizations/clerk-visualization";
import { CliVisualization } from "./visualizations/cli-visualization";
import { CloudflareD1Visualization } from "./visualizations/cloudflare-d1-visualization";
import { CloudflareWorkersVisualization } from "./visualizations/cloudflare-workers-visualization";
import { ConsultancyVisualization } from "./visualizations/consultancy-visualization";
import { ConvexVisualization } from "./visualizations/convex-visualization";
import { DevopsVisualization } from "./visualizations/devops-visualization";
import { DigitalTransformationVisualization } from "./visualizations/digital-transformation-visualization";
import { DjangoVisualization } from "./visualizations/django-visualization";
import { DockerVisualization } from "./visualizations/docker-visualization";
import { DotnetMvcVisualization } from "./visualizations/dotnet-mvc-visualization";
import { DotnetVisualization } from "./visualizations/dotnet-visualization";
import { DrizzleVisualization } from "./visualizations/drizzle-visualization";
import { ElectronVisualization } from "./visualizations/electron-visualization";
import { ElysiaVisualization } from "./visualizations/elysia-visualization";
import { EnterpriseSystemsVisualization } from "./visualizations/enterprise-systems-visualization";
import { ExpressVisualization } from "./visualizations/express-visualization";
import { FastapiVisualization } from "./visualizations/fastapi-visualization";
import { FastifyVisualization } from "./visualizations/fastify-visualization";
import { FlutterVisualization } from "./visualizations/flutter-visualization";
import { FullDeploymentVisualization } from "./visualizations/full-deployment-visualization";
import { FumadocsVisualization } from "./visualizations/fumadocs-visualization";
import { KotlinVisualization } from "./visualizations/kotlin-visualization";
import { LaravelVisualization } from "./visualizations/laravel-visualization";
import { LegacyModernisationVisualization } from "./visualizations/legacy-modernisation-visualization";
import { McpVisualization } from "./visualizations/mcp-visualization";
import { MobileAppsVisualization } from "./visualizations/mobile-apps-visualization";
import { MongodbVisualization } from "./visualizations/mongodb-visualization";
import { MongooseVisualization } from "./visualizations/mongoose-visualization";
import { MvpScopingVisualization } from "./visualizations/mvp-scoping-visualization";
import { MysqlVisualization } from "./visualizations/mysql-visualization";
import { NextjsVisualization } from "./visualizations/nextjs-visualization";
import { NodejsVisualization } from "./visualizations/nodejs-visualization";
import { NuxtVisualization } from "./visualizations/nuxt-visualization";
import { NxVisualization } from "./visualizations/nx-visualization";
import { OrpcVisualization } from "./visualizations/orpc-visualization";
import { PerformanceOptimizationVisualization } from "./visualizations/performance-optimization-visualization";
import { PhpVisualization } from "./visualizations/php-visualization";
import { PlanetscaleVisualization } from "./visualizations/planetscale-visualization";
import { PolarVisualization } from "./visualizations/polar-visualization";
import { PostgresqlVisualization } from "./visualizations/postgresql-visualization";
import { PrismaVisualization } from "./visualizations/prisma-visualization";
import { PwaVisualization } from "./visualizations/pwa-visualization";
import { PythonVisualization } from "./visualizations/python-visualization";
import { ReactNativeVisualization } from "./visualizations/react-native-visualization";
import { ReactRouterVisualization } from "./visualizations/react-router-visualization";
import { ReactVisualization } from "./visualizations/react-visualization";
import { RestApiVisualization } from "./visualizations/rest-api-visualization";
import { RustVisualization } from "./visualizations/rust-visualization";
import { S3Visualization } from "./visualizations/s3-visualization";
import { SaasProductsVisualization } from "./visualizations/saas-products-visualization";
import { SeoOptimizationVisualization } from "./visualizations/seo-optimization-visualization";
import { ShadcnVisualization } from "./visualizations/shadcn-visualization";
import { SolidJsVisualization } from "./visualizations/solidjs-visualization";
import { SqliteVisualization } from "./visualizations/sqlite-visualization";
import { StarlightVisualization } from "./visualizations/starlight-visualization";
import { StripeVisualization } from "./visualizations/stripe-visualization";
import { SupabaseVisualization } from "./visualizations/supabase-visualization";
import { SvelteVisualization } from "./visualizations/svelte-visualization";
import { SveltekitVisualization } from "./visualizations/sveltekit-visualization";
import { SwiftVisualization } from "./visualizations/swift-visualization";
import { TailwindVisualization } from "./visualizations/tailwind-visualization";
import { TanstackRouterVisualization } from "./visualizations/tanstack-router-visualization";
import { TanstackStartVisualization } from "./visualizations/tanstack-start-visualization";
import { TanstackVisualization } from "./visualizations/tanstack-visualization";
import { TauriVisualization } from "./visualizations/tauri-visualization";
import { TrpcVisualization } from "./visualizations/trpc-visualization";
import { TuiVisualization } from "./visualizations/tui-visualization";
import { TurborepoVisualization } from "./visualizations/turborepo-visualization";
import { UiUxDesignVisualization } from "./visualizations/ui-ux-design-visualization";
import { UnistylesVisualization } from "./visualizations/unistyles-visualization";
import { VueVisualization } from "./visualizations/vue-visualization";
import { WasmVisualization } from "./visualizations/wasm-visualization";
import { WebAppsVisualization } from "./visualizations/web-apps-visualization";
import { WebDesignVisualization } from "./visualizations/web-design-visualization";
import { WhiteLabelVisualization } from "./visualizations/white-label-visualization";
import { WoocommerceVisualization } from "./visualizations/woocommerce-visualization";
import { WordpressVisualization } from "./visualizations/wordpress-visualization";

const vizMap: Record<string, React.ComponentType> = {
  react: ReactVisualization,
  dotnet: DotnetVisualization,
  laravel: LaravelVisualization,
  wordpress: WordpressVisualization,
  python: PythonVisualization,
  vue: VueVisualization,
  solidjs: SolidJsVisualization,
  nextjs: NextjsVisualization,
  "react-native": ReactNativeVisualization,
  nuxt: NuxtVisualization,
  astro: AstroVisualization,
  svelte: SvelteVisualization,
  sveltekit: SveltekitVisualization,
  "cloudflare-r2": CloudflareWorkersVisualization,
  tanstack: TanstackVisualization,
  kotlin: KotlinVisualization,
  swift: SwiftVisualization,
  rust: RustVisualization,
  turborepo: TurborepoVisualization,
  nx: NxVisualization,
  tauri: TauriVisualization,
  "cloudflare-workers": CloudflareWorkersVisualization,
  nodejs: NodejsVisualization,
  express: ExpressVisualization,
  fastify: FastifyVisualization,
  elysia: ElysiaVisualization,
  trpc: TrpcVisualization,
  convex: ConvexVisualization,
  drizzle: DrizzleVisualization,
  prisma: PrismaVisualization,
  postgresql: PostgresqlVisualization,
  mongodb: MongodbVisualization,
  sqlite: SqliteVisualization,
  mongoose: MongooseVisualization,
  django: DjangoVisualization,
  fastapi: FastapiVisualization,
  php: PhpVisualization,
  "better-auth": BetterAuthVisualization,
  tailwind: TailwindVisualization,
  shadcn: ShadcnVisualization,
  clerk: ClerkVisualization,
  fumadocs: FumadocsVisualization,
  polar: PolarVisualization,
  woocommerce: WoocommerceVisualization,
  starlight: StarlightVisualization,
  electron: ElectronVisualization,
  stripe: StripeVisualization,
  bootstrap: BootstrapVisualization,
  blazor: BlazorVisualization,
  "react-router": ReactRouterVisualization,
  "tanstack-router": TanstackRouterVisualization,
  "tanstack-start": TanstackStartVisualization,
  pwa: PwaVisualization,
  flutter: FlutterVisualization,
  unistyles: UnistylesVisualization,
  orpc: OrpcVisualization,
  "rest-api": RestApiVisualization,
  wasm: WasmVisualization,
  "dotnet-mvc": DotnetMvcVisualization,
  supabase: SupabaseVisualization,
  planetscale: PlanetscaleVisualization,
  "cloudflare-d1": CloudflareD1Visualization,
  mysql: MysqlVisualization,
  docker: DockerVisualization,
  s3: S3Visualization,
  cli: CliVisualization,
  tui: TuiVisualization,
  mcp: McpVisualization,
  "web-design": WebDesignVisualization,
  "web-apps": WebAppsVisualization,
  "mobile-apps": MobileAppsVisualization,
  "browser-extensions": BrowserExtensionsVisualization,
  "enterprise-systems": EnterpriseSystemsVisualization,
  "saas-products": SaasProductsVisualization,
  "ui-ux-design": UiUxDesignVisualization,
  devops: DevopsVisualization,
  "performance-optimization": PerformanceOptimizationVisualization,
  "mvp-scoping": MvpScopingVisualization,
  "legacy-modernisation": LegacyModernisationVisualization,
  "digital-transformation": DigitalTransformationVisualization,
  "white-label": WhiteLabelVisualization,
  "seo-optimization": SeoOptimizationVisualization,
  "full-deployment": FullDeploymentVisualization,
  consultancy: ConsultancyVisualization,
};

const categoryLabel: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  desktop: "Desktop",
  design: "Design",
  cms: "CMS",
  tooling: "Tooling",
  database: "Database",
  auth: "Auth",
  payments: "Payments",
  offering: "Service",
};

const linkTypeIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  docs: BookOpen,
  tutorial: GraduationCap,
  community: Users,
  tool: Wrench,
};

interface TechPageLayoutProps {
  service: ServiceConfig;
}

function buildTocHeadings(service: ServiceConfig): TocHeading[] {
  const isOffering = service.pageType === "offering";
  const headings: TocHeading[] = [
    { id: "overview", text: "Overview", level: 1 },
  ];

  if (service.challenges && service.challenges.length > 0) {
    const label =
      service.pageType === "cms"
        ? "Common problems"
        : isOffering
          ? "Challenges we solve"
          : "Why it's hard";
    headings.push({ id: "challenges", text: label, level: 1 });
  }
  if (service.bestPractices && service.bestPractices.length > 0)
    headings.push({ id: "best-practices", text: "Best practices", level: 1 });
  if (service.usefulLinks && service.usefulLinks.length > 0)
    headings.push({
      id: "useful-resources",
      text: "Useful resources",
      level: 1,
    });
  if (service.faq && service.faq.length > 0)
    headings.push({ id: "faq", text: "FAQ", level: 1 });
  if (service.subTechs.length > 0)
    headings.push({
      id: "related-technologies",
      text: "Related technologies",
      level: 1,
    });

  return headings;
}

export function TechPageLayout({ service }: TechPageLayoutProps) {
  const isOffering = service.pageType === "offering";
  const Visualization = vizMap[service.visualizationKey] ?? null;
  const challengesHeading =
    service.pageType === "cms"
      ? "Common problems"
      : isOffering
        ? "Challenges we solve"
        : "Why it's hard";

  const tocHeadings = buildTocHeadings(service);

  return (
    <div className="mx-auto max-w-4xl space-y-16">
      {tocHeadings.length > 1 && (
        <div className="fixed top-0 right-6 hidden h-screen w-64 items-center xl:flex">
          <TableOfContents headings={tocHeadings} />
        </div>
      )}
      {tocHeadings.length > 1 && <MobileTocSheet headings={tocHeadings} />}

      <FadeIn>
        <section className="space-y-8" id="overview">
          {Visualization && (
            <div className="mb-20 h-[200px] w-full lg:h-[260px]">
              <Visualization />
            </div>
          )}

          <ServiceLogo service={service} size={40} />

          <PageHeader
            line1={service.name}
            line2={service.tagline}
            tag={
              <span className="relative -top-px inline-block rounded-full border border-border px-2 py-0.5 align-middle font-normal text-muted-foreground text-xs">
                {categoryLabel[service.category] ?? service.category}
              </span>
            }
          />

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-muted-foreground/60 text-xs"
          >
            <Link className="transition-colors hover:text-foreground" href="/">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              className="transition-colors hover:text-foreground"
              href="/services"
            >
              Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-muted-foreground">{service.name}</span>
          </nav>

          <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>{service.description}</p>
            {service.overview && <p>{service.overview}</p>}
          </div>

          {/* Quickstart */}
          {service.quickstart && (
            <QuickstartBlock
              code={service.quickstart}
              docsUrl={service.docsUrl}
              language={service.quickstartLang}
            />
          )}

          <FeatureCards features={service.features} />
        </section>
      </FadeIn>

      {/* Challenges — full bleed */}
      {service.challenges && service.challenges.length > 0 && (
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl" id="challenges">
              {challengesHeading}
            </h2>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              {service.challenges.map((challenge) => (
                <div
                  className="border-border border-r border-b border-dashed p-6"
                  key={challenge.title}
                >
                  <div className="mb-2 flex items-center gap-4">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                    <h3 className="font-medium text-sm">{challenge.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Best practices — full bleed */}
      {service.bestPractices && service.bestPractices.length > 0 && (
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl" id="best-practices">
              Best practices
            </h2>
            <div className="border-border border-t border-dashed">
              {service.bestPractices.map((bp) => (
                <div
                  className="border-border border-b border-dashed p-6"
                  key={bp.tip}
                >
                  <div className="mb-1 flex items-center gap-4">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <h3 className="font-medium text-sm">{bp.tip}</h3>
                  </div>
                  {bp.detail && (
                    <p className="ml-8 text-muted-foreground text-sm leading-relaxed">
                      {bp.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Useful links — full bleed */}
      {service.usefulLinks && service.usefulLinks.length > 0 && (
        <FadeIn>
          <section className="-mx-6">
            <h2
              className="mb-6 px-6 font-semibold text-xl"
              id="useful-resources"
            >
              Useful resources
            </h2>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
              {service.usefulLinks.map((link) => {
                const Icon = linkTypeIcon[link.type] ?? Lightbulb;
                return (
                  <a
                    className="group flex items-center gap-4 border-border border-r border-b border-dashed p-5 transition-colors hover:bg-muted/30"
                    href={link.url}
                    key={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 font-medium text-sm">
                      {link.title}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* FAQ — full bleed */}
      {service.faq && service.faq.length > 0 && (
        <FadeIn>
          <section className="-mx-6">
            <h2 className="mb-6 px-6 font-semibold text-xl" id="faq">
              Frequently asked questions
            </h2>
            <div className="border-border border-y border-dashed">
              <div className="px-6 py-6">
                <Accordion className="w-full" collapsible type="single">
                  {service.faq.map((item, i) => (
                    <div className="group" key={i}>
                      <AccordionItem
                        className="border-none px-0 py-1"
                        value={`faq-${i}`}
                      >
                        <AccordionTrigger className="cursor-pointer font-semibold text-base hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      {i < service.faq!.length - 1 && (
                        <hr className="border-dashed" />
                      )}
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Sub-tech cards */}
      {service.subTechs.length > 0 && (
        <FadeIn>
          <section>
            <h2
              className="mb-6 font-semibold text-xl"
              id="related-technologies"
            >
              Related technologies
            </h2>
            <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2 lg:grid-cols-3">
              {service.subTechs.map((sub) => {
                const relatedService = servicesConfig.find(
                  (s) => s.slug === sub.slug
                );
                return (
                  <SubTechCard
                    key={sub.slug}
                    service={relatedService}
                    subTech={sub}
                  />
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* CTA — full bleed to edges and bottom */}
      <FadeIn>
        <div className="-mx-6 -mb-16">
          <ServiceCta techName={service.name} />
        </div>
      </FadeIn>
    </div>
  );
}
