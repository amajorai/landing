export interface ComparisonPoint {
  category: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "tie";
}

export interface ComparisonConfig {
  slug: string;
  category?: "stack";
  nameA: string;
  nameB: string;
  tagline: string;
  description: string;
  overview: string;
  logoA?: string | null;
  logoB?: string | null;
  logoDarkA?: string | null;
  logoDarkB?: string | null;
  verdict: string;
  verdictDetail: string;
  points: ComparisonPoint[];
  whenToChooseA: string[];
  whenToChooseB: string[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const compareConfig: ComparisonConfig[] = [
  // ─── REACT VS VUE ──────────────────────────────────────────────
  {
    slug: "react-vs-vue",
    logoA: "/logos/services/react_dark.svg",
    logoB: "/logos/services/vue.svg",
    nameA: "React",
    nameB: "Vue",
    tagline:
      "Component libraries, ecosystems, and hiring — what the decision really comes down to",
    description:
      "React and Vue are the two most popular JavaScript frameworks for building user interfaces. Both are component-based, reactive, and production-proven — but they differ significantly in philosophy, ecosystem, and developer experience.",
    overview:
      "React and Vue have been the top two frontend frameworks for most of the 2020s. React, backed by Meta, has the largest ecosystem and dominates the job market. Vue, created by Evan You, is praised for its gentle learning curve and elegant design. Choosing between them affects not just your codebase but your ability to hire, the libraries available to you, and how quickly your team can move. Here's an honest breakdown of when each wins.",
    verdict: "React",
    verdictDetail:
      "For most new projects, React is the safer default. Its larger ecosystem, bigger talent pool, and stronger enterprise adoption make it the lower-risk choice. Choose Vue if your team already knows it, if you're building a project where developer experience is paramount, or if you're in a team where React's JSX paradigm is a barrier.",
    points: [
      {
        category: "Learning curve",
        a: "Steeper — JSX, hooks, and thinking in React take time",
        b: "Gentler — template syntax feels familiar to HTML developers",
        winner: "b",
      },
      {
        category: "Ecosystem size",
        a: "Largest in the industry — libraries for every use case",
        b: "Smaller but high-quality — covers 95% of use cases",
        winner: "a",
      },
      {
        category: "Job market",
        a: "Dominant — most frontend job postings require React",
        b: "Smaller but growing — popular in Asia and Europe",
        winner: "a",
      },
      {
        category: "TypeScript support",
        a: "Excellent — React + TypeScript is industry standard",
        b: "Excellent in Vue 3 — rewritten with TypeScript",
        winner: "tie",
      },
      {
        category: "Performance",
        a: "Excellent with proper memoization",
        b: "Excellent — slightly better out-of-the-box defaults",
        winner: "tie",
      },
      {
        category: "State management",
        a: "Context + useReducer, Zustand, Jotai, Redux Toolkit",
        b: "Pinia is the official recommended solution",
        winner: "tie",
      },
      {
        category: "Full-stack framework",
        a: "Next.js — mature, production-proven, Vercel-backed",
        b: "Nuxt — excellent but smaller community than Next.js",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "Your team will need to hire frontend developers — React's talent pool is far larger",
      "You're building a complex app that benefits from React's mature ecosystem",
      "You want to use Next.js for full-stack development",
      "Your enterprise clients or investors expect mainstream technology choices",
    ],
    whenToChooseB: [
      "Your existing team knows Vue and you don't need to hire",
      "You're building for a market where Vue is popular (Southeast Asia, China, parts of Europe)",
      "Developer experience and onboarding speed is more important than ecosystem breadth",
      "You prefer template syntax over JSX",
    ],
    faq: [
      {
        question: "Is React or Vue faster?",
        answer:
          "Both perform similarly in benchmarks. React requires more explicit optimization (useMemo, useCallback) to avoid unnecessary re-renders. Vue's reactivity system handles many optimizations automatically. For most real-world applications, the performance difference is negligible.",
      },
      {
        question: "Can I migrate from Vue to React (or vice versa)?",
        answer:
          "Migrating between frameworks is a significant investment — typically a full rewrite. The most practical approach is a gradual migration using a micro-frontend architecture, where new features are built in the target framework while the existing app continues running.",
      },
      {
        question: "Which is better for SEO?",
        answer:
          "Both React (via Next.js) and Vue (via Nuxt) support server-side rendering and static generation, making them equally SEO-capable. The framework choice matters less than implementing SSR correctly.",
      },
      {
        question: "Which should I choose for a Singapore-based project?",
        answer:
          "Both are commonly used in Singapore. React has higher adoption in enterprise and startup environments. Vue is popular in certain verticals and with developers who came from a backend or CMS background.",
      },
    ],
    relatedSlugs: ["react", "vue", "nextjs", "nuxt"],
  },

  // ─── NEXT.JS VS NUXT ───────────────────────────────────────────
  {
    slug: "nextjs-vs-nuxt",
    logoA: "/logos/services/nextjs_icon_dark.svg",
    logoB: "/logos/services/nuxt.svg",
    nameA: "Next.js",
    nameB: "Nuxt",
    tagline:
      "Two mature full-stack frameworks — what actually separates them in production",
    description:
      "Next.js and Nuxt are the leading full-stack frameworks for React and Vue respectively. Both offer SSR, SSG, API routes, and full-stack capabilities — but they have different maturity levels, ecosystems, and community sizes.",
    overview:
      "If you've already chosen React, you'll almost certainly use Next.js. If you've chosen Vue, Nuxt is the natural counterpart. But if you're starting fresh and undecided, the framework question and the library question are intertwined. Both Next.js and Nuxt have matured significantly — the gap has narrowed, but Next.js maintains a meaningful lead in enterprise adoption, ecosystem depth, and Vercel's investment.",
    verdict: "Next.js",
    verdictDetail:
      "Next.js is the safer choice for most production applications. Its App Router, React Server Components support, and Vercel platform integration give it meaningful advantages for complex applications. Nuxt 3 is excellent and worth choosing if your team already invests in Vue — but for new greenfield projects, Next.js has fewer unknowns.",
    points: [
      {
        category: "Community size",
        a: "Largest full-stack JS framework community",
        b: "Smaller but highly active and growing",
        winner: "a",
      },
      {
        category: "Server Components",
        a: "Full React Server Components support in App Router",
        b: "Vue's equivalent is in active development",
        winner: "a",
      },
      {
        category: "Hosting options",
        a: "Vercel (native), AWS, GCP, self-hosted — all well-supported",
        b: "Vercel, Netlify, Cloudflare, NuxtHub — good options",
        winner: "tie",
      },
      {
        category: "Developer experience",
        a: "Excellent — large body of tutorials, Stack Overflow answers",
        b: "Excellent — Nuxt Devtools are arguably better than Next",
        winner: "tie",
      },
      {
        category: "Edge runtime support",
        a: "Strong — Vercel Edge Functions, Cloudflare Workers",
        b: "Strong — Nitro server supports multiple runtimes",
        winner: "tie",
      },
      {
        category: "TypeScript",
        a: "Excellent — industry standard",
        b: "Excellent — Nuxt 3 fully TypeScript-first",
        winner: "tie",
      },
    ],
    whenToChooseA: [
      "You're building a React-based application",
      "Your team needs the largest possible pool of documentation and tutorials",
      "You want native Vercel deployment with minimal configuration",
      "You're building for enterprise clients who expect mainstream technology",
    ],
    whenToChooseB: [
      "You're building a Vue-based application",
      "You want the best-in-class developer tooling (Nuxt Devtools are excellent)",
      "You're deploying to Cloudflare Workers or edge environments",
      "Your team has strong Vue expertise and doesn't want to switch ecosystems",
    ],
    faq: [
      {
        question: "Can I deploy Next.js on non-Vercel infrastructure?",
        answer:
          "Yes. Next.js runs on AWS, GCP, Azure, Railway, Render, and self-hosted Node.js servers. Vercel provides the best Next.js experience, but it's not required. Some features like image optimization and edge functions have different behavior outside Vercel.",
      },
      {
        question:
          "What's the difference between App Router and Pages Router in Next.js?",
        answer:
          "App Router (introduced in Next.js 13) uses React Server Components and file-based routing in the `app/` directory. Pages Router is the legacy approach. New projects should use App Router — it's the direction Next.js is heading and unlocks server-side data fetching without extra code.",
      },
      {
        question: "Is Nuxt 3 production-ready?",
        answer:
          "Yes. Nuxt 3 has been stable since late 2022 and is used in production at major companies. The Nitro server engine is particularly good for serverless and edge deployments.",
      },
      {
        question: "Which framework is better for e-commerce?",
        answer:
          "Both work well for e-commerce. Next.js has more Shopify integrations (Hydrogen is React-based). For custom e-commerce without Shopify, both are equally capable.",
      },
    ],
    relatedSlugs: ["nextjs", "nuxt", "react", "vue"],
  },

  // ─── WORDPRESS VS WEBFLOW ──────────────────────────────────────
  {
    slug: "wordpress-vs-webflow",
    logoA: "/logos/services/wordpress.svg",
    logoB: "/logos/services/webflow.svg",
    nameA: "WordPress",
    nameB: "Webflow",
    tagline:
      "Open-source ownership vs hosted design tool — the real CMS trade-off",
    description:
      "WordPress powers 43% of the web. Webflow is the no-code website builder that designers love. Choosing between them determines how you'll build, maintain, and scale your website for years.",
    overview:
      "WordPress and Webflow represent two different philosophies: WordPress is open-source, infinitely extensible, and self-hosted. Webflow is a closed platform with a polished design tool, hosting included. Both have serious trade-offs. The right choice depends on your content volume, design requirements, technical team, and long-term scaling plans.",
    verdict: "WordPress",
    verdictDetail:
      "WordPress wins for content-heavy sites, blogs, complex plugins, and long-term ownership. Webflow wins for design-forward marketing sites where your team has limited developer resources. If you're building anything beyond a simple brochure site, WordPress's flexibility and ecosystem are hard to beat.",
    points: [
      {
        category: "Content management",
        a: "Excellent — mature CMS with custom post types, fields, taxonomy",
        b: "Good — CMS Collections work well for structured content",
        winner: "a",
      },
      {
        category: "Design flexibility",
        a: "Requires development — themes limit what non-devs can do",
        b: "Excellent — pixel-perfect designs without code",
        winner: "b",
      },
      {
        category: "Plugin ecosystem",
        a: "60,000+ plugins — virtually any feature available",
        b: "Limited — apps and integrations via third-party tools",
        winner: "a",
      },
      {
        category: "Hosting",
        a: "Self-hosted — you control the server, cost varies",
        b: "Managed — Webflow handles hosting, $23–39/month",
        winner: "tie",
      },
      {
        category: "SEO capabilities",
        a: "Excellent with Yoast, RankMath, and custom schemas",
        b: "Good built-in SEO, but limited structured data support",
        winner: "a",
      },
      {
        category: "Performance",
        a: "Requires optimization — caching, CDN, good hosting needed",
        b: "Good defaults — Webflow's CDN handles most optimization",
        winner: "b",
      },
      {
        category: "Long-term ownership",
        a: "You own everything — data, code, hosting",
        b: "Platform risk — Webflow controls pricing and features",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "You have a large content library or blog with hundreds of posts",
      "You need custom functionality via plugins (WooCommerce, LMS, membership)",
      "You want full ownership and portability of your website",
      "Your budget allows for a developer to handle ongoing maintenance",
    ],
    whenToChooseB: [
      "Your team is design-led and needs to make changes without a developer",
      "You're building a simple marketing site or landing page",
      "You want managed hosting with no server management",
      "You need rapid prototyping of visual designs before development",
    ],
    faq: [
      {
        question: "Can I migrate from Webflow to WordPress?",
        answer:
          "Yes, though it requires effort. Content can be exported from Webflow and imported into WordPress. Design and functionality need to be rebuilt. We handle migrations of all sizes.",
      },
      {
        question: "Is Webflow good for e-commerce?",
        answer:
          "Webflow's e-commerce is limited compared to WooCommerce or Shopify. For serious e-commerce, WooCommerce (WordPress) or a dedicated platform like Shopify is a better choice.",
      },
      {
        question: "Which is more secure?",
        answer:
          "Both have security considerations. WordPress requires active plugin updates and a security-hardened hosting environment. Webflow's managed platform handles most security automatically, but you're dependent on Webflow as a single point of failure.",
      },
      {
        question: "Can WordPress be made as fast as Webflow?",
        answer:
          "Yes. A properly optimized WordPress site on good hosting (WP Engine, Kinsta, or a managed VPS) with caching and a CDN can match or exceed Webflow's performance.",
      },
    ],
    relatedSlugs: ["wordpress", "webflow", "web-design", "seo-optimization"],
  },

  // ─── SHOPIFY VS WOOCOMMERCE ────────────────────────────────────
  {
    slug: "shopify-vs-woocommerce",
    logoA: "/logos/services/shopify.svg",
    logoB: "/logos/services/wordpress.svg",
    nameA: "Shopify",
    nameB: "WooCommerce",
    tagline:
      "Hosted simplicity vs full ownership — the e-commerce decision most stores get wrong",
    description:
      "Shopify and WooCommerce are the two most popular e-commerce platforms. Shopify is a SaaS platform with everything included. WooCommerce is a free WordPress plugin that gives you complete control. The right choice depends on your scale, technical resources, and growth plans.",
    overview:
      "The Shopify vs WooCommerce debate comes down to convenience vs. control. Shopify is polished, fast to launch, and handles hosting, security, and updates — but you pay monthly fees and work within Shopify's ecosystem. WooCommerce is free to install, infinitely customizable, and you own everything — but requires a developer for anything beyond basic customization. Both power stores doing millions in revenue.",
    verdict: "tie",
    verdictDetail:
      "There's no universal winner. Choose Shopify if speed-to-market and simplicity matter more than cost control. Choose WooCommerce if you need custom functionality, deep WordPress integration, or want to avoid Shopify's transaction fees on third-party payment processors.",
    points: [
      {
        category: "Setup speed",
        a: "Fastest — store live in a day with basic customization",
        b: "Longer — requires WordPress setup and theme configuration",
        winner: "a",
      },
      {
        category: "Monthly cost",
        a: "$29–299+/month plus transaction fees",
        b: "Free plugin — pay for hosting, themes, extensions separately",
        winner: "b",
      },
      {
        category: "Transaction fees",
        a: "0.5–2% unless using Shopify Payments",
        b: "No fees beyond payment gateway (Stripe, PayPal)",
        winner: "b",
      },
      {
        category: "Customization",
        a: "Limited to Liquid templates and app ecosystem",
        b: "Unlimited — full PHP/WordPress access",
        winner: "b",
      },
      {
        category: "App ecosystem",
        a: "8,000+ apps — covers virtually every use case",
        b: "Thousands of plugins — extensive but variable quality",
        winner: "a",
      },
      {
        category: "Hosting & security",
        a: "Fully managed — Shopify handles everything",
        b: "Your responsibility — requires good hosting and maintenance",
        winner: "a",
      },
      {
        category: "Scalability",
        a: "Scales automatically — Shopify handles traffic spikes",
        b: "Requires infrastructure investment at high traffic volumes",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "You want to launch fast without technical overhead",
      "You're not a developer and don't have one on your team",
      "You're using Shopify Payments (avoids transaction fees)",
      "You're in a market where Shopify's app ecosystem covers your needs",
    ],
    whenToChooseB: [
      "You need deep customization that Shopify's Liquid templates can't support",
      "You're already running a WordPress site and want to add a store",
      "You're processing high volumes and want to avoid Shopify's transaction fees",
      "You need complex product configurations, memberships, or subscription models",
    ],
    faq: [
      {
        question: "Can I migrate from Shopify to WooCommerce?",
        answer:
          "Yes. Products, customers, and orders can be exported from Shopify and imported into WooCommerce. We handle migrations including SEO preservation (301 redirects) to protect your search rankings.",
      },
      {
        question: "Which is better for SEO?",
        answer:
          "Both are capable of strong SEO. WooCommerce with Yoast or RankMath gives you more control over structured data and technical SEO. Shopify has improved significantly but still has limitations around URL structure and duplicate content.",
      },
      {
        question: "What are Shopify's hidden costs?",
        answer:
          "Transaction fees (if not using Shopify Payments), app subscription fees, theme purchase costs, and Shopify Plus for high-volume features ($2,300+/month). WooCommerce has different hidden costs — hosting, plugin licenses, and developer time.",
      },
      {
        question: "Can I use Shopify with a headless frontend?",
        answer:
          "Yes. Shopify's Storefront API and Hydrogen framework support headless e-commerce. This gives you complete frontend freedom (React, Next.js) with Shopify handling the commerce backend. We build headless Shopify stores.",
      },
    ],
    relatedSlugs: ["shopify", "woocommerce", "ecommerce", "wordpress"],
  },

  // ─── REACT NATIVE VS FLUTTER ───────────────────────────────────
  {
    slug: "react-native-vs-flutter",
    logoA: "/logos/services/react_dark.svg",
    logoB: "/logos/services/flutter.svg",
    nameA: "React Native",
    nameB: "Flutter",
    tagline:
      "JavaScript ecosystem vs Dart's rendering engine — what actually matters for your app",
    description:
      "React Native and Flutter are the two leading cross-platform mobile frameworks. React Native uses JavaScript/TypeScript and React. Flutter uses Dart and renders its own UI. Both target iOS and Android from a single codebase.",
    overview:
      "Cross-platform mobile development has matured significantly. React Native (Meta) and Flutter (Google) are both production-proven and used by major companies. The choice between them often comes down to your existing team's language background, the type of app you're building, and how much you value pixel-perfect custom UI vs. native feel.",
    verdict: "React Native",
    verdictDetail:
      "React Native is the better default if your team already knows JavaScript/TypeScript. Flutter is worth choosing if you need maximum UI consistency across platforms, or if you're specifically targeting the web in addition to mobile. Both are excellent — the choice is largely about language ecosystem fit.",
    points: [
      {
        category: "Language",
        a: "JavaScript/TypeScript — huge existing talent pool",
        b: "Dart — purpose-built for Flutter, smaller community",
        winner: "a",
      },
      {
        category: "UI consistency",
        a: "Uses native components — platform-specific differences",
        b: "Custom rendering engine — pixel-perfect consistency",
        winner: "b",
      },
      {
        category: "Performance",
        a: "Good — new architecture (JSI) significantly improves speed",
        b: "Excellent — Skia rendering engine is highly optimized",
        winner: "b",
      },
      {
        category: "Code sharing with web",
        a: "React Native Web shares logic; React Native for Web for UI",
        b: "Flutter Web exists but is not production-recommended",
        winner: "a",
      },
      {
        category: "Native module access",
        a: "Excellent — large ecosystem of community modules",
        b: "Good — platform channels work but more boilerplate",
        winner: "a",
      },
      {
        category: "Hot reload",
        a: "Good — fast refresh available",
        b: "Excellent — hot reload is Flutter's signature DX feature",
        winner: "b",
      },
      {
        category: "Hiring",
        a: "Easier — leverage existing web developers",
        b: "Harder — requires Dart knowledge",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "Your team already knows JavaScript or TypeScript",
      "You're sharing logic or components with a React web app",
      "You want to hire developers who already know React",
      "Your app relies heavily on native platform features via community modules",
    ],
    whenToChooseB: [
      "You need pixel-perfect UI that looks identical on iOS and Android",
      "You're building a heavily animated or custom-designed interface",
      "You want the best hot-reload development experience",
      "You're targeting desktop (macOS, Windows) in addition to mobile",
    ],
    faq: [
      {
        question: "Can I migrate from React Native to Flutter?",
        answer:
          "Business logic can be reimplemented, but the UI layer needs to be fully rebuilt. There's no automated migration path. We evaluate whether migration is worth the investment case-by-case.",
      },
      {
        question: "Is Expo worth using with React Native?",
        answer:
          "Yes for most projects. Expo's managed workflow handles the native build configuration, over-the-air updates, and app store submissions — significantly reducing operational overhead. Expo's bare workflow is available when you need direct native module access.",
      },
      {
        question: "Which companies use Flutter?",
        answer:
          "Google Pay, Alibaba (Xianyu), BMW, and eBay Motors use Flutter. It's particularly popular in fintech apps where consistent UI across platforms matters.",
      },
      {
        question: "Which framework has better performance for real-time apps?",
        answer:
          "Flutter has a slight edge for animations and complex UI — its Skia rendering bypasses platform components entirely. React Native's new architecture (Fabric + JSI) has closed the gap significantly for most use cases.",
      },
    ],
    relatedSlugs: ["react-native", "flutter", "mobile-apps", "react"],
  },

  // ─── TAILWIND VS BOOTSTRAP ─────────────────────────────────────
  {
    slug: "tailwind-vs-bootstrap",
    nameA: "Tailwind CSS",
    nameB: "Bootstrap",
    logoA: "/logos/services/tailwindcss.svg",
    logoB: "/logos/services/bootstrap.svg",
    tagline:
      "Utility-first flexibility vs battle-tested components — the CSS framework debate",
    description:
      "Tailwind CSS and Bootstrap are the two most widely used CSS frameworks. Tailwind gives you low-level utility classes to build custom designs. Bootstrap gives you a ready-made component library. The choice shapes how your team writes HTML and how distinctive your UI can look.",
    overview:
      "For most of the 2010s, Bootstrap was the default CSS framework. It's opinionated, ships with a full component library, and lets teams ship UIs fast. Tailwind changed the game by betting on utility classes — no pre-built components, just building blocks that compose into anything. The tradeoff is real: Tailwind UIs look distinctive and scale cleanly, while Bootstrap UIs are faster to start but harder to differentiate. For new projects in 2025, Tailwind is the clear default for custom design work. Bootstrap still wins for internal tools and admin panels where speed matters more than branding.",
    verdict: "Tailwind CSS",
    verdictDetail:
      "Tailwind is the better choice for most new projects. It produces smaller production CSS, enforces design-system thinking, and pairs excellently with component frameworks like React and Vue. Bootstrap is still worth reaching for in internal tools, rapid admin panel prototypes, or teams with no dedicated design resources.",
    points: [
      {
        category: "Design flexibility",
        a: "Unlimited — utility classes compose into any design",
        b: "Limited by Bootstrap's opinionated component styles",
        winner: "a",
      },
      {
        category: "Learning curve",
        a: "Steeper — requires understanding utility class conventions",
        b: "Gentle — HTML classes map directly to visible components",
        winner: "b",
      },
      {
        category: "Production bundle size",
        a: "Tiny — PurgeCSS removes unused utilities, typically <10kb",
        b: "Larger — full Bootstrap CSS is ~31kb minified+gzip",
        winner: "a",
      },
      {
        category: "Component library",
        a: "None built-in — requires headless UI libs or Shadcn",
        b: "Comprehensive — buttons, modals, navbars, grids included",
        winner: "b",
      },
      {
        category: "Customisation",
        a: "Deep — tailwind.config.ts controls every design token",
        b: "Moderate — Sass variable overrides, custom CSS needed for deep changes",
        winner: "a",
      },
      {
        category: "Design system consistency",
        a: "Excellent — spacing, colour, and type scales enforced by config",
        b: "Moderate — easy to introduce inconsistencies with custom CSS",
        winner: "a",
      },
      {
        category: "Speed to first UI",
        a: "Slower — must compose each element from scratch",
        b: "Fastest — paste a Bootstrap component and it works",
        winner: "b",
      },
    ],
    whenToChooseA: [
      "You want a custom, branded UI that doesn't look like every other Bootstrap site",
      "You're building with a component framework (React, Vue, Svelte) and want co-located styles",
      "Your team has a designer producing custom designs rather than using Bootstrap templates",
      "Bundle size matters — especially for marketing sites with Core Web Vitals targets",
    ],
    whenToChooseB: [
      "You need to ship an internal tool or admin panel fast with no designer on the team",
      "Your developers are more comfortable with traditional CSS than utility classes",
      "You're prototyping quickly and need working UI components without configuration",
      "The project is short-lived and long-term maintainability isn't a priority",
    ],
    faq: [
      {
        question: "Can I use Tailwind and Bootstrap together?",
        answer:
          "Technically yes, but it's not recommended. The two frameworks conflict in reset styles and class naming conventions. Mixing them creates maintenance problems. Pick one.",
      },
      {
        question: "Is Tailwind harder to read than normal CSS?",
        answer:
          "There's an adjustment period. Developers familiar with Tailwind read utility class strings quickly — they convey layout intent without context-switching to a separate stylesheet. Most teams find Tailwind more readable than scattered custom CSS after a few weeks.",
      },
      {
        question: "What's Shadcn/ui and how does it relate to Tailwind?",
        answer:
          "Shadcn/ui is a collection of accessible, copy-paste React components built on Tailwind and Radix UI. It gives Tailwind the component library Bootstrap has — without the lock-in, since you own the component code. It's the de facto answer to 'but Tailwind has no components'.",
      },
      {
        question: "Does Tailwind work with Next.js?",
        answer:
          "Yes. Tailwind and Next.js are the most common pairing in modern React development. Next.js includes Tailwind in its official create-next-app setup. Our default stack uses both.",
      },
    ],
    relatedSlugs: ["tailwind", "react", "nextjs"],
  },

  // ─── SUPABASE VS FIREBASE ──────────────────────────────────────
  {
    slug: "supabase-vs-firebase",
    nameA: "Supabase",
    nameB: "Firebase",
    logoA: "/logos/services/supabase.svg",
    logoB: "/logos/services/firebase.svg",
    tagline:
      "Postgres-powered open source vs Google's real-time NoSQL — the BaaS fork in the road",
    description:
      "Supabase and Firebase are both backend-as-a-service platforms that handle auth, databases, and file storage so you can ship faster. But they use fundamentally different database models — Supabase is Postgres, Firebase is NoSQL — and that difference has compounding downstream effects on your architecture.",
    overview:
      "Firebase dominated the BaaS space through the 2010s. Supabase launched in 2020 as the open-source Postgres alternative and has grown rapidly. Both handle the boilerplate of auth, database, storage, and real-time — but they diverge sharply on database model, vendor lock-in, pricing, and how you query data. If you already know SQL, Supabase will feel immediately productive. If your team prefers document stores or you need deep Google ecosystem integration, Firebase is still a strong choice.",
    verdict: "Supabase",
    verdictDetail:
      "For most new projects, Supabase is the better default. Postgres is more expressive than Firestore for relational data, pricing is more predictable, and you can self-host if needed. Firebase is worth choosing if you need deep Android/Google ecosystem integration, very simple document data, or your team has existing Firebase expertise.",
    points: [
      {
        category: "Database model",
        a: "PostgreSQL — relational, full SQL, joins, views, functions",
        b: "Firestore — NoSQL document store, denormalized data patterns",
        winner: "a",
      },
      {
        category: "Vendor lock-in",
        a: "Low — open source, self-hostable, data in standard Postgres",
        b: "High — Firebase-specific SDK, data in proprietary Firestore format",
        winner: "a",
      },
      {
        category: "Real-time subscriptions",
        a: "Good — Realtime via Postgres logical replication",
        b: "Excellent — real-time is Firebase's core strength since day one",
        winner: "b",
      },
      {
        category: "Auth",
        a: "Excellent — email, OAuth, magic links, phone, MFA",
        b: "Excellent — deep Google/Android integration, all common providers",
        winner: "tie",
      },
      {
        category: "Pricing predictability",
        a: "More predictable — row-based, clear tiers",
        b: "Can surprise — read/write costs spike under heavy load",
        winner: "a",
      },
      {
        category: "Edge functions",
        a: "Deno-based edge functions — good Deno ecosystem access",
        b: "Cloud Functions — mature, but cold starts and slower deploys",
        winner: "a",
      },
      {
        category: "Ecosystem maturity",
        a: "Newer — still maturing, some rough edges",
        b: "More mature — larger body of tutorials, SDKs, and examples",
        winner: "b",
      },
    ],
    whenToChooseA: [
      "Your data is relational — users, orders, products, relationships between entities",
      "You want to avoid vendor lock-in and keep the option to self-host",
      "Your team knows SQL and wants to write queries, not manage document denormalization",
      "Predictable pricing matters — you're building a high-read application",
    ],
    whenToChooseB: [
      "You're building for Android and want deep Google ecosystem integration",
      "Your data model is simple and document-shaped (e.g. chat messages, activity feeds)",
      "You need the most battle-tested real-time subscriptions available",
      "Your team has existing Firebase expertise and wants to move fast",
    ],
    faq: [
      {
        question: "Can I migrate from Firebase to Supabase?",
        answer:
          "Yes, but it requires rethinking your data model from documents to relations. Auth users can be migrated via Supabase's Firebase migration tool. Data migration requires a custom script to reshape Firestore documents into Postgres tables. We handle migrations.",
      },
      {
        question: "Is Supabase production-ready?",
        answer:
          "Yes. Supabase has been generally available since 2022 and handles production workloads at scale. Their managed platform runs on AWS with automatic backups, point-in-time recovery, and read replicas.",
      },
      {
        question: "Which is better for mobile apps?",
        answer:
          "Firebase has a stronger mobile story, especially for Android, with well-maintained native SDKs and features like push notifications, remote config, and crash reporting (Crashlytics). Supabase has mobile SDKs but is primarily web-first.",
      },
      {
        question: "Can I self-host Supabase?",
        answer:
          "Yes. Supabase is fully open source and Docker-composable. Self-hosting is documented and used in production. Firebase has no self-hosting option.",
      },
    ],
    relatedSlugs: ["firebase", "postgresql", "nextjs"],
  },

  // ─── POSTGRESQL VS MYSQL ───────────────────────────────────────
  {
    slug: "postgresql-vs-mysql",
    nameA: "PostgreSQL",
    nameB: "MySQL",
    logoA: "/logos/services/postgresql.svg",
    logoB: "/logos/services/mysql-icon-dark.svg",
    tagline:
      "The two giants of open-source SQL — which one should back your application",
    description:
      "PostgreSQL and MySQL are the two most widely deployed open-source relational databases. Both handle the core demands of web applications, but they diverge significantly on advanced features, JSON support, extension ecosystems, and licence terms.",
    overview:
      "MySQL powered the LAMP stack era and still runs much of the web. PostgreSQL grew from academia and has become the preferred database for complex applications, data teams, and modern cloud-native stacks. In 2025, PostgreSQL has pulled clearly ahead in developer surveys and new project adoption. MySQL remains widespread due to sheer historical inertia — it's the default in many shared hosts, and MariaDB forks are common in enterprise environments. For greenfield projects, Postgres is almost always the better choice.",
    verdict: "PostgreSQL",
    verdictDetail:
      "PostgreSQL is the better default for new projects. Its superior JSON support, extension ecosystem (pgvector, PostGIS, TimescaleDB), full ACID compliance, and more permissive licence make it the stronger foundation. Choose MySQL if you're inheriting an existing MySQL stack, using a platform that mandates it (e.g. some shared hosts), or need PlanetScale's branching workflow.",
    points: [
      {
        category: "JSON / JSONB support",
        a: "Excellent — JSONB with indexing, operators, and full query support",
        b: "Basic — JSON column exists but querying is limited",
        winner: "a",
      },
      {
        category: "Extension ecosystem",
        a: "Exceptional — pgvector, PostGIS, TimescaleDB, pg_cron, and hundreds more",
        b: "Limited — fewer extensions, less active extension ecosystem",
        winner: "a",
      },
      {
        category: "Full-text search",
        a: "Built-in and powerful — tsvector, GIN indexes, ranking",
        b: "Available but less capable — often supplemented with Elasticsearch",
        winner: "a",
      },
      {
        category: "Write performance",
        a: "Excellent — though MySQL can edge it in simple INSERT-heavy workloads",
        b: "Slightly faster for simple, high-volume INSERT workloads",
        winner: "b",
      },
      {
        category: "Replication",
        a: "Logical and streaming replication — flexible and reliable",
        b: "Mature — Group Replication and InnoDB Cluster well-tested",
        winner: "tie",
      },
      {
        category: "Licence",
        a: "PostgreSQL Licence — extremely permissive, no copyleft",
        b: "GPL — commercial use in SaaS requires careful licence review",
        winner: "a",
      },
      {
        category: "Hosted options",
        a: "Supabase, Neon, Railway, RDS, Cloud SQL, AlloyDB",
        b: "PlanetScale, RDS, Cloud SQL — solid but fewer modern options",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "You're starting a new project — Postgres is the modern default",
      "You need JSON storage with real querying capability (not just blob storage)",
      "You need geospatial queries, vector search (pgvector), or time-series (TimescaleDB)",
      "You're using Supabase, Neon, Prisma, or Drizzle — all optimised for Postgres",
    ],
    whenToChooseB: [
      "You're inheriting an existing MySQL or MariaDB database",
      "Your hosting environment mandates MySQL (some shared hosts, some legacy stacks)",
      "You want PlanetScale's branching workflow for schema migrations",
      "You're running a simple read-heavy web app where MySQL's defaults are fine",
    ],
    faq: [
      {
        question: "Is MariaDB a good alternative to MySQL?",
        answer:
          "MariaDB is a drop-in MySQL fork with some additional features. If you're choosing MySQL, MariaDB is worth considering — it has a more permissive licence and some storage engine improvements. It doesn't close the gap with PostgreSQL's advanced features though.",
      },
      {
        question: "Can I migrate from MySQL to PostgreSQL?",
        answer:
          "Yes, with tooling like pgloader or custom ETL scripts. SQL syntax differences require review — stored procedures, date functions, and some data types differ. We've handled migrations of all sizes.",
      },
      {
        question: "Which database do ORMs like Prisma and Drizzle prefer?",
        answer:
          "Both support MySQL and PostgreSQL, but their documentation, examples, and most features are Postgres-first. Enum types, JSON columns, and advanced indexing all work better with Postgres in these ORMs.",
      },
      {
        question: "What about SQLite for small projects?",
        answer:
          "SQLite is excellent for small projects, CLI tools, and edge deployments (Cloudflare D1, Turso). For anything with concurrent writes or a multi-user backend, Postgres is the step up — not MySQL.",
      },
    ],
    relatedSlugs: ["postgresql", "supabase", "drizzle", "prisma"],
  },

  // ─── PRISMA VS DRIZZLE ─────────────────────────────────────────
  {
    slug: "prisma-vs-drizzle",
    nameA: "Prisma",
    nameB: "Drizzle",
    logoA: "/logos/services/prisma.svg",
    logoB: "/logos/services/drizzle-orm_dark.svg",
    logoDarkA: "/logos/services/prisma_dark.svg",
    logoDarkB: "/logos/services/drizzle-orm_light.svg",
    tagline:
      "Schema-first abstractions vs SQL-close type safety — the TypeScript ORM debate",
    description:
      "Prisma and Drizzle are the two leading TypeScript ORMs for Node.js. Both generate fully-typed database queries, but they take opposite approaches: Prisma abstracts SQL behind a friendly client, while Drizzle keeps you close to SQL with TypeScript as a thin type layer on top.",
    overview:
      "The ORM landscape shifted dramatically when Drizzle launched with a SQL-close API that avoided Prisma's runtime overhead. Prisma is mature, has excellent migrations, and is the most ergonomic ORM for developers who don't want to think about SQL. Drizzle is leaner, runs at the edge, and gives you more control over query execution. Both are production-ready. The choice largely comes down to how much SQL you want to write and whether you need edge runtime support.",
    verdict: "tie",
    verdictDetail:
      "Choose Prisma if you value its ergonomic API, rich documentation, and mature migration workflow. Choose Drizzle if you need edge runtime support, want a smaller bundle, or prefer SQL-close queries. Both are excellent — the decision is mostly about API style preference and infrastructure constraints.",
    points: [
      {
        category: "API ergonomics",
        a: "Excellent — fluent, readable query API that non-SQL developers love",
        b: "SQL-close — feels like writing SQL in TypeScript, suits SQL-comfortable devs",
        winner: "a",
      },
      {
        category: "Bundle size",
        a: "Large — Prisma client is ~3MB, generated code is substantial",
        b: "Tiny — Drizzle is ~7kb, designed for edge deployments",
        winner: "b",
      },
      {
        category: "Edge runtime support",
        a: "Limited — Prisma Accelerate needed for edge; complex setup",
        b: "Native — runs on Cloudflare Workers, Vercel Edge, Deno without adapters",
        winner: "b",
      },
      {
        category: "Migrations",
        a: "Excellent — prisma migrate dev is intuitive and battle-tested",
        b: "Good — drizzle-kit handles migrations, slightly more manual",
        winner: "a",
      },
      {
        category: "Type safety",
        a: "Excellent — generated types are precise and IDE-friendly",
        b: "Excellent — inferred types directly from schema definitions",
        winner: "tie",
      },
      {
        category: "Raw SQL escape hatch",
        a: "Available via prisma.$queryRaw — awkward to use",
        b: "Natural — SQL syntax is the primary API, not an escape hatch",
        winner: "b",
      },
      {
        category: "Ecosystem maturity",
        a: "More mature — larger community, more StackOverflow answers, older",
        b: "Newer but growing fast — excellent documentation, active development",
        winner: "a",
      },
    ],
    whenToChooseA: [
      "Your team isn't SQL-fluent and wants an abstraction that hides query complexity",
      "You're building a standard Node.js / Next.js app that doesn't need edge deployment",
      "You value mature, battle-tested migrations and a large community",
      "You need Prisma Studio — the visual database browser is genuinely useful",
    ],
    whenToChooseB: [
      "You're deploying to Cloudflare Workers, Vercel Edge, or another edge runtime",
      "Bundle size matters — serverless cold starts, or bundling a database client into a CLI",
      "You're comfortable with SQL and want your queries to look like SQL",
      "You need maximum query performance — Drizzle has less abstraction overhead",
    ],
    faq: [
      {
        question: "Can I use Prisma on Cloudflare Workers?",
        answer:
          "Yes, via Prisma Accelerate — a connection proxy that sits between Workers and your database. It adds latency and cost compared to Drizzle's native edge support. For edge-first architectures, Drizzle is simpler.",
      },
      {
        question: "Which ORM works better with Supabase?",
        answer:
          "Both work with Supabase's Postgres database. Drizzle is popular in the Supabase community for its edge compatibility and smaller footprint. Prisma works too but requires connection pooling via Supabase's pgBouncer.",
      },
      {
        question: "Is there a migration path between the two?",
        answer:
          "You can migrate by rewriting your schema definition and query calls. It's manual but not overwhelming for most codebases. We've helped teams switch both directions depending on infrastructure requirements.",
      },
      {
        question: "What about TypeORM or Sequelize?",
        answer:
          "TypeORM and Sequelize are older ORMs with weaker TypeScript support. Both are being phased out in new projects in favour of Prisma or Drizzle. We wouldn't start a new project on either.",
      },
    ],
    relatedSlugs: ["drizzle", "prisma", "postgresql", "nextjs"],
  },

  // ─── VERCEL VS NETLIFY ─────────────────────────────────────────
  {
    slug: "vercel-vs-netlify",
    nameA: "Vercel",
    nameB: "Netlify",
    logoA: "/logos/services/vercel_dark.svg",
    logoB: "/logos/services/netlify.svg",
    tagline:
      "The two dominant frontend clouds — what the platform decision actually affects",
    description:
      "Vercel and Netlify are the leading platforms for deploying frontend applications and serverless functions. Both offer git-based deployments, preview URLs, and edge capabilities — but Vercel has pulled ahead for Next.js projects while Netlify remains competitive for everything else.",
    overview:
      "Vercel and Netlify were neck-and-neck for most of the early 2020s. Vercel's acquisition of Next.js team members and its deep integration with the framework gave it a decisive lead for React projects. Netlify has responded with its own features and remains the better choice for non-Next.js frameworks, static sites, and teams that want more flexibility in their build toolchain. For Next.js specifically, Vercel's native support is hard to beat — some features like React Server Components and ISR work optimally only on Vercel.",
    verdict: "Vercel",
    verdictDetail:
      "Vercel is the better choice for Next.js projects — it's built by the same team and some features behave differently (and better) on Vercel's infrastructure. For other frameworks (Astro, SvelteKit, Remix, Nuxt), Netlify is competitive and sometimes better. If vendor lock-in concerns you, Netlify gives you more portability.",
    points: [
      {
        category: "Next.js support",
        a: "Best-in-class — built by the Next.js team, all features first-class",
        b: "Good — community adapter, most features supported but not first-party",
        winner: "a",
      },
      {
        category: "Other framework support",
        a: "Good — official adapters for most frameworks",
        b: "Excellent — Netlify often has better adapters for non-Next.js frameworks",
        winner: "b",
      },
      {
        category: "Preview deployments",
        a: "Excellent — fast, reliable, GitHub/GitLab/Bitbucket integrated",
        b: "Excellent — deploy previews are a Netlify original, very polished",
        winner: "tie",
      },
      {
        category: "Edge functions",
        a: "Vercel Edge Functions — V8 isolates, fast cold starts",
        b: "Netlify Edge Functions — Deno-based, slightly more capable runtime",
        winner: "tie",
      },
      {
        category: "Pricing",
        a: "Can escalate quickly — bandwidth and function invocations add up",
        b: "Comparable — similar pricing structure, slightly more generous free tier",
        winner: "b",
      },
      {
        category: "Build times",
        a: "Fast — Remote Caching reduces rebuild times significantly",
        b: "Fast — good build infrastructure, Distributed Deploys available",
        winner: "tie",
      },
      {
        category: "Vendor lock-in",
        a: "Higher — Vercel-specific features (ISR, OG images) are harder to migrate",
        b: "Lower — Netlify's primitives are closer to open standards",
        winner: "b",
      },
    ],
    whenToChooseA: [
      "You're building with Next.js — Vercel is the native deployment target",
      "You need React Server Components and ISR to work as documented",
      "Your team uses Turborepo — Vercel's Remote Caching integrates natively",
      "DX matters most — Vercel's dashboard and CLI are exceptionally polished",
    ],
    whenToChooseB: [
      "You're using Astro, SvelteKit, Nuxt, Remix, or another non-Next.js framework",
      "You want more control over your build process and serverless functions",
      "Vendor lock-in concerns you — Netlify's abstractions are closer to open web standards",
      "You need Netlify Forms, Identity, or its CMS integrations",
    ],
    faq: [
      {
        question: "Can I deploy Next.js on Netlify?",
        answer:
          "Yes. Netlify has a Next.js runtime adapter that supports App Router, RSC, and most Next.js features. A few Vercel-specific features (like Vercel's OG image generation or some ISR edge cases) behave differently. For most apps, Netlify's Next.js support is sufficient.",
      },
      {
        question: "Is Vercel too expensive at scale?",
        answer:
          "Vercel's pricing can surprise teams at scale — especially if you have high bandwidth or many serverless function invocations. At meaningful scale, running your own infrastructure on AWS or GCP often becomes cheaper. We help teams model costs before committing.",
      },
      {
        question: "What about Cloudflare Pages?",
        answer:
          "Cloudflare Pages is a strong third option, especially for globally distributed apps or Cloudflare Workers-heavy architectures. It's significantly cheaper at scale. The tradeoff is a less polished developer experience and more manual configuration.",
      },
      {
        question: "Which platform is better for Singapore-based teams?",
        answer:
          "Both have edge nodes in Singapore and Southeast Asia. Vercel's infrastructure performs well regionally. For Singapore-based applications, either works — the framework choice matters more than the platform for local performance.",
      },
    ],
    relatedSlugs: ["nextjs", "react", "cloudflare-workers", "aws"],
  },
];

export function getComparisonBySlug(
  slug: string
): ComparisonConfig | undefined {
  return compareConfig.find((c) => c.slug === slug);
}
