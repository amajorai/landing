import { ServiceLogo } from "@/components/services/service-logo";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { type ServiceConfig, servicesConfig } from "@/lib/services-config";
import { FeatureCards } from "./feature-cards";
import { ServiceCta } from "./service-cta";
import { SubTechCard } from "./sub-tech-card";
import { AstroVisualization } from "./visualizations/astro-visualization";
import { BetterAuthVisualization } from "./visualizations/better-auth-visualization";
import { BlazorVisualization } from "./visualizations/blazor-visualization";
import { BootstrapVisualization } from "./visualizations/bootstrap-visualization";
import { ClerkVisualization } from "./visualizations/clerk-visualization";
import { CliVisualization } from "./visualizations/cli-visualization";
import { CloudflareD1Visualization } from "./visualizations/cloudflare-d1-visualization";
import { CloudflareWorkersVisualization } from "./visualizations/cloudflare-workers-visualization";
import { ConvexVisualization } from "./visualizations/convex-visualization";
import { DjangoVisualization } from "./visualizations/django-visualization";
import { DockerVisualization } from "./visualizations/docker-visualization";
import { DotnetMvcVisualization } from "./visualizations/dotnet-mvc-visualization";
import { DotnetVisualization } from "./visualizations/dotnet-visualization";
import { DrizzleVisualization } from "./visualizations/drizzle-visualization";
import { ElectronVisualization } from "./visualizations/electron-visualization";
import { ElysiaVisualization } from "./visualizations/elysia-visualization";
import { ExpressVisualization } from "./visualizations/express-visualization";
import { FastapiVisualization } from "./visualizations/fastapi-visualization";
import { FastifyVisualization } from "./visualizations/fastify-visualization";
import { FlutterVisualization } from "./visualizations/flutter-visualization";
import { FumadocsVisualization } from "./visualizations/fumadocs-visualization";
import { KotlinVisualization } from "./visualizations/kotlin-visualization";
import { LaravelVisualization } from "./visualizations/laravel-visualization";
import { McpVisualization } from "./visualizations/mcp-visualization";
import { MongodbVisualization } from "./visualizations/mongodb-visualization";
import { MongooseVisualization } from "./visualizations/mongoose-visualization";
import { MysqlVisualization } from "./visualizations/mysql-visualization";
import { NextjsVisualization } from "./visualizations/nextjs-visualization";
import { NodejsVisualization } from "./visualizations/nodejs-visualization";
import { NuxtVisualization } from "./visualizations/nuxt-visualization";
import { NxVisualization } from "./visualizations/nx-visualization";
import { OrpcVisualization } from "./visualizations/orpc-visualization";
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
import { UnistylesVisualization } from "./visualizations/unistyles-visualization";
import { VueVisualization } from "./visualizations/vue-visualization";
import { WasmVisualization } from "./visualizations/wasm-visualization";
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
};

const categoryLabel: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  desktop: "Desktop",
  design: "Design",
  cms: "CMS",
  tooling: "Tooling",
};

interface TechPageLayoutProps {
  service: ServiceConfig;
}

export function TechPageLayout({ service }: TechPageLayoutProps) {
  const Visualization = vizMap[service.visualizationKey] ?? null;

  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <FadeIn>
        <section className="space-y-8 py-8">
          {/* Visualization above header */}
          {Visualization && (
            <div className="mb-20 h-[200px] w-full lg:h-[260px]">
              <Visualization />
            </div>
          )}

          {/* Eyebrow: logo + category badge */}
          <div className="flex items-center gap-3">
            <ServiceLogo service={service} size={28} />
            <span className="rounded-full border border-border px-3 py-1 font-mono text-muted-foreground text-xs uppercase tracking-wider">
              {categoryLabel[service.category] ?? service.category}
            </span>
          </div>

          {/* Page header */}
          <PageHeader line1={service.name} line2={service.tagline} />

          {/* Description */}
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Feature cards */}
          <FeatureCards features={service.features} />
        </section>
      </FadeIn>

      {/* Sub-tech cards */}
      {service.subTechs.length > 0 && (
        <FadeIn>
          <section>
            <h2 className="mb-6 font-semibold text-xl">Related technologies</h2>
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

      {/* CTA */}
      <FadeIn>
        <ServiceCta techName={service.name} />
      </FadeIn>
    </div>
  );
}
