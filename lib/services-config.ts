export type ServiceCategory =
  | "frontend"
  | "full-stack"
  | "backend"
  | "mobile"
  | "desktop"
  | "design"
  | "cms"
  | "tooling"
  | "database"
  | "auth"
  | "payments";

export type PageType = "tech" | "cms" | "offering";
export type TargetAudience = "developers" | "businesses" | "both";

export interface SubTech {
  slug: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description?: string;
}

export interface ServiceChallenge {
  title: string;
  description: string;
}

export interface ServiceBestPractice {
  tip: string;
  detail?: string;
}

export interface ServiceLink {
  title: string;
  url: string;
  type: "docs" | "tutorial" | "community" | "tool";
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceConfig {
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  accentColor: string;
  visualizationKey: string;
  logo: string | null;
  logoDark?: string | null;
  logoDarkInvert?: boolean;
  lucideIcon?: string;
  features: ServiceFeature[];
  subTechs: SubTech[];
  pageType?: PageType;
  targetAudience?: TargetAudience;
  overview?: string;
  challenges?: ServiceChallenge[];
  bestPractices?: ServiceBestPractice[];
  usefulLinks?: ServiceLink[];
  faq?: ServiceFaq[];
  quickstart?: string;
  quickstartLang?: string;
  docsUrl?: string;
}

export const servicesConfig: ServiceConfig[] = [
  // ─── FRONTEND ───────────────────────────────────────────────────
  {
    slug: "react",
    name: "React",
    category: "frontend",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "React is a JavaScript library for building user interfaces, maintained by Meta and a massive open-source community. It introduced the component model that most modern UI frameworks now follow — composable, declarative views driven by state. React dominates the frontend landscape powering everything from startups to Fortune 500 dashboards. But building production-grade React apps requires deep knowledge of rendering strategies, state management, performance tuning, and the ever-evolving ecosystem.",
    challenges: [
      {
        title: "State management complexity",
        description:
          "As apps grow, choosing between Context, Redux, Zustand, Jotai, or server state libraries like TanStack Query becomes a critical architectural decision that's hard to reverse.",
      },
      {
        title: "Server vs. client components",
        description:
          "React Server Components and the App Router fundamentally change how you think about data fetching, but mixing server and client boundaries introduces subtle bugs and performance pitfalls.",
      },
      {
        title: "Performance at scale",
        description:
          "Re-renders, bundle size, hydration costs, and Core Web Vitals all demand careful attention — what works in a demo breaks in production with real data.",
      },
      {
        title: "Ecosystem churn",
        description:
          "The React ecosystem moves fast. Keeping up with new patterns (RSC, use(), Server Actions) while maintaining existing code is a full-time job.",
      },
    ],
    bestPractices: [
      {
        tip: "Co-locate state with the components that use it",
        detail:
          "Avoid lifting state higher than necessary. Use composition and component boundaries to keep re-renders contained.",
      },
      {
        tip: "Default to Server Components",
        detail:
          "In Next.js App Router, keep components on the server unless they need interactivity. This reduces bundle size and speeds up initial load.",
      },
      {
        tip: "Use Suspense boundaries for data loading",
        detail:
          "Wrap async components in Suspense to show loading states without blocking the entire page from rendering.",
      },
      {
        tip: "Memoize expensive computations, not everything",
        detail:
          "useMemo and useCallback help with genuinely expensive work, but over-memoization adds complexity with no benefit.",
      },
    ],
    usefulLinks: [
      { title: "React Documentation", url: "https://react.dev", type: "docs" },
      { title: "Next.js Docs", url: "https://nextjs.org/docs", type: "docs" },
      {
        title: "TanStack Query",
        url: "https://tanstack.com/query",
        type: "tool",
      },
      {
        title: "React TypeScript Cheatsheet",
        url: "https://react-typescript-cheatsheet.netlify.app",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "When should I use React vs. Vue or Svelte?",
        answer:
          "React is the best choice when you need a large talent pool, a mature ecosystem, and long-term support. Vue excels for progressive adoption, and Svelte for smaller apps with minimal overhead. For enterprise or SaaS projects, React's ecosystem is unmatched.",
      },
      {
        question: "Do I need Next.js to use React?",
        answer:
          "No — React works standalone with Vite or other bundlers. But Next.js adds server-side rendering, file-based routing, and API routes that most production apps need. We recommend Next.js for any project that values SEO or fast initial loads.",
      },
      {
        question: "How much does it cost to build a React application?",
        answer:
          "Costs vary widely based on complexity. A marketing site might be $5K–15K, while a full SaaS dashboard can be $30K–100K+. We scope every project with a free consultation so you know exactly what you're paying for.",
      },
      {
        question: "Can you take over an existing React codebase?",
        answer:
          "Absolutely. We regularly inherit codebases, audit them for tech debt and performance issues, and incrementally improve them while shipping new features.",
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
        description:
          "Template, script, and styles in one .vue file — colocation that scales from prototypes to enterprise apps.",
      },
      {
        icon: "Zap",
        title: "Vite-powered dev server",
        description:
          "Instant HMR and native ES module dev server — sub-second feedback loops even in large projects.",
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
    overview:
      "Vue.js is a progressive JavaScript framework for building user interfaces — approachable enough for a weekend prototype yet powerful enough for enterprise SPAs. Vue 3's Composition API and TypeScript-first design make it a serious contender alongside React for complex applications. Its gentle learning curve and excellent documentation have earned it a passionate community and widespread adoption in Asia-Pacific markets, enterprise tooling, and content-heavy platforms. At A Major, we leverage Vue's reactivity system and the Nuxt ecosystem to deliver fast, maintainable frontends.",
    challenges: [
      {
        title: "Options API vs. Composition API migration",
        description:
          "Vue 3's Composition API is the recommended approach, but migrating large Options API codebases requires rethinking component structure, mixins, and shared logic patterns.",
      },
      {
        title: "Ecosystem fragmentation",
        description:
          "Choosing between Pinia vs. legacy Vuex, Vue Router 4 quirks, and the Nuxt vs. plain Vue decision creates analysis paralysis for teams starting new projects.",
      },
      {
        title: "TypeScript integration gaps",
        description:
          "While Vue 3 is written in TypeScript, template type checking (via Volar/vue-tsc) still has edge cases with complex generics, slots, and provide/inject patterns.",
      },
      {
        title: "SSR hydration mismatches",
        description:
          "Server-side rendering with Nuxt introduces hydration mismatches from browser-only APIs, third-party scripts, and date/locale differences between server and client.",
      },
    ],
    bestPractices: [
      {
        tip: "Use composables for reusable logic",
        detail:
          "Extract shared reactive logic into composable functions (useAuth, useFetch) — they're testable, tree-shakeable, and avoid the pitfalls of mixins.",
      },
      {
        tip: "Adopt Pinia from day one",
        detail:
          "Pinia is the official Vue state management library. Its modular store pattern, DevTools integration, and TypeScript support make it the clear choice over Vuex.",
      },
      {
        tip: "Enable strict template type checking",
        detail:
          "Configure vue-tsc in CI to catch template errors at build time — this catches typos in props, events, and slot bindings before they reach production.",
      },
      {
        tip: "Prefer script setup syntax",
        detail:
          "<script setup> reduces boilerplate by 30-40%, enables better TypeScript inference, and is the recommended default for all new Vue 3 components.",
      },
    ],
    usefulLinks: [
      { title: "Vue.js Documentation", url: "https://vuejs.org", type: "docs" },
      {
        title: "Nuxt Documentation",
        url: "https://nuxt.com/docs",
        type: "docs",
      },
      { title: "Pinia Store", url: "https://pinia.vuejs.org", type: "tool" },
      {
        title: "VueUse Composables",
        url: "https://vueuse.org",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "When should I use Vue vs. React?",
        answer:
          "Vue offers a gentler learning curve, built-in state management, and an opinionated ecosystem. React has a larger talent pool and more third-party libraries. Choose Vue when your team values convention over configuration, or when adopting Nuxt's full-stack DX. Choose React for maximum ecosystem breadth.",
      },
      {
        question: "How much does it cost to build a Vue.js application?",
        answer:
          "A Vue marketing site or dashboard might cost $5K–20K. A full SaaS app with Nuxt, auth, and real-time features typically runs $25K–80K+. We scope every engagement with a free consultation.",
      },
      {
        question: "Is Vue still relevant in 2025?",
        answer:
          "Absolutely. Vue 3 is mature, actively maintained, and used by companies like Alibaba, GitLab, and Nintendo. The ecosystem is thriving with Nuxt 3, Pinia, and VueUse.",
      },
      {
        question: "Vue 2 vs. Vue 3 — should I migrate?",
        answer:
          "Yes. Vue 2 reached end of life in December 2023. Vue 3 offers better TypeScript support, the Composition API, Pinia, and significantly improved performance. We help teams plan and execute migrations incrementally.",
      },
    ],
    quickstart:
      "npm create vue@latest my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://vuejs.org",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Svelte shifts reactivity to the compiler — no virtual DOM diffing, just surgical DOM updates at build time.",
      },
      {
        icon: "Package",
        title: "Minimal bundle size",
        description:
          "No runtime framework shipped to the browser — your bundle contains only the code your components actually use.",
      },
      {
        icon: "Wand2",
        title: "Built-in transitions & animations",
        description:
          "First-class transition directives for enter/exit animations, crossfades, and spring physics without extra libraries.",
      },
      {
        icon: "Code2",
        title: "Svelte 5 runes",
        description:
          "$state, $derived, and $effect runes give you explicit, fine-grained reactivity with clear data flow.",
      },
      {
        icon: "Component",
        title: "Scoped styles by default",
        description:
          "CSS written in a Svelte component is automatically scoped — no class name collisions, no CSS-in-JS overhead.",
      },
      {
        icon: "Globe",
        title: "Framework-agnostic use",
        description:
          "Compile Svelte components as custom elements and use them in React, Vue, or vanilla HTML projects.",
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
    overview:
      "Svelte takes a radically different approach to building UIs — it's a compiler that transforms your declarative components into highly efficient, imperative vanilla JavaScript at build time. There's no virtual DOM diffing at runtime, no framework overhead shipped to the browser. The result is tiny bundles and blazing-fast updates. Svelte 5 introduces runes, a signals-based reactivity system that's both more explicit and more powerful than Svelte 4's implicit reactivity. With SvelteKit for full-stack apps, Svelte is a compelling choice for teams that prioritize performance and developer experience.",
    challenges: [
      {
        title: "Smaller ecosystem than React/Vue",
        description:
          "While growing rapidly, Svelte has fewer third-party component libraries, form solutions, and enterprise tooling compared to React. You'll build more from scratch or adapt generic JS libraries.",
      },
      {
        title: "Svelte 4 to Svelte 5 migration",
        description:
          "Svelte 5's runes ($state, $derived, $effect) replace the implicit reactivity model. Migrating existing codebases requires rethinking reactive declarations and stores.",
      },
      {
        title: "Limited TypeScript template checking",
        description:
          "Svelte's template language has improving but still imperfect TypeScript support — complex generics and event typing can be frustrating compared to TSX.",
      },
      {
        title: "SSR edge cases in SvelteKit",
        description:
          "Browser-only APIs, third-party script loading, and adapter differences between Vercel/Cloudflare/Node can create subtle SSR issues that are hard to debug.",
      },
    ],
    bestPractices: [
      {
        tip: "Adopt Svelte 5 runes for new projects",
        detail:
          "$state, $derived, and $effect give you explicit, fine-grained reactivity that's easier to reason about and debug than Svelte 4's implicit model.",
      },
      {
        tip: "Use SvelteKit for anything beyond a widget",
        detail:
          "SvelteKit provides routing, SSR, code splitting, and deployment adapters. There's no reason to wire these up manually for a Svelte project.",
      },
      {
        tip: "Keep components small and composable",
        detail:
          "Svelte's scoped styles and low overhead make small components practically free. Prefer many small components over fewer large ones.",
      },
      {
        tip: "Leverage server-only load functions",
        detail:
          "SvelteKit's +page.server.ts keeps secrets, database calls, and heavy logic off the client — use it by default and move to universal load only when needed.",
      },
    ],
    usefulLinks: [
      {
        title: "Svelte Documentation",
        url: "https://svelte.dev/docs",
        type: "docs",
      },
      {
        title: "SvelteKit Docs",
        url: "https://svelte.dev/docs/kit",
        type: "docs",
      },
      {
        title: "Svelte REPL",
        url: "https://svelte.dev/playground",
        type: "tool",
      },
      {
        title: "Svelte Society",
        url: "https://sveltesociety.dev",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Svelte vs. React — which should I choose?",
        answer:
          "Choose Svelte for smaller bundles, faster runtime performance, and a simpler mental model. Choose React when you need the largest ecosystem, more hiring options, and enterprise library support. For content-heavy sites and performance-critical apps, Svelte often wins.",
      },
      {
        question: "How much does it cost to build a Svelte app?",
        answer:
          "A Svelte marketing site or small app costs $5K–15K. Full-stack SvelteKit applications with auth, database, and real-time features typically run $20K–60K+. We provide free scoping consultations.",
      },
      {
        question: "Is Svelte production-ready?",
        answer:
          "Yes. Svelte and SvelteKit are used in production by companies like Apple, Spotify, The New York Times, and Square. Svelte 5 is stable and SvelteKit 2 is mature.",
      },
      {
        question: "Can Svelte components be used in React or Vue projects?",
        answer:
          "Svelte compiles to vanilla JS, so components can be wrapped as web components and used anywhere. However, for deep framework integration, you'd typically pick one framework per project.",
      },
    ],
    quickstart: "npx sv create my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://svelte.dev/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Fumadocs is a modern documentation framework built on Next.js App Router — purpose-built for developer documentation sites that need full-text search, MDX content authoring, API reference generation, and versioning out of the box. Unlike generic static site generators, Fumadocs gives you a polished reading experience with syntax highlighting, content collections, and interactive components while keeping everything statically generated for instant loads. It's our go-to when clients need documentation that developers actually enjoy using.",
    challenges: [
      {
        title: "Next.js App Router knowledge required",
        description:
          "Fumadocs is tightly coupled to Next.js App Router conventions — teams unfamiliar with RSC, layouts, and the app directory will face a learning curve before customizing effectively.",
      },
      {
        title: "Custom component integration",
        description:
          "While MDX support is excellent, building custom interactive components (live code editors, API playgrounds) requires understanding Fumadocs' plugin system and serialization boundaries.",
      },
      {
        title: "Search configuration complexity",
        description:
          "Choosing between built-in Orama search, Algolia, or a custom search backend — and configuring indexing, relevance tuning, and facets — requires careful planning for large doc sites.",
      },
      {
        title: "Multi-version documentation management",
        description:
          "Managing docs for multiple product versions simultaneously (v1, v2, beta) introduces content duplication challenges and requires a clear branching and content strategy.",
      },
    ],
    bestPractices: [
      {
        tip: "Use content collections with Zod schemas",
        detail:
          "Define strict schemas for your frontmatter — title, description, category, version. This catches errors at build time and enables type-safe content queries.",
      },
      {
        tip: "Organize docs by user journey, not API structure",
        detail:
          "Structure navigation around what users need to do (Getting Started, Guides, Reference) rather than mirroring your internal code organization.",
      },
      {
        tip: "Enable OpenAPI integration for API docs",
        detail:
          "Point Fumadocs at your OpenAPI spec to auto-generate interactive API reference pages — keeps docs in sync with your actual API without manual maintenance.",
      },
      {
        tip: "Pre-render everything with static generation",
        detail:
          "Fumadocs on Next.js App Router can statically generate every page — use generateStaticParams for instant loads and zero server cost.",
      },
    ],
    usefulLinks: [
      {
        title: "Fumadocs Documentation",
        url: "https://fumadocs.vercel.app",
        type: "docs",
      },
      {
        title: "Fumadocs GitHub",
        url: "https://github.com/fuma-nama/fumadocs",
        type: "tool",
      },
      {
        title: "Next.js App Router Docs",
        url: "https://nextjs.org/docs/app",
        type: "docs",
      },
      {
        title: "MDX Documentation",
        url: "https://mdxjs.com",
        type: "docs",
      },
    ],
    faq: [
      {
        question:
          "Fumadocs vs. Docusaurus vs. Nextra — which documentation framework should I use?",
        answer:
          "Fumadocs is the best choice if you're already in the Next.js ecosystem and want App Router support, static generation, and modern React features. Docusaurus is more mature with a larger plugin ecosystem. Nextra is simpler but less feature-rich. We recommend Fumadocs for new projects.",
      },
      {
        question: "How much does it cost to build a documentation site?",
        answer:
          "A Fumadocs documentation site typically costs $5K–20K depending on complexity — number of pages, custom components, search configuration, and API reference integration. We offer free consultations to scope your project.",
      },
      {
        question: "Can Fumadocs handle large documentation sites?",
        answer:
          "Yes. Fumadocs leverages Next.js static generation, so even sites with thousands of pages build efficiently and load instantly. Full-text search with Orama works client-side with no backend needed.",
      },
      {
        question: "Do I need to know Next.js to use Fumadocs?",
        answer:
          "Basic Next.js knowledge helps, but Fumadocs provides enough structure that content authors can work primarily in MDX files. Customization and theming do require Next.js App Router understanding.",
      },
    ],
    quickstart: "npx create-fumadocs-app my-docs\ncd my-docs\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://fumadocs.vercel.app",
    pageType: "tech",
    targetAudience: "developers",
  },

  // ─── CMS ────────────────────────────────────────────────────────
  {
    slug: "wordpress",
    name: "WordPress",
    category: "cms",
    pageType: "cms",
    targetAudience: "businesses",
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
    overview:
      "WordPress powers over 40% of all websites on the internet — from small business sites to major publishers. But most WordPress sites are slow, insecure, and hard to maintain because they were built with off-the-shelf themes and too many plugins. We build WordPress differently: custom block editors your team can actually use, headless architectures for blazing-fast frontends, and WooCommerce stores that convert. Whether you need a redesign, migration, or ground-up build, we deliver WordPress that performs.",
    challenges: [
      {
        title: "Plugin bloat and security risks",
        description:
          "Most WordPress sites rely on dozens of plugins that conflict, slow down page loads, and create security vulnerabilities. Each plugin is a potential attack surface.",
      },
      {
        title: "Slow page speeds",
        description:
          "Generic themes and unoptimized hosting cause poor Core Web Vitals scores, hurting both user experience and Google rankings.",
      },
      {
        title: "Difficult content management",
        description:
          "Without custom block editors, your team is stuck fighting page builders or editing raw HTML — neither is productive.",
      },
      {
        title: "Migration complexity",
        description:
          "Moving from another platform (Wix, Squarespace, Drupal) to WordPress without losing SEO equity, content, or redirects requires careful planning.",
      },
    ],
    bestPractices: [
      {
        tip: "Use custom Gutenberg blocks instead of page builders",
        detail:
          "Page builders add 500KB+ of JS and make content locked-in. Custom blocks give editors the same drag-and-drop feel with clean, portable markup.",
      },
      {
        tip: "Implement full-page caching and a CDN",
        detail:
          "WordPress should serve cached HTML from edge servers — typical TTFB drops from 2s to under 200ms.",
      },
      {
        tip: "Minimize plugins, maximize custom code",
        detail:
          "Every plugin is a dependency you don't control. Build critical functionality as custom plugins or theme functions.",
      },
      {
        tip: "Set up staging environments and version control",
        detail:
          "Never edit production directly. Use Git-based workflows with staging deployments so changes are tested before going live.",
      },
    ],
    usefulLinks: [
      {
        title: "WordPress Developer Resources",
        url: "https://developer.wordpress.org",
        type: "docs",
      },
      {
        title: "WordPress Block Editor Handbook",
        url: "https://developer.wordpress.org/block-editor",
        type: "docs",
      },
      {
        title: "WPBeginner Guides",
        url: "https://www.wpbeginner.com",
        type: "tutorial",
      },
      {
        title: "WordPress Security Best Practices",
        url: "https://wordpress.org/documentation/article/hardening-wordpress/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does a WordPress redesign cost?",
        answer:
          "A custom WordPress redesign typically ranges from $5,000 to $25,000 depending on the number of page templates, custom functionality, and content migration needs. We provide detailed quotes after a free consultation.",
      },
      {
        question: "WordPress vs Webflow — which should I choose?",
        answer:
          "Webflow is great for simple marketing sites with visual editing. WordPress wins when you need e-commerce (WooCommerce), complex content workflows, multilingual support, or deep integrations. We help you make the right call.",
      },
      {
        question: "Can you migrate my site to WordPress without losing SEO?",
        answer:
          "Yes. We handle full content migration with 301 redirects, metadata transfer, and schema markup preservation so your search rankings stay intact.",
      },
      {
        question: "Do you offer WordPress maintenance and hosting?",
        answer:
          "We offer ongoing maintenance plans that include security updates, performance monitoring, backups, and priority support. Hosting is available through our managed infrastructure partners.",
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
    overview:
      "Tailwind CSS is a utility-first CSS framework that lets you build custom designs directly in your markup without writing custom CSS. Instead of pre-built components, Tailwind provides low-level utility classes (flex, pt-4, text-center) that compose into any design. Tailwind v4 introduces a CSS-native engine with lightning-fast builds, native CSS custom properties for theming, and zero-config content detection. Combined with component libraries like shadcn/ui, Tailwind is how modern teams build design systems that scale — consistent, maintainable, and fully customizable without fighting framework defaults.",
    challenges: [
      {
        title: "Verbose class strings in markup",
        description:
          "Complex components can have dozens of utility classes per element. Without discipline around extraction and composition, templates become hard to read and maintain.",
      },
      {
        title: "Design system consistency at scale",
        description:
          "Tailwind gives you freedom but not constraints. Without a well-defined token system (spacing scale, color palette, typography), teams drift into inconsistent UIs.",
      },
      {
        title: "Tailwind v3 to v4 migration",
        description:
          "Tailwind v4's CSS-native approach changes configuration from tailwind.config.js to CSS @theme directives. Migrating large projects requires updating config, plugins, and custom utilities.",
      },
      {
        title: "Dynamic styling limitations",
        description:
          "Tailwind classes must exist in source code at build time — dynamic class construction (e.g., `bg-${color}-500`) doesn't work. Teams need to learn safe patterns for dynamic theming.",
      },
    ],
    bestPractices: [
      {
        tip: "Define a strict design token system",
        detail:
          "Configure your spacing, color, and typography scales upfront in your Tailwind config. This prevents ad-hoc values and keeps your UI consistent across the entire app.",
      },
      {
        tip: "Extract repeated patterns into components, not @apply",
        detail:
          "Instead of creating CSS classes with @apply, extract React/Vue/Svelte components. This keeps the utility-first approach and avoids a parallel CSS abstraction layer.",
      },
      {
        tip: "Use cn() or clsx() for conditional classes",
        detail:
          "A utility function like cn() (from shadcn/ui) cleanly merges conditional Tailwind classes and resolves conflicts — essential for component library development.",
      },
      {
        tip: "Adopt Tailwind v4 CSS-native configuration",
        detail:
          "Tailwind v4's @theme directive in CSS replaces JavaScript config files. This enables faster builds, better IDE support, and native CSS custom property theming.",
      },
    ],
    usefulLinks: [
      {
        title: "Tailwind CSS Documentation",
        url: "https://tailwindcss.com/docs",
        type: "docs",
      },
      {
        title: "shadcn/ui Components",
        url: "https://ui.shadcn.com",
        type: "tool",
      },
      {
        title: "Tailwind Play",
        url: "https://play.tailwindcss.com",
        type: "tool",
      },
      {
        title: "Heroicons",
        url: "https://heroicons.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Tailwind CSS vs. regular CSS or Sass — which should I use?",
        answer:
          "Tailwind is the best choice for teams building component-based UIs (React, Vue, Svelte) where design consistency matters. Traditional CSS/Sass is better for content-heavy sites with minimal interactivity. Tailwind's utility-first approach eliminates naming debates and reduces CSS file sizes via tree-shaking.",
      },
      {
        question:
          "How much does it cost to build a design system with Tailwind?",
        answer:
          "A Tailwind-based design system with component library typically costs $10K–30K. This includes token architecture, core components, documentation, and Figma sync. Ongoing maintenance is minimal since components are just utility classes.",
      },
      {
        question: "Tailwind vs. Bootstrap — when should I use each?",
        answer:
          "Use Tailwind when you want full design control and are building custom UIs. Use Bootstrap when you need pre-built components fast (admin dashboards, prototypes) and don't need a unique design. Tailwind produces smaller bundles and avoids the 'Bootstrap look.'",
      },
      {
        question: "Does Tailwind CSS affect performance?",
        answer:
          "No — Tailwind's build step removes all unused classes, producing CSS files typically under 10KB gzipped. This is significantly smaller than most CSS frameworks. Tailwind v4's engine is even faster with native CSS layers.",
      },
    ],
    quickstart: "npm install tailwindcss @tailwindcss/vite",
    quickstartLang: "bash",
    docsUrl: "https://tailwindcss.com/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      ".NET is Microsoft's open-source, cross-platform framework for building cloud-native applications, APIs, and microservices. With ASP.NET Core, Entity Framework Core, and a mature ecosystem of libraries, .NET delivers enterprise-grade reliability with modern developer ergonomics. At A Major, we architect .NET solutions that balance long-term maintainability with rapid feature delivery — from greenfield APIs to complex distributed systems.\n\nWhether you need high-throughput REST APIs, real-time SignalR hubs, or background processing pipelines, .NET's strong typing and rich tooling make it ideal for teams that value correctness. We bring deep experience with Clean Architecture, Domain-Driven Design, and Azure-native deployment patterns.",
    challenges: [
      {
        title: "Microservice boundaries",
        description:
          "Splitting a monolith into .NET microservices requires careful domain analysis to avoid distributed monolith anti-patterns and excessive inter-service coupling.",
      },
      {
        title: "EF Core performance tuning",
        description:
          "Entity Framework Core makes data access easy but hides N+1 queries and cartesian explosions — production workloads need explicit query optimization.",
      },
      {
        title: "Dependency injection complexity",
        description:
          "Large .NET applications accumulate hundreds of DI registrations. Managing lifetimes, scopes, and circular dependencies requires disciplined architecture.",
      },
      {
        title: "Azure cost management",
        description:
          "Azure App Service, Container Apps, and AKS pricing varies significantly. Choosing the wrong hosting tier can double infrastructure costs without performance gains.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Minimal APIs for simple endpoints",
        detail:
          "Minimal APIs reduce boilerplate for CRUD services — reserve full controllers for complex request pipelines.",
      },
      {
        tip: "Prefer IAsyncEnumerable for streaming",
        detail:
          "Stream large result sets with IAsyncEnumerable instead of materializing entire collections in memory.",
      },
      {
        tip: "Configure EF Core split queries",
        detail:
          "Use AsSplitQuery() for includes on collection navigations to avoid cartesian explosion in SQL output.",
      },
      {
        tip: "Centralize cross-cutting concerns in middleware",
        detail:
          "Logging, correlation IDs, exception handling, and rate limiting belong in the middleware pipeline, not in individual controllers.",
      },
    ],
    usefulLinks: [
      {
        title: "ASP.NET Core Documentation",
        url: "https://learn.microsoft.com/en-us/aspnet/core/",
        type: "docs",
      },
      {
        title: ".NET Architecture Guides",
        url: "https://dotnet.microsoft.com/en-us/learn/dotnet/architecture-guides",
        type: "docs",
      },
      {
        title: "Entity Framework Core Docs",
        url: "https://learn.microsoft.com/en-us/ef/core/",
        type: "docs",
      },
      {
        title: ".NET Community on GitHub",
        url: "https://github.com/dotnet",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Is .NET still relevant in 2025?",
        answer:
          ".NET is one of the fastest-growing backend ecosystems. .NET 8+ delivers top-tier performance (consistently ranked in TechEmpower benchmarks), cross-platform support, and a massive enterprise adoption base.",
      },
      {
        question: "How much does .NET development cost?",
        answer:
          "The framework itself is free and open-source. Development costs depend on project complexity — a typical API project ranges from $15K–$80K. Azure hosting starts at ~$15/month for App Service.",
      },
      {
        question: ".NET vs Node.js — which should I choose?",
        answer:
          ".NET excels for enterprise applications requiring strong typing, complex business logic, and mature tooling. Node.js is better when your team is JavaScript-first or you need a lighter runtime for simple APIs.",
      },
      {
        question: "Can .NET run on Linux and Docker?",
        answer:
          "Yes. .NET Core and .NET 5+ are fully cross-platform. Most production deployments run on Linux containers in Docker, Kubernetes, or Azure Container Apps.",
      },
    ],
    quickstart: "dotnet new webapi -n MyApi\ncd MyApi\ndotnet run",
    quickstartLang: "bash",
    docsUrl: "https://learn.microsoft.com/en-us/aspnet/core/",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Laravel is the most popular PHP framework, known for its elegant syntax and developer-first philosophy. It provides a complete toolkit out of the box — routing, ORM, queues, events, broadcasting, and authentication — so you can ship production-ready applications fast. At A Major, we leverage Laravel's rich ecosystem to build REST APIs, admin panels, SaaS products, and full-stack applications with Livewire and Inertia.\n\nLaravel's ecosystem includes first-party packages like Horizon (queue monitoring), Telescope (debugging), Cashier (subscriptions), and Filament (admin panels). Combined with Pest PHP for testing and Laravel Forge or Vapor for deployment, it's a complete platform for rapid backend development.",
    challenges: [
      {
        title: "Eloquent N+1 queries",
        description:
          "Eloquent's convenience hides lazy-loading pitfalls — without eager loading, a list page can fire hundreds of queries behind the scenes.",
      },
      {
        title: "Queue reliability at scale",
        description:
          "Redis-backed queues need monitoring, retry strategies, and dead-letter handling — unhandled failures silently drop jobs.",
      },
      {
        title: "Upgrading between major versions",
        description:
          "Laravel releases a new major version annually. Staying current requires proactive migration work to avoid accumulating technical debt.",
      },
      {
        title: "Monolith to modular architecture",
        description:
          "Large Laravel apps tend toward a single app directory. Structuring code into domain modules early prevents spaghetti as the codebase grows.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Laravel Pint for consistent code style",
        detail:
          "Run Pint in CI to enforce PSR-12 formatting — zero configuration, zero arguments about code style.",
      },
      {
        tip: "Leverage form requests for validation",
        detail:
          "Move validation logic out of controllers into dedicated FormRequest classes for reusability and cleanliness.",
      },
      {
        tip: "Queue everything that doesn't need an immediate response",
        detail:
          "Email, notifications, PDF generation, and webhook delivery should always run in background jobs.",
      },
      {
        tip: "Use database transactions for multi-step writes",
        detail:
          "Wrap related inserts/updates in DB::transaction() to prevent partial writes on failure.",
      },
    ],
    usefulLinks: [
      {
        title: "Laravel Official Documentation",
        url: "https://laravel.com/docs",
        type: "docs",
      },
      {
        title: "Laracasts Video Tutorials",
        url: "https://laracasts.com",
        type: "tutorial",
      },
      {
        title: "Laravel News",
        url: "https://laravel-news.com",
        type: "community",
      },
      {
        title: "Filament Admin Panel",
        url: "https://filamentphp.com/docs",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is Laravel good for large-scale applications?",
        answer:
          "Yes. Laravel powers large SaaS products and enterprise apps. With proper architecture (domain modules, queues, caching), it scales well. Platforms like Laravel Vapor enable serverless autoscaling on AWS.",
      },
      {
        question: "How much does Laravel development cost?",
        answer:
          "Laravel is free and open-source. Development costs depend on scope — typical projects range from $10K–$60K. Hosting on Forge starts at $12/month, and Vapor scales serverlessly on AWS.",
      },
      {
        question: "Laravel vs Django — which is better?",
        answer:
          "Laravel excels for rapid web application development with a rich PHP ecosystem. Django is stronger for data-heavy applications and ML integrations. Choose based on your team's language expertise and project domain.",
      },
      {
        question: "Can Laravel build APIs for mobile apps?",
        answer:
          "Absolutely. Laravel Sanctum provides token-based API authentication, and Laravel's resource controllers and API resources make building RESTful APIs straightforward.",
      },
    ],
    quickstart:
      "composer create-project laravel/laravel my-app\ncd my-app\nphp artisan serve",
    quickstartLang: "bash",
    docsUrl: "https://laravel.com/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Python is the world's most popular programming language — powering everything from web APIs and data pipelines to machine learning models and automation scripts. Its readability, vast ecosystem (PyPI has 500K+ packages), and first-class support for AI/ML make it indispensable for modern backend development. At A Major, we use Python for FastAPI microservices, Django applications, data engineering workflows, and LLM integrations.\n\nPython's strength is versatility. The same language that serves your REST API can train your ML model, process your data pipeline, and automate your infrastructure. We bring production engineering discipline to Python projects — type hints, async I/O, containerised deployments, and comprehensive test suites.",
    challenges: [
      {
        title: "GIL and concurrency limitations",
        description:
          "Python's Global Interpreter Lock limits CPU-bound parallelism. Async I/O, multiprocessing, or offloading to compiled extensions are required for compute-heavy workloads.",
      },
      {
        title: "Dependency management complexity",
        description:
          "Virtual environments, pip, Poetry, and uv all solve dependency management differently. Choosing and standardizing on one approach across a team is critical.",
      },
      {
        title: "Type safety in large codebases",
        description:
          "Python's dynamic typing becomes a liability at scale. Gradual typing with mypy or pyright requires discipline but is essential for maintainable systems.",
      },
      {
        title: "Production deployment patterns",
        description:
          "Choosing between WSGI (Gunicorn), ASGI (Uvicorn), and serverless runtimes affects performance characteristics and scaling behaviour significantly.",
      },
    ],
    bestPractices: [
      {
        tip: "Use uv for fast dependency management",
        detail:
          "uv is a Rust-based pip replacement that resolves and installs dependencies 10–100× faster than pip.",
      },
      {
        tip: "Add type hints to all public APIs",
        detail:
          "Type hints enable IDE autocompletion, catch bugs early with mypy, and serve as living documentation.",
      },
      {
        tip: "Use Pydantic for data validation",
        detail:
          "Pydantic models validate input data, serialize output, and generate JSON Schema — one library for validation everywhere.",
      },
      {
        tip: "Structure projects with src layout",
        detail:
          "The src/ layout prevents accidental imports of uninstalled code and makes packaging straightforward.",
      },
    ],
    usefulLinks: [
      {
        title: "Python Official Documentation",
        url: "https://docs.python.org/3/",
        type: "docs",
      },
      {
        title: "Real Python Tutorials",
        url: "https://realpython.com",
        type: "tutorial",
      },
      {
        title: "Awesome Python",
        url: "https://github.com/vinta/awesome-python",
        type: "community",
      },
      {
        title: "uv Package Manager",
        url: "https://docs.astral.sh/uv/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is Python fast enough for production APIs?",
        answer:
          "Yes. FastAPI with Uvicorn handles thousands of concurrent requests via async I/O. For CPU-bound work, offload to compiled extensions (NumPy, Rust via PyO3) or use multiprocessing.",
      },
      {
        question: "How much does Python backend development cost?",
        answer:
          "Python is free and open-source. Development costs range from $10K–$70K depending on complexity. Hosting a FastAPI service on a small VPS or container starts at ~$5/month.",
      },
      {
        question: "Python vs Node.js — which is better for backends?",
        answer:
          "Python excels for data-heavy applications, ML/AI workloads, and scientific computing. Node.js is better for real-time applications and teams that want a single language across the stack.",
      },
      {
        question: "What Python framework should I use?",
        answer:
          "FastAPI for microservices and APIs (async, modern). Django for full-featured web applications with admin panels and ORM. Flask for simple, lightweight services.",
      },
    ],
    quickstart:
      "uv init my-project\ncd my-project\nuv add fastapi uvicorn\nuv run uvicorn main:app --reload",
    quickstartLang: "bash",
    docsUrl: "https://docs.python.org/3/",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Node.js is the most widely adopted server-side JavaScript runtime, enabling full-stack TypeScript development with a single language across frontend and backend. Its non-blocking event loop excels at I/O-heavy workloads — APIs, real-time services, and streaming applications. At A Major, we build Node.js backends with Express, Fastify, Hono, and tRPC, always with end-to-end type safety.\n\nThe Node.js ecosystem is massive: npm hosts 2M+ packages. Combined with TypeScript, modern ORMs like Prisma and Drizzle, and deployment options from serverless to containers, Node.js is the pragmatic choice for teams that want to move fast without maintaining separate frontend and backend language expertise.",
    challenges: [
      {
        title: "Callback and async complexity",
        description:
          "Deeply nested async operations, unhandled promise rejections, and memory leaks from event listeners are common pitfalls in Node.js applications.",
      },
      {
        title: "Single-threaded CPU limitations",
        description:
          "Node.js runs JavaScript on a single thread. CPU-intensive operations block the event loop — offload to worker threads, child processes, or native addons.",
      },
      {
        title: "Dependency security risks",
        description:
          "Deep npm dependency trees introduce supply chain risks. Regular auditing, lockfile integrity, and minimal dependency policies are essential.",
      },
      {
        title: "Runtime fragmentation",
        description:
          "Choosing between Node.js, Bun, and Deno — and between CommonJS and ESM — adds decision overhead. Standardizing early prevents ecosystem compatibility issues.",
      },
    ],
    bestPractices: [
      {
        tip: "Use TypeScript strictly",
        detail:
          "Enable strict mode in tsconfig.json. Type safety across the stack prevents entire categories of runtime errors.",
      },
      {
        tip: "Prefer Fastify or Hono over Express for new projects",
        detail:
          "Fastify offers 2× Express throughput with schema validation. Hono runs everywhere including edge runtimes.",
      },
      {
        tip: "Use structured logging with pino",
        detail:
          "pino is the fastest Node.js logger. Structured JSON logs integrate with log aggregation tools without parsing.",
      },
      {
        tip: "Implement graceful shutdown",
        detail:
          "Handle SIGTERM to close database connections, finish in-flight requests, and drain queues before process exit.",
      },
    ],
    usefulLinks: [
      {
        title: "Node.js Official Documentation",
        url: "https://nodejs.org/en/docs",
        type: "docs",
      },
      {
        title: "Node.js Best Practices",
        url: "https://github.com/goldbergyoni/nodebestpractices",
        type: "community",
      },
      {
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/",
        type: "docs",
      },
      {
        title: "Bun Runtime",
        url: "https://bun.sh/docs",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is Node.js good for enterprise applications?",
        answer:
          "Yes. Companies like Netflix, PayPal, and LinkedIn run Node.js at massive scale. With TypeScript, proper architecture, and mature tooling, Node.js handles enterprise workloads effectively.",
      },
      {
        question: "How much does Node.js development cost?",
        answer:
          "Node.js is free and open-source. Development costs range from $10K–$60K depending on complexity. The large JavaScript developer pool means competitive rates compared to specialized languages.",
      },
      {
        question: "Node.js vs Bun — should I switch?",
        answer:
          "Bun offers faster startup and built-in tooling but has a smaller ecosystem. Node.js is more battle-tested for production. Bun is great for new projects; Node.js is safer for existing systems.",
      },
      {
        question: "Can Node.js handle real-time applications?",
        answer:
          "Node.js excels at real-time — its event-driven architecture is ideal for WebSocket connections, server-sent events, and live streaming with libraries like Socket.io and ws.",
      },
    ],
    quickstart:
      "npx create-fastify-app my-api\ncd my-api\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://nodejs.org/en/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Kotlin is the preferred language for Android development, endorsed by Google as the official Android language since 2019. With Jetpack Compose for declarative UI, coroutines for async programming, and the full Jetpack suite for navigation, persistence, and lifecycle management, Kotlin delivers a modern Android development experience.\n\nKotlin's null-safety, extension functions, and concise syntax eliminate entire classes of bugs compared to Java. Kotlin Multiplatform (KMP) also enables sharing business logic across Android, iOS, and desktop — making it a strategic choice for teams targeting multiple platforms.",
    challenges: [
      {
        title: "Jetpack Compose adoption curve",
        description:
          "Compose's declarative paradigm differs fundamentally from the traditional View system. Teams migrating from XML layouts need time to learn state management, recomposition, and Compose-specific patterns.",
      },
      {
        title: "Build times with Gradle",
        description:
          "Large Kotlin projects can have slow Gradle builds. Using build cache, configuration cache, and modularizing your project significantly improves iteration speed.",
      },
      {
        title: "Kotlin Multiplatform maturity",
        description:
          "KMP is production-ready for shared business logic but the ecosystem (especially UI sharing with Compose Multiplatform) is still maturing compared to native-only development.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Jetpack Compose for new UI",
        detail:
          "Compose is the future of Android UI — start new screens in Compose and incrementally migrate existing Views.",
      },
      {
        tip: "Structure with MVVM + Repository pattern",
        detail:
          "ViewModels expose StateFlow to Compose, repositories abstract data sources — this separation makes your code testable and maintainable.",
      },
      {
        tip: "Use Hilt for dependency injection",
        detail:
          "Hilt provides compile-time verified dependency injection — ViewModels, repositories, and use cases all injectable with minimal boilerplate.",
      },
    ],
    usefulLinks: [
      {
        title: "Android Developer Guides",
        url: "https://developer.android.com/guide",
        type: "docs",
      },
      {
        title: "Jetpack Compose Documentation",
        url: "https://developer.android.com/develop/ui/compose",
        type: "docs",
      },
      {
        title: "Kotlin Documentation",
        url: "https://kotlinlang.org/docs/home.html",
        type: "docs",
      },
      {
        title: "Android Developer Community",
        url: "https://developer.android.com/community",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Kotlin Android development cost?",
        answer:
          "Android development tools are free (Android Studio, Kotlin, Jetpack). Google Play charges a one-time $25 registration fee. Development costs depend on app complexity — a simple app takes 4-8 weeks, a full-featured app with backend integration takes 12-24 weeks.",
      },
      {
        question: "Kotlin vs Flutter for Android — which is better?",
        answer:
          "Kotlin gives you full access to native Android APIs, the latest platform features, and the best performance. Flutter provides cross-platform from a single codebase but adds an abstraction layer. Choose Kotlin for Android-only apps or when you need deep platform integration.",
      },
      {
        question: "Should I use Jetpack Compose or XML Views?",
        answer:
          "Jetpack Compose is the recommended approach for all new Android projects. It's more concise, easier to test, and Google is investing heavily in its future. XML Views are still supported but considered legacy for new development.",
      },
    ],
    quickstart:
      "# Install Android Studio\n# https://developer.android.com/studio\n\n# Create a new Compose project\n# File > New > New Project > Empty Compose Activity\n\n# Or via command line\n# Use Android Studio's project templates for best results",
    quickstartLang: "bash",
    docsUrl: "https://developer.android.com/guide",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Swift is Apple's modern programming language for iOS, macOS, watchOS, and tvOS development. Combined with SwiftUI's declarative UI framework, it provides a powerful, type-safe development experience with deep integration into Apple's ecosystem — from WidgetKit and App Clips to CloudKit sync and StoreKit purchases.\n\nSwift's async/await concurrency model, Combine framework for reactive data binding, and the Xcode toolchain provide everything needed to build polished Apple platform apps. TestFlight distribution and App Store submission are built into the development workflow.",
    challenges: [
      {
        title: "SwiftUI version fragmentation",
        description:
          "SwiftUI APIs differ between iOS versions. Supporting older iOS versions means conditional code or falling back to UIKit for features only available in newer releases.",
      },
      {
        title: "App Store review process",
        description:
          "Apple's review process can delay releases by days and reject apps for subjective reasons. Understanding App Store guidelines and having contingency plans is essential.",
      },
      {
        title: "Code signing and provisioning",
        description:
          "Apple's code signing, provisioning profiles, and certificate management is notoriously complex. Xcode manages much of this automatically, but CI/CD setups require careful configuration.",
      },
    ],
    bestPractices: [
      {
        tip: "Use SwiftUI for new projects",
        detail:
          "SwiftUI is Apple's recommended UI framework. Start new apps in SwiftUI and use UIKit only for features not yet available in SwiftUI.",
      },
      {
        tip: "Adopt async/await for concurrency",
        detail:
          "Swift's structured concurrency with async/await is safer and more readable than GCD or completion handlers — use it for all new async code.",
      },
      {
        tip: "Test with TestFlight early",
        detail:
          "Set up TestFlight distribution from day one — get beta feedback early and ensure your release pipeline works before launch.",
      },
    ],
    usefulLinks: [
      {
        title: "Apple Developer Documentation",
        url: "https://developer.apple.com/documentation/",
        type: "docs",
      },
      {
        title: "SwiftUI Documentation",
        url: "https://developer.apple.com/documentation/swiftui",
        type: "docs",
      },
      {
        title: "Swift.org",
        url: "https://www.swift.org/documentation/",
        type: "docs",
      },
      {
        title: "Apple Developer Forums",
        url: "https://developer.apple.com/forums/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does iOS development cost?",
        answer:
          "Apple Developer Program costs $99/year. Xcode is free. Development costs depend on complexity — a simple app takes 4-8 weeks, a feature-rich app with backend integration takes 12-24 weeks. Universal apps (iOS + macOS) add 20-40% to the timeline.",
      },
      {
        question: "Swift vs Flutter for iOS — which should I choose?",
        answer:
          "Swift gives you native performance, the latest Apple APIs (WidgetKit, App Clips, SharePlay), and the best possible iOS user experience. Flutter provides cross-platform from one codebase but may lag behind on platform-specific features. Choose Swift for iOS-focused apps.",
      },
      {
        question: "Do I need a Mac for iOS development?",
        answer:
          "Yes. Xcode — Apple's IDE and the only way to compile, sign, and submit iOS apps — runs exclusively on macOS. A Mac is required for development, testing, and App Store submission.",
      },
    ],
    quickstart:
      "# Install Xcode from the Mac App Store\n# Or via command line:\nxcode-select --install\n\n# Create a new SwiftUI project\n# Open Xcode > File > New > Project > App\n# Select SwiftUI for interface",
    quickstartLang: "bash",
    docsUrl: "https://developer.apple.com/documentation/",
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
    overview:
      "Astro is a web framework designed for content-driven websites — blogs, marketing sites, documentation, and e-commerce storefronts where performance directly impacts SEO and conversion. Its islands architecture ships zero JavaScript by default, only hydrating interactive components on demand. You can use React, Vue, Svelte, or Solid components on the same page, each loading independently. Astro's content collections provide type-safe Markdown/MDX authoring, and its adapter system deploys to any platform. If your site is primarily content with islands of interactivity, Astro delivers the best performance possible.",
    challenges: [
      {
        title: "Islands architecture mental model",
        description:
          "Thinking in islands (static HTML with isolated interactive components) is different from traditional SPA development. Teams used to React Router or Next.js need to adjust their architecture patterns.",
      },
      {
        title: "Limited client-side state sharing",
        description:
          "Because each island hydrates independently, sharing state between interactive components requires nanostores or similar solutions — there's no global app-level state by default.",
      },
      {
        title: "Dynamic functionality constraints",
        description:
          "Highly interactive applications (dashboards, real-time tools) push against Astro's content-first design. For app-like experiences, you may outgrow what Astro optimizes for.",
      },
      {
        title: "SSR adapter differences",
        description:
          "Behavior differences between Vercel, Cloudflare, Node, and Netlify adapters — especially around streaming, edge functions, and environment variables — require careful testing per target.",
      },
    ],
    bestPractices: [
      {
        tip: "Default to zero-JS static pages",
        detail:
          "Only add client:load, client:visible, or client:idle directives when a component genuinely needs interactivity. Most content pages need no JavaScript at all.",
      },
      {
        tip: "Use content collections for all structured content",
        detail:
          "Define Zod schemas for your content — blog posts, docs, product pages. This gives you type-safe queries, frontmatter validation, and automatic TypeScript types.",
      },
      {
        tip: "Choose the right hydration directive",
        detail:
          "client:visible for below-the-fold components, client:idle for non-critical interactivity, client:load only for above-the-fold interactive elements. This dramatically improves Time to Interactive.",
      },
      {
        tip: "Leverage View Transitions for navigation",
        detail:
          "Astro's built-in View Transitions API provides smooth page transitions without client-side routing — your MPA feels like an SPA with native browser animation support.",
      },
    ],
    usefulLinks: [
      {
        title: "Astro Documentation",
        url: "https://docs.astro.build",
        type: "docs",
      },
      {
        title: "Astro Themes",
        url: "https://astro.build/themes",
        type: "tool",
      },
      {
        title: "Starlight Docs Theme",
        url: "https://starlight.astro.build",
        type: "tool",
      },
      {
        title: "Astro Integrations",
        url: "https://astro.build/integrations",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Astro vs. Next.js — which should I use?",
        answer:
          "Use Astro for content-heavy sites (blogs, docs, marketing) where performance and SEO are paramount. Use Next.js for interactive web applications with complex state, auth, and real-time features. Astro ships less JavaScript; Next.js offers more app-like capabilities.",
      },
      {
        question: "How much does it cost to build an Astro website?",
        answer:
          "An Astro marketing site or blog typically costs $5K–15K. A larger content platform with CMS integration, search, and custom components runs $15K–40K+. We offer free consultations to scope your project.",
      },
      {
        question: "Can I use React components in Astro?",
        answer:
          "Yes — Astro supports React, Vue, Svelte, Solid, and Preact components out of the box. You can even mix frameworks on the same page. Each component island hydrates independently.",
      },
      {
        question: "Is Astro good for SEO?",
        answer:
          "Astro is one of the best frameworks for SEO. It ships zero JavaScript by default, produces perfect Lighthouse scores, and supports structured data, sitemaps, and canonical URLs via integrations. Content loads instantly because it's pre-rendered HTML.",
      },
    ],
    quickstart: "npm create astro@latest my-site\ncd my-site\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://docs.astro.build",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "SolidJS is a reactive JavaScript framework that compiles your components into fine-grained DOM updates — no virtual DOM, no component re-renders, just surgical updates to exactly the DOM nodes that changed. It offers a React-like JSX developer experience but with fundamentally better performance characteristics. SolidStart provides the full-stack story with SSR, file-based routing, and server functions. SolidJS consistently tops JS framework benchmarks, making it ideal for performance-critical applications where every millisecond matters.",
    challenges: [
      {
        title: "Reactive primitives differ from React patterns",
        description:
          "Solid's signals and effects look similar to React hooks but behave differently — destructuring props breaks reactivity, and components run once (not on every render). This trips up React developers.",
      },
      {
        title: "Smaller ecosystem and community",
        description:
          "SolidJS has fewer third-party libraries, component kits, and Stack Overflow answers than React or Vue. Teams may need to build more custom solutions.",
      },
      {
        title: "SolidStart maturity",
        description:
          "SolidStart is newer than Next.js or SvelteKit. While functional, it has fewer deployment adapters, less documentation for edge cases, and a smaller community of production users.",
      },
      {
        title: "Mental model shift for conditional rendering",
        description:
          "Solid uses <Show>, <For>, and <Switch> control-flow components instead of JavaScript expressions in JSX. This is more performant but requires learning Solid-specific patterns.",
      },
    ],
    bestPractices: [
      {
        tip: "Never destructure props",
        detail:
          "In Solid, destructuring props breaks reactivity tracking. Always access props via props.name or use the mergeProps/splitProps helpers to maintain reactive bindings.",
      },
      {
        tip: "Use createResource for async data",
        detail:
          "Solid's createResource primitive handles async data fetching with built-in Suspense integration — loading states, error boundaries, and caching in one API.",
      },
      {
        tip: "Prefer control-flow components over ternaries",
        detail:
          "<Show>, <For>, and <Switch> components enable Solid to optimize DOM updates at compile time. They're not just conventions — they're performance optimizations.",
      },
      {
        tip: "Start with SolidStart for full-stack apps",
        detail:
          "SolidStart provides SSR, file-based routing, and server functions. Don't manually wire up a Solid SPA when SolidStart gives you a production-ready foundation.",
      },
    ],
    usefulLinks: [
      {
        title: "SolidJS Documentation",
        url: "https://www.solidjs.com",
        type: "docs",
      },
      {
        title: "SolidStart Docs",
        url: "https://start.solidjs.com",
        type: "docs",
      },
      {
        title: "Solid Playground",
        url: "https://playground.solidjs.com",
        type: "tool",
      },
      {
        title: "SolidJS Discord",
        url: "https://discord.com/invite/solidjs",
        type: "community",
      },
    ],
    faq: [
      {
        question: "SolidJS vs. React — which is better?",
        answer:
          "SolidJS is faster and produces smaller bundles thanks to fine-grained reactivity without a virtual DOM. React has a vastly larger ecosystem, more hiring options, and more mature tooling. Choose Solid for performance-critical apps; choose React for ecosystem breadth and team availability.",
      },
      {
        question: "How much does it cost to build a SolidJS application?",
        answer:
          "SolidJS project costs are similar to other modern frameworks — $10K–40K for a typical web application. The smaller ecosystem may require more custom development, but the performance benefits reduce infrastructure costs long-term.",
      },
      {
        question: "Is SolidJS production-ready?",
        answer:
          "Yes. SolidJS 1.x is stable and used in production by several companies. It consistently tops JS framework benchmarks. SolidStart is newer but actively developed and suitable for production use.",
      },
      {
        question: "Can I migrate from React to SolidJS?",
        answer:
          "The JSX syntax is similar, but Solid's reactivity model is fundamentally different. Migration requires rewriting component logic, not just swapping imports. We recommend Solid for new projects rather than migrating existing React codebases.",
      },
    ],
    quickstart:
      "npx degit solidjs/templates/ts my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://www.solidjs.com",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "TanStack is a collection of headless, framework-agnostic libraries for routing, data fetching, tables, forms, and virtual scrolling — all with first-class TypeScript support. TanStack Query (formerly React Query) revolutionized async state management with its caching, background refetching, and optimistic update patterns. TanStack Router brings 100% type-safe routing to React with typed search params, loaders, and code splitting. TanStack Table powers complex data grids without imposing any UI. Together, they form a cohesive, production-tested toolkit we use across React, Vue, and Solid projects.",
    challenges: [
      {
        title: "Learning the full TanStack ecosystem",
        description:
          "Each TanStack library (Query, Router, Table, Form, Virtual) has its own concepts and APIs. Understanding how they compose together — especially Router + Query + Start — takes time.",
      },
      {
        title: "Query cache invalidation strategies",
        description:
          "TanStack Query's cache is powerful but requires careful thought about invalidation, stale times, and optimistic updates to avoid stale data bugs in production.",
      },
      {
        title: "Type-safe search params complexity",
        description:
          "TanStack Router's fully typed search params are powerful but add complexity — defining, validating, and serializing complex search state requires Zod schemas and careful API design.",
      },
      {
        title: "Headless table implementation effort",
        description:
          "TanStack Table is headless by design, meaning you build all the UI yourself. While flexible, implementing sorting, filtering, pagination, and virtualization UIs from scratch is significant work.",
      },
    ],
    bestPractices: [
      {
        tip: "Define query keys as factories",
        detail:
          "Create query key factories (e.g., userKeys.detail(id)) for consistent cache management. This prevents cache key collisions and makes invalidation predictable.",
      },
      {
        tip: "Set staleTime based on data freshness requirements",
        detail:
          "Don't use the default staleTime of 0 for everything. User profiles might be stale after 5 minutes; real-time data after 10 seconds. Tune per query.",
      },
      {
        tip: "Use TanStack Router's search param validation",
        detail:
          "Define Zod schemas for search params at the route level. This gives you type-safe URL state, automatic validation, and serialization — no more manual parsing.",
      },
      {
        tip: "Combine Query + Router for data loading",
        detail:
          "Use TanStack Router's loader functions with TanStack Query's ensureQueryData for cached, type-safe data fetching that works with SSR and prefetching.",
      },
    ],
    usefulLinks: [
      {
        title: "TanStack Query Docs",
        url: "https://tanstack.com/query",
        type: "docs",
      },
      {
        title: "TanStack Router Docs",
        url: "https://tanstack.com/router",
        type: "docs",
      },
      {
        title: "TanStack Table Docs",
        url: "https://tanstack.com/table",
        type: "docs",
      },
      {
        title: "TanStack GitHub",
        url: "https://github.com/TanStack",
        type: "community",
      },
    ],
    faq: [
      {
        question:
          "TanStack Query vs. SWR — which data fetching library should I use?",
        answer:
          "TanStack Query is more feature-rich with devtools, optimistic updates, infinite queries, and mutation lifecycle hooks. SWR is simpler and lighter. For complex apps with mutations and cache management, TanStack Query wins. For simple read-heavy apps, SWR may suffice.",
      },
      {
        question: "How much does it cost to implement TanStack in a project?",
        answer:
          "TanStack libraries are free and open source. Implementation costs depend on your project — adding TanStack Query to an existing app is $2K–5K, while building a full app on TanStack Router + Start + Query is $15K–50K+ depending on complexity.",
      },
      {
        question: "Can I use TanStack libraries with Vue or Svelte?",
        answer:
          "Yes. TanStack Query, Table, Virtual, and Form all have official Vue adapters. TanStack Router and Start are currently React-only, though community adapters exist for other frameworks.",
      },
      {
        question: "TanStack Router vs. React Router — which should I choose?",
        answer:
          "TanStack Router offers 100% type-safe routing with typed search params and loaders — something React Router doesn't provide. React Router (v7/Remix) has a larger community and more deployment options. Choose TanStack Router for type safety; React Router for ecosystem maturity.",
      },
    ],
    quickstart:
      "npm install @tanstack/react-query @tanstack/react-query-devtools",
    quickstartLang: "bash",
    docsUrl: "https://tanstack.com",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Elysia is a Bun-native web framework built from the ground up for the Bun runtime. It delivers exceptional performance (consistently topping framework benchmarks), end-to-end type safety via TypeBox, and a plugin-based architecture that keeps code modular. At A Major, we use Elysia for high-performance API services where type safety and developer experience are equally important.\n\nElysia's Eden Treaty client generates a fully typed API client from your server definition — no code generation step, no schema duplication. Combined with Bun's fast startup, built-in test runner, and npm compatibility, Elysia is our top pick for greenfield TypeScript APIs that need to be fast.",
    challenges: [
      {
        title: "Bun runtime maturity",
        description:
          "Bun is newer than Node.js and some npm packages with native bindings may not work. Testing compatibility early is critical for production projects.",
      },
      {
        title: "Smaller ecosystem compared to Express",
        description:
          "Elysia's plugin ecosystem is growing but significantly smaller than Express or Fastify. Custom middleware may need to be written from scratch.",
      },
      {
        title: "Limited production case studies",
        description:
          "Elysia is relatively new — fewer production war stories mean less community guidance for edge cases and scaling patterns.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Eden Treaty for type-safe API clients",
        detail:
          "Eden Treaty generates a typed client from your Elysia server — share types across frontend and backend without code generation.",
      },
      {
        tip: "Leverage Elysia plugins for common concerns",
        detail:
          "Use official plugins for JWT, CORS, Swagger, and rate limiting instead of building custom middleware.",
      },
      {
        tip: "Structure routes with Elysia groups",
        detail:
          "Group related routes with shared middleware — auth, validation, and error handling scoped per group.",
      },
      {
        tip: "Use TypeBox for schema validation",
        detail:
          "TypeBox schemas validate requests at runtime while providing TypeScript types at compile time — single source of truth.",
      },
    ],
    usefulLinks: [
      {
        title: "Elysia Official Documentation",
        url: "https://elysiajs.com",
        type: "docs",
      },
      {
        title: "Elysia Eden Treaty",
        url: "https://elysiajs.com/eden/overview",
        type: "docs",
      },
      {
        title: "Bun Runtime Documentation",
        url: "https://bun.sh/docs",
        type: "docs",
      },
      {
        title: "Elysia GitHub Repository",
        url: "https://github.com/elysiajs/elysia",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Is Elysia production-ready?",
        answer:
          "Elysia is stable and actively maintained with a growing community. It's well-suited for new API projects on Bun. For risk-averse enterprise environments, evaluate Bun runtime compatibility first.",
      },
      {
        question: "How fast is Elysia compared to Express?",
        answer:
          "Elysia on Bun handles 2–3× more requests per second than Express on Node.js in benchmarks. Real-world gains depend on I/O patterns, but the performance difference is consistently measurable.",
      },
      {
        question: "Can I use Elysia with existing npm packages?",
        answer:
          "Yes. Bun is npm-compatible and most packages work out of the box. Packages with native Node.js bindings may need Bun-specific alternatives.",
      },
      {
        question: "Elysia vs Hono — which should I choose?",
        answer:
          "Elysia is Bun-specific with deeper runtime integration and Eden Treaty. Hono is runtime-agnostic (Cloudflare, Deno, Bun, Node). Choose Elysia for Bun-committed projects, Hono for multi-runtime portability.",
      },
    ],
    quickstart: "bun create elysia my-app\ncd my-app\nbun dev",
    quickstartLang: "bash",
    docsUrl: "https://elysiajs.com",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Express is the most widely used Node.js web framework, with over 30 billion npm downloads. Its minimal, unopinionated design gives developers full control over architecture, while its vast middleware ecosystem handles everything from authentication to rate limiting. At A Major, we use Express for rapid API development, legacy system integrations, and projects where the breadth of community packages matters most.\n\nExpress's simplicity is its strength — a few lines of code get you a working API. For teams maintaining existing Node.js systems, Express provides a stable, well-documented foundation that virtually every JavaScript developer already knows.",
    challenges: [
      {
        title: "No built-in structure for large apps",
        description:
          "Express is unopinionated by design — without disciplined architecture, large codebases become difficult to navigate and maintain.",
      },
      {
        title: "Error handling middleware quirks",
        description:
          "Express error handlers require a four-argument function signature. Async errors need explicit wrapping or a library like express-async-errors.",
      },
      {
        title: "Performance ceiling vs modern frameworks",
        description:
          "Express processes requests 2–3× slower than Fastify due to its middleware architecture. For high-throughput APIs, consider alternatives.",
      },
      {
        title: "TypeScript support is bolted on",
        description:
          "Express was designed before TypeScript's rise. Type definitions exist but aren't as tight as frameworks built for TypeScript from day one.",
      },
    ],
    bestPractices: [
      {
        tip: "Use express-async-errors for clean error handling",
        detail:
          "This tiny package lets async route handlers throw errors that Express catches automatically — no try/catch boilerplate.",
      },
      {
        tip: "Apply Helmet for security headers",
        detail:
          "helmet() sets secure HTTP headers (CSP, HSTS, X-Frame-Options) with a single middleware call.",
      },
      {
        tip: "Organize routes in a dedicated router directory",
        detail:
          "Use express.Router() to split routes into feature-based files — keeps the main app file clean.",
      },
      {
        tip: "Validate input with Zod or Joi",
        detail:
          "Never trust user input. Validate request bodies, params, and query strings at the route boundary.",
      },
    ],
    usefulLinks: [
      {
        title: "Express Official Documentation",
        url: "https://expressjs.com",
        type: "docs",
      },
      {
        title: "Express Best Practices",
        url: "https://expressjs.com/en/advanced/best-practice-performance.html",
        type: "docs",
      },
      {
        title: "MDN Express Tutorial",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
        type: "tutorial",
      },
      {
        title: "Express on GitHub",
        url: "https://github.com/expressjs/express",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Is Express still relevant in 2025?",
        answer:
          "Yes. Express remains the most downloaded Node.js framework. While newer frameworks offer better performance, Express's ecosystem, community knowledge, and stability make it a safe choice.",
      },
      {
        question: "How much does Express development cost?",
        answer:
          "Express is free and open-source. Its simplicity means faster initial development — typical API projects range from $8K–$50K depending on complexity.",
      },
      {
        question: "Express vs Fastify — which should I use?",
        answer:
          "Use Express when you need the broadest middleware ecosystem or are maintaining existing Express apps. Choose Fastify for new high-performance APIs with built-in validation.",
      },
      {
        question: "Can Express handle high traffic?",
        answer:
          "Express handles moderate traffic well. For high-throughput scenarios (10K+ req/s), consider Fastify for better raw performance, or scale Express horizontally with a load balancer.",
      },
    ],
    quickstart:
      "npx express-generator my-app\ncd my-app\nnpm install\nnpm start",
    quickstartLang: "bash",
    docsUrl: "https://expressjs.com",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Fastify is a high-performance Node.js framework focused on speed, developer experience, and plugin encapsulation. Its JSON serialisation is 2× faster than JSON.stringify, and its schema-based validation catches errors at the request boundary. At A Major, we choose Fastify for high-throughput API services where Node.js performance matters.\n\nFastify's plugin system enforces encapsulation — plugins can't accidentally pollute global state. Combined with lifecycle hooks at every request stage, automatic OpenAPI generation from JSON Schema, and first-class TypeScript support, Fastify is our recommended Node.js framework for new performance-critical backends.",
    challenges: [
      {
        title: "Plugin encapsulation learning curve",
        description:
          "Fastify's encapsulation model is powerful but different from Express's flat middleware. Understanding parent/child plugin scopes takes time.",
      },
      {
        title: "Smaller middleware ecosystem than Express",
        description:
          "While Fastify has plugins for most needs, the ecosystem is smaller than Express. Some niche middleware may need custom implementation.",
      },
      {
        title: "JSON Schema verbosity",
        description:
          "Writing JSON Schema for request/response validation is verbose. Use typebox or fluent-json-schema to generate schemas from TypeScript types.",
      },
    ],
    bestPractices: [
      {
        tip: "Use @fastify/autoload for route discovery",
        detail:
          "Auto-load routes from a directory structure — convention-based routing without manual registration.",
      },
      {
        tip: "Define schemas with TypeBox",
        detail:
          "TypeBox generates JSON Schema from TypeScript types — write once, get validation and type inference together.",
      },
      {
        tip: "Use fastify-plugin for shared decorators",
        detail:
          "Wrap plugins that need to be accessible across the entire app with fastify-plugin to break encapsulation intentionally.",
      },
      {
        tip: "Enable ajv strict mode",
        detail:
          "Strict JSON Schema validation catches schema definition errors early — preventing silent validation bypasses.",
      },
    ],
    usefulLinks: [
      {
        title: "Fastify Official Documentation",
        url: "https://fastify.dev/docs/latest/",
        type: "docs",
      },
      {
        title: "Fastify Ecosystem Plugins",
        url: "https://fastify.dev/ecosystem/",
        type: "docs",
      },
      {
        title: "Fastify GitHub Repository",
        url: "https://github.com/fastify/fastify",
        type: "community",
      },
      {
        title: "Fastify Benchmarks",
        url: "https://fastify.dev/benchmarks/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "Is Fastify faster than Express?",
        answer:
          "Yes. Fastify handles 2–3× more requests per second than Express in benchmarks. Its custom JSON serialiser and schema-based validation reduce per-request overhead significantly.",
      },
      {
        question: "Should I migrate from Express to Fastify?",
        answer:
          "For existing stable apps, migration effort may not be worth it. For new projects or APIs hitting Express performance limits, Fastify is a strong upgrade with a similar mental model.",
      },
      {
        question: "How much does Fastify development cost?",
        answer:
          "Fastify is free and open-source. Development costs are comparable to Express — $10K–$50K for typical API projects. The framework itself adds no licensing cost.",
      },
      {
        question: "Does Fastify work with TypeScript?",
        answer:
          "Fastify has first-class TypeScript support with generic type parameters for request/response schemas. Type inference from JSON Schema is automatic.",
      },
    ],
    quickstart: "npm init fastify my-api\ncd my-api\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://fastify.dev/docs/latest/",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "Convex is a reactive backend-as-a-service that eliminates the gap between your database and your UI. Queries automatically re-execute when their underlying data changes, pushing live updates to every connected client without polling or WebSocket plumbing. At A Major, we use Convex for real-time applications where live data is a core requirement — collaborative tools, dashboards, and chat-based products.\n\nConvex provides a fully managed stack: a transactional document database, serverless functions, file storage, and cron scheduling — all accessible via a TypeScript API with end-to-end type safety. No infrastructure to manage, no connection pools to tune, and no cache invalidation logic to write.",
    challenges: [
      {
        title: "Vendor lock-in considerations",
        description:
          "Convex is a proprietary platform. Data and function logic are tightly coupled to Convex's runtime — migration to self-hosted infrastructure requires significant rearchitecture.",
      },
      {
        title: "Query function limitations",
        description:
          "Convex query and mutation functions have execution time limits and can't make external HTTP calls — side effects must be handled through actions.",
      },
      {
        title: "Schema migration patterns",
        description:
          "Convex doesn't have traditional migration files. Schema changes on existing data require careful planning with backfill functions.",
      },
    ],
    bestPractices: [
      {
        tip: "Use queries for reads, mutations for writes, actions for side effects",
        detail:
          "Convex's three function types have different guarantees. Queries are cached and reactive. Mutations are transactional. Actions can call external APIs.",
      },
      {
        tip: "Define schemas with strict validation",
        detail:
          "Convex schemas validate data at write time — define them early to catch data issues before they reach production.",
      },
      {
        tip: "Leverage Convex's built-in search indexes",
        detail:
          "Full-text search indexes avoid the need for external search services like Algolia for many use cases.",
      },
      {
        tip: "Use scheduled functions for background work",
        detail:
          "Convex's built-in scheduler handles delayed execution and cron jobs without external queue infrastructure.",
      },
    ],
    usefulLinks: [
      {
        title: "Convex Official Documentation",
        url: "https://docs.convex.dev",
        type: "docs",
      },
      {
        title: "Convex Tutorial",
        url: "https://docs.convex.dev/tutorial",
        type: "tutorial",
      },
      {
        title: "Convex Discord Community",
        url: "https://convex.dev/community",
        type: "community",
      },
      {
        title: "Convex Dashboard",
        url: "https://dashboard.convex.dev",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is Convex free to use?",
        answer:
          "Convex has a generous free tier including database storage, function calls, and bandwidth. Paid plans start for production workloads that exceed free tier limits.",
      },
      {
        question: "Convex vs Supabase — which should I choose?",
        answer:
          "Convex excels at real-time reactivity with automatic query subscriptions. Supabase is a Postgres-backed platform with more traditional SQL access. Choose Convex for live-updating UIs, Supabase for SQL-centric workflows.",
      },
      {
        question: "Can Convex handle production traffic?",
        answer:
          "Yes. Convex is designed for production workloads with automatic scaling, ACID transactions, and global edge deployment. Many production apps run on Convex today.",
      },
      {
        question: "Does Convex work with React and Next.js?",
        answer:
          "Convex has first-class React hooks and Next.js integration. Queries and mutations become React hooks with automatic type inference and real-time updates.",
      },
    ],
    quickstart:
      "npx create-next-app my-app --example https://github.com/get-convex/convex-nextjs-app\ncd my-app\nnpx convex dev",
    quickstartLang: "bash",
    docsUrl: "https://docs.convex.dev",
    pageType: "tech",
    targetAudience: "developers",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Drizzle ORM is an SQL-first TypeScript ORM that compiles to exactly the SQL you'd write yourself — no magic, no hidden queries, no N+1 surprises. It provides full type inference from your schema definition, including selects, inserts, joins, and aggregations.\n\nDrizzle supports PostgreSQL, MySQL, and SQLite (including serverless variants like Neon, PlanetScale, Turso, and Cloudflare D1). Drizzle Kit handles schema migrations by generating SQL diffs you review before applying. It's the ideal ORM for developers who think in SQL and want type safety without abstraction overhead.",
    challenges: [
      {
        title: "Learning curve for SQL-first approach",
        description:
          "Developers used to Prisma's schema-first model may find Drizzle's SQL-like API unfamiliar initially. The benefit is predictable query generation — what you write is what executes.",
      },
      {
        title: "Ecosystem maturity",
        description:
          "Drizzle's ecosystem (Studio, plugins, community packages) is younger than Prisma's. The core ORM is production-ready, but some auxiliary tooling is still evolving.",
      },
      {
        title: "Relational query API complexity",
        description:
          "Drizzle's relational query API (with) is powerful but can be tricky for deeply nested relations. For complex joins, the SQL-like query builder is often clearer.",
      },
    ],
    bestPractices: [
      {
        tip: "Define schemas in TypeScript files",
        detail:
          "Keep your Drizzle schemas in src/db/schema/ with one file per table — clear separation makes Drizzle Kit migrations predictable.",
      },
      {
        tip: "Use Drizzle Kit for migrations",
        detail:
          "drizzle-kit generate creates SQL migration files from your schema diff — always review the generated SQL before applying.",
      },
      {
        tip: "Prefer the SQL-like API for complex queries",
        detail:
          "Drizzle's select().from().where().join() API maps directly to SQL and gives you full control over the generated query.",
      },
      {
        tip: "Use $inferSelect and $inferInsert",
        detail:
          "Drizzle's inference utilities generate TypeScript types from your schema — no need to manually define types for your models.",
      },
    ],
    usefulLinks: [
      {
        title: "Drizzle ORM Documentation",
        url: "https://orm.drizzle.team/docs/overview",
        type: "docs",
      },
      {
        title: "Drizzle Getting Started",
        url: "https://orm.drizzle.team/docs/get-started",
        type: "tutorial",
      },
      {
        title: "Drizzle GitHub",
        url: "https://github.com/drizzle-team/drizzle-orm",
        type: "community",
      },
      {
        title: "Drizzle Kit (Migrations)",
        url: "https://orm.drizzle.team/kit-docs/overview",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Drizzle ORM cost?",
        answer:
          "Drizzle ORM is completely free and open-source (Apache 2.0 license). Drizzle Studio (the visual data browser) is also free. There are no paid tiers or premium features.",
      },
      {
        question: "Drizzle vs Prisma — which should I pick?",
        answer:
          "Drizzle is SQL-first with zero runtime overhead — ideal for developers who think in SQL and want predictable queries. Prisma is schema-first with a richer ecosystem and better DX for teams new to ORMs. We use Drizzle for performance-critical projects and Prisma for rapid development.",
      },
      {
        question: "Does Drizzle work with serverless and edge?",
        answer:
          "Yes. Drizzle has first-class support for Neon, Turso, PlanetScale, Cloudflare D1, and Vercel Postgres. Its lightweight runtime makes it ideal for edge functions where bundle size matters.",
      },
    ],
    quickstart:
      "npm install drizzle-orm\nnpm install -D drizzle-kit\n\n# Create your schema in src/db/schema.ts\n# Then generate and run migrations\nnpx drizzle-kit generate\nnpx drizzle-kit migrate\n\n# Open Drizzle Studio\nnpx drizzle-kit studio",
    quickstartLang: "bash",
    docsUrl: "https://orm.drizzle.team/docs/overview",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Better Auth is the most comprehensive authentication library for TypeScript — handling sessions, OAuth providers, two-factor authentication, magic links, passkeys, and organization management out of the box. It's framework-agnostic, working with Next.js, SvelteKit, Nuxt, Hono, Express, and more.\n\nUnlike hosted auth services, Better Auth runs in your own infrastructure with your own database. It supports Prisma, Drizzle, Mongoose, and raw SQL adapters, giving you full control over your auth data while providing a type-safe client with autocomplete for every auth action.",
    challenges: [
      {
        title: "Initial configuration complexity",
        description:
          "Better Auth offers extensive configuration options (plugins, adapters, providers). The initial setup requires deliberate choices about which features to enable and how to structure your auth flow.",
      },
      {
        title: "Plugin compatibility",
        description:
          "Some plugin combinations require specific ordering or configuration. The documentation covers these cases, but reading plugin READMEs carefully before combining them is important.",
      },
      {
        title: "Self-hosted responsibility",
        description:
          "Unlike Clerk or Auth0, you own the infrastructure. This means you're responsible for session security, rate limiting, and keeping dependencies updated.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with the core, add plugins incrementally",
        detail:
          "Begin with email/password and one OAuth provider. Add 2FA, organizations, and admin features as plugins once the core flow works.",
      },
      {
        tip: "Use the type-safe client",
        detail:
          "Better Auth's generated client provides autocomplete for every auth action, session field, and user property — catching auth bugs at compile time.",
      },
      {
        tip: "Configure rate limiting from day one",
        detail:
          "The rate limiting plugin protects login and signup endpoints from brute-force attacks — essential for any self-hosted auth system.",
      },
    ],
    usefulLinks: [
      {
        title: "Better Auth Documentation",
        url: "https://www.better-auth.com/docs",
        type: "docs",
      },
      {
        title: "Better Auth Getting Started",
        url: "https://www.better-auth.com/docs/installation",
        type: "tutorial",
      },
      {
        title: "Better Auth GitHub",
        url: "https://github.com/better-auth/better-auth",
        type: "community",
      },
      {
        title: "Better Auth Plugins",
        url: "https://www.better-auth.com/docs/plugins",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does Better Auth cost?",
        answer:
          "Better Auth is completely free and open-source (MIT license). You only pay for your own hosting and database. There are no per-user fees, no seat limits, and no premium tiers.",
      },
      {
        question: "Better Auth vs Clerk — which should I use?",
        answer:
          "Clerk provides a hosted, zero-config auth solution with prebuilt UI components — great for getting started fast. Better Auth gives you full control, no vendor lock-in, and no per-user pricing — better for projects where you want to own your auth infrastructure.",
      },
      {
        question: "Does Better Auth support social login?",
        answer:
          "Yes. Better Auth supports 20+ OAuth providers including Google, GitHub, Apple, Microsoft, Discord, and more. Adding a provider is a few lines of configuration.",
      },
    ],
    quickstart:
      "npm install better-auth\n\n# Create auth configuration in lib/auth.ts\n# Set up your database adapter (Prisma, Drizzle, etc.)\n# Add the auth handler to your API routes\n\n# Generate the client\nnpx @better-auth/cli generate",
    quickstartLang: "bash",
    docsUrl: "https://www.better-auth.com/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. It makes monorepos fast through intelligent task caching — tasks only re-run when their inputs change, and remote caching shares build results across your entire team and CI.\n\nTurborepo works with npm, yarn, and pnpm workspaces. It orchestrates task dependencies (build before test, test before deploy), runs independent tasks in parallel, and provides a dashboard for monitoring cache hit rates and build times across your development workflow.",
    challenges: [
      {
        title: "Monorepo architecture decisions",
        description:
          "Deciding what belongs in shared packages vs app-specific code requires upfront planning. Over-sharing creates coupling; under-sharing duplicates code. Start with clear package boundaries.",
      },
      {
        title: "CI cache configuration",
        description:
          "Remote caching with Vercel or self-hosted requires proper authentication and cache key strategy. Misconfigured caching can serve stale results or miss cache hits.",
      },
      {
        title: "Dependency management across packages",
        description:
          "Keeping dependency versions consistent across workspace packages requires tooling like syncpack or manual review. Version mismatches cause hard-to-debug runtime errors.",
      },
    ],
    bestPractices: [
      {
        tip: "Enable remote caching from the start",
        detail:
          "Turbo Cloud or self-hosted remote caching ensures CI builds reuse work from local development and previous runs — dramatic CI speedups.",
      },
      {
        tip: "Define clear task pipelines",
        detail:
          "Declare task dependencies in turbo.json (build depends on ^build, test depends on build) so Turborepo runs them in the correct order with maximum parallelism.",
      },
      {
        tip: "Use shared packages for common code",
        detail:
          "Extract UI components, utility functions, and configurations into shared workspace packages — consumed by multiple apps without publishing to npm.",
      },
    ],
    usefulLinks: [
      {
        title: "Turborepo Documentation",
        url: "https://turbo.build/repo/docs",
        type: "docs",
      },
      {
        title: "Turborepo Getting Started",
        url: "https://turbo.build/repo/docs/getting-started",
        type: "tutorial",
      },
      {
        title: "Turborepo GitHub",
        url: "https://github.com/vercel/turborepo",
        type: "community",
      },
      {
        title: "Turbo Cloud",
        url: "https://turbo.build/repo/docs/core-concepts/remote-caching",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Turborepo cost?",
        answer:
          "Turborepo is free and open-source. Turbo Cloud (remote caching hosted by Vercel) has a free tier for personal use. Team plans are included in Vercel Pro ($20/month per member). Self-hosted remote caching is free.",
      },
      {
        question: "Turborepo vs Nx — which monorepo tool?",
        answer:
          "Turborepo is simpler and focused on task caching and orchestration — ideal for teams that want fast monorepos without a steep learning curve. Nx offers more features (generators, executors, plugins) but is more complex. Choose Turborepo for simplicity; Nx for large teams needing deep tooling.",
      },
      {
        question: "Can I add Turborepo to an existing project?",
        answer:
          "Yes. Turborepo works with any npm/yarn/pnpm workspace. Add a turbo.json to your existing monorepo and configure task pipelines — you can adopt it incrementally.",
      },
    ],
    quickstart:
      "# Create a new Turborepo\nnpx create-turbo@latest\n\n# Or add to an existing monorepo\nnpm install turbo --save-dev\n\n# Run all builds with caching\nnpx turbo build\n\n# Enable remote caching\nnpx turbo login\nnpx turbo link",
    quickstartLang: "bash",
    docsUrl: "https://turbo.build/repo/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "PostgreSQL is the most advanced open-source relational database, trusted by companies like Apple, Instagram, and Spotify for mission-critical workloads. It supports ACID transactions, advanced indexing (B-tree, GIN, GiST, BRIN), JSONB for semi-structured data, full-text search, and a rich extension ecosystem including PostGIS and pgvector.\n\nWhether you're building a SaaS platform, an analytics pipeline, or a real-time application with Supabase, PostgreSQL provides the reliability and feature depth to handle it all — from a single-node dev database to globally replicated clusters with Neon or Citus.",
    challenges: [
      {
        title: "Connection management at scale",
        description:
          "Serverless and edge deployments can exhaust PostgreSQL's connection limit. Connection poolers like PgBouncer or Neon's built-in pooling are essential for high-concurrency apps.",
      },
      {
        title: "Schema migrations in production",
        description:
          "ALTER TABLE on large tables can lock reads and writes. Safe migration strategies — like creating indexes concurrently and using expand-contract patterns — prevent downtime.",
      },
      {
        title: "Query performance tuning",
        description:
          "Slow queries often stem from missing indexes, bloated tables, or suboptimal join plans. EXPLAIN ANALYZE and pg_stat_statements are your primary diagnostic tools.",
      },
      {
        title: "Backup and disaster recovery",
        description:
          "Point-in-time recovery with WAL archiving, pg_basebackup, and tested restore procedures are non-negotiable for production databases.",
      },
    ],
    bestPractices: [
      {
        tip: "Use connection pooling",
        detail:
          "PgBouncer or Neon's serverless driver prevent connection exhaustion in serverless environments.",
      },
      {
        tip: "Create indexes concurrently",
        detail:
          "Use CREATE INDEX CONCURRENTLY to avoid locking writes during index creation on live tables.",
      },
      {
        tip: "Enable pg_stat_statements",
        detail:
          "Track slow queries, execution counts, and mean time per query — essential for ongoing performance tuning.",
      },
      {
        tip: "Use row-level security for multi-tenancy",
        detail:
          "RLS policies enforce tenant isolation at the database level, preventing accidental data leaks in shared-schema designs.",
      },
    ],
    usefulLinks: [
      {
        title: "PostgreSQL Official Documentation",
        url: "https://www.postgresql.org/docs/current/",
        type: "docs",
      },
      {
        title: "PostgreSQL Tutorial",
        url: "https://www.postgresqltutorial.com/",
        type: "tutorial",
      },
      {
        title: "Neon Serverless Postgres",
        url: "https://neon.tech/docs",
        type: "tool",
      },
      {
        title: "PostgreSQL Community",
        url: "https://www.postgresql.org/community/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does PostgreSQL development cost?",
        answer:
          "PostgreSQL itself is free and open-source. Development costs depend on project scope — a simple CRUD backend with Postgres might take 2-4 weeks, while a complex multi-tenant SaaS with RLS, full-text search, and replication takes 8-16 weeks. Managed hosting (Neon, Supabase, RDS) starts from free tiers up to hundreds per month for production workloads.",
      },
      {
        question: "PostgreSQL vs MySQL — which should I choose?",
        answer:
          "PostgreSQL excels at complex queries, JSONB, full-text search, and extensibility. MySQL is simpler to operate and dominates in PHP/WordPress ecosystems. For new TypeScript projects, we recommend PostgreSQL for its richer feature set and better ORM support (Prisma, Drizzle).",
      },
      {
        question: "Can PostgreSQL handle millions of rows?",
        answer:
          "Absolutely. PostgreSQL handles billions of rows with proper indexing, partitioning, and query optimization. Instagram runs on PostgreSQL at massive scale. The key is correct schema design, appropriate indexes, and connection pooling.",
      },
      {
        question: "Is PostgreSQL good for serverless?",
        answer:
          "Yes, with the right setup. Neon provides serverless Postgres with auto-scaling and branching. Supabase wraps Postgres with instant APIs. Both handle the connection pooling that traditional Postgres needs for serverless workloads.",
      },
    ],
    quickstart:
      "# Install PostgreSQL locally\nbrew install postgresql@16\nbrew services start postgresql@16\n\n# Create a database\ncreatedb myapp\n\n# Or use Neon serverless\nnpx neonctl projects create --name myapp",
    quickstartLang: "bash",
    docsUrl: "https://www.postgresql.org/docs/current/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "MongoDB is the leading document database, designed for applications that need flexible schemas, horizontal scaling, and rich querying on semi-structured data. Its JSON-like document model maps naturally to application objects, eliminating the impedance mismatch between code and storage.\n\nMongoDB Atlas provides a fully managed cloud offering with global clusters, built-in search (powered by Lucene), vector search for AI applications, and change streams for real-time reactive architectures. It's the go-to choice for content management, IoT, real-time analytics, and applications where schema evolution is frequent.",
    challenges: [
      {
        title: "Schema design without relations",
        description:
          "MongoDB's flexible schema is powerful but requires deliberate design decisions — embedding vs referencing, denormalisation trade-offs, and avoiding unbounded array growth.",
      },
      {
        title: "Aggregation pipeline complexity",
        description:
          "Multi-stage aggregation pipelines can become difficult to read and debug. Breaking pipelines into named stages and using $facet for parallel aggregations helps manage complexity.",
      },
      {
        title: "Index strategy for performance",
        description:
          "MongoDB queries without appropriate indexes perform collection scans. Compound indexes, partial indexes, and the explain() plan are essential tools for query optimization.",
      },
    ],
    bestPractices: [
      {
        tip: "Design schemas around query patterns",
        detail:
          "Embed data that's read together and reference data that's updated independently. Your access patterns should drive your schema, not the other way around.",
      },
      {
        tip: "Use Mongoose for schema validation",
        detail:
          "Mongoose schemas enforce structure, run middleware hooks, and provide TypeScript types — adding guardrails without sacrificing MongoDB's flexibility.",
      },
      {
        tip: "Enable Atlas Search for full-text queries",
        detail:
          "Atlas Search provides Lucene-powered full-text and vector search without deploying a separate Elasticsearch cluster.",
      },
      {
        tip: "Monitor with Atlas Performance Advisor",
        detail:
          "Atlas suggests missing indexes, identifies slow queries, and recommends schema improvements based on actual workload patterns.",
      },
    ],
    usefulLinks: [
      {
        title: "MongoDB Documentation",
        url: "https://www.mongodb.com/docs/manual/",
        type: "docs",
      },
      {
        title: "MongoDB University",
        url: "https://learn.mongodb.com/",
        type: "tutorial",
      },
      {
        title: "MongoDB Atlas",
        url: "https://www.mongodb.com/atlas",
        type: "tool",
      },
      {
        title: "MongoDB Community Forums",
        url: "https://www.mongodb.com/community/forums/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does MongoDB development cost?",
        answer:
          "MongoDB Community Edition is free. Atlas has a free tier (512MB), with paid plans starting around $57/month for production clusters. Development costs vary — a straightforward API with MongoDB might be 2-4 weeks, while complex real-time analytics or multi-region setups take 8-12 weeks.",
      },
      {
        question: "MongoDB vs PostgreSQL — which is better?",
        answer:
          "PostgreSQL is better for complex relational queries, strict data integrity, and transactional workloads. MongoDB excels at flexible schemas, document-oriented data, horizontal scaling, and rapid prototyping. Choose MongoDB when your data is naturally hierarchical or schema requirements change frequently.",
      },
      {
        question: "Is MongoDB good for production apps?",
        answer:
          "Yes. MongoDB powers production systems at Forbes, Toyota, Coinbase, and thousands of other companies. Atlas provides automatic backups, monitoring, and global distribution. The key is proper schema design and indexing.",
      },
    ],
    quickstart:
      '# Install MongoDB locally\nbrew tap mongodb/brew\nbrew install mongodb-community\nbrew services start mongodb-community\n\n# Or use Atlas (free tier)\n# Visit https://cloud.mongodb.com to create a cluster\n\n# Connect with mongosh\nmongosh "mongodb://localhost:27017/myapp"',
    quickstartLang: "bash",
    docsUrl: "https://www.mongodb.com/docs/manual/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Prisma is the most popular TypeScript ORM, providing a schema-first workflow where your data model is the single source of truth. From your Prisma schema, the toolchain generates a fully typed query client, SQL migrations, and a visual data browser (Prisma Studio).\n\nPrisma supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB — letting you switch databases without rewriting queries. Prisma Accelerate adds a global edge cache and connection pooling for serverless and edge deployments.",
    challenges: [
      {
        title: "Complex queries and raw SQL escape hatch",
        description:
          "Prisma's query API covers most use cases, but complex aggregations, CTEs, or database-specific features may require $queryRaw. Understanding when to drop to raw SQL is important.",
      },
      {
        title: "Migration conflicts in teams",
        description:
          "Multiple developers creating migrations simultaneously can cause merge conflicts in the migration history. A clear branching strategy and dev database per developer helps.",
      },
      {
        title: "Bundle size in serverless",
        description:
          "The Prisma Client and engine binary add to cold start times in serverless. Prisma Accelerate or the Data Proxy help by moving the engine to a persistent service.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Prisma Accelerate for serverless",
        detail:
          "Accelerate provides a global connection pool and edge cache — solving the cold start and connection limit issues of serverless Prisma deployments.",
      },
      {
        tip: "Review generated SQL with query logging",
        detail:
          "Enable Prisma's query event logging in development to understand exactly what SQL is generated — essential for performance tuning.",
      },
      {
        tip: "Use select and include strategically",
        detail:
          "Fetch only the fields you need with select, and use include for relations. Overfetching is the most common Prisma performance mistake.",
      },
      {
        tip: "Seed your database with prisma db seed",
        detail:
          "A seed script ensures consistent dev/test data across the team and simplifies onboarding new developers.",
      },
    ],
    usefulLinks: [
      {
        title: "Prisma Documentation",
        url: "https://www.prisma.io/docs",
        type: "docs",
      },
      {
        title: "Prisma Getting Started",
        url: "https://www.prisma.io/docs/getting-started",
        type: "tutorial",
      },
      {
        title: "Prisma GitHub",
        url: "https://github.com/prisma/prisma",
        type: "community",
      },
      {
        title: "Prisma Accelerate",
        url: "https://www.prisma.io/accelerate",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Prisma cost?",
        answer:
          "Prisma ORM is free and open-source. Prisma Accelerate (edge cache and connection pooling) has a free tier with paid plans starting at $49/month. Prisma Pulse (real-time change streams) is also available as a paid add-on.",
      },
      {
        question: "Prisma vs Drizzle — which ORM should I use?",
        answer:
          "Prisma offers a better developer experience with its schema-first approach, Studio, and migration tooling — ideal for teams and rapid development. Drizzle is SQL-first with zero overhead and is better for performance-critical apps or developers who prefer writing SQL-like code. We use both depending on the project.",
      },
      {
        question: "Can Prisma handle large-scale applications?",
        answer:
          "Yes. Prisma powers production apps at scale, including at companies like HashiCorp and Mercedes-Benz. Use Prisma Accelerate for connection pooling and edge caching to handle serverless scale.",
      },
    ],
    quickstart:
      "npx prisma init\n\n# Define your schema in prisma/schema.prisma\n# Then generate the client and run migrations\nnpx prisma migrate dev --name init\nnpx prisma generate\n\n# Open the visual data browser\nnpx prisma studio",
    quickstartLang: "bash",
    docsUrl: "https://www.prisma.io/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "SQLite is the most widely deployed database engine in the world — embedded in every smartphone, browser, and operating system. It's a zero-configuration, serverless, single-file SQL database that's perfect for local-first apps, edge deployments, and development environments.\n\nWith libSQL (Turso) and Cloudflare D1, SQLite now scales to global replication with edge-local reads, branching, and zero cold starts. It's no longer just for prototyping — modern SQLite powers production workloads at the edge with sub-millisecond query latency.",
    challenges: [
      {
        title: "Write concurrency limitations",
        description:
          "SQLite uses a single-writer model — concurrent writes are serialized. For write-heavy workloads, WAL mode and connection pooling help, but high write throughput may require a client-server database.",
      },
      {
        title: "No built-in replication",
        description:
          "Vanilla SQLite has no replication. Turso (libSQL) and Cloudflare D1 add global read replicas and edge distribution for production use cases that need it.",
      },
      {
        title: "Migration tooling choices",
        description:
          "SQLite migration workflows differ between Drizzle Kit, Prisma Migrate, and Wrangler (for D1). Pick one and standardise — mixing migration tools leads to schema drift.",
      },
    ],
    bestPractices: [
      {
        tip: "Enable WAL mode for concurrency",
        detail:
          "Write-Ahead Logging (PRAGMA journal_mode=WAL) allows concurrent reads during writes — essential for any multi-user application.",
      },
      {
        tip: "Use Turso for production edge deployment",
        detail:
          "Turso replicates SQLite globally with embedded replicas — each app instance gets a local copy with automatic sync.",
      },
      {
        tip: "Pair with Drizzle ORM for type safety",
        detail:
          "Drizzle's SQLite driver provides full TypeScript inference with zero overhead — your types match your schema exactly.",
      },
    ],
    usefulLinks: [
      {
        title: "SQLite Documentation",
        url: "https://www.sqlite.org/docs.html",
        type: "docs",
      },
      {
        title: "Turso (libSQL) Documentation",
        url: "https://docs.turso.tech/",
        type: "docs",
      },
      {
        title: "SQLite Tutorial",
        url: "https://www.sqlitetutorial.net/",
        type: "tutorial",
      },
      {
        title: "Cloudflare D1 Docs",
        url: "https://developers.cloudflare.com/d1/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does SQLite cost?",
        answer:
          "SQLite itself is public domain and completely free. Turso offers a free tier (500 databases, 9GB storage) with paid plans from $29/month. Cloudflare D1 has a free tier (5GB) with pay-as-you-go pricing after that.",
      },
      {
        question: "SQLite vs PostgreSQL — when to use which?",
        answer:
          "Use SQLite for local-first apps, embedded databases, edge deployments, and development. Use PostgreSQL for complex relational queries, heavy write workloads, and applications requiring advanced features like RLS, full-text search, or pgvector.",
      },
      {
        question: "Can SQLite handle production traffic?",
        answer:
          "Yes, with the right architecture. Turso and D1 serve production traffic at the edge with global replication. SQLite handles read-heavy workloads exceptionally well. For write-heavy workloads, ensure WAL mode is enabled and consider Turso's embedded replicas.",
      },
    ],
    quickstart:
      "# Install SQLite\nbrew install sqlite\n\n# Or use Turso\ncurl -sSfL https://get.tur.so/install.sh | bash\nturso db create myapp\nturso db show myapp --url\n\n# Or use Cloudflare D1\nnpx wrangler d1 create myapp",
    quickstartLang: "bash",
    docsUrl: "https://www.sqlite.org/docs.html",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Clerk is a complete user management platform that handles authentication, user profiles, organizations, and session management with prebuilt UI components. Drop in a <SignIn /> component and get social login, MFA, passkeys, and a management dashboard without writing auth code.\n\nClerk integrates deeply with Next.js, Remix, Expo, and other frameworks via middleware and hooks. Its backend API, webhooks, and management dashboard give you full control over user data while Clerk handles the security-critical auth infrastructure.",
    challenges: [
      {
        title: "Vendor lock-in considerations",
        description:
          "Clerk manages your user data in their infrastructure. While they provide export tools, migrating away requires re-implementing auth flows and migrating user records.",
      },
      {
        title: "Pricing at scale",
        description:
          "Clerk charges per monthly active user (MAU). For apps with many users and low revenue per user, costs can grow faster than revenue. Evaluate pricing against your business model early.",
      },
      {
        title: "Custom UI requirements",
        description:
          "Clerk's prebuilt components are convenient but may not match every design system. Custom flows require using Clerk's lower-level hooks and API rather than the drop-in components.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Clerk middleware for route protection",
        detail:
          "Clerk's Next.js middleware protects routes at the edge — unauthenticated users are redirected before your page even loads.",
      },
      {
        tip: "Sync user data with webhooks",
        detail:
          "Use Clerk webhooks (via Svix) to sync user creation, updates, and deletion to your own database — keep your app's user table in sync.",
      },
      {
        tip: "Configure organizations for B2B",
        detail:
          "Clerk's organization feature provides multi-tenant user management, roles, and invitations — essential for B2B SaaS without building it yourself.",
      },
    ],
    usefulLinks: [
      {
        title: "Clerk Documentation",
        url: "https://clerk.com/docs",
        type: "docs",
      },
      {
        title: "Clerk Next.js Quickstart",
        url: "https://clerk.com/docs/quickstarts/nextjs",
        type: "tutorial",
      },
      {
        title: "Clerk GitHub",
        url: "https://github.com/clerk",
        type: "community",
      },
      {
        title: "Clerk Dashboard",
        url: "https://dashboard.clerk.com/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Clerk cost?",
        answer:
          "Clerk's free plan includes 10,000 MAU with unlimited auth features. The Pro plan starts at $25/month + $0.02 per MAU beyond 10k. Enterprise plans include custom pricing, SLA, and dedicated support.",
      },
      {
        question: "Clerk vs Better Auth — which should I choose?",
        answer:
          "Clerk is a hosted solution with prebuilt UI, a dashboard, and zero auth code to write — ideal for shipping fast. Better Auth is self-hosted with no per-user pricing — better when you want full control and lower costs at scale.",
      },
      {
        question: "Can I use Clerk with React Native / Expo?",
        answer:
          "Yes. Clerk has an official Expo SDK with authentication flows, session management, and OAuth providers optimized for mobile. It works with Expo's auth session handling.",
      },
    ],
    quickstart:
      "npm install @clerk/nextjs\n\n# Add environment variables\n# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...\n# CLERK_SECRET_KEY=sk_...\n\n# Wrap your app with ClerkProvider\n# Add middleware.ts for route protection",
    quickstartLang: "bash",
    docsUrl: "https://clerk.com/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Polar is a merchant of record platform built specifically for developers — handling payments, subscriptions, usage-based billing, VAT/sales tax, and international compliance so you don't have to. It's designed for SaaS products, developer tools, and open-source monetization.\n\nAs a merchant of record, Polar handles the legal and tax complexity of selling globally — you receive payouts, they handle invoicing, refunds, chargebacks, and tax remittance in 100+ countries. Their API and webhook system integrates cleanly into any TypeScript backend.",
    challenges: [
      {
        title: "Merchant of record trade-offs",
        description:
          "Polar as MoR means they're the legal seller — you get simplicity but less control over invoicing, payment methods, and customer disputes compared to being your own merchant.",
      },
      {
        title: "Feature maturity vs Stripe",
        description:
          "Polar is newer than Stripe and doesn't yet offer the same breadth of features (Connect, Terminal, Radar). Evaluate whether Polar covers your specific billing needs.",
      },
      {
        title: "Open source funding model",
        description:
          "Polar's issue funding and backer features are unique but require community adoption. The ROI depends on your project's community engagement.",
      },
    ],
    bestPractices: [
      {
        tip: "Use webhooks for access provisioning",
        detail:
          "Subscribe to Polar webhook events to automatically provision and revoke access when subscriptions start, renew, or cancel.",
      },
      {
        tip: "Implement usage metering early",
        detail:
          "If you plan usage-based billing, instrument your API with metering from the start — retrofitting usage tracking is significantly harder.",
      },
      {
        tip: "Use Polar's customer portal",
        detail:
          "Polar provides a hosted customer portal for subscription management, invoice history, and payment updates — no need to build billing UI.",
      },
    ],
    usefulLinks: [
      {
        title: "Polar Documentation",
        url: "https://docs.polar.sh/",
        type: "docs",
      },
      {
        title: "Polar API Reference",
        url: "https://docs.polar.sh/api/",
        type: "docs",
      },
      {
        title: "Polar GitHub",
        url: "https://github.com/polarsource/polar",
        type: "community",
      },
      {
        title: "Polar Dashboard",
        url: "https://polar.sh/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Polar cost?",
        answer:
          "Polar charges a percentage of revenue (typically 5%) as the merchant of record fee — this covers payment processing, tax handling, invoicing, and compliance. There are no monthly minimums or setup fees.",
      },
      {
        question: "Polar vs Stripe — which should I use?",
        answer:
          "Stripe gives you full control as a payment processor but you handle tax, invoicing, and compliance yourself. Polar is a merchant of record — they handle everything but take a larger cut. Choose Polar for simplicity; choose Stripe for maximum control.",
      },
      {
        question: "Can I use Polar for open source funding?",
        answer:
          "Yes. Polar was built for this use case — issue-level funding, recurring sponsorships, and backer tiers. It's a GitHub Sponsors alternative with more features and flexibility.",
      },
    ],
    quickstart:
      "# Install the Polar SDK\nnpm install @polar-sh/sdk\n\n# Create products and subscriptions in the Polar dashboard\n# Visit https://polar.sh to set up your organization\n\n# Integrate webhooks for access provisioning\n# See https://docs.polar.sh/webhooks",
    quickstartLang: "bash",
    docsUrl: "https://docs.polar.sh/",
  },

  // ─── SPLIT PAGES (formerly subTechs) ────────────────────────────
  {
    slug: "nextjs",
    name: "Next.js",
    category: "full-stack",
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
    overview:
      "Next.js is the leading full-stack React framework, maintained by Vercel and used by companies from startups to Fortune 500. The App Router introduced React Server Components, streaming SSR, and Server Actions — fundamentally changing how React apps fetch data and handle mutations. With Partial Prerendering, edge middleware, image optimization, and zero-config deployments on Vercel (or self-hosted on Docker), Next.js is the most complete platform for building production React applications. At A Major, it's our primary framework for web applications, SaaS products, and content-driven sites.",
    challenges: [
      {
        title: "Server vs. client component boundaries",
        description:
          "Deciding what runs on the server vs. client, managing 'use client' boundaries, and understanding serialization constraints between server and client components creates real architectural complexity.",
      },
      {
        title: "Caching and revalidation strategies",
        description:
          "Next.js has multiple caching layers (fetch cache, full route cache, router cache, data cache). Understanding when each layer applies and how to invalidate correctly is one of the hardest parts of the framework.",
      },
      {
        title: "App Router migration from Pages Router",
        description:
          "Migrating from Pages Router to App Router is a significant effort — different data fetching patterns, layout model, and mental model. It's not a simple find-and-replace.",
      },
      {
        title: "Build and deploy complexity at scale",
        description:
          "Large Next.js apps face long build times, complex ISR configurations, and middleware limitations. Self-hosting requires understanding Node.js server configuration, standalone output, and edge runtime constraints.",
      },
    ],
    bestPractices: [
      {
        tip: "Default to Server Components, opt into client",
        detail:
          "Keep components on the server unless they need interactivity (onClick, useState, useEffect). This reduces bundle size, improves initial load, and keeps sensitive logic server-side.",
      },
      {
        tip: "Use Server Actions for mutations",
        detail:
          "Server Actions replace API routes for form submissions and data mutations. They're type-safe, progressively enhanced, and colocated with the UI that triggers them.",
      },
      {
        tip: "Implement streaming with Suspense boundaries",
        detail:
          "Wrap slow data fetches in Suspense to stream the fast parts of your page immediately. Users see content sooner, and you avoid blocking the entire page on one slow query.",
      },
      {
        tip: "Use Partial Prerendering for dynamic pages",
        detail:
          "PPR lets you statically render the shell of a page while streaming dynamic content — combining the speed of SSG with the freshness of SSR in a single response.",
      },
    ],
    usefulLinks: [
      {
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        type: "docs",
      },
      {
        title: "Next.js Learn Course",
        url: "https://nextjs.org/learn",
        type: "tutorial",
      },
      {
        title: "Vercel Platform",
        url: "https://vercel.com",
        type: "tool",
      },
      {
        title: "Next.js GitHub",
        url: "https://github.com/vercel/next.js",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Next.js vs. Remix (React Router v7) — which should I use?",
        answer:
          "Next.js has a larger ecosystem, more deployment options, and Vercel's backing. Remix/React Router v7 offers simpler mental models for data loading and progressive enhancement. We recommend Next.js for most projects due to its maturity, but Remix for teams that value web standards and progressive enhancement.",
      },
      {
        question: "How much does it cost to build a Next.js application?",
        answer:
          "A Next.js marketing site runs $5K–15K. A SaaS application with auth, database, and real-time features costs $25K–100K+. Enterprise applications with complex integrations can exceed $150K. We scope every project with a free consultation.",
      },
      {
        question: "Should I use Pages Router or App Router?",
        answer:
          "App Router is the recommended approach for all new Next.js projects. It supports Server Components, streaming, and Server Actions. Pages Router is stable but won't receive new features. We help teams migrate incrementally.",
      },
      {
        question: "Can I self-host Next.js instead of using Vercel?",
        answer:
          "Yes. Next.js supports standalone output for Docker containers, and works on Railway, Fly.io, AWS, and any Node.js host. Some features like edge middleware work differently when self-hosted. We help teams set up optimal self-hosted configurations.",
      },
    ],
    quickstart: "npx create-next-app@latest my-app\ncd my-app\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://nextjs.org/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "React Native lets you build truly native iOS and Android apps using React and JavaScript/TypeScript. Unlike hybrid frameworks, React Native renders native platform components — your app feels native because it is native. With Expo's managed workflow, you get fast iteration via hot reloading, over-the-air updates without App Store review, and EAS Build for CI/CD. The New Architecture (JSI, Fabric, Turbo Modules) eliminates the old bridge bottleneck for near-native performance. We build React Native apps with Expo Router for file-based navigation, Reanimated for 60fps animations, and shared TypeScript code with your web product.",
    challenges: [
      {
        title: "Native module compatibility",
        description:
          "Not all native modules support the New Architecture yet. Evaluating library compatibility, managing native dependencies, and occasionally writing custom native modules requires platform expertise.",
      },
      {
        title: "Platform-specific behavior",
        description:
          "Despite shared code, iOS and Android differ in navigation patterns, permissions, keyboard handling, and gesture systems. Building truly polished apps on both platforms requires platform-specific knowledge.",
      },
      {
        title: "App Store deployment pipeline",
        description:
          "Managing code signing, provisioning profiles, TestFlight, Play Store internal testing, and review processes adds significant DevOps complexity beyond web deployment.",
      },
      {
        title: "Performance optimization",
        description:
          "JavaScript thread bottlenecks, unnecessary re-renders in long lists, and animation jank require profiling with Flipper/Hermes and careful optimization of the render pipeline.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Expo managed workflow by default",
        detail:
          "Expo handles native configuration, build tooling, and OTA updates. Only eject to bare workflow when you need a native module that Expo doesn't support via config plugins.",
      },
      {
        tip: "Share business logic, not UI components, with web",
        detail:
          "API calls, state management, validation, and types share well between web and mobile. But UI components should be built natively for each platform's design conventions.",
      },
      {
        tip: "Use Expo Router for navigation",
        detail:
          "Expo Router brings file-based routing to React Native with deep linking, typed routes, and the same mental model as Next.js. It's the modern standard for RN navigation.",
      },
      {
        tip: "Optimize lists with FlashList",
        detail:
          "Replace FlatList with Shopify's FlashList for large lists — it recycles views like native list components and handles thousands of items without jank.",
      },
    ],
    usefulLinks: [
      {
        title: "React Native Documentation",
        url: "https://reactnative.dev",
        type: "docs",
      },
      {
        title: "Expo Documentation",
        url: "https://docs.expo.dev",
        type: "docs",
      },
      {
        title: "React Navigation",
        url: "https://reactnavigation.org",
        type: "tool",
      },
      {
        title: "Expo Router",
        url: "https://docs.expo.dev/router/introduction",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "React Native vs. Flutter — which should I choose?",
        answer:
          "Choose React Native if your team knows JavaScript/TypeScript or you want to share code with a React web app. Choose Flutter for pixel-perfect custom UI across platforms or if your team prefers Dart. React Native has a larger ecosystem; Flutter has better cross-platform UI consistency.",
      },
      {
        question: "How much does it cost to build a React Native app?",
        answer:
          "A basic React Native app (5-10 screens, auth, API integration) costs $20K–50K. Complex apps with real-time features, offline support, and native integrations run $50K–150K+. We provide free scoping consultations.",
      },
      {
        question: "Can React Native apps perform as well as fully native apps?",
        answer:
          "Yes, for the vast majority of use cases. The New Architecture eliminates the bridge bottleneck, Hermes provides fast JS execution, and Reanimated runs animations on the native thread. Only extremely graphics-intensive apps (3D games) need fully native development.",
      },
      {
        question: "Should I use Expo or bare React Native?",
        answer:
          "Start with Expo. It handles 95% of use cases with config plugins, EAS Build, and OTA updates. Only go bare when you need a native module that has no Expo config plugin. We rarely need to eject.",
      },
    ],
    quickstart: "npx create-expo-app@latest my-app\ncd my-app\nnpx expo start",
    quickstartLang: "bash",
    docsUrl: "https://reactnative.dev",
    pageType: "tech",
    targetAudience: "developers",
  },
  {
    slug: "nuxt",
    name: "Nuxt",
    category: "full-stack",
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
    overview:
      "Nuxt is the full-stack Vue framework — it takes Vue 3 and adds file-based routing, auto-imports, server API routes, hybrid rendering, and the Nitro server engine. Nuxt 3 makes Vue development feel as productive as any modern full-stack framework, with conventions that eliminate boilerplate while remaining flexible. Its hybrid rendering lets you mix SSR, SSG, ISR, and SPA modes per route, and Nitro's universal runtime deploys to Vercel, Cloudflare Workers, Node, or static hosting. For Vue teams, Nuxt is the obvious choice for anything beyond a simple SPA.",
    challenges: [
      {
        title: "Auto-import magic vs. explicitness",
        description:
          "Nuxt auto-imports components, composables, and utilities, which speeds development but can confuse teams about where things come from. IDE support helps, but the implicit nature divides opinions.",
      },
      {
        title: "Module ecosystem quality variance",
        description:
          "Nuxt's module ecosystem is large but varies in quality — some modules are well-maintained, others are abandoned or incompatible with Nuxt 3. Evaluating module reliability requires due diligence.",
      },
      {
        title: "Nitro server configuration",
        description:
          "Nitro's universal runtime is powerful but configuring it for specific deployment targets, managing server middleware, and handling edge function limitations requires deep understanding.",
      },
      {
        title: "Nuxt 2 to Nuxt 3 migration",
        description:
          "Migrating from Nuxt 2 (Options API, Vuex, webpack) to Nuxt 3 (Composition API, Pinia, Vite, Nitro) is a substantial rewrite — not an incremental upgrade.",
      },
    ],
    bestPractices: [
      {
        tip: "Embrace the conventions",
        detail:
          "Nuxt's file-based routing, auto-imports, and directory structure exist to reduce decisions. Fight them less, ship more. Customize when needed, but start with the defaults.",
      },
      {
        tip: "Use hybrid rendering strategically",
        detail:
          "Configure rendering per route — SSG for marketing pages, SSR for dynamic content, SPA for authenticated dashboards. Nuxt's routeRules make this a one-liner per pattern.",
      },
      {
        tip: "Write server routes in /server/api",
        detail:
          "Nuxt's Nitro-powered server routes handle API endpoints, webhooks, and server-side logic. Keep your backend code colocated with your frontend for simpler deployments.",
      },
      {
        tip: "Use useFetch and useAsyncData for data loading",
        detail:
          "Nuxt's built-in data fetching composables handle SSR, caching, and hydration automatically. Avoid raw fetch() in components — useFetch gives you error handling and loading states for free.",
      },
    ],
    usefulLinks: [
      {
        title: "Nuxt Documentation",
        url: "https://nuxt.com/docs",
        type: "docs",
      },
      { title: "Nuxt Modules", url: "https://nuxt.com/modules", type: "tool" },
      {
        title: "Nuxt UI",
        url: "https://ui.nuxt.com",
        type: "tool",
      },
      {
        title: "Vue.js Documentation",
        url: "https://vuejs.org",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "Nuxt vs. Next.js — which should I use?",
        answer:
          "Nuxt is for Vue teams; Next.js is for React teams. Both offer SSR, file-based routing, and full-stack capabilities. Choose based on your team's framework preference. Nuxt's auto-imports and conventions make it more opinionated; Next.js has a larger ecosystem.",
      },
      {
        question: "How much does it cost to build a Nuxt application?",
        answer:
          "A Nuxt marketing site or blog costs $5K–15K. A full-stack Nuxt application with auth, API routes, and database integration typically runs $20K–70K+. We scope every project with a free consultation.",
      },
      {
        question: "Do I need Nuxt, or can I use plain Vue?",
        answer:
          "Plain Vue with Vite works for simple SPAs. But for SSR, SEO, file-based routing, API routes, or deployment flexibility, Nuxt provides these features out of the box. For production Vue apps, we always recommend Nuxt.",
      },
      {
        question: "Is Nuxt 3 stable for production?",
        answer:
          "Yes. Nuxt 3 is stable, actively maintained, and used in production by thousands of companies. The ecosystem (Nuxt UI, Nuxt Content, Nuxt Image) is mature and well-documented.",
      },
    ],
    quickstart:
      "npx nuxi@latest init my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://nuxt.com/docs",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "PHP powers over 75% of websites with a known server-side language — from WordPress to Laravel to Symfony. Modern PHP 8.x features typed properties, enums, fibers, match expressions, and attributes that make it a genuinely capable backend language. At A Major, we build modern PHP applications that leverage the language's strengths — rapid development, a massive hosting ecosystem, and battle-tested frameworks.\n\nPHP's maturity is its superpower. Composer has 400K+ packages, hosting is available everywhere from shared servers to Kubernetes, and the developer talent pool is enormous. With OPcache, JIT compilation, and async runtimes like Swoole, modern PHP performance rivals Node.js.",
    challenges: [
      {
        title: "Legacy code and reputation",
        description:
          "PHP's early-era reputation lingers unfairly. Migrating legacy PHP 5.x codebases to modern PHP 8.x patterns requires systematic refactoring.",
      },
      {
        title: "Async programming limitations",
        description:
          "PHP's request-response model doesn't natively support persistent connections. Swoole or ReactPHP add async capabilities but diverge from standard PHP patterns.",
      },
      {
        title: "Type system strictness",
        description:
          "PHP's type system is opt-in. Codebases without strict typing accumulate type-related bugs — enforce declare(strict_types=1) project-wide.",
      },
      {
        title: "Deployment fragmentation",
        description:
          "PHP deployment spans shared hosting, FPM, Docker, and serverless (Bref). Choosing the right approach for your scale matters significantly.",
      },
    ],
    bestPractices: [
      {
        tip: "Use PHP 8.2+ with strict types everywhere",
        detail:
          "Add declare(strict_types=1) to every file. Use union types, readonly properties, and enums to catch errors at compile time.",
      },
      {
        tip: "Run PHPStan at level 8+ in CI",
        detail:
          "Static analysis catches type errors, dead code, and potential bugs before they reach production.",
      },
      {
        tip: "Use Composer autoloading with PSR-4",
        detail:
          "PSR-4 autoloading eliminates manual require statements and enforces a consistent namespace-to-directory mapping.",
      },
      {
        tip: "Deploy with OPcache preloading",
        detail:
          "OPcache preloading compiles your entire application on startup — eliminating per-request compilation overhead.",
      },
    ],
    usefulLinks: [
      {
        title: "PHP Official Documentation",
        url: "https://www.php.net/docs.php",
        type: "docs",
      },
      {
        title: "PHP: The Right Way",
        url: "https://phptherightway.com",
        type: "tutorial",
      },
      {
        title: "Packagist Package Registry",
        url: "https://packagist.org",
        type: "tool",
      },
      {
        title: "PHPStan Static Analysis",
        url: "https://phpstan.org",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is PHP still worth learning in 2025?",
        answer:
          "Yes. PHP powers 75%+ of the web, runs major platforms (WordPress, Laravel, Symfony), and has a massive job market. Modern PHP 8.x is a capable, fast, and well-typed language.",
      },
      {
        question: "How much does PHP development cost?",
        answer:
          "PHP is free and open-source. The large developer pool makes rates competitive. Hosting starts at a few dollars/month on shared hosting and scales to enterprise cloud deployments.",
      },
      {
        question: "PHP vs Node.js — which is better?",
        answer:
          "PHP excels for content-heavy web applications and has the widest hosting availability. Node.js is better for real-time applications and full-stack JavaScript teams. Both are production-proven.",
      },
      {
        question: "Is PHP fast enough for modern applications?",
        answer:
          "Yes. PHP 8.x with OPcache and JIT compilation benchmarks competitively with Node.js. For async workloads, Swoole adds event-driven concurrency to PHP.",
      },
    ],
    quickstart:
      "composer create-project laravel/laravel my-app\ncd my-app\nphp artisan serve",
    quickstartLang: "bash",
    docsUrl: "https://www.php.net/docs.php",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Auto-generated CRUD admin interface from your models — content management out of the box, no extra code.",
      },
      {
        icon: "Database",
        title: "Django ORM",
        description:
          "Pythonic query API with lazy evaluation, prefetch/select related, and multi-database support for complex data access.",
      },
      {
        icon: "Globe",
        title: "Django REST Framework",
        description:
          "Serializers, viewsets, and browsable API for building RESTful endpoints with authentication and pagination baked in.",
      },
      {
        icon: "Shield",
        title: "Security by default",
        description:
          "CSRF protection, SQL injection prevention, clickjacking guards, and secure password hashing — enabled out of the box.",
      },
      {
        icon: "GitBranch",
        title: "Schema migrations",
        description:
          "Auto-detected model changes generate migration files — version-controlled schema evolution with zero manual SQL.",
      },
      {
        icon: "Radio",
        title: "Django Channels",
        description:
          "WebSocket support and async consumers for real-time features — chat, notifications, and live updates in Django.",
      },
    ],
    subTechs: [{ slug: "python" }, { slug: "postgresql" }],
    overview:
      "Django is Python's most popular web framework, following a 'batteries included' philosophy that ships authentication, an admin panel, ORM, form handling, and migrations out of the box. At A Major, we use Django for content management systems, internal tools, multi-tenant SaaS platforms, and API backends powered by Django REST Framework.\n\nDjango's automatic admin interface alone saves weeks of development for data-heavy applications. Combined with Django REST Framework for APIs, Celery for async tasks, and Django Channels for WebSocket support, Django is a complete platform for serious Python web development.",
    challenges: [
      {
        title: "Monolithic architecture tendencies",
        description:
          "Django's app structure encourages a monolith by default. Large projects need careful domain separation to avoid tightly coupled Django apps.",
      },
      {
        title: "ORM performance for complex queries",
        description:
          "Django ORM generates clean SQL for simple queries but struggles with complex aggregations and window functions — raw SQL is sometimes the pragmatic choice.",
      },
      {
        title: "Async support is still maturing",
        description:
          "Django's async views and ORM support are improving but not fully async-native. High-concurrency real-time features may need Django Channels or a separate async service.",
      },
      {
        title: "Template layer limitations for SPAs",
        description:
          "Django templates are server-rendered. Modern SPAs need Django REST Framework or GraphQL with a separate frontend — adding deployment and architectural complexity.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Django REST Framework for APIs",
        detail:
          "DRF provides serializers, viewsets, authentication, and permissions out of the box — don't reinvent API patterns.",
      },
      {
        tip: "Write custom management commands for operations",
        detail:
          "Data migrations, imports, and maintenance tasks belong in management commands — runnable from CLI and schedulable in cron.",
      },
      {
        tip: "Use select_related and prefetch_related everywhere",
        detail:
          "Django ORM lazy-loads by default. Explicit eager loading prevents N+1 queries that cripple list views.",
      },
      {
        tip: "Leverage Django's built-in security",
        detail:
          "CSRF protection, SQL injection prevention, XSS escaping, and clickjacking protection are enabled by default — don't disable them.",
      },
    ],
    usefulLinks: [
      {
        title: "Django Official Documentation",
        url: "https://docs.djangoproject.com",
        type: "docs",
      },
      {
        title: "Django REST Framework",
        url: "https://www.django-rest-framework.org",
        type: "docs",
      },
      {
        title: "Django Forum",
        url: "https://forum.djangoproject.com",
        type: "community",
      },
      {
        title: "Django Packages Directory",
        url: "https://djangopackages.org",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Is Django good for large applications?",
        answer:
          "Yes. Instagram, Pinterest, and Disqus all run on Django. With proper architecture, caching, and database optimization, Django scales to millions of users.",
      },
      {
        question: "How much does Django development cost?",
        answer:
          "Django is free and open-source. Development costs range from $15K–$80K depending on complexity. Django's built-in admin and auth save significant development time compared to building from scratch.",
      },
      {
        question: "Django vs FastAPI — which should I choose?",
        answer:
          "Django for full-featured web applications with admin panels, user management, and content systems. FastAPI for high-performance microservices, APIs, and ML endpoints where async I/O matters.",
      },
      {
        question: "Can Django build modern single-page applications?",
        answer:
          "Django serves as the backend API via DRF, paired with React, Vue, or Next.js on the frontend. Django + HTMX is also popular for server-rendered interactive UIs without a full SPA.",
      },
    ],
    quickstart:
      "pip install django\ndjango-admin startproject mysite\ncd mysite\npython manage.py runserver",
    quickstartLang: "bash",
    docsUrl: "https://docs.djangoproject.com",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Native async/await with Starlette — handle thousands of concurrent connections without thread pool bottlenecks.",
      },
      {
        icon: "FileCode2",
        title: "Auto OpenAPI docs",
        description:
          "Swagger UI and ReDoc generated automatically from your type hints — interactive API docs with zero config.",
      },
      {
        icon: "Shield",
        title: "Pydantic validation",
        description:
          "Request and response validation via Pydantic models — type coercion, nested objects, and clear error messages.",
      },
      {
        icon: "Brain",
        title: "AI & ML endpoints",
        description:
          "Python-native framework ideal for serving ML models — integrate PyTorch, TensorFlow, or LangChain directly.",
      },
      {
        icon: "Layers",
        title: "Dependency injection",
        description:
          "Built-in DI system for database sessions, auth, and shared services — clean, testable endpoint signatures.",
      },
      {
        icon: "Globe",
        title: "ASGI ecosystem",
        description:
          "Full ASGI compatibility — deploy with Uvicorn, add middleware from Starlette, or mount sub-applications.",
      },
    ],
    subTechs: [{ slug: "python" }, { slug: "postgresql" }],
    overview:
      "FastAPI is the fastest-growing Python web framework, built for modern async API development. Define your endpoints with Python type hints and get automatic request validation, OpenAPI documentation, and high-performance async I/O — all from a single function signature. At A Major, we use FastAPI for microservices, AI/ML inference endpoints, and any API where performance and developer speed both matter.\n\nFastAPI runs on Starlette (ASGI) and Pydantic, combining async request handling with runtime data validation. It's the natural choice for Python services that need to handle concurrent I/O efficiently — database queries, external API calls, and LLM inference in parallel.",
    challenges: [
      {
        title: "No built-in ORM or database layer",
        description:
          "FastAPI is intentionally minimal — you need to bring your own ORM (SQLAlchemy, Tortoise) and handle migrations (Alembic) separately.",
      },
      {
        title: "Async ecosystem gaps",
        description:
          "Not all Python libraries support async. Mixing sync and async code requires careful handling to avoid blocking the event loop.",
      },
      {
        title: "Project structure is up to you",
        description:
          "FastAPI doesn't prescribe a project layout. Without clear conventions, larger codebases can become disorganized quickly.",
      },
    ],
    bestPractices: [
      {
        tip: "Use dependency injection for shared resources",
        detail:
          "FastAPI's Depends() system handles database sessions, auth, and configuration — compose dependencies cleanly.",
      },
      {
        tip: "Define response models explicitly",
        detail:
          "Set response_model on every endpoint to control serialization, exclude sensitive fields, and generate accurate OpenAPI docs.",
      },
      {
        tip: "Use Alembic for database migrations",
        detail:
          "Pair SQLAlchemy models with Alembic for auto-generated, reviewable migration scripts. Never modify production schemas manually.",
      },
      {
        tip: "Run with Uvicorn behind Gunicorn in production",
        detail:
          "Gunicorn manages worker processes while Uvicorn handles async I/O — the recommended production deployment pattern.",
      },
    ],
    usefulLinks: [
      {
        title: "FastAPI Official Documentation",
        url: "https://fastapi.tiangolo.com",
        type: "docs",
      },
      {
        title: "FastAPI Tutorial",
        url: "https://fastapi.tiangolo.com/tutorial/",
        type: "tutorial",
      },
      {
        title: "Pydantic Documentation",
        url: "https://docs.pydantic.dev",
        type: "docs",
      },
      {
        title: "FastAPI on GitHub",
        url: "https://github.com/fastapi/fastapi",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Is FastAPI production-ready?",
        answer:
          "Yes. FastAPI is used in production by Microsoft, Uber, Netflix, and many others. It's stable, actively maintained, and has a large community.",
      },
      {
        question: "How fast is FastAPI compared to Node.js?",
        answer:
          "FastAPI on Uvicorn handles comparable request throughput to Express.js for I/O-bound workloads. For CPU-bound tasks, Python is slower, but async I/O performance is competitive.",
      },
      {
        question: "FastAPI vs Django REST Framework — which should I use?",
        answer:
          "FastAPI for microservices, async APIs, and ML endpoints. DRF for full-featured backends that need Django's ORM, admin, and authentication ecosystem.",
      },
      {
        question: "How much does FastAPI development cost?",
        answer:
          "FastAPI is free and open-source. Development costs range from $8K–$50K for typical API services. Its automatic documentation generation reduces handoff costs significantly.",
      },
    ],
    quickstart: "pip install fastapi uvicorn\nuvicorn main:app --reload",
    quickstartLang: "bash",
    docsUrl: "https://fastapi.tiangolo.com",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Define your API contract once — TypeScript infers input and output types on both client and server automatically.",
      },
      {
        icon: "Zap",
        title: "React Query integration",
        description:
          "First-class TanStack Query hooks — typed queries, mutations, and infinite scroll with automatic cache invalidation.",
      },
      {
        icon: "Shield",
        title: "Zod input validation",
        description:
          "Runtime validation and TypeScript types from the same Zod schema — one source of truth for your API inputs.",
      },
      {
        icon: "Layers",
        title: "Middleware & context",
        description:
          "Composable middleware chain for auth, logging, and rate limiting with typed context passed to every procedure.",
      },
      {
        icon: "Globe",
        title: "Any backend runtime",
        description:
          "Works with Next.js, Express, Fastify, or any Node-compatible server — bring your own HTTP layer.",
      },
      {
        icon: "Server",
        title: "Server-side calls",
        description:
          "Call tRPC procedures directly on the server without HTTP overhead — ideal for RSC and server actions.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "nextjs" }, { slug: "react" }],
    overview:
      "tRPC enables end-to-end type safety between your TypeScript backend and frontend without code generation, REST contracts, or GraphQL schemas. Change a server function's return type and your editor instantly shows every affected client call. At A Major, we use tRPC for full-stack TypeScript applications where developer velocity and type safety are equally critical.\n\ntRPC integrates seamlessly with React Query for caching, refetching, and optimistic updates. Combined with Zod for input validation and Next.js for server-side rendering, tRPC creates a development experience where the entire stack is a single type-safe codebase.",
    challenges: [
      {
        title: "TypeScript-only ecosystem",
        description:
          "tRPC requires TypeScript on both server and client. If you need to support non-TypeScript consumers (mobile apps, third-party integrations), you need a REST or GraphQL layer alongside tRPC.",
      },
      {
        title: "No OpenAPI spec generation",
        description:
          "tRPC doesn't generate OpenAPI docs natively. For public APIs consumed by external partners, consider oRPC or a dedicated REST layer.",
      },
      {
        title: "Monorepo coupling",
        description:
          "tRPC type inference works best in monorepos where server and client share the same TypeScript project. Separate repos lose the type-safety advantage.",
      },
    ],
    bestPractices: [
      {
        tip: "Organize routers by domain feature",
        detail:
          "Create separate router files per domain (userRouter, postRouter) and merge them into a single appRouter.",
      },
      {
        tip: "Use Zod for all input validation",
        detail:
          "Zod schemas validate input at runtime and provide TypeScript types at compile time — single source of truth for your API contract.",
      },
      {
        tip: "Leverage React Query's caching",
        detail:
          "tRPC wraps React Query — use staleTime, gcTime, and invalidation patterns to minimize unnecessary refetches.",
      },
      {
        tip: "Use middleware for auth and logging",
        detail:
          "tRPC middleware runs before procedures — centralize authentication, authorization, and request logging in reusable middleware.",
      },
    ],
    usefulLinks: [
      {
        title: "tRPC Official Documentation",
        url: "https://trpc.io/docs",
        type: "docs",
      },
      {
        title: "tRPC + Next.js Guide",
        url: "https://trpc.io/docs/client/nextjs",
        type: "tutorial",
      },
      {
        title: "tRPC GitHub Repository",
        url: "https://github.com/trpc/trpc",
        type: "community",
      },
      {
        title: "Create T3 App",
        url: "https://create.t3.gg",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "tRPC vs REST — which should I use?",
        answer:
          "Use tRPC for internal TypeScript-to-TypeScript communication where type safety matters most. Use REST for public APIs, multi-language consumers, and third-party integrations.",
      },
      {
        question: "Can I use tRPC with Next.js App Router?",
        answer:
          "Yes. tRPC supports Next.js App Router with server-side callers and React Server Components. The integration is well-documented and actively maintained.",
      },
      {
        question: "Does tRPC scale for large applications?",
        answer:
          "Yes. tRPC routers compose like functions — split by domain, nest as needed. Companies like Cal.com run large production applications on tRPC.",
      },
      {
        question: "How much does tRPC cost?",
        answer:
          "tRPC is free and open-source. It adds no runtime overhead — it's a thin layer over HTTP. Development costs are lower than REST because you write no schema definitions or client generation code.",
      },
    ],
    quickstart: "npx create-t3-app@latest my-app\ncd my-app\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://trpc.io/docs",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Ownership and borrow checker eliminate data races and null pointer bugs at compile time — no garbage collector pauses.",
      },
      {
        icon: "Zap",
        title: "C-comparable performance",
        description:
          "Zero-cost abstractions compile to machine code as fast as C/C++ — ideal for latency-sensitive services.",
      },
      {
        icon: "Globe",
        title: "WebAssembly target",
        description:
          "Compile Rust to Wasm for near-native performance in the browser or on edge runtimes like Cloudflare Workers.",
      },
      {
        icon: "Terminal",
        title: "CLI tooling",
        description:
          "Build fast, cross-platform CLI tools with clap for argument parsing and tokio for async I/O.",
      },
      {
        icon: "Server",
        title: "Axum & Actix web",
        description:
          "Production-grade async web frameworks — type-safe extractors, middleware, and tower service integration.",
      },
      {
        icon: "Package",
        title: "Cargo ecosystem",
        description:
          "Cargo handles builds, deps, testing, and publishing — 150k+ crates on crates.io for every use case.",
      },
    ],
    subTechs: [
      { slug: "tauri" },
      { slug: "wasm" },
      { slug: "cloudflare-workers" },
    ],
    overview:
      "Rust is a systems programming language that guarantees memory safety without a garbage collector, delivering C/C++-level performance with modern developer ergonomics. At A Major, we use Rust for performance-critical components — Tauri desktop backends, WebAssembly modules, CLI tools, high-throughput web services with Axum, and anywhere zero-cost abstractions and fearless concurrency matter.\n\nRust's ownership model eliminates entire classes of bugs at compile time: no null pointer dereferences, no data races, no use-after-free. Combined with Cargo's excellent package ecosystem, first-class WebAssembly support, and growing adoption in web infrastructure, Rust is our choice when correctness and performance are non-negotiable.",
    challenges: [
      {
        title: "Steep learning curve",
        description:
          "Rust's ownership system, lifetimes, and borrow checker require significant upfront learning. Developers from GC-based languages face a productivity dip initially.",
      },
      {
        title: "Longer compilation times",
        description:
          "Rust's compile-time safety checks and monomorphization result in slower builds than Go or TypeScript. Incremental compilation and cargo-watch help during development.",
      },
      {
        title: "Smaller ecosystem for web development",
        description:
          "Rust's web ecosystem (Axum, Actix) is capable but smaller than Node.js or Python. Some integrations may need custom implementation.",
      },
      {
        title: "Hiring and team scaling",
        description:
          "Experienced Rust developers are in high demand and short supply. Training existing developers takes 3–6 months of productive learning.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Axum for web services",
        detail:
          "Axum, built on Tokio and Tower, is the most ergonomic Rust web framework with excellent middleware composability.",
      },
      {
        tip: "Leverage cargo clippy in CI",
        detail:
          "Clippy catches common mistakes, anti-patterns, and performance issues — run it as a CI gate alongside cargo test.",
      },
      {
        tip: "Use wasm-pack for WebAssembly",
        detail:
          "wasm-pack compiles Rust to WASM with TypeScript bindings and npm packaging — seamless integration with JavaScript projects.",
      },
      {
        tip: "Embrace the type system for domain modeling",
        detail:
          "Use Rust's enums and pattern matching to make invalid states unrepresentable — catch business logic errors at compile time.",
      },
    ],
    usefulLinks: [
      {
        title: "The Rust Programming Language Book",
        url: "https://doc.rust-lang.org/book/",
        type: "docs",
      },
      {
        title: "Rust by Example",
        url: "https://doc.rust-lang.org/rust-by-example/",
        type: "tutorial",
      },
      {
        title: "crates.io Package Registry",
        url: "https://crates.io",
        type: "tool",
      },
      {
        title: "Rust Users Forum",
        url: "https://users.rust-lang.org",
        type: "community",
      },
    ],
    faq: [
      {
        question: "When should I use Rust instead of Go or TypeScript?",
        answer:
          "Use Rust when you need maximum performance, memory safety guarantees, or WebAssembly compilation. Go is simpler for networked services. TypeScript is faster for web-centric backends. Rust excels at compute-heavy, safety-critical systems.",
      },
      {
        question: "How much does Rust development cost?",
        answer:
          "Rust is free and open-source. Development costs are higher than TypeScript or Python due to the smaller talent pool and steeper learning curve — expect 20–40% premium for equivalent features.",
      },
      {
        question: "Is Rust good for web development?",
        answer:
          "Yes, but selectively. Axum and Actix handle web services efficiently. Rust shines for high-throughput APIs, WebAssembly modules, and compute-heavy backend components — not for typical CRUD apps.",
      },
      {
        question: "Can I compile Rust to WebAssembly?",
        answer:
          "Rust has first-class WASM support. wasm-pack generates npm packages from Rust code with TypeScript bindings. Rust → WASM is the most mature and performant compilation path available.",
      },
    ],
    quickstart:
      "cargo init my-project\ncd my-project\ncargo add axum tokio --features tokio/full\ncargo run",
    quickstartLang: "bash",
    docsUrl: "https://doc.rust-lang.org/book/",
    pageType: "tech",
    targetAudience: "developers",
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "cms",
    pageType: "cms",
    targetAudience: "businesses",
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
        description:
          "Multi-step checkout with upsells, discount logic, and guest checkout — tailored to your conversion funnel.",
      },
      {
        icon: "Globe",
        title: "Headless storefront",
        description:
          "WooCommerce REST API powering a React or Next.js frontend — editorial flexibility with modern performance.",
      },
      {
        icon: "Package",
        title: "Inventory management",
        description:
          "Stock tracking, backorder rules, and warehouse sync — manage thousands of SKUs with real-time availability.",
      },
      {
        icon: "Shield",
        title: "Payment gateways",
        description:
          "Stripe, PayPal, Apple Pay, and 100+ gateway integrations — secure checkout for every market.",
      },
      {
        icon: "Workflow",
        title: "Order automation",
        description:
          "Automated order status emails, fulfillment triggers, and CRM sync — reduce manual work per order to zero.",
      },
      {
        icon: "BarChart2",
        title: "Sales analytics",
        description:
          "Revenue dashboards, conversion funnels, and product performance reports — data-driven merchandising decisions.",
      },
    ],
    subTechs: [{ slug: "wordpress" }, { slug: "stripe" }],
    overview:
      "WooCommerce is the most popular e-commerce platform in the world, powering over 5 million online stores. Built on WordPress, it gives you full control over your store — products, checkout, shipping, taxes, and payments. But turning WooCommerce into a high-converting, fast, and scalable store requires custom development far beyond installing a theme. We build WooCommerce stores that are optimized for conversion, speed, and your specific business model.",
    challenges: [
      {
        title: "Slow page loads hurt conversions",
        description:
          "Default WooCommerce themes are bloated. Every extra second of load time can reduce conversions by 7% — and most stores load in 4+ seconds.",
      },
      {
        title: "Checkout abandonment",
        description:
          "Complex or generic checkout flows cause 70% of shoppers to abandon their cart. Custom checkout UX tailored to your products makes the difference.",
      },
      {
        title: "Payment gateway integration",
        description:
          "Connecting Stripe, PayPal, local payment methods, subscriptions, and split payments requires custom plugin work that theme settings can't handle.",
      },
      {
        title: "Scaling with traffic",
        description:
          "WooCommerce on shared hosting falls over during sales events. Proper caching, CDN, and database optimization are essential for growth.",
      },
    ],
    bestPractices: [
      {
        tip: "Optimize product images with WebP and lazy loading",
        detail:
          "Compress product images to WebP format and lazy-load below-the-fold images to cut page weight by 60%+.",
      },
      {
        tip: "Simplify the checkout to one page",
        detail:
          "Remove unnecessary fields, enable guest checkout, and integrate express payment (Apple Pay, Google Pay) to reduce abandonment.",
      },
      {
        tip: "Use object caching for database queries",
        detail:
          "Redis or Memcached object caching can reduce WooCommerce database queries by 80%, dramatically improving response times.",
      },
    ],
    usefulLinks: [
      {
        title: "WooCommerce Documentation",
        url: "https://woocommerce.com/documentation/",
        type: "docs",
      },
      {
        title: "WooCommerce Developer Blog",
        url: "https://developer.woocommerce.com/blog/",
        type: "community",
      },
      {
        title: "Stripe for WooCommerce",
        url: "https://woocommerce.com/products/stripe/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does a custom WooCommerce store cost?",
        answer:
          "Custom WooCommerce stores typically range from $8,000 to $40,000+ depending on product catalog size, custom features (subscriptions, configurators), and third-party integrations. We scope every project individually.",
      },
      {
        question: "Can you migrate my Shopify store to WooCommerce?",
        answer:
          "Yes. We handle full migrations from Shopify, Magento, BigCommerce, and other platforms — including products, orders, customers, and SEO redirects.",
      },
      {
        question: "WooCommerce vs Shopify — which is better?",
        answer:
          "Shopify is simpler to start with but charges transaction fees and limits customization. WooCommerce gives you full control, no transaction fees, and infinite flexibility — but requires proper development to get right. We make WooCommerce work like it should.",
      },
      {
        question: "Do you build WooCommerce plugins?",
        answer:
          "Yes. We build custom WooCommerce plugins for specific business logic — custom shipping calculators, product configurators, B2B pricing engines, and more.",
      },
    ],
  },
  {
    slug: "payload",
    name: "Payload CMS",
    category: "cms",
    pageType: "cms",
    targetAudience: "both",
    tagline: "The TypeScript-first headless CMS",
    description:
      "Payload is an open-source headless CMS and app framework built entirely in TypeScript. We build Payload-powered projects — from content-heavy marketing sites to full SaaS backends with custom admin panels, access control, and API-first content delivery.",
    accentColor: "blue",
    visualizationKey: "payload",
    logo: null,
    lucideIcon: "Rocket",
    features: [
      {
        icon: "Code2",
        title: "TypeScript config-as-code",
        description:
          "Your entire CMS schema lives in TypeScript config files — version-controlled, type-safe, and refactor-friendly.",
      },
      {
        icon: "Server",
        title: "Next.js native",
        description:
          "Payload v3 runs inside Next.js as a plugin — one deployment, one codebase, zero separate CMS servers.",
      },
      {
        icon: "Shield",
        title: "Field-level access control",
        description:
          "Row, field, and collection-level access policies in code — RBAC, tenant isolation, and custom auth flows without plugins.",
      },
      {
        icon: "Layout",
        title: "Custom admin UI",
        description:
          "The admin panel is React — swap fields, add custom views, build dashboards without fighting a plugin system.",
      },
      {
        icon: "Blocks",
        title: "Block-based content",
        description:
          "Reusable layout blocks with typed fields that editors mix and match — structured content with visual flexibility.",
      },
      {
        icon: "Globe",
        title: "REST & GraphQL APIs",
        description:
          "Auto-generated REST and GraphQL endpoints for every collection — consume content from any frontend or service.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "typescript" }, { slug: "react" }],
    overview:
      "Payload CMS is an open-source, TypeScript-first headless CMS that's rapidly becoming the go-to choice for developers who want full control. Unlike traditional CMS platforms, Payload's entire schema is defined in code — collections, fields, hooks, access control, and admin UI customizations are all TypeScript config. Version 3 runs natively inside Next.js, so your CMS and frontend deploy as a single app. It's self-hosted by default (no vendor lock-in), supports Postgres and MongoDB, and gives you REST + GraphQL APIs out of the box. We use Payload for projects that need a real developer experience without sacrificing editor-friendly admin panels.",
    challenges: [
      {
        title: "Younger ecosystem",
        description:
          "Payload's plugin ecosystem is smaller than WordPress or Strapi. Custom functionality often means writing code rather than installing community plugins.",
      },
      {
        title: "Self-hosted complexity",
        description:
          "Unlike hosted CMS platforms, Payload requires you to manage your own infrastructure — server, database, and deployment pipeline.",
      },
      {
        title: "Migration from other CMS",
        description:
          "Moving content from WordPress, Contentful, or Strapi to Payload requires custom migration scripts since schema definitions are fundamentally different.",
      },
      {
        title: "Learning curve for non-developers",
        description:
          "Payload's config-as-code approach is powerful for developers but means non-technical team members need developer support for schema changes.",
      },
    ],
    bestPractices: [
      {
        tip: "Co-locate Payload config with your Next.js app",
        detail:
          "With Payload v3, keep your CMS config alongside your Next.js pages — single repo, single deploy, shared TypeScript types.",
      },
      {
        tip: "Use hooks for business logic instead of external services",
        detail:
          "Payload's beforeChange/afterChange hooks are the right place for validation, transformation, and side effects — keep logic close to your data model.",
      },
      {
        tip: "Define reusable field groups",
        detail:
          "Create shared field configs (SEO fields, media fields, link groups) and compose them across collections to keep your schema DRY.",
      },
      {
        tip: "Set up access control early",
        detail:
          "Define RBAC policies from day one. Payload's access functions receive the authenticated user — build tenant isolation, role gates, and field-level permissions before content grows.",
      },
    ],
    usefulLinks: [
      {
        title: "Payload Documentation",
        url: "https://payloadcms.com/docs",
        type: "docs",
      },
      {
        title: "Payload GitHub",
        url: "https://github.com/payloadcms/payload",
        type: "community",
      },
      {
        title: "Payload Templates",
        url: "https://payloadcms.com/templates",
        type: "tutorial",
      },
      {
        title: "Payload Discord",
        url: "https://discord.com/invite/payload",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does a Payload CMS project cost?",
        answer:
          "Payload is free and open-source. Project costs depend on complexity — a content site with custom collections typically ranges from $8,000 to $30,000. The CMS itself has zero licensing fees.",
      },
      {
        question: "Payload vs Strapi — which should I choose?",
        answer:
          "Both are open-source headless CMS platforms. Payload is TypeScript-native with config-as-code, runs inside Next.js, and gives you more control. Strapi has a larger plugin ecosystem and a GUI-based schema builder. We recommend Payload for TypeScript teams that want code-first control.",
      },
      {
        question: "Can Payload replace WordPress?",
        answer:
          "For most use cases, yes. Payload handles structured content, media, access control, and APIs better than WordPress. The trade-off is that Payload requires developer involvement for schema changes, whereas WordPress editors can install plugins themselves.",
      },
      {
        question: "Does Payload support e-commerce?",
        answer:
          "Yes. Payload has an official e-commerce template with products, orders, and Stripe integration. For complex stores, we build custom commerce logic on top of Payload's collections and hooks.",
      },
    ],
    quickstart:
      "npx create-payload-app@latest my-project\n\n# Choose your template (blank, website, e-commerce)\n# Choose your database (Postgres or MongoDB)\n# cd my-project && npm run dev",
    quickstartLang: "bash",
    docsUrl: "https://payloadcms.com/docs",
  },
  {
    slug: "ghost",
    name: "Ghost",
    category: "cms",
    pageType: "cms",
    targetAudience: "businesses",
    tagline: "Professional publishing for creators and businesses",
    description:
      "Ghost is an open-source publishing platform built for content creators, bloggers, and media companies. We build custom Ghost themes, integrate memberships and newsletters, and set up headless Ghost with modern frontends.",
    accentColor: "blue",
    visualizationKey: "ghost",
    logo: null,
    lucideIcon: "Newspaper",
    features: [
      {
        icon: "FileText",
        title: "Beautiful editor",
        description:
          "A distraction-free writing experience with rich embeds, markdown shortcuts, and dynamic cards for images, galleries, and code blocks.",
      },
      {
        icon: "Users",
        title: "Built-in memberships",
        description:
          "Native member signups, paid subscriptions via Stripe, and tiered access — no plugins or third-party tools required.",
      },
      {
        icon: "Mail",
        title: "Newsletter delivery",
        description:
          "Send posts as emails directly from Ghost — segment by membership tier, track opens, and grow your audience in one place.",
      },
      {
        icon: "Globe",
        title: "Content API",
        description:
          "Ghost's Content and Admin APIs let you use it as a headless CMS — power Next.js, Astro, or any frontend with Ghost's content.",
      },
      {
        icon: "BarChart2",
        title: "Audience analytics",
        description:
          "Built-in analytics for signups, email engagement, and revenue — understand what content converts readers to paying members.",
      },
      {
        icon: "Zap",
        title: "Blazing fast",
        description:
          "Ghost is built on Node.js with server-side rendering — pages load in milliseconds with zero bloat.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "nextjs" }],
    overview:
      "Ghost is an open-source publishing platform purpose-built for professional content creators, bloggers, and media businesses. Unlike WordPress, Ghost was designed from the ground up for modern publishing — with a clean editor, built-in memberships, newsletter delivery, and a headless Content API. It handles the full creator workflow: write content, grow your audience, monetize with paid subscriptions, and send newsletters — all in one platform. We build custom Ghost themes, set up headless Ghost + Next.js frontends, and integrate Ghost with your existing tools and workflows.",
    challenges: [
      {
        title: "Limited plugin ecosystem",
        description:
          "Ghost doesn't have a plugin system like WordPress. Custom functionality requires theme modifications or integrations via the API and webhooks.",
      },
      {
        title: "Less flexible for non-blog content",
        description:
          "Ghost excels at blogs and publications but isn't designed for complex page layouts, product catalogs, or app-like content structures.",
      },
      {
        title: "Theme customization requires Handlebars",
        description:
          "Ghost's default theme engine uses Handlebars templates. For teams used to React or Vue, going headless with the Content API is often a better path.",
      },
      {
        title: "Self-hosting resource requirements",
        description:
          "Self-hosted Ghost requires a Node.js server, MySQL database, and proper mail configuration — more involved than static hosting.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Ghost as a headless CMS for custom frontends",
        detail:
          "Ghost's Content API is excellent — use it with Next.js or Astro for full design control while keeping Ghost's editor and membership features.",
      },
      {
        tip: "Set up membership tiers early",
        detail:
          "Define free and paid tiers before launching. Ghost's Stripe integration handles subscriptions natively — no WooCommerce or MemberPress needed.",
      },
      {
        tip: "Leverage Ghost's email newsletter",
        detail:
          "Use Ghost's built-in email delivery instead of a separate Mailchimp/ConvertKit setup — fewer tools, better integration, and member segments based on subscription tier.",
      },
      {
        tip: "Optimize images with Ghost's built-in processing",
        detail:
          "Ghost automatically generates responsive image sizes. Use the srcset helpers in your theme for optimal loading across devices.",
      },
    ],
    usefulLinks: [
      {
        title: "Ghost Documentation",
        url: "https://ghost.org/docs/",
        type: "docs",
      },
      {
        title: "Ghost Content API",
        url: "https://ghost.org/docs/content-api/",
        type: "docs",
      },
      {
        title: "Ghost Tutorials",
        url: "https://ghost.org/tutorials/",
        type: "tutorial",
      },
      {
        title: "Ghost GitHub",
        url: "https://github.com/TryGhost/Ghost",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Ghost cost?",
        answer:
          "Ghost is free and open-source for self-hosting. Ghost(Pro) managed hosting starts at $9/month. Custom theme development and headless setups typically range from $5,000 to $20,000.",
      },
      {
        question: "Ghost vs WordPress for blogging — which is better?",
        answer:
          "Ghost is purpose-built for publishing — faster out of the box, built-in memberships, and native newsletters. WordPress is more flexible for non-blog content but requires plugins for everything Ghost does natively. For pure publishing, Ghost wins.",
      },
      {
        question: "Can Ghost handle e-commerce?",
        answer:
          "Ghost handles digital product sales and paid memberships natively via Stripe. For physical products, you'd integrate with Shopify or Snipcart. Ghost isn't a full e-commerce platform.",
      },
      {
        question: "Can you migrate my WordPress blog to Ghost?",
        answer:
          "Yes. Ghost has a built-in WordPress importer. We handle the full migration — content, images, redirects, and custom theme development to match or improve your existing design.",
      },
    ],
    quickstart:
      "npm install ghost-cli@latest -g\nghost install local\n\n# Ghost is now running at http://localhost:2368\n# Admin panel at http://localhost:2368/ghost",
    quickstartLang: "bash",
    docsUrl: "https://ghost.org/docs/",
  },
  {
    slug: "strapi",
    name: "Strapi",
    category: "cms",
    pageType: "cms",
    targetAudience: "both",
    tagline: "The open-source headless CMS for modern apps",
    description:
      "Strapi is an open-source headless CMS that lets you build APIs in minutes. We use Strapi for content-driven apps — custom content types, role-based access, and REST or GraphQL APIs powering React, Next.js, and mobile frontends.",
    accentColor: "indigo",
    visualizationKey: "strapi",
    logo: null,
    lucideIcon: "Layers",
    features: [
      {
        icon: "Layout",
        title: "Visual content-type builder",
        description:
          "Define content schemas visually in the admin panel — fields, relations, components, and dynamic zones without writing code.",
      },
      {
        icon: "Globe",
        title: "REST & GraphQL out of the box",
        description:
          "Every content type gets auto-generated REST and GraphQL endpoints — no boilerplate, immediate API access.",
      },
      {
        icon: "Shield",
        title: "Role-based access control",
        description:
          "Granular permissions per role, per content type, per field — manage editors, authors, and API consumers with fine-grained policies.",
      },
      {
        icon: "Puzzle",
        title: "Plugin ecosystem",
        description:
          "SEO, i18n, email, upload, and dozens of community plugins — extend Strapi without building from scratch.",
      },
      {
        icon: "Blocks",
        title: "Dynamic zones",
        description:
          "Editors compose pages from reusable component blocks — flexible layouts without rigid templates.",
      },
      {
        icon: "Database",
        title: "Multi-database support",
        description:
          "Postgres, MySQL, MariaDB, or SQLite — choose your database and Strapi handles the query layer.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "react" }, { slug: "graphql" }],
    overview:
      "Strapi is the leading open-source headless CMS with over 60,000 GitHub stars. It gives content teams a user-friendly admin panel for managing content while developers get auto-generated REST and GraphQL APIs. Strapi v5 brings a refined content-type builder, better TypeScript support, and improved plugin APIs. Self-hosted by default, it runs on Node.js with your choice of SQL database. We use Strapi when projects need a visual admin experience for non-technical editors combined with a developer-friendly API layer for modern frontends.",
    challenges: [
      {
        title: "Performance at scale",
        description:
          "Strapi's query layer can become slow with deeply nested relations and large datasets. Careful query optimization and caching are essential for high-traffic projects.",
      },
      {
        title: "Upgrade path between major versions",
        description:
          "Strapi v4 to v5 migrations require schema adjustments and plugin updates. Major version upgrades need careful planning and testing.",
      },
      {
        title: "Custom plugin development",
        description:
          "Building Strapi plugins requires understanding its internal APIs, lifecycle hooks, and admin panel extension system — steeper learning curve than simple REST endpoints.",
      },
      {
        title: "Self-hosting ops burden",
        description:
          "Unlike Contentful or Sanity, Strapi requires you to manage hosting, backups, and scaling. Strapi Cloud is available but adds cost.",
      },
    ],
    bestPractices: [
      {
        tip: "Use components and dynamic zones for reusable content",
        detail:
          "Define shared content blocks (hero, CTA, feature grid) as Strapi components and let editors assemble pages from them via dynamic zones.",
      },
      {
        tip: "Limit population depth in API queries",
        detail:
          "Strapi v5 uses a populate parameter. Avoid deep nested population — flatten your data model or use custom controllers for complex queries.",
      },
      {
        tip: "Version your Strapi schema in Git",
        detail:
          "Content-type JSON schemas live in the filesystem. Commit them to Git so schema changes are tracked, reviewable, and deployable.",
      },
      {
        tip: "Set up Strapi Cloud or proper CI/CD early",
        detail:
          "Automate deployments with GitHub Actions or Strapi Cloud. Never edit content types directly in production — use staging environments.",
      },
    ],
    usefulLinks: [
      {
        title: "Strapi Documentation",
        url: "https://docs.strapi.io",
        type: "docs",
      },
      {
        title: "Strapi GitHub",
        url: "https://github.com/strapi/strapi",
        type: "community",
      },
      {
        title: "Strapi Tutorials",
        url: "https://strapi.io/blog/categories/tutorials",
        type: "tutorial",
      },
      {
        title: "Strapi Marketplace",
        url: "https://market.strapi.io",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does a Strapi project cost?",
        answer:
          "Strapi is free and open-source. Strapi Cloud starts at $29/month. Custom Strapi development typically ranges from $6,000 to $25,000 depending on content model complexity, custom plugins, and frontend integration.",
      },
      {
        question: "Strapi vs Payload — which should I choose?",
        answer:
          "Strapi has a visual schema builder and larger plugin ecosystem — great for teams with non-technical admins. Payload is TypeScript-native with config-as-code — ideal for developer-led teams. We recommend Strapi when editors need to modify content types themselves.",
      },
      {
        question: "Can Strapi handle a large content site?",
        answer:
          "Yes, with proper optimization. We use Redis caching, CDN for media, paginated API queries, and database indexing to serve Strapi sites handling millions of monthly requests.",
      },
      {
        question: "Does Strapi support multi-language content?",
        answer:
          "Yes. Strapi has built-in i18n (internationalization) support — define locales, translate content per field, and query by language. It's included in the core, not a plugin.",
      },
    ],
    quickstart:
      "npx create-strapi@latest my-project\n\n# Follow the prompts (TypeScript, database choice)\n# cd my-project && npm run develop\n# Admin panel at http://localhost:1337/admin",
    quickstartLang: "bash",
    docsUrl: "https://docs.strapi.io",
  },
  {
    slug: "sanity",
    name: "Sanity",
    category: "cms",
    pageType: "cms",
    targetAudience: "both",
    tagline: "Structured content for composable experiences",
    description:
      "Sanity is a composable content platform with a real-time editing studio and a powerful query language (GROQ). We build Sanity-powered projects — custom studio configurations, structured content models, and integrations with Next.js, Remix, and e-commerce platforms.",
    accentColor: "red",
    visualizationKey: "sanity",
    logo: null,
    lucideIcon: "Boxes",
    features: [
      {
        icon: "Layout",
        title: "Sanity Studio",
        description:
          "A fully customizable React-based editing environment — custom input components, live preview, and workspace plugins.",
      },
      {
        icon: "Search",
        title: "GROQ query language",
        description:
          "Sanity's own query language for filtering, joining, and projecting content — more expressive than REST parameters, easier than GraphQL.",
      },
      {
        icon: "Zap",
        title: "Real-time collaboration",
        description:
          "Multiple editors work on the same document simultaneously — changes sync in real-time like Google Docs.",
      },
      {
        icon: "Eye",
        title: "Live preview",
        description:
          "See content changes reflected on your frontend instantly — draft content previewed in context before publishing.",
      },
      {
        icon: "GitBranch",
        title: "Content versioning",
        description:
          "Full revision history with the ability to compare, restore, and schedule content changes across documents.",
      },
      {
        icon: "Cloud",
        title: "Hosted content lake",
        description:
          "Sanity hosts your content in a globally distributed content lake — no database management, instant API access.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "typescript" }],
    overview:
      "Sanity is a composable content platform trusted by companies like Figma, Shopify, and National Geographic. Unlike traditional CMS platforms, Sanity separates content from presentation completely — your content lives in Sanity's hosted content lake, and you query it with GROQ or GraphQL from any frontend. Sanity Studio is an open-source React app that you customize and deploy alongside your site. We use Sanity for projects that need structured content modeling, real-time collaboration, and the flexibility to power multiple frontends (web, mobile, kiosk) from a single content source.",
    challenges: [
      {
        title: "GROQ learning curve",
        description:
          "Sanity's query language is powerful but unfamiliar to most developers. Complex projections and joins take time to master compared to SQL or REST filtering.",
      },
      {
        title: "Pricing at scale",
        description:
          "Sanity's free tier is generous, but API usage charges can grow quickly for high-traffic sites with many real-time queries. CDN caching and static generation help control costs.",
      },
      {
        title: "Studio customization complexity",
        description:
          "Building custom input components, validation rules, and workflow plugins for Sanity Studio requires deep React knowledge and understanding of Sanity's plugin API.",
      },
      {
        title: "Vendor lock-in",
        description:
          "Content lives in Sanity's hosted content lake. Unlike self-hosted CMS options, migrating away requires exporting all content and media assets.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Sanity's Portable Text for rich content",
        detail:
          "Portable Text stores rich text as structured data, not HTML. This lets you render the same content differently across web, mobile, and email.",
      },
      {
        tip: "Set up live preview with Next.js Draft Mode",
        detail:
          "Connect Sanity's real-time listener to Next.js Draft Mode so editors see changes instantly without deploying. Use Sanity's Visual Editing for in-context editing.",
      },
      {
        tip: "Define a content model before building the Studio",
        detail:
          "Plan your document types, references, and content structure before writing schema code. Changing models after content is created requires migrations.",
      },
      {
        tip: "Cache GROQ queries aggressively",
        detail:
          "Use ISR or static generation for public pages. Reserve real-time GROQ queries for preview mode and authenticated experiences to keep API costs low.",
      },
    ],
    usefulLinks: [
      {
        title: "Sanity Documentation",
        url: "https://www.sanity.io/docs",
        type: "docs",
      },
      {
        title: "Sanity GROQ Reference",
        url: "https://www.sanity.io/docs/groq",
        type: "docs",
      },
      {
        title: "Sanity Exchange (Plugins)",
        url: "https://www.sanity.io/exchange",
        type: "tool",
      },
      {
        title: "Sanity GitHub",
        url: "https://github.com/sanity-io/sanity",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Sanity cost?",
        answer:
          "Sanity has a generous free tier (3 users, 500K API requests/month). Growth plans start at $15/user/month. Custom development with Sanity typically ranges from $8,000 to $35,000 depending on Studio customization and frontend complexity.",
      },
      {
        question: "Sanity vs Contentful — which is better?",
        answer:
          "Both are hosted headless CMS platforms. Sanity offers a fully customizable open-source Studio, GROQ queries, and real-time collaboration. Contentful has a more rigid but simpler admin UI and a larger enterprise track record. We recommend Sanity for teams that need custom editing experiences.",
      },
      {
        question: "Can Sanity power an e-commerce site?",
        answer:
          "Yes. Sanity integrates with Shopify, Medusa, and custom commerce backends. Product content, editorial pages, and merchandising live in Sanity while commerce logic (cart, checkout, inventory) stays in the commerce platform.",
      },
      {
        question: "Is Sanity good for large teams?",
        answer:
          "Yes. Real-time collaboration, granular roles, and custom workflows make Sanity well-suited for editorial teams of any size. The custom Studio means you can build exactly the editing experience your team needs.",
      },
    ],
    quickstart:
      "npm create sanity@latest -- --project-id <ID> --dataset production\n\n# Follow the prompts to set up your Studio\n# cd my-studio && npm run dev\n# Studio runs at http://localhost:3333",
    quickstartLang: "bash",
    docsUrl: "https://www.sanity.io/docs",
  },
  {
    slug: "contentful",
    name: "Contentful",
    category: "cms",
    pageType: "cms",
    targetAudience: "businesses",
    tagline: "Enterprise headless CMS for omnichannel content",
    description:
      "Contentful is a cloud-native headless CMS used by enterprises to manage content across websites, apps, and digital products. We integrate Contentful with modern frontends, build custom apps for the Contentful platform, and optimize content delivery pipelines.",
    accentColor: "yellow",
    visualizationKey: "contentful",
    logo: null,
    lucideIcon: "LayoutGrid",
    features: [
      {
        icon: "Cloud",
        title: "Fully managed cloud platform",
        description:
          "No servers to manage — Contentful handles hosting, scaling, CDN, and 99.95% uptime SLA for enterprise teams.",
      },
      {
        icon: "Globe",
        title: "Content Delivery & Preview APIs",
        description:
          "Separate APIs for published content (CDN-cached) and draft preview — fast delivery with editorial flexibility.",
      },
      {
        icon: "Puzzle",
        title: "App Framework",
        description:
          "Build custom apps that extend the Contentful UI — custom field editors, sidebar widgets, and workflow automations.",
      },
      {
        icon: "Layout",
        title: "Composable content models",
        description:
          "Content types with references, rich text, and embedded entries — structure content once, publish everywhere.",
      },
      {
        icon: "Languages",
        title: "Native localization",
        description:
          "Per-field localization across unlimited locales — manage translations within the same content entry.",
      },
      {
        icon: "Workflow",
        title: "Workflows and scheduling",
        description:
          "Editorial workflows with approval chains, scheduled publishing, and environment-based staging for content releases.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "react" }, { slug: "graphql" }],
    overview:
      "Contentful is a composable content platform trusted by 30% of the Fortune 500, including Spotify, Vodafone, and Staples. It provides a cloud-hosted content infrastructure with a web-based editor, multiple APIs (REST, GraphQL, Images), and a platform for custom apps. Contentful excels at multi-channel content delivery — the same structured content powers your website, mobile app, in-store kiosk, and partner feeds. We integrate Contentful with Next.js, Gatsby, and custom frontends, build Contentful Apps for custom editorial workflows, and optimize content delivery for performance and cost.",
    challenges: [
      {
        title: "Pricing for growing teams",
        description:
          "Contentful's pricing scales with users, content types, and API calls. Costs can escalate quickly for larger teams — careful content modeling helps control usage.",
      },
      {
        title: "Rich text rendering complexity",
        description:
          "Contentful's Rich Text field stores content as a JSON AST. Rendering it in your frontend requires a custom renderer that handles embedded entries and assets.",
      },
      {
        title: "Rate limiting on management API",
        description:
          "The Content Management API has strict rate limits. Bulk imports, migrations, and CI/CD pipelines need to handle throttling gracefully.",
      },
      {
        title: "Content modeling rigidity",
        description:
          "Once content types are in use, changing field types or structure requires migrations. Planning your content model upfront prevents painful refactors.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Contentful Compose for page-level editing",
        detail:
          "Contentful Compose gives editors a page-builder experience on top of structured content types — visual composition without sacrificing content model integrity.",
      },
      {
        tip: "Leverage environments for staging",
        detail:
          "Use Contentful environments (like Git branches for content) to test content model changes and content before merging to master.",
      },
      {
        tip: "Cache Content Delivery API responses",
        detail:
          "Contentful's CDN is fast, but static generation (ISR) or edge caching reduces API calls and improves TTFB for high-traffic pages.",
      },
      {
        tip: "Automate migrations with the CLI",
        detail:
          "Use Contentful's migration CLI to script content model changes — version-controlled, repeatable, and safe for production deployments.",
      },
    ],
    usefulLinks: [
      {
        title: "Contentful Documentation",
        url: "https://www.contentful.com/developers/docs/",
        type: "docs",
      },
      {
        title: "Contentful App Framework",
        url: "https://www.contentful.com/developers/docs/extensibility/app-framework/",
        type: "docs",
      },
      {
        title: "Contentful Blog",
        url: "https://www.contentful.com/blog/",
        type: "tutorial",
      },
      {
        title: "Contentful Community",
        url: "https://www.contentful.com/developers/community/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Contentful cost?",
        answer:
          "Contentful's free Community tier includes 5 users and 25K API calls/month. Team plans start at $300/month. Enterprise pricing is custom. Development costs for Contentful integrations typically range from $8,000 to $40,000.",
      },
      {
        question: "Contentful vs Sanity — which should I choose?",
        answer:
          "Contentful is a mature enterprise platform with established workflows and a simpler editing experience. Sanity offers deeper customization with its open-source Studio and GROQ queries. We recommend Contentful for enterprise teams that value stability and support, Sanity for teams that need custom editing UX.",
      },
      {
        question: "Can Contentful handle multiple websites?",
        answer:
          "Yes. Contentful's spaces and environments model supports multi-site architectures. A single content model can serve multiple frontends with different designs and locales.",
      },
      {
        question: "Is Contentful good for large content teams?",
        answer:
          "Yes. Contentful's workflows, role-based access, and approval chains are built for large editorial teams. The structured approach scales better than page-builder CMS platforms.",
      },
    ],
    docsUrl: "https://www.contentful.com/developers/docs/",
  },
  {
    slug: "directus",
    name: "Directus",
    category: "cms",
    pageType: "cms",
    targetAudience: "both",
    tagline: "Instant APIs on top of any SQL database",
    description:
      "Directus wraps any SQL database with REST and GraphQL APIs and a no-code admin app. We use Directus for projects that need a flexible data platform — content management, internal tools, and custom dashboards powered by your existing database.",
    accentColor: "violet",
    visualizationKey: "directus",
    logo: null,
    lucideIcon: "Database",
    features: [
      {
        icon: "Database",
        title: "Database-first approach",
        description:
          "Directus wraps your existing SQL database — Postgres, MySQL, SQLite, or others — with zero schema duplication.",
      },
      {
        icon: "Globe",
        title: "Auto-generated REST & GraphQL",
        description:
          "Every table gets instant REST and GraphQL APIs with filtering, sorting, pagination, and relational queries.",
      },
      {
        icon: "Layout",
        title: "No-code admin app",
        description:
          "A beautiful admin panel for managing data — custom layouts, file management, and user-friendly interfaces for non-technical teams.",
      },
      {
        icon: "Workflow",
        title: "Flows automation",
        description:
          "Visual workflow builder for automating tasks — trigger on data changes, schedule jobs, and chain operations without code.",
      },
      {
        icon: "Shield",
        title: "Granular permissions",
        description:
          "Role-based access with field-level, collection-level, and item-level permissions — control exactly who sees and edits what.",
      },
      {
        icon: "Eye",
        title: "Custom dashboards",
        description:
          "Build analytics dashboards directly in Directus — charts, metrics, and data visualizations without a separate BI tool.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "typescript" }, { slug: "vue" }],
    overview:
      "Directus is an open-source data platform that wraps any SQL database with instant REST and GraphQL APIs and a no-code admin app. Unlike traditional CMS platforms that force a content model, Directus adapts to your existing database schema — add it to a new or existing Postgres, MySQL, or SQLite database and get APIs and an admin UI immediately. With over 30,000 GitHub stars, Directus is used as a headless CMS, backend-as-a-service, and internal tool builder. We use Directus when teams need a flexible data platform that goes beyond content management.",
    challenges: [
      {
        title: "Complex relational data UI",
        description:
          "While Directus handles relations well, deeply nested relational data can be hard for non-technical users to navigate in the admin panel without custom layout configuration.",
      },
      {
        title: "Performance with large datasets",
        description:
          "Auto-generated queries on tables with millions of rows need careful indexing. Complex relational queries may require custom endpoints or database views.",
      },
      {
        title: "Extension development",
        description:
          "Building custom Directus extensions (interfaces, displays, modules) requires understanding the Vue.js-based extension SDK and Directus's internal architecture.",
      },
      {
        title: "Self-hosting ops",
        description:
          "Running Directus in production requires Docker or Node.js hosting, database management, file storage (S3/local), and proper backup strategies.",
      },
    ],
    bestPractices: [
      {
        tip: "Design your database schema before adding Directus",
        detail:
          "Since Directus mirrors your SQL schema, a well-designed database means a better admin experience. Plan tables, relations, and indexes before connecting Directus.",
      },
      {
        tip: "Use Directus Flows for automation",
        detail:
          "Replace cron jobs and custom scripts with Directus Flows — trigger on data changes, send emails, call webhooks, and chain operations visually.",
      },
      {
        tip: "Leverage database views for complex queries",
        detail:
          "Create SQL views for complex aggregations or joins and expose them through Directus as read-only collections — better performance than deep API population.",
      },
      {
        tip: "Set up Directus Cloud or Docker for production",
        detail:
          "Use Directus Cloud for managed hosting or deploy via Docker with environment variables for configuration. Never run development mode in production.",
      },
    ],
    usefulLinks: [
      {
        title: "Directus Documentation",
        url: "https://docs.directus.io",
        type: "docs",
      },
      {
        title: "Directus GitHub",
        url: "https://github.com/directus/directus",
        type: "community",
      },
      {
        title: "Directus TV (Tutorials)",
        url: "https://directus.io/tv",
        type: "tutorial",
      },
      {
        title: "Directus Marketplace",
        url: "https://directus.io/extensions",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Directus cost?",
        answer:
          "Directus is free and open-source for self-hosting. Directus Cloud starts at $15/month. Custom Directus projects typically range from $5,000 to $25,000 depending on data model complexity and custom extensions.",
      },
      {
        question: "Directus vs Strapi — which should I choose?",
        answer:
          "Strapi is a traditional headless CMS — great for content management. Directus is a data platform — it wraps any SQL database and works for content, internal tools, and data management. Choose Directus when you need to work with existing databases or build beyond just content.",
      },
      {
        question: "Can Directus work with my existing database?",
        answer:
          "Yes — that's Directus's superpower. Point it at any existing Postgres, MySQL, MariaDB, SQLite, or MS SQL database and it instantly generates APIs and an admin panel from your schema.",
      },
      {
        question: "Is Directus good for internal tools?",
        answer:
          "Absolutely. Directus's admin app, custom dashboards, Flows automation, and granular permissions make it an excellent low-code platform for internal tools — inventory management, CRM, project tracking, and more.",
      },
    ],
    quickstart:
      "npx create-directus-project@latest my-project\n\n# Choose your database (SQLite for local, Postgres for production)\n# cd my-project && npx directus start\n# Admin panel at http://localhost:8055",
    quickstartLang: "bash",
    docsUrl: "https://docs.directus.io",
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
        description:
          "Define document structure with types, defaults, validators, and indexes — your data contract in code.",
      },
      {
        icon: "Workflow",
        title: "Middleware hooks",
        description:
          "Pre/post hooks on save, validate, and remove — audit logs, hashing, and side effects without cluttering business logic.",
      },
      {
        icon: "Code2",
        title: "TypeScript support",
        description:
          "Typed document interfaces and query helpers — full IntelliSense from schema definition to query result.",
      },
      {
        icon: "Database",
        title: "Aggregation pipeline",
        description:
          "Build complex data transformations with MongoDB's aggregation framework — group, filter, join, and reshape documents.",
      },
      {
        icon: "Puzzle",
        title: "Population",
        description:
          "Reference documents across collections and auto-populate them in queries — relational-style joins in MongoDB.",
      },
      {
        icon: "Layers",
        title: "Discriminators",
        description:
          "Single-collection inheritance for polymorphic documents — share a base schema with type-specific fields.",
      },
    ],
    subTechs: [{ slug: "mongodb" }, { slug: "nodejs" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Mongoose is the most popular ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema-based validation, middleware hooks, virtuals, population (joins), and a fluent query API that adds structure to MongoDB's flexible document model.\n\nFor TypeScript projects, Mongoose offers built-in type inference from schemas, letting you define your data model once and get autocomplete across your entire codebase. It's the right choice when you want MongoDB's flexibility with the guardrails of defined schemas and middleware.",
    challenges: [
      {
        title: "TypeScript type inference complexity",
        description:
          "Mongoose's TypeScript support has improved significantly, but complex schemas with discriminators, virtuals, and populated paths can require manual type annotations.",
      },
      {
        title: "N+1 query patterns with population",
        description:
          "Mongoose's populate() executes separate queries for each referenced collection. For complex graphs, lean aggregation pipelines or denormalization perform better.",
      },
      {
        title: "Schema versioning and migrations",
        description:
          "MongoDB doesn't enforce schemas at the database level, so evolving Mongoose schemas requires careful migration scripts to update existing documents.",
      },
    ],
    bestPractices: [
      {
        tip: "Use lean() for read-only queries",
        detail:
          "Lean queries return plain JavaScript objects instead of Mongoose documents — significantly faster when you don't need middleware or virtuals.",
      },
      {
        tip: "Define indexes in your schema",
        detail:
          "Declare indexes in Mongoose schemas (schema.index()) so they're created automatically — don't rely on ad-hoc database administration.",
      },
      {
        tip: "Use pre/post middleware sparingly",
        detail:
          "Middleware hooks are powerful but can create hidden side effects. Keep middleware focused on cross-cutting concerns like auditing and timestamps.",
      },
    ],
    usefulLinks: [
      {
        title: "Mongoose Documentation",
        url: "https://mongoosejs.com/docs/",
        type: "docs",
      },
      {
        title: "Mongoose Getting Started",
        url: "https://mongoosejs.com/docs/guide.html",
        type: "tutorial",
      },
      {
        title: "Mongoose GitHub",
        url: "https://github.com/Automattic/mongoose",
        type: "community",
      },
      {
        title: "MongoDB Atlas",
        url: "https://www.mongodb.com/atlas",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Mongoose development cost?",
        answer:
          "Mongoose is free and open-source. The underlying MongoDB costs depend on hosting — Atlas has a free tier, with paid plans starting around $57/month. Development with Mongoose typically adds no extra cost over raw MongoDB driver usage.",
      },
      {
        question: "Mongoose vs Prisma — which should I use with MongoDB?",
        answer:
          "Mongoose is purpose-built for MongoDB with deep feature support (middleware, virtuals, discriminators, population). Prisma supports MongoDB but treats it more like a relational database. Use Mongoose when you need MongoDB-specific features; use Prisma when you want a unified ORM across multiple database types.",
      },
      {
        question: "Is Mongoose still relevant with the native MongoDB driver?",
        answer:
          "Yes. The native driver gives you raw access but no schema validation, middleware, or query building. Mongoose adds structure without sacrificing MongoDB's flexibility — most production Node.js + MongoDB projects use Mongoose.",
      },
    ],
    quickstart:
      "npm install mongoose\n\n# Connect in your app\n# import mongoose from 'mongoose'\n# await mongoose.connect('mongodb://localhost:27017/myapp')\n\n# Or with MongoDB Atlas\n# await mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/myapp')",
    quickstartLang: "javascript",
    docsUrl: "https://mongoosejs.com/docs/",
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
        description:
          "Components are copied into your project — no node_modules dependency, full control to customise anything.",
      },
      {
        icon: "Accessibility",
        title: "Accessible by default",
        description:
          "Built on Radix UI primitives — keyboard navigation, screen reader support, and focus management included.",
      },
      {
        icon: "Paintbrush",
        title: "Tailwind themed",
        description:
          "CSS variables and Tailwind utility classes for consistent theming — change your palette in one place.",
      },
      {
        icon: "Moon",
        title: "Dark mode ready",
        description:
          "Light and dark themes via CSS variables — toggle with next-themes and every component adapts automatically.",
      },
      {
        icon: "Puzzle",
        title: "Composable",
        description:
          "Compound component patterns — combine primitives like Dialog, Popover, and Command to build complex UIs.",
      },
      {
        icon: "Layers",
        title: "Registry-based",
        description:
          "Add components via the CLI from the registry — one command to install, update, or extend any component.",
      },
    ],
    subTechs: [{ slug: "tailwind" }, { slug: "react" }, { slug: "nextjs" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "shadcn/ui is a collection of accessible, customizable React components built on Radix UI primitives and styled with Tailwind CSS. Unlike traditional component libraries, shadcn/ui copies components directly into your codebase — you own and control every line of code.\n\nThis approach gives you full customization freedom without fighting library abstractions. Components are accessible by default (via Radix), beautifully styled with Tailwind, and composable — use them as-is or modify them to match your exact design system. The registry system makes adding new components a single CLI command.",
    challenges: [
      {
        title: "Component customization overhead",
        description:
          "Because you own the code, you're also responsible for maintaining it. Updating components requires manually applying changes from upstream rather than bumping a package version.",
      },
      {
        title: "Design system consistency",
        description:
          "Customizing individual components without a clear design system can lead to inconsistency. Define your theme tokens (colors, spacing, border radius) in CSS variables before customizing components.",
      },
      {
        title: "Learning Radix UI primitives",
        description:
          "shadcn components are built on Radix UI. Understanding Radix's composition model, controlled/uncontrolled patterns, and accessibility features helps when customizing deeply.",
      },
    ],
    bestPractices: [
      {
        tip: "Use the CLI to add components",
        detail:
          "npx shadcn@latest add button adds the component with all dependencies — faster and less error-prone than manual copying.",
      },
      {
        tip: "Define your theme in CSS variables",
        detail:
          "shadcn/ui uses CSS custom properties for theming. Define your brand colors, border radius, and font in globals.css for consistent styling across all components.",
      },
      {
        tip: "Compose complex UI from primitives",
        detail:
          "Build complex interfaces by composing shadcn primitives (Card, Dialog, Table, Form) — the components are designed to work together.",
      },
    ],
    usefulLinks: [
      {
        title: "shadcn/ui Documentation",
        url: "https://ui.shadcn.com/docs",
        type: "docs",
      },
      {
        title: "shadcn/ui Components",
        url: "https://ui.shadcn.com/docs/components",
        type: "docs",
      },
      {
        title: "shadcn/ui GitHub",
        url: "https://github.com/shadcn-ui/ui",
        type: "community",
      },
      {
        title: "Radix UI Primitives",
        url: "https://www.radix-ui.com/primitives",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does shadcn/ui cost?",
        answer:
          "shadcn/ui is completely free and open-source (MIT license). The components are copied into your project — there's no paid tier, no premium components, and no vendor lock-in.",
      },
      {
        question: "shadcn/ui vs Material UI — which component library?",
        answer:
          "Material UI is a full component library installed as a dependency with Google's Material Design. shadcn/ui copies accessible primitives into your codebase for full customization with Tailwind CSS. Choose shadcn/ui for custom designs; choose MUI for Material Design adherence.",
      },
      {
        question: "Does shadcn/ui work with Next.js App Router?",
        answer:
          "Yes. shadcn/ui is designed for the React ecosystem and works perfectly with Next.js App Router, including Server Components. Client components that need interactivity use the 'use client' directive automatically.",
      },
    ],
    quickstart:
      "# Initialize shadcn/ui in your project\nnpx shadcn@latest init\n\n# Add components\nnpx shadcn@latest add button\nnpx shadcn@latest add card\nnpx shadcn@latest add dialog\n\n# Add multiple components at once\nnpx shadcn@latest add table form input label",
    quickstartLang: "bash",
    docsUrl: "https://ui.shadcn.com/docs",
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
        description:
          "Algolia or local search built in — instant results as users type, configurable relevance and facets.",
      },
      {
        icon: "Globe",
        title: "Internationalisation",
        description:
          "First-class i18n with locale-based routing, translated sidebars, and per-locale versioning out of the box.",
      },
      {
        icon: "Moon",
        title: "Dark mode & accessibility",
        description:
          "System-aware dark mode toggle and accessible markup — meets WCAG standards without extra configuration.",
      },
      {
        icon: "Layout",
        title: "Sidebar & TOC",
        description:
          "Auto-generated sidebar navigation from file structure and in-page table of contents from headings.",
      },
      {
        icon: "FileText",
        title: "MDX components",
        description:
          "Embed React components in Markdown — tabs, admonitions, code blocks, and interactive examples inline.",
      },
      {
        icon: "Gauge",
        title: "Perfect Lighthouse scores",
        description:
          "Static site generation with optimised assets — 100/100 Lighthouse scores for performance, accessibility, and SEO.",
      },
    ],
    subTechs: [{ slug: "astro" }, { slug: "fumadocs" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Starlight is Astro's official documentation framework — purpose-built for creating beautiful, fast, and accessible documentation sites. It provides full-text search, dark mode, sidebar navigation, table of contents, i18n, and MDX component support out of the box, with perfect Lighthouse scores.\n\nStarlight leverages Astro's content-first architecture, shipping zero JavaScript by default and hydrating interactive components only when needed. It's the recommended choice for developer product documentation, API references, and knowledge bases.",
    challenges: [
      {
        title: "Customization beyond built-in themes",
        description:
          "Starlight provides extensive configuration but deep visual customization requires understanding Astro's component override system. The override mechanism is well-documented but has a learning curve.",
      },
      {
        title: "Large documentation sites",
        description:
          "Sites with thousands of pages may experience longer build times. Astro's incremental builds and content collection caching help, but very large sites should be tested for build performance.",
      },
      {
        title: "Migration from other doc platforms",
        description:
          "Migrating from Docusaurus, GitBook, or VuePress requires converting content and restructuring navigation. The markdown format is standard but frontmatter and config differ.",
      },
    ],
    bestPractices: [
      {
        tip: "Use MDX for interactive documentation",
        detail:
          "Starlight supports MDX — embed React or Astro components in your documentation for interactive examples, code playgrounds, and API explorers.",
      },
      {
        tip: "Configure sidebar groups logically",
        detail:
          "Organize sidebar navigation by user journey (Getting Started, Guides, API Reference, FAQ) rather than internal project structure.",
      },
      {
        tip: "Enable i18n from the start",
        detail:
          "If you plan to support multiple languages, configure Starlight's i18n system early — retrofitting translations is harder than building with i18n from the beginning.",
      },
    ],
    usefulLinks: [
      {
        title: "Starlight Documentation",
        url: "https://starlight.astro.build/",
        type: "docs",
      },
      {
        title: "Starlight Getting Started",
        url: "https://starlight.astro.build/getting-started/",
        type: "tutorial",
      },
      {
        title: "Astro Documentation",
        url: "https://docs.astro.build/",
        type: "docs",
      },
      {
        title: "Astro Discord",
        url: "https://astro.build/chat",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Starlight cost?",
        answer:
          "Starlight is free and open-source (MIT license). Documentation sites can be hosted for free on Vercel, Netlify, Cloudflare Pages, or GitHub Pages. There are no premium features or paid tiers.",
      },
      {
        question: "Starlight vs Docusaurus — which should I use?",
        answer:
          "Starlight ships zero JavaScript by default with perfect Lighthouse scores. Docusaurus has a larger ecosystem and more plugins. Choose Starlight for performance and simplicity; choose Docusaurus if you need specific plugins or have an existing Docusaurus site.",
      },
      {
        question: "Can Starlight handle API documentation?",
        answer:
          "Yes. Starlight supports MDX for custom components, so you can embed API explorers, code examples, and interactive documentation. For OpenAPI specs, community integrations generate pages from your API schema.",
      },
    ],
    quickstart:
      "# Create a new Starlight site\nnpm create astro@latest -- --template starlight\n\n# Or add Starlight to an existing Astro project\nnpx astro add starlight\n\n# Start development\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://starlight.astro.build/",
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
        description:
          "Local and remote caching of task outputs — never rebuild what hasn't changed, even across CI machines.",
      },
      {
        icon: "GitBranch",
        title: "Affected commands",
        description:
          "Only run tasks for projects affected by your changes — CI pipelines that scale with your monorepo.",
      },
      {
        icon: "Puzzle",
        title: "Plugin ecosystem",
        description:
          "First-party plugins for React, Next.js, Node, and more — generators, executors, and lint rules per framework.",
      },
      {
        icon: "Layers",
        title: "Project graph",
        description:
          "Visual dependency graph of every project and library — understand the impact of changes at a glance.",
      },
      {
        icon: "Workflow",
        title: "Generators",
        description:
          "Scaffold new apps, libraries, and components with code generators — enforce team conventions automatically.",
      },
      {
        icon: "Monitor",
        title: "Nx Cloud dashboard",
        description:
          "Distributed task execution, remote cache analytics, and CI insights — see what's slow and why.",
      },
    ],
    subTechs: [{ slug: "turborepo" }, { slug: "nodejs" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Nx is a smart build system with first-class support for many frontend and backend technologies. It provides computation caching, affected-command detection, code generators, and a rich plugin ecosystem that integrates deeply with React, Angular, Node.js, Go, and more.\n\nNx's project graph visualizes dependencies between packages, ensuring build order is correct and only affected projects are tested or deployed. Nx Cloud provides distributed caching and task execution across CI agents, making large monorepos fast even with hundreds of packages.",
    challenges: [
      {
        title: "Configuration complexity",
        description:
          "Nx has more configuration surface than Turborepo — project.json, nx.json, generators, and executors. The power comes with a learning curve, especially for teams new to monorepo tooling.",
      },
      {
        title: "Plugin version compatibility",
        description:
          "Nx plugins (React, Angular, Node, etc.) must be kept in sync with the core Nx version. Version mismatches can cause cryptic build errors — use nx migrate for upgrades.",
      },
      {
        title: "Migration from existing tooling",
        description:
          "Converting an existing project or monorepo to Nx requires restructuring. The nx init command helps but may need manual adjustments for non-standard project layouts.",
      },
    ],
    bestPractices: [
      {
        tip: "Use affected commands in CI",
        detail:
          "nx affected:test and nx affected:build only run tasks for projects changed since the base branch — dramatically reducing CI time for large monorepos.",
      },
      {
        tip: "Visualize with the project graph",
        detail:
          "Run nx graph to see your project dependencies visually — essential for understanding and maintaining package boundaries in large codebases.",
      },
      {
        tip: "Use generators for consistency",
        detail:
          "Nx generators scaffold new libraries, components, and services with consistent structure — enforcing team conventions automatically.",
      },
    ],
    usefulLinks: [
      {
        title: "Nx Documentation",
        url: "https://nx.dev/getting-started/intro",
        type: "docs",
      },
      {
        title: "Nx Tutorial",
        url: "https://nx.dev/getting-started/tutorials",
        type: "tutorial",
      },
      {
        title: "Nx GitHub",
        url: "https://github.com/nrwl/nx",
        type: "community",
      },
      {
        title: "Nx Cloud",
        url: "https://nx.app/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Nx cost?",
        answer:
          "Nx is free and open-source (MIT license). Nx Cloud (distributed caching and CI) has a free tier for open-source projects. Paid plans start at $8/month per contributor for private repos.",
      },
      {
        question: "Nx vs Turborepo — which should I pick?",
        answer:
          "Nx offers more features — generators, executors, plugin ecosystem, and a visual project graph. Turborepo is simpler and focused on caching. Choose Nx for large teams needing scaffolding and governance; choose Turborepo for simpler monorepos that just need fast builds.",
      },
      {
        question: "Can Nx work with non-JavaScript projects?",
        answer:
          "Yes. Nx supports Go, Rust, Java, .NET, and more through community plugins. Its core caching and task orchestration work with any language or build tool.",
      },
    ],
    quickstart:
      "# Create a new Nx workspace\nnpx create-nx-workspace@latest myorg\n\n# Or add Nx to an existing monorepo\nnpx nx@latest init\n\n# Run affected tests\nnpx nx affected:test\n\n# Visualize the project graph\nnpx nx graph",
    quickstartLang: "bash",
    docsUrl: "https://nx.dev/getting-started/intro",
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
        description:
          "Code runs within milliseconds of your users on Cloudflare's global network — latency measured in single digits.",
      },
      {
        icon: "Zap",
        title: "Zero cold starts",
        description:
          "V8 isolates spin up in under 5ms — no container boot time, every request is fast from the first byte.",
      },
      {
        icon: "Database",
        title: "KV, R2, D1 storage",
        description:
          "Key-value store, S3-compatible object storage, and SQLite at the edge — persistent data without external services.",
      },
      {
        icon: "Layers",
        title: "Durable Objects",
        description:
          "Stateful serverless with strong consistency — coordination, WebSockets, and counters at the edge.",
      },
      {
        icon: "Code2",
        title: "Hono & tRPC compatible",
        description:
          "Use Hono for routing and tRPC for type-safe APIs — modern frameworks that run natively on Workers.",
      },
      {
        icon: "Workflow",
        title: "Queues & Cron",
        description:
          "Message queues for async processing and cron triggers for scheduled tasks — background work without servers.",
      },
    ],
    subTechs: [
      { slug: "cloudflare-d1" },
      { slug: "cloudflare-r2" },
      { slug: "drizzle" },
    ],
    overview:
      "Cloudflare Workers runs your code in 300+ data centres worldwide with zero cold starts and sub-millisecond startup latency. Your JavaScript, TypeScript, Rust, or WASM code executes at the edge — closest to your users — with access to KV (key-value), R2 (object storage), D1 (SQLite), Durable Objects (stateful coordination), and Queues from the same runtime. At A Major, we build edge-first APIs, middleware, and full-stack applications on Cloudflare Workers.\n\nThe Workers platform is uniquely powerful for latency-sensitive applications. Unlike traditional serverless (Lambda), Workers have no cold starts and bill per-request at fractions of a cent. Combined with Hono or tRPC for routing, Drizzle for D1 queries, and R2 for file storage, Cloudflare Workers is a complete edge computing platform.",
    challenges: [
      {
        title: "Execution time and memory limits",
        description:
          "Workers have CPU time limits (10ms free, 30s paid) and 128MB memory. Long-running computations need to be split across multiple requests or moved to Durable Objects.",
      },
      {
        title: "Node.js API compatibility gaps",
        description:
          "Workers use the V8 runtime, not Node.js. Some Node.js APIs (fs, net, child_process) aren't available. The nodejs_compat flag helps but doesn't cover everything.",
      },
      {
        title: "Local development fidelity",
        description:
          "Wrangler's local dev mode (Miniflare) simulates the Workers runtime but edge cases around bindings and runtime behavior may differ from production.",
      },
      {
        title: "Stateful patterns require Durable Objects",
        description:
          "Workers are stateless by default. Coordination, counters, rate limiting, and WebSocket state require Durable Objects — a different programming model.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Hono for Workers routing",
        detail:
          "Hono is built for edge runtimes — lightweight, fast, and provides Express-like routing with middleware on Workers.",
      },
      {
        tip: "Use D1 for relational data at the edge",
        detail:
          "Cloudflare D1 runs SQLite in the same data centre as your Worker — eliminates database round-trip latency entirely.",
      },
      {
        tip: "Cache aggressively with the Cache API",
        detail:
          "Workers have access to Cloudflare's Cache API. Cache API responses, KV lookups, and computed results to minimize re-execution.",
      },
      {
        tip: "Use Wrangler for deployment and configuration",
        detail:
          "wrangler.toml defines bindings, routes, and environment variables. Use wrangler dev for local development and wrangler deploy for production.",
      },
    ],
    usefulLinks: [
      {
        title: "Cloudflare Workers Documentation",
        url: "https://developers.cloudflare.com/workers/",
        type: "docs",
      },
      {
        title: "Workers Examples",
        url: "https://developers.cloudflare.com/workers/examples/",
        type: "tutorial",
      },
      {
        title: "Cloudflare Workers Discord",
        url: "https://discord.cloudflare.com",
        type: "community",
      },
      {
        title: "Wrangler CLI",
        url: "https://developers.cloudflare.com/workers/wrangler/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much do Cloudflare Workers cost?",
        answer:
          "Workers have a generous free tier (100K requests/day). The paid plan starts at $5/month for 10M requests. Compared to AWS Lambda, Workers are significantly cheaper for edge workloads with no cold start costs.",
      },
      {
        question: "Cloudflare Workers vs AWS Lambda — which is better?",
        answer:
          "Workers have zero cold starts and run globally by default. Lambda has more compute power, longer timeouts, and broader AWS integration. Choose Workers for latency-sensitive edge work, Lambda for compute-heavy backend processing.",
      },
      {
        question: "Can I run a full-stack app on Cloudflare Workers?",
        answer:
          "Yes. With D1 (database), R2 (file storage), KV (cache), Queues (async processing), and Durable Objects (state), you can build complete applications entirely on the Cloudflare platform.",
      },
      {
        question: "Do Cloudflare Workers support WebSockets?",
        answer:
          "Yes, via Durable Objects. Each Durable Object can manage WebSocket connections with persistent state — ideal for chat, collaborative editing, and real-time features.",
      },
    ],
    quickstart:
      "npm create cloudflare@latest my-worker\ncd my-worker\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://developers.cloudflare.com/workers/",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Rust commands exposed to the frontend via typed IPC — type-safe bridge between web UI and native code.",
      },
      {
        icon: "Package",
        title: "Under 10MB bundles",
        description:
          "Ship desktop apps under 10MB by leveraging the OS webview — no bundled Chromium, no bloat.",
      },
      {
        icon: "Cpu",
        title: "Full OS API access",
        description:
          "File system, shell commands, system tray, notifications, and clipboard — native capabilities from your web frontend.",
      },
      {
        icon: "RefreshCw",
        title: "Auto-updater",
        description:
          "Built-in update mechanism with delta updates and signature verification — seamless version rollouts.",
      },
      {
        icon: "Monitor",
        title: "Cross-platform targets",
        description:
          "Build for Windows, macOS, and Linux from a single codebase — platform-specific packaging handled by Tauri.",
      },
      {
        icon: "Globe",
        title: "OS webview rendering",
        description:
          "Uses the OS native webview (WebView2, WebKit) — no Chromium overhead, consistent with user's system.",
      },
    ],
    subTechs: [
      {
        slug: "rust",
      },
      { slug: "react" },
      { slug: "svelte" },
    ],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Tauri is a framework for building lightweight, secure desktop applications using a Rust backend and any web frontend (React, Vue, Svelte, Solid). Unlike Electron, Tauri uses the operating system's native webview instead of bundling Chromium, resulting in app bundles under 10MB and significantly lower memory usage.\n\nTauri 2.0 adds iOS and Android support, making it a true cross-platform solution. The Rust backend provides typed IPC commands, OS API access (filesystem, shell, notifications), auto-updating, and a plugin system — all while keeping the web frontend you're already familiar with.",
    challenges: [
      {
        title: "Rust learning curve",
        description:
          "Tauri's backend is written in Rust, which has a steep learning curve. For simple IPC commands, the Rust code is straightforward, but complex backend logic requires Rust proficiency.",
      },
      {
        title: "WebView rendering differences",
        description:
          "Since Tauri uses the OS webview (WebView2 on Windows, WebKit on macOS/Linux), rendering can differ between platforms. Testing on all target OSes is essential.",
      },
      {
        title: "Smaller ecosystem than Electron",
        description:
          "Tauri's plugin ecosystem is growing but smaller than Electron's. Some features may require writing custom Rust plugins rather than using existing npm packages.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Tauri's IPC for typed commands",
        detail:
          "Define Rust commands with #[tauri::command] and call them from your frontend with invoke() — type-safe communication between frontend and backend.",
      },
      {
        tip: "Configure security allowlists",
        detail:
          "Tauri's allowlist system restricts which OS APIs your app can access — enable only what you need for defense-in-depth security.",
      },
      {
        tip: "Use multi-stage builds for CI",
        detail:
          "Build your web frontend first, then compile the Tauri binary. GitHub Actions workflows with caching for Rust compilation dramatically speed up CI.",
      },
    ],
    usefulLinks: [
      {
        title: "Tauri Documentation",
        url: "https://v2.tauri.app/",
        type: "docs",
      },
      {
        title: "Tauri Getting Started",
        url: "https://v2.tauri.app/start/",
        type: "tutorial",
      },
      {
        title: "Tauri GitHub",
        url: "https://github.com/tauri-apps/tauri",
        type: "community",
      },
      {
        title: "Tauri Plugins",
        url: "https://v2.tauri.app/plugin/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does Tauri development cost?",
        answer:
          "Tauri is free and open-source. Development costs are comparable to web development plus Rust backend work — a typical Tauri app takes 6-12 weeks. The savings come from reusing your web frontend skills.",
      },
      {
        question: "Tauri vs Electron — which should I choose?",
        answer:
          "Tauri produces 10x smaller bundles, uses 5-10x less memory, and has better security defaults. Electron has a larger ecosystem, better Node.js compatibility, and consistent Chromium rendering. Choose Tauri for new projects; choose Electron when Node.js ecosystem compatibility is critical.",
      },
      {
        question: "Does Tauri support mobile?",
        answer:
          "Yes. Tauri 2.0 supports iOS and Android alongside Windows, macOS, and Linux — all from the same codebase. Mobile support uses the platform's native webview.",
      },
    ],
    quickstart:
      "# Install Tauri CLI\ncargo install tauri-cli\n\n# Create a new Tauri project\nnpm create tauri-app@latest\n\n# Or add Tauri to an existing web project\nnpm install @tauri-apps/cli @tauri-apps/api\nnpx tauri init\n\n# Run in development\nnpx tauri dev",
    quickstartLang: "bash",
    docsUrl: "https://v2.tauri.app/",
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
        description:
          "Full Chromium engine ensures pixel-perfect rendering — the same behaviour as Chrome on every desktop platform.",
      },
      {
        icon: "Package",
        title: "Node.js main process",
        description:
          "Full Node.js runtime in the main process — access the file system, spawn processes, and use any npm package.",
      },
      {
        icon: "Shield",
        title: "Sandboxed renderer",
        description:
          "Renderer processes run in a sandboxed Chromium context — isolate untrusted content from system access.",
      },
      {
        icon: "RefreshCw",
        title: "Auto-updater",
        description:
          "electron-updater handles download, verification, and install — ship updates silently or with user confirmation.",
      },
      {
        icon: "Globe",
        title: "Web tech stack",
        description:
          "Build your UI with React, Vue, or Svelte — reuse your web skills and component libraries for desktop.",
      },
      {
        icon: "GitBranch",
        title: "electron-builder CI",
        description:
          "Package and sign for Windows, macOS, and Linux in CI — NSIS, DMG, AppImage, and Snap formats supported.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Electron is the established framework for building cross-platform desktop apps with web technologies. VS Code, Slack, Discord, Figma, and Notion all use Electron — it bundles Chromium and Node.js into a single runtime, so your web app runs as a native desktop application.\n\nElectron's mature ecosystem provides auto-updating (electron-updater), native menus, tray icons, notifications, file system access, and comprehensive CI/CD tooling via electron-builder. If you have a web app and need a desktop version, Electron is the fastest path to production.",
    challenges: [
      {
        title: "Memory usage and bundle size",
        description:
          "Electron bundles Chromium (~150MB), which means large installers and high baseline memory usage. For lightweight apps, consider Tauri as an alternative.",
      },
      {
        title: "Security surface area",
        description:
          "Electron apps have access to Node.js APIs from the renderer process. Enabling contextIsolation, disabling nodeIntegration, and using preload scripts are essential security practices.",
      },
      {
        title: "Native platform integration",
        description:
          "While Electron supports native menus, notifications, and file access, deeper OS integration (system extensions, kernel APIs) may require native Node.js addons.",
      },
    ],
    bestPractices: [
      {
        tip: "Enable context isolation and sandbox",
        detail:
          "Always use contextIsolation: true and sandbox: true in your BrowserWindow config. Use preload scripts for IPC instead of exposing Node.js to the renderer.",
      },
      {
        tip: "Use electron-builder for CI/CD",
        detail:
          "electron-builder handles code signing, notarization, and publishing for Windows (NSIS, MSI), macOS (DMG, pkg), and Linux (AppImage, deb, snap).",
      },
      {
        tip: "Minimize Chromium overhead",
        detail:
          "Disable hardware acceleration for utility windows, use BrowserView for complex layouts, and profile memory usage with Chrome DevTools.",
      },
    ],
    usefulLinks: [
      {
        title: "Electron Documentation",
        url: "https://www.electronjs.org/docs/latest/",
        type: "docs",
      },
      {
        title: "Electron Quick Start",
        url: "https://www.electronjs.org/docs/latest/tutorial/quick-start",
        type: "tutorial",
      },
      {
        title: "electron-builder",
        url: "https://www.electron.build/",
        type: "tool",
      },
      {
        title: "Electron GitHub",
        url: "https://github.com/electron/electron",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Electron development cost?",
        answer:
          "Electron is free and open-source. If you have an existing web app, wrapping it in Electron takes 1-2 weeks. Building a full desktop app from scratch takes 6-12 weeks. Code signing certificates cost ~$200-500/year.",
      },
      {
        question: "Electron vs Tauri — which desktop framework?",
        answer:
          "Electron has a mature ecosystem, consistent Chromium rendering, and full Node.js compatibility — battle-tested by VS Code and Slack. Tauri is lighter (10x smaller bundles) but has a smaller ecosystem and requires Rust. Choose Electron for ecosystem compatibility; choose Tauri for size and performance.",
      },
      {
        question: "Is Electron still a good choice in 2025?",
        answer:
          "Yes. Despite criticisms about resource usage, Electron powers many of the world's most popular desktop apps. Its ecosystem, stability, and web technology compatibility remain unmatched. For many teams, the productivity benefits outweigh the resource overhead.",
      },
    ],
    quickstart:
      "# Create a new Electron app\nnpm init electron-app@latest my-app\ncd my-app\n\n# Or add Electron to an existing project\nnpm install electron --save-dev\nnpm install electron-builder --save-dev\n\n# Run in development\nnpm start",
    quickstartLang: "bash",
    docsUrl: "https://www.electronjs.org/docs/latest/",
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
        description:
          "Pre-built UI components and the Payment Intents API for secure, SCA-compliant checkout flows.",
      },
      {
        icon: "RefreshCw",
        title: "Subscriptions & billing",
        description:
          "Recurring billing with trials, proration, usage-based pricing, and automated invoicing — Stripe handles the lifecycle.",
      },
      {
        icon: "Globe",
        title: "135+ currencies",
        description:
          "Accept payments in 135+ currencies with automatic conversion, local payment methods, and multi-currency payouts.",
      },
      {
        icon: "Workflow",
        title: "Webhooks & events",
        description:
          "Real-time event notifications for payment success, failures, disputes, and subscription changes — drive your backend logic.",
      },
      {
        icon: "Network",
        title: "Connect for marketplaces",
        description:
          "Split payments, onboard sellers, and handle payouts for marketplace and platform business models.",
      },
      {
        icon: "Shield",
        title: "Radar fraud protection",
        description:
          "ML-powered fraud detection with customisable rules — block suspicious transactions before they cost you.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "polar" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Stripe is the most widely used payment platform for internet businesses — processing billions of dollars annually for companies from startups to Fortune 500. It provides a comprehensive API for card payments, subscriptions, invoicing, marketplace payouts, fraud prevention, and tax calculation.\n\nStripe's developer experience is industry-leading: extensive documentation, client libraries in every major language, webhooks for event-driven architectures, and Stripe CLI for local testing. Whether you need simple checkout or complex marketplace splits with Connect, Stripe handles it.",
    challenges: [
      {
        title: "Webhook reliability and idempotency",
        description:
          "Stripe webhooks can be delivered multiple times or out of order. Implementing idempotent webhook handlers and storing event IDs prevents duplicate processing.",
      },
      {
        title: "PCI compliance considerations",
        description:
          "Using Stripe Elements and Payment Intents keeps you at PCI SAQ-A (minimal compliance burden). Avoid handling raw card numbers to keep your compliance scope small.",
      },
      {
        title: "Subscription lifecycle complexity",
        description:
          "Subscription billing involves trials, upgrades, downgrades, proration, dunning, and cancellation. Mapping these states to your application's access control requires careful design.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Payment Intents + Elements",
        detail:
          "Stripe Elements provides PCI-compliant card fields that match your design. Payment Intents handles SCA (3D Secure) and global payment methods automatically.",
      },
      {
        tip: "Test with Stripe CLI locally",
        detail:
          "stripe listen --forward-to forwards webhook events to your local server — essential for testing payment flows without deploying.",
      },
      {
        tip: "Implement idempotent webhooks",
        detail:
          "Store processed event IDs and skip duplicates. Use database transactions to ensure webhook processing is atomic.",
      },
      {
        tip: "Use Stripe Tax for compliance",
        detail:
          "Stripe Tax automatically calculates and collects sales tax, VAT, and GST based on customer location — essential for global SaaS.",
      },
    ],
    usefulLinks: [
      {
        title: "Stripe Documentation",
        url: "https://docs.stripe.com/",
        type: "docs",
      },
      {
        title: "Stripe API Reference",
        url: "https://docs.stripe.com/api",
        type: "docs",
      },
      {
        title: "Stripe CLI",
        url: "https://docs.stripe.com/stripe-cli",
        type: "tool",
      },
      {
        title: "Stripe Developer Community",
        url: "https://github.com/stripe",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Stripe cost?",
        answer:
          "Stripe charges 2.9% + 30¢ per successful card charge (US pricing). International cards add 1.5%, currency conversion adds 1%. Subscriptions, invoicing, and the API are included — no monthly fee. Connect, Radar, and Tax have additional per-transaction fees.",
      },
      {
        question: "Stripe vs Polar — which payment platform?",
        answer:
          "Stripe is a payment processor — you're the merchant and handle tax/compliance yourself but get maximum control. Polar is a merchant of record that handles tax and compliance for you but takes a larger cut. Choose Stripe for control; choose Polar for simplicity.",
      },
      {
        question: "How long does Stripe integration take?",
        answer:
          "A basic Stripe Checkout integration takes 1-2 days. Full subscription billing with customer portal, webhooks, and access provisioning takes 1-2 weeks. Complex marketplace integrations with Connect take 4-8 weeks.",
      },
    ],
    quickstart:
      "npm install stripe @stripe/stripe-js\n\n# Install the Stripe CLI for local testing\nbrew install stripe/stripe-cli/stripe\nstripe login\n\n# Forward webhooks to your local server\nstripe listen --forward-to localhost:3000/api/webhooks/stripe",
    quickstartLang: "bash",
    docsUrl: "https://docs.stripe.com/",
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
        description:
          "Utility classes for rapid layout plus pre-built components like modals, navbars, and cards — best of both approaches.",
      },
      {
        icon: "Paintbrush",
        title: "Sass variables",
        description:
          "Customise colors, spacing, breakpoints, and typography via Sass variables — a consistent design system from one config file.",
      },
      {
        icon: "Accessibility",
        title: "Accessible components",
        description:
          "ARIA attributes, focus states, and keyboard navigation baked into every component — accessibility by default.",
      },
      {
        icon: "Globe",
        title: "No JS framework lock-in",
        description:
          "Works with vanilla HTML, React, Vue, Angular, or any framework — plain CSS classes with no runtime dependency.",
      },
      {
        icon: "Moon",
        title: "Dark mode ready",
        description:
          "Built-in color mode support with data attributes — toggle between light and dark with a single class.",
      },
      {
        icon: "Package",
        title: "Icon library",
        description:
          "2,000+ Bootstrap Icons as SVGs and web fonts — consistent iconography that matches the component design language.",
      },
    ],
    subTechs: [{ slug: "php" }, { slug: "laravel" }],
    overview:
      "Bootstrap is the world's most popular CSS framework — a comprehensive toolkit of pre-built components, responsive grid system, and utility classes that get projects off the ground fast. Bootstrap 5 dropped jQuery, added CSS custom properties, RTL support, and a refined utility API. It's the pragmatic choice for admin dashboards, internal tools, and projects where time-to-market beats pixel-perfect custom design. We customize Bootstrap with Sass variables to match your brand, extend it with custom components, and ensure accessibility compliance out of the box.",
    challenges: [
      {
        title: "The 'Bootstrap look' problem",
        description:
          "Without significant customization, Bootstrap sites look generic. Breaking free from the default aesthetic while staying within Bootstrap's system requires Sass variable overrides and custom component work.",
      },
      {
        title: "Bundle size with unused components",
        description:
          "Importing all of Bootstrap adds significant CSS weight. Properly tree-shaking unused components and utilities requires Sass imports rather than the full CSS bundle.",
      },
      {
        title: "JavaScript component limitations",
        description:
          "Bootstrap's JavaScript components (modals, dropdowns, tooltips) work differently than React/Vue component models. Integrating them with modern frameworks requires wrapper libraries or careful DOM management.",
      },
      {
        title: "Migration between major versions",
        description:
          "Bootstrap major version upgrades (4 to 5) involve class name changes, removed utilities, and new conventions. Large codebases face substantial find-and-replace migration work.",
      },
    ],
    bestPractices: [
      {
        tip: "Customize via Sass variables, not overrides",
        detail:
          "Override Bootstrap's Sass variables ($primary, $border-radius, $font-family-base) before importing Bootstrap. This produces a cohesive theme without CSS specificity battles.",
      },
      {
        tip: "Import only what you use",
        detail:
          "Import individual Bootstrap Sass modules (@import 'bootstrap/scss/buttons') rather than the entire framework. This dramatically reduces your CSS bundle size.",
      },
      {
        tip: "Use the utility API for custom utilities",
        detail:
          "Bootstrap 5's utility API lets you generate custom utility classes with responsive and state variants. Extend it instead of writing one-off CSS.",
      },
      {
        tip: "Pair with a framework-specific wrapper",
        detail:
          "Use react-bootstrap or bootstrap-vue-next to get proper component integration with React or Vue. Don't manually manage Bootstrap JS in a component framework.",
      },
    ],
    usefulLinks: [
      {
        title: "Bootstrap Documentation",
        url: "https://getbootstrap.com/docs",
        type: "docs",
      },
      {
        title: "Bootstrap Icons",
        url: "https://icons.getbootstrap.com",
        type: "tool",
      },
      {
        title: "Bootstrap Themes",
        url: "https://themes.getbootstrap.com",
        type: "tool",
      },
      {
        title: "react-bootstrap",
        url: "https://react-bootstrap.netlify.app",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Bootstrap vs. Tailwind CSS — which should I use?",
        answer:
          "Use Bootstrap when you need pre-built components fast (admin panels, internal tools, prototypes). Use Tailwind when you want full design control and are building a custom UI. Bootstrap is faster to start; Tailwind produces more unique designs and smaller bundles.",
      },
      {
        question: "How much does it cost to build a Bootstrap website?",
        answer:
          "Bootstrap projects are typically 20-30% cheaper than custom-designed alternatives because of pre-built components. A Bootstrap admin dashboard costs $5K–15K. A customized Bootstrap marketing site runs $3K–10K. We offer free consultations.",
      },
      {
        question: "Is Bootstrap still relevant in 2025?",
        answer:
          "Yes. Bootstrap 5 is actively maintained, has the largest CSS framework community, and powers millions of websites. For admin dashboards, internal tools, and projects prioritizing speed over design uniqueness, it remains the practical choice.",
      },
      {
        question: "Can I use Bootstrap with React or Vue?",
        answer:
          "Yes — use react-bootstrap for React or bootstrap-vue-next for Vue 3. These libraries provide proper component wrappers that integrate Bootstrap's functionality with your framework's component model.",
      },
    ],
    quickstart: "npm install bootstrap\nnpm install sass",
    quickstartLang: "bash",
    docsUrl: "https://getbootstrap.com/docs",
    pageType: "tech",
    targetAudience: "developers",
  },

  // ─── MORE FRONTEND ───────────────────────────────────────────────
  {
    slug: "blazor",
    name: "Blazor",
    category: "full-stack",
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
        description:
          "Write interactive UI logic in C# via WebAssembly — share models, validation, and business logic with your backend.",
      },
      {
        icon: "Server",
        title: "Blazor Server mode",
        description:
          "UI events sent over SignalR with server-side rendering — instant load times and thin client requirements.",
      },
      {
        icon: "Component",
        title: "Razor components",
        description:
          "Reusable .razor components with parameters, cascading values, and lifecycle methods — familiar to any ASP.NET developer.",
      },
      {
        icon: "Layers",
        title: "MudBlazor & Radzen",
        description:
          "Rich component libraries with data grids, charts, and form controls — enterprise UI without building from scratch.",
      },
      {
        icon: "Database",
        title: "EF Core integration",
        description:
          "Entity Framework Core for data access — LINQ queries, migrations, and change tracking from your Blazor app.",
      },
      {
        icon: "Shield",
        title: "ASP.NET auth",
        description:
          "ASP.NET Identity with cookie, JWT, and external provider auth — role-based access control built into the framework.",
      },
    ],
    subTechs: [{ slug: "dotnet" }, { slug: "dotnet-mvc" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Blazor is Microsoft's framework for building interactive web UIs using C# instead of JavaScript. It lets .NET teams share models, validation logic, and business rules between server and client — no context-switching to a different language for the frontend.\n\nBlazor offers two hosting models: Blazor Server (UI updates via SignalR WebSocket) and Blazor WebAssembly (full .NET runtime in the browser). Blazor 8+ adds the best of both with automatic render mode selection and streaming SSR. Component libraries like MudBlazor and Radzen provide rich UI components.",
    challenges: [
      {
        title: "WebAssembly download size",
        description:
          "Blazor WASM requires downloading the .NET runtime (~2MB compressed) on first load. AOT compilation can help but increases the published size. Blazor Server avoids this with thin SignalR connections.",
      },
      {
        title: "JavaScript interop for browser APIs",
        description:
          "Some browser features require JavaScript interop (JSInterop). While most common needs are covered by libraries, occasional JS code is needed for cutting-edge browser APIs.",
      },
      {
        title: "Ecosystem size vs React/Angular",
        description:
          "Blazor's component ecosystem is smaller than React's. Libraries like MudBlazor and Radzen fill most gaps, but niche requirements may need custom component development.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Blazor 8+ auto render mode",
        detail:
          "Blazor 8's auto render mode serves SSR on first load, then upgrades to interactive WASM — best of both worlds for performance and interactivity.",
      },
      {
        tip: "Share models between server and client",
        detail:
          "Blazor's key advantage is shared C# code. Create a shared class library for models, validators, and DTOs consumed by both the API and the Blazor frontend.",
      },
      {
        tip: "Use MudBlazor for component library",
        detail:
          "MudBlazor provides Material Design components for Blazor — data grids, charts, forms, and dialogs with excellent documentation and active development.",
      },
    ],
    usefulLinks: [
      {
        title: "Blazor Documentation",
        url: "https://learn.microsoft.com/en-us/aspnet/core/blazor/",
        type: "docs",
      },
      {
        title: "Blazor Tutorial",
        url: "https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/intro",
        type: "tutorial",
      },
      {
        title: "MudBlazor Component Library",
        url: "https://mudblazor.com/",
        type: "tool",
      },
      {
        title: "ASP.NET Community",
        url: "https://dotnet.microsoft.com/en-us/platform/community",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Blazor development cost?",
        answer:
          ".NET and Blazor are free and open-source. Visual Studio Community is free for individuals and small teams. Development costs are comparable to other frontend frameworks — a typical Blazor app takes 6-12 weeks. Teams already using .NET save time by sharing C# skills and code.",
      },
      {
        question: "Blazor vs React — which should I choose?",
        answer:
          "React has a vastly larger ecosystem, more developer talent, and works with any backend. Blazor is the right choice when your team is .NET-native, you want to share C# code between frontend and backend, or you want to avoid JavaScript entirely. Choose based on your team's skills.",
      },
      {
        question: "Is Blazor production-ready?",
        answer:
          "Yes. Blazor is part of ASP.NET Core, backed by Microsoft, and used in production by many enterprise teams. Blazor 8+ with auto render mode is the most mature version yet.",
      },
    ],
    quickstart:
      "# Install .NET SDK\n# https://dotnet.microsoft.com/download\n\n# Create a new Blazor app\ndotnet new blazor -o MyApp\ncd MyApp\n\n# Run in development\ndotnet watch run",
    quickstartLang: "bash",
    docsUrl: "https://learn.microsoft.com/en-us/aspnet/core/blazor/",
  },
  {
    slug: "react-router",
    name: "React Router",
    category: "full-stack",
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
        description:
          "Nested route layouts with parallel data loading — each segment fetches independently for faster page transitions.",
      },
      {
        icon: "Database",
        title: "Loader & action pattern",
        description:
          "Loaders fetch data before render, actions handle mutations — clean separation of reads and writes per route.",
      },
      {
        icon: "Zap",
        title: "Progressive enhancement",
        description:
          "Forms work without JavaScript by default — then enhance with client-side transitions when JS loads.",
      },
      {
        icon: "Shield",
        title: "Error boundaries",
        description:
          "Per-route error boundaries catch and display errors without crashing the entire application.",
      },
      {
        icon: "Server",
        title: "SSR & framework mode",
        description:
          "Server-side rendering with streaming, plus framework mode for use inside Remix, Next.js, or standalone.",
      },
      {
        icon: "Globe",
        title: "Deploy anywhere",
        description:
          "Runs on Node.js, Cloudflare Workers, Deno, or any standard web server — no vendor lock-in.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "tailwind" }],
    overview:
      "React Router is the standard routing library for React, and with v7 (the spiritual successor to Remix), it's now a full-stack framework. It provides nested routes with data loaders and actions, error boundaries, progressive enhancement, and SSR — all built on web standards like the Fetch API and FormData. React Router v7's framework mode gives you file-based routing, server-side rendering, and streaming while maintaining the ability to deploy anywhere Node.js runs. It's the choice for teams that value web platform alignment and fine-grained control over data loading.",
    challenges: [
      {
        title: "React Router v6/v7 migration complexity",
        description:
          "The jump from v5 to v6 changed the entire API surface. Moving to v7 framework mode (Remix-style loaders/actions) requires rethinking data fetching patterns across your app.",
      },
      {
        title: "Loader/action data flow patterns",
        description:
          "Understanding the loader → component → action → revalidation cycle takes time. Managing optimistic UI, pending states, and race conditions in this model is non-trivial.",
      },
      {
        title: "Framework mode vs. library mode decision",
        description:
          "React Router v7 can be used as a simple client-side router or a full-stack framework. Choosing the right mode and understanding the tradeoffs impacts your entire architecture.",
      },
      {
        title: "SSR configuration and deployment",
        description:
          "Setting up React Router's SSR with streaming, deploying to different platforms (Node, Cloudflare, Vercel), and handling hydration errors requires careful configuration.",
      },
    ],
    bestPractices: [
      {
        tip: "Use loaders for data fetching, not useEffect",
        detail:
          "React Router's loader functions run before the component renders, eliminating loading spinners and waterfall requests. Always prefer loaders over component-level data fetching.",
      },
      {
        tip: "Leverage progressive enhancement with actions",
        detail:
          "Form actions work without JavaScript enabled and enhance with client-side behavior when available. This gives you resilient forms that work even when JS fails.",
      },
      {
        tip: "Use nested routes for layout composition",
        detail:
          "Nest routes to share layouts, loading states, and error boundaries. Each route segment loads its own data independently, enabling parallel data fetching.",
      },
      {
        tip: "Implement optimistic UI with useFetcher",
        detail:
          "useFetcher gives you pending state for mutations without navigation. Use it for inline edits, toggles, and any mutation that shouldn't cause a page transition.",
      },
    ],
    usefulLinks: [
      {
        title: "React Router Documentation",
        url: "https://reactrouter.com",
        type: "docs",
      },
      {
        title: "React Router Tutorial",
        url: "https://reactrouter.com/start/framework/installation",
        type: "tutorial",
      },
      {
        title: "React Router GitHub",
        url: "https://github.com/remix-run/react-router",
        type: "community",
      },
      {
        title: "Remix Discord",
        url: "https://rmx.as/discord",
        type: "community",
      },
    ],
    faq: [
      {
        question: "React Router v7 vs. Next.js — which should I use?",
        answer:
          "React Router v7 excels at progressive enhancement, web standards alignment, and fine-grained loading control. Next.js offers a larger ecosystem, Vercel integration, and React Server Components. Choose React Router for web-standard apps; Next.js for the broadest ecosystem and RSC support.",
      },
      {
        question: "How much does it cost to build an app with React Router?",
        answer:
          "React Router project costs align with standard React development — $10K–40K for a typical web application. Framework mode (Remix-style) apps with SSR and data loaders typically cost $20K–60K+ depending on complexity.",
      },
      {
        question: "Should I use React Router's framework mode or library mode?",
        answer:
          "Use framework mode for new full-stack apps — you get file-based routing, loaders, actions, and SSR. Use library mode when adding routing to an existing SPA or when you don't need server-side rendering.",
      },
      {
        question: "Is Remix dead? What happened to it?",
        answer:
          "Remix merged into React Router v7. All of Remix's features (loaders, actions, SSR) are now part of React Router's framework mode. It's the same team, same ideas, unified under one project.",
      },
    ],
    quickstart:
      "npx create-react-router@latest my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://reactrouter.com",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Every route path, param, and search string is fully typed — broken links are compile-time errors.",
      },
      {
        icon: "Search",
        title: "Typed search params",
        description:
          "Search params validated and typed with Zod or Valibot — no more manual parsing or runtime surprises.",
      },
      {
        icon: "Layers",
        title: "Route code splitting",
        description:
          "Automatic code splitting per route with lazy loading — only ship the JavaScript each page actually needs.",
      },
      {
        icon: "Database",
        title: "Loaders & prefetch",
        description:
          "Route loaders fetch data before navigation and prefetch on hover — instant page transitions with fresh data.",
      },
      {
        icon: "Zap",
        title: "Devtools included",
        description:
          "Built-in devtools panel to inspect route tree, params, search state, and loader cache in real time.",
      },
      {
        icon: "Globe",
        title: "Framework agnostic",
        description:
          "Works with React, Solid, Vue, and more — the same type-safe routing API regardless of your UI framework.",
      },
    ],
    subTechs: [
      { slug: "tanstack" },
      { slug: "react" },
      { slug: "tanstack-start" },
    ],
    overview:
      "TanStack Router is the most type-safe routing solution for React — every route path, search parameter, path parameter, and loader return type is fully typed with zero runtime overhead. Unlike React Router's string-based routes, TanStack Router uses TypeScript inference to catch routing errors at compile time. It includes built-in search param validation with Zod, route-level code splitting, loader-based data fetching, and devtools. For teams building complex React applications where type safety and developer productivity matter, TanStack Router eliminates an entire category of runtime bugs.",
    challenges: [
      {
        title: "Type-safe route tree configuration",
        description:
          "Setting up the route tree with full type inference requires understanding TanStack Router's code generation or manual route tree definition — the initial setup is more complex than React Router.",
      },
      {
        title: "Search param serialization patterns",
        description:
          "Fully typed search params are powerful but require designing schemas (typically with Zod) for URL state. Complex filtering, pagination, and sorting UIs need careful param design.",
      },
      {
        title: "Smaller community and fewer examples",
        description:
          "TanStack Router is newer and has fewer tutorials, Stack Overflow answers, and real-world examples than React Router. Solving edge cases often requires Discord or reading source code.",
      },
      {
        title: "Integration with existing React ecosystems",
        description:
          "Integrating TanStack Router with auth libraries, analytics tools, and other routing-dependent packages may require custom adapters since most assume React Router.",
      },
    ],
    bestPractices: [
      {
        tip: "Use the route code generator",
        detail:
          "TanStack Router's route code generator watches your file system and generates a fully typed route tree. This eliminates manual route configuration and ensures type safety.",
      },
      {
        tip: "Define search param schemas per route",
        detail:
          "Use validateSearch with Zod schemas to get type-safe, validated URL search params. This turns your URL into a type-safe state store with automatic serialization.",
      },
      {
        tip: "Combine with TanStack Query for data loading",
        detail:
          "Use route loaders to call ensureQueryData from TanStack Query. This gives you cached data, background refetching, and optimistic updates with full type safety.",
      },
      {
        tip: "Enable devtools in development",
        detail:
          "TanStack Router Devtools show you the route tree, current params, search state, and loader data. Essential for debugging complex routing scenarios.",
      },
    ],
    usefulLinks: [
      {
        title: "TanStack Router Docs",
        url: "https://tanstack.com/router",
        type: "docs",
      },
      {
        title: "TanStack Router Examples",
        url: "https://tanstack.com/router/latest/docs/framework/react/examples",
        type: "tutorial",
      },
      {
        title: "TanStack Start Docs",
        url: "https://tanstack.com/start",
        type: "docs",
      },
      {
        title: "TanStack Discord",
        url: "https://tlinz.com/discord",
        type: "community",
      },
    ],
    faq: [
      {
        question: "TanStack Router vs. React Router — which should I choose?",
        answer:
          "Choose TanStack Router if type safety is a priority — it catches routing errors at compile time that React Router only catches at runtime. Choose React Router for ecosystem compatibility and if your team is already invested in the Remix/React Router ecosystem.",
      },
      {
        question: "How much does it cost to build an app with TanStack Router?",
        answer:
          "TanStack Router is free and open source. Development costs align with standard React projects — $15K–50K for typical apps. The type safety actually reduces debugging time and long-term maintenance costs.",
      },
      {
        question: "Can I migrate from React Router to TanStack Router?",
        answer:
          "Yes, but it's a significant migration since the APIs are different. We recommend TanStack Router for new projects. For existing React Router apps, the migration is best done incrementally, route by route.",
      },
      {
        question: "Does TanStack Router support SSR?",
        answer:
          "Yes — TanStack Start (the full-stack framework built on TanStack Router) provides SSR, streaming, and server functions. For client-only SPAs, TanStack Router works standalone without a server.",
      },
    ],
    quickstart:
      "npm create @tanstack/router@latest my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://tanstack.com/router",
    pageType: "tech",
    targetAudience: "developers",
  },
  {
    slug: "tanstack-start",
    name: "TanStack Start",
    category: "full-stack",
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
        description:
          "Server-side rendering with streaming HTML responses — fast first paint while data loads progressively.",
      },
      {
        icon: "Code2",
        title: "Server functions",
        description:
          "RPC-style server functions called directly from components — type-safe backend access without manual API routes.",
      },
      {
        icon: "Database",
        title: "TanStack Query built-in",
        description:
          "First-class TanStack Query integration for caching, revalidation, and optimistic updates out of the box.",
      },
      {
        icon: "Route",
        title: "File-based routing",
        description:
          "Convention-based file system routing with layouts, catch-all routes, and route groups — zero config.",
      },
      {
        icon: "Globe",
        title: "Vinxi bundler",
        description:
          "Powered by Vinxi and Nitro — deploy to Node.js, Cloudflare, Vercel, or any Nitro-compatible runtime.",
      },
      {
        icon: "Zap",
        title: "Edge-ready",
        description:
          "SolidStart apps run on edge runtimes for sub-50ms response times — global performance without infrastructure work.",
      },
    ],
    subTechs: [
      { slug: "tanstack" },
      { slug: "tanstack-router" },
      { slug: "trpc" },
    ],
    overview:
      "TanStack Start is a full-stack React framework built on TanStack Router and Vinxi (a Nitro-powered bundler). It brings SSR, streaming, server functions, and API routes to the TanStack ecosystem with end-to-end type safety that flows from your database to your UI. Server functions are fully typed RPC calls — no separate API layer needed. TanStack Start is the natural evolution for teams already using TanStack Router and Query who want a complete full-stack solution without leaving the TanStack ecosystem.",
    challenges: [
      {
        title: "Early-stage ecosystem",
        description:
          "TanStack Start is the newest entrant in the full-stack React framework space. Documentation, tutorials, and community solutions are less comprehensive than Next.js or Remix.",
      },
      {
        title: "Vinxi bundler learning curve",
        description:
          "TanStack Start uses Vinxi (built on Nitro) instead of webpack or Vite directly. Understanding the build pipeline, plugins, and deployment adapters requires learning a newer tool.",
      },
      {
        title: "Deployment adapter maturity",
        description:
          "While Vinxi supports multiple deployment targets, the adapter ecosystem is younger than Next.js's. Some edge platforms may have less-tested support.",
      },
      {
        title: "Server function patterns",
        description:
          "Designing the boundary between server functions and client code — especially for real-time data, websockets, and complex mutations — requires understanding TanStack Start's specific patterns.",
      },
    ],
    bestPractices: [
      {
        tip: "Use server functions for all data mutations",
        detail:
          "TanStack Start's server functions are fully typed and run exclusively on the server. Use them for database writes, external API calls, and any logic that touches secrets.",
      },
      {
        tip: "Combine with TanStack Query for caching",
        detail:
          "Use TanStack Query alongside Start's server functions for client-side caching, optimistic updates, and background refetching. They're designed to work together.",
      },
      {
        tip: "Leverage TanStack Router's type-safe loaders",
        detail:
          "Route loaders in TanStack Start run on the server during SSR and the client during navigation. Use them for page data — fully typed from loader to component.",
      },
      {
        tip: "Start simple, add complexity incrementally",
        detail:
          "Begin with TanStack Start's defaults and add TanStack Query, Form, and Table as needed. The libraries compose naturally but don't require all-or-nothing adoption.",
      },
    ],
    usefulLinks: [
      {
        title: "TanStack Start Docs",
        url: "https://tanstack.com/start",
        type: "docs",
      },
      {
        title: "TanStack Router Docs",
        url: "https://tanstack.com/router",
        type: "docs",
      },
      {
        title: "Vinxi Documentation",
        url: "https://vinxi.vercel.app",
        type: "docs",
      },
      {
        title: "TanStack Discord",
        url: "https://tlinz.com/discord",
        type: "community",
      },
    ],
    faq: [
      {
        question: "TanStack Start vs. Next.js — which should I use?",
        answer:
          "Choose TanStack Start for maximum type safety with TanStack Router and Query integration. Choose Next.js for the largest ecosystem, React Server Components, and Vercel's platform. TanStack Start is newer but offers superior TypeScript DX for data-heavy apps.",
      },
      {
        question: "How much does it cost to build an app with TanStack Start?",
        answer:
          "TanStack Start is free and open source. Development costs for a full-stack TanStack Start app typically run $15K–60K depending on complexity. The strong type safety reduces long-term maintenance costs.",
      },
      {
        question: "Is TanStack Start production-ready?",
        answer:
          "TanStack Start is in active development and approaching stable release. It's suitable for production use by teams comfortable being early adopters. The underlying TanStack Router and Query libraries are battle-tested.",
      },
      {
        question: "Can I use TanStack Start with tRPC?",
        answer:
          "Yes — TanStack Start pairs naturally with tRPC for typed API endpoints. Server functions provide a similar typed RPC experience, so evaluate whether you need both or can use Start's built-in server functions.",
      },
    ],
    quickstart:
      "npx create-tsrouter-app@latest my-app --template file-router --add-ons start tanstack-query\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://tanstack.com/start",
    pageType: "tech",
    targetAudience: "developers",
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
        description:
          "Service workers cache assets and API responses — your app works without a network connection.",
      },
      {
        icon: "Smartphone",
        title: "Install to home screen",
        description:
          "Web app manifest enables add-to-home-screen on mobile and desktop — no app store required.",
      },
      {
        icon: "Radio",
        title: "Push notifications",
        description:
          "Web Push API for re-engagement notifications — reach users even when the browser is closed.",
      },
      {
        icon: "Gauge",
        title: "App shell architecture",
        description:
          "Cache the app shell for instant load, then fetch dynamic content — native-app-like speed on the web.",
      },
      {
        icon: "Package",
        title: "Workbox integration",
        description:
          "Google's Workbox handles caching strategies, precaching, and background sync — production-grade service worker tooling.",
      },
      {
        icon: "Monitor",
        title: "Desktop installable",
        description:
          "PWAs install as standalone desktop apps on Chrome, Edge, and Safari — full window, taskbar icon, no browser chrome.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }],
    overview:
      "Progressive Web Apps (PWAs) bring native app capabilities to the web — offline support, push notifications, home screen installation, and background sync — without requiring an app store listing or platform-specific code. PWAs use service workers to cache assets and data, web app manifests for installation, and modern browser APIs for device features. They're the practical choice when you want app-like experiences on mobile and desktop without maintaining separate native codebases. A well-built PWA loads instantly, works offline, and is discoverable via search engines — something no native app can match.",
    challenges: [
      {
        title: "Service worker lifecycle management",
        description:
          "Service workers have a complex lifecycle (install, activate, fetch) with caching strategies that can serve stale content if not configured correctly. Debugging cache issues is notoriously difficult.",
      },
      {
        title: "Cross-browser API support",
        description:
          "Not all PWA features work everywhere — iOS Safari has limited push notification support, background sync availability varies, and web app manifest behavior differs between Chrome, Firefox, and Safari.",
      },
      {
        title: "Offline data synchronization",
        description:
          "Building true offline-first apps requires conflict resolution strategies for data that changes while offline. IndexedDB management and sync logic adds significant complexity.",
      },
      {
        title: "iOS limitations and quirks",
        description:
          "Safari on iOS limits PWA capabilities — no push notifications on older versions, limited background processing, and different installation UX. Testing and working around iOS-specific issues is essential.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Workbox for service worker management",
        detail:
          "Google's Workbox library abstracts service worker complexity — precaching, runtime caching strategies, background sync, and cache expiration with a declarative API.",
      },
      {
        tip: "Implement a stale-while-revalidate strategy",
        detail:
          "Serve cached content immediately while fetching fresh content in the background. This gives users instant loads while keeping data reasonably fresh.",
      },
      {
        tip: "Design for offline-first, not offline-last",
        detail:
          "Structure your app to work without a network connection by default. Cache critical assets during service worker installation and handle network failures gracefully in every fetch.",
      },
      {
        tip: "Test the install experience on real devices",
        detail:
          "The PWA install prompt behaves differently on Chrome, Safari, Firefox, and Samsung Internet. Test on real devices to ensure the add-to-home-screen flow works for your users.",
      },
    ],
    usefulLinks: [
      {
        title: "web.dev PWA Guide",
        url: "https://web.dev/progressive-web-apps",
        type: "docs",
      },
      {
        title: "Workbox Documentation",
        url: "https://developer.chrome.com/docs/workbox",
        type: "docs",
      },
      {
        title: "PWA Builder",
        url: "https://www.pwabuilder.com",
        type: "tool",
      },
      {
        title: "Service Worker API (MDN)",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "PWA vs. native app — which should I build?",
        answer:
          "Build a PWA when you want broad reach via the web, SEO discoverability, and lower development costs. Build native (React Native, Flutter) when you need advanced device APIs, App Store presence, or complex offline functionality. Many businesses start with a PWA and add native apps later.",
      },
      {
        question: "How much does it cost to build a PWA?",
        answer:
          "Adding PWA capabilities (service worker, manifest, offline support) to an existing web app costs $3K–10K. Building a full PWA from scratch with offline-first architecture, push notifications, and sync runs $15K–50K+.",
      },
      {
        question: "Do PWAs work on iOS?",
        answer:
          "Yes, with caveats. iOS Safari supports service workers, offline caching, and home screen installation. Push notifications are supported from iOS 16.4+. Some features like background sync are still limited on iOS.",
      },
      {
        question: "Can PWAs be listed on app stores?",
        answer:
          "Yes — tools like PWABuilder can package your PWA for the Microsoft Store and Google Play Store. Apple's App Store has stricter requirements but TWA (Trusted Web Activity) packaging is an option for Android.",
      },
    ],
    quickstart: "npm install workbox-webpack-plugin\nnpx workbox wizard",
    quickstartLang: "bash",
    docsUrl: "https://web.dev/progressive-web-apps",
    pageType: "tech",
    targetAudience: "developers",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Flutter is Google's open-source UI framework for building natively compiled applications from a single Dart codebase. Unlike React Native, Flutter draws every pixel itself using its own rendering engine (Skia/Impeller), delivering pixel-perfect consistency across iOS, Android, web, Windows, macOS, and Linux.\n\nFlutter's widget-based architecture, hot reload for instant development feedback, and rich Material and Cupertino widget libraries make it possible to build beautiful, performant apps with a single team. The pub.dev ecosystem provides 40k+ packages for Firebase, payments, maps, and more.",
    challenges: [
      {
        title: "Dart language adoption",
        description:
          "Dart is less widely known than JavaScript or Kotlin. Teams need to invest in learning Dart's syntax, null safety, and async patterns — though most developers pick it up quickly.",
      },
      {
        title: "Native platform integration",
        description:
          "Accessing platform-specific APIs (Bluetooth, NFC, specific hardware) may require writing platform channel code in Kotlin/Swift. The plugin ecosystem covers most common needs but edge cases exist.",
      },
      {
        title: "Web and desktop maturity",
        description:
          "Flutter for web and desktop is production-ready but the ecosystem and community support are smaller than for mobile. SEO on Flutter web requires additional server-side rendering setup.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Riverpod for state management",
        detail:
          "Riverpod provides compile-safe, testable state management with dependency injection — the recommended choice for new Flutter projects.",
      },
      {
        tip: "Leverage hot reload during development",
        detail:
          "Flutter's sub-second hot reload preserves app state while reflecting code changes — use it aggressively for rapid UI iteration.",
      },
      {
        tip: "Follow Material 3 design guidelines",
        detail:
          "Flutter's Material 3 widgets provide dynamic color theming, updated components, and adaptive layouts — a polished look with minimal custom styling.",
      },
    ],
    usefulLinks: [
      {
        title: "Flutter Documentation",
        url: "https://docs.flutter.dev/",
        type: "docs",
      },
      {
        title: "Flutter Codelabs",
        url: "https://docs.flutter.dev/codelabs",
        type: "tutorial",
      },
      {
        title: "pub.dev (Dart/Flutter packages)",
        url: "https://pub.dev/",
        type: "tool",
      },
      {
        title: "Flutter Community",
        url: "https://flutter.dev/community",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Flutter development cost?",
        answer:
          "Flutter and Dart are free and open-source. Development costs depend on app complexity — a single codebase for both iOS and Android typically saves 30-40% compared to separate native apps. A typical Flutter app takes 8-16 weeks for a full-featured MVP.",
      },
      {
        question: "Flutter vs React Native — which is better?",
        answer:
          "Flutter renders its own pixels for perfect design consistency and smooth animations. React Native uses native platform components and benefits from the JavaScript ecosystem. Choose Flutter for design-heavy apps; choose React Native when you want to leverage existing web/JS skills.",
      },
      {
        question: "Is Flutter good for web applications?",
        answer:
          "Flutter web is production-ready for app-like experiences (dashboards, tools) but not ideal for content-heavy websites needing SEO. For web-first projects, consider React or Next.js; for app-first projects that also need web, Flutter is a strong choice.",
      },
    ],
    quickstart:
      "# Install Flutter\nbrew install flutter\n\n# Create a new project\nflutter create myapp\ncd myapp\n\n# Run on a connected device or simulator\nflutter run\n\n# Run on web\nflutter run -d chrome",
    quickstartLang: "bash",
    docsUrl: "https://docs.flutter.dev/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Unistyles 3.0 is a high-performance styling library for React Native that runs entirely on the C++ JSI layer — zero JavaScript bridge overhead, true 120fps styling without compromise. It brings web-like design tokens, responsive breakpoints, variants, and dark mode to React Native.\n\nUnistyles replaces StyleSheet.create with a more powerful API that supports theming, media queries, and compound variants while generating the same flat style objects React Native expects. It's the styling solution for teams that want design system capabilities without sacrificing performance.",
    challenges: [
      {
        title: "JSI dependency requirements",
        description:
          "Unistyles 3.0 requires the new React Native architecture (JSI/TurboModules). Expo SDK 51+ supports this out of the box, but older projects may need architecture migration.",
      },
      {
        title: "Migration from StyleSheet",
        description:
          "Moving from StyleSheet.create to Unistyles' createStyleSheet requires updating every style definition. The API is similar but not identical — plan for incremental migration.",
      },
      {
        title: "Community ecosystem size",
        description:
          "Unistyles has a smaller community than NativeWind/Tailwind. Fewer examples and Stack Overflow answers exist, though the documentation is comprehensive.",
      },
    ],
    bestPractices: [
      {
        tip: "Define a theme with design tokens",
        detail:
          "Create a centralized theme with colors, spacing, typography, and breakpoints — Unistyles distributes these tokens to every stylesheet automatically.",
      },
      {
        tip: "Use variants for component states",
        detail:
          "Button sizes, color variants, and disabled states belong in the stylesheet as variants — not as conditional logic in your component.",
      },
      {
        tip: "Use responsive breakpoints for tablets",
        detail:
          "Define breakpoints for phone, tablet, and foldable layouts — Unistyles applies the correct styles automatically based on screen size.",
      },
    ],
    usefulLinks: [
      {
        title: "Unistyles Documentation",
        url: "https://unistyl.es/",
        type: "docs",
      },
      {
        title: "Unistyles Getting Started",
        url: "https://unistyl.es/start/setup/",
        type: "tutorial",
      },
      {
        title: "Unistyles GitHub",
        url: "https://github.com/jpudysz/react-native-unistyles",
        type: "community",
      },
      {
        title: "React Native New Architecture",
        url: "https://reactnative.dev/docs/the-new-architecture/landing-page",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does Unistyles cost?",
        answer:
          "Unistyles is completely free and open-source (MIT license). There are no paid tiers or premium features.",
      },
      {
        question: "Unistyles vs NativeWind — which should I use?",
        answer:
          "NativeWind brings Tailwind CSS utility classes to React Native — great if your team already knows Tailwind. Unistyles is a standalone design system with JSI performance, variants, and breakpoints — better for custom design systems. Choose based on your team's styling preference.",
      },
      {
        question: "Does Unistyles work with Expo?",
        answer:
          "Yes. Unistyles works with Expo SDK 51+ using the new architecture. It's compatible with Expo's development builds and EAS Build.",
      },
    ],
    quickstart:
      "npm install react-native-unistyles\n\n# For Expo\nnpx expo install react-native-unistyles\n\n# Create your theme and breakpoints\n# See https://unistyl.es/start/setup/ for configuration",
    quickstartLang: "bash",
    docsUrl: "https://unistyl.es/",
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
    overview:
      "oRPC combines the developer experience of tRPC with OpenAPI specification generation — define your procedures once and get type-safe client calls for internal consumers and a standards-compliant OpenAPI schema for external partners. At A Major, we recommend oRPC for teams that want tRPC-style DX but also need to expose documented REST APIs.\n\noRPC supports Zod and Valibot for validation, generates OpenAPI 3.1 schemas automatically, and integrates with Next.js, Hono, and Fastify. Its React Query client provides typed query and mutation hooks — the same ergonomics as tRPC with broader interoperability.",
    challenges: [
      {
        title: "Early-stage ecosystem",
        description:
          "oRPC is newer than tRPC with a smaller community. Expect fewer third-party plugins, tutorials, and Stack Overflow answers.",
      },
      {
        title: "Migration from tRPC",
        description:
          "While conceptually similar, migrating from tRPC to oRPC requires rewriting router definitions and updating client code.",
      },
      {
        title: "OpenAPI schema complexity",
        description:
          "Auto-generated OpenAPI schemas can become large and require manual refinement for clean public documentation.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Zod for input/output schemas",
        detail:
          "Zod schemas provide runtime validation, TypeScript types, and feed directly into OpenAPI generation — one schema does triple duty.",
      },
      {
        tip: "Organize procedures by domain",
        detail:
          "Group related procedures into routers by domain feature — keeps the API surface navigable as it grows.",
      },
      {
        tip: "Generate typed clients for external consumers",
        detail:
          "Use the auto-generated OpenAPI spec to produce typed SDKs in TypeScript, Python, and Go for external partners.",
      },
      {
        tip: "Use middleware for cross-cutting concerns",
        detail:
          "Auth, rate limiting, and logging belong in oRPC middleware — not duplicated across individual procedures.",
      },
    ],
    usefulLinks: [
      {
        title: "oRPC Official Documentation",
        url: "https://orpc.unnoq.com",
        type: "docs",
      },
      {
        title: "oRPC GitHub Repository",
        url: "https://github.com/unnoq/orpc",
        type: "community",
      },
      {
        title: "OpenAPI Specification",
        url: "https://spec.openapis.org/oas/v3.1.0",
        type: "docs",
      },
      {
        title: "Zod Documentation",
        url: "https://zod.dev",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "oRPC vs tRPC — what's the difference?",
        answer:
          "oRPC generates an OpenAPI spec alongside type-safe client calls. tRPC is TypeScript-only with no OpenAPI output. Choose oRPC when you need to serve both internal TypeScript clients and external REST consumers.",
      },
      {
        question: "Is oRPC production-ready?",
        answer:
          "oRPC is actively maintained and stable for production use. It's newer than tRPC, so evaluate the community size and plugin availability for your specific needs.",
      },
      {
        question: "Can I migrate from tRPC to oRPC?",
        answer:
          "Yes. The concepts (routers, procedures, middleware) are similar. Migration requires rewriting router definitions but the mental model transfers directly.",
      },
      {
        question: "Does oRPC work with Next.js?",
        answer:
          "Yes. oRPC has official Next.js adapters for both Pages Router and App Router, with server-side procedure calls and React Query integration.",
      },
    ],
    quickstart:
      "npm init -y\nnpm install @orpc/server @orpc/client zod\nnpx tsx src/server.ts",
    quickstartLang: "bash",
    docsUrl: "https://orpc.unnoq.com",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "REST (Representational State Transfer) is the most widely adopted API architectural style — understood by every developer, consumed by any programming language, and debuggable with any HTTP tool. At A Major, we design and build REST APIs that follow industry best practices: consistent resource naming, proper HTTP semantics, versioning strategies, and comprehensive OpenAPI documentation.\n\nA well-designed REST API is a product in itself. We focus on developer experience for API consumers — clear error messages, pagination, filtering, rate limiting, and webhook delivery — ensuring your API is easy to integrate with and reliable at scale.",
    challenges: [
      {
        title: "Over-fetching and under-fetching",
        description:
          "REST endpoints return fixed response shapes. Clients often receive more data than needed or must make multiple requests — consider sparse fieldsets or GraphQL for complex UIs.",
      },
      {
        title: "Versioning strategy decisions",
        description:
          "URL versioning, header versioning, or content negotiation — each approach has trade-offs. Choosing wrong creates migration pain for existing consumers.",
      },
      {
        title: "Consistent error formatting",
        description:
          "Without a standard error format, API consumers face inconsistent error handling. Adopt RFC 7807 Problem Details for structured, machine-readable errors.",
      },
      {
        title: "Rate limiting and abuse prevention",
        description:
          "Public APIs need rate limiting, API key management, and abuse detection. These cross-cutting concerns must be designed from the start, not bolted on later.",
      },
    ],
    bestPractices: [
      {
        tip: "Use OpenAPI 3.1 as your source of truth",
        detail:
          "Define your API contract in OpenAPI first. Generate server stubs, client SDKs, and documentation from the same spec.",
      },
      {
        tip: "Return RFC 7807 Problem Details for errors",
        detail:
          "Structured error responses with type, title, status, and detail fields — machine-readable and consistent.",
      },
      {
        tip: "Implement cursor-based pagination",
        detail:
          "Offset pagination breaks with real-time data. Cursor-based pagination (using opaque tokens) is stable and performant.",
      },
      {
        tip: "Version from day one",
        detail:
          "Even internal APIs benefit from versioning. Start with /v1/ in the URL path — it's the simplest approach for most teams.",
      },
    ],
    usefulLinks: [
      {
        title: "OpenAPI Specification",
        url: "https://spec.openapis.org/oas/v3.1.0",
        type: "docs",
      },
      {
        title: "REST API Design Best Practices",
        url: "https://restfulapi.net",
        type: "tutorial",
      },
      {
        title: "Swagger Editor",
        url: "https://editor.swagger.io",
        type: "tool",
      },
      {
        title: "Postman API Platform",
        url: "https://www.postman.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "REST vs GraphQL — which should I choose?",
        answer:
          "REST for public APIs, simple CRUD, and broad interoperability. GraphQL for complex UIs with varied data needs and internal APIs. REST is simpler to cache and easier for external consumers.",
      },
      {
        question: "How much does REST API development cost?",
        answer:
          "Costs depend on complexity — a simple CRUD API costs $5K–$15K. A production API with auth, versioning, rate limiting, webhooks, and SDK generation ranges from $20K–$80K.",
      },
      {
        question: "What makes a REST API 'RESTful'?",
        answer:
          "Proper HTTP method semantics (GET reads, POST creates, PUT replaces, PATCH updates, DELETE removes), resource-oriented URLs, stateless requests, and hypermedia links for discoverability.",
      },
      {
        question: "Should I use REST or tRPC for my project?",
        answer:
          "Use tRPC for internal TypeScript-to-TypeScript communication. Use REST when you need language-agnostic access, OpenAPI documentation, or third-party integrations.",
      },
    ],
    quickstart:
      "npx create-fastify-app my-api\ncd my-api\nnpm install @fastify/swagger @fastify/swagger-ui\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://spec.openapis.org/oas/v3.1.0",
    pageType: "tech",
    targetAudience: "developers",
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
    overview:
      "WebAssembly (WASM) is a binary instruction format that runs at near-native speed in browsers, on servers via WASI, and at the edge on platforms like Cloudflare Workers. Compiled from Rust, C/C++, Go, or AssemblyScript, WASM executes compute-intensive tasks that JavaScript can't handle efficiently. At A Major, we use WASM for performance-critical browser features, edge computing, and portable server-side modules.\n\nWASM runs in a memory-safe sandbox with capability-based security — no arbitrary filesystem or network access. Combined with SIMD instructions, threading support, and the emerging Component Model for language-agnostic composition, WASM is becoming the universal runtime for portable, high-performance code.",
    challenges: [
      {
        title: "Debugging is harder than JavaScript",
        description:
          "WASM debugging tools are improving but less mature than browser DevTools for JavaScript. Source maps and DWARF debug info help but add complexity.",
      },
      {
        title: "DOM access requires JavaScript glue",
        description:
          "WASM can't directly manipulate the DOM. All browser API calls go through a JavaScript interop layer, which adds latency for DOM-heavy operations.",
      },
      {
        title: "Binary size optimization",
        description:
          "WASM binaries can be large without optimization. wasm-opt, LTO, and careful dependency management are needed to keep download sizes reasonable.",
      },
      {
        title: "WASI standard is still evolving",
        description:
          "The WebAssembly System Interface (WASI) for server-side WASM is still being standardized. API surface and runtime support vary across platforms.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Rust for WASM — it has the best tooling",
        detail:
          "wasm-pack, wasm-bindgen, and the Rust → WASM compilation path are the most mature and produce the smallest binaries.",
      },
      {
        tip: "Offload compute, not DOM manipulation",
        detail:
          "Use WASM for image processing, crypto, parsing, and computation. Keep DOM interaction in JavaScript — the interop overhead isn't worth it for UI work.",
      },
      {
        tip: "Use wasm-opt for binary size reduction",
        detail:
          "Run wasm-opt -Os on your output binary. Combined with gzip/brotli compression, WASM binaries shrink significantly.",
      },
      {
        tip: "Stream-compile with instantiateStreaming",
        detail:
          "WebAssembly.instantiateStreaming() compiles WASM while downloading — faster startup than loading the entire binary first.",
      },
    ],
    usefulLinks: [
      {
        title: "WebAssembly Official Site",
        url: "https://webassembly.org",
        type: "docs",
      },
      {
        title: "wasm-pack (Rust → WASM)",
        url: "https://rustwasm.github.io/wasm-pack/",
        type: "tool",
      },
      {
        title: "MDN WebAssembly Guide",
        url: "https://developer.mozilla.org/en-US/docs/WebAssembly",
        type: "docs",
      },
      {
        title: "Bytecode Alliance (WASI)",
        url: "https://bytecodealliance.org",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Will WebAssembly replace JavaScript?",
        answer:
          "No. WASM complements JavaScript — it handles compute-heavy tasks while JavaScript manages DOM, events, and application logic. They work best together.",
      },
      {
        question: "What languages compile to WASM?",
        answer:
          "Rust, C, C++, Go, AssemblyScript, and Kotlin all compile to WASM. Rust has the best tooling and produces the smallest binaries. AssemblyScript is easiest for TypeScript developers.",
      },
      {
        question: "Is WASM faster than JavaScript?",
        answer:
          "For compute-heavy tasks (image processing, crypto, codecs), WASM runs at 80–90% of native speed — significantly faster than JavaScript. For I/O-bound work, the difference is minimal.",
      },
      {
        question: "Can WASM run on the server?",
        answer:
          "Yes. WASI enables server-side WASM on Node.js, Deno, Cloudflare Workers, and standalone runtimes like Wasmtime and Wasmer. Edge computing platforms are the most common server-side WASM use case.",
      },
    ],
    quickstart:
      "cargo install wasm-pack\nwasm-pack new my-wasm-lib\ncd my-wasm-lib\nwasm-pack build --target web",
    quickstartLang: "bash",
    docsUrl: "https://webassembly.org",
    pageType: "tech",
    targetAudience: "developers",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "ASP.NET Core MVC is the convention-over-configuration web framework in the .NET ecosystem — providing controllers, views, model binding, filters, and a well-understood MVC pattern for server-rendered web applications and REST APIs.\n\nIt's the mature choice for large .NET teams building enterprise applications — with EF Core for data access, ASP.NET Identity for authentication, and Swashbuckle for auto-generated OpenAPI documentation. Blazor components can be embedded in MVC views for adding interactive islands to existing server-rendered pages.",
    challenges: [
      {
        title: "Monolithic architecture tendencies",
        description:
          "MVC applications can grow into monoliths if not carefully structured. Using Areas, feature folders, and service layers helps maintain modularity as the application grows.",
      },
      {
        title: "View rendering performance",
        description:
          "Razor view compilation and server-side rendering add latency compared to static generation. Output caching and response compression help, but consider Blazor or a SPA for highly interactive pages.",
      },
      {
        title: "Modern frontend integration",
        description:
          "Integrating modern frontend tooling (Vite, Tailwind) with MVC views requires additional configuration. The SPA middleware or Blazor integration provides cleaner paths for interactive features.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Minimal API for new endpoints",
        detail:
          "ASP.NET Core supports both MVC controllers and Minimal API endpoints in the same app — use Minimal API for new, simple endpoints and controllers for complex features.",
      },
      {
        tip: "Implement the Repository pattern with EF Core",
        detail:
          "Abstract data access behind repository interfaces for testability. EF Core provides the ORM, repositories provide the abstraction.",
      },
      {
        tip: "Generate OpenAPI specs automatically",
        detail:
          "Swashbuckle generates OpenAPI specs from controller attributes — interactive API documentation with zero manual maintenance.",
      },
    ],
    usefulLinks: [
      {
        title: "ASP.NET Core MVC Documentation",
        url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/overview",
        type: "docs",
      },
      {
        title: "ASP.NET Core Tutorial",
        url: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc",
        type: "tutorial",
      },
      {
        title: "Entity Framework Core",
        url: "https://learn.microsoft.com/en-us/ef/core/",
        type: "docs",
      },
      {
        title: ".NET Community",
        url: "https://dotnet.microsoft.com/en-us/platform/community",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does ASP.NET MVC development cost?",
        answer:
          ".NET is free and open-source. Visual Studio Community is free for small teams. Development costs are comparable to other web frameworks — a typical MVC application takes 8-16 weeks for an enterprise CRUD app with authentication, roles, and reporting.",
      },
      {
        question: "ASP.NET MVC vs Blazor — which .NET framework?",
        answer:
          "MVC is server-rendered with Razor views — proven, well-understood, and great for content-heavy sites and REST APIs. Blazor adds client-side interactivity with C#. For new projects, consider Blazor 8+ with auto render mode; for existing MVC apps, embed Blazor components incrementally.",
      },
      {
        question: "Can I use ASP.NET MVC with modern frontend frameworks?",
        answer:
          "Yes. You can serve a React or Vue SPA from an MVC app, use Blazor components in MVC views, or build a REST API with MVC controllers consumed by any frontend. The MVC pattern is flexible enough to support hybrid architectures.",
      },
    ],
    quickstart:
      "# Create a new MVC app\ndotnet new mvc -o MyApp\ncd MyApp\n\n# Add Entity Framework Core\ndotnet add package Microsoft.EntityFrameworkCore.SqlServer\ndotnet add package Microsoft.EntityFrameworkCore.Tools\n\n# Run in development\ndotnet watch run",
    quickstartLang: "bash",
    docsUrl: "https://learn.microsoft.com/en-us/aspnet/core/mvc/overview",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Supabase is an open-source Firebase alternative built on PostgreSQL. It provides an instant REST and GraphQL API (via PostgREST), real-time subscriptions, row-level security, edge functions (Deno), auth, and S3-compatible storage — all from a single platform.\n\nUnlike Firebase, Supabase doesn't lock you into proprietary tech. Your data lives in standard PostgreSQL, and you can use any Postgres extension (pgvector, PostGIS, pg_cron). Self-hosting is fully supported for teams that need it.",
    challenges: [
      {
        title: "Row-level security policy complexity",
        description:
          "RLS policies are powerful but can become difficult to debug when combining multiple roles, JWT claims, and nested policies. Supabase's policy editor and SQL helpers simplify this.",
      },
      {
        title: "Real-time subscription scaling",
        description:
          "Supabase Realtime works well for moderate workloads but may need careful channel design and message filtering for high-throughput applications.",
      },
      {
        title: "Edge function cold starts",
        description:
          "Supabase Edge Functions (Deno) can have cold starts on the free tier. Warm function strategies and Supabase's regional deployment options help mitigate latency.",
      },
    ],
    bestPractices: [
      {
        tip: "Design RLS policies early",
        detail:
          "Implement row-level security from day one — retrofitting RLS onto an existing schema is significantly harder than building with it from the start.",
      },
      {
        tip: "Use the Supabase client library",
        detail:
          "The @supabase/supabase-js client handles auth, real-time, storage, and database queries with a unified API and automatic token refresh.",
      },
      {
        tip: "Leverage Postgres extensions",
        detail:
          "Enable pgvector for AI embeddings, PostGIS for geospatial queries, or pg_cron for scheduled tasks — all available through Supabase's dashboard.",
      },
    ],
    usefulLinks: [
      {
        title: "Supabase Documentation",
        url: "https://supabase.com/docs",
        type: "docs",
      },
      {
        title: "Supabase Getting Started",
        url: "https://supabase.com/docs/guides/getting-started",
        type: "tutorial",
      },
      {
        title: "Supabase GitHub",
        url: "https://github.com/supabase/supabase",
        type: "community",
      },
      {
        title: "Supabase Dashboard",
        url: "https://supabase.com/dashboard",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does Supabase cost?",
        answer:
          "Supabase has a generous free tier (500MB database, 1GB storage, 50k monthly active users). The Pro plan starts at $25/month with 8GB database and 100GB storage. Enterprise plans are custom-priced.",
      },
      {
        question: "Supabase vs Firebase — which should I use?",
        answer:
          "Supabase gives you standard PostgreSQL (SQL, joins, RLS) with no vendor lock-in. Firebase offers a more polished mobile SDK and better offline support. Choose Supabase for web apps needing relational data; choose Firebase for mobile-first apps needing offline sync.",
      },
      {
        question: "Can I self-host Supabase?",
        answer:
          "Yes. Supabase is fully open-source and provides Docker Compose files for self-hosting. You get the same APIs (Auth, Storage, Realtime, PostgREST) on your own infrastructure.",
      },
    ],
    quickstart:
      "# Create a new Supabase project\nnpx supabase init\nnpx supabase start\n\n# Or use the cloud dashboard\n# Visit https://supabase.com/dashboard to create a project\n\n# Install the client library\nnpm install @supabase/supabase-js",
    quickstartLang: "bash",
    docsUrl: "https://supabase.com/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "PlanetScale is a serverless MySQL platform powered by Vitess — the same technology that scales YouTube's database. It brings Git-like branching, non-blocking schema changes, and unlimited connections to MySQL, making it the most developer-friendly MySQL hosting available.\n\nDeploy requests let teams review schema changes like pull requests before merging to production. Global read replicas, built-in connection pooling, and the PlanetScale Boost query cache deliver sub-millisecond read latency at any scale.",
    challenges: [
      {
        title: "No foreign key constraints",
        description:
          "PlanetScale (via Vitess) doesn't support foreign key constraints at the database level. Referential integrity must be enforced at the application layer or ORM level.",
      },
      {
        title: "Vitess-specific SQL limitations",
        description:
          "Some MySQL features (window functions in older Vitess versions, certain subquery patterns) may behave differently. Testing with PlanetScale's branching system catches these early.",
      },
      {
        title: "Cost management at scale",
        description:
          "PlanetScale's pricing is based on rows read/written. High-throughput analytics queries can be expensive — use PlanetScale Boost caching and query optimization to control costs.",
      },
    ],
    bestPractices: [
      {
        tip: "Use deploy requests for all schema changes",
        detail:
          "Deploy requests show schema diffs, flag destructive changes, and require approval — preventing accidental production data loss.",
      },
      {
        tip: "Enable PlanetScale Boost for hot queries",
        detail:
          "Boost caches query results at the edge with automatic invalidation — dramatically reducing latency for read-heavy workloads.",
      },
      {
        tip: "Create a branch per feature",
        detail:
          "Database branches work like Git branches — each developer gets an isolated copy for schema development and testing.",
      },
    ],
    usefulLinks: [
      {
        title: "PlanetScale Documentation",
        url: "https://planetscale.com/docs",
        type: "docs",
      },
      {
        title: "PlanetScale Getting Started",
        url: "https://planetscale.com/docs/tutorials/planetscale-quick-start-guide",
        type: "tutorial",
      },
      {
        title: "PlanetScale CLI (pscale)",
        url: "https://planetscale.com/docs/reference/planetscale-cli",
        type: "tool",
      },
      {
        title: "Vitess Documentation",
        url: "https://vitess.io/docs/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does PlanetScale cost?",
        answer:
          "PlanetScale offers a free Hobby plan (1 database, 5GB storage, 1 billion rows read/month). The Scaler plan starts at $39/month with 10GB storage and 100 billion rows read/month. Enterprise plans are custom-priced.",
      },
      {
        question: "PlanetScale vs Neon — which serverless database?",
        answer:
          "PlanetScale is MySQL (Vitess) with Git-like branching and non-blocking DDL. Neon is PostgreSQL with compute scaling and database branching. Choose PlanetScale for MySQL workloads; choose Neon for PostgreSQL and its richer feature set.",
      },
      {
        question: "Can PlanetScale handle high traffic?",
        answer:
          "Yes. PlanetScale is built on Vitess, which handles YouTube's database traffic. Horizontal sharding, connection pooling, and global replicas are built into the platform.",
      },
    ],
    quickstart:
      "# Install the PlanetScale CLI\nbrew install planetscale/tap/pscale\n\n# Authenticate\npscale auth login\n\n# Create a database\npscale database create myapp --region us-east\n\n# Create a branch for development\npscale branch create myapp development",
    quickstartLang: "bash",
    docsUrl: "https://planetscale.com/docs",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Cloudflare D1 is a serverless SQLite database that runs at the edge, co-located with your Cloudflare Workers. Your database and compute share the same data centre, eliminating the round-trip latency of remote database calls entirely.\n\nD1 provides full SQLite SQL compatibility (JOINs, transactions, FTS5, JSON functions), Wrangler CLI migrations, automatic read replication, and a web-based D1 Console. Paired with Drizzle ORM, you get type-safe queries on a globally distributed SQLite database.",
    challenges: [
      {
        title: "Write latency to primary region",
        description:
          "D1 replicates reads globally but writes go to the primary region. Write-heavy workloads may experience higher latency from distant regions.",
      },
      {
        title: "SQLite feature boundaries",
        description:
          "D1 inherits SQLite's limitations — no stored procedures, limited ALTER TABLE support, and single-writer concurrency. Design schemas with these constraints in mind.",
      },
      {
        title: "Migration workflow differences",
        description:
          "D1 uses Wrangler CLI for migrations, which differs from traditional ORM migration flows. Drizzle Kit's D1 integration bridges this gap with familiar schema-diff migrations.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Drizzle ORM with D1",
        detail:
          "Drizzle's D1 driver provides type-safe queries with zero overhead — your TypeScript types match your SQLite schema exactly.",
      },
      {
        tip: "Keep databases small and focused",
        detail:
          "D1 works best with focused databases per service rather than one massive database. Use multiple D1 databases for different concerns.",
      },
      {
        tip: "Use Wrangler for local development",
        detail:
          "wrangler dev --local runs D1 locally with a real SQLite file — test your Workers and database queries without deploying.",
      },
    ],
    usefulLinks: [
      {
        title: "Cloudflare D1 Documentation",
        url: "https://developers.cloudflare.com/d1/",
        type: "docs",
      },
      {
        title: "D1 Getting Started",
        url: "https://developers.cloudflare.com/d1/get-started/",
        type: "tutorial",
      },
      {
        title: "Cloudflare Workers + D1",
        url: "https://developers.cloudflare.com/workers/",
        type: "docs",
      },
      {
        title: "Cloudflare Discord",
        url: "https://discord.cloudflare.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Cloudflare D1 cost?",
        answer:
          "D1 has a generous free tier: 5GB storage, 5 million rows read/day, and 100k rows written/day. The paid Workers plan ($5/month) increases limits significantly. D1 is one of the cheapest database options for edge applications.",
      },
      {
        question: "Cloudflare D1 vs Turso — which edge SQLite?",
        answer:
          "D1 is tightly integrated with Cloudflare Workers via native bindings — zero network overhead. Turso (libSQL) works with any runtime and offers embedded replicas. Choose D1 if you're on Cloudflare; choose Turso for multi-cloud or non-Cloudflare deployments.",
      },
      {
        question: "Is D1 ready for production?",
        answer:
          "Yes. D1 exited beta and is generally available. It supports transactions, automatic backups, and point-in-time restore. For read-heavy edge applications, it's an excellent production choice.",
      },
    ],
    quickstart:
      "# Create a D1 database\nnpx wrangler d1 create myapp\n\n# Run a migration\nnpx wrangler d1 execute myapp --local --file=./schema.sql\n\n# Or use Drizzle Kit with D1\nnpm install drizzle-orm\nnpx drizzle-kit generate\nnpx wrangler d1 migrations apply myapp",
    quickstartLang: "bash",
    docsUrl: "https://developers.cloudflare.com/d1/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "MySQL is the world's most popular open-source relational database, powering applications from WordPress to Shopify. With InnoDB's ACID transactions, mature replication, and broad ORM support, MySQL is a reliable choice for web applications, e-commerce, and content platforms.\n\nPlanetScale brings MySQL into the modern era with serverless scaling, non-blocking schema changes via Vitess, and Git-like branching for databases. Whether you're running a Laravel app or a TypeScript backend with Prisma, MySQL delivers proven reliability at any scale.",
    challenges: [
      {
        title: "Schema migrations on large tables",
        description:
          "ALTER TABLE on tables with millions of rows can lock the table for extended periods. PlanetScale's non-blocking DDL or pt-online-schema-change are essential for zero-downtime migrations.",
      },
      {
        title: "Character encoding and collation",
        description:
          "MySQL's default collation (utf8mb4_0900_ai_ci in 8.0) handles most use cases, but emoji, case sensitivity, and locale-specific sorting require deliberate collation choices.",
      },
      {
        title: "Query optimizer limitations",
        description:
          "MySQL's query optimizer can struggle with complex subqueries and derived tables compared to PostgreSQL. Rewriting as JOINs or using generated columns often resolves performance issues.",
      },
    ],
    bestPractices: [
      {
        tip: "Use InnoDB for all tables",
        detail:
          "InnoDB provides transactions, row-level locking, and foreign keys. There's rarely a reason to use MyISAM in modern MySQL.",
      },
      {
        tip: "Use PlanetScale for serverless workloads",
        detail:
          "PlanetScale handles connection pooling, branching, and non-blocking DDL — solving MySQL's biggest operational pain points.",
      },
      {
        tip: "Index strategy: covering indexes",
        detail:
          "Design indexes that include all columns needed by your query (covering indexes) to avoid table lookups entirely.",
      },
      {
        tip: "Enable slow query log",
        detail:
          "Set long_query_time to 1s and analyze slow queries with EXPLAIN — the fastest path to performance improvements.",
      },
    ],
    usefulLinks: [
      {
        title: "MySQL Reference Manual",
        url: "https://dev.mysql.com/doc/refman/8.0/en/",
        type: "docs",
      },
      {
        title: "PlanetScale Documentation",
        url: "https://planetscale.com/docs",
        type: "docs",
      },
      {
        title: "MySQL Tutorial",
        url: "https://www.mysqltutorial.org/",
        type: "tutorial",
      },
      {
        title: "MySQL Community",
        url: "https://forums.mysql.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does MySQL development cost?",
        answer:
          "MySQL Community Edition is free. PlanetScale starts with a free tier (1 database, 5GB) with paid plans from $39/month. Development costs depend on complexity — a typical CRUD API takes 2-4 weeks, while a complex multi-tenant platform takes 8-16 weeks.",
      },
      {
        question: "MySQL vs PostgreSQL — which should I choose?",
        answer:
          "MySQL is simpler to operate, has excellent replication, and dominates in PHP/WordPress ecosystems. PostgreSQL offers more advanced features (JSONB, FTS, extensions). For TypeScript projects, PostgreSQL usually wins. For Laravel/PHP or WordPress projects, MySQL is the natural choice.",
      },
      {
        question: "Is MySQL still relevant in 2025?",
        answer:
          "Absolutely. MySQL powers some of the largest applications in the world and continues active development. With PlanetScale bringing Vitess-powered serverless scaling and Git-like branching, MySQL has a modern, developer-friendly future.",
      },
    ],
    quickstart:
      '# Install MySQL locally\nbrew install mysql\nbrew services start mysql\n\n# Create a database\nmysql -u root -e "CREATE DATABASE myapp;"\n\n# Or use PlanetScale\npscale database create myapp --region us-east',
    quickstartLang: "bash",
    docsUrl: "https://dev.mysql.com/doc/refman/8.0/en/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Docker containerizes your application so that development, staging, and production environments are identical. Multi-stage Dockerfiles produce small, secure production images while keeping build tooling out of the final artifact. Docker Compose orchestrates multi-service stacks (app, database, cache, reverse proxy) in a single configuration file.\n\nFrom single-container deployments to Kubernetes-ready microservices, Docker is the foundation of modern deployment infrastructure. CI/CD pipelines build, tag, and push Docker images to registries like Docker Hub, GHCR, or AWS ECR for immutable, versioned releases.",
    challenges: [
      {
        title: "Image size optimization",
        description:
          "Naive Dockerfiles produce large images (1GB+). Multi-stage builds, alpine base images, and careful layer ordering are essential for production-grade containers.",
      },
      {
        title: "Build caching in CI",
        description:
          "Docker layer caching in CI environments (GitHub Actions, GitLab CI) requires explicit configuration. Without caching, every CI build starts from scratch, wasting time.",
      },
      {
        title: "Security vulnerabilities in base images",
        description:
          "Base images accumulate CVEs over time. Regular rebuilds, vulnerability scanning (Trivy, Docker Scout), and minimal base images reduce your attack surface.",
      },
    ],
    bestPractices: [
      {
        tip: "Use multi-stage builds",
        detail:
          "Separate build and runtime stages — install dev dependencies and compile in the build stage, copy only the final artifact to a slim runtime image.",
      },
      {
        tip: "Run as non-root user",
        detail:
          "Add USER node (or equivalent) in your Dockerfile — running as root in production containers is a security risk.",
      },
      {
        tip: "Scan images for vulnerabilities",
        detail:
          "Run Trivy or Docker Scout in CI to catch CVEs before deployment. Block deployments with critical vulnerabilities.",
      },
      {
        tip: "Use .dockerignore",
        detail:
          "Exclude node_modules, .git, and build artifacts from the Docker context — faster builds and smaller images.",
      },
    ],
    usefulLinks: [
      {
        title: "Docker Documentation",
        url: "https://docs.docker.com/",
        type: "docs",
      },
      {
        title: "Dockerfile Best Practices",
        url: "https://docs.docker.com/build/building/best-practices/",
        type: "tutorial",
      },
      {
        title: "Docker Hub",
        url: "https://hub.docker.com/",
        type: "tool",
      },
      {
        title: "Docker Community",
        url: "https://forums.docker.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Docker cost?",
        answer:
          "Docker Desktop is free for personal use and small businesses (under $10M revenue). Pro plans start at $5/month. Docker Hub offers free public repositories and one private repository. CI/CD integration is free with any registry.",
      },
      {
        question: "Docker vs Kubernetes — what's the difference?",
        answer:
          "Docker containerizes individual applications. Kubernetes orchestrates many containers across a cluster with auto-scaling, rolling deployments, and service discovery. Most projects start with Docker and Docker Compose, then graduate to Kubernetes when they need multi-node orchestration.",
      },
      {
        question: "Do I need Docker for development?",
        answer:
          "Docker Compose is excellent for running databases, caches, and other services locally without installing them natively. For the application itself, running natively during development with Docker for dependencies is often the best balance.",
      },
    ],
    quickstart:
      "# Initialize a Dockerfile\ndocker init\n\n# Build an image\ndocker build -t myapp .\n\n# Run with Docker Compose\ndocker compose up -d\n\n# Scan for vulnerabilities\ndocker scout quickview",
    quickstartLang: "bash",
    docsUrl: "https://docs.docker.com/",
  },
  {
    slug: "s3",
    name: "S3",
    category: "database",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Amazon S3 (Simple Storage Service) is the industry standard for object storage — storing files, media, backups, and static assets at any scale. Its API has become the de facto standard, supported by compatible services like Cloudflare R2, Supabase Storage, and MinIO.\n\nS3 integrates with CDNs (CloudFront, Cloudflare) for global asset delivery, supports presigned URLs for secure direct browser uploads, and provides lifecycle policies for automatic data tiering and cleanup. Whether you're storing user uploads, serving a static site, or archiving terabytes of data, S3's API is the universal interface.",
    challenges: [
      {
        title: "Egress cost management",
        description:
          "AWS S3 charges for data transfer out (egress). High-bandwidth applications can accumulate significant egress fees. Cloudflare R2 (zero egress) or CloudFront CDN caching can dramatically reduce costs.",
      },
      {
        title: "Access control complexity",
        description:
          "S3 bucket policies, IAM policies, and ACLs can interact in confusing ways. Start with private buckets and presigned URLs — avoid public bucket access unless absolutely necessary.",
      },
      {
        title: "Eventual consistency awareness",
        description:
          "S3 provides strong read-after-write consistency for PUTs, but listing operations may show stale results briefly. Design your application to handle this for listing-dependent workflows.",
      },
    ],
    bestPractices: [
      {
        tip: "Use presigned URLs for uploads",
        detail:
          "Generate server-side presigned URLs and let clients upload directly to S3 — bypasses your server, reduces bandwidth costs, and scales infinitely.",
      },
      {
        tip: "Put a CDN in front of public assets",
        detail:
          "CloudFront or Cloudflare in front of S3 caches assets at edge locations — faster delivery and lower S3 egress costs.",
      },
      {
        tip: "Configure lifecycle policies",
        detail:
          "Automatically transition old objects to cheaper storage classes (Glacier) or delete expired files — cost control without manual intervention.",
      },
    ],
    usefulLinks: [
      {
        title: "Amazon S3 Documentation",
        url: "https://docs.aws.amazon.com/s3/",
        type: "docs",
      },
      {
        title: "AWS S3 Getting Started",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html",
        type: "tutorial",
      },
      {
        title: "AWS SDK for JavaScript",
        url: "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/",
        type: "docs",
      },
      {
        title: "MinIO (Self-hosted S3)",
        url: "https://min.io/docs/minio/linux/index.html",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does S3 cost?",
        answer:
          "AWS S3 Standard costs ~$0.023/GB/month for storage. PUT requests cost $0.005 per 1,000. Egress is $0.09/GB (first 10TB). For zero egress costs, use Cloudflare R2 ($0.015/GB/month storage, free egress). MinIO is free and self-hosted.",
      },
      {
        question: "S3 vs Cloudflare R2 — which should I use?",
        answer:
          "R2 is S3-compatible with zero egress fees — ideal for high-bandwidth workloads. AWS S3 has a richer feature set (Glacier, analytics, event notifications) and deeper AWS ecosystem integration. Choose R2 for cost savings on bandwidth; choose S3 for the full AWS integration.",
      },
      {
        question: "Can I use S3 for hosting a static website?",
        answer:
          "Yes. S3 static website hosting with CloudFront CDN is a popular and cost-effective way to host static sites and SPAs. For more features, consider Vercel or Netlify which handle this automatically.",
      },
    ],
    quickstart:
      "# Install AWS CLI\nbrew install awscli\naws configure\n\n# Create a bucket\naws s3 mb s3://my-bucket\n\n# Upload a file\naws s3 cp ./file.txt s3://my-bucket/\n\n# Or use the JavaScript SDK\nnpm install @aws-sdk/client-s3",
    quickstartLang: "bash",
    docsUrl: "https://docs.aws.amazon.com/s3/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "CLI (Command Line Interface) tools are the backbone of developer workflows — from project scaffolding and deployment scripts to internal automation and developer experience tooling. We build CLIs in TypeScript/Node.js for ecosystem compatibility or Rust for maximum performance and single-binary distribution.\n\nModern CLI development includes interactive prompts (Clack, Inquirer, Bubbletea), rich terminal output with colors and spinners, auto-update mechanisms, shell completion scripts, and distribution via npm, Homebrew, or GitHub Releases.",
    challenges: [
      {
        title: "Cross-platform compatibility",
        description:
          "CLIs must handle path separators, shell differences, and encoding across Windows, macOS, and Linux. Testing on all target platforms is essential.",
      },
      {
        title: "Distribution and updates",
        description:
          "Distributing CLIs to non-developers (outside npm) requires packaging strategies — Homebrew taps, standalone binaries, or installer scripts. Auto-update mechanisms keep tools current.",
      },
      {
        title: "Error handling and help text",
        description:
          "CLI users can't see your source code. Clear error messages, --help documentation, and shell completions are the UX of command-line tools.",
      },
    ],
    bestPractices: [
      {
        tip: "Use interactive prompts for complex inputs",
        detail:
          "Libraries like Clack or Inquirer provide guided interactive flows — the same UX as create-next-app for your own CLI tools.",
      },
      {
        tip: "Provide shell completions",
        detail:
          "Generate bash/zsh/fish completion scripts so users can tab-complete commands and flags — essential for professional CLI ergonomics.",
      },
      {
        tip: "Distribute as a single binary for Rust CLIs",
        detail:
          "Rust CLIs compile to a single binary with no runtime dependencies — users download and run without installing Node.js or Python.",
      },
    ],
    usefulLinks: [
      {
        title: "Commander.js (Node CLI)",
        url: "https://github.com/tj/commander.js",
        type: "docs",
      },
      {
        title: "Clap (Rust CLI)",
        url: "https://docs.rs/clap/latest/clap/",
        type: "docs",
      },
      {
        title: "Clack (Interactive prompts)",
        url: "https://github.com/bombshell-dev/clack",
        type: "tool",
      },
      {
        title: "Building CLIs with Node.js",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How much does CLI development cost?",
        answer:
          "CLI tools are relatively quick to build — a basic CLI takes 1-2 weeks, a full-featured CLI with interactive prompts, auto-update, and shell completions takes 3-6 weeks. Rust CLIs take slightly longer due to the language learning curve but produce superior distributable binaries.",
      },
      {
        question: "TypeScript vs Rust for CLI tools?",
        answer:
          "TypeScript CLIs are faster to develop and can leverage the npm ecosystem. Rust CLIs start instantly, use less memory, and distribute as a single binary. Choose TypeScript for internal tools and npm-distributed CLIs; choose Rust for performance-critical tools or standalone distribution.",
      },
      {
        question: "How do I distribute a CLI tool?",
        answer:
          "For Node.js CLIs: publish to npm with a bin field. For Rust CLIs: publish to crates.io or distribute binaries via GitHub Releases. Both can be installed via Homebrew with a custom tap.",
      },
    ],
    quickstart:
      "# Create a TypeScript CLI\nmkdir my-cli && cd my-cli\nnpm init -y\nnpm install commander clack\n\n# Or create a Rust CLI\ncargo init my-cli\ncargo add clap --features derive\n\n# Run your CLI\nnpx tsx src/index.ts  # TypeScript\ncargo run              # Rust",
    quickstartLang: "bash",
    docsUrl: "https://github.com/tj/commander.js",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Terminal User Interfaces (TUIs) bring dashboard-style interactivity to the terminal — tables, charts, input fields, and keyboard navigation without a web server. TUIs are built in Rust (Ratatui), Go (Bubble Tea), or Python (Textual) for internal tools, monitoring dashboards, and developer utilities.\n\nTUIs are ideal for power users who live in the terminal — system monitoring, log viewers, database browsers, and configuration tools that need rich interaction but not a web UI. They deploy as single binaries and work over SSH.",
    challenges: [
      {
        title: "Terminal compatibility",
        description:
          "Different terminals (iTerm2, Windows Terminal, tmux) support different capabilities. Testing across terminals and handling fallbacks for missing features is important.",
      },
      {
        title: "Layout complexity",
        description:
          "Terminal UIs work in a character grid, not a pixel grid. Complex layouts require careful constraint-based sizing and handling terminal resize events.",
      },
      {
        title: "Input handling across platforms",
        description:
          "Keyboard input varies between terminals and operating systems. Libraries like crossterm (Rust) and termbox (Go) abstract these differences but edge cases exist.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Elm architecture for state management",
        detail:
          "Bubble Tea (Go) and Ratatui (Rust) both use an Elm-inspired model-update-view pattern — clean separation of state, logic, and rendering.",
      },
      {
        tip: "Design for keyboard-first interaction",
        detail:
          "TUI users expect vim-style keybindings, modal navigation, and no mouse requirement — design your interaction model around the keyboard.",
      },
      {
        tip: "Handle terminal resize gracefully",
        detail:
          "Users resize terminals constantly. Your TUI must re-layout on resize events without losing state or crashing.",
      },
    ],
    usefulLinks: [
      {
        title: "Ratatui (Rust TUI)",
        url: "https://ratatui.rs/",
        type: "docs",
      },
      {
        title: "Bubble Tea (Go TUI)",
        url: "https://github.com/charmbracelet/bubbletea",
        type: "docs",
      },
      {
        title: "Textual (Python TUI)",
        url: "https://textual.textualize.io/",
        type: "docs",
      },
      {
        title: "Charm (Go TUI ecosystem)",
        url: "https://charm.sh/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does TUI development cost?",
        answer:
          "TUI frameworks are free and open-source. Development costs depend on complexity — a simple dashboard takes 2-4 weeks, a full-featured interactive tool with multiple views and real-time updates takes 6-10 weeks. Rust and Go TUIs take slightly longer but produce superior performance.",
      },
      {
        question: "Ratatui vs Bubble Tea — which TUI framework?",
        answer:
          "Ratatui (Rust) provides maximum performance and compile-time safety — best for system tools and high-throughput dashboards. Bubble Tea (Go) is simpler to learn with an excellent component ecosystem (Charm). Choose based on your team's language preference.",
      },
      {
        question: "When should I build a TUI vs a web dashboard?",
        answer:
          "Build a TUI when your users are developers who live in the terminal, when you need to work over SSH, or when you want single-binary distribution. Build a web dashboard when non-technical users need access or when you need rich visualizations.",
      },
    ],
    quickstart:
      "# Rust TUI with Ratatui\ncargo init my-tui\ncargo add ratatui crossterm\n\n# Go TUI with Bubble Tea\ngo mod init my-tui\ngo get github.com/charmbracelet/bubbletea\n\n# Python TUI with Textual\npip install textual\ntextual run my_app.py",
    quickstartLang: "bash",
    docsUrl: "https://ratatui.rs/",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Model Context Protocol (MCP) is an open standard for connecting AI assistants to external data sources, tools, and workflows. MCP servers expose callable tools (actions) and readable resources (data) that AI clients like Claude, Cursor, and Windsurf can use to interact with your systems.\n\nWe build custom MCP servers that connect your database, APIs, internal tools, and business workflows to AI agents — with proper authentication (OAuth 2.1), access control, and audit logging. MCP turns your existing infrastructure into AI-accessible capabilities.",
    challenges: [
      {
        title: "Tool design for AI agents",
        description:
          "AI agents interact differently than humans — tool descriptions, parameter naming, and response formatting must be optimized for LLM understanding, not just human readability.",
      },
      {
        title: "Security and access control",
        description:
          "MCP servers expose your systems to AI agents. Implementing proper authentication, authorization, and audit logging is critical to prevent unintended data access or actions.",
      },
      {
        title: "Transport and deployment options",
        description:
          "MCP supports stdio (local) and HTTP/SSE (remote) transports. Choosing the right transport depends on whether the server runs locally or as a remote service.",
      },
    ],
    bestPractices: [
      {
        tip: "Write clear tool descriptions",
        detail:
          "Tool names and descriptions are your API surface for AI agents — clear, specific descriptions with example inputs dramatically improve agent success rates.",
      },
      {
        tip: "Implement OAuth 2.1 for remote servers",
        detail:
          "Remote MCP servers should use OAuth 2.1 authentication — AI clients authenticate like any other API client with proper scopes and token management.",
      },
      {
        tip: "Return structured, concise responses",
        detail:
          "MCP tool responses are consumed by LLMs. Return structured data with clear labels — avoid dumping raw database rows or verbose error messages.",
      },
    ],
    usefulLinks: [
      {
        title: "MCP Specification",
        url: "https://modelcontextprotocol.io/",
        type: "docs",
      },
      {
        title: "MCP TypeScript SDK",
        url: "https://github.com/modelcontextprotocol/typescript-sdk",
        type: "docs",
      },
      {
        title: "MCP Servers Registry",
        url: "https://github.com/modelcontextprotocol/servers",
        type: "community",
      },
      {
        title: "Building MCP Servers Tutorial",
        url: "https://modelcontextprotocol.io/quickstart/server",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How much does MCP server development cost?",
        answer:
          "MCP SDKs are free and open-source. A basic MCP server with a few tools takes 1-2 weeks. A comprehensive server with auth, database access, and workflow automation takes 4-8 weeks. Running costs depend on your hosting — MCP servers are lightweight Node.js or Python services.",
      },
      {
        question: "MCP vs custom API — why use MCP?",
        answer:
          "MCP provides a standardized protocol that works with any AI client (Claude, Cursor, Windsurf, etc.) without building custom integrations for each. Build one MCP server, and every AI tool can use it — similar to how REST APIs standardized web service communication.",
      },
      {
        question: "Which AI tools support MCP?",
        answer:
          "Claude Desktop, Cursor, Windsurf, Continue, Cline, and many other AI development tools support MCP. The protocol is backed by Anthropic and has growing industry adoption.",
      },
    ],
    quickstart:
      "# Create an MCP server with TypeScript\nnpm init -y\nnpm install @modelcontextprotocol/sdk\n\n# Or use the official create template\nnpx @modelcontextprotocol/create-server my-mcp-server\ncd my-mcp-server\nnpm install\nnpm run build",
    quickstartLang: "bash",
    docsUrl: "https://modelcontextprotocol.io/",
  },

  // ─── SVELTEKIT ──────────────────────────────────────────────────
  {
    slug: "sveltekit",
    name: "SvelteKit",
    category: "full-stack",
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
    overview:
      "SvelteKit is the official full-stack framework for Svelte — providing file-based routing, server-only load functions, progressive form actions, and deployment adapters for every major platform. It compiles your Svelte components to minimal JavaScript while giving you a production-ready framework with SSR, streaming, code splitting, and edge deployment out of the box. SvelteKit's progressive enhancement philosophy means forms and navigation work without JavaScript and enhance when available. Combined with Svelte 5's runes for reactivity and adapters for Vercel, Cloudflare Workers, Node, or static output, SvelteKit is the complete platform for building fast, accessible web applications.",
    challenges: [
      {
        title: "Load function data flow patterns",
        description:
          "Understanding when to use +page.server.ts vs. +page.ts load functions, how data cascades through layouts, and when invalidation triggers requires careful study of SvelteKit's data flow model.",
      },
      {
        title: "Form action error handling",
        description:
          "SvelteKit's progressive form actions are powerful but handling validation errors, redirect flows, and multiple actions per page introduces patterns that differ from typical SPA form handling.",
      },
      {
        title: "Adapter-specific deployment gotchas",
        description:
          "Each deployment adapter (Vercel, Cloudflare, Node, static) has different capabilities and limitations — edge function size limits, environment variable access, and API behavior vary per target.",
      },
      {
        title: "Svelte 5 runes + SvelteKit integration",
        description:
          "Migrating SvelteKit apps to Svelte 5 runes while maintaining proper SSR, load function patterns, and store compatibility requires understanding both the new reactivity model and SvelteKit conventions.",
      },
    ],
    bestPractices: [
      {
        tip: "Use +page.server.ts for data that touches secrets",
        detail:
          "Server-only load functions never send their code to the client. Default to +page.server.ts and only use +page.ts (universal load) when you need the data during client-side navigation without a server round-trip.",
      },
      {
        tip: "Leverage form actions for mutations",
        detail:
          "SvelteKit's form actions handle POST requests with progressive enhancement — they work without JavaScript and enhance with client-side behavior. Prefer them over manual fetch() for form submissions.",
      },
      {
        tip: "Use streaming for slow data",
        detail:
          "Return promises from load functions to stream slow data while rendering the fast parts of the page immediately. Users see content sooner without waiting for every database query.",
      },
      {
        tip: "Implement hooks for cross-cutting concerns",
        detail:
          "SvelteKit's handle hook in hooks.server.ts runs on every request — use it for auth checks, request logging, security headers, and locale detection in one centralized location.",
      },
    ],
    usefulLinks: [
      {
        title: "SvelteKit Documentation",
        url: "https://svelte.dev/docs/kit",
        type: "docs",
      },
      {
        title: "Svelte Tutorial",
        url: "https://learn.svelte.dev",
        type: "tutorial",
      },
      {
        title: "Svelte Society",
        url: "https://sveltesociety.dev",
        type: "community",
      },
      {
        title: "SvelteKit on GitHub",
        url: "https://github.com/sveltejs/kit",
        type: "community",
      },
    ],
    faq: [
      {
        question: "SvelteKit vs. Next.js — which should I use?",
        answer:
          "SvelteKit produces smaller bundles and faster runtime performance thanks to Svelte's compiler. Next.js has a larger ecosystem, more third-party integrations, and React Server Components. Choose SvelteKit for performance and simplicity; Next.js for ecosystem breadth.",
      },
      {
        question: "How much does it cost to build a SvelteKit app?",
        answer:
          "A SvelteKit marketing site costs $5K–15K. Full-stack SvelteKit applications with auth, database integration, and real-time features typically run $20K–60K+. We provide free scoping consultations.",
      },
      {
        question: "Is SvelteKit production-ready?",
        answer:
          "Yes. SvelteKit 2 is stable, actively maintained, and used in production by companies across industries. It's the official Svelte framework and receives first-class support from the Svelte team.",
      },
      {
        question: "Can I deploy SvelteKit to Cloudflare Workers?",
        answer:
          "Yes — SvelteKit has an official adapter-cloudflare that deploys to Cloudflare Workers and Pages. It supports KV storage, Durable Objects, and D1 databases through platform bindings.",
      },
    ],
    quickstart: "npx sv create my-app\ncd my-app\nnpm install\nnpm run dev",
    quickstartLang: "bash",
    docsUrl: "https://svelte.dev/docs/kit",
    pageType: "tech",
    targetAudience: "developers",
  },

  // ─── CLOUDFLARE R2 ──────────────────────────────────────────────
  {
    slug: "cloudflare-r2",
    name: "Cloudflare R2",
    category: "database",
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
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Cloudflare R2 is an S3-compatible object storage service with a game-changing pricing model — zero egress fees. Every byte of data transferred out of R2 is free, making it dramatically cheaper than AWS S3 for high-bandwidth workloads like media delivery, CDN origins, and large file distribution.\n\nR2 uses the same S3 API, so existing AWS SDKs (aws-sdk, boto3) work with a simple endpoint override. It integrates natively with Cloudflare Workers via bindings (no HTTP overhead), supports presigned URLs for secure uploads, and serves assets through Cloudflare's CDN at 300+ edge locations.",
    challenges: [
      {
        title: "Feature parity with S3",
        description:
          "R2 doesn't support all S3 features — no object lock, limited event notifications, and no storage class tiering. Evaluate whether R2's feature set covers your specific requirements.",
      },
      {
        title: "Multi-region write strategy",
        description:
          "R2 stores data in a single region by default with global read distribution. Applications needing multi-region writes may need a more complex architecture.",
      },
      {
        title: "Migration from S3",
        description:
          "Migrating large datasets from S3 to R2 requires careful planning — tools like rclone can sync buckets, but timing the DNS cutover to avoid downtime requires coordination.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Workers bindings for zero-latency access",
        detail:
          "Access R2 directly from Cloudflare Workers via native bindings — no HTTP round-trip, no auth headers, no SDK initialization.",
      },
      {
        tip: "Serve assets through a custom domain",
        detail:
          "Configure a custom domain on R2 to serve files through Cloudflare's CDN — cached at 300+ edge locations with your own domain name.",
      },
      {
        tip: "Use presigned URLs for browser uploads",
        detail:
          "Generate presigned URLs server-side and let clients upload directly to R2 — same pattern as S3, but with zero egress cost on downloads.",
      },
    ],
    usefulLinks: [
      {
        title: "Cloudflare R2 Documentation",
        url: "https://developers.cloudflare.com/r2/",
        type: "docs",
      },
      {
        title: "R2 Getting Started",
        url: "https://developers.cloudflare.com/r2/get-started/",
        type: "tutorial",
      },
      {
        title: "R2 Workers API",
        url: "https://developers.cloudflare.com/r2/api/workers/",
        type: "docs",
      },
      {
        title: "Cloudflare Discord",
        url: "https://discord.cloudflare.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Cloudflare R2 cost?",
        answer:
          "R2 storage costs $0.015/GB/month. Class A operations (writes) cost $4.50 per million. Class B operations (reads) cost $0.36 per million. Egress (data transfer out) is completely free — this is R2's key advantage over AWS S3.",
      },
      {
        question: "Cloudflare R2 vs AWS S3 — which should I use?",
        answer:
          "R2 is ideal for bandwidth-heavy workloads (media, downloads, CDN origins) where egress costs dominate. S3 offers more features (Glacier, analytics, Lambda triggers) and deeper AWS integration. For most web applications serving static assets, R2 saves significant money.",
      },
      {
        question: "Is R2 fully S3-compatible?",
        answer:
          "R2 supports the core S3 API — GetObject, PutObject, DeleteObject, multipart upload, presigned URLs, and bucket policies. Most S3 SDKs work with R2 by changing the endpoint URL. Some advanced S3 features (Object Lock, S3 Select) are not yet supported.",
      },
    ],
    quickstart:
      "# Create an R2 bucket via Wrangler\nnpx wrangler r2 bucket create my-bucket\n\n# Upload a file\nnpx wrangler r2 object put my-bucket/file.txt --file=./file.txt\n\n# Or use the S3-compatible API\nnpm install @aws-sdk/client-s3\n# Configure with R2 endpoint and credentials",
    quickstartLang: "bash",
    docsUrl: "https://developers.cloudflare.com/r2/",
  },

  // ─── SHOPIFY ────────────────────────────────────────────────────
  {
    slug: "shopify",
    name: "Shopify",
    category: "cms",
    tagline: "The leading e-commerce platform for online stores of every size",
    description:
      "Shopify powers millions of online stores worldwide with its robust e-commerce platform. We build custom Shopify themes, apps, and headless storefronts with Hydrogen to help brands sell more effectively.",
    accentColor: "green",
    visualizationKey: "shopify",
    logo: null,
    lucideIcon: "ShoppingCart",
    features: [
      {
        icon: "ShoppingCart",
        title: "Custom theme development",
        description:
          "Pixel-perfect Shopify themes built with Liquid, Tailwind CSS, and Online Store 2.0 architecture for maximum merchant flexibility.",
      },
      {
        icon: "Code",
        title: "Shopify app development",
        description:
          "Custom Shopify apps using the Remix-based app framework, Admin API, and Storefront API for bespoke workflows and integrations.",
      },
      {
        icon: "Zap",
        title: "Headless with Hydrogen",
        description:
          "Blazing-fast headless storefronts using Shopify Hydrogen and Oxygen — React Server Components, streaming SSR, and full Storefront API access.",
      },
      {
        icon: "Globe",
        title: "Shopify Plus & multi-market",
        description:
          "Enterprise-grade Shopify Plus implementations with multi-currency, multi-language, and B2B wholesale channel configuration.",
      },
      {
        icon: "RefreshCw",
        title: "Migrations & re-platforming",
        description:
          "Seamless migration from WooCommerce, Magento, or BigCommerce to Shopify — product data, customers, orders, and SEO redirects preserved.",
      },
      {
        icon: "BarChart3",
        title: "Conversion optimization",
        description:
          "Checkout customization, upsell flows, abandoned cart recovery, and performance tuning to maximize revenue per visitor.",
      },
    ],
    subTechs: [{ slug: "woocommerce" }, { slug: "stripe" }],
    pageType: "cms",
    targetAudience: "businesses",
    overview:
      "Shopify is the world's most popular e-commerce platform, powering over four million online stores — from scrappy DTC startups to billion-dollar brands like Allbirds, Gymshark, and Heinz. It handles product management, inventory, payments, shipping, and taxes out of the box, letting merchants focus on selling rather than infrastructure. With Online Store 2.0, Shopify introduced a flexible section-based theme architecture that gives merchants granular control over every page without touching code.\n\nFor developers, Shopify offers two main build paths. The traditional route uses Liquid (Shopify's templating language) combined with JSON templates and metafields for theme development. The modern route is Hydrogen — Shopify's React-based headless framework built on Remix, deployed to Shopify's Oxygen hosting — which unlocks full creative control with React Server Components, streaming SSR, and the Storefront API.\n\nGetting Shopify right — especially at scale — is harder than it looks. Theme customization requires deep Liquid knowledge, headless builds demand full-stack React expertise, and performance optimization across checkout, cart, and collection pages requires e-commerce experience. A Major builds high-converting Shopify experiences, from custom themes and apps to headless Hydrogen storefronts, so your store loads fast and sells effectively.",
    challenges: [
      {
        title: "Liquid templating complexity",
        description:
          "Shopify's Liquid language has unique conventions (sections, blocks, metafields, JSON templates) that differ from standard web frameworks. Building maintainable, performant themes requires deep Shopify-specific knowledge beyond generic HTML/CSS skills.",
      },
      {
        title: "Headless architecture decisions",
        description:
          "Going headless with Hydrogen unlocks creative freedom but introduces complexity — managing the Storefront API, cart state, customer auth, checkout redirects, and preview environments requires careful full-stack planning.",
      },
      {
        title: "Checkout customization limits",
        description:
          "Shopify controls the checkout experience. Customization is limited to Checkout UI Extensions (Plus only) and Shopify Functions. Highly custom checkout flows require Shopify Plus and deep knowledge of checkout extensibility points.",
      },
      {
        title: "Migration without SEO loss",
        description:
          "Re-platforming from WooCommerce or Magento risks losing organic traffic if URL structures, redirects, structured data, and meta tags aren't carefully mapped and preserved during migration.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Online Store 2.0 architecture",
        detail:
          "Build with JSON templates, sections everywhere, and metafields — this gives merchants maximum customization control in the theme editor without developer involvement for every change.",
      },
      {
        tip: "Optimize Liquid render performance",
        detail:
          "Minimize Liquid loops inside loops, use pagination on collection pages, lazy-load images, and defer non-critical JavaScript. Aim for sub-3-second fully loaded times.",
      },
      {
        tip: "Leverage Shopify Functions for backend logic",
        detail:
          "Use Shopify Functions (written in Rust/Wasm) for discounts, shipping rates, and payment customizations instead of external API calls — they run at the edge with sub-5ms execution.",
      },
      {
        tip: "Implement structured data for SEO",
        detail:
          "Add JSON-LD markup for Product, BreadcrumbList, Organization, and FAQ schemas — this powers rich snippets in Google and drives higher click-through rates from search results.",
      },
    ],
    usefulLinks: [
      {
        title: "Shopify Developer Documentation",
        url: "https://shopify.dev/docs",
        type: "docs",
      },
      {
        title: "Hydrogen Framework",
        url: "https://shopify.dev/docs/custom-storefronts/hydrogen",
        type: "docs",
      },
      {
        title: "Liquid Reference",
        url: "https://shopify.dev/docs/api/liquid",
        type: "docs",
      },
      {
        title: "Shopify Community Forums",
        url: "https://community.shopify.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Shopify vs WooCommerce — which is better?",
        answer:
          "Shopify is a fully hosted platform — it handles security, uptime, and updates. WooCommerce is a WordPress plugin that offers more customization but requires you to manage hosting, security patches, and PCI compliance. For most businesses, Shopify is faster to launch and cheaper to maintain; WooCommerce suits teams with in-house developers who need total control.",
      },
      {
        question: "How much does Shopify cost?",
        answer:
          "Shopify plans range from $39/month (Basic) to $399/month (Advanced). Shopify Plus — the enterprise tier — starts at $2,300/month. Transaction fees are 2.9% + 30¢ on Basic (lower on higher plans) using Shopify Payments. Additional costs include premium themes ($180–$350 one-time), apps ($5–$100+/month each), and custom development.",
      },
      {
        question: "Can I migrate from WooCommerce to Shopify?",
        answer:
          "Yes. Products, customers, orders, and blog content can be migrated using Shopify's built-in importer or tools like LitExtension. The critical part is mapping URL structures and setting up 301 redirects to preserve SEO rankings — this is where most DIY migrations go wrong. A Major handles end-to-end migrations with zero SEO loss.",
      },
      {
        question: "What is Shopify Hydrogen?",
        answer:
          "Hydrogen is Shopify's React-based framework for building headless storefronts. Built on Remix with React Server Components, it connects to the Storefront API and deploys to Shopify's Oxygen hosting. It's ideal for brands that need complete design freedom beyond what Liquid themes offer.",
      },
    ],
    quickstart:
      "# Install the Shopify CLI\nnpm install -g @shopify/cli @shopify/theme\n\n# Create a new Hydrogen storefront\nnpm create @shopify/hydrogen@latest -- --template demo-store\n\n# Or start a new theme\nshopify theme init my-theme\n\n# Start local development\nshopify theme dev --store=your-store.myshopify.com",
    quickstartLang: "bash",
    docsUrl: "https://shopify.dev/docs",
  },

  // ─── WEBFLOW ────────────────────────────────────────────────────
  {
    slug: "webflow",
    name: "Webflow",
    category: "cms",
    tagline: "Visual web development meets production-grade publishing",
    description:
      "Webflow lets designers build responsive, production-ready websites visually — no code required. We help businesses maximize Webflow's potential and migrate to custom code when they outgrow it.",
    accentColor: "blue",
    visualizationKey: "webflow",
    logo: null,
    lucideIcon: "Layout",
    features: [
      {
        icon: "Layout",
        title: "Visual site development",
        description:
          "Pixel-perfect responsive websites built in Webflow's visual editor — semantic HTML, clean CSS, and fast load times without writing code.",
      },
      {
        icon: "Database",
        title: "CMS & dynamic content",
        description:
          "Webflow CMS collections for blogs, portfolios, case studies, and product catalogs with filterable, paginated, template-driven pages.",
      },
      {
        icon: "ShoppingCart",
        title: "Webflow E-commerce",
        description:
          "Native Webflow E-commerce setup with custom product pages, cart flows, Stripe integration, and inventory management.",
      },
      {
        icon: "Code",
        title: "Custom code migration",
        description:
          "When you outgrow Webflow — migrating to Next.js, Astro, or a headless CMS while preserving your design, content, and SEO rankings.",
      },
      {
        icon: "Zap",
        title: "Integrations & automation",
        description:
          "Third-party integrations via Webflow APIs, webhooks, Zapier, and custom JavaScript embeds for forms, analytics, and marketing tools.",
      },
      {
        icon: "Search",
        title: "SEO optimization",
        description:
          "On-page SEO setup — meta tags, Open Graph, canonical URLs, XML sitemaps, alt text, and structured data for maximum organic visibility.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }],
    pageType: "cms",
    targetAudience: "businesses",
    overview:
      "Webflow bridges the gap between design and development by letting designers build responsive, production-ready websites in a visual editor that generates clean, semantic HTML and CSS. It combines the creative freedom of tools like Figma with the publishing power of a CMS — and it's become the go-to platform for marketing sites, portfolios, and content-driven businesses that want to move fast without depending on developers for every change.\n\nWebflow's CMS is surprisingly capable: collections, reference fields, conditional visibility, and dynamic pages let you build complex content architectures visually. Its hosting is fast (backed by Fastly CDN), and the visual editor empowers marketing teams to update content, duplicate pages, and launch campaigns without code changes. For many businesses, Webflow is the right choice — it's faster than custom code and more capable than Squarespace.\n\nBut Webflow has real limits. Complex application logic, user authentication, dynamic server-side functionality, multi-language sites (without expensive workarounds), and large-scale e-commerce all push Webflow past its sweet spot. When you hit those walls, A Major helps you migrate to a custom-built solution — Next.js, Astro, or a headless CMS — while preserving your design and SEO equity. We also build Webflow sites for businesses that fit the platform perfectly.",
    challenges: [
      {
        title: "Knowing when to leave Webflow",
        description:
          "Webflow is great until it isn't. Businesses often realize too late that features like auth, complex filtering, multi-language, or dynamic pricing require custom code. Recognizing the tipping point early saves expensive rework.",
      },
      {
        title: "CMS scalability constraints",
        description:
          "Webflow CMS has hard limits — 10,000 items per collection, 20 collection lists per page, and limited relational querying. Data-heavy sites hit these ceilings faster than expected.",
      },
      {
        title: "SEO-safe migration to custom code",
        description:
          "Migrating from Webflow to a custom framework risks losing search rankings if URL structures, redirects, internal links, and structured data aren't carefully mapped during the transition.",
      },
      {
        title: "Custom interactions at scale",
        description:
          "Webflow Interactions are powerful for animations but can become unwieldy with complex scroll-triggered sequences. Performance degrades with too many simultaneous animation triggers on content-heavy pages.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Client-First or Lumos naming conventions",
        detail:
          "Adopt a consistent class naming methodology like Client-First from Finsweet — it keeps Webflow projects maintainable, shareable between designers, and prevents CSS specificity nightmares.",
      },
      {
        tip: "Structure CMS collections for flexibility",
        detail:
          "Plan your CMS architecture before building — use reference fields and multi-reference fields to create relationships between collections. Restructuring later is painful in Webflow.",
      },
      {
        tip: "Optimize images and fonts",
        detail:
          "Use WebP format, set responsive image sizes, enable lazy loading, and self-host fonts (or use Webflow's font hosting) to keep page weight under 1MB for fast load times.",
      },
      {
        tip: "Plan your breakpoints early",
        detail:
          "Design desktop-first in Webflow (that's how the cascade works), then adapt layouts at each breakpoint. Retrofitting responsive behavior after building desktop layouts creates fragile overrides.",
      },
    ],
    usefulLinks: [
      {
        title: "Webflow University",
        url: "https://university.webflow.com/",
        type: "tutorial",
      },
      {
        title: "Webflow Developer Documentation",
        url: "https://developers.webflow.com/",
        type: "docs",
      },
      {
        title: "Finsweet Client-First",
        url: "https://finsweet.com/client-first",
        type: "tool",
      },
      {
        title: "Webflow Community Forum",
        url: "https://forum.webflow.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "What are Webflow's main limitations?",
        answer:
          "Webflow lacks server-side logic, user authentication, complex application state, and native multi-language support. CMS collections are capped at 10,000 items, and e-commerce is limited compared to Shopify. It's ideal for marketing sites and content-driven businesses, but not for web applications.",
      },
      {
        question: "When should I move from Webflow to custom code?",
        answer:
          "Consider migrating when you need user auth, dynamic server-side features, complex filtering/search, internationalization, or when CMS limits constrain your content. If your marketing team spends more time working around Webflow limits than creating content, it's time. A Major specializes in these migrations.",
      },
      {
        question: "How much does Webflow cost?",
        answer:
          "Webflow site plans range from free (staging only) to $49/month (Business). CMS plans start at $29/month. E-commerce plans range from $42–$212/month. Workspace plans for teams start at $28/seat/month. Total cost depends on team size, CMS needs, and whether you use e-commerce.",
      },
      {
        question: "Can Webflow sites rank well on Google?",
        answer:
          "Yes — Webflow generates clean, semantic HTML with fast CDN hosting. It supports custom meta tags, Open Graph, sitemaps, canonical URLs, and 301 redirects. Webflow sites regularly rank well when properly optimized. The platform's page speed is competitive with hand-coded sites.",
      },
    ],
    docsUrl: "https://developers.webflow.com/",
  },

  // ─── FIREBASE ───────────────────────────────────────────────────
  {
    slug: "firebase",
    name: "Firebase",
    category: "backend",
    tagline: "Google's app development platform for web and mobile",
    description:
      "Firebase provides a complete backend-as-a-service — real-time databases, authentication, cloud functions, hosting, and analytics. We build scalable Firebase architectures that keep costs predictable as you grow.",
    accentColor: "amber",
    visualizationKey: "firebase",
    logo: null,
    lucideIcon: "Flame",
    features: [
      {
        icon: "Database",
        title: "Firestore & Realtime Database",
        description:
          "NoSQL document databases with real-time sync, offline support, and automatic scaling — Firestore for complex queries, Realtime Database for low-latency sync.",
      },
      {
        icon: "Shield",
        title: "Firebase Authentication",
        description:
          "Drop-in auth with email/password, phone, Google, Apple, GitHub, and custom providers — including multi-factor auth and anonymous sessions.",
      },
      {
        icon: "Zap",
        title: "Cloud Functions",
        description:
          "Serverless functions triggered by Firestore writes, Auth events, HTTP requests, or scheduled cron — auto-scaling, zero server management.",
      },
      {
        icon: "Globe",
        title: "Firebase Hosting",
        description:
          "Global CDN hosting with automatic SSL, preview channels, and one-command deploys — integrated with Cloud Functions for server-rendered pages.",
      },
      {
        icon: "BarChart3",
        title: "Analytics & Crashlytics",
        description:
          "Free, unlimited analytics for web and mobile — user funnels, retention, crash reports, and performance monitoring out of the box.",
      },
      {
        icon: "Bell",
        title: "Cloud Messaging & Remote Config",
        description:
          "Push notifications via FCM and feature flags via Remote Config — A/B test features and target user segments without app updates.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "react" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Firebase is Google's comprehensive app development platform that gives developers a fully managed backend without provisioning servers. At its core are two databases — Cloud Firestore (a flexible NoSQL document database with powerful querying and real-time listeners) and the Realtime Database (an ultra-low-latency JSON tree ideal for presence and live collaboration features). Combined with Firebase Authentication, Cloud Functions, Hosting, Cloud Storage, and Analytics, Firebase provides everything you need to build and scale web and mobile applications.\n\nFirebase excels at rapid prototyping and real-time features. Firestore's real-time listeners push data changes to connected clients instantly — perfect for chat apps, live dashboards, and collaborative tools. The security rules system (a declarative language for Firestore and Storage) lets you enforce authorization without a backend. Cloud Functions run server-side logic in response to database writes, auth events, or HTTP requests, giving you serverless compute when you need it.\n\nThe challenge with Firebase is cost management and architectural decisions at scale. Firestore charges per read, write, and delete — a poorly designed data model can result in massive bills. Denormalization, composite indexes, and query optimization require Firebase-specific expertise. A Major architects Firebase backends that scale predictably, with proper data modeling, security rules, and Cloud Functions patterns that keep your costs in check.",
    challenges: [
      {
        title: "Cost unpredictability at scale",
        description:
          "Firestore charges per document read/write/delete. A single page load triggering 50 document reads across multiple listeners adds up fast. Without careful data modeling and query optimization, Firebase bills can spike unexpectedly.",
      },
      {
        title: "Data modeling for NoSQL",
        description:
          "Firestore is not a relational database — joins don't exist. You must denormalize data, use subcollections strategically, and design your schema around your query patterns rather than your data relationships.",
      },
      {
        title: "Security rules complexity",
        description:
          "Firestore security rules are powerful but have a steep learning curve. Rules must cover every collection and document path. A single misconfiguration can expose user data or block legitimate access — and testing rules locally requires the emulator suite.",
      },
      {
        title: "Vendor lock-in",
        description:
          "Firebase's proprietary APIs, security rules, and data formats make migration to another platform non-trivial. Firestore data export to a relational database requires significant transformation work.",
      },
    ],
    bestPractices: [
      {
        tip: "Design your data model around queries",
        detail:
          "In Firestore, you query documents — not tables. Structure your collections and subcollections around the exact queries your UI needs. Denormalize aggressively and use Cloud Functions to keep denormalized copies in sync.",
      },
      {
        tip: "Use the Firebase Emulator Suite locally",
        detail:
          "Run Firestore, Auth, Functions, and Storage locally with the emulator suite. It enables fast iteration, security rules testing, and unit tests without touching production data or incurring costs.",
      },
      {
        tip: "Implement security rules from day one",
        detail:
          "Never launch with open security rules. Write granular Firestore rules that validate authentication, field types, and ownership. Test rules in the emulator before deploying — production data breaches from open rules are common.",
      },
      {
        tip: "Batch reads and use collection group queries",
        detail:
          "Minimize Firestore reads by batching, caching results client-side, and using collection group queries to query across subcollections. Each unnecessary read costs money — design your listeners carefully.",
      },
    ],
    usefulLinks: [
      {
        title: "Firebase Documentation",
        url: "https://firebase.google.com/docs",
        type: "docs",
      },
      {
        title: "Firestore Data Modeling",
        url: "https://firebase.google.com/docs/firestore/manage-data/structure-data",
        type: "tutorial",
      },
      {
        title: "Firebase Emulator Suite",
        url: "https://firebase.google.com/docs/emulator-suite",
        type: "tool",
      },
      {
        title: "Firebase Community on Reddit",
        url: "https://www.reddit.com/r/Firebase/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Firebase vs Supabase — which should I use?",
        answer:
          "Firebase offers mature real-time sync, excellent mobile SDKs, and deep Google Cloud integration. Supabase provides a Postgres database with SQL, row-level security, and an open-source stack. Choose Firebase for real-time-heavy mobile apps; choose Supabase for apps that benefit from relational data and SQL. A Major works with both.",
      },
      {
        question: "Does Firebase scale for production apps?",
        answer:
          "Yes — Firebase powers apps with millions of users. Firestore auto-scales reads and writes, and Cloud Functions scale to thousands of concurrent invocations. The key is data modeling: a poorly designed Firestore schema costs 10x more at scale than a well-designed one.",
      },
      {
        question: "How much does Firebase cost at scale?",
        answer:
          "Firebase's free Spark plan covers small apps. The Blaze (pay-as-you-go) plan charges $0.06 per 100K Firestore reads, $0.18 per 100K writes, and $0.40/GB Cloud Functions invocation time. A medium-traffic app (100K DAU) typically costs $50–$500/month depending on data model efficiency. Poorly optimized apps can cost 10x that.",
      },
      {
        question: "Can I use Firebase with Next.js or React?",
        answer:
          "Absolutely. Firebase's JavaScript SDK works with any React framework. Use the client SDK for Firestore listeners and Auth, and the Admin SDK in Next.js API routes or server components for server-side data access. Firebase Hosting can also serve Next.js apps via Cloud Functions.",
      },
    ],
    quickstart:
      "# Install Firebase CLI and SDK\nnpm install -g firebase-tools\nnpm install firebase\n\n# Login and initialize a project\nfirebase login\nfirebase init\n\n# Initialize in your app\nimport { initializeApp } from 'firebase/app';\nimport { getFirestore, collection, getDocs } from 'firebase/firestore';\n\nconst app = initializeApp({ /* config */ });\nconst db = getFirestore(app);\nconst snapshot = await getDocs(collection(db, 'users'));",
    quickstartLang: "bash",
    docsUrl: "https://firebase.google.com/docs",
  },

  // ─── AWS ────────────────────────────────────────────────────────
  {
    slug: "aws",
    name: "AWS",
    category: "tooling",
    tagline: "The world's most comprehensive cloud infrastructure platform",
    description:
      "Amazon Web Services offers 200+ services for compute, storage, databases, AI, and networking. We architect, deploy, and manage AWS infrastructure so your team can focus on building product instead of managing servers.",
    accentColor: "amber",
    visualizationKey: "aws",
    logo: null,
    lucideIcon: "Cloud",
    features: [
      {
        icon: "Server",
        title: "EC2 & compute",
        description:
          "Virtual servers, auto-scaling groups, spot instances, and Graviton ARM processors for flexible, cost-efficient compute at any scale.",
      },
      {
        icon: "Zap",
        title: "Lambda & serverless",
        description:
          "Event-driven serverless functions with per-millisecond billing, up to 10GB memory, and 15-minute execution — triggered by 200+ AWS event sources.",
      },
      {
        icon: "HardDrive",
        title: "S3 & storage",
        description:
          "Object storage with 99.999999999% durability, lifecycle policies, intelligent tiering, and CloudFront CDN integration for global delivery.",
      },
      {
        icon: "Database",
        title: "RDS, Aurora & DynamoDB",
        description:
          "Managed Postgres, MySQL, and Aurora databases with automatic backups, replicas, and failover — plus DynamoDB for single-digit-millisecond NoSQL.",
      },
      {
        icon: "Container",
        title: "ECS, EKS & Fargate",
        description:
          "Container orchestration with ECS (simpler) or EKS (Kubernetes), plus Fargate for serverless containers — no EC2 instance management.",
      },
      {
        icon: "Globe",
        title: "CloudFront & networking",
        description:
          "Global CDN with 400+ edge locations, Route 53 DNS, VPC networking, ALB/NLB load balancers, and AWS Global Accelerator for low-latency delivery.",
      },
    ],
    subTechs: [{ slug: "docker" }, { slug: "nodejs" }, { slug: "s3" }],
    pageType: "tech",
    targetAudience: "both",
    overview:
      "Amazon Web Services is the world's leading cloud platform, commanding roughly a third of the global cloud infrastructure market. With 200+ services spanning compute (EC2, Lambda, Fargate), storage (S3, EBS, EFS), databases (RDS, Aurora, DynamoDB, ElastiCache), networking (VPC, CloudFront, Route 53), AI/ML (SageMaker, Bedrock), and developer tools (CodeBuild, CloudFormation, CDK), AWS can host practically anything — from a static website to a globally distributed microservices architecture.\n\nFor startups and growing companies, AWS offers a compelling mix of free-tier generosity and enterprise-grade reliability. Lambda provides serverless compute with per-millisecond billing. S3 stores data with eleven nines of durability. Aurora delivers MySQL/Postgres performance at a fraction of the cost of commercial databases. Infrastructure as Code with CDK or Terraform turns your cloud architecture into version-controlled, repeatable deployments.\n\nBut AWS's breadth is also its challenge. Choosing between ECS and EKS, RDS and Aurora, ALB and NLB, CloudFormation and CDK — every decision has cost and operational implications. IAM policies, VPC networking, and cost optimization require specialized knowledge. A Major architects AWS infrastructure that's secure, cost-optimized, and operationally maintainable — from initial setup through production scaling.",
    challenges: [
      {
        title: "Service selection overwhelm",
        description:
          "AWS has multiple services for every need — at least three ways to run containers, four database engines, and dozens of storage options. Choosing the right service (and avoiding over-engineering) requires deep AWS experience.",
      },
      {
        title: "Cost management and optimization",
        description:
          "AWS bills are notoriously complex. Without reserved instances, savings plans, right-sizing, and proper tagging, companies routinely overspend by 30–50%. Cost optimization is an ongoing discipline, not a one-time setup.",
      },
      {
        title: "IAM and security configuration",
        description:
          "AWS's Identity and Access Management is powerful but complex. Overly permissive policies create security risks; overly restrictive ones break deployments. Principle of least privilege across services, roles, and cross-account access requires careful architecture.",
      },
      {
        title: "Infrastructure as Code adoption",
        description:
          "Moving from console-clicked infrastructure to CDK or Terraform is essential but disruptive. Importing existing resources, managing state, and handling drift detection adds operational complexity.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Infrastructure as Code from day one",
        detail:
          "Define all AWS resources in CDK (TypeScript) or Terraform. Never create production resources via the console — manual changes drift, can't be reviewed, and aren't reproducible across environments.",
      },
      {
        tip: "Implement a cost monitoring strategy",
        detail:
          "Enable AWS Cost Explorer, set billing alerts, tag every resource, and review spending weekly. Use Savings Plans for predictable workloads and Spot Instances for fault-tolerant batch jobs.",
      },
      {
        tip: "Follow the principle of least privilege",
        detail:
          "Every Lambda, ECS task, and EC2 instance should have an IAM role scoped to exactly what it needs. Use AWS Access Analyzer to identify overly permissive policies and unused permissions.",
      },
      {
        tip: "Design for multi-AZ resilience",
        detail:
          "Deploy across multiple Availability Zones from the start. RDS multi-AZ, ALB cross-zone load balancing, and S3's built-in durability protect against hardware failures without complexity.",
      },
    ],
    usefulLinks: [
      {
        title: "AWS Documentation",
        url: "https://docs.aws.amazon.com/",
        type: "docs",
      },
      {
        title: "AWS Well-Architected Framework",
        url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
        type: "docs",
      },
      {
        title: "AWS CDK Developer Guide",
        url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html",
        type: "tutorial",
      },
      {
        title: "AWS re:Post Community",
        url: "https://repost.aws/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "AWS vs GCP vs Azure — which should I choose?",
        answer:
          "AWS has the broadest service catalog and largest ecosystem. GCP excels at data analytics (BigQuery) and Kubernetes (GKE). Azure integrates deeply with Microsoft tools (Active Directory, .NET, Teams). For most startups, AWS offers the best combination of documentation, community support, and hiring pool. A Major helps you choose based on your specific stack and team.",
      },
      {
        question: "How do I reduce my AWS bill?",
        answer:
          "Start with right-sizing — most EC2 instances are over-provisioned. Use Savings Plans (up to 72% off on-demand pricing) for predictable workloads, Spot Instances for batch jobs, and S3 Intelligent Tiering for storage. Review unused resources monthly — orphaned EBS volumes, idle load balancers, and forgotten RDS instances are common cost leaks.",
      },
      {
        question: "Should I use managed services or self-host on EC2?",
        answer:
          "Use managed services (RDS, ElastiCache, ECS Fargate) unless you have a specific reason not to. Managed services handle patching, backups, failover, and scaling. Self-hosting on EC2 costs less per-hour but far more in engineer time. The operational overhead of running your own Postgres on EC2 rarely justifies the savings.",
      },
      {
        question: "What's the best way to deploy a Node.js app on AWS?",
        answer:
          "For most teams: containerize with Docker, deploy to ECS Fargate with an ALB in front, and use RDS Postgres for the database. For serverless architectures: use Lambda with API Gateway. For full Kubernetes: use EKS with Fargate profiles. A Major sets up production-grade AWS deployments with CI/CD, monitoring, and auto-scaling.",
      },
    ],
    quickstart:
      '# Install AWS CLI\ncurl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"\nunzip awscliv2.zip && sudo ./aws/install\n\n# Configure credentials\naws configure\n\n# Install AWS CDK\nnpm install -g aws-cdk\n\n# Create a new CDK project (TypeScript)\nmkdir my-infra && cd my-infra\ncdk init app --language typescript\ncdk deploy',
    quickstartLang: "bash",
    docsUrl: "https://docs.aws.amazon.com/",
  },

  // ─── GCP ────────────────────────────────────────────────────────
  {
    slug: "gcp",
    name: "Google Cloud Platform (GCP)",
    category: "tooling",
    tagline:
      "Google-scale infrastructure for data, AI, and modern applications",
    description:
      "Google Cloud Platform combines world-class data analytics, AI/ML capabilities, and fully managed infrastructure. We build on GCP's strengths — Cloud Run, BigQuery, GKE, and Vertex AI — to deliver scalable, cost-efficient solutions.",
    accentColor: "blue",
    visualizationKey: "gcp",
    logo: null,
    lucideIcon: "Cloud",
    features: [
      {
        icon: "Zap",
        title: "Cloud Run",
        description:
          "Fully managed serverless containers — deploy any Docker image with HTTPS, auto-scaling to zero, and per-second billing. No Kubernetes knowledge required.",
      },
      {
        icon: "BarChart3",
        title: "BigQuery",
        description:
          "Serverless data warehouse that analyzes petabytes in seconds. Standard SQL, ML built-in (BigQuery ML), and automatic scaling with pay-per-query pricing.",
      },
      {
        icon: "Container",
        title: "Google Kubernetes Engine (GKE)",
        description:
          "The most mature managed Kubernetes — Autopilot mode manages nodes for you, built by the team that created Kubernetes.",
      },
      {
        icon: "Cpu",
        title: "Vertex AI",
        description:
          "Unified AI/ML platform — model training, fine-tuning, deployment, and access to Gemini models via API. MLOps pipelines and feature store included.",
      },
      {
        icon: "Flame",
        title: "Firebase integration",
        description:
          "Firebase runs on GCP — seamless integration with Cloud Functions (2nd gen), Firestore, Cloud Storage, and Identity Platform for web and mobile apps.",
      },
      {
        icon: "Globe",
        title: "Cloud CDN & networking",
        description:
          "Google's global network with 187+ edge locations, Cloud CDN, Cloud Load Balancing, and premium-tier networking for low-latency delivery worldwide.",
      },
    ],
    subTechs: [{ slug: "docker" }, { slug: "firebase" }],
    pageType: "tech",
    targetAudience: "both",
    overview:
      "Google Cloud Platform brings Google's internal infrastructure — the same systems that power Search, YouTube, and Gmail — to developers and enterprises. While AWS leads in breadth, GCP leads in specific areas: BigQuery is the gold standard for serverless data analytics, GKE is the most mature managed Kubernetes (built by Kubernetes' creators), Cloud Run offers the smoothest serverless container experience, and Vertex AI provides state-of-the-art ML infrastructure including access to Google's Gemini models.\n\nGCP's developer experience is notably streamlined. Cloud Run deploys any Docker container to production with a single command — HTTPS, auto-scaling, custom domains, and per-second billing included. Cloud Build provides CI/CD. Cloud SQL offers managed Postgres and MySQL with automatic backups. And Firebase — which runs on GCP — provides real-time databases, authentication, and hosting for web and mobile apps, all within the same project and billing account.\n\nThe challenge with GCP is a smaller ecosystem compared to AWS — fewer third-party integrations, a smaller talent pool, and less community content. But for teams that prioritize data analytics, Kubernetes, AI/ML, or Firebase, GCP often delivers a better developer experience at a lower price point. A Major architects GCP solutions that leverage these strengths while maintaining portability for multi-cloud futures.",
    challenges: [
      {
        title: "Smaller ecosystem than AWS",
        description:
          "GCP has fewer third-party integrations, less Stack Overflow content, and a smaller talent pool than AWS. Finding GCP-specific expertise — especially for enterprise services — can be harder in some markets.",
      },
      {
        title: "IAM and organization structure",
        description:
          "GCP's IAM model (projects, folders, organizations, service accounts) differs from AWS. Teams accustomed to AWS IAM need to learn GCP's resource hierarchy and policy inheritance model.",
      },
      {
        title: "Network configuration complexity",
        description:
          "GCP's VPC networking, firewall rules, and interconnect options require careful planning. The shared VPC model for multi-project organizations adds organizational complexity.",
      },
      {
        title: "Service maturity gaps",
        description:
          "Some GCP services (especially newer ones) have fewer features than their AWS equivalents. Evaluating service maturity against your specific requirements is essential before committing.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with Cloud Run for most workloads",
        detail:
          "Cloud Run handles 80% of workloads with zero Kubernetes complexity. Deploy any Docker container with auto-scaling (including to zero), HTTPS, and per-second billing. Only move to GKE when you need advanced Kubernetes features.",
      },
      {
        tip: "Use BigQuery for all analytics",
        detail:
          "Pipe logs, events, and business data into BigQuery early. Its serverless, pay-per-query model means you only pay when you analyze — and its performance on large datasets is unmatched.",
      },
      {
        tip: "Leverage GKE Autopilot over Standard",
        detail:
          "GKE Autopilot manages nodes, scaling, and security patches for you. You pay per pod resource request, not per node — eliminating cluster right-sizing headaches and reducing costs.",
      },
      {
        tip: "Set up billing alerts and budgets",
        detail:
          "GCP billing can surprise you — especially BigQuery on-demand pricing. Set project-level budgets, enable billing export to BigQuery, and review spending weekly with the Billing console.",
      },
    ],
    usefulLinks: [
      {
        title: "Google Cloud Documentation",
        url: "https://cloud.google.com/docs",
        type: "docs",
      },
      {
        title: "Cloud Run Quickstart",
        url: "https://cloud.google.com/run/docs/quickstarts",
        type: "tutorial",
      },
      {
        title: "BigQuery Documentation",
        url: "https://cloud.google.com/bigquery/docs",
        type: "docs",
      },
      {
        title: "Google Cloud Community",
        url: "https://www.googlecloudcommunity.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "GCP vs AWS — which should I choose?",
        answer:
          "Choose GCP if your strengths are in data analytics (BigQuery), Kubernetes (GKE), AI/ML (Vertex AI), or Firebase. Choose AWS for the broadest service catalog, largest community, and deepest third-party integrations. For most startups building with Firebase or Kubernetes, GCP is the natural fit. A Major works with both and helps you choose based on your needs.",
      },
      {
        question: "Is Cloud Run better than AWS Lambda?",
        answer:
          "Cloud Run and Lambda solve different problems. Cloud Run runs any Docker container (any language, any framework, any binary) with request-based auto-scaling. Lambda runs event-driven functions with tighter AWS integration. Cloud Run's cold starts are faster for larger apps, and it handles long-running requests (up to 60 min). For containerized web apps, Cloud Run is often simpler.",
      },
      {
        question: "How does GCP pricing compare to AWS?",
        answer:
          "GCP is often 20–40% cheaper for equivalent compute (sustained-use and committed-use discounts apply automatically). BigQuery's on-demand pricing ($5/TB queried) can be cheaper than running a dedicated data warehouse. However, networking egress and some managed services have similar pricing to AWS.",
      },
    ],
    quickstart:
      "# Install Google Cloud CLI\ncurl https://sdk.cloud.google.com | bash\n\n# Login and set project\ngcloud auth login\ngcloud config set project my-project\n\n# Deploy a container to Cloud Run\ngcloud run deploy my-service \\\n  --source . \\\n  --region us-central1 \\\n  --allow-unauthenticated",
    quickstartLang: "bash",
    docsUrl: "https://cloud.google.com/docs",
  },

  // ─── AZURE ──────────────────────────────────────────────────────
  {
    slug: "azure",
    name: "Azure",
    category: "tooling",
    tagline: "Microsoft's enterprise cloud for hybrid and modern workloads",
    description:
      "Microsoft Azure integrates deeply with the enterprise ecosystem — Active Directory, .NET, SQL Server, and Microsoft 365. We build Azure solutions for organizations that need enterprise-grade identity, compliance, and hybrid cloud capabilities.",
    accentColor: "blue",
    visualizationKey: "azure",
    logo: null,
    lucideIcon: "Cloud",
    features: [
      {
        icon: "Globe",
        title: "Azure App Service",
        description:
          "Fully managed PaaS for web apps — deploy .NET, Node.js, Python, or Java with auto-scaling, deployment slots, and built-in CI/CD from GitHub or Azure DevOps.",
      },
      {
        icon: "Zap",
        title: "Azure Functions",
        description:
          "Serverless compute with durable functions (stateful workflows), timer triggers, queue triggers, and deep integration with Azure services and Event Grid.",
      },
      {
        icon: "GitBranch",
        title: "Azure DevOps",
        description:
          "Complete CI/CD platform — repos, pipelines, boards, artifacts, and test plans in a single integrated suite for enterprise development teams.",
      },
      {
        icon: "Database",
        title: "Azure SQL & Cosmos DB",
        description:
          "Managed SQL Server, Postgres, and MySQL — plus Cosmos DB, a globally distributed multi-model database with single-digit millisecond latency and five consistency models.",
      },
      {
        icon: "Shield",
        title: "Entra ID (Azure AD)",
        description:
          "Enterprise identity and access management — SSO, MFA, conditional access policies, and B2B/B2C identity services for applications and APIs.",
      },
      {
        icon: "Container",
        title: "AKS & Container Apps",
        description:
          "Managed Kubernetes (AKS) for complex orchestration, or Azure Container Apps for serverless containers — both with integrated monitoring via Azure Monitor.",
      },
    ],
    subTechs: [{ slug: "dotnet" }, { slug: "docker" }],
    pageType: "tech",
    targetAudience: "both",
    overview:
      "Microsoft Azure is the cloud platform of choice for enterprises already invested in the Microsoft ecosystem. With native integration with Active Directory (now Entra ID), Microsoft 365, SQL Server, .NET, and Visual Studio, Azure reduces friction for organizations running Windows workloads, hybrid deployments, and enterprise identity management. It's the second-largest cloud provider globally, and in many enterprise sectors — finance, healthcare, government — it's the default choice.\n\nAzure's strengths extend beyond Microsoft lock-in. Cosmos DB is a genuinely unique globally distributed database with five tunable consistency models and single-digit millisecond reads worldwide. Azure Functions with Durable Functions enable complex stateful serverless workflows. Azure DevOps provides a complete CI/CD suite. And Azure's hybrid story (Azure Arc, Azure Stack) is the strongest in the industry for organizations that need on-premises and cloud workloads under a single control plane.\n\nThe trade-off is developer experience. Azure's portal and CLI can feel heavier than GCP's streamlined tooling or AWS's mature CDK. Documentation quality varies across services. And Azure's naming conventions change frequently (Azure AD became Entra ID, App Insights merged into Azure Monitor). A Major navigates Azure's complexity to build production-grade solutions — from App Service deployments to Cosmos DB architectures to Entra ID authentication flows.",
    challenges: [
      {
        title: "Complex naming and service organization",
        description:
          "Azure's rapid service evolution means frequent renames (Azure AD → Entra ID, Application Insights → Azure Monitor). Keeping up with current service names, SKUs, and feature locations in the portal requires constant learning.",
      },
      {
        title: "Developer experience gaps",
        description:
          "Azure's portal is feature-rich but cluttered. The CLI (az) is verbose compared to gcloud. ARM templates are notoriously complex — Bicep improves this significantly but still has a learning curve compared to AWS CDK or Terraform.",
      },
      {
        title: "Cost visibility and management",
        description:
          "Azure pricing is complex with multiple tiers, DTUs (for SQL), RUs (for Cosmos DB), and varied commitment options. The Azure Cost Management tool helps but requires setup and ongoing monitoring.",
      },
      {
        title: "Hybrid architecture complexity",
        description:
          "Azure's hybrid capabilities (Azure Arc, Stack, ExpressRoute) are powerful but complex to configure correctly. Network security, identity federation, and data sovereignty requirements add layers of architectural decisions.",
      },
    ],
    bestPractices: [
      {
        tip: "Use Bicep instead of ARM templates",
        detail:
          "Bicep is Azure's domain-specific language for IaC — it compiles to ARM but is dramatically more readable. Alternatively, use Terraform for multi-cloud portability. Never rely on portal-created resources for production.",
      },
      {
        tip: "Leverage Entra ID for all authentication",
        detail:
          "Use Azure Entra ID (formerly Azure AD) as the identity provider for your apps — SSO, MFA, conditional access, and B2C identity flows. Don't build custom auth when Entra ID handles it at enterprise scale.",
      },
      {
        tip: "Choose Cosmos DB consistency models carefully",
        detail:
          "Cosmos DB offers five consistency levels from strong to eventual. Strong consistency costs 2x the RUs of eventual. Most web apps work well with session consistency — strong enough for user experience, efficient on cost.",
      },
      {
        tip: "Use deployment slots for zero-downtime releases",
        detail:
          "Azure App Service deployment slots let you deploy to a staging slot, warm it up, and swap it to production instantly. Combined with auto-swap and traffic routing, this enables safe blue-green deployments.",
      },
    ],
    usefulLinks: [
      {
        title: "Azure Documentation",
        url: "https://learn.microsoft.com/en-us/azure/",
        type: "docs",
      },
      {
        title: "Azure Architecture Center",
        url: "https://learn.microsoft.com/en-us/azure/architecture/",
        type: "docs",
      },
      {
        title: "Bicep Language Reference",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/",
        type: "tutorial",
      },
      {
        title: "Microsoft Q&A for Azure",
        url: "https://learn.microsoft.com/en-us/answers/tags/133/azure",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Azure vs AWS — which is better for my organization?",
        answer:
          "Azure is the natural choice for organizations using Microsoft 365, Active Directory, SQL Server, or .NET. Its hybrid capabilities (Azure Arc, Stack) are industry-leading. AWS offers a broader service catalog and larger developer community. For greenfield cloud-native projects, AWS often wins; for enterprises extending existing Microsoft investments, Azure is smoother.",
      },
      {
        question: "What are Azure's enterprise advantages?",
        answer:
          "Azure offers unified billing with Microsoft enterprise agreements, native Entra ID (Azure AD) integration for SSO across all Microsoft and custom apps, best-in-class hybrid cloud with Azure Arc, industry-leading compliance certifications (FedRAMP, HIPAA, SOC), and Azure DevOps for end-to-end enterprise SDLC.",
      },
      {
        question: "Is Cosmos DB worth the cost?",
        answer:
          "Cosmos DB is expensive compared to a single-region database — but it's globally distributed with five consistency models and single-digit millisecond latency. If you need multi-region writes, guaranteed low latency, or a multi-model database, Cosmos DB delivers what no other managed database can. For single-region apps, Azure SQL or Postgres is more cost-effective.",
      },
      {
        question: "How does Azure pricing work?",
        answer:
          "Azure uses pay-as-you-go, reserved instances (1- or 3-year commitments for up to 72% savings), and spot pricing. Costs vary by service — VMs bill per second, Cosmos DB bills per RU/s, Azure SQL bills per DTU or vCore. Azure Hybrid Benefit lets you apply existing Windows Server and SQL Server licenses for additional savings.",
      },
    ],
    quickstart:
      '# Install Azure CLI\ncurl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash\n\n# Login\naz login\n\n# Create a resource group\naz group create --name myResourceGroup --location eastus\n\n# Deploy a web app\naz webapp up --runtime "NODE:20-lts" --name my-app\n\n# Or deploy a container\naz containerapp up --name my-app --source .',
    quickstartLang: "bash",
    docsUrl: "https://learn.microsoft.com/en-us/azure/",
  },

  // ─── VERCEL ─────────────────────────────────────────────────────
  {
    slug: "vercel",
    name: "Vercel",
    category: "tooling",
    tagline: "The frontend cloud — ship fast, deploy globally",
    description:
      "Vercel is the platform built for frontend frameworks — instant deployments, edge functions, preview environments, and built-in analytics. We deploy and optimize Next.js and React applications on Vercel for maximum performance.",
    accentColor: "neutral",
    visualizationKey: "vercel",
    logo: null,
    lucideIcon: "Triangle",
    features: [
      {
        icon: "Zap",
        title: "Instant deployments",
        description:
          "Every git push triggers an automatic build and deploy — production and preview environments with unique URLs for every branch and pull request.",
      },
      {
        icon: "Globe",
        title: "Edge Functions & Middleware",
        description:
          "Run code at the edge (300+ locations) with Vercel Edge Functions and Middleware — geo-routing, A/B testing, auth checks, and rewrites with sub-millisecond cold starts.",
      },
      {
        icon: "RefreshCw",
        title: "ISR & on-demand revalidation",
        description:
          "Incremental Static Regeneration serves cached pages instantly and rebuilds them in the background — on-demand revalidation via API for instant content updates.",
      },
      {
        icon: "BarChart3",
        title: "Analytics & Speed Insights",
        description:
          "Real User Monitoring (RUM) built in — Core Web Vitals, page-level performance, and traffic analytics without third-party scripts slowing your site.",
      },
      {
        icon: "Eye",
        title: "Preview deployments",
        description:
          "Every pull request gets a live preview URL — shareable with stakeholders, automatically updated on push, with optional comment integration.",
      },
      {
        icon: "Lock",
        title: "DDoS protection & firewall",
        description:
          "Enterprise-grade DDoS mitigation, Web Application Firewall (WAF), and bot protection — included on Pro and Enterprise plans.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "react" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Vercel is the deployment platform purpose-built for frontend frameworks — and it's the company behind Next.js, the most popular React framework. Vercel's platform turns every git push into a production deployment: builds are automatic, preview URLs are generated for every branch, and production deploys roll out globally across Vercel's Edge Network in seconds. The developer experience is best-in-class — zero-config deployments, instant rollbacks, and environment variables managed per branch.\n\nVercel's Edge Network is the differentiator. Edge Functions run server-side code at 300+ locations worldwide with near-zero cold starts. Middleware executes before every request — enabling auth checks, geo-routing, A/B tests, and feature flags at the edge. ISR (Incremental Static Regeneration) serves cached pages instantly and rebuilds them in the background, combining the speed of static sites with the freshness of server-rendered content. For Next.js apps, Vercel supports every rendering mode: SSG, SSR, ISR, and the App Router with React Server Components.\n\nVercel's free tier is generous for personal projects, but production teams typically need Pro ($20/user/month) for commercial use, team features, and higher limits. The trade-off is vendor coupling — Next.js features like Middleware, ISR, and Server Actions work best on Vercel, and self-hosting requires more operational effort. A Major deploys and optimizes applications on Vercel, configuring edge caching, ISR strategies, and preview workflows for maximum performance and developer productivity.",
    challenges: [
      {
        title: "Vendor coupling with Next.js",
        description:
          "While Next.js is open-source, advanced features (ISR, Middleware, Image Optimization) work most seamlessly on Vercel. Self-hosting Next.js requires configuring these features independently, which adds operational overhead.",
      },
      {
        title: "Serverless function limits",
        description:
          "Vercel Serverless Functions have execution time limits (10s on Hobby, 60s on Pro, 900s on Enterprise), size limits (50MB), and concurrency caps. Long-running processes need different architectures.",
      },
      {
        title: "Cost scaling for high-traffic sites",
        description:
          "Vercel's usage-based pricing (bandwidth, function invocations, edge middleware) can escalate quickly at high traffic. Understanding and optimizing caching strategies is essential to control costs.",
      },
      {
        title: "Database and backend connectivity",
        description:
          "Vercel is a frontend-first platform. Connecting to databases requires managing connection pooling (serverless functions create many short-lived connections), and complex backend logic may be better suited to a separate service.",
      },
    ],
    bestPractices: [
      {
        tip: "Maximize ISR and edge caching",
        detail:
          "Use ISR with on-demand revalidation for content pages — serve from cache instantly and update via webhook when content changes. Configure Cache-Control headers for API routes to leverage Vercel's edge cache.",
      },
      {
        tip: "Use preview deployments for every PR",
        detail:
          "Share preview URLs with designers, PMs, and QA for every pull request. Enable commenting and integrate with Slack or Linear for seamless review workflows.",
      },
      {
        tip: "Monitor with Speed Insights",
        detail:
          "Enable Vercel Speed Insights to track Core Web Vitals (LCP, CLS, INP) per page with real user data. Identify slow pages and optimize before performance degrades in production.",
      },
      {
        tip: "Use Edge Middleware sparingly",
        detail:
          "Middleware runs on every request — keep it lightweight. Use it for auth checks, redirects, and geo-routing. Move heavy computation to Serverless or Edge Functions instead.",
      },
    ],
    usefulLinks: [
      {
        title: "Vercel Documentation",
        url: "https://vercel.com/docs",
        type: "docs",
      },
      {
        title: "Vercel Templates",
        url: "https://vercel.com/templates",
        type: "tutorial",
      },
      {
        title: "Vercel Edge Functions",
        url: "https://vercel.com/docs/functions/edge-functions",
        type: "docs",
      },
      {
        title: "Vercel Community",
        url: "https://github.com/vercel/next.js/discussions",
        type: "community",
      },
    ],
    faq: [
      {
        question: "How much does Vercel cost?",
        answer:
          "Vercel Hobby is free for personal, non-commercial projects. Pro is $20/user/month with 1TB bandwidth, 1M function invocations, and higher limits. Enterprise adds SLAs, SSO, and custom limits. Bandwidth overages on Pro cost $40/100GB. For most small-to-medium teams, Pro costs $60–$200/month total.",
      },
      {
        question: "Vercel vs Netlify — which should I use?",
        answer:
          "Vercel is the best platform for Next.js — it's built by the same team. Netlify is better for static sites, Astro, Hugo, and projects that benefit from Netlify Forms and Identity. Both offer preview deployments and edge functions. Choose Vercel for Next.js/React; Netlify for JAMstack and multi-framework flexibility.",
      },
      {
        question: "Can I self-host Next.js instead of using Vercel?",
        answer:
          "Yes — Next.js runs on any Node.js server, Docker container, or serverless platform. However, features like ISR, Image Optimization, and Middleware require additional configuration when self-hosting. You'll need to set up your own CDN, build pipeline, and preview environments. Vercel handles all of this automatically.",
      },
      {
        question: "Is Vercel suitable for production enterprise apps?",
        answer:
          "Yes — Vercel Enterprise includes SLAs (99.99% uptime), SOC 2 compliance, SSO/SAML, audit logs, spend management, and dedicated support. Companies like Washington Post, Under Armour, and HashiCorp run production sites on Vercel Enterprise.",
      },
    ],
    quickstart:
      "# Install Vercel CLI\nnpm install -g vercel\n\n# Deploy from any framework project\nvercel\n\n# Or create a new Next.js project and deploy\nnpx create-next-app@latest my-app\ncd my-app\nvercel\n\n# Deploy to production\nvercel --prod",
    quickstartLang: "bash",
    docsUrl: "https://vercel.com/docs",
  },

  // ─── NETLIFY ────────────────────────────────────────────────────
  {
    slug: "netlify",
    name: "Netlify",
    category: "tooling",
    tagline: "The modern web platform for JAMstack and beyond",
    description:
      "Netlify pioneered the JAMstack movement — combining static sites, serverless functions, and edge computing into a seamless developer workflow. We build and deploy fast, scalable sites on Netlify for teams that value simplicity.",
    accentColor: "teal",
    visualizationKey: "netlify",
    logo: null,
    lucideIcon: "Globe",
    features: [
      {
        icon: "Zap",
        title: "Instant builds & deploys",
        description:
          "Git-triggered builds with atomic deploys, instant rollbacks, and deploy previews for every pull request — zero-downtime deployments every time.",
      },
      {
        icon: "Code",
        title: "Serverless Functions",
        description:
          "AWS Lambda-powered serverless functions with zero configuration — deploy alongside your site, automatic API routing, and background functions for long tasks.",
      },
      {
        icon: "Globe",
        title: "Edge Functions",
        description:
          "Deno-based edge functions running at 300+ locations — transform responses, personalize content, handle auth, and run A/B tests at the edge with TypeScript.",
      },
      {
        icon: "FileText",
        title: "Netlify Forms",
        description:
          "HTML-based form handling — add a netlify attribute to any form and submissions are captured, emailed, and accessible via API. No backend required.",
      },
      {
        icon: "Shield",
        title: "Netlify Identity",
        description:
          "Drop-in auth with email/password, magic links, and OAuth providers — JWT-based identity management with role-based access control for gated content.",
      },
      {
        icon: "RefreshCw",
        title: "Build hooks & webhooks",
        description:
          "Trigger rebuilds from any CMS, webhook, or cron job. Combine with ISR-like patterns for dynamic content that updates without full rebuilds.",
      },
    ],
    subTechs: [{ slug: "astro" }, { slug: "react" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Netlify helped define the modern JAMstack movement — the architectural approach of pre-rendering static pages, enhancing with JavaScript, and connecting to APIs and serverless functions for dynamic behavior. The platform turns any Git repository into a deployed website: push to main and Netlify builds, deploys, and serves your site on a global CDN with HTTPS, branch previews, and instant rollbacks. It supports virtually every static site generator and frontend framework — Astro, Next.js, Nuxt, SvelteKit, Hugo, Gatsby, and plain HTML.\n\nBeyond static hosting, Netlify provides a serverless backend layer. Serverless Functions (powered by AWS Lambda) deploy alongside your site with zero configuration. Edge Functions (powered by Deno) run at the edge for personalization, auth, and response transforms. Netlify Forms captures submissions from any HTML form without a backend. Netlify Identity provides JWT-based authentication. Together, these features let you build full-featured applications without managing any infrastructure.\n\nNetlify's sweet spot is marketing sites, documentation, blogs, and content-driven applications — projects where build-time rendering, CDN delivery, and simple serverless functions cover the majority of needs. For complex server-side applications, Netlify's serverless model has limits (function execution caps, cold starts, no persistent connections). A Major builds on Netlify when it's the right fit and helps teams evaluate when a more flexible platform is needed.",
    challenges: [
      {
        title: "Build time limitations",
        description:
          "Netlify builds have time limits (15 minutes on free, 30 on Pro). Large sites with thousands of pages can hit these limits. Incremental builds and on-demand builders help, but very large sites may need architectural changes.",
      },
      {
        title: "Serverless function constraints",
        description:
          "Netlify Functions have a 10-second timeout (26 seconds on Pro), 1024MB memory limit, and are synchronous by default. Background Functions extend to 15 minutes but have different invocation patterns. Complex backends may outgrow these limits.",
      },
      {
        title: "Framework-specific feature gaps",
        description:
          "While Netlify supports many frameworks, some framework features (like Next.js ISR or SvelteKit streaming) work differently or have limitations compared to their native platforms (Vercel, Cloudflare).",
      },
      {
        title: "Vendor lock-in with Netlify-specific features",
        description:
          "Netlify Forms, Identity, and Build Plugins are proprietary. Using them heavily makes migration harder. Evaluate whether the convenience justifies the coupling for your specific use case.",
      },
    ],
    bestPractices: [
      {
        tip: "Use branch deploys and deploy previews",
        detail:
          "Configure branch deploys for staging environments and deploy previews for every PR. Share preview URLs with stakeholders for visual review before merging. Enable Netlify's deploy notifications in Slack.",
      },
      {
        tip: "Leverage edge functions for personalization",
        detail:
          "Use Netlify Edge Functions for geo-based redirects, A/B testing, authentication checks, and response transforms. They run at the edge with Deno — TypeScript, fast cold starts, and access to request geo data.",
      },
      {
        tip: "Cache aggressively with proper headers",
        detail:
          "Netlify's CDN respects Cache-Control headers. Set long cache times for static assets with hashed filenames, and shorter TTLs for HTML pages. Use Netlify's cache purge API for instant invalidation when content changes.",
      },
      {
        tip: "Use build plugins for optimization",
        detail:
          "Netlify Build Plugins automate tasks — lighthouse audits, image optimization, sitemap generation, and cache prewarming run as part of your build pipeline without custom CI scripts.",
      },
    ],
    usefulLinks: [
      {
        title: "Netlify Documentation",
        url: "https://docs.netlify.com/",
        type: "docs",
      },
      {
        title: "Netlify Functions",
        url: "https://docs.netlify.com/functions/overview/",
        type: "docs",
      },
      {
        title: "JAMstack.org",
        url: "https://jamstack.org/",
        type: "community",
      },
      {
        title: "Netlify Community Forums",
        url: "https://answers.netlify.com/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Netlify vs Vercel — which should I use?",
        answer:
          "Vercel is the best platform for Next.js specifically. Netlify is more framework-agnostic — it excels with Astro, Hugo, 11ty, and multi-framework setups. Netlify's built-in Forms and Identity are unique conveniences. Choose Vercel for Next.js-first teams; Netlify for JAMstack diversity and teams using multiple frameworks.",
      },
      {
        question: "What are the benefits of JAMstack?",
        answer:
          "JAMstack (JavaScript, APIs, Markup) pre-renders pages at build time, serving them from a CDN — resulting in faster load times, better security (no server to attack), lower hosting costs, and easier scaling. Dynamic features are handled by APIs and serverless functions. It's ideal for content-driven sites, documentation, and marketing pages.",
      },
      {
        question: "How much does Netlify cost?",
        answer:
          "Netlify's free tier includes 100GB bandwidth, 300 build minutes, and 125K serverless function invocations per month. Pro is $19/member/month with 1TB bandwidth, 25K build minutes, and background functions. Enterprise adds SSO, SLAs, and higher limits. Most small teams operate well within the free or Pro tiers.",
      },
      {
        question: "Can Netlify handle high-traffic sites?",
        answer:
          "Yes — Netlify serves pre-rendered pages from a global CDN, which handles traffic spikes effortlessly. Static content scales infinitely. The bottleneck is serverless functions — high-traffic dynamic features may need careful optimization or a dedicated backend service alongside Netlify's static hosting.",
      },
    ],
    quickstart:
      "# Install Netlify CLI\nnpm install -g netlify-cli\n\n# Create and deploy an Astro site\nnpm create astro@latest my-site\ncd my-site\nnetlify init\nnetlify deploy --prod\n\n# Or link an existing repo\nnetlify link\nnetlify deploy --prod",
    quickstartLang: "bash",
    docsUrl: "https://docs.netlify.com/",
  },

  // ─── REDIS ──────────────────────────────────────────────────────
  {
    slug: "redis",
    name: "Redis",
    category: "database",
    tagline: "In-memory data store for caching, queues, and real-time systems",
    description:
      "Redis is the world's fastest in-memory data store — used for caching, session management, rate limiting, queues, and real-time leaderboards. We architect Redis layers that slash response times and scale to millions of operations per second.",
    accentColor: "red",
    visualizationKey: "redis",
    logo: null,
    lucideIcon: "Database",
    features: [
      {
        icon: "Zap",
        title: "Sub-millisecond caching",
        description:
          "Cache database queries, API responses, and computed results in memory — reducing latency from hundreds of milliseconds to sub-millisecond for repeated requests.",
      },
      {
        icon: "Shield",
        title: "Session storage",
        description:
          "Store user sessions in Redis for fast, distributed session management — shared across multiple application servers with automatic TTL-based expiry.",
      },
      {
        icon: "Bell",
        title: "Pub/Sub & Streams",
        description:
          "Real-time messaging with Redis Pub/Sub for broadcast patterns and Redis Streams for durable, consumer-group-based event processing.",
      },
      {
        icon: "Clock",
        title: "Rate limiting",
        description:
          "Implement API rate limiting with Redis counters and sliding windows — atomic increment operations ensure accurate throttling under high concurrency.",
      },
      {
        icon: "Layers",
        title: "Queues & background jobs",
        description:
          "BullMQ and similar libraries use Redis as a job queue backend — reliable, priority-based task processing with retries, delays, and scheduled jobs.",
      },
      {
        icon: "Search",
        title: "Redis Stack",
        description:
          "Full-text search (RediSearch), JSON document storage (RedisJSON), graph queries (RedisGraph), and time-series data (RedisTimeSeries) — extending Redis beyond key-value.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "postgresql" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "Redis is an in-memory data structure store that operates at sub-millisecond latency — making it the de facto standard for caching, session management, rate limiting, and real-time data processing. Unlike simple key-value stores, Redis supports rich data structures: strings, hashes, lists, sets, sorted sets, streams, and HyperLogLog — each with atomic operations that make complex patterns possible without external locking or coordination.\n\nThe most common Redis use case is caching: placing a Redis layer between your application and database reduces query load and cuts response times dramatically. But Redis powers much more — session storage across distributed servers, rate limiting for API protection, job queues (via BullMQ or Sidekiq), real-time leaderboards (sorted sets), pub/sub messaging for WebSocket fan-out, and distributed locks for coordinating microservices. Redis Streams provide a Kafka-like log data structure for event-driven architectures at a fraction of the operational complexity.\n\nRedis Stack extends the core with modules: RediSearch adds full-text search with secondary indexing, RedisJSON stores and queries JSON documents natively, and RedisTimeSeries handles time-series data efficiently. Managed Redis is available via Redis Cloud, AWS ElastiCache, Upstash (serverless), and others. A Major architects Redis caching layers, queue systems, and real-time data pipelines that handle millions of operations per second while remaining operationally simple.",
    challenges: [
      {
        title: "Memory management and cost",
        description:
          "Redis stores everything in RAM — which is expensive. A 100GB dataset requires 100GB+ of memory. Understanding memory efficiency (encoding, compression, TTL policies) is critical to keeping Redis costs manageable at scale.",
      },
      {
        title: "Persistence and durability trade-offs",
        description:
          "Redis offers RDB snapshots and AOF logging for persistence, but both have trade-offs — RDB can lose recent data, AOF impacts performance. For critical data, understanding the persistence configuration and its failure modes is essential.",
      },
      {
        title: "Cache invalidation strategies",
        description:
          "Cache invalidation is one of computing's hardest problems. Deciding when to invalidate (TTL-based, event-based, write-through), what to cache, and handling cache stampedes requires careful architectural planning.",
      },
      {
        title: "Cluster topology and scaling",
        description:
          "Redis Cluster shards data across nodes, but cross-slot operations are limited (multi-key commands must target the same hash slot). Designing your key schema for cluster compatibility requires upfront planning.",
      },
    ],
    bestPractices: [
      {
        tip: "Use appropriate TTLs on every key",
        detail:
          "Never cache without a TTL — unbounded caches grow until memory runs out. Set TTLs based on data freshness requirements: 60s for API responses, 24h for user sessions, 7d for computed aggregations.",
      },
      {
        tip: "Choose the right data structure",
        detail:
          "Use hashes for objects (memory-efficient for small hashes), sorted sets for leaderboards and ranked data, lists for queues, sets for unique collections, and streams for event logs. The right structure avoids expensive workarounds.",
      },
      {
        tip: "Implement cache-aside with stampede protection",
        detail:
          "Use the cache-aside pattern: read from cache, on miss fetch from database and populate cache. Add lock-based or probabilistic early recomputation to prevent cache stampedes when popular keys expire simultaneously.",
      },
      {
        tip: "Use connection pooling",
        detail:
          "Create a Redis connection pool (e.g., ioredis with lazyConnect) and reuse connections across requests. Each new TCP connection has overhead — pooling is essential for serverless environments and high-throughput apps.",
      },
    ],
    usefulLinks: [
      {
        title: "Redis Documentation",
        url: "https://redis.io/docs/",
        type: "docs",
      },
      {
        title: "Redis University (Free Courses)",
        url: "https://university.redis.io/",
        type: "tutorial",
      },
      {
        title: "BullMQ — Redis Queue for Node.js",
        url: "https://docs.bullmq.io/",
        type: "tool",
      },
      {
        title: "Redis Community on Discord",
        url: "https://discord.com/invite/redis",
        type: "community",
      },
    ],
    faq: [
      {
        question: "Redis vs Memcached — which should I use?",
        answer:
          "Redis supports rich data structures (lists, sets, sorted sets, streams), persistence, pub/sub, and Lua scripting. Memcached is simpler — key-value only, multi-threaded, and slightly faster for pure string caching. For most applications, Redis's versatility makes it the better choice. Use Memcached only for simple, high-throughput string caching where Redis features aren't needed.",
      },
      {
        question: "When should I use Redis?",
        answer:
          "Use Redis for: caching database queries and API responses, user session storage, rate limiting, real-time leaderboards, job queues (BullMQ), pub/sub messaging, distributed locks, and temporary data with TTLs. Don't use Redis as a primary database for critical data — its persistence model has durability trade-offs compared to Postgres or MySQL.",
      },
      {
        question: "What are Redis persistence options?",
        answer:
          "Redis offers two persistence mechanisms: RDB (periodic snapshots — fast recovery, potential data loss between snapshots) and AOF (append-only log — better durability, larger files, slower recovery). You can use both simultaneously for the best of each. For pure caching, you can disable persistence entirely — faster performance, and data rebuilds from the source on restart.",
      },
      {
        question: "How much memory does Redis need?",
        answer:
          "Redis uses slightly more memory than the raw data size due to internal overhead (pointers, metadata). A rough estimate: 1 million small key-value pairs (~100 bytes each) uses ~180MB. Use Redis's MEMORY USAGE command to measure actual consumption. For cost efficiency, consider Upstash (serverless, pay-per-command) for low-traffic use cases.",
      },
    ],
    quickstart:
      "# Install Redis (macOS)\nbrew install redis && brew services start redis\n\n# Or use Docker\ndocker run -d -p 6379:6379 redis:7-alpine\n\n# Connect with redis-cli\nredis-cli\n> SET mykey \"Hello Redis\"\n> GET mykey\n\n# Node.js with ioredis\nnpm install ioredis\n# import Redis from 'ioredis';\n# const redis = new Redis();\n# await redis.set('key', 'value', 'EX', 60);",
    quickstartLang: "bash",
    docsUrl: "https://redis.io/docs/",
  },

  // ─── GRAPHQL ────────────────────────────────────────────────────
  {
    slug: "graphql",
    name: "GraphQL",
    category: "backend",
    tagline: "A query language for APIs — ask for exactly what you need",
    description:
      "GraphQL lets clients request exactly the data they need in a single query — no over-fetching, no under-fetching. We design GraphQL schemas, build performant resolvers, and implement federation for distributed teams.",
    accentColor: "pink",
    visualizationKey: "graphql",
    logo: null,
    lucideIcon: "GitBranch",
    features: [
      {
        icon: "GitBranch",
        title: "Schema-first API design",
        description:
          "Strongly typed schemas define your API contract — every query, mutation, and type is documented and validated at build time. No more guessing what an endpoint returns.",
      },
      {
        icon: "Zap",
        title: "Precise data fetching",
        description:
          "Clients request exactly the fields they need — one query replaces multiple REST calls. Mobile apps fetch minimal payloads, dashboards fetch rich data, from the same API.",
      },
      {
        icon: "RefreshCw",
        title: "Real-time subscriptions",
        description:
          "GraphQL Subscriptions push data to clients over WebSocket — live notifications, chat messages, and real-time dashboards powered by the same schema.",
      },
      {
        icon: "Layers",
        title: "Apollo Federation",
        description:
          "Compose multiple GraphQL services into a single unified schema — each team owns their subgraph, the gateway stitches them together transparently.",
      },
      {
        icon: "Code",
        title: "Code generation",
        description:
          "Generate TypeScript types, React hooks, and SDK clients directly from your schema — end-to-end type safety from backend schema to frontend component.",
      },
      {
        icon: "Search",
        title: "Introspection & tooling",
        description:
          "GraphQL is self-documenting — introspection queries expose the full schema. Tools like GraphiQL and Apollo Studio provide visual exploration, query building, and performance tracing.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "react" }, { slug: "trpc" }],
    pageType: "tech",
    targetAudience: "developers",
    overview:
      "GraphQL is a query language and runtime for APIs that lets clients specify exactly what data they need. Instead of hitting multiple REST endpoints and filtering out unwanted fields, a GraphQL client sends a single query describing the shape of the response — and the server returns exactly that shape. This eliminates over-fetching (getting too much data) and under-fetching (needing multiple requests), which is particularly valuable for mobile apps on slow networks and complex UIs that aggregate data from multiple sources.\n\nAt its core, GraphQL is a type system. You define a schema — types, queries, mutations, and subscriptions — that serves as the contract between frontend and backend. This schema is introspectable (clients can discover what's available), validated at build time (invalid queries fail before they reach production), and enables powerful code generation. Tools like GraphQL Code Generator and Relay Compiler generate TypeScript types and React hooks directly from your schema, providing end-to-end type safety with zero manual type definitions.\n\nThe challenge with GraphQL is that it moves complexity from the client to the server. Resolvers must handle N+1 query problems (DataLoader is essential), authorization must be enforced at the resolver level, and query complexity limits prevent malicious deeply-nested queries. For large organizations, Apollo Federation composes multiple team-owned subgraphs into a unified API gateway. A Major designs GraphQL schemas, implements performant resolvers with proper batching, and sets up federation architectures for teams that need a flexible, strongly-typed API layer.",
    challenges: [
      {
        title: "N+1 query problem",
        description:
          "Naive resolver implementations trigger a separate database query for each related item — fetching 50 users with posts can trigger 51 queries. DataLoader solves this by batching and caching, but it must be implemented for every relationship.",
      },
      {
        title: "Query complexity and security",
        description:
          "GraphQL's flexibility is a double-edged sword — clients can construct deeply nested, expensive queries. Without query depth limits, complexity analysis, and rate limiting, a single malicious query can overwhelm your server.",
      },
      {
        title: "Caching complexity",
        description:
          "REST APIs cache naturally with HTTP caching (URLs map to cache keys). GraphQL uses a single endpoint with POST requests, making HTTP caching impossible. Client-side caching (Apollo, Relay) uses normalized stores, but CDN-level caching requires persisted queries or GET requests.",
      },
      {
        title: "Schema evolution and versioning",
        description:
          "GraphQL schemas don't version like REST APIs (v1, v2). Instead, fields are deprecated and new fields are added. Managing this evolution across clients — especially mobile apps that can't be force-updated — requires careful deprecation policies and field tracking.",
      },
    ],
    bestPractices: [
      {
        tip: "Use DataLoader for every relationship",
        detail:
          "Implement DataLoader for batching and caching at the resolver level. Without it, a list query fetching N items with M relations triggers N*M database queries. DataLoader collapses these into 2 queries — one for items, one for all related items.",
      },
      {
        tip: "Implement query complexity limits",
        detail:
          "Assign cost values to fields and limit total query complexity. A deeply nested query requesting all users → posts → comments → likes could return millions of rows. Use graphql-query-complexity or Apollo's built-in cost analysis.",
      },
      {
        tip: "Generate types from schema",
        detail:
          "Use GraphQL Code Generator to create TypeScript types, React hooks (useQuery, useMutation), and server-side resolver types from your schema. This ensures frontend and backend stay in sync without manual type maintenance.",
      },
      {
        tip: "Design schemas for client needs, not database structure",
        detail:
          "GraphQL schemas should model the domain as clients need it — not mirror your database tables. Use connections for pagination, dedicated input types for mutations, and meaningful field names that read naturally in queries.",
      },
    ],
    usefulLinks: [
      {
        title: "GraphQL Official Documentation",
        url: "https://graphql.org/learn/",
        type: "docs",
      },
      {
        title: "Apollo GraphQL",
        url: "https://www.apollographql.com/docs/",
        type: "docs",
      },
      {
        title: "GraphQL Code Generator",
        url: "https://the-guild.dev/graphql/codegen",
        type: "tool",
      },
      {
        title: "GraphQL Community on Discord",
        url: "https://discord.graphql.org/",
        type: "community",
      },
    ],
    faq: [
      {
        question: "GraphQL vs REST — when should I use GraphQL?",
        answer:
          "Use GraphQL when: multiple clients (web, mobile, third-party) need different data shapes from the same API, your UI aggregates data from multiple resources in a single view, or you want end-to-end type safety via code generation. Stick with REST for simple CRUD APIs, public APIs that benefit from HTTP caching, or teams without GraphQL experience. A Major helps you evaluate the trade-offs for your specific project.",
      },
      {
        question: "Is GraphQL slower than REST?",
        answer:
          "Not inherently — but poorly implemented GraphQL can be. The N+1 problem, deeply nested queries, and lack of CDN caching can make naive GraphQL slower than REST. With DataLoader batching, query complexity limits, persisted queries, and proper resolver optimization, GraphQL performance matches or exceeds REST for complex data fetching patterns.",
      },
      {
        question: "Should I use Apollo or Relay on the client?",
        answer:
          "Apollo Client is more approachable — flexible, works with any GraphQL server, and has a gentler learning curve. Relay is Facebook's client — more opinionated, tighter schema conventions (connections, node IDs), but produces optimal queries and handles pagination elegantly. For most teams, Apollo Client is the practical choice. Relay shines in large-scale apps with strict schema conventions.",
      },
      {
        question: "Can GraphQL replace REST entirely?",
        answer:
          "Technically yes, but pragmatically no for all use cases. GraphQL excels for read-heavy, relationship-rich queries. File uploads, webhooks, streaming responses, and simple CRUD operations are often simpler with REST. Many production architectures use GraphQL for the main API and REST for specific endpoints like file uploads and health checks.",
      },
    ],
    quickstart:
      "# Create a new Apollo Server project\nmkdir my-graphql-api && cd my-graphql-api\nnpm init -y\nnpm install @apollo/server graphql\n\n# Create index.ts with a simple schema\n# import { ApolloServer } from '@apollo/server';\n# import { startStandaloneServer } from '@apollo/server/standalone';\n#\n# const typeDefs = `type Query { hello: String }`;\n# const resolvers = { Query: { hello: () => 'Hello world!' } };\n# const server = new ApolloServer({ typeDefs, resolvers });\n# const { url } = await startStandaloneServer(server);\n# console.log(`Server ready at ${url}`);",
    quickstartLang: "bash",
    docsUrl: "https://graphql.org/learn/",
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return servicesConfig.find((s) => s.slug === slug);
}

export const frontendServices = servicesConfig.filter(
  (s) => s.category === "frontend"
);
export const fullStackServices = servicesConfig.filter(
  (s) => s.category === "full-stack"
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
