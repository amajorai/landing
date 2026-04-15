import type { ServiceCategory, ServiceConfig } from "./services-config";

export type OfferingCategory = "offering";

export interface OfferingConfig
  extends Omit<ServiceConfig, "category" | "visualizationKey" | "subTechs"> {
  category: ServiceCategory | "offering";
  visualizationKey: string;
  subTechs: ServiceConfig["subTechs"];
}

export const offeringsConfig: OfferingConfig[] = [
  // ─── WEB DESIGN ────────────────────────────────────────────────
  {
    slug: "web-design",
    name: "Web Design",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Websites that load fast, look sharp, and convert visitors into customers",
    description:
      "We design and build modern websites that balance aesthetics with performance. Every site we ship is mobile-first, accessibility-compliant, and optimized for Core Web Vitals — because a beautiful site that loads in 6 seconds is a site nobody sees.",
    accentColor: "violet",
    visualizationKey: "web-design",
    logo: null,
    lucideIcon: "Palette",
    features: [
      {
        icon: "Palette",
        title: "Custom design systems",
        description:
          "Brand-aligned design tokens, component libraries, and style guides that keep every page consistent.",
      },
      {
        icon: "Smartphone",
        title: "Mobile-first responsive design",
        description:
          "Layouts that adapt fluidly to every screen size — designed for mobile first, then scaled up.",
      },
      {
        icon: "Gauge",
        title: "Core Web Vitals optimization",
        description:
          "LCP under 2.5s, CLS near zero, INP under 200ms — performance baked into the design process.",
      },
      {
        icon: "Accessibility",
        title: "WCAG 2.1 AA compliance",
        description:
          "Accessible color contrast, keyboard navigation, screen reader support, and semantic HTML throughout.",
      },
      {
        icon: "Search",
        title: "SEO-ready markup",
        description:
          "Clean HTML structure, Open Graph tags, JSON-LD schema, and optimized meta tags for every page.",
      },
      {
        icon: "Zap",
        title: "Fast iteration with Figma-to-code",
        description:
          "We design in Figma and translate directly to production code — no handoff gaps or lost-in-translation issues.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "nextjs" },
      { slug: "tailwind" },
      { slug: "wordpress" },
    ],
    overview:
      "Your website is often the first interaction someone has with your business. A well-designed website doesn't just look good — it builds trust, communicates your value proposition in seconds, and guides visitors toward taking action. We combine conversion-focused UX design with modern frontend engineering to create websites that perform as good as they look. From single-page marketing sites to complex multi-language corporate portals, every project gets the same attention to typography, spacing, color theory, and performance.",
    challenges: [
      {
        title: "Design that looks good but doesn't convert",
        description:
          "Many websites prioritize aesthetics over usability. If visitors can't find what they need in 3 seconds, they leave. We design with conversion paths first.",
      },
      {
        title: "Slow load times kill rankings and engagement",
        description:
          "Google uses Core Web Vitals as a ranking factor. A site that scores poorly on performance loses both search visibility and user patience.",
      },
      {
        title: "Inconsistent branding across pages",
        description:
          "Without a design system, every new page looks slightly different. We build reusable component libraries that ensure visual consistency at scale.",
      },
      {
        title: "Not accessible to all users",
        description:
          "15% of the global population has a disability. Inaccessible websites exclude potential customers and risk legal compliance issues.",
      },
    ],
    bestPractices: [
      {
        tip: "Design for mobile first, then scale up",
        detail:
          "Over 60% of web traffic is mobile. Starting with the smallest screen forces you to prioritize content and simplify navigation.",
      },
      {
        tip: "Use a design system from day one",
        detail:
          "Consistent spacing, typography, and color scales make every new page faster to build and visually coherent.",
      },
      {
        tip: "Optimize images and fonts",
        detail:
          "Use WebP/AVIF formats, responsive image sizes, and font subsetting to keep total page weight under 500KB.",
      },
      {
        tip: "Test with real users, not just stakeholders",
        detail:
          "Usability testing with target audience members reveals issues that internal teams are blind to.",
      },
    ],
    usefulLinks: [
      {
        title: "web.dev Performance Guide",
        url: "https://web.dev/performance/",
        type: "docs",
      },
      {
        title: "Tailwind CSS Documentation",
        url: "https://tailwindcss.com/docs",
        type: "docs",
      },
      {
        title: "WCAG 2.1 Guidelines",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        type: "docs",
      },
      {
        title: "Google PageSpeed Insights",
        url: "https://pagespeed.web.dev/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does a custom website design cost?",
        answer:
          "Custom website design typically ranges from $3,000 for a simple marketing site to $20,000+ for complex multi-page sites with custom animations and integrations. We provide detailed quotes after understanding your requirements.",
      },
      {
        question: "How long does it take to design and build a website?",
        answer:
          "A typical marketing website takes 4–8 weeks from kickoff to launch. Complex sites with custom functionality, e-commerce, or multiple integrations may take 8–16 weeks.",
      },
      {
        question: "Do you redesign existing websites?",
        answer:
          "Absolutely. We frequently redesign existing sites — improving visual design, performance, accessibility, and SEO while preserving your existing content and search rankings.",
      },
      {
        question: "Will my website be SEO-friendly?",
        answer:
          "Yes. Every site we build includes semantic HTML, structured data, optimized meta tags, fast load times, and mobile responsiveness — all critical ranking factors.",
      },
    ],
  },

  // ─── WEB APPS ──────────────────────────────────────────────────
  {
    slug: "web-apps",
    name: "Web App Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline: "Full-stack web applications built for real users and real scale",
    description:
      "We build web applications that handle complexity — real-time collaboration, role-based access, complex data models, and third-party integrations. From internal tools to customer-facing SaaS platforms, we ship production-ready apps.",
    accentColor: "blue",
    visualizationKey: "web-apps",
    logo: null,
    lucideIcon: "Globe",
    features: [
      {
        icon: "Server",
        title: "Full-stack architecture",
        description:
          "React/Next.js frontends with Node.js, Python, or .NET backends — chosen based on your requirements, not our preferences.",
      },
      {
        icon: "Shield",
        title: "Auth & authorization",
        description:
          "Secure authentication with role-based access control, SSO, OAuth, and multi-tenant isolation.",
      },
      {
        icon: "Zap",
        title: "Real-time features",
        description:
          "WebSocket connections, optimistic updates, and live data sync for apps that feel instant.",
      },
      {
        icon: "Database",
        title: "Scalable data layer",
        description:
          "PostgreSQL, MongoDB, or serverless databases with proper indexing, migrations, and backup strategies.",
      },
      {
        icon: "GitBranch",
        title: "CI/CD pipelines",
        description:
          "Automated testing, staging deployments, and zero-downtime production releases.",
      },
      {
        icon: "Code2",
        title: "API design",
        description:
          "RESTful or tRPC APIs with TypeScript end-to-end type safety and auto-generated documentation.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "nextjs" },
      { slug: "nodejs" },
      { slug: "postgresql" },
    ],
    overview:
      "A web application is fundamentally different from a website. Websites display information; web apps let users create, manage, and interact with data. Building a reliable web app means getting authentication, data modeling, API design, state management, and deployment right from day one. We specialize in complex web applications — the kind where you need real-time collaboration, complex permission models, payment processing, third-party API integrations, and the ability to scale from 10 users to 10,000 without re-architecting everything.",
    challenges: [
      {
        title: "Choosing the right architecture upfront",
        description:
          "Monolith vs. microservices, server-side vs. client-side rendering, SQL vs. NoSQL — these decisions are expensive to reverse later.",
      },
      {
        title: "Handling complex state and real-time data",
        description:
          "Multi-user apps with real-time updates, optimistic UI, and offline support require sophisticated state management strategies.",
      },
      {
        title: "Security and compliance",
        description:
          "Authentication, authorization, data encryption, GDPR compliance, and audit logging are table stakes for production apps.",
      },
      {
        title: "Scaling without re-building",
        description:
          "Apps built without scalability in mind hit walls at a few thousand users. Proper database design and caching prevent costly rewrites.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with a clear data model",
        detail:
          "Define your entities, relationships, and access patterns before writing UI code. The data model drives everything.",
      },
      {
        tip: "Use TypeScript end-to-end",
        detail:
          "Full-stack type safety from database to API to frontend catches entire categories of bugs at compile time.",
      },
      {
        tip: "Implement feature flags from day one",
        detail:
          "Ship behind feature flags to decouple deployment from release — test in production without risk.",
      },
    ],
    usefulLinks: [
      {
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        type: "docs",
      },
      {
        title: "Prisma ORM Guide",
        url: "https://www.prisma.io/docs",
        type: "docs",
      },
      {
        title: "Vercel Deployment Platform",
        url: "https://vercel.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does it cost to build a web application?",
        answer:
          "Web app costs range from $15,000 for simple CRUD apps to $100,000+ for complex SaaS platforms with real-time features, integrations, and multi-tenancy. We scope every project with a free technical consultation.",
      },
      {
        question: "How long does web app development take?",
        answer:
          "An MVP typically takes 6–12 weeks. Full-featured production apps with multiple user roles, integrations, and polished UX take 3–6 months.",
      },
      {
        question: "What tech stack do you use for web apps?",
        answer:
          "Our primary stack is React/Next.js with TypeScript, PostgreSQL, and Prisma. We also work with Vue/Nuxt, .NET, Laravel, Django, and others depending on project needs.",
      },
      {
        question: "Can you build on top of our existing codebase?",
        answer:
          "Yes. We regularly inherit and improve existing codebases — we'll audit the current state, create a migration plan, and incrementally ship improvements alongside new features.",
      },
    ],
  },

  // ─── MOBILE APPS ───────────────────────────────────────────────
  {
    slug: "mobile-apps",
    name: "Mobile App Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline: "iOS and Android apps that users actually keep installed",
    description:
      "We build native and cross-platform mobile apps using React Native, Swift, Kotlin, and Flutter. From consumer apps to enterprise tools, we deliver polished experiences that work offline, load instantly, and feel native on every device.",
    accentColor: "green",
    visualizationKey: "mobile-apps",
    logo: null,
    lucideIcon: "Smartphone",
    features: [
      {
        icon: "Smartphone",
        title: "Cross-platform with React Native",
        description:
          "One codebase for iOS and Android with native performance — ship to both app stores simultaneously.",
      },
      {
        icon: "Cpu",
        title: "Native iOS (Swift) and Android (Kotlin)",
        description:
          "When you need platform-specific features, ARKit, custom camera, or hardware integrations — we go native.",
      },
      {
        icon: "Wifi",
        title: "Offline-first architecture",
        description:
          "Local data persistence and background sync so your app works in subways, planes, and low-connectivity areas.",
      },
      {
        icon: "Bell",
        title: "Push notifications",
        description:
          "Targeted, scheduled, and action-driven notifications that bring users back without being annoying.",
      },
      {
        icon: "Shield",
        title: "App Store compliance",
        description:
          "We navigate Apple and Google review guidelines so your app passes review on the first submission.",
      },
      {
        icon: "Zap",
        title: "60fps animations",
        description:
          "Smooth, hardware-accelerated animations and transitions that make your app feel premium.",
      },
    ],
    subTechs: [
      { slug: "react-native" },
      { slug: "swift" },
      { slug: "kotlin" },
      { slug: "flutter" },
    ],
    overview:
      "Mobile apps are how people spend most of their digital time — over 4 hours per day on average. But building a mobile app that users love is harder than it looks. You need smooth animations, offline support, push notifications, app store compliance, and a UI that feels native on both iOS and Android. We build mobile apps using the right technology for each project: React Native for fast cross-platform development, Swift for iOS-specific features, Kotlin for Android-specific needs, and Flutter when Dart fits the team.",
    challenges: [
      {
        title: "iOS and Android are fundamentally different",
        description:
          "Design patterns, navigation, permissions, and user expectations differ between platforms. A good mobile app respects platform conventions.",
      },
      {
        title: "App Store rejection",
        description:
          "Apple and Google have strict review guidelines. Apps get rejected for metadata issues, privacy concerns, or UX violations.",
      },
      {
        title: "Performance on low-end devices",
        description:
          "Your app needs to work on 5-year-old Android phones, not just the latest iPhone. Memory management and rendering optimization matter.",
      },
      {
        title: "Maintaining two platforms",
        description:
          "Without cross-platform tooling, every feature needs to be built twice. React Native and Flutter solve this but introduce their own complexity.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with React Native unless you have a reason not to",
        detail:
          "React Native covers 90%+ of use cases with one codebase. Go native only when you need deep platform APIs that aren't available in RN.",
      },
      {
        tip: "Design for offline from the start",
        detail:
          "Users expect apps to work without internet. Build offline persistence into your data layer early — retrofitting it is extremely expensive.",
      },
      {
        tip: "Test on real devices, not just simulators",
        detail:
          "Simulators don't reflect real-world performance. Test on low-end Android devices and older iPhones to catch memory and rendering issues.",
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
        title: "Apple Human Interface Guidelines",
        url: "https://developer.apple.com/design/human-interface-guidelines/",
        type: "docs",
      },
      {
        title: "Material Design Guidelines",
        url: "https://m3.material.io",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does it cost to build a mobile app?",
        answer:
          "Mobile app development ranges from $20,000 for a simple cross-platform app to $100,000+ for complex native apps with custom animations, offline sync, and backend infrastructure.",
      },
      {
        question: "React Native vs. native development — which is better?",
        answer:
          "React Native is faster and cheaper for most apps, sharing 90%+ of code between iOS and Android. Native (Swift/Kotlin) is better when you need deep platform integration like ARKit, custom cameras, or hardware APIs.",
      },
      {
        question: "How long does it take to build a mobile app?",
        answer:
          "An MVP cross-platform app typically takes 8–12 weeks. Full-featured apps with complex backends, payment processing, and polished UX take 4–8 months.",
      },
      {
        question: "Do you handle App Store and Play Store submissions?",
        answer:
          "Yes. We handle the entire submission process including app screenshots, metadata, review guideline compliance, and post-submission issue resolution.",
      },
    ],
  },

  // ─── BROWSER EXTENSIONS ────────────────────────────────────────
  {
    slug: "browser-extensions",
    name: "Browser Extension Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Chrome, Firefox, and Edge extensions that integrate into user workflows",
    description:
      "We build browser extensions that enhance existing tools — content scripts, popup UIs, background workers, and cross-browser compatibility. From productivity tools to enterprise integrations.",
    accentColor: "orange",
    visualizationKey: "browser-extensions",
    logo: null,
    lucideIcon: "Puzzle",
    features: [
      {
        icon: "Puzzle",
        title: "Manifest V3 development",
        description:
          "Built on the latest Chrome extension platform with service workers and declarative net request.",
      },
      {
        icon: "Globe",
        title: "Cross-browser support",
        description:
          "One codebase targeting Chrome, Firefox, Edge, and Safari with platform-specific adapters.",
      },
      {
        icon: "Layout",
        title: "Rich popup and sidebar UIs",
        description:
          "React-powered extension UIs with the same component quality as your main product.",
      },
      {
        icon: "Shield",
        title: "Privacy-first architecture",
        description:
          "Minimal permissions, no unnecessary data collection, and transparent data handling for store compliance.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }],
    overview:
      "Browser extensions sit inside the tools your users already use every day. They can automate tasks, inject functionality into third-party websites, synchronize data between services, and provide at-a-glance information without context switching. We build extensions for Chrome, Firefox, Edge, and Safari — from simple popup tools to complex content-manipulating extensions with backend APIs.",
    challenges: [
      {
        title: "Manifest V3 migration",
        description:
          "Chrome's transition to Manifest V3 changes how background scripts, content scripts, and network requests work. Many existing extensions need significant rewrites.",
      },
      {
        title: "Cross-browser compatibility",
        description:
          "Chrome, Firefox, and Safari have different extension APIs. Building for all three requires abstraction layers and platform-specific testing.",
      },
      {
        title: "Web Store review process",
        description:
          "Chrome Web Store reviews can take days and reject extensions for vague policy reasons. Experienced developers know how to navigate this.",
      },
    ],
    bestPractices: [
      {
        tip: "Request minimal permissions",
        detail:
          "Users distrust extensions that ask for broad access. Use optional permissions and explain why each is needed.",
      },
      {
        tip: "Use React for complex UIs",
        detail:
          "For anything beyond a simple popup, React with a bundler like Vite makes extension UI development much faster.",
      },
    ],
    usefulLinks: [
      {
        title: "Chrome Extensions Documentation",
        url: "https://developer.chrome.com/docs/extensions/",
        type: "docs",
      },
      {
        title: "Firefox Extension Workshop",
        url: "https://extensionworkshop.com/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does a browser extension cost to build?",
        answer:
          "Simple extensions cost $5,000–15,000. Complex extensions with backend APIs, cross-browser support, and content manipulation range from $15,000–50,000.",
      },
      {
        question: "Can you update an existing extension to Manifest V3?",
        answer:
          "Yes. We migrate existing Manifest V2 extensions to V3, updating service workers, network request handling, and content security policies.",
      },
    ],
  },

  // ─── ENTERPRISE SYSTEMS ────────────────────────────────────────
  {
    slug: "enterprise-systems",
    name: "Enterprise Software Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Internal tools, dashboards, and integrations built for real business complexity",
    description:
      "We build enterprise-grade internal tools — admin dashboards, CRM integrations, inventory management systems, reporting platforms, and workflow automation. Software that handles the complexity your off-the-shelf tools can't.",
    accentColor: "slate",
    visualizationKey: "enterprise-systems",
    logo: null,
    lucideIcon: "Building2",
    features: [
      {
        icon: "Shield",
        title: "Role-based access control",
        description:
          "Granular permissions with department-level, team-level, and individual access policies.",
      },
      {
        icon: "Network",
        title: "System integrations",
        description:
          "Connect your ERP, CRM, accounting, and communication tools into a unified workflow.",
      },
      {
        icon: "BarChart2",
        title: "Custom reporting & analytics",
        description:
          "Real-time dashboards with the exact metrics your team needs — not the ones a SaaS tool decided to show you.",
      },
      {
        icon: "Workflow",
        title: "Process automation",
        description:
          "Automate repetitive tasks — approvals, data entry, notifications, and report generation.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "dotnet" },
      { slug: "postgresql" },
      { slug: "docker" },
    ],
    overview:
      "Enterprise software is the backbone of how businesses actually operate. When off-the-shelf tools don't fit your processes, you need custom software that does. We build internal tools that your team uses every day — from admin panels and CRM integrations to complex multi-department workflows. These systems need to be reliable, secure, auditable, and intuitive enough that non-technical staff can use them without training.",
    challenges: [
      {
        title: "Integrating with legacy systems",
        description:
          "Most enterprises run on a mix of old and new systems. Connecting them requires understanding deprecated APIs, data formats, and migration strategies.",
      },
      {
        title: "Complex permission models",
        description:
          "Enterprise apps need fine-grained access control — by role, department, region, and data classification. Getting this wrong creates security and compliance risks.",
      },
      {
        title: "User adoption",
        description:
          "The best enterprise software is useless if employees don't use it. UI/UX quality matters just as much for internal tools as customer-facing products.",
      },
    ],
    bestPractices: [
      {
        tip: "Interview the actual end users, not just management",
        detail:
          "The people using the tool daily know the pain points. Build for them, not for the stakeholders who signed the contract.",
      },
      {
        tip: "Build audit logging from day one",
        detail:
          "Enterprise systems need complete audit trails. Add them in the data layer — retrofitting is extremely expensive.",
      },
    ],
    usefulLinks: [
      {
        title: "React Admin Framework",
        url: "https://marmelab.com/react-admin/",
        type: "tool",
      },
      {
        title: "Retool (Low-code alternative)",
        url: "https://retool.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does enterprise software development cost?",
        answer:
          "Enterprise projects typically range from $30,000 to $200,000+ depending on integration complexity, number of user roles, and compliance requirements.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "Yes. We regularly integrate with SAP, Salesforce, HubSpot, QuickBooks, custom APIs, and legacy databases. We'll audit your current systems and build the right connectors.",
      },
    ],
  },

  // ─── SAAS PRODUCTS ─────────────────────────────────────────────
  {
    slug: "saas-products",
    name: "SaaS Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline: "Subscription software built to scale from day one",
    description:
      "We build SaaS products with multi-tenancy, subscription billing, user management, and the infrastructure to grow from 10 to 10,000 customers. From MVP to growth stage, we've shipped SaaS across every vertical.",
    accentColor: "indigo",
    visualizationKey: "saas-products",
    logo: null,
    lucideIcon: "Rocket",
    features: [
      {
        icon: "Users",
        title: "Multi-tenancy",
        description:
          "Isolated or shared tenant architectures — each customer gets their own data space with admin controls.",
      },
      {
        icon: "CreditCard",
        title: "Subscription billing",
        description:
          "Stripe or Polar integration with plans, trials, metered usage, invoicing, and dunning management.",
      },
      {
        icon: "BarChart2",
        title: "Usage analytics",
        description:
          "Track feature adoption, user engagement, and churn signals to drive product decisions with data.",
      },
      {
        icon: "Shield",
        title: "SOC 2 ready",
        description:
          "Security architecture, audit logging, encryption, and access controls designed for compliance from the start.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "nextjs" },
      { slug: "stripe" },
      { slug: "postgresql" },
    ],
    overview:
      "Building a SaaS product is one of the most complex software engineering challenges. You need multi-tenancy, subscription billing, user roles, onboarding flows, usage analytics, and an architecture that scales with your customer base. Most SaaS MVPs fail not because the idea is bad, but because the engineering wasn't production-ready. We build SaaS products with the right foundations — so you can focus on growth instead of firefighting technical debt.",
    challenges: [
      {
        title: "Multi-tenant data isolation",
        description:
          "Every customer's data must be completely isolated. Database design, API authorization, and query scoping all need to enforce tenant boundaries.",
      },
      {
        title: "Subscription billing complexity",
        description:
          "Free trials, plan upgrades, proration, failed payments, dunning emails, and tax compliance make billing logic surprisingly complex.",
      },
      {
        title: "Scaling infrastructure costs",
        description:
          "SaaS margins depend on efficient infrastructure. Poorly optimized databases and over-provisioned servers eat into revenue as you scale.",
      },
    ],
    bestPractices: [
      {
        tip: "Use row-level security for multi-tenancy",
        detail:
          "PostgreSQL RLS policies enforce tenant isolation at the database level — even if application code has bugs, data can't leak between tenants.",
      },
      {
        tip: "Build billing on Stripe from day one",
        detail:
          "Don't build billing yourself. Stripe handles subscriptions, invoicing, tax, and compliance — use their primitives.",
      },
      {
        tip: "Instrument everything for product analytics",
        detail:
          "Track every meaningful user action from launch. You can't make data-driven decisions without data.",
      },
    ],
    usefulLinks: [
      {
        title: "Stripe Billing Documentation",
        url: "https://stripe.com/docs/billing",
        type: "docs",
      },
      {
        title: "Polar (Open-source billing)",
        url: "https://polar.sh",
        type: "tool",
      },
      {
        title: "PostHog (Product analytics)",
        url: "https://posthog.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does it cost to build a SaaS product?",
        answer:
          "SaaS MVPs typically cost $25,000–60,000. Full-featured products with billing, analytics, admin panels, and polished UX range from $60,000–150,000+.",
      },
      {
        question: "How long does it take to launch a SaaS MVP?",
        answer:
          "A focused MVP with core features, auth, billing, and basic admin takes 8–16 weeks. We recommend launching early and iterating based on real user feedback.",
      },
      {
        question: "Can you help with an existing SaaS product?",
        answer:
          "Yes. We help SaaS companies scale their engineering — adding features, improving performance, fixing technical debt, and preparing for growth milestones.",
      },
    ],
  },

  // ─── UI/UX DESIGN ──────────────────────────────────────────────
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "User flows, wireframes, and high-fidelity interfaces that drive results",
    description:
      "We do standalone design work — user research, wireframes, prototypes, and pixel-perfect UI design. Whether you need a complete design system or just a refresh, we deliver Figma files your developers can actually implement.",
    accentColor: "pink",
    visualizationKey: "ui-ux-design",
    logo: null,
    lucideIcon: "Figma",
    features: [
      {
        icon: "Users",
        title: "User research & personas",
        description:
          "Interview-based research that reveals how your users actually think, not how you assume they do.",
      },
      {
        icon: "Layout",
        title: "Wireframes & prototypes",
        description:
          "Interactive prototypes in Figma that let you test flows before writing a single line of code.",
      },
      {
        icon: "Palette",
        title: "High-fidelity UI design",
        description:
          "Pixel-perfect screens with design tokens, component variants, and responsive breakpoints.",
      },
      {
        icon: "Component",
        title: "Design system creation",
        description:
          "Reusable component libraries with usage guidelines that keep your product visually consistent at scale.",
      },
    ],
    subTechs: [{ slug: "tailwind" }, { slug: "shadcn" }, { slug: "react" }],
    overview:
      "Good UI/UX design is the difference between a product people tolerate and one they love. We combine user research with visual design expertise to create interfaces that are both beautiful and functional. Our design process starts with understanding your users, maps out their key workflows, and produces high-fidelity designs that are ready for development — complete with responsive layouts, interaction states, and developer handoff specs.",
    challenges: [
      {
        title: "Designing without user research",
        description:
          "Most design projects skip research and go straight to mockups. The result is beautiful screens that don't solve real user problems.",
      },
      {
        title: "Design-to-development handoff gaps",
        description:
          "Figma designs that don't account for responsive behavior, loading states, error states, and edge cases create friction during implementation.",
      },
      {
        title: "Maintaining consistency at scale",
        description:
          "Without a design system, every new feature introduces visual inconsistencies that erode brand trust.",
      },
    ],
    bestPractices: [
      {
        tip: "Design all states, not just the happy path",
        detail:
          "Every screen needs loading, empty, error, and edge-case states designed. These make up 80% of what users actually see.",
      },
      {
        tip: "Build a design system, not just screens",
        detail:
          "Components, tokens, and patterns that compose into new features without redesigning from scratch every time.",
      },
    ],
    usefulLinks: [
      { title: "Figma", url: "https://figma.com", type: "tool" },
      { title: "Laws of UX", url: "https://lawsofux.com", type: "tutorial" },
      {
        title: "Nielsen Norman Group Articles",
        url: "https://www.nngroup.com/articles/",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "Do you do design-only projects?",
        answer:
          "Yes. We offer standalone design services — from quick UI audits to full design system creation — delivered as Figma files with developer-ready specs.",
      },
      {
        question: "How much does UI/UX design cost?",
        answer:
          "Design projects range from $3,000 for a focused UI refresh to $15,000–30,000 for comprehensive user research, wireframing, and high-fidelity design systems.",
      },
    ],
  },

  // ─── DEVOPS ────────────────────────────────────────────────────
  {
    slug: "devops",
    name: "DevOps & Infrastructure",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "CI/CD, cloud infrastructure, and deployments that don't fall over",
    description:
      "We set up and manage your deployment infrastructure — CI/CD pipelines, Docker containers, Kubernetes clusters, cloud architecture on AWS, GCP, or Azure, and monitoring that alerts you before your users notice problems.",
    accentColor: "cyan",
    visualizationKey: "devops",
    logo: null,
    lucideIcon: "Server",
    features: [
      {
        icon: "GitBranch",
        title: "CI/CD pipelines",
        description:
          "Automated build, test, and deploy pipelines that ship code to production safely and repeatedly.",
      },
      {
        icon: "Container",
        title: "Docker & Kubernetes",
        description:
          "Containerized applications with orchestration for scaling, rolling updates, and self-healing.",
      },
      {
        icon: "Cloud",
        title: "Cloud architecture",
        description:
          "AWS, GCP, or Azure infrastructure designed for reliability, cost efficiency, and compliance.",
      },
      {
        icon: "Activity",
        title: "Monitoring & alerting",
        description:
          "Observability with logs, metrics, and traces — know when something breaks before your users do.",
      },
    ],
    subTechs: [
      { slug: "docker" },
      { slug: "cloudflare-workers" },
      { slug: "s3" },
    ],
    overview:
      "DevOps bridges the gap between writing code and running it reliably in production. Without proper CI/CD, infrastructure, and monitoring, even great code becomes unreliable. We help teams ship faster and sleep better — automated pipelines, infrastructure-as-code, containerized deployments, and comprehensive monitoring that catches problems early.",
    challenges: [
      {
        title: "Manual deployments are error-prone",
        description:
          "If deploying requires SSH-ing into a server and running commands, it's only a matter of time before a mistake takes down production.",
      },
      {
        title: "Cloud cost management",
        description:
          "It's easy to overspend on cloud infrastructure. Without proper sizing, reserved instances, and usage monitoring, bills grow faster than revenue.",
      },
      {
        title: "Incident response without observability",
        description:
          "When something breaks at 2 AM, you need logs, metrics, and traces to diagnose the issue — not guesswork.",
      },
    ],
    bestPractices: [
      {
        tip: "Automate everything that can be automated",
        detail:
          "If a deployment step requires human memory, it will eventually be forgotten. Scripts and pipelines don't forget.",
      },
      {
        tip: "Use infrastructure-as-code",
        detail:
          "Terraform, Pulumi, or CDK — your infrastructure should be version-controlled, reviewable, and reproducible.",
      },
    ],
    usefulLinks: [
      {
        title: "Docker Documentation",
        url: "https://docs.docker.com",
        type: "docs",
      },
      {
        title: "AWS Well-Architected Framework",
        url: "https://aws.amazon.com/architecture/well-architected/",
        type: "docs",
      },
      { title: "Vercel Platform", url: "https://vercel.com", type: "tool" },
    ],
    faq: [
      {
        question: "How much does DevOps setup cost?",
        answer:
          "Initial CI/CD and infrastructure setup typically costs $5,000–20,000. Ongoing management and optimization are available as monthly retainers.",
      },
      {
        question: "Can you reduce our cloud costs?",
        answer:
          "Yes. We regularly audit cloud spending and find 30–50% savings through right-sizing, reserved instances, caching, and architecture improvements.",
      },
    ],
  },

  // ─── PERFORMANCE OPTIMIZATION ──────────────────────────────────
  {
    slug: "performance-optimization",
    name: "Performance Optimization",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Find the bottlenecks and fix them — in code, queries, and infrastructure",
    description:
      "Slow software loses users, hurts SEO rankings, and frustrates employees. We profile, diagnose, and fix performance issues across your entire stack — frontend rendering, API response times, database queries, and infrastructure.",
    accentColor: "amber",
    visualizationKey: "performance-optimization",
    logo: null,
    lucideIcon: "Gauge",
    features: [
      {
        icon: "Gauge",
        title: "Core Web Vitals audit",
        description:
          "Comprehensive analysis of LCP, CLS, and INP with actionable fixes prioritized by impact.",
      },
      {
        icon: "Database",
        title: "Database query optimization",
        description:
          "Slow query identification, index tuning, query rewriting, and connection pooling improvements.",
      },
      {
        icon: "Code2",
        title: "Frontend bundle analysis",
        description:
          "Tree shaking, code splitting, lazy loading, and dependency audits to reduce JavaScript bundle size.",
      },
      {
        icon: "Server",
        title: "Infrastructure profiling",
        description:
          "Server response times, caching strategies, CDN configuration, and load testing under realistic traffic.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "postgresql" }],
    overview:
      "Performance is a feature. Google penalizes slow sites in search rankings, users abandon pages that take more than 3 seconds to load, and employees waste hours waiting for sluggish internal tools. We specialize in identifying and fixing performance bottlenecks — whether it's a React app with unnecessary re-renders, an API with N+1 query problems, or infrastructure that can't handle peak traffic.",
    challenges: [
      {
        title: "Diagnosing the actual bottleneck",
        description:
          "Performance problems are rarely where you think they are. Without proper profiling, teams waste time optimizing the wrong things.",
      },
      {
        title: "Balancing speed with feature velocity",
        description:
          "Performance improvements compete with feature development for engineering time. We focus on high-impact fixes that deliver measurable results quickly.",
      },
    ],
    bestPractices: [
      {
        tip: "Measure before optimizing",
        detail:
          "Use Lighthouse, WebPageTest, and real user monitoring (RUM) to identify the actual bottlenecks before changing code.",
      },
      {
        tip: "Set performance budgets in CI",
        detail:
          "Automated checks that fail the build when bundle size or LCP exceeds thresholds prevent performance regressions.",
      },
    ],
    usefulLinks: [
      {
        title: "Google PageSpeed Insights",
        url: "https://pagespeed.web.dev",
        type: "tool",
      },
      {
        title: "WebPageTest",
        url: "https://www.webpagetest.org",
        type: "tool",
      },
      {
        title: "web.dev Performance Guide",
        url: "https://web.dev/performance",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does a performance audit cost?",
        answer:
          "A comprehensive performance audit with prioritized recommendations costs $3,000–8,000. Implementation of fixes is scoped separately based on findings.",
      },
      {
        question: "How much faster can you make my site?",
        answer:
          "Results vary, but we typically achieve 40–70% improvements in load times and 2–3x improvements in Core Web Vitals scores.",
      },
    ],
  },

  // ─── MVP SCOPING ───────────────────────────────────────────────
  {
    slug: "mvp-scoping",
    name: "MVP Scoping & Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline: "Define the smallest version that proves the idea — then build it",
    description:
      "Not sure what to build first? We help founders and product teams define the minimum viable product — the smallest version of your idea that can generate real user feedback. Then we build it fast.",
    accentColor: "yellow",
    visualizationKey: "mvp-scoping",
    logo: null,
    lucideIcon: "Lightbulb",
    features: [
      {
        icon: "Lightbulb",
        title: "Product discovery workshops",
        description:
          "Structured sessions to identify core user problems, define success metrics, and prioritize features ruthlessly.",
      },
      {
        icon: "FileText",
        title: "Technical specification",
        description:
          "Detailed specs covering data model, API design, user flows, and technology choices — before any code is written.",
      },
      {
        icon: "Zap",
        title: "Rapid development",
        description:
          "6–12 week build cycles with weekly demos and feedback loops so you see progress constantly.",
      },
      {
        icon: "BarChart2",
        title: "Analytics from day one",
        description:
          "Built-in user tracking and feedback mechanisms so you know exactly how the MVP is performing.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "supabase" }],
    overview:
      "Most startups fail because they build too much before validating demand. An MVP isn't a bad version of your product — it's the smallest version that tests your core hypothesis. We help you figure out what to build first, scope it tightly, and ship it fast so you can start learning from real users instead of guessing.",
    challenges: [
      {
        title: "Building too much too early",
        description:
          "The biggest risk is spending 6 months building features nobody uses. A good MVP focuses on one core problem and solves it well.",
      },
      {
        title: "Technical debt vs. speed",
        description:
          "MVPs need to be built fast, but not so fast that scaling later requires a complete rewrite. Finding the right balance is critical.",
      },
    ],
    bestPractices: [
      {
        tip: "Define success metrics before writing code",
        detail:
          "What does success look like? User signups, daily active usage, conversion rate? Define it first, then build the minimum to measure it.",
      },
      {
        tip: "Launch in weeks, not months",
        detail:
          "Every week you're not in front of users is a week of assumptions. Ship the simplest thing that works and iterate.",
      },
    ],
    usefulLinks: [
      {
        title: "The Lean Startup",
        url: "https://theleanstartup.com",
        type: "tutorial",
      },
      {
        title: "Supabase (Rapid backend)",
        url: "https://supabase.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does an MVP cost?",
        answer:
          "MVPs typically cost $15,000–40,000 depending on complexity. We recommend starting with a scoping engagement ($3,000–5,000) to define exactly what needs to be built.",
      },
      {
        question: "How long does it take to build an MVP?",
        answer:
          "6–12 weeks from scoping to launch. We work in weekly sprints with demos so you see progress and can course-correct throughout.",
      },
    ],
  },

  // ─── LEGACY MODERNISATION ─────────────────────────────────────
  {
    slug: "legacy-modernisation",
    name: "Legacy Modernisation",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Old, brittle software rebuilt on a stack that supports your growth",
    description:
      "Legacy systems don't have to be replaced overnight. We incrementally modernize aging codebases — migrating from outdated frameworks, improving architecture, and rebuilding critical paths while keeping your business running.",
    accentColor: "stone",
    visualizationKey: "legacy-modernisation",
    logo: null,
    lucideIcon: "RefreshCw",
    features: [
      {
        icon: "Search",
        title: "Codebase audit",
        description:
          "Thorough assessment of technical debt, security vulnerabilities, and modernization opportunities.",
      },
      {
        icon: "GitBranch",
        title: "Incremental migration",
        description:
          "Strangler fig pattern — new features in modern code while legacy systems continue running.",
      },
      {
        icon: "Database",
        title: "Data migration",
        description:
          "Schema migrations, data transformation, and validation ensuring zero data loss during transitions.",
      },
      {
        icon: "Shield",
        title: "Security hardening",
        description:
          "Patch vulnerabilities, update dependencies, and implement modern authentication and encryption.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "dotnet" },
      { slug: "nodejs" },
      { slug: "postgresql" },
    ],
    overview:
      "Legacy software is expensive to maintain, difficult to hire for, and increasingly risky from a security perspective. But rip-and-replace projects are expensive and dangerous. We take an incremental approach — modernizing the most painful parts first while keeping your business running. The goal is to reach a modern, maintainable codebase without a 12-month rewrite project.",
    challenges: [
      {
        title: "Nobody understands the existing code",
        description:
          "The original developers left, documentation is sparse, and the codebase has grown organically over years. Understanding what exists is the hardest part.",
      },
      {
        title: "Business can't stop while you rebuild",
        description:
          "Users still need the system daily. Modernization has to happen incrementally without disrupting operations.",
      },
    ],
    bestPractices: [
      {
        tip: "Audit before you plan",
        detail:
          "Spend 1–2 weeks understanding the existing system before committing to an approach. Many modernization projects fail because they underestimate existing complexity.",
      },
      {
        tip: "Use the strangler fig pattern",
        detail:
          "Build new features on modern technology and gradually route traffic away from legacy systems — no big bang cutover.",
      },
    ],
    usefulLinks: [
      {
        title: "Martin Fowler on Strangler Fig",
        url: "https://martinfowler.com/bliki/StranglerFigApplication.html",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How much does legacy modernization cost?",
        answer:
          "Modernization projects typically cost $20,000–100,000+ depending on codebase size and complexity. We start with a paid audit ($5,000–10,000) to scope the full project.",
      },
      {
        question: "How long does modernization take?",
        answer:
          "Incremental modernization is ongoing, but you'll see improvements within the first 4–8 weeks. Full migrations typically take 3–12 months depending on system complexity.",
      },
    ],
  },

  // ─── DIGITAL TRANSFORMATION ────────────────────────────────────
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline: "Moving offline and manual processes online — for real",
    description:
      "We digitize manual business processes — paper forms, spreadsheet workflows, phone-based ordering, and manual data entry. Built for industries like healthcare, logistics, manufacturing, and professional services.",
    accentColor: "teal",
    visualizationKey: "digital-transformation",
    logo: null,
    lucideIcon: "ArrowRightLeft",
    features: [
      {
        icon: "FileText",
        title: "Process digitization",
        description:
          "Convert paper forms, spreadsheets, and manual workflows into web-based systems with validation and automation.",
      },
      {
        icon: "Network",
        title: "System integration",
        description:
          "Connect newly digitized processes to your existing ERP, CRM, accounting, and communication systems.",
      },
      {
        icon: "Users",
        title: "User training & change management",
        description:
          "We don't just build software — we help your team adopt it with documentation, training, and gradual rollout.",
      },
      {
        icon: "BarChart2",
        title: "Data-driven insights",
        description:
          "Once processes are digital, you can measure them — identify bottlenecks, track KPIs, and make data-driven decisions.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "postgresql" }],
    overview:
      "Digital transformation isn't about technology — it's about making your business more efficient by replacing manual, error-prone processes with software that automates the repetitive parts and gives you data to make better decisions. We've done this for hospitals, logistics companies, professional services firms, and manufacturers — each with unique process requirements that off-the-shelf software can't handle.",
    challenges: [
      {
        title: "Resistance to change",
        description:
          "Teams that have done things one way for years resist new tools. Successful digital transformation requires change management, not just software.",
      },
      {
        title: "Process complexity",
        description:
          "Real business processes have exceptions, edge cases, and tribal knowledge that never makes it into requirements documents.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with the most painful manual process",
        detail:
          "Pick the process that wastes the most time or causes the most errors. Quick wins build momentum for broader transformation.",
      },
      {
        tip: "Involve end users in design",
        detail:
          "The people doing the work know the process best. Co-design with them to build software they'll actually use.",
      },
    ],
    usefulLinks: [
      {
        title: "McKinsey on Digital Transformation",
        url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How do I know if my business needs digital transformation?",
        answer:
          "If your team regularly copies data between spreadsheets, uses paper forms, or relies on email chains for approvals — there are efficiency gains waiting. We offer free assessments to identify the highest-impact opportunities.",
      },
      {
        question: "How long does digital transformation take?",
        answer:
          "Individual process digitization takes 4–12 weeks. Company-wide transformation is a multi-phase journey over 6–18 months, but you see ROI from the first phase.",
      },
    ],
  },

  // ─── WHITE-LABEL ───────────────────────────────────────────────
  {
    slug: "white-label",
    name: "White-Label Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline: "Software built for agencies and businesses to rebrand and resell",
    description:
      "We build white-label software products that you can brand, customize, and sell as your own. From SaaS platforms to mobile apps, we handle the engineering while you focus on sales and customer relationships.",
    accentColor: "gray",
    visualizationKey: "white-label",
    logo: null,
    lucideIcon: "FileBox",
    features: [
      {
        icon: "Palette",
        title: "Full brand customization",
        description:
          "White-label theming with custom logos, colors, domains, and email templates for each client.",
      },
      {
        icon: "Users",
        title: "Multi-tenant architecture",
        description:
          "Each of your clients gets an isolated instance with their own data, users, and configuration.",
      },
      {
        icon: "Code2",
        title: "API-first design",
        description:
          "Everything accessible via API so you can build custom integrations for individual clients.",
      },
      {
        icon: "Shield",
        title: "Your IP, your product",
        description:
          "We build it, you own it. Full source code handover with documentation and deployment guides.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "stripe" }],
    overview:
      "White-label development lets agencies and businesses offer software products under their own brand without building from scratch. We engineer the product, you sell it. This model works for marketing agencies offering client dashboards, consultancies offering reporting tools, and service businesses automating their delivery — all branded as your own product.",
    challenges: [
      {
        title: "Making it truly customizable per client",
        description:
          "Each client wants their own branding, features, and integrations. The architecture needs to support deep customization without forking the codebase.",
      },
      {
        title: "Managing multiple client instances",
        description:
          "Updates, bug fixes, and new features need to roll out across all client instances without breaking custom configurations.",
      },
    ],
    bestPractices: [
      {
        tip: "Design for configuration, not customization",
        detail:
          "Build features that can be configured (turned on/off, themed) rather than requiring custom code per client.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do I own the code?",
        answer:
          "Yes. We transfer full intellectual property rights upon project completion. You get the source code, documentation, and deployment guides.",
      },
      {
        question: "How much does white-label development cost?",
        answer:
          "White-label products typically cost $30,000–80,000+ depending on complexity. The investment pays for itself when you can resell to multiple clients.",
      },
    ],
  },

  // ─── SEO OPTIMIZATION ─────────────────────────────────────────
  {
    slug: "seo-optimization",
    name: "SEO Optimization",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Technical SEO baked in from the start — fast sites, clean markup, content that ranks",
    description:
      "We implement technical SEO at the code level — server-side rendering, structured data, semantic HTML, sitemap generation, Core Web Vitals optimization, and content architecture that search engines understand and reward.",
    accentColor: "emerald",
    visualizationKey: "seo-optimization",
    logo: null,
    lucideIcon: "Search",
    features: [
      {
        icon: "Search",
        title: "Technical SEO audit",
        description:
          "Crawlability, indexation, site structure, schema markup, and Core Web Vitals analysis with prioritized fixes.",
      },
      {
        icon: "FileCode2",
        title: "Structured data implementation",
        description:
          "JSON-LD schema markup for rich snippets — FAQ, breadcrumbs, products, articles, and local business.",
      },
      {
        icon: "Gauge",
        title: "Performance optimization",
        description:
          "Sub-2-second load times through SSR, image optimization, code splitting, and edge caching.",
      },
      {
        icon: "Globe",
        title: "International SEO",
        description:
          "Hreflang tags, multi-language content structures, and locale-specific sitemaps for global reach.",
      },
      {
        icon: "FileText",
        title: "Content architecture",
        description:
          "Information hierarchy, internal linking strategy, and URL structure optimized for topic authority.",
      },
      {
        icon: "BarChart2",
        title: "Search Console monitoring",
        description:
          "Ongoing monitoring of crawl errors, index coverage, and search performance with monthly reports.",
      },
    ],
    subTechs: [{ slug: "nextjs" }, { slug: "react" }, { slug: "wordpress" }],
    overview:
      "SEO is not just about keywords — it's a technical discipline. Search engines reward websites that load fast, have clean HTML structure, provide structured data, and offer genuine value to visitors. We implement technical SEO at the engineering level: server-side rendering for crawlability, JSON-LD schema for rich snippets, programmatic sitemap generation, canonical URL management, and Core Web Vitals optimization. The result is a website that search engines understand and rank higher.",
    challenges: [
      {
        title: "Client-side rendering kills SEO",
        description:
          "Single-page apps that render everything in JavaScript are invisible to many crawlers. Server-side rendering or static generation is essential.",
      },
      {
        title: "Core Web Vitals as ranking factors",
        description:
          "Google uses LCP, CLS, and INP as ranking signals. Sites that fail these metrics lose visibility regardless of content quality.",
      },
      {
        title: "Duplicate content and canonicalization",
        description:
          "Without proper canonical tags and URL structure, search engines split ranking signals across duplicate pages.",
      },
      {
        title: "Missing structured data",
        description:
          "Without JSON-LD schema markup, you miss out on rich snippets — FAQ dropdowns, star ratings, breadcrumbs, and product cards in search results.",
      },
    ],
    bestPractices: [
      {
        tip: "Use server-side rendering or static generation",
        detail:
          "Next.js with SSR/SSG ensures every page is fully rendered HTML when search engines crawl it — no JavaScript execution required.",
      },
      {
        tip: "Implement structured data for every content type",
        detail:
          "FAQ pages, articles, products, services, and local business information all have JSON-LD schemas that enable rich snippets.",
      },
      {
        tip: "Optimize Core Web Vitals continuously",
        detail:
          "Set performance budgets in CI and monitor real user metrics. Performance is not a one-time fix — it requires ongoing attention.",
      },
      {
        tip: "Build topical authority with content clusters",
        detail:
          "Create hub pages for key topics with detailed sub-pages that interlink — search engines reward depth and expertise.",
      },
    ],
    usefulLinks: [
      {
        title: "Google Search Central",
        url: "https://developers.google.com/search",
        type: "docs",
      },
      { title: "Schema.org", url: "https://schema.org", type: "docs" },
      {
        title: "Google Rich Results Test",
        url: "https://search.google.com/test/rich-results",
        type: "tool",
      },
      {
        title: "Ahrefs SEO Blog",
        url: "https://ahrefs.com/blog/",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical SEO improvements (speed, structured data, crawlability) can show results within weeks. Content-driven SEO typically takes 3–6 months to see significant ranking improvements.",
      },
      {
        question: "How much does technical SEO cost?",
        answer:
          "A technical SEO audit and implementation typically costs $3,000–10,000. Ongoing SEO optimization is available as monthly retainers starting at $1,500/month.",
      },
      {
        question: "Do you do content writing and keyword research?",
        answer:
          "We focus on technical SEO — the engineering side. We partner with content agencies for keyword research and content creation, and we provide the technical infrastructure for content to rank.",
      },
    ],
  },

  // ─── FULL DEPLOYMENT ───────────────────────────────────────────
  {
    slug: "full-deployment",
    name: "Full Deployment & Hosting",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "We don't just hand over code — we ship it, host it, and keep it running",
    description:
      "End-to-end deployment services from staging to production. We configure hosting, set up CI/CD, handle DNS, SSL, CDN, and monitoring — everything needed to go live and stay live.",
    accentColor: "sky",
    visualizationKey: "full-deployment",
    logo: null,
    lucideIcon: "Upload",
    features: [
      {
        icon: "Cloud",
        title: "Cloud hosting setup",
        description:
          "Vercel, AWS, GCP, or self-hosted — configured for your performance, compliance, and budget requirements.",
      },
      {
        icon: "Shield",
        title: "SSL & security",
        description:
          "HTTPS everywhere, security headers, WAF configuration, and DDoS protection.",
      },
      {
        icon: "Activity",
        title: "Uptime monitoring",
        description:
          "24/7 monitoring with instant alerts for downtime, performance degradation, and error spikes.",
      },
      {
        icon: "GitBranch",
        title: "Deployment automation",
        description:
          "Push to main, it goes live. Preview deployments for every PR so you can review before shipping.",
      },
    ],
    subTechs: [{ slug: "docker" }, { slug: "cloudflare-workers" }],
    overview:
      "Building software is only half the job. Getting it deployed, configured, monitored, and kept running reliably is the other half — and it's the half that most teams underestimate. We handle the entire deployment lifecycle: infrastructure provisioning, CI/CD pipeline setup, domain configuration, SSL, CDN, monitoring, and ongoing maintenance.",
    challenges: [
      {
        title: "First deployment is always the hardest",
        description:
          "Environment variables, DNS propagation, SSL certificates, CORS, and build configuration all conspire to make the first deploy painful.",
      },
      {
        title: "Keeping production reliable",
        description:
          "Deployment is not a one-time event. Ongoing monitoring, updates, security patches, and scaling decisions are continuous.",
      },
    ],
    bestPractices: [
      {
        tip: "Deploy to staging first, always",
        detail:
          "Every change goes through staging before production. No exceptions. This catches 90% of deployment issues.",
      },
      {
        tip: "Set up monitoring before you need it",
        detail:
          "Uptime monitoring, error tracking, and log aggregation should be configured before launch, not after the first outage.",
      },
    ],
    usefulLinks: [
      { title: "Vercel", url: "https://vercel.com", type: "tool" },
      { title: "Cloudflare", url: "https://cloudflare.com", type: "tool" },
    ],
    faq: [
      {
        question: "What hosting do you recommend?",
        answer:
          "It depends on your stack. For Next.js, Vercel is our default. For custom backends, we use AWS, GCP, or Railway depending on requirements and budget.",
      },
      {
        question: "Do you offer ongoing hosting management?",
        answer:
          "Yes. We offer monthly hosting management plans that include monitoring, updates, security patches, backups, and priority support.",
      },
    ],
  },

  // ─── CONSULTANCY ───────────────────────────────────────────────
  {
    slug: "consultancy",
    name: "Technical Consultancy",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Not sure what you need? We'll help you figure it out before you spend a dollar",
    description:
      "Technical consultancy for founders, CTOs, and product teams. We help you make technology decisions, evaluate architectures, review codebases, and plan roadmaps — before you commit to building.",
    accentColor: "rose",
    visualizationKey: "consultancy",
    logo: null,
    lucideIcon: "MessageCircle",
    features: [
      {
        icon: "Search",
        title: "Architecture review",
        description:
          "Expert assessment of your current or proposed architecture — scalability, security, cost, and maintainability.",
      },
      {
        icon: "FileText",
        title: "Technical due diligence",
        description:
          "Codebase audits for investors, acquirers, or leadership teams evaluating technical assets.",
      },
      {
        icon: "Users",
        title: "Team augmentation strategy",
        description:
          "Advice on hiring, team structure, and when to build in-house vs. outsource specific capabilities.",
      },
      {
        icon: "Lightbulb",
        title: "Technology selection",
        description:
          "Framework, language, and platform recommendations based on your specific requirements — not trends.",
      },
    ],
    subTechs: [],
    overview:
      "Sometimes you don't need a developer — you need someone who can tell you what to build, what stack to use, and whether your current architecture will survive the next growth phase. Our consultancy services help founders, CTOs, and product teams make informed technology decisions backed by real-world experience shipping software across every major stack.",
    challenges: [
      {
        title: "Too many technology options",
        description:
          "The JavaScript ecosystem alone has dozens of frameworks. Making the right choice requires understanding trade-offs that marketing pages won't tell you.",
      },
      {
        title: "Inherited technical debt",
        description:
          "Most companies inherit codebases they didn't build. Understanding what's worth keeping and what needs replacing requires experienced assessment.",
      },
    ],
    bestPractices: [
      {
        tip: "Get an outside opinion before major decisions",
        detail:
          "Internal teams have blind spots. An external architecture review can save months of wrong-direction development.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "How much does a consultancy session cost?",
        answer:
          "We offer a free 30-minute introductory call. Paid consultancy starts at $200/hour for focused technical advice, with discounted packages for longer engagements.",
      },
      {
        question: "Can you review our codebase?",
        answer:
          "Yes. We provide detailed codebase audits covering architecture, code quality, security, performance, and maintainability — with prioritized recommendations.",
      },
    ],
  },
];

export function getOfferingBySlug(slug: string): OfferingConfig | undefined {
  return offeringsConfig.find((s) => s.slug === slug);
}
