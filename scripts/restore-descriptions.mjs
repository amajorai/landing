import { readFileSync, writeFileSync } from "fs";

let content = readFileSync(
  "C:/Code/amajor-landing/lib/services-config.ts",
  "utf-8"
);

function replaceFeature(icon, title, description) {
  const old = `        icon: "${icon}",\n        title: "${title}",\n      },`;
  const newVal = `        icon: "${icon}",\n        title: "${title}",\n        description:\n          "${description}",\n      },`;
  if (content.includes(old)) {
    const count = content.split(old).length - 1;
    if (count > 1) {
      console.log(
        `WARNING: multiple (${count}) matches for ${icon}/${title} - replacing first only`
      );
    }
    content = content.replace(old, newVal);
    console.log(`OK: ${icon}/${title}`);
  } else {
    console.log(`SKIP (not found): ${icon}/${title}`);
  }
}

// Vue
replaceFeature(
  "Code2",
  "Composition API",
  "Vue 3 Composition API with full TypeScript support for composables that are a joy to reuse."
);
replaceFeature(
  "Database",
  "Pinia state management",
  "Type-safe, modular stores with Pinia \u2014 no more Vuex boilerplate, full DevTools support."
);
replaceFeature(
  "RefreshCw",
  "Vue Query integration",
  "Async data fetching, caching, and background refetching patterns that keep your UI consistent without manual loading state."
);
replaceFeature(
  "Monitor",
  "Vue DevTools",
  "Browser extension and standalone devtools to inspect component tree, props, events, and Pinia store state in real time."
);

// Fumadocs
replaceFeature(
  "FileText",
  "MDX-powered content",
  "Write docs in Markdown with custom React components \u2014 callouts, tabs, code groups, and more."
);
replaceFeature(
  "Search",
  "Full-text search",
  "Built-in search with Orama or Algolia \u2014 instant results as users type, no extra backend."
);
replaceFeature(
  "FileCode2",
  "Auto-generated API reference",
  "Point Fumadocs at your OpenAPI spec and get a fully rendered, interactive API reference."
);
replaceFeature(
  "History",
  "Versioned docs",
  "Manage multiple release versions side by side \u2014 users always see the docs for their version."
);
replaceFeature(
  "Server",
  "Static generation",
  "Built on Next.js App Router \u2014 every page is statically generated for instant first loads."
);
replaceFeature(
  "Terminal",
  "Shiki syntax highlighting",
  "Server-side code highlighting with Shiki \u2014 accurate grammar, zero client-side JS cost."
);

// WordPress
replaceFeature(
  "Blocks",
  "Custom Gutenberg blocks",
  "Bespoke React-powered blocks that editors love \u2014 your brand, your layout options, no theme limitations."
);
replaceFeature(
  "Link",
  "Headless WordPress",
  "WP as a content API with a Next.js or Astro frontend \u2014 best-of-both for editorial flexibility and frontend performance."
);
replaceFeature(
  "ShoppingCart",
  "WooCommerce stores",
  "Custom checkout flows, product configurators, and payment gateways built for your business model."
);
replaceFeature(
  "Layout",
  "ACF Pro field groups",
  "Structured content editing with Advanced Custom Fields \u2014 editors fill in forms, not raw HTML."
);
replaceFeature(
  "Network",
  "WordPress Multisite",
  "Enterprise content networks with shared themes, plugins, and SSO across dozens of sites."
);
replaceFeature(
  "Gauge",
  "Sub-200ms TTFB",
  "Full-page caching with object cache, CDN, and image optimisation \u2014 fast for every visitor."
);

// Tailwind CSS
replaceFeature(
  "Paintbrush",
  "Design token architecture",
  "Color, spacing, typography, and shadow tokens defined once, used everywhere \u2014 in code and Figma."
);
replaceFeature(
  "Code2",
  "Tailwind v4 with CSS vars",
  "CSS-native custom properties via Tailwind v4 \u2014 theming with zero JavaScript overhead."
);
replaceFeature(
  "Component",
  "shadcn/ui component library",
  "Unstyled, accessible Radix primitives customised to match your brand, extended with your logic."
);
replaceFeature(
  "Moon",
  "Dark mode & theming",
  "System-aware dark mode, custom brand themes, and motion preference support built in from day one."
);
replaceFeature(
  "BookOpen",
  "Storybook documentation",
  "Every component documented, with usage examples, prop tables, and accessibility annotations."
);
replaceFeature(
  "PenTool",
  "Figma \u2194 code handoff",
  "Token sync between Figma and your codebase \u2014 design changes propagate to code, not just mockups."
);

// .NET
replaceFeature(
  "Server",
  "ASP.NET Core APIs",
  "RESTful and minimal APIs with OpenAPI documentation, versioning, and built-in rate limiting."
);
replaceFeature(
  "Layers",
  "Clean Architecture & DDD",
  "Domain-Driven Design with clear boundaries \u2014 your business logic stays independent of frameworks."
);
replaceFeature(
  "Database",
  "Entity Framework Core",
  "Typed queries, migrations, and optimised loading patterns \u2014 no N+1 queries reaching your database."
);
replaceFeature(
  "MessageSquare",
  "SignalR real-time",
  "Bi-directional WebSocket communication for live dashboards, notifications, and collaborative features."
);
replaceFeature(
  "Timer",
  "Background services",
  "Hangfire or hosted worker services for scheduled jobs, event processing, and async workflows."
);
replaceFeature(
  "CloudUpload",
  "Azure-native deployment",
  "Containerised workloads on Azure App Service, Container Apps, or AKS \u2014 with managed identity and Key Vault."
);

// Laravel
replaceFeature(
  "Globe",
  "RESTful APIs with auth",
  "Sanctum or Passport for token and session-based auth \u2014 SPA, mobile, and third-party API access covered."
);
replaceFeature(
  "Database",
  "Eloquent ORM",
  "Expressive relationships, eager loading, and query scopes \u2014 readable code that maps cleanly to your schema."
);
replaceFeature(
  "Workflow",
  "Queue workers",
  "Redis-backed job queues for async email, notifications, webhooks, and anything that shouldn't block a request."
);
replaceFeature(
  "Zap",
  "Livewire reactive UIs",
  "Full-page and component-level reactivity without leaving PHP \u2014 great for admin tools and internal apps."
);
replaceFeature(
  "Layout",
  "Filament admin panels",
  "Beautiful, fully-featured admin panels built with Filament in days \u2014 tables, forms, charts, actions."
);
replaceFeature(
  "FlaskConical",
  "Pest PHP test suites",
  "Expressive, readable tests with Pest \u2014 unit, feature, and browser tests in CI on every push."
);

// Python
replaceFeature(
  "Zap",
  "FastAPI async services",
  "Async I/O, automatic OpenAPI docs, and Pydantic validation \u2014 high-throughput APIs with minimal code."
);
replaceFeature(
  "Server",
  "Django REST Framework",
  "Feature-complete backends with viewsets, serialisers, and permissions for content-heavy applications."
);
replaceFeature(
  "BarChart2",
  "Data pipelines",
  "ETL and ELT workflows with Pandas, Polars, or dbt \u2014 from raw sources to clean analytical models."
);
replaceFeature(
  "Brain",
  "LLM integrations",
  "Anthropic, OpenAI, and LangChain integrations \u2014 RAG pipelines, agents, and structured output."
);
replaceFeature(
  "Cpu",
  "ML model serving",
  "Model inference endpoints with sub-50ms latency using FastAPI, BentoML, or Ray Serve."
);
replaceFeature(
  "Layers",
  "Celery task queues",
  "Distributed async task processing with Celery and Redis or RabbitMQ \u2014 retries, priorities, scheduling."
);

// Node.js
replaceFeature(
  "Link",
  "tRPC end-to-end types",
  "Full TypeScript type safety from server to client \u2014 no code generation, no schema duplication."
);
replaceFeature(
  "Zap",
  "Hono for edge APIs",
  "Ultra-lightweight Hono APIs that run on Cloudflare Workers, Deno Deploy, and Bun with sub-millisecond cold starts."
);
replaceFeature(
  "Database",
  "Prisma ORM",
  "Type-safe database queries with Prisma \u2014 schema-as-source-of-truth with auto-generated migrations."
);
replaceFeature(
  "Radio",
  "WebSocket & SSE",
  "Real-time event streams for live feeds, collaborative features, and server-pushed notifications."
);
replaceFeature(
  "Workflow",
  "BullMQ job queues",
  "Redis-backed job processing with BullMQ \u2014 delayed jobs, priorities, rate limiting, and retry strategies."
);
replaceFeature(
  "Cpu",
  "Bun runtime",
  "Faster startup, faster tests, and a built-in toolkit \u2014 npm-compatible with measurably better performance."
);

// Kotlin
replaceFeature(
  "Layout",
  "Jetpack Compose UI",
  "Declarative, animated UIs with Compose \u2014 reactive state, custom layouts, and fluid Material 3 transitions."
);
replaceFeature(
  "Workflow",
  "Coroutines + Flow",
  "Structured concurrency and reactive streams \u2014 async code that's readable, cancellable, and testable."
);
replaceFeature(
  "Database",
  "Room database",
  "Type-safe SQLite with Room \u2014 compile-time query verification and Flow-based reactive queries."
);
replaceFeature(
  "Puzzle",
  "Hilt dependency injection",
  "Hilt makes your architecture testable by design \u2014 ViewModels, repositories, and use cases all injectable."
);
replaceFeature(
  "Timer",
  "WorkManager",
  "Reliable background processing that survives app restarts, Doze mode, and process death."
);
replaceFeature(
  "Paintbrush",
  "Material Design 3",
  "Custom theming, dynamic color from wallpaper, and full M3 component support."
);

// Swift
replaceFeature(
  "Layout",
  "SwiftUI with async/await",
  "Declarative UI with structured concurrency \u2014 reactive state, custom view modifiers, and smooth animations."
);
replaceFeature(
  "Workflow",
  "Combine framework",
  "Reactive data binding with Combine publishers \u2014 async pipelines that transform and deliver data to views."
);
replaceFeature(
  "Database",
  "Core Data + CloudKit",
  "Local persistence with CloudKit sync \u2014 your users' data available across all their Apple devices."
);
replaceFeature(
  "SquareDashedBottom",
  "WidgetKit",
  "Home screen and lock screen widgets that surface your app's key information at a glance."
);
replaceFeature(
  "Smartphone",
  "App Clips",
  "Lightweight instant-launch experiences \u2014 users access core functionality without installing the full app."
);
replaceFeature(
  "Play",
  "TestFlight distribution",
  "Beta testing with TestFlight and App Store submission \u2014 code signing, provisioning, and release management handled."
);

// Astro
replaceFeature(
  "Zap",
  "Zero JS by default",
  "Astro ships HTML and CSS only \u2014 JavaScript is opt-in per component via the island pattern."
);
replaceFeature(
  "Globe",
  "Content collections",
  "Type-safe content APIs for Markdown, MDX, and JSON \u2014 schema validation with Zod included."
);
replaceFeature(
  "Layers",
  "Framework agnostic islands",
  "Mix React, Vue, Svelte, and Solid components on the same page \u2014 each hydrates independently."
);
replaceFeature(
  "Server",
  "SSR & hybrid rendering",
  "Per-route rendering modes \u2014 static, server-rendered, and edge-compatible via adapters."
);
replaceFeature(
  "Search",
  "Built for SEO",
  "Perfect Lighthouse scores out of the box \u2014 structured data, canonical URLs, and sitemaps via integrations."
);
replaceFeature(
  "BookOpen",
  "Starlight docs",
  "Astro's official docs theme \u2014 full-text search, versioning, i18n, and a clean reading experience."
);

// SolidJS
replaceFeature(
  "Zap",
  "Fine-grained reactivity",
  "Solid's signals update only the exact DOM nodes that changed \u2014 no component re-renders, ever."
);
replaceFeature(
  "Server",
  "SolidStart SSR",
  "File-based routing, server functions, and streaming SSR \u2014 the full-stack Solid experience."
);
replaceFeature(
  "Code2",
  "JSX without React",
  "Familiar JSX syntax that compiles to direct DOM operations \u2014 zero runtime overhead."
);
replaceFeature(
  "Gauge",
  "Top benchmark performance",
  "Consistently among the fastest JS frameworks in independent benchmarks \u2014 real-world and synthetic."
);
replaceFeature(
  "Component",
  "Primitives over abstractions",
  "Signals, effects, and memos compose naturally \u2014 build your own abstractions on solid foundations."
);
replaceFeature(
  "Package",
  "Tiny bundle size",
  "The Solid runtime is under 7KB gzipped \u2014 your code dominates the bundle, not the framework."
);

// TanStack
replaceFeature(
  "Route",
  "TanStack Router",
  "100% type-safe routing with search params, loaders, and nested layouts \u2014 no route string guessing."
);
replaceFeature(
  "Server",
  "TanStack Start",
  "Full-stack React framework built on TanStack Router with server functions and SSR."
);
replaceFeature(
  "RefreshCw",
  "TanStack Query",
  "Async state management with caching, background refetch, optimistic updates, and infinite scroll."
);
replaceFeature(
  "Layout",
  "TanStack Table",
  "Headless table logic \u2014 sorting, filtering, pagination, virtualisation \u2014 fully controlled."
);
replaceFeature(
  "FileText",
  "TanStack Form",
  "Type-safe form state with first-class validation, async submission, and zero dependencies."
);
replaceFeature(
  "Code2",
  "Framework agnostic",
  "Every TanStack library works with React, Vue, Solid, Angular, and Svelte via adapters."
);

writeFileSync(
  "C:/Code/amajor-landing/lib/services-config.ts",
  content,
  "utf-8"
);
console.log("\nDone! File written.");
