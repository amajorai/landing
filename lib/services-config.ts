export type ServiceCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "desktop"
  | "design"
  | "cms"
  | "tooling"
  | "database"
  | "auth"
  | "payments";

export interface SubTech {
  slug: string;
}

export interface ServiceFeature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface ServiceConfig {
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  accentColor: string;
  visualizationKey: string;
  logo: string | null; // path under /logos/services/ (light mode)
  logoDark?: string | null; // alternate path for dark mode
  logoDarkInvert?: boolean; // invert light logo on dark mode instead of swapping
  lucideIcon?: string; // Lucide icon name used when logo is null
  features: ServiceFeature[];
  subTechs: SubTech[];
}

export const servicesConfig: ServiceConfig[] = [
  // ─── FRONTEND ───────────────────────────────────────────────────
  {
    slug: "react",
    name: "React",
    category: "frontend",
    tagline: "Fast, interactive UIs that users love",
    description:
      "We build production-grade React applications — from marketing sites to complex SaaS dashboards. Our team works with the full React ecosystem including Next.js for server-side rendering and React Native for mobile.",
    accentColor: "sky",
    visualizationKey: "react",
    logo: "/logos/services/react_dark.svg",
    features: [
      {
        icon: "Server",
        title: "Server components & streaming",
        description:
          "Next.js App Router with React Server Components for faster initial loads and seamless server-to-client data flow.",
      },
      {
        icon: "Code2",
        title: "TypeScript-first",
        description:
          "Strict typing across your entire codebase — no implicit any, no surprises in production.",
      },
      {
        icon: "Zap",
        title: "Real-time data sync",
        description:
          "Optimistic UI updates, WebSocket subscriptions, and query invalidation for data that feels instant.",
      },
      {
        icon: "Accessibility",
        title: "Accessible by default",
        description:
          "Component systems built to WCAG 2.1 AA — keyboard navigation, screen reader semantics, focus management.",
      },
      {
        icon: "Gauge",
        title: "Core Web Vitals in green",
        description:
          "Performance budgets enforced in CI — LCP, CLS, and INP measured and kept within targets.",
      },
      {
        icon: "GitBranch",
        title: "CI/CD with visual regression",
        description:
          "Automated pipelines that catch UI regressions before they reach your users.",
      },
    ],
    subTechs: [
      {
        slug: "nextjs",
      },
      {
        slug: "react-native",
      },
      {
        slug: "tailwind",
      },
      {
        slug: "trpc",
      },
    ],
  },
  {
    slug: "vue",
    name: "Vue",
    category: "frontend",
    tagline: "Progressive framework, delightful developer experience",
    description:
      "Vue 3 is the progressive JavaScript framework — adopt it incrementally into an existing project or build greenfield SPAs with the Composition API, Pinia, and Vite. Pair with Nuxt for full-stack capability.",
    accentColor: "emerald",
    visualizationKey: "vue",
    logo: "/logos/services/vue.svg",
    features: [
      {
        icon: "Code2",
        title: "Composition API",
        description:
          "Vue 3 Composition API with full TypeScript support for composables that are a joy to reuse.",
      },
      {
        icon: "Database",
        title: "Pinia state management",
        description:
          "Type-safe, modular stores with Pinia — no more Vuex boilerplate, full DevTools support.",
      },
      {
        icon: "Component",
        title: "Single File Components",
      },
      {
        icon: "Zap",
        title: "Vite-powered dev server",
      },
      {
        icon: "RefreshCw",
        title: "Vue Query integration",
        description:
          "Async data fetching, caching, and background refetching patterns that keep your UI consistent without manual loading state.",
      },
      {
        icon: "Monitor",
        title: "Vue DevTools",
        description:
          "Browser extension and standalone devtools to inspect component tree, props, events, and Pinia store state in real time.",
      },
    ],
    subTechs: [
      {
        slug: "nuxt",
      },
      {
        slug: "tailwind",
      },
    ],
  },
  {
    slug: "svelte",
    name: "Svelte",
    category: "frontend",
    tagline: "Write less code. No virtual DOM. Truly reactive.",
    description:
      "Svelte is a compiler, not a framework — it transforms your components into tight, efficient vanilla JavaScript at build time. No runtime overhead, no virtual DOM, just the smallest possible output that does exactly what you wrote.",
    accentColor: "orange",
    visualizationKey: "svelte",
    logo: "/logos/services/svelte.svg",
    features: [
      {
        icon: "Zap",
        title: "Compile-time reactivity",
      },
      {
        icon: "Package",
        title: "Minimal bundle size",
      },
      {
        icon: "Wand2",
        title: "Built-in transitions & animations",
      },
      {
        icon: "Code2",
        title: "Svelte 5 runes",
      },
      {
        icon: "Component",
        title: "Scoped styles by default",
      },
      {
        icon: "Globe",
        title: "Framework-agnostic use",
      },
    ],
    subTechs: [
      {
        slug: "sveltekit",
      },
      {
        slug: "tailwind",
      },
      {
        slug: "drizzle",
      },
    ],
  },
  {
    slug: "fumadocs",
    name: "Fumadocs",
    category: "frontend",
    tagline: "Beautiful developer documentation, fast",
    description:
      "Fumadocs is our framework of choice for building modern documentation sites — full-text search, MDX authoring, versioning, and API reference pages that developers actually enjoy reading.",
    accentColor: "purple",
    visualizationKey: "fumadocs",
    logo: null,
    lucideIcon: "BookOpen",
    features: [
      {
        icon: "FileText",
        title: "MDX-powered content",
        description:
          "Write docs in Markdown with custom React components — callouts, tabs, code groups, and more.",
      },
      {
        icon: "Search",
        title: "Full-text search",
        description:
          "Built-in search with Orama or Algolia — instant results as users type, no extra backend.",
      },
      {
        icon: "FileCode2",
        title: "Auto-generated API reference",
        description:
          "Point Fumadocs at your OpenAPI spec and get a fully rendered, interactive API reference.",
      },
      {
        icon: "History",
        title: "Versioned docs",
        description:
          "Manage multiple release versions side by side — users always see the docs for their version.",
      },
      {
        icon: "Server",
        title: "Static generation",
        description:
          "Built on Next.js App Router — every page is statically generated for instant first loads.",
      },
      {
        icon: "Terminal",
        title: "Shiki syntax highlighting",
        description:
          "Server-side code highlighting with Shiki — accurate grammar, zero client-side JS cost.",
      },
    ],
    subTechs: [
      {
        slug: "nextjs",
      },
      {
        slug: "react",
      },
    ],
  },

  // ─── CMS ────────────────────────────────────────────────────────
  {
    slug: "wordpress",
    name: "WordPress",
    category: "cms",
    tagline: "Content-driven sites your team can actually manage",
    description:
      "We build custom WordPress sites that go far beyond themes — bespoke Gutenberg block libraries, headless WP with Next.js frontends, and WooCommerce stores optimized for conversion.",
    accentColor: "blue",
    visualizationKey: "wordpress",
    logo: "/logos/services/wordpress.svg",
    features: [
      {
        icon: "Blocks",
        title: "Custom Gutenberg blocks",
        description:
          "Bespoke React-powered blocks that editors love — your brand, your layout options, no theme limitations.",
      },
      {
        icon: "Link",
        title: "Headless WordPress",
        description:
          "WP as a content API with a Next.js or Astro frontend — best-of-both for editorial flexibility and frontend performance.",
      },
      {
        icon: "ShoppingCart",
        title: "WooCommerce stores",
        description:
          "Custom checkout flows, product configurators, and payment gateways built for your business model.",
      },
      {
        icon: "Layout",
        title: "ACF Pro field groups",
        description:
          "Structured content editing with Advanced Custom Fields — editors fill in forms, not raw HTML.",
      },
      {
        icon: "Network",
        title: "WordPress Multisite",
        description:
          "Enterprise content networks with shared themes, plugins, and SSO across dozens of sites.",
      },
      {
        icon: "Gauge",
        title: "Sub-200ms TTFB",
        description:
          "Full-page caching with object cache, CDN, and image optimisation — fast for every visitor.",
      },
    ],
    subTechs: [
      {
        slug: "woocommerce",
      },
      {
        slug: "php",
      },
      {
        slug: "react",
      },
    ],
  },

  // ─── DESIGN ─────────────────────────────────────────────────────
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    category: "design",
    tagline: "Design systems that scale with your product",
    description:
      "We build design systems and component libraries using Tailwind CSS — from token foundations to fully documented UI kits that your team can extend without asking a designer for every change.",
    accentColor: "cyan",
    visualizationKey: "tailwind",
    logo: "/logos/services/tailwindcss.svg",
    features: [
      {
        icon: "Paintbrush",
        title: "Design token architecture",
        description:
          "Color, spacing, typography, and shadow tokens defined once, used everywhere — in code and Figma.",
      },
      {
        icon: "Code2",
        title: "Tailwind v4 with CSS vars",
        description:
          "CSS-native custom properties via Tailwind v4 — theming with zero JavaScript overhead.",
      },
      {
        icon: "Component",
        title: "shadcn/ui component library",
        description:
          "Unstyled, accessible Radix primitives customised to match your brand, extended with your logic.",
      },
      {
        icon: "Moon",
        title: "Dark mode & theming",
        description:
          "System-aware dark mode, custom brand themes, and motion preference support built in from day one.",
      },
      {
        icon: "BookOpen",
        title: "Storybook documentation",
        description:
          "Every component documented, with usage examples, prop tables, and accessibility annotations.",
      },
      {
        icon: "PenTool",
        title: "Figma ↔ code handoff",
        description:
          "Token sync between Figma and your codebase — design changes propagate to code, not just mockups.",
      },
    ],
    subTechs: [
      {
        slug: "shadcn",
      },
      {
        slug: "react",
      },
      {
        slug: "nextjs",
      },
    ],
  },

  // ─── BACKEND ────────────────────────────────────────────────────
  {
    slug: "dotnet",
    name: ".NET",
    category: "backend",
    tagline: "Enterprise-grade backends built to last",
    description:
      "We design and build .NET APIs, microservices, and background workers — architected for correctness, performance, and long-term maintainability. From greenfield systems to legacy modernisation.",
    accentColor: "violet",
    visualizationKey: "dotnet",
    logo: "/logos/services/csharp.svg",
    features: [
      {
        icon: "Server",
        title: "ASP.NET Core APIs",
        description:
          "RESTful and minimal APIs with OpenAPI documentation, versioning, and built-in rate limiting.",
      },
      {
        icon: "Layers",
        title: "Clean Architecture & DDD",
        description:
          "Domain-Driven Design with clear boundaries — your business logic stays independent of frameworks.",
      },
      {
        icon: "Database",
        title: "Entity Framework Core",
        description:
          "Typed queries, migrations, and optimised loading patterns — no N+1 queries reaching your database.",
      },
      {
        icon: "MessageSquare",
        title: "SignalR real-time",
        description:
          "Bi-directional WebSocket communication for live dashboards, notifications, and collaborative features.",
      },
      {
        icon: "Timer",
        title: "Background services",
        description:
          "Hangfire or hosted worker services for scheduled jobs, event processing, and async workflows.",
      },
      {
        icon: "CloudUpload",
        title: "Azure-native deployment",
        description:
          "Containerised workloads on Azure App Service, Container Apps, or AKS — with managed identity and Key Vault.",
      },
    ],
    subTechs: [
      {
        slug: "dotnet-mvc",
      },
      {
        slug: "blazor",
      },
      {
        slug: "postgresql",
      },
    ],
  },
  {
    slug: "laravel",
    name: "Laravel",
    category: "backend",
    tagline: "Elegant PHP backends shipped fast",
    description:
      "Laravel lets us move quickly without compromising on quality. We build REST APIs, admin panels, and full-stack applications using Laravel's rich ecosystem — queues, events, broadcasting, and more.",
    accentColor: "red",
    visualizationKey: "laravel",
    logo: "/logos/services/laravel.svg",
    features: [
      {
        icon: "Globe",
        title: "RESTful APIs with auth",
        description:
          "Sanctum or Passport for token and session-based auth — SPA, mobile, and third-party API access covered.",
      },
      {
        icon: "Database",
        title: "Eloquent ORM",
        description:
          "Expressive relationships, eager loading, and query scopes — readable code that maps cleanly to your schema.",
      },
      {
        icon: "Workflow",
        title: "Queue workers",
        description:
          "Redis-backed job queues for async email, notifications, webhooks, and anything that shouldn't block a request.",
      },
      {
        icon: "Zap",
        title: "Livewire reactive UIs",
        description:
          "Full-page and component-level reactivity without leaving PHP — great for admin tools and internal apps.",
      },
      {
        icon: "Layout",
        title: "Filament admin panels",
        description:
          "Beautiful, fully-featured admin panels built with Filament in days — tables, forms, charts, actions.",
      },
      {
        icon: "FlaskConical",
        title: "Pest PHP test suites",
        description:
          "Expressive, readable tests with Pest — unit, feature, and browser tests in CI on every push.",
      },
    ],
    subTechs: [
      {
        slug: "php",
      },
      {
        slug: "mysql",
      },
      {
        slug: "postgresql",
      },
    ],
  },
  {
    slug: "python",
    name: "Python",
    category: "backend",
    tagline: "Data pipelines, APIs, and AI integrations",
    description:
      "From FastAPI microservices to data engineering pipelines and LLM integrations, we use Python wherever it shines. Rapid prototyping to production-hardened services.",
    accentColor: "yellow",
    visualizationKey: "python",
    logo: "/logos/services/python.svg",
    features: [
      {
        icon: "Zap",
        title: "FastAPI async services",
        description:
          "Async I/O, automatic OpenAPI docs, and Pydantic validation — high-throughput APIs with minimal code.",
      },
      {
        icon: "Server",
        title: "Django REST Framework",
        description:
          "Feature-complete backends with viewsets, serialisers, and permissions for content-heavy applications.",
      },
      {
        icon: "BarChart2",
        title: "Data pipelines",
        description:
          "ETL and ELT workflows with Pandas, Polars, or dbt — from raw sources to clean analytical models.",
      },
      {
        icon: "Brain",
        title: "LLM integrations",
        description:
          "Anthropic, OpenAI, and LangChain integrations — RAG pipelines, agents, and structured output.",
      },
      {
        icon: "Cpu",
        title: "ML model serving",
        description:
          "Model inference endpoints with sub-50ms latency using FastAPI, BentoML, or Ray Serve.",
      },
      {
        icon: "Layers",
        title: "Celery task queues",
        description:
          "Distributed async task processing with Celery and Redis or RabbitMQ — retries, priorities, scheduling.",
      },
    ],
    subTechs: [
      {
        slug: "django",
      },
      {
        slug: "fastapi",
      },
    ],
  },
  {
    slug: "nodejs",
    name: "Node.js",
    category: "backend",
    tagline: "JavaScript all the way down",
    description:
      "When your team lives in JavaScript, Node.js on the backend makes sense. We build performant APIs and real-time services with Express, Fastify, Hono, and tRPC — sharing types with your frontend.",
    accentColor: "green",
    visualizationKey: "nodejs",
    logo: "/logos/services/nodejs.svg",
    features: [
      {
        icon: "Link",
        title: "tRPC end-to-end types",
        description:
          "Full TypeScript type safety from server to client — no code generation, no schema duplication.",
      },
      {
        icon: "Zap",
        title: "Hono for edge APIs",
        description:
          "Ultra-lightweight Hono APIs that run on Cloudflare Workers, Deno Deploy, and Bun with sub-millisecond cold starts.",
      },
      {
        icon: "Database",
        title: "Prisma ORM",
        description:
          "Type-safe database queries with Prisma — schema-as-source-of-truth with auto-generated migrations.",
      },
      {
        icon: "Radio",
        title: "WebSocket & SSE",
        description:
          "Real-time event streams for live feeds, collaborative features, and server-pushed notifications.",
      },
      {
        icon: "Workflow",
        title: "BullMQ job queues",
        description:
          "Redis-backed job processing with BullMQ — delayed jobs, priorities, rate limiting, and retry strategies.",
      },
      {
        icon: "Cpu",
        title: "Bun runtime",
        description:
          "Faster startup, faster tests, and a built-in toolkit — npm-compatible with measurably better performance.",
      },
    ],
    subTechs: [
      {
        slug: "trpc",
      },
      {
        slug: "express",
      },
      {
        slug: "fastify",
      },
      {
        slug: "elysia",
      },
    ],
  },

  // ─── MOBILE ─────────────────────────────────────────────────────
  {
    slug: "kotlin",
    name: "Kotlin",
    category: "mobile",
    tagline: "Native Android apps built with modern tooling",
    description:
      "We build Android applications in Kotlin using Jetpack Compose for UI, coroutines for async work, and the full Jetpack suite for navigation, persistence, and lifecycle management.",
    accentColor: "violet",
    visualizationKey: "kotlin",
    logo: "/logos/services/kotlin.svg",
    features: [
      {
        icon: "Layout",
        title: "Jetpack Compose UI",
        description:
          "Declarative, animated UIs with Compose — reactive state, custom layouts, and fluid Material 3 transitions.",
      },
      {
        icon: "Workflow",
        title: "Coroutines + Flow",
        description:
          "Structured concurrency and reactive streams — async code that's readable, cancellable, and testable.",
      },
      {
        icon: "Database",
        title: "Room database",
        description:
          "Type-safe SQLite with Room — compile-time query verification and Flow-based reactive queries.",
      },
      {
        icon: "Puzzle",
        title: "Hilt dependency injection",
        description:
          "Hilt makes your architecture testable by design — ViewModels, repositories, and use cases all injectable.",
      },
      {
        icon: "Timer",
        title: "WorkManager",
        description:
          "Reliable background processing that survives app restarts, Doze mode, and process death.",
      },
      {
        icon: "Paintbrush",
        title: "Material Design 3",
        description:
          "Custom theming, dynamic color from wallpaper, and full M3 component support.",
      },
    ],
    subTechs: [
      {
        slug: "sqlite",
      },
    ],
  },
  {
    slug: "swift",
    name: "Swift / iOS",
    category: "mobile",
    tagline: "Native iOS and macOS experiences",
    description:
      "We develop iOS and macOS applications using Swift and SwiftUI — fully native apps that feel at home on Apple platforms, with deep system integration and App Store ready builds.",
    accentColor: "orange",
    visualizationKey: "swift",
    logo: "/logos/services/swift.svg",
    features: [
      {
        icon: "Layout",
        title: "SwiftUI with async/await",
        description:
          "Declarative UI with structured concurrency — reactive state, custom view modifiers, and smooth animations.",
      },
      {
        icon: "Workflow",
        title: "Combine framework",
        description:
          "Reactive data binding with Combine publishers — async pipelines that transform and deliver data to views.",
      },
      {
        icon: "Database",
        title: "Core Data + CloudKit",
        description:
          "Local persistence with CloudKit sync — your users' data available across all their Apple devices.",
      },
      {
        icon: "SquareDashedBottom",
        title: "WidgetKit",
        description:
          "Home screen and lock screen widgets that surface your app's key information at a glance.",
      },
      {
        icon: "Smartphone",
        title: "App Clips",
        description:
          "Lightweight instant-launch experiences — users access core functionality without installing the full app.",
      },
      {
        icon: "Play",
        title: "TestFlight distribution",
        description:
          "Beta testing with TestFlight and App Store submission — code signing, provisioning, and release management handled.",
      },
    ],
    subTechs: [
      {
        slug: "sqlite",
      },
    ],
  },

  // ─── MORE FRONTEND ──────────────────────────────────────────────
  {
    slug: "astro",
    name: "Astro",
    category: "frontend",
    tagline: "Content sites that ship zero JS by default",
    description:
      "Astro's islands architecture lets us build blazing-fast content sites — blogs, docs, marketing pages — where JavaScript only loads for the interactive parts. Perfect for SEO-critical properties.",
    accentColor: "orange",
    visualizationKey: "astro",
    logo: "/logos/services/astro-icon-dark.svg",
    features: [
      {
        icon: "Zap",
        title: "Zero JS by default",
        description:
          "Astro ships HTML and CSS only — JavaScript is opt-in per component via the island pattern.",
      },
      {
        icon: "Globe",
        title: "Content collections",
        description:
          "Type-safe content APIs for Markdown, MDX, and JSON — schema validation with Zod included.",
      },
      {
        icon: "Layers",
        title: "Framework agnostic islands",
        description:
          "Mix React, Vue, Svelte, and Solid components on the same page — each hydrates independently.",
      },
      {
        icon: "Server",
        title: "SSR & hybrid rendering",
        description:
          "Per-route rendering modes — static, server-rendered, and edge-compatible via adapters.",
      },
      {
        icon: "Search",
        title: "Built for SEO",
        description:
          "Perfect Lighthouse scores out of the box — structured data, canonical URLs, and sitemaps via integrations.",
      },
      {
        icon: "BookOpen",
        title: "Starlight docs",
        description:
          "Astro's official docs theme — full-text search, versioning, i18n, and a clean reading experience.",
      },
    ],
    subTechs: [
      {
        slug: "starlight",
      },
      {
        slug: "react",
      },
      {
        slug: "tailwind",
      },
    ],
  },
  {
    slug: "solidjs",
    name: "SolidJS",
    category: "frontend",
    tagline: "Fine-grained reactivity, truly no virtual DOM",
    description:
      "SolidJS delivers React-like developer ergonomics with genuinely better performance — no VDOM, fine-grained reactive primitives, and SolidStart for full-stack apps with SSR and file-based routing.",
    accentColor: "blue",
    visualizationKey: "solidjs",
    logo: "/logos/services/solidjs.svg",
    features: [
      {
        icon: "Zap",
        title: "Fine-grained reactivity",
        description:
          "Solid's signals update only the exact DOM nodes that changed — no component re-renders, ever.",
      },
      {
        icon: "Server",
        title: "SolidStart SSR",
        description:
          "File-based routing, server functions, and streaming SSR — the full-stack Solid experience.",
      },
      {
        icon: "Code2",
        title: "JSX without React",
        description:
          "Familiar JSX syntax that compiles to direct DOM operations — zero runtime overhead.",
      },
      {
        icon: "Gauge",
        title: "Top benchmark performance",
        description:
          "Consistently among the fastest JS frameworks in independent benchmarks — real-world and synthetic.",
      },
      {
        icon: "Component",
        title: "Primitives over abstractions",
        description:
          "Signals, effects, and memos compose naturally — build your own abstractions on solid foundations.",
      },
      {
        icon: "Package",
        title: "Tiny bundle size",
        description:
          "The Solid runtime is under 7KB gzipped — your code dominates the bundle, not the framework.",
      },
    ],
    subTechs: [
      {
        slug: "tailwind",
      },
    ],
  },
  {
    slug: "tanstack",
    name: "TanStack",
    category: "frontend",
    tagline: "Type-safe routing, data, and tables for any framework",
    description:
      "TanStack's suite of headless, framework-agnostic libraries — Router, Start, Query, Table, and Form — gives us fully type-safe, production-proven primitives we use across React, Vue, and Solid projects.",
    accentColor: "red",
    visualizationKey: "tanstack",
    logo: "/logos/services/tanstack.svg",
    features: [
      {
        icon: "Route",
        title: "TanStack Router",
        description:
          "100% type-safe routing with search params, loaders, and nested layouts — no route string guessing.",
      },
      {
        icon: "Server",
        title: "TanStack Start",
        description:
          "Full-stack React framework built on TanStack Router with server functions and SSR.",
      },
      {
        icon: "RefreshCw",
        title: "TanStack Query",
        description:
          "Async state management with caching, background refetch, optimistic updates, and infinite scroll.",
      },
      {
        icon: "Layout",
        title: "TanStack Table",
        description:
          "Headless table logic — sorting, filtering, pagination, virtualisation — fully controlled.",
      },
      {
        icon: "FileText",
        title: "TanStack Form",
        description:
          "Type-safe form state with first-class validation, async submission, and zero dependencies.",
      },
      {
        icon: "Code2",
        title: "Framework agnostic",
        description:
          "Every TanStack library works with React, Vue, Solid, Angular, and Svelte via adapters.",
      },
    ],
    subTechs: [
      {
        slug: "react",
      },
      {
        slug: "trpc",
      },
    ],
  },

  // ─── MORE BACKEND ────────────────────────────────────────────────
  {
    slug: "elysia",
    name: "Elysia",
    category: "backend",
    tagline: "Ergonomic Bun-native web framework",
    description:
      "Elysia is built specifically for Bun — an end-to-end type-safe web framework with outstanding performance, a plugin ecosystem, and a declarative API that makes building APIs genuinely enjoyable.",
    accentColor: "pink",
    visualizationKey: "elysia",
    logo: "/logos/services/elysiajs.svg",
    features: [
      {
        icon: "Zap",
        title: "Bun-native performance",
        description:
          "Elysia on Bun consistently tops Node.js framework benchmarks — 2–3× faster than Express equivalents.",
      },
      {
        icon: "Shield",
        title: "End-to-end type safety",
        description:
          "Typed request/response schemas via TypeBox — validation, serialisation, and OpenAPI generation from the same definition.",
      },
      {
        icon: "Puzzle",
        title: "Plugin architecture",
        description:
          "Compose functionality with plugins — JWT, Swagger, CORS, rate limiting, and custom plugins all follow the same pattern.",
      },
      {
        icon: "Code2",
        title: "Eden Treaty client",
        description:
          "Type-safe API client generated from your Elysia server — share types between backend and frontend without code gen.",
      },
      {
        icon: "Layers",
        title: "Lifecycle hooks",
        description:
          "Global and per-route hooks for auth, logging, transformation, and error handling.",
      },
      {
        icon: "FileCode2",
        title: "OpenAPI out of the box",
        description:
          "Automatic Swagger UI and OpenAPI spec from your route definitions — no extra decorators.",
      },
    ],
    subTechs: [
      { slug: "nodejs" },
      { slug: "drizzle" },
      { slug: "better-auth" },
    ],
  },
  {
    slug: "express",
    name: "Express",
    category: "backend",
    tagline: "The battle-tested Node.js web framework",
    description:
      "Express is the foundation of the Node.js ecosystem — minimal, flexible, and with middleware for every need. We use it for rapid APIs, legacy system integrations, and projects where the ecosystem breadth matters.",
    accentColor: "green",
    visualizationKey: "express",
    logo: "/logos/services/expressjs.svg",
    logoDark: "/logos/services/expressjs_dark.svg",
    features: [
      {
        icon: "Globe",
        title: "Minimal and flexible",
        description:
          "Express adds routing and middleware on top of Node's http module — no opinions, full control.",
      },
      {
        icon: "Puzzle",
        title: "Vast middleware ecosystem",
        description:
          "Thousands of npm packages for auth, validation, rate limiting, compression, and logging.",
      },
      {
        icon: "Shield",
        title: "Auth patterns",
        description:
          "Passport.js, JWT, and session-based auth — we implement the right strategy for your security requirements.",
      },
      {
        icon: "Database",
        title: "Any ORM or driver",
        description:
          "Prisma, Drizzle, Mongoose, or raw SQL — Express doesn't dictate your data layer.",
      },
      {
        icon: "Layers",
        title: "Middleware composition",
        description:
          "Request pipelines built from composable middleware — logging, validation, auth, and error handling in sequence.",
      },
      {
        icon: "RefreshCw",
        title: "Legacy migration",
        description:
          "Ideal for integrating with or gradually replacing existing Node.js systems without full rewrites.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "prisma" }, { slug: "postgresql" }],
  },
  {
    slug: "fastify",
    name: "Fastify",
    category: "backend",
    tagline: "Fast and low-overhead Node.js framework",
    description:
      "Fastify is our go-to when we need Node.js performance without switching runtimes. Schema-based validation, plugin encapsulation, and a built-in JSON serialiser make it ideal for high-throughput APIs.",
    accentColor: "yellow",
    visualizationKey: "fastify",
    logo: "/logos/services/fastify.svg",
    logoDark: "/logos/services/fastify_dark.svg",
    features: [
      {
        icon: "Zap",
        title: "High-throughput JSON APIs",
        description:
          "Fastify's JSON serialiser is 2× faster than JSON.stringify — measurable difference at scale.",
      },
      {
        icon: "Shield",
        title: "Schema validation",
        description:
          "JSON Schema validation on every request and response — errors caught at the boundary, not deep in your code.",
      },
      {
        icon: "Puzzle",
        title: "Plugin encapsulation",
        description:
          "Fastify's plugin system enforces encapsulation — no accidental global state between routes.",
      },
      {
        icon: "FileCode2",
        title: "Auto OpenAPI docs",
        description:
          "Swagger UI generated from your JSON Schema definitions — documentation that never goes stale.",
      },
      {
        icon: "Layers",
        title: "Lifecycle hooks",
        description:
          "Fine-grained hooks at every stage of the request lifecycle — preValidation, preHandler, onSend.",
      },
      {
        icon: "Cpu",
        title: "Low overhead",
        description:
          "Minimal abstraction over Node's http module — Fastify's overhead is measured in nanoseconds.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "drizzle" }, { slug: "postgresql" }],
  },
  {
    slug: "convex",
    name: "Convex",
    category: "backend",
    tagline: "Reactive backend-as-a-service for real-time apps",
    description:
      "Convex is a fully reactive backend — functions, database, file storage, and scheduling in one platform. Queries automatically re-run when data changes, pushing live updates to every connected client.",
    accentColor: "amber",
    visualizationKey: "convex",
    logo: "/logos/services/convex.svg",
    features: [
      {
        icon: "Zap",
        title: "Reactive queries",
        description:
          "Convex queries re-run automatically when their data changes — every client stays in sync without polling.",
      },
      {
        icon: "Database",
        title: "Document database",
        description:
          "Transactional document store with a TypeScript query API — no SQL, no schema migrations.",
      },
      {
        icon: "Shield",
        title: "ACID transactions",
        description:
          "All mutations run in ACID transactions — consistent state even with concurrent users.",
      },
      {
        icon: "Timer",
        title: "Scheduled functions",
        description:
          "Cron jobs and delayed function execution built into the platform — no external queue needed.",
      },
      {
        icon: "Code2",
        title: "End-to-end TypeScript",
        description:
          "Types flow from database schema to frontend query hooks — no manual type definitions.",
      },
      {
        icon: "Globe",
        title: "Global edge deployment",
        description:
          "Functions run close to your users on Convex's edge infrastructure — low latency worldwide.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }],
  },
  {
    slug: "drizzle",
    name: "Drizzle ORM",
    category: "database",
    tagline: "TypeScript ORM that stays out of your way",
    description:
      "Drizzle is our preferred ORM for TypeScript backends — it's SQL-first, generates correct queries, has zero runtime overhead, and never surprises you. Pairs perfectly with Postgres, MySQL, and SQLite.",
    accentColor: "green",
    visualizationKey: "drizzle",
    logo: "/logos/services/drizzle-orm_dark.svg",
    features: [
      {
        icon: "Database",
        title: "SQL-first schema",
        description:
          "Define your schema in TypeScript — Drizzle generates the SQL you'd write yourself, no magic.",
      },
      {
        icon: "Code2",
        title: "Full type inference",
        description:
          "Select, insert, update, and join types inferred automatically — no manual type annotations.",
      },
      {
        icon: "Zap",
        title: "Zero overhead queries",
        description:
          "Drizzle compiles to raw SQL with no N+1 risk — what you write is exactly what hits the database.",
      },
      {
        icon: "GitBranch",
        title: "Migration tooling",
        description:
          "Drizzle Kit generates SQL migrations from your schema diff — review before applying, no surprises.",
      },
      {
        icon: "Globe",
        title: "Edge-compatible",
        description:
          "Works with Neon, Turso, Cloudflare D1, and PlanetScale — edge runtimes included.",
      },
      {
        icon: "Layers",
        title: "Multi-database support",
        description:
          "PostgreSQL, MySQL, SQLite, and their serverless variants — switch drivers without rewriting queries.",
      },
    ],
    subTechs: [{ slug: "postgresql" }, { slug: "sqlite" }, { slug: "mysql" }],
  },
  {
    slug: "better-auth",
    name: "Better Auth",
    category: "auth",
    tagline: "The most comprehensive auth library for TypeScript",
    description:
      "Better Auth handles authentication end-to-end for TypeScript apps — sessions, OAuth, two-factor, magic links, passkeys, and more. Framework-agnostic with adapters for every major ORM and database.",
    accentColor: "violet",
    visualizationKey: "better-auth",
    logo: "/logos/services/better-auth_dark.svg",
    features: [
      {
        icon: "Shield",
        title: "Complete auth flows",
        description:
          "Email/password, OAuth (GitHub, Google, etc.), magic links, and passkeys — all production-ready.",
      },
      {
        icon: "Smartphone",
        title: "Two-factor auth",
        description:
          "TOTP, SMS, and backup codes with a simple plugin — 2FA added in minutes, not days.",
      },
      {
        icon: "Database",
        title: "ORM-agnostic adapters",
        description:
          "Works with Prisma, Drizzle, Mongoose, and raw SQL — bring your existing database setup.",
      },
      {
        icon: "Globe",
        title: "Framework agnostic",
        description:
          "Next.js, SvelteKit, Nuxt, Express, Hono, Elysia — Better Auth adapts to your stack.",
      },
      {
        icon: "Code2",
        title: "Type-safe client",
        description:
          "Generated client with full TypeScript types — autocomplete for every auth action and session field.",
      },
      {
        icon: "Puzzle",
        title: "Plugin ecosystem",
        description:
          "Organisation management, admin panel, rate limiting, and audit logs as first-party plugins.",
      },
    ],
    subTechs: [{ slug: "drizzle" }, { slug: "prisma" }, { slug: "nextjs" }],
  },

  // ─── TOOLING ────────────────────────────────────────────────────
  {
    slug: "turborepo",
    name: "Turborepo",
    category: "tooling",
    tagline: "Monorepos that scale without slowing down",
    description:
      "Turborepo makes monorepos fast through intelligent caching — tasks only re-run when their inputs change. We set up Turborepo workspaces for teams sharing code between web, mobile, and backend packages.",
    accentColor: "red",
    visualizationKey: "turborepo",
    logo: "/logos/services/turborepo-icon-dark.svg",
    features: [
      {
        icon: "Zap",
        title: "Remote caching",
        description:
          "Share build and test caches across your team — CI runs complete in seconds, not minutes.",
      },
      {
        icon: "Workflow",
        title: "Task pipelines",
        description:
          "Declare task dependencies once — Turborepo runs them in the right order, in parallel where possible.",
      },
      {
        icon: "Package",
        title: "Shared packages",
        description:
          "UI component libraries, utility packages, and config shared across apps without publishing to npm.",
      },
      {
        icon: "GitBranch",
        title: "Incremental builds",
        description:
          "Only rebuild packages that changed — consistent with git history for precise cache invalidation.",
      },
      {
        icon: "Layers",
        title: "Workspace management",
        description:
          "Works with npm, yarn, and pnpm workspaces — we migrate your existing monorepo or set one up from scratch.",
      },
      {
        icon: "Monitor",
        title: "Turbo Cloud dashboard",
        description:
          "Visualise task runs, cache hit rates, and build times across your CI and local development.",
      },
    ],
    subTechs: [{ slug: "nx" }, { slug: "nodejs" }],
  },

  // ─── DATABASE ───────────────────────────────────────────────────
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "database",
    tagline: "The world's most advanced open source database",
    description:
      "PostgreSQL is our default relational database — battle-tested, feature-rich, and capable of handling everything from simple CRUD to complex analytical queries with JSON support, full-text search, and extensions.",
    accentColor: "blue",
    visualizationKey: "postgresql",
    logo: "/logos/services/postgresql.svg",
    features: [
      {
        icon: "Database",
        title: "ACID transactions",
        description:
          "Full transaction support with savepoints, isolation levels, and deadlock detection.",
      },
      {
        icon: "Code2",
        title: "JSON & JSONB",
        description:
          "Store and query semi-structured data natively alongside relational data — no separate document store needed.",
      },
      {
        icon: "Search",
        title: "Full-text search",
        description:
          "Built-in FTS with tsvector and GIN indexes — fast, ranked search without Elasticsearch.",
      },
      {
        icon: "Layers",
        title: "Advanced indexing",
        description:
          "B-tree, Hash, GiST, GIN, and BRIN indexes — the right index for every query pattern.",
      },
      {
        icon: "Globe",
        title: "Serverless with Neon",
        description:
          "Neon brings autoscaling, branching, and instant scale-to-zero to Postgres — perfect for modern apps.",
      },
      {
        icon: "Shield",
        title: "Row-level security",
        description:
          "Fine-grained access control at the database level — multi-tenant data isolation built in.",
      },
    ],
    subTechs: [{ slug: "prisma" }, { slug: "drizzle" }, { slug: "supabase" }],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    category: "database",
    tagline: "Flexible document storage at any scale",
    description:
      "MongoDB's document model maps naturally to application objects — no ORM gymnastics needed. We use it for content management, real-time analytics, and applications where schema flexibility matters.",
    accentColor: "green",
    visualizationKey: "mongodb",
    logo: "/logos/services/mongodb-icon-dark.svg",
    features: [
      {
        icon: "FileText",
        title: "Document model",
        description:
          "Store data as JSON-like documents — nested objects, arrays, and mixed types in a single collection.",
      },
      {
        icon: "Zap",
        title: "Aggregation pipeline",
        description:
          "Powerful multi-stage data transformation and analytics — no separate data warehouse for moderate workloads.",
      },
      {
        icon: "Globe",
        title: "Atlas cloud",
        description:
          "MongoDB Atlas provides global clusters, auto-scaling, and built-in search and vector capabilities.",
      },
      {
        icon: "RefreshCw",
        title: "Change streams",
        description:
          "Real-time change notifications via change streams — build reactive apps without polling.",
      },
      {
        icon: "Layers",
        title: "Mongoose ORM",
        description:
          "Schema validation, middleware, and type-safe queries via Mongoose — structure without sacrificing flexibility.",
      },
      {
        icon: "Shield",
        title: "Atlas Search",
        description:
          "Lucene-powered full-text and vector search embedded directly in your database cluster.",
      },
    ],
    subTechs: [
      {
        slug: "mongoose",
      },
    ],
  },
  {
    slug: "prisma",
    name: "Prisma",
    category: "database",
    tagline: "Next-generation ORM for Node.js and TypeScript",
    description:
      "Prisma's schema-first approach gives us a single source of truth for your database — auto-generated types, a visual data browser, and migrations that are safe to review before applying.",
    accentColor: "violet",
    visualizationKey: "prisma",
    logo: "/logos/services/prisma.svg",
    logoDark: "/logos/services/prisma_dark.svg",
    features: [
      {
        icon: "Code2",
        title: "Schema as source of truth",
        description:
          "Define your entire data model in Prisma schema — types, relations, and constraints in one place.",
      },
      {
        icon: "Database",
        title: "Auto-generated client",
        description:
          "Fully typed query client generated from your schema — autocomplete for every model, field, and relation.",
      },
      {
        icon: "GitBranch",
        title: "Safe migrations",
        description:
          "Prisma Migrate generates SQL diffs you review before applying — no surprise schema changes.",
      },
      {
        icon: "Monitor",
        title: "Prisma Studio",
        description:
          "Visual database browser built in — explore and edit your data without leaving the project.",
      },
      {
        icon: "Globe",
        title: "Multi-database",
        description:
          "PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB — one API for all.",
      },
      {
        icon: "Zap",
        title: "Prisma Accelerate",
        description:
          "Global database cache and connection pooling — fast queries even from serverless and edge functions.",
      },
    ],
    subTechs: [{ slug: "postgresql" }, { slug: "mysql" }, { slug: "sqlite" }],
  },
  {
    slug: "sqlite",
    name: "SQLite",
    category: "database",
    tagline: "Embedded SQL database for lean, fast apps",
    description:
      "SQLite is the right choice for local-first apps, edge deployments, and development environments. With libSQL (Turso), it scales to global replication — serverless SQLite with zero cold starts.",
    accentColor: "blue",
    visualizationKey: "sqlite",
    logo: "/logos/services/sqlite.svg",
    features: [
      {
        icon: "Package",
        title: "Zero dependencies",
        description:
          "SQLite is a single file — no server process, no network, no configuration.",
      },
      {
        icon: "Zap",
        title: "Turso edge deployment",
        description:
          "libSQL and Turso replicate SQLite globally — read latency under 10ms from any region.",
      },
      {
        icon: "Monitor",
        title: "Local-first apps",
        description:
          "Embed a full SQL database in Tauri desktop apps, mobile apps, or Electron — works offline by default.",
      },
      {
        icon: "GitBranch",
        title: "Database branching",
        description:
          "Turso's branching creates isolated database copies for each dev/staging environment.",
      },
      {
        icon: "Code2",
        title: "Works with Drizzle & Prisma",
        description:
          "First-class support in both Drizzle ORM and Prisma — your existing query code works unchanged.",
      },
      {
        icon: "Globe",
        title: "Cloudflare D1",
        description:
          "Deploy SQLite at the edge with Cloudflare D1 — co-located with your Workers for minimal latency.",
      },
    ],
    subTechs: [
      { slug: "drizzle" },
      { slug: "prisma" },
      { slug: "cloudflare-d1" },
    ],
  },

  // ─── AUTH ────────────────────────────────────────────────────────
  {
    slug: "clerk",
    name: "Clerk",
    category: "auth",
    tagline: "Complete user management out of the box",
    description:
      "Clerk handles the entire authentication and user management surface — hosted UI components, social login, MFA, organisations, and a management dashboard — so you can focus on your product.",
    accentColor: "violet",
    visualizationKey: "clerk",
    logo: "/logos/services/clerk-icon-dark.svg",
    features: [
      {
        icon: "Shield",
        title: "Drop-in auth components",
        description:
          "Prebuilt Sign In, Sign Up, and User Profile components — fully styled, accessible, and customisable.",
      },
      {
        icon: "Globe",
        title: "Social & SSO login",
        description:
          "Google, GitHub, Apple, Microsoft, and 20+ OAuth providers configured in minutes.",
      },
      {
        icon: "Smartphone",
        title: "MFA & passkeys",
        description:
          "TOTP, SMS codes, and WebAuthn passkeys — modern authentication flows without building them.",
      },
      {
        icon: "Network",
        title: "Organisations & roles",
        description:
          "Multi-tenant organisation management with custom roles and permissions built in.",
      },
      {
        icon: "Code2",
        title: "Framework integrations",
        description:
          "Next.js, Remix, Expo, and more — middleware and hooks for every popular framework.",
      },
      {
        icon: "Monitor",
        title: "Management dashboard",
        description:
          "User browsing, impersonation, and audit logs in Clerk's dashboard — no custom admin needed.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "react" }],
  },

  // ─── PAYMENTS ────────────────────────────────────────────────────
  {
    slug: "polar",
    name: "Polar",
    category: "payments",
    tagline: "Monetisation for open source and indie developers",
    description:
      "Polar is a merchant of record platform built for developers — one-time payments, subscriptions, usage-based billing, and open source funding. We integrate Polar into SaaS products and developer tools.",
    accentColor: "blue",
    visualizationKey: "polar",
    logo: "/logos/services/polar-sh_dark.svg",
    features: [
      {
        icon: "Package",
        title: "Products & subscriptions",
        description:
          "One-time and recurring billing with a developer-friendly API and prebuilt checkout pages.",
      },
      {
        icon: "Globe",
        title: "Merchant of record",
        description:
          "Polar handles VAT, sales tax, and international payments — you get paid, they handle compliance.",
      },
      {
        icon: "Code2",
        title: "Open source funding",
        description:
          "GitHub Sponsors alternative with per-issue funding, tiers, and backer management.",
      },
      {
        icon: "Zap",
        title: "Usage-based billing",
        description:
          "Meter API calls, seats, or any custom metric — charge what your customers actually use.",
      },
      {
        icon: "FileText",
        title: "Customer portal",
        description:
          "Self-service billing portal for subscription management, invoice history, and payment updates.",
      },
      {
        icon: "Workflow",
        title: "Webhook events",
        description:
          "Real-time subscription and payment events for provisioning access, sending emails, and analytics.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "stripe" }],
  },

  // ─── SPLIT PAGES (formerly subTechs) ────────────────────────────
  {
    slug: "nextjs",
    name: "Next.js",
    category: "frontend",
    tagline: "The full-stack React framework for production",
    description:
      "Next.js is our primary framework for React applications — App Router, Server Components, streaming SSR, and edge-ready APIs in one cohesive package. It's how we ship fast, SEO-friendly React apps.",
    accentColor: "sky",
    visualizationKey: "nextjs",
    logo: "/logos/services/nextjs_icon_dark.svg",
    features: [
      {
        icon: "Server",
        title: "App Router & RSC",
        description:
          "Server Components, layouts, and streaming — fetch data on the server with zero client JS overhead.",
      },
      {
        icon: "Zap",
        title: "Partial Prerendering",
        description:
          "Static shell with dynamic islands — the best of SSG and SSR in a single page.",
      },
      {
        icon: "Globe",
        title: "Edge middleware",
        description:
          "Auth, geolocation, and A/B testing at the edge — runs before your page loads.",
      },
      {
        icon: "FileCode2",
        title: "Server Actions",
        description:
          "Mutate data from forms and components without writing API routes — type-safe server functions.",
      },
      {
        icon: "Gauge",
        title: "Image & font optimisation",
        description:
          "Automatic WebP conversion, lazy loading, and self-hosted fonts — Core Web Vitals green by default.",
      },
      {
        icon: "GitBranch",
        title: "Vercel & self-hosted",
        description:
          "Deploy to Vercel for zero-config DX or self-host on Docker, Railway, or Fly.io.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "tailwind" },
      { slug: "trpc" },
      { slug: "better-auth" },
    ],
  },
  {
    slug: "react-native",
    name: "React Native",
    category: "mobile",
    tagline: "Native iOS and Android from one React codebase",
    description:
      "React Native lets us share code between your web product and mobile apps — same language, same patterns, native performance. We build with Expo for fast iteration and over-the-air updates.",
    accentColor: "sky",
    visualizationKey: "react-native",
    logo: "/logos/services/react_dark.svg",
    features: [
      {
        icon: "Smartphone",
        title: "Expo managed workflow",
        description:
          "Fast iteration with Expo Go, EAS Build for CI, and OTA updates without App Store review.",
      },
      {
        icon: "Code2",
        title: "Shared TypeScript code",
        description:
          "Business logic, API calls, and state management shared between web and mobile — one source of truth.",
      },
      {
        icon: "Layout",
        title: "React Native Reanimated",
        description:
          "Smooth 60fps animations running on the UI thread — gesture-driven interfaces with Reanimated 3.",
      },
      {
        icon: "Globe",
        title: "New Architecture",
        description:
          "JSI and Fabric for direct JS-to-native communication — faster bridge, no serialisation overhead.",
      },
      {
        icon: "Package",
        title: "Expo Router",
        description:
          "File-based routing for React Native — same mental model as Next.js, works for web and native.",
      },
      {
        icon: "Play",
        title: "EAS distribution",
        description:
          "TestFlight and Play Store internal testing via EAS Submit — automated CI/CD for both platforms.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "tailwind" }],
  },
  {
    slug: "nuxt",
    name: "Nuxt",
    category: "frontend",
    tagline: "The intuitive full-stack Vue framework",
    description:
      "Nuxt 3 brings file-based routing, auto-imports, server API routes, and hybrid rendering to Vue — making full-stack Vue development feel as productive as any other modern framework.",
    accentColor: "emerald",
    visualizationKey: "nuxt",
    logo: "/logos/services/nuxt.svg",
    features: [
      {
        icon: "Route",
        title: "File-based routing",
        description:
          "Pages, layouts, and middleware from the filesystem — no router config to maintain.",
      },
      {
        icon: "Zap",
        title: "Auto-imports",
        description:
          "Components, composables, and utils auto-imported — no import statements cluttering your files.",
      },
      {
        icon: "Server",
        title: "Nitro server engine",
        description:
          "API routes, server middleware, and edge-compatible deployments via Nitro's universal runtime.",
      },
      {
        icon: "Layers",
        title: "Hybrid rendering",
        description:
          "Per-route rendering: SSR, SSG, ISR, or SPA — mix modes in a single application.",
      },
      {
        icon: "Database",
        title: "Nuxt Content",
        description:
          "Markdown and MDX-powered content with a queryable API — perfect for docs and blogs.",
      },
      {
        icon: "Globe",
        title: "Universal deployment",
        description:
          "Deploy to Vercel, Cloudflare, Node, or static hosting with adapter-agnostic output.",
      },
    ],
    subTechs: [{ slug: "vue" }, { slug: "tailwind" }, { slug: "drizzle" }],
  },
  {
    slug: "php",
    name: "PHP",
    category: "backend",
    tagline: "Modern PHP for serious backend development",
    description:
      "PHP 8.x is a capable, fast, and practical language for backend development. With typed properties, fibers, match expressions, and a rich ecosystem, modern PHP is nothing like the PHP of a decade ago.",
    accentColor: "violet",
    visualizationKey: "php",
    logo: "/logos/services/php.svg",
    logoDark: "/logos/services/php_dark.svg",
    features: [
      {
        icon: "Code2",
        title: "PHP 8.x strict typing",
        description:
          "Union types, enums, readonly properties, and fibers — modern PHP is statically typed when you want it.",
      },
      {
        icon: "Zap",
        title: "OPcache performance",
        description:
          "Compiled bytecode caching with OPcache — PHP performance in the same ballpark as Node.js and Go.",
      },
      {
        icon: "Puzzle",
        title: "Composer ecosystem",
        description:
          "Packagist has 400k+ packages — there's a battle-tested library for almost every use case.",
      },
      {
        icon: "FlaskConical",
        title: "Pest & PHPUnit",
        description:
          "Expressive test suites with Pest's readable syntax or classical PHPUnit — TDD is first-class.",
      },
      {
        icon: "Server",
        title: "PHP-FPM & Swoole",
        description:
          "Traditional FPM for reliability or Swoole coroutines for async, long-running PHP processes.",
      },
      {
        icon: "Shield",
        title: "Security best practices",
        description:
          "Prepared statements, CSRF protection, password hashing with bcrypt — we follow OWASP top 10.",
      },
    ],
    subTechs: [{ slug: "laravel" }, { slug: "mysql" }, { slug: "wordpress" }],
  },
  {
    slug: "django",
    name: "Django",
    category: "backend",
    tagline: "Batteries-included Python web framework",
    description:
      "Django's 'batteries included' philosophy means authentication, admin, ORM, forms, and migrations ship with the framework. We use it for content-heavy apps, internal tools, and API backends via DRF.",
    accentColor: "green",
    visualizationKey: "django",
    logo: "/logos/services/django.svg",
    features: [
      {
        icon: "Layout",
        title: "Built-in admin panel",
      },
      {
        icon: "Database",
        title: "Django ORM",
      },
      {
        icon: "Globe",
        title: "Django REST Framework",
      },
      {
        icon: "Shield",
        title: "Security by default",
      },
      {
        icon: "GitBranch",
        title: "Schema migrations",
      },
      {
        icon: "Radio",
        title: "Django Channels",
      },
    ],
    subTechs: [{ slug: "python" }, { slug: "postgresql" }],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    category: "backend",
    tagline: "High-performance async Python APIs",
    description:
      "FastAPI is our choice for Python microservices and AI endpoints — async I/O, automatic OpenAPI docs, and Pydantic validation from a single function signature. Fast to write, fast to run.",
    accentColor: "green",
    visualizationKey: "fastapi",
    logo: "/logos/services/fastapi.svg",
    features: [
      {
        icon: "Zap",
        title: "Async I/O performance",
      },
      {
        icon: "FileCode2",
        title: "Auto OpenAPI docs",
      },
      {
        icon: "Shield",
        title: "Pydantic validation",
      },
      {
        icon: "Brain",
        title: "AI & ML endpoints",
      },
      {
        icon: "Layers",
        title: "Dependency injection",
      },
      {
        icon: "Globe",
        title: "ASGI ecosystem",
      },
    ],
    subTechs: [{ slug: "python" }, { slug: "postgresql" }],
  },
  {
    slug: "trpc",
    name: "tRPC",
    category: "backend",
    tagline: "End-to-end typesafe APIs without code generation",
    description:
      "tRPC lets your frontend call server functions directly with full TypeScript type safety — no REST contracts, no GraphQL schemas, no code generation. If your server types change, your editor tells you instantly.",
    accentColor: "blue",
    visualizationKey: "trpc",
    logo: "/logos/services/trpc.svg",
    features: [
      {
        icon: "Code2",
        title: "Zero schema duplication",
      },
      {
        icon: "Zap",
        title: "React Query integration",
      },
      {
        icon: "Shield",
        title: "Zod input validation",
      },
      {
        icon: "Layers",
        title: "Middleware & context",
      },
      {
        icon: "Globe",
        title: "Any backend runtime",
      },
      {
        icon: "Server",
        title: "Server-side calls",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "nextjs" }, { slug: "react" }],
  },
  {
    slug: "rust",
    name: "Rust",
    category: "backend",
    tagline: "Memory-safe systems programming at native speed",
    description:
      "We write Rust for performance-critical components — Tauri desktop backends, WebAssembly modules, CLI tools, and systems where memory safety and zero overhead matter.",
    accentColor: "orange",
    visualizationKey: "rust",
    logo: "/logos/services/rust.svg",
    logoDark: "/logos/services/rust_dark.svg",
    features: [
      {
        icon: "Shield",
        title: "Memory safety without GC",
      },
      {
        icon: "Zap",
        title: "C-comparable performance",
      },
      {
        icon: "Globe",
        title: "WebAssembly target",
      },
      {
        icon: "Terminal",
        title: "CLI tooling",
      },
      {
        icon: "Server",
        title: "Axum & Actix web",
      },
      {
        icon: "Package",
        title: "Cargo ecosystem",
      },
    ],
    subTechs: [
      { slug: "tauri" },
      { slug: "wasm" },
      { slug: "cloudflare-workers" },
    ],
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "cms",
    tagline: "E-commerce on WordPress that converts",
    description:
      "WooCommerce powers 30% of all online stores. We build custom WooCommerce experiences — bespoke product pages, checkout flows, payment gateway integrations, and headless storefronts with fast frontends.",
    accentColor: "blue",
    visualizationKey: "woocommerce",
    logo: "/logos/services/wordpress.svg",
    features: [
      {
        icon: "ShoppingCart",
        title: "Custom checkout flows",
      },
      {
        icon: "Globe",
        title: "Headless storefront",
      },
      {
        icon: "Package",
        title: "Inventory management",
      },
      {
        icon: "Shield",
        title: "Payment gateways",
      },
      {
        icon: "Workflow",
        title: "Order automation",
      },
      {
        icon: "BarChart2",
        title: "Sales analytics",
      },
    ],
    subTechs: [{ slug: "wordpress" }, { slug: "stripe" }],
  },
  {
    slug: "mongoose",
    name: "Mongoose",
    category: "database",
    tagline: "Elegant MongoDB object modelling for Node.js",
    description:
      "Mongoose brings schema validation, middleware hooks, virtuals, and a clean query API to MongoDB in Node.js. We use it where a structured document model matters but a relational DB is the wrong fit.",
    accentColor: "green",
    visualizationKey: "mongoose",
    logo: null,
    lucideIcon: "Database",
    features: [
      {
        icon: "FileText",
        title: "Schema definitions",
      },
      {
        icon: "Workflow",
        title: "Middleware hooks",
      },
      {
        icon: "Code2",
        title: "TypeScript support",
      },
      {
        icon: "Database",
        title: "Aggregation pipeline",
      },
      {
        icon: "Puzzle",
        title: "Population",
      },
      {
        icon: "Layers",
        title: "Discriminators",
      },
    ],
    subTechs: [{ slug: "mongodb" }, { slug: "nodejs" }],
  },
  {
    slug: "shadcn",
    name: "shadcn/ui",
    category: "design",
    tagline: "Accessible component primitives you own",
    description:
      "shadcn/ui gives us a starting point of accessible, unstyled Radix UI components styled with Tailwind CSS — copied into your codebase, not installed as a dependency. We customise every component to match your brand.",
    accentColor: "cyan",
    visualizationKey: "shadcn",
    logo: "/logos/services/shadcn.svg",
    logoDarkInvert: true,
    features: [
      {
        icon: "Component",
        title: "Owns the code",
      },
      {
        icon: "Accessibility",
        title: "Accessible by default",
      },
      {
        icon: "Paintbrush",
        title: "Tailwind themed",
      },
      {
        icon: "Moon",
        title: "Dark mode ready",
      },
      {
        icon: "Puzzle",
        title: "Composable",
      },
      {
        icon: "Layers",
        title: "Registry-based",
      },
    ],
    subTechs: [{ slug: "tailwind" }, { slug: "react" }, { slug: "nextjs" }],
  },
  {
    slug: "starlight",
    name: "Starlight",
    category: "frontend",
    tagline: "Documentation sites built on Astro",
    description:
      "Starlight is Astro's official documentation framework — beautiful, accessible docs with full-text search, dark mode, i18n, and sidebar navigation out of the box. We build and customise Starlight for developer products.",
    accentColor: "amber",
    visualizationKey: "starlight",
    logo: null,
    lucideIcon: "Star",
    features: [
      {
        icon: "Search",
        title: "Full-text search",
      },
      {
        icon: "Globe",
        title: "Internationalisation",
      },
      {
        icon: "Moon",
        title: "Dark mode & accessibility",
      },
      {
        icon: "Layout",
        title: "Sidebar & TOC",
      },
      {
        icon: "FileText",
        title: "MDX components",
      },
      {
        icon: "Gauge",
        title: "Perfect Lighthouse scores",
      },
    ],
    subTechs: [{ slug: "astro" }, { slug: "fumadocs" }],
  },

  // ─── MORE TOOLING ────────────────────────────────────────────────
  {
    slug: "nx",
    name: "Nx",
    category: "tooling",
    tagline: "Smart monorepo build system with plugins for everything",
    description:
      "Nx is a powerful build system with deep framework integration — generators, executors, computation caching, and affected-command detection. The right choice for large teams and complex monorepos.",
    accentColor: "blue",
    visualizationKey: "nx",
    logo: "/logos/services/nx_dark.svg",
    features: [
      {
        icon: "Zap",
        title: "Computation caching",
      },
      {
        icon: "GitBranch",
        title: "Affected commands",
      },
      {
        icon: "Puzzle",
        title: "Plugin ecosystem",
      },
      {
        icon: "Layers",
        title: "Project graph",
      },
      {
        icon: "Workflow",
        title: "Generators",
      },
      {
        icon: "Monitor",
        title: "Nx Cloud dashboard",
      },
    ],
    subTechs: [{ slug: "turborepo" }, { slug: "nodejs" }],
  },
  {
    slug: "cloudflare-workers",
    name: "Cloudflare Workers",
    category: "tooling",
    tagline: "JavaScript at the edge, globally distributed",
    description:
      "Cloudflare Workers runs your code in 300+ data centres worldwide — zero cold starts, sub-millisecond latency, and access to KV, R2, D1, Durable Objects, and Queues from the same runtime.",
    accentColor: "amber",
    visualizationKey: "cloudflare-workers",
    logo: "/logos/services/cloudflare-workers.svg",
    features: [
      {
        icon: "Globe",
        title: "300+ edge locations",
      },
      {
        icon: "Zap",
        title: "Zero cold starts",
      },
      {
        icon: "Database",
        title: "KV, R2, D1 storage",
      },
      {
        icon: "Layers",
        title: "Durable Objects",
      },
      {
        icon: "Code2",
        title: "Hono & tRPC compatible",
      },
      {
        icon: "Workflow",
        title: "Queues & Cron",
      },
    ],
    subTechs: [
      { slug: "cloudflare-d1" },
      { slug: "cloudflare-r2" },
      { slug: "drizzle" },
    ],
  },

  // ─── DESKTOP ────────────────────────────────────────────────────
  {
    slug: "tauri",
    name: "Tauri",
    category: "desktop",
    tagline: "Lightweight desktop apps with a web frontend",
    description:
      "Tauri lets us build native desktop apps for Windows, macOS, and Linux using a Rust backend and any web frontend — React, Vue, Svelte. Smaller and faster than Electron, with full OS API access.",
    accentColor: "amber",
    visualizationKey: "tauri",
    logo: "/logos/services/tauri.svg",
    features: [
      {
        icon: "Terminal",
        title: "Rust backend + typed IPC",
      },
      {
        icon: "Package",
        title: "Under 10MB bundles",
      },
      {
        icon: "Cpu",
        title: "Full OS API access",
      },
      {
        icon: "RefreshCw",
        title: "Auto-updater",
      },
      {
        icon: "Monitor",
        title: "Cross-platform targets",
      },
      {
        icon: "Globe",
        title: "OS webview rendering",
      },
    ],
    subTechs: [
      {
        slug: "rust",
      },
      { slug: "react" },
      { slug: "svelte" },
    ],
  },

  // ─── MORE DESKTOP ────────────────────────────────────────────────
  {
    slug: "electron",
    name: "Electron",
    category: "desktop",
    tagline: "Desktop apps with Chromium and Node.js",
    description:
      "Electron is the established choice for cross-platform desktop apps — VS Code, Slack, and Figma all use it. We build Electron apps where WebView compatibility or existing Node.js tooling makes it the right fit.",
    accentColor: "sky",
    visualizationKey: "electron",
    logo: "/logos/services/electron.svg",
    features: [
      {
        icon: "Monitor",
        title: "Chromium rendering",
      },
      {
        icon: "Package",
        title: "Node.js main process",
      },
      {
        icon: "Shield",
        title: "Sandboxed renderer",
      },
      {
        icon: "RefreshCw",
        title: "Auto-updater",
      },
      {
        icon: "Globe",
        title: "Web tech stack",
      },
      {
        icon: "GitBranch",
        title: "electron-builder CI",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }],
  },

  // ─── MORE PAYMENTS ───────────────────────────────────────────────
  {
    slug: "stripe",
    name: "Stripe",
    category: "payments",
    tagline: "The developer-first payment platform",
    description:
      "Stripe is the gold standard for payment infrastructure — from simple card payments to complex marketplace splits, subscription billing, and global tax compliance. We integrate Stripe into your product so payments just work.",
    accentColor: "violet",
    visualizationKey: "stripe",
    logo: "/logos/services/stripe.svg",
    features: [
      {
        icon: "ShoppingCart",
        title: "Payment intents & Elements",
      },
      {
        icon: "RefreshCw",
        title: "Subscriptions & billing",
      },
      {
        icon: "Globe",
        title: "135+ currencies",
      },
      {
        icon: "Workflow",
        title: "Webhooks & events",
      },
      {
        icon: "Network",
        title: "Connect for marketplaces",
      },
      {
        icon: "Shield",
        title: "Radar fraud protection",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "polar" }],
  },

  // ─── MORE DESIGN ─────────────────────────────────────────────────
  {
    slug: "bootstrap",
    name: "Bootstrap",
    category: "design",
    tagline: "The most popular CSS framework, upgraded",
    description:
      "Bootstrap 5 remains the practical choice for admin dashboards, internal tools, and projects that need a solid UI baseline fast. We use it with custom Sass variables to match your brand without fighting the defaults.",
    accentColor: "violet",
    visualizationKey: "bootstrap",
    logo: "/logos/services/bootstrap.svg",
    features: [
      {
        icon: "Layers",
        title: "Utility + component",
      },
      {
        icon: "Paintbrush",
        title: "Sass variables",
      },
      {
        icon: "Accessibility",
        title: "Accessible components",
      },
      {
        icon: "Globe",
        title: "No JS framework lock-in",
      },
      {
        icon: "Moon",
        title: "Dark mode ready",
      },
      {
        icon: "Package",
        title: "Icon library",
      },
    ],
    subTechs: [{ slug: "php" }, { slug: "laravel" }],
  },

  // ─── MORE FRONTEND ───────────────────────────────────────────────
  {
    slug: "blazor",
    name: "Blazor",
    category: "frontend",
    tagline: "Full-stack C# web apps without JavaScript",
    description:
      "Blazor lets .NET teams build interactive web UIs in C# — shared models, validation, and business logic between server and client. The right choice when your team is .NET-native and wants to avoid context-switching to JavaScript.",
    accentColor: "violet",
    visualizationKey: "blazor",
    logo: null,
    lucideIcon: "Component",
    features: [
      {
        icon: "Code2",
        title: "C# in the browser",
      },
      {
        icon: "Server",
        title: "Blazor Server mode",
      },
      {
        icon: "Component",
        title: "Razor components",
      },
      {
        icon: "Layers",
        title: "MudBlazor & Radzen",
      },
      {
        icon: "Database",
        title: "EF Core integration",
      },
      {
        icon: "Shield",
        title: "ASP.NET auth",
      },
    ],
    subTechs: [{ slug: "dotnet" }, { slug: "dotnet-mvc" }],
  },
  {
    slug: "react-router",
    name: "React Router",
    category: "frontend",
    tagline: "The standard routing solution for React",
    description:
      "React Router v7 / Remix is a full-stack framework built on React Router's data APIs — loaders, actions, nested routes, and error boundaries. We use it for data-heavy apps where fine-grained control over loading states matters.",
    accentColor: "red",
    visualizationKey: "react-router",
    logo: "/logos/services/react-router.svg",
    logoDark: "/logos/services/react-router.svg",
    features: [
      {
        icon: "Route",
        title: "Nested routing",
      },
      {
        icon: "Database",
        title: "Loader & action pattern",
      },
      {
        icon: "Zap",
        title: "Progressive enhancement",
      },
      {
        icon: "Shield",
        title: "Error boundaries",
      },
      {
        icon: "Server",
        title: "SSR & framework mode",
      },
      {
        icon: "Globe",
        title: "Deploy anywhere",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "tailwind" }],
  },
  {
    slug: "tanstack-router",
    name: "TanStack Router",
    category: "frontend",
    tagline: "Type-safe routing with built-in search params",
    description:
      "TanStack Router is the most type-safe React router available — every route, param, and search parameter is fully typed. Pairs naturally with TanStack Query for end-to-end typed data fetching.",
    accentColor: "orange",
    visualizationKey: "tanstack-router",
    logo: "/logos/services/tanstack.svg",
    features: [
      {
        icon: "Code2",
        title: "100% type-safe routes",
      },
      {
        icon: "Search",
        title: "Typed search params",
      },
      {
        icon: "Layers",
        title: "Route code splitting",
      },
      {
        icon: "Database",
        title: "Loaders & prefetch",
      },
      {
        icon: "Zap",
        title: "Devtools included",
      },
      {
        icon: "Globe",
        title: "Framework agnostic",
      },
    ],
    subTechs: [
      { slug: "tanstack" },
      { slug: "react" },
      { slug: "tanstack-start" },
    ],
  },
  {
    slug: "tanstack-start",
    name: "TanStack Start",
    category: "frontend",
    tagline: "Full-stack React with TanStack's type-safe stack",
    description:
      "TanStack Start is a full-stack React framework built on TanStack Router and Vinxi — SSR, streaming, server functions, and API routes with end-to-end type safety from day one.",
    accentColor: "orange",
    visualizationKey: "tanstack-start",
    logo: "/logos/services/tanstack.svg",
    features: [
      {
        icon: "Server",
        title: "SSR & streaming",
      },
      {
        icon: "Code2",
        title: "Server functions",
      },
      {
        icon: "Database",
        title: "TanStack Query built-in",
      },
      {
        icon: "Route",
        title: "File-based routing",
      },
      {
        icon: "Globe",
        title: "Vinxi bundler",
      },
      {
        icon: "Zap",
        title: "Edge-ready",
      },
    ],
    subTechs: [
      { slug: "tanstack" },
      { slug: "tanstack-router" },
      { slug: "trpc" },
    ],
  },
  {
    slug: "pwa",
    name: "PWA",
    category: "frontend",
    tagline: "Web apps that feel native on any device",
    description:
      "Progressive Web Apps bring offline support, push notifications, home screen installation, and native-like performance to your existing web app — no app store, no SDK, just the web platform.",
    accentColor: "indigo",
    visualizationKey: "pwa",
    logo: null,
    lucideIcon: "Smartphone",
    features: [
      {
        icon: "Globe",
        title: "Offline-first service worker",
      },
      {
        icon: "Smartphone",
        title: "Install to home screen",
      },
      {
        icon: "Radio",
        title: "Push notifications",
      },
      {
        icon: "Gauge",
        title: "App shell architecture",
      },
      {
        icon: "Package",
        title: "Workbox integration",
      },
      {
        icon: "Monitor",
        title: "Desktop installable",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }],
  },

  // ─── MORE MOBILE ─────────────────────────────────────────────────
  {
    slug: "flutter",
    name: "Flutter",
    category: "mobile",
    tagline: "Beautiful native apps from a single Dart codebase",
    description:
      "Flutter lets us ship to iOS, Android, web, and desktop from one Dart codebase — with pixel-perfect rendering via its own graphics engine (Skia/Impeller). The choice when you need true design fidelity across platforms.",
    accentColor: "sky",
    visualizationKey: "flutter",
    logo: "/logos/services/flutter.svg",
    features: [
      {
        icon: "Paintbrush",
        title: "Pixel-perfect on all platforms",
        description:
          "Flutter draws every pixel itself via Skia/Impeller — no platform widget inconsistencies.",
      },
      {
        icon: "Zap",
        title: "Hot reload",
        description:
          "Sub-second hot reload during development — see changes without losing app state.",
      },
      {
        icon: "Layers",
        title: "Material & Cupertino widgets",
        description:
          "Prebuilt widget libraries matching Google's Material Design and Apple's iOS design language.",
      },
      {
        icon: "Globe",
        title: "Single codebase for 6 targets",
        description:
          "iOS, Android, web, Windows, macOS, and Linux from one project — write once, run everywhere.",
      },
      {
        icon: "Code2",
        title: "Dart + strong typing",
        description:
          "Dart's sound null safety and type system prevent entire classes of runtime errors.",
      },
      {
        icon: "Package",
        title: "Pub.dev ecosystem",
        description:
          "40k+ packages on pub.dev — Firebase, payments, maps, and more with first-party Flutter support.",
      },
    ],
    subTechs: [{ slug: "react-native" }],
  },
  {
    slug: "unistyles",
    name: "Unistyles",
    category: "mobile",
    tagline: "Styling React Native at 120fps",
    description:
      "Unistyles 3.0 is a high-performance styling library for React Native — it runs on the C++ JSI layer with zero JavaScript overhead, supports design tokens, breakpoints, and variants, and pairs naturally with any RN component library.",
    accentColor: "violet",
    visualizationKey: "unistyles",
    logo: null,
    lucideIcon: "Smartphone",
    features: [
      {
        icon: "Zap",
        title: "JSI-powered zero overhead",
        description:
          "Styles processed in C++ — no JS bridge, no serialisation, true 120fps without compromise.",
      },
      {
        icon: "Paintbrush",
        title: "Design tokens",
        description:
          "Centralised theme with colors, spacing, and typography — shared across the whole app from one definition.",
      },
      {
        icon: "Smartphone",
        title: "Responsive breakpoints",
        description:
          "Breakpoints for phone, tablet, and foldable layouts — same pattern as responsive web CSS.",
      },
      {
        icon: "Layers",
        title: "Variant system",
        description:
          "Button variants, size modifiers, and compound variants — style logic in the stylesheet not the component.",
      },
      {
        icon: "Moon",
        title: "Dark mode",
        description:
          "Theme switching with adaptive colors — your design tokens swap automatically on system preference change.",
      },
      {
        icon: "Code2",
        title: "TypeScript autocomplete",
        description:
          "Full type safety for theme tokens, variants, and breakpoints — wrong token names are compile-time errors.",
      },
    ],
    subTechs: [{ slug: "react-native" }],
  },

  // ─── MORE BACKEND ────────────────────────────────────────────────
  {
    slug: "orpc",
    name: "oRPC",
    category: "backend",
    tagline: "End-to-end type-safe RPC with OpenAPI support",
    description:
      "oRPC combines the DX of tRPC with OpenAPI spec generation — define your procedures once and get type-safe client calls and an auto-generated OpenAPI schema. Best of both worlds for APIs consumed by both internal clients and external partners.",
    accentColor: "green",
    visualizationKey: "orpc",
    logo: null,
    lucideIcon: "Network",
    features: [
      {
        icon: "Code2",
        title: "Type-safe from day one",
        description:
          "Input and output types inferred from your procedure definitions — TypeScript errors if you break the contract.",
      },
      {
        icon: "FileCode2",
        title: "OpenAPI spec generation",
        description:
          "Automatic OpenAPI 3.1 schema from your router — Swagger UI and partner integrations without extra work.",
      },
      {
        icon: "Shield",
        title: "Zod / Valibot validation",
        description:
          "Bring your own validation library — oRPC handles the plumbing, you write the schema.",
      },
      {
        icon: "Layers",
        title: "Middleware pipeline",
        description:
          "Composable middleware for auth, rate limiting, tracing, and error formatting.",
      },
      {
        icon: "Globe",
        title: "Framework adapters",
        description:
          "Next.js, Hono, Fastify, and Node.js HTTP — plug oRPC into your existing server.",
      },
      {
        icon: "Zap",
        title: "React Query client",
        description:
          "First-class TanStack Query integration — oRPC procedures become typed query/mutation hooks.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "nextjs" }, { slug: "trpc" }],
  },
  {
    slug: "rest-api",
    name: "REST API",
    category: "backend",
    tagline: "Standards-first HTTP APIs built to last",
    description:
      "REST is still the most interoperable API style — consumed by any language, debuggable in any tool, and understood by every developer. We design and build REST APIs that are consistent, versioned, and documented.",
    accentColor: "blue",
    visualizationKey: "rest-api",
    logo: null,
    lucideIcon: "Globe",
    features: [
      {
        icon: "Globe",
        title: "OpenAPI / Swagger docs",
        description:
          "Machine-readable API specs that generate interactive docs, client SDKs, and mock servers.",
      },
      {
        icon: "Shield",
        title: "Auth & security",
        description:
          "JWT bearer tokens, OAuth 2.0, and API key strategies — with rate limiting and CORS configured correctly.",
      },
      {
        icon: "Layers",
        title: "Versioning strategy",
        description:
          "URI versioning (/v1/, /v2/) or header versioning — backward-compatible evolution without breaking consumers.",
      },
      {
        icon: "Workflow",
        title: "Webhook delivery",
        description:
          "Event-driven integrations via signed webhooks — retry logic, delivery logs, and failure alerting.",
      },
      {
        icon: "Gauge",
        title: "Caching headers",
        description:
          "ETags, Cache-Control, and conditional requests — reduce redundant data transfer and server load.",
      },
      {
        icon: "Code2",
        title: "SDK generation",
        description:
          "OpenAPI Generator or Speakeasy to ship typed client libraries in TypeScript, Python, and Go.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "fastapi" }, { slug: "laravel" }],
  },
  {
    slug: "wasm",
    name: "WebAssembly",
    category: "backend",
    tagline: "Near-native performance in any runtime",
    description:
      "WebAssembly runs at near-native speed in browsers, on servers via WASI, and at the edge via Cloudflare Workers — compiled from Rust, C, or AssemblyScript. We use WASM for compute-heavy tasks that JavaScript can't handle efficiently.",
    accentColor: "violet",
    visualizationKey: "wasm",
    logo: null,
    lucideIcon: "Cpu",
    features: [
      {
        icon: "Zap",
        title: "Near-native execution",
        description:
          "WASM executes at 80–90% of native speed — image processing, crypto, parsers, and codecs in the browser.",
      },
      {
        icon: "Globe",
        title: "Runs anywhere",
        description:
          "Same WASM binary runs in browsers, Node.js, Deno, Bun, and Cloudflare Workers via WASI.",
      },
      {
        icon: "Shield",
        title: "Memory-safe sandbox",
        description:
          "WASM runs in a capability-based sandbox — no arbitrary memory access outside its linear memory.",
      },
      {
        icon: "Code2",
        title: "Rust → WASM",
        description:
          "wasm-pack compiles Rust to WASM with TypeScript bindings — tight integration with npm packages.",
      },
      {
        icon: "Cpu",
        title: "SIMD & threads",
        description:
          "WASM SIMD instructions and shared memory threading for parallel workloads in the browser.",
      },
      {
        icon: "Package",
        title: "Component model",
        description:
          "WASM Component Model enables language-agnostic interfaces — compose WASM modules from any language.",
      },
    ],
    subTechs: [{ slug: "rust" }, { slug: "cloudflare-workers" }],
  },
  {
    slug: "dotnet-mvc",
    name: ".NET MVC",
    category: "backend",
    tagline: "Structured MVC web apps with ASP.NET Core",
    description:
      "ASP.NET Core MVC is the mature, convention-over-configuration approach to .NET web development — controllers, views, model binding, and filters in a well-understood pattern. Ideal for server-rendered apps and REST APIs in large .NET teams.",
    accentColor: "violet",
    visualizationKey: "dotnet-mvc",
    logo: "/logos/services/csharp.svg",
    features: [
      {
        icon: "Layers",
        title: "Convention over config",
        description:
          "Route attributes, model binding, and view resolution follow consistent conventions — less ceremony, more consistency.",
      },
      {
        icon: "Shield",
        title: "Built-in filters",
        description:
          "Action filters, exception filters, and result filters for cross-cutting concerns — auth, logging, and caching in one place.",
      },
      {
        icon: "Database",
        title: "EF Core integration",
        description:
          "Entity Framework Core with migrations, LINQ queries, and change tracking — the standard .NET ORM.",
      },
      {
        icon: "FileCode2",
        title: "Swagger / OpenAPI",
        description:
          "Swashbuckle generates OpenAPI specs from controller attributes — interactive docs with zero extra files.",
      },
      {
        icon: "Server",
        title: "Minimal API side-by-side",
        description:
          "Mix MVC controllers and Minimal API endpoints in the same app — adopt incrementally.",
      },
      {
        icon: "Globe",
        title: "Blazor + MVC hybrid",
        description:
          "Render Blazor components inside MVC views — add interactive islands to existing server-rendered pages.",
      },
    ],
    subTechs: [{ slug: "dotnet" }, { slug: "blazor" }],
  },

  // ─── MORE DATABASE ───────────────────────────────────────────────
  {
    slug: "supabase",
    name: "Supabase",
    category: "database",
    tagline: "Open source Firebase alternative on Postgres",
    description:
      "Supabase wraps PostgreSQL with an instant REST and GraphQL API, real-time subscriptions, row-level security, edge functions, and storage — a full backend platform that doesn't lock you in to proprietary tech.",
    accentColor: "green",
    visualizationKey: "supabase",
    logo: "/logos/services/supabase.svg",
    features: [
      {
        icon: "Database",
        title: "Postgres under the hood",
        description:
          "Standard PostgreSQL — use pgvector, PostGIS, full-text search, and any Postgres extension.",
      },
      {
        icon: "Zap",
        title: "Instant REST & GraphQL",
        description:
          "PostgREST auto-generates a REST API from your schema — every table is an API endpoint.",
      },
      {
        icon: "Radio",
        title: "Realtime subscriptions",
        description:
          "Postgres logical replication powers real-time row changes via WebSockets — no polling.",
      },
      {
        icon: "Shield",
        title: "Row-level security",
        description:
          "Policies enforce multi-tenant data access at the database layer — auth context flows through to RLS.",
      },
      {
        icon: "Globe",
        title: "Edge Functions",
        description:
          "Deno-based serverless functions colocated with your database — custom logic without a separate server.",
      },
      {
        icon: "Package",
        title: "Storage & auth built-in",
        description:
          "S3-compatible object storage and authentication included — a complete backend in one platform.",
      },
    ],
    subTechs: [{ slug: "postgresql" }, { slug: "drizzle" }, { slug: "prisma" }],
  },
  {
    slug: "planetscale",
    name: "PlanetScale",
    category: "database",
    tagline: "Serverless MySQL with non-blocking schema changes",
    description:
      "PlanetScale brings Vitess's battle-tested horizontal sharding to a developer-friendly serverless MySQL platform — branching workflows, non-blocking DDL, and connection pooling that handles millions of connections.",
    accentColor: "neutral",
    visualizationKey: "planetscale",
    logo: "/logos/services/planetscale_dark.svg",
    features: [
      {
        icon: "GitBranch",
        title: "Database branching",
        description:
          "Create database branches like Git branches — develop schema changes in isolation, then merge.",
      },
      {
        icon: "Database",
        title: "Non-blocking DDL",
        description:
          "ALTER TABLE runs without locking — zero-downtime schema migrations on a live production database.",
      },
      {
        icon: "Globe",
        title: "Global replicas",
        description:
          "Read replicas in any region — reduce read latency by routing queries to the closest node.",
      },
      {
        icon: "Zap",
        title: "Connection pooling",
        description:
          "PlanetScale handles thousands of serverless connections with built-in connection pooling via PlanetScale's proxy.",
      },
      {
        icon: "Shield",
        title: "Deploy requests",
        description:
          "Schema changes reviewed as pull request equivalents — audited, reversible, and team-approved before merging.",
      },
      {
        icon: "Gauge",
        title: "Vitess scaling",
        description:
          "Horizontal sharding via Vitess under the hood — the same technology that powers YouTube's database.",
      },
    ],
    subTechs: [{ slug: "mysql" }, { slug: "prisma" }, { slug: "drizzle" }],
  },
  {
    slug: "cloudflare-d1",
    name: "Cloudflare D1",
    category: "database",
    tagline: "SQLite at the edge, globally distributed",
    description:
      "Cloudflare D1 brings SQLite to the edge — your database runs in the same data centre as your Cloudflare Worker, eliminating the latency of a remote database call entirely. Full SQL, D1 console, and Wrangler migrations included.",
    accentColor: "amber",
    visualizationKey: "cloudflare-d1",
    logo: "/logos/services/cloudflare-workers.svg",
    features: [
      {
        icon: "Globe",
        title: "Co-located with Workers",
        description:
          "Database and compute in the same PoP — sub-millisecond query latency without a remote round-trip.",
      },
      {
        icon: "Database",
        title: "Full SQLite SQL",
        description:
          "Complete SQLite compatibility — JOINs, transactions, FTS5, and JSON functions all work.",
      },
      {
        icon: "GitBranch",
        title: "Wrangler migrations",
        description:
          "SQL migration files managed via Wrangler CLI — versioned schema changes checked into source control.",
      },
      {
        icon: "Layers",
        title: "D1 Console",
        description:
          "Query your database from the Cloudflare dashboard — browse tables, run SQL, and inspect schema.",
      },
      {
        icon: "Shield",
        title: "Automatic replication",
        description:
          "D1 replicates reads globally — low-latency reads from any Cloudflare region.",
      },
      {
        icon: "Code2",
        title: "Drizzle & Prisma support",
        description:
          "Use Drizzle ORM or raw D1 client bindings — typed queries without writing SQL strings.",
      },
    ],
    subTechs: [
      { slug: "sqlite" },
      { slug: "drizzle" },
      { slug: "cloudflare-workers" },
    ],
  },
  {
    slug: "mysql",
    name: "MySQL",
    category: "database",
    tagline: "The world's most popular open source RDBMS",
    description:
      "MySQL powers some of the largest applications on the web — WordPress, Shopify, Airbnb. We deploy and optimise MySQL for projects that need a proven relational database, especially in Laravel and PHP stacks.",
    accentColor: "blue",
    visualizationKey: "mysql",
    logo: "/logos/services/mysql-icon-dark.svg",
    features: [
      {
        icon: "Database",
        title: "InnoDB transactions",
        description:
          "Full ACID transactions with row-level locking and foreign key constraints via InnoDB.",
      },
      {
        icon: "Zap",
        title: "Query optimisation",
        description:
          "EXPLAIN ANALYZE, index hints, and covering indexes — we tune slow queries to run in milliseconds.",
      },
      {
        icon: "Globe",
        title: "Replication & HA",
        description:
          "Primary-replica replication, Group Replication, and InnoDB Cluster for high availability.",
      },
      {
        icon: "Layers",
        title: "JSON column support",
        description:
          "Native JSON column type with indexable generated columns — semi-structured data alongside relational.",
      },
      {
        icon: "Shield",
        title: "User & privilege system",
        description:
          "Fine-grained GRANT system with role-based permissions — least-privilege access by default.",
      },
      {
        icon: "Package",
        title: "Compatible ORMs",
        description:
          "Prisma, Drizzle, TypeORM, Sequelize, and Eloquent all support MySQL with full feature parity.",
      },
    ],
    subTechs: [
      { slug: "prisma" },
      { slug: "laravel" },
      { slug: "planetscale" },
    ],
  },

  // ─── MORE TOOLING ────────────────────────────────────────────────
  {
    slug: "docker",
    name: "Docker",
    category: "tooling",
    tagline: "Consistent environments from dev to production",
    description:
      'Docker eliminates "works on my machine" — we containerise your application so dev, staging, and production run identically. From single-container apps to multi-service Compose stacks and Kubernetes-ready images.',
    accentColor: "sky",
    visualizationKey: "docker",
    logo: "/logos/services/docker.svg",
    features: [
      {
        icon: "Package",
        title: "Multi-stage builds",
        description:
          "Small production images via multi-stage Dockerfiles — build tooling stays out of the final image.",
      },
      {
        icon: "Layers",
        title: "Docker Compose stacks",
        description:
          "Define your full stack — app, database, cache, and reverse proxy — in a single docker-compose.yml.",
      },
      {
        icon: "GitBranch",
        title: "CI/CD integration",
        description:
          "Build, tag, and push images in CI — GitHub Actions, GitLab CI, and Bitbucket Pipelines covered.",
      },
      {
        icon: "Globe",
        title: "Registry publishing",
        description:
          "Push to Docker Hub, GitHub Container Registry, or AWS ECR — immutable tagged releases.",
      },
      {
        icon: "Shield",
        title: "Security scanning",
        description:
          "Trivy or Docker Scout scan for CVEs in your base image and dependencies before deployment.",
      },
      {
        icon: "Server",
        title: "Kubernetes-ready",
        description:
          "Images built to work in Kubernetes — non-root user, health check endpoints, and graceful shutdown handling.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "python" }],
  },
  {
    slug: "s3",
    name: "S3",
    category: "tooling",
    tagline: "Scalable file storage for any application",
    description:
      "Amazon S3 and S3-compatible services (Cloudflare R2, Supabase Storage, MinIO) power file uploads, media delivery, and backup for your application — with presigned URLs, lifecycle policies, and CDN distribution.",
    accentColor: "amber",
    visualizationKey: "s3",
    logo: null,
    lucideIcon: "CloudUpload",
    features: [
      {
        icon: "CloudUpload",
        title: "Direct browser uploads",
        description:
          "Presigned URLs let clients upload directly to S3 — bypasses your server, no bandwidth cost.",
      },
      {
        icon: "Globe",
        title: "CDN distribution",
        description:
          "CloudFront, Cloudflare, or BunnyCDN in front of S3 — assets served from edge nodes near your users.",
      },
      {
        icon: "Layers",
        title: "Lifecycle policies",
        description:
          "Automatically tier old objects to cheaper storage classes or delete expired files — cost control on autopilot.",
      },
      {
        icon: "Shield",
        title: "Signed URLs & access control",
        description:
          "Private buckets with time-limited presigned URLs — secure file access without exposing bucket credentials.",
      },
      {
        icon: "RefreshCw",
        title: "R2 zero egress",
        description:
          "Cloudflare R2 is S3-compatible with zero egress fees — significant savings for high-bandwidth workloads.",
      },
      {
        icon: "Monitor",
        title: "MinIO self-hosted",
        description:
          "MinIO for on-premise or private cloud S3 — identical API, runs anywhere Docker does.",
      },
    ],
    subTechs: [{ slug: "cloudflare-r2" }],
  },
  {
    slug: "cli",
    name: "CLI Tools",
    category: "tooling",
    tagline: "Developer tools built for the terminal",
    description:
      "We build CLI tools for developer products — internal automation, developer experience tooling, scaffolding CLIs, and deployment scripts. Built in TypeScript/Node or Rust depending on performance requirements.",
    accentColor: "neutral",
    visualizationKey: "cli",
    logo: null,
    lucideIcon: "Terminal",
    features: [
      {
        icon: "Terminal",
        title: "Interactive prompts",
        description:
          "Clack, Inquirer, or Bubbletea for guided interactive prompts — the same UX as create-next-app.",
      },
      {
        icon: "Code2",
        title: "TypeScript with tsx",
        description:
          "Node.js CLIs with TypeScript, tsx for fast execution, and Commander or yargs for argument parsing.",
      },
      {
        icon: "Zap",
        title: "Rust CLIs with Clap",
        description:
          "Single-binary Rust CLIs with Clap — instant startup, no runtime dependency, distributable as a binary.",
      },
      {
        icon: "Package",
        title: "npm / Homebrew distribution",
        description:
          "Publish to npm, GitHub Releases, or Homebrew tap — users install with familiar package managers.",
      },
      {
        icon: "GitBranch",
        title: "Auto-update mechanism",
        description:
          "Detect new versions and prompt to update — CLIs that stay current without user intervention.",
      },
      {
        icon: "Monitor",
        title: "Manpage & shell completion",
        description:
          "Generated man pages and bash/zsh/fish completion scripts — professional-grade CLI ergonomics.",
      },
    ],
    subTechs: [{ slug: "rust" }, { slug: "nodejs" }],
  },
  {
    slug: "tui",
    name: "TUI Apps",
    category: "tooling",
    tagline: "Rich terminal UIs with keyboard-driven interfaces",
    description:
      "Terminal User Interfaces bring dashboard-style interactivity to the terminal — no web server needed. We build TUIs in Rust (Ratatui), Go (Bubble Tea), or Python (Textual) for internal tools, monitoring dashboards, and developer utilities.",
    accentColor: "green",
    visualizationKey: "tui",
    logo: null,
    lucideIcon: "Monitor",
    features: [
      {
        icon: "Terminal",
        title: "Ratatui (Rust)",
        description:
          "Ratatui renders reactive TUIs via crossterm — tables, charts, and input widgets at native speed.",
      },
      {
        icon: "Layers",
        title: "Bubble Tea (Go)",
        description:
          "Elm-inspired TUI framework for Go — single-binary, cross-platform, with composable components.",
      },
      {
        icon: "Paintbrush",
        title: "Textual (Python)",
        description:
          "CSS-styled terminal apps with Textual — familiar styling model, hot-reload during development.",
      },
      {
        icon: "Gauge",
        title: "Real-time dashboards",
        description:
          "Live system metrics, log streaming, and status boards — useful diagnostics without a web browser.",
      },
      {
        icon: "Keyboard",
        title: "Keyboard-first UX",
        description:
          "Designed for power users — vim-style keybindings, modal navigation, and no mouse required.",
      },
      {
        icon: "Package",
        title: "Embeddable in CLIs",
        description:
          "Add a TUI mode to existing CLIs — launch the dashboard UI when no arguments are passed.",
      },
    ],
    subTechs: [{ slug: "rust" }],
  },
  {
    slug: "mcp",
    name: "MCP Servers",
    category: "tooling",
    tagline: "Give AI agents tools, resources, and context",
    description:
      "Model Context Protocol (MCP) lets you expose your data and actions to AI assistants like Claude — we build custom MCP servers that connect your database, APIs, and workflows to AI agents with proper auth and access control.",
    accentColor: "amber",
    visualizationKey: "mcp",
    logo: null,
    lucideIcon: "Network",
    features: [
      {
        icon: "Network",
        title: "Tools & resources",
        description:
          "Expose callable tools (actions) and readable resources (data) to any MCP-compatible AI client.",
      },
      {
        icon: "Shield",
        title: "Auth & access control",
        description:
          "OAuth 2.1 and API key auth for MCP servers — AI agents authenticate like any other client.",
      },
      {
        icon: "Code2",
        title: "TypeScript SDK",
        description:
          "Anthropic's official MCP SDK for TypeScript — typed tool definitions, request handlers, and transport layers.",
      },
      {
        icon: "Database",
        title: "Database access",
        description:
          "Query your database via MCP tools — let AI assistants read schema, run safe queries, and summarise data.",
      },
      {
        icon: "Workflow",
        title: "Workflow automation",
        description:
          "Trigger business logic from AI conversations — CRM updates, ticket creation, and notifications via MCP tools.",
      },
      {
        icon: "Globe",
        title: "Remote & stdio transport",
        description:
          "Serve MCP over HTTP/SSE for remote access or stdio for local integrations — flexible deployment options.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "rest-api" }],
  },

  // ─── SVELTEKIT ──────────────────────────────────────────────────
  {
    slug: "sveltekit",
    name: "SvelteKit",
    category: "frontend",
    tagline: "Full-stack Svelte with adapters for every target",
    description:
      "SvelteKit is the official Svelte meta-framework — file-based routing, server-only load functions, progressive form actions, and adapters that deploy to Vercel, Cloudflare Workers, Node, or static hosting. Fast by default, flexible by design.",
    accentColor: "orange",
    visualizationKey: "sveltekit",
    logo: "/logos/services/svelte.svg",
    features: [
      {
        icon: "Route",
        title: "File-based routing",
        description:
          "Routes defined by the filesystem — +page.svelte, +layout.svelte, +error.svelte. No config, no magic strings.",
      },
      {
        icon: "Server",
        title: "Server load functions",
        description:
          "+page.server.ts load functions run exclusively on the server — fetch data, read databases, no leaking secrets.",
      },
      {
        icon: "MousePointerClick",
        title: "Progressive form actions",
        description:
          "Form actions handle mutations on the server with progressive enhancement — works without JS, enhanced when available.",
      },
      {
        icon: "CloudUpload",
        title: "Adapter-agnostic deployment",
        description:
          "Single adapter swap to target Vercel, Cloudflare Workers, Node.js, Netlify, or fully static output.",
      },
      {
        icon: "Zap",
        title: "Streaming & defer",
        description:
          "Stream slow data with SvelteKit's `defer` — fast shell renders immediately while slow promises resolve.",
      },
      {
        icon: "Shield",
        title: "Hooks & middleware",
        description:
          "Server hooks for auth, logging, and request transformation — handle API requests and page loads in one place.",
      },
    ],
    subTechs: [
      { slug: "svelte" },
      { slug: "tailwind" },
      { slug: "drizzle" },
      { slug: "better-auth" },
    ],
  },

  // ─── CLOUDFLARE R2 ──────────────────────────────────────────────
  {
    slug: "cloudflare-r2",
    name: "Cloudflare R2",
    category: "tooling",
    tagline: "S3-compatible object storage with zero egress fees",
    description:
      "Cloudflare R2 is an S3-compatible object storage service with no egress charges — making it dramatically cheaper than AWS S3 for high-bandwidth workloads. We use R2 for media storage, backups, and large-scale asset delivery.",
    accentColor: "amber",
    visualizationKey: "cloudflare-r2",
    logo: "/logos/services/cloudflare-workers.svg",
    features: [
      {
        icon: "CloudUpload",
        title: "Zero egress fees",
        description:
          "Data transfer out of R2 is free — no surprise bandwidth bills when your content gets popular.",
      },
      {
        icon: "Globe",
        title: "S3-compatible API",
        description:
          "Drop-in replacement for AWS S3 — existing SDKs (aws-sdk, boto3) work with R2 via endpoint override.",
      },
      {
        icon: "Shield",
        title: "Presigned URLs",
        description:
          "Time-limited presigned URLs for secure direct uploads and downloads — clients never see your credentials.",
      },
      {
        icon: "Zap",
        title: "R2 + Workers binding",
        description:
          "Access R2 directly from Cloudflare Workers via native bindings — no HTTP round-trip, no auth headers.",
      },
      {
        icon: "Globe",
        title: "Custom domain delivery",
        description:
          "Serve R2 assets from your own domain via Cloudflare's CDN — cached at 300+ edge locations worldwide.",
      },
      {
        icon: "Layers",
        title: "Lifecycle rules",
        description:
          "Automatic object expiry and class transitions — clean up temp uploads and archive old data on a schedule.",
      },
    ],
    subTechs: [{ slug: "cloudflare-workers" }, { slug: "s3" }],
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return servicesConfig.find((s) => s.slug === slug);
}

export const frontendServices = servicesConfig.filter(
  (s) => s.category === "frontend"
);
export const backendServices = servicesConfig.filter(
  (s) => s.category === "backend"
);
export const mobileServices = servicesConfig.filter(
  (s) => s.category === "mobile"
);
export const desktopServices = servicesConfig.filter(
  (s) => s.category === "desktop"
);
export const designServices = servicesConfig.filter(
  (s) => s.category === "design"
);
export const cmsServices = servicesConfig.filter((s) => s.category === "cms");
export const toolingServices = servicesConfig.filter(
  (s) => s.category === "tooling"
);
export const databaseServices = servicesConfig.filter(
  (s) => s.category === "database"
);
export const authServices = servicesConfig.filter((s) => s.category === "auth");
export const paymentsServices = servicesConfig.filter(
  (s) => s.category === "payments"
);
