export interface ComparisonPoint {
  category: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "tie";
}

export interface ComparisonConfig {
  slug: string;
  nameA: string;
  nameB: string;
  tagline: string;
  description: string;
  overview: string;
  logoA?: string | null;
  logoB?: string | null;
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
    nameA: "React",
    nameB: "Vue",
    tagline: "Choosing between React and Vue for your next frontend project",
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
    nameA: "Next.js",
    nameB: "Nuxt",
    tagline:
      "Next.js vs Nuxt — which full-stack framework should you build on?",
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
    nameA: "WordPress",
    nameB: "Webflow",
    tagline: "WordPress vs Webflow — the CMS decision for your next website",
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
    nameA: "Shopify",
    nameB: "WooCommerce",
    tagline:
      "Shopify vs WooCommerce — choosing the right e-commerce platform for your store",
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
    nameA: "React Native",
    nameB: "Flutter",
    tagline:
      "React Native vs Flutter — choosing the right cross-platform mobile framework",
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
];

export function getComparisonBySlug(
  slug: string
): ComparisonConfig | undefined {
  return compareConfig.find((c) => c.slug === slug);
}
