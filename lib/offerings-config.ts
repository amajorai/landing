import type { ServiceCategory, ServiceConfig } from "./services-config";

export type OfferingCategory = "offering";

export interface OfferingConfig
  extends Omit<ServiceConfig, "category" | "visualizationKey" | "subTechs"> {
  category: ServiceCategory | "offering";
  visualizationKey: string;
  subTechs: ServiceConfig["subTechs"];
}

// Industry verticals hidden until compliance requirements are met.
// Uncomment slugs below to re-enable when ready.
const HIDDEN_OFFERINGS = new Set<string>([
  "healthcare-software", // HIPAA, HL7 FHIR, PHI data handling
  "fintech", // MAS regulations, PCI-DSS, AML/KYC
  "ecommerce", // Payment compliance, consumer protection laws
  "logistics-software", // Supply chain, customs, cross-border compliance
]);

const _allOfferings: OfferingConfig[] = [
  // ─── WEB DESIGN ────────────────────────────────────────────────
  {
    slug: "web-design",
    name: "Web Design",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Websites that load fast, look sharp, and convert visitors into customers",
    pricingNote:
      "Marketing sites from $3,000. Complex multi-page sites with custom animations and integrations from $10,000–20,000+. We provide fixed-price quotes after a free 30-min scoping call.",
    description:
      "We design and build modern websites that balance aesthetics with performance. Every site we ship is mobile-first, accessibility-compliant, and optimized for Core Web Vitals, because a beautiful site that loads in 6 seconds is a site nobody sees.",
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
          "Layouts that adapt fluidly to every screen size: designed for mobile first, then scaled up.",
      },
      {
        icon: "Gauge",
        title: "Core Web Vitals optimization",
        description:
          "LCP under 2.5s, CLS near zero, INP under 200ms: performance baked into the design process.",
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
          "We design in Figma and translate directly to production code: no handoff gaps or lost-in-translation issues.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "nextjs" },
      { slug: "tailwind" },
      { slug: "wordpress" },
    ],
    overview:
      "Your website is often the first interaction someone has with your business. A well-designed website doesn't just look good: it builds trust, communicates your value proposition in seconds, and guides visitors toward taking action. We combine conversion-focused UX design with modern frontend engineering to create websites that perform as good as they look. From single-page marketing sites to complex multi-language corporate portals, every project gets the same attention to typography, spacing, color theory, and performance.",
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
          "Absolutely. We frequently redesign existing sites: improving visual design, performance, accessibility, and SEO while preserving your existing content and search rankings.",
      },
      {
        question: "Will my website be SEO-friendly?",
        answer:
          "Yes. Every site we build includes semantic HTML, structured data, optimized meta tags, fast load times, and mobile responsiveness: all critical ranking factors.",
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
    pricingNote:
      "Simple CRUD apps from $15,000. Complex SaaS platforms with real-time features, integrations, and multi-tenancy from $50,000–100,000+. Scoped per project after a free technical consultation.",
    description:
      "We build web applications that handle complexity: real-time collaboration, role-based access, complex data models, and third-party integrations. From internal tools to customer-facing SaaS platforms, we ship production-ready apps.",
    accentColor: "blue",
    visualizationKey: "web-apps",
    logo: null,
    lucideIcon: "Globe",
    features: [
      {
        icon: "Server",
        title: "Full-stack architecture",
        description:
          "React/Next.js frontends with Node.js, Python, or .NET backends: chosen based on your requirements, not our preferences.",
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
      "A web application is fundamentally different from a website. Websites display information; web apps let users create, manage, and interact with data. Building a reliable web app means getting authentication, data modeling, API design, state management, and deployment right from day one. We specialize in complex web applications: the kind where you need real-time collaboration, complex permission models, payment processing, third-party API integrations, and the ability to scale from 10 users to 10,000 without re-architecting everything.",
    challenges: [
      {
        title: "Choosing the right architecture upfront",
        description:
          "Monolith vs. microservices, server-side vs. client-side rendering, SQL vs. NoSQL: these decisions are expensive to reverse later.",
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
          "Ship behind feature flags to decouple deployment from release: test in production without risk.",
      },
      {
        tip: "Set up error tracking and observability before launch",
        detail:
          "Sentry, LogRocket, or Datadog configured in staging before you go live. You can't debug production issues you can't observe.",
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
      {
        title: "Supabase (Postgres + Auth)",
        url: "https://supabase.com",
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
          "Yes. We regularly inherit and improve existing codebases: we'll audit the current state, create a migration plan, and incrementally ship improvements alongside new features.",
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
    pricingNote:
      "Cross-platform React Native apps from $20,000. Native iOS/Android apps with complex features from $50,000–100,000+. Includes App Store submission and post-launch support.",
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
          "One codebase for iOS and Android with native performance: ship to both app stores simultaneously.",
      },
      {
        icon: "Cpu",
        title: "Native iOS (Swift) and Android (Kotlin)",
        description:
          "When you need platform-specific features, ARKit, custom camera, or hardware integrations: we go native.",
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
      "Mobile apps are how people spend most of their digital time: over 4 hours per day on average. But building a mobile app that users love is harder than it looks. You need smooth animations, offline support, push notifications, app store compliance, and a UI that feels native on both iOS and Android. We build mobile apps using the right technology for each project: React Native for fast cross-platform development, Swift for iOS-specific features, Kotlin for Android-specific needs, and Flutter when Dart fits the team.",
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
          "Users expect apps to work without internet. Build offline persistence into your data layer early: retrofitting it is extremely expensive.",
      },
      {
        tip: "Test on real devices, not just simulators",
        detail:
          "Simulators don't reflect real-world performance. Test on low-end Android devices and older iPhones to catch memory and rendering issues.",
      },
      {
        tip: "Submit to TestFlight early and often",
        detail:
          "Get the app in front of real users on real devices weeks before launch: not the day before. Early feedback prevents expensive late-stage rewrites.",
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
        question: "React Native vs. native development: which is better?",
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
    pricingNote:
      "Simple single-browser extensions from $5,000. Cross-browser extensions with backend APIs and content manipulation from $15,000–50,000.",
    description:
      "We build browser extensions that enhance existing tools: content scripts, popup UIs, background workers, and cross-browser compatibility. From productivity tools to enterprise integrations.",
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
      "Browser extensions sit inside the tools your users already use every day. They can automate tasks, inject functionality into third-party websites, synchronize data between services, and provide at-a-glance information without context switching. We build extensions for Chrome, Firefox, Edge, and Safari: from simple popup tools to complex content-manipulating extensions with backend APIs.",
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
      {
        tip: "Test across all target browsers before submitting",
        detail:
          "Chrome, Firefox, and Edge each have subtle API differences. Automated cross-browser tests catch compatibility issues before users do.",
      },
      {
        tip: "Use declarative net request over web request API",
        detail:
          "Manifest V3 requires declarativeNetRequest for network interception. Design your rules upfront: the static rule model has hard limits.",
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
      {
        title: "WXT (Extension build framework)",
        url: "https://wxt.dev",
        type: "tool",
      },
      {
        title: "Plasmo (Extension framework)",
        url: "https://docs.plasmo.com",
        type: "tool",
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
      {
        question: "How long does Chrome Web Store review take?",
        answer:
          "Initial reviews typically take 1–3 business days. Updates can take a few hours to a day. We help optimize your listing and resolve rejection issues quickly.",
      },
      {
        question: "Can the extension work with our existing web app?",
        answer:
          "Yes. Extensions can communicate with your web app via shared authentication, API calls, and content scripts: creating a seamless integrated experience.",
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
    pricingNote:
      "Internal tools and dashboards from $30,000. Complex multi-system integrations and compliance-ready platforms from $80,000–200,000+. All projects start with a discovery phase.",
    description:
      "We build enterprise-grade internal tools: admin dashboards, CRM integrations, inventory management systems, reporting platforms, and workflow automation. Software that handles the complexity your off-the-shelf tools can't.",
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
          "Real-time dashboards with the exact metrics your team needs: not the ones a SaaS tool decided to show you.",
      },
      {
        icon: "Workflow",
        title: "Process automation",
        description:
          "Automate repetitive tasks: approvals, data entry, notifications, and report generation.",
      },
    ],
    subTechs: [
      { slug: "react" },
      { slug: "dotnet" },
      { slug: "postgresql" },
      { slug: "docker" },
    ],
    overview:
      "Enterprise software is the backbone of how businesses actually operate. When off-the-shelf tools don't fit your processes, you need custom software that does. We build internal tools that your team uses every day: from admin panels and CRM integrations to complex multi-department workflows. These systems need to be reliable, secure, auditable, and intuitive enough that non-technical staff can use them without training.",
    challenges: [
      {
        title: "Integrating with legacy systems",
        description:
          "Most enterprises run on a mix of old and new systems. Connecting them requires understanding deprecated APIs, data formats, and migration strategies.",
      },
      {
        title: "Complex permission models",
        description:
          "Enterprise apps need fine-grained access control: by role, department, region, and data classification. Getting this wrong creates security and compliance risks.",
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
          "Enterprise systems need complete audit trails. Add them in the data layer: retrofitting is extremely expensive.",
      },
      {
        tip: "Plan for SSO from the start",
        detail:
          "Enterprise clients expect SAML or OIDC SSO with their existing identity provider. Building auth to support this upfront avoids expensive integration work later.",
      },
      {
        tip: "Document integration contracts, not just code",
        detail:
          "When your system connects to SAP, Salesforce, or legacy databases, write explicit contracts for data formats, error handling, and retry logic. Undocumented integrations break silently.",
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
      {
        title: "Permit.io (Authorization)",
        url: "https://www.permit.io",
        type: "tool",
      },
      {
        title: "OpenTelemetry (Observability)",
        url: "https://opentelemetry.io",
        type: "docs",
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
      {
        question: "How do you handle change management for internal tools?",
        answer:
          "We involve end users early in the design process, conduct usability testing with real staff, and provide training materials and documentation as part of every delivery.",
      },
      {
        question: "Can you maintain the system after launch?",
        answer:
          "Yes. We offer ongoing maintenance retainers covering bug fixes, feature additions, dependency updates, and priority support: typically starting at $3,000/month.",
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
    pricingNote:
      "SaaS MVPs from $25,000. Full-featured products with billing, analytics, admin panels, and polished UX from $60,000–150,000+. Fixed-price engagements after a free scoping call.",
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
          "Isolated or shared tenant architectures: each customer gets their own data space with admin controls.",
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
      "Building a SaaS product is one of the most complex software engineering challenges. You need multi-tenancy, subscription billing, user roles, onboarding flows, usage analytics, and an architecture that scales with your customer base. Most SaaS MVPs fail not because the idea is bad, but because the engineering wasn't production-ready. We build SaaS products with the right foundations, so you can focus on growth instead of firefighting technical debt.",
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
          "PostgreSQL RLS policies enforce tenant isolation at the database level, even if application code has bugs, data can't leak between tenants.",
      },
      {
        tip: "Build billing on Stripe from day one",
        detail:
          "Don't build billing yourself. Stripe handles subscriptions, invoicing, tax, and compliance: use their primitives.",
      },
      {
        tip: "Instrument everything for product analytics",
        detail:
          "Track every meaningful user action from launch. You can't make data-driven decisions without data.",
      },
      {
        tip: "Design your pricing model before building billing",
        detail:
          "Freemium, per-seat, usage-based, and tiered pricing all have different database and billing architecture implications. Changing pricing models mid-product is painful.",
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
      {
        title: "Neon (Serverless Postgres for SaaS)",
        url: "https://neon.tech",
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
          "Yes. We help SaaS companies scale their engineering: adding features, improving performance, fixing technical debt, and preparing for growth milestones.",
      },
      {
        question: "Do you help with SaaS go-to-market and growth?",
        answer:
          "Our focus is engineering, but we partner with growth and marketing teams. We can build the technical infrastructure for product-led growth: referral programs, usage-based onboarding, in-app prompts, and self-serve trials.",
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
    pricingNote:
      "Quick UI audits and refreshes from $3,000. Full user research, wireframing, and high-fidelity design systems from $15,000–30,000. Delivered as Figma files with developer-ready specs.",
    description:
      "We do standalone design work: user research, wireframes, prototypes, and pixel-perfect UI design. Whether you need a complete design system or just a refresh, we deliver Figma files your developers can actually implement.",
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
      "Good UI/UX design is the difference between a product people tolerate and one they love. We combine user research with visual design expertise to create interfaces that are both beautiful and functional. Our design process starts with understanding your users, maps out their key workflows, and produces high-fidelity designs that are ready for development: complete with responsive layouts, interaction states, and developer handoff specs.",
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
      {
        tip: "Use real content in mockups, not lorem ipsum",
        detail:
          "Real product names, actual user data, and genuine copy reveal layout problems that placeholder text hides. Designs that look great with fake content often break with real content.",
      },
      {
        tip: "Design for accessibility from the start",
        detail:
          "WCAG 2.1 AA compliance is not a final checklist: it's a design discipline. Sufficient color contrast, keyboard navigation, and focus states must be designed in, not bolted on.",
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
      {
        title: "Radix UI Primitives",
        url: "https://www.radix-ui.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Do you do design-only projects?",
        answer:
          "Yes. We offer standalone design services , from quick UI audits to full design system creation , delivered as Figma files with developer-ready specs.",
      },
      {
        question: "How much does UI/UX design cost?",
        answer:
          "Design projects range from $3,000 for a focused UI refresh to $15,000–30,000 for comprehensive user research, wireframing, and high-fidelity design systems.",
      },
      {
        question: "Do you design for both web and mobile?",
        answer:
          "Yes. We design responsive web interfaces and native mobile screens, following each platform's design language: Material Design for Android, Human Interface Guidelines for iOS.",
      },
      {
        question: "How do you hand off designs to developers?",
        answer:
          "We deliver annotated Figma files with component specs, spacing tokens, interaction notes, and responsive breakpoints. We also offer developer Q&A sessions to walk through edge cases.",
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
    pricingNote:
      "CI/CD setup and infrastructure configuration from $5,000. Ongoing cloud management available as monthly retainers from $2,000/month. Cost audits often pay for themselves within 60 days.",
    description:
      "We set up and manage your deployment infrastructure: CI/CD pipelines, Docker containers, Kubernetes clusters, cloud architecture on AWS, GCP, or Azure, and monitoring that alerts you before your users notice problems.",
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
          "Observability with logs, metrics, and traces: know when something breaks before your users do.",
      },
    ],
    subTechs: [
      { slug: "docker" },
      { slug: "cloudflare-workers" },
      { slug: "s3" },
    ],
    overview:
      "DevOps bridges the gap between writing code and running it reliably in production. Without proper CI/CD, infrastructure, and monitoring, even great code becomes unreliable. We help teams ship faster and sleep better: automated pipelines, infrastructure-as-code, containerized deployments, and comprehensive monitoring that catches problems early.",
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
          "When something breaks at 2 AM, you need logs, metrics, and traces to diagnose the issue: not guesswork.",
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
          "Terraform, Pulumi, or CDK: your infrastructure should be version-controlled, reviewable, and reproducible.",
      },
      {
        tip: "Implement blue-green or canary deployments",
        detail:
          "Ship new versions to a small percentage of traffic first. Catch production issues before they affect all users, and roll back in minutes instead of hours.",
      },
      {
        tip: "Set up on-call rotation before you need one",
        detail:
          "Define escalation paths, runbooks, and alerting thresholds before your first production incident: not during it.",
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
      {
        title: "Grafana (Observability)",
        url: "https://grafana.com",
        type: "tool",
      },
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
      {
        question: "Do you support Kubernetes for our deployments?",
        answer:
          "Yes. We set up and manage Kubernetes clusters on EKS, GKE, or self-hosted environments: including Helm charts, autoscaling, and network policies.",
      },
      {
        question: "Can you help migrate our infrastructure to the cloud?",
        answer:
          "Yes. We plan and execute cloud migrations from on-premise or managed hosting to AWS, GCP, or Azure: minimizing downtime and optimizing for cost and performance.",
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
      "Find the bottlenecks and fix them: in code, queries, and infrastructure",
    pricingNote:
      "Comprehensive performance audit with prioritized recommendations from $3,000–8,000. Implementation of fixes scoped separately. Most audits deliver measurable improvements within 2 weeks.",
    description:
      "Slow software loses users, hurts SEO rankings, and frustrates employees. We profile, diagnose, and fix performance issues across your entire stack: frontend rendering, API response times, database queries, and infrastructure.",
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
      "Performance is a feature. Google penalizes slow sites in search rankings, users abandon pages that take more than 3 seconds to load, and employees waste hours waiting for sluggish internal tools. We specialize in identifying and fixing performance bottlenecks, whether it's a React app with unnecessary re-renders, an API with N+1 query problems, or infrastructure that can't handle peak traffic.",
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
      {
        tip: "Fix N+1 query problems before they scale",
        detail:
          "A query that runs once per list item causes catastrophic slowdowns at scale. Use query analyzers and DataLoader patterns to batch database calls.",
      },
      {
        tip: "Use a CDN for all static assets",
        detail:
          "Images, fonts, and JS bundles should be served from a CDN closest to your users: not from your origin server. This alone can cut load times by 60%.",
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
      {
        title: "Bundle Analyzer for Next.js",
        url: "https://www.npmjs.com/package/@next/bundle-analyzer",
        type: "tool",
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
      {
        question: "Our API is slow: can you help with backend performance?",
        answer:
          "Yes. Backend performance is often the hidden bottleneck. We profile API response times, identify slow queries, add caching layers, and optimize data access patterns.",
      },
      {
        question: "Will performance improvements affect our SEO rankings?",
        answer:
          "Yes. Google uses Core Web Vitals (LCP, CLS, INP) as ranking factors. Improving these metrics directly impacts search visibility, especially on mobile.",
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
    tagline: "Define the smallest version that proves the idea: then build it",
    pricingNote:
      "Scoping engagement (discovery + specification) from $3,000–5,000. Full MVP build from $15,000–40,000. Most MVPs launch within 6–12 weeks. Fixed-price, no surprises.",
    description:
      "Not sure what to build first? We help founders and product teams define the minimum viable product: the smallest version of your idea that can generate real user feedback. Then we build it fast.",
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
          "Detailed specs covering data model, API design, user flows, and technology choices: before any code is written.",
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
      "Most startups fail because they build too much before validating demand. An MVP isn't a bad version of your product: it's the smallest version that tests your core hypothesis. We help you figure out what to build first, scope it tightly, and ship it fast so you can start learning from real users instead of guessing.",
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
      {
        tip: "Cut features ruthlessly, not quality",
        detail:
          "An MVP should have fewer features, not worse features. Every feature that ships should work well and feel polished: half-built features erode user trust.",
      },
      {
        tip: "Build your feedback loop into the product",
        detail:
          "In-app surveys, session recordings, and usage analytics should be configured at launch. You need user insight to know what to build next.",
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
      {
        title: "Vercel (Instant deployments)",
        url: "https://vercel.com",
        type: "tool",
      },
      {
        title: "PostHog (Analytics + session replay)",
        url: "https://posthog.com",
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
      {
        question: "What's included in an MVP scoping engagement?",
        answer:
          "A scoping engagement includes product discovery workshops, user story mapping, technical architecture decisions, a prioritized feature backlog, and a fixed-price build estimate.",
      },
      {
        question: "What happens after the MVP launches?",
        answer:
          "We help you interpret early user data, plan the next iteration, and continue building: either as a retainer or project-by-project, depending on your needs.",
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
    pricingNote:
      "Codebase audit from $5,000–10,000. Full modernization projects from $20,000–100,000+ depending on system complexity. Incremental approach means you see ROI from the first sprint.",
    description:
      "Legacy systems don't have to be replaced overnight. We incrementally modernize aging codebases: migrating from outdated frameworks, improving architecture, and rebuilding critical paths while keeping your business running.",
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
          "Strangler fig pattern: new features in modern code while legacy systems continue running.",
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
      "Legacy software is expensive to maintain, difficult to hire for, and increasingly risky from a security perspective. But rip-and-replace projects are expensive and dangerous. We take an incremental approach: modernizing the most painful parts first while keeping your business running. The goal is to reach a modern, maintainable codebase without a 12-month rewrite project.",
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
          "Build new features on modern technology and gradually route traffic away from legacy systems: no big bang cutover.",
      },
      {
        tip: "Write characterization tests before touching legacy code",
        detail:
          "Capture the existing system's behavior with tests before refactoring. These tests become your safety net when the original logic isn't documented.",
      },
      {
        tip: "Prioritize security fixes in the first sprint",
        detail:
          "Legacy systems often have critical CVEs in outdated dependencies. Patch security vulnerabilities before addressing architecture: risk reduction is always highest priority.",
      },
    ],
    usefulLinks: [
      {
        title: "Martin Fowler on Strangler Fig",
        url: "https://martinfowler.com/bliki/StranglerFigApplication.html",
        type: "tutorial",
      },
      {
        title: "Working Effectively with Legacy Code (book)",
        url: "https://www.oreilly.com/library/view/working-effectively-with/0131177052/",
        type: "tutorial",
      },
      {
        title: "SonarQube (Code quality analysis)",
        url: "https://www.sonarsource.com/products/sonarqube/",
        type: "tool",
      },
      {
        title: "OWASP Dependency Check",
        url: "https://owasp.org/www-project-dependency-check/",
        type: "tool",
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
      {
        question: "Can you modernize without disrupting our current users?",
        answer:
          "Yes. Our incremental approach means the existing system keeps running throughout the migration. We route traffic gradually to the new system and fall back if needed.",
      },
      {
        question: "We're using PHP/ASP.NET/.NET Framework: can you help?",
        answer:
          "Yes. We regularly modernize PHP applications to Laravel or Node.js, and migrate .NET Framework apps to modern .NET: incrementally and safely.",
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
    tagline: "Moving offline and manual processes online: for real",
    pricingNote:
      "Single process digitization from $15,000–35,000. Multi-department transformation programs from $50,000–200,000+ delivered in phased engagements. Free assessment to identify highest-impact opportunities.",
    description:
      "We digitize manual business processes: paper forms, spreadsheet workflows, phone-based ordering, and manual data entry. Built for professional services, manufacturing, and operations-heavy businesses.",
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
          "We don't just build software: we help your team adopt it with documentation, training, and gradual rollout.",
      },
      {
        icon: "BarChart2",
        title: "Data-driven insights",
        description:
          "Once processes are digital, you can measure them: identify bottlenecks, track KPIs, and make data-driven decisions.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "postgresql" }],
    overview:
      "Digital transformation isn't about technology , it's about making your business more efficient by replacing manual, error-prone processes with software that automates the repetitive parts and gives you data to make better decisions. We've done this for professional services firms, manufacturers, and operations-heavy businesses , each with unique process requirements that off-the-shelf software can't handle.",
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
      {
        tip: "Measure process efficiency before and after",
        detail:
          "Establish baseline metrics (time per task, error rates, cost per transaction) before digitizing. These become the proof points that justify further transformation investment.",
      },
      {
        tip: "Run parallel systems during transition",
        detail:
          "Keep the old paper/spreadsheet process running alongside the new digital system for 4–8 weeks. This safety net allows rollback and builds user confidence.",
      },
    ],
    usefulLinks: [
      {
        title: "McKinsey on Digital Transformation",
        url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights",
        type: "tutorial",
      },
      {
        title: "Make (Workflow automation)",
        url: "https://www.make.com",
        type: "tool",
      },
      {
        title: "Retool (Internal tool builder)",
        url: "https://retool.com",
        type: "tool",
      },
      {
        title: "Zapier (Integration automation)",
        url: "https://zapier.com",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How do I know if my business needs digital transformation?",
        answer:
          "If your team regularly copies data between spreadsheets, uses paper forms, or relies on email chains for approvals: there are efficiency gains waiting. We offer free assessments to identify the highest-impact opportunities.",
      },
      {
        question: "How long does digital transformation take?",
        answer:
          "Individual process digitization takes 4–12 weeks. Company-wide transformation is a multi-phase journey over 6–18 months, but you see ROI from the first phase.",
      },
      {
        question: "How much does digital transformation cost?",
        answer:
          "A single process digitization project starts at $15,000–35,000. Broader multi-department transformation programs range from $50,000–200,000+, typically delivered in phases.",
      },
      {
        question:
          "What industries do you work with for digital transformation?",
        answer:
          "We've digitized processes in professional services, manufacturing, and operations-heavy businesses. Each industry has unique workflows and process requirements we understand well.",
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
    pricingNote:
      "White-label products from $30,000–80,000+ depending on complexity and feature set. You own the IP. The investment pays for itself when you resell to multiple clients.",
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
      "White-label development lets agencies and businesses offer software products under their own brand without building from scratch. We engineer the product, you sell it. This model works for marketing agencies offering client dashboards, consultancies offering reporting tools, and service businesses automating their delivery: all branded as your own product.",
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
      {
        title: "Keeping client data isolated",
        description:
          "White-label products often serve regulated industries where one client's data must never be visible to another, even accidentally. Multi-tenancy architecture must be watertight.",
      },
      {
        title: "Supporting diverse client technical environments",
        description:
          "Some clients want SaaS, others want self-hosted. Some need SSO with their identity provider. The product architecture must accommodate varied deployment models.",
      },
    ],
    bestPractices: [
      {
        tip: "Design for configuration, not customization",
        detail:
          "Build features that can be configured (turned on/off, themed) rather than requiring custom code per client.",
      },
      {
        tip: "Build a client admin portal from day one",
        detail:
          "Give your clients self-service control over branding, users, and settings. Reducing your support overhead per client is critical to making the white-label model profitable.",
      },
      {
        tip: "Use feature flags per tenant",
        detail:
          "Ship new features to individual client instances before rolling out broadly. This lets you beta test with selected clients and charge for premium features.",
      },
      {
        tip: "Establish a clear versioning and update policy",
        detail:
          "Clients on older versions need a support window before forced upgrades. Define your versioning strategy before you have 10 clients on 3 different versions.",
      },
    ],
    usefulLinks: [
      {
        title: "Stripe Connect (Marketplace payments)",
        url: "https://stripe.com/connect",
        type: "docs",
      },
      {
        title: "Auth0 Organizations (Multi-tenant auth)",
        url: "https://auth0.com/docs/manage-users/organizations",
        type: "docs",
      },
      {
        title: "Unleash (Feature flags)",
        url: "https://www.getunleash.io",
        type: "tool",
      },
      {
        title: "Neon (Tenant-per-database Postgres)",
        url: "https://neon.tech",
        type: "tool",
      },
    ],
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
      {
        question: "Can clients self-host the product?",
        answer:
          "Yes. We can build deployment packages for client self-hosting , Docker containers, Kubernetes manifests, or cloud-specific templates , alongside the SaaS version.",
      },
      {
        question: "How do you handle updates across all client instances?",
        answer:
          "We architect for automated updates with configuration-driven customization. A single update deploys across all instances while preserving each client's branding and settings.",
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
      "Technical SEO baked in from the start: fast sites, clean markup, content that ranks",
    pricingNote:
      "Technical SEO audit from $3,000–10,000. Ongoing SEO optimization from $1,500/month. Most clients see measurable ranking improvements within 4–8 weeks of implementation.",
    description:
      "We implement technical SEO at the code level: server-side rendering, structured data, semantic HTML, sitemap generation, Core Web Vitals optimization, and content architecture that search engines understand and reward.",
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
          "JSON-LD schema markup for rich snippets: FAQ, breadcrumbs, products, articles, and local business.",
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
      "SEO is not just about keywords: it's a technical discipline. Search engines reward websites that load fast, have clean HTML structure, provide structured data, and offer genuine value to visitors. We implement technical SEO at the engineering level: server-side rendering for crawlability, JSON-LD schema for rich snippets, programmatic sitemap generation, canonical URL management, and Core Web Vitals optimization. The result is a website that search engines understand and rank higher.",
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
          "Without JSON-LD schema markup, you miss out on rich snippets: FAQ dropdowns, star ratings, breadcrumbs, and product cards in search results.",
      },
    ],
    bestPractices: [
      {
        tip: "Use server-side rendering or static generation",
        detail:
          "Next.js with SSR/SSG ensures every page is fully rendered HTML when search engines crawl it: no JavaScript execution required.",
      },
      {
        tip: "Implement structured data for every content type",
        detail:
          "FAQ pages, articles, products, services, and local business information all have JSON-LD schemas that enable rich snippets.",
      },
      {
        tip: "Optimize Core Web Vitals continuously",
        detail:
          "Set performance budgets in CI and monitor real user metrics. Performance is not a one-time fix: it requires ongoing attention.",
      },
      {
        tip: "Build topical authority with content clusters",
        detail:
          "Create hub pages for key topics with detailed sub-pages that interlink: search engines reward depth and expertise.",
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
          "We focus on technical SEO: the engineering side. We partner with content agencies for keyword research and content creation, and we provide the technical infrastructure for content to rank.",
      },
      {
        question:
          "What's the difference between technical SEO and on-page SEO?",
        answer:
          "Technical SEO is about how search engines crawl, index, and understand your site: speed, structured data, canonicals, sitemaps. On-page SEO is about content quality, keyword targeting, and metadata. We handle technical SEO; both work together for best results.",
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
      "We don't just hand over code: we ship it, host it, and keep it running",
    pricingNote:
      "One-time deployment setup from $2,000–8,000. Monthly hosting management from $500/month. Includes monitoring, security patches, backups, and priority support.",
    description:
      "End-to-end deployment services from staging to production. We configure hosting, set up CI/CD, handle DNS, SSL, CDN, and monitoring: everything needed to go live and stay live.",
    accentColor: "sky",
    visualizationKey: "full-deployment",
    logo: null,
    lucideIcon: "Upload",
    features: [
      {
        icon: "Cloud",
        title: "Cloud hosting setup",
        description:
          "Vercel, AWS, GCP, or self-hosted: configured for your performance, compliance, and budget requirements.",
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
      "Building software is only half the job. Getting it deployed, configured, monitored, and kept running reliably is the other half, and it's the half that most teams underestimate. We handle the entire deployment lifecycle: infrastructure provisioning, CI/CD pipeline setup, domain configuration, SSL, CDN, monitoring, and ongoing maintenance.",
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
      {
        title: "Zero-downtime deployments are harder than they look",
        description:
          "Database migrations, session management, and cache invalidation all need careful coordination to deploy without user-visible interruptions.",
      },
      {
        title: "Environment parity between staging and production",
        description:
          "Bugs that only appear in production often trace back to environment differences: different secrets, different third-party services, or different data volumes.",
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
      {
        tip: "Automate rollbacks",
        detail:
          "Every deployment should have a tested rollback procedure. Automated rollback on error spike detection means faster recovery with no manual intervention.",
      },
      {
        tip: "Use preview deployments for every PR",
        detail:
          "Vercel, Netlify, and similar platforms deploy every pull request to a unique URL. This lets stakeholders review changes before they merge: not after.",
      },
    ],
    usefulLinks: [
      { title: "Vercel", url: "https://vercel.com", type: "tool" },
      { title: "Cloudflare", url: "https://cloudflare.com", type: "tool" },
      {
        title: "Railway (Simple deployments)",
        url: "https://railway.app",
        type: "tool",
      },
      {
        title: "BetterStack (Uptime monitoring)",
        url: "https://betterstack.com",
        type: "tool",
      },
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
      {
        question: "Can you migrate our existing hosting to a new provider?",
        answer:
          "Yes. We handle full hosting migrations: replicating the environment, testing in parallel, and switching DNS with zero-downtime cutover.",
      },
      {
        question: "How do you handle SSL certificates?",
        answer:
          "SSL is automatically provisioned and renewed via Let's Encrypt or your cloud provider's certificate manager. We configure HTTP-to-HTTPS redirects and HSTS headers at the same time.",
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
    pricingNote:
      "Free 30-minute introductory call. Hourly advisory from $200/hour. Codebase audits and architecture reviews from $3,000–8,000. Discounted packages available for longer engagements.",
    description:
      "Technical consultancy for founders, CTOs, and product teams. We help you make technology decisions, evaluate architectures, review codebases, and plan roadmaps: before you commit to building.",
    accentColor: "rose",
    visualizationKey: "consultancy",
    logo: null,
    lucideIcon: "MessageCircle",
    features: [
      {
        icon: "Search",
        title: "Architecture review",
        description:
          "Expert assessment of your current or proposed architecture: scalability, security, cost, and maintainability.",
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
          "Framework, language, and platform recommendations based on your specific requirements: not trends.",
      },
    ],
    subTechs: [],
    overview:
      "Sometimes you don't need a developer: you need someone who can tell you what to build, what stack to use, and whether your current architecture will survive the next growth phase. Our consultancy services help founders, CTOs, and product teams make informed technology decisions backed by real-world experience shipping software across every major stack.",
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
      {
        title: "Vendor lock-in decisions",
        description:
          "Choosing a cloud provider, CMS, or database locks you in for years. These decisions need objective analysis of total cost of ownership, not just short-term convenience.",
      },
      {
        title: "Building vs. buying",
        description:
          "Deciding when to build custom software vs. use off-the-shelf tools requires understanding both the technical options and your business growth trajectory.",
      },
    ],
    bestPractices: [
      {
        tip: "Get an outside opinion before major decisions",
        detail:
          "Internal teams have blind spots. An external architecture review can save months of wrong-direction development.",
      },
      {
        tip: "Document architecture decisions with ADRs",
        detail:
          "Architecture Decision Records capture what was decided, why, and what alternatives were considered. Future engineers thank you for this context.",
      },
      {
        tip: "Prototype before committing",
        detail:
          "A two-week technical spike costs far less than discovering three months in that the chosen approach doesn't scale. Validate architectural assumptions early.",
      },
      {
        tip: "Choose boring technology for the core",
        detail:
          "Save experimentation for the edges. Postgres, Node.js, and React are boring for good reason: they have large talent pools, known failure modes, and years of community support.",
      },
    ],
    usefulLinks: [
      {
        title: "Architecture Decision Records (ADR)",
        url: "https://adr.github.io",
        type: "docs",
      },
      {
        title: "ThoughtWorks Technology Radar",
        url: "https://www.thoughtworks.com/radar",
        type: "tutorial",
      },
      {
        title: "System Design Primer",
        url: "https://github.com/donnemartin/system-design-primer",
        type: "tutorial",
      },
      {
        title: "Martin Fowler's Architecture Guide",
        url: "https://martinfowler.com/architecture/",
        type: "tutorial",
      },
    ],
    faq: [
      {
        question: "How much does a consultancy session cost?",
        answer:
          "We offer a free 30-minute introductory call. Paid consultancy starts at $200/hour for focused technical advice, with discounted packages for longer engagements.",
      },
      {
        question: "Can you review our codebase?",
        answer:
          "Yes. We provide detailed codebase audits covering architecture, code quality, security, performance, and maintainability: with prioritized recommendations.",
      },
      {
        question:
          "We're evaluating vendors: can you help us make the decision?",
        answer:
          "Yes. We run structured vendor evaluations: building proof-of-concepts, scoring candidates against your specific requirements, and providing an objective recommendation with evidence.",
      },
      {
        question: "Can you help us plan a technology roadmap?",
        answer:
          "Yes. We facilitate roadmap planning workshops that align business goals with technical priorities: producing a phased plan your team can execute against with confidence.",
      },
    ],
  },

  // ─── HEALTHCARE SOFTWARE ─────────────────────────────────────────
  {
    slug: "healthcare-software",
    name: "Healthcare Software",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "HIPAA-compliant software that improves patient outcomes and streamlines clinical workflows",
    pricingNote:
      "Patient portals and scheduling systems from $30,000. Full EHR-integrated platforms and telehealth applications from $80,000–200,000+. All projects include HIPAA-compliant architecture and BAA.",
    description:
      "We build secure, regulation-ready healthcare applications: from patient portals and telehealth platforms to EHR/EMR integrations and appointment scheduling systems. Every line of code is written with HIPAA compliance, data encryption, and audit logging as non-negotiable foundations.",
    accentColor: "emerald",
    visualizationKey: "healthcare-software",
    logo: null,
    lucideIcon: "HeartPulse",
    features: [
      {
        icon: "HeartPulse",
        title: "Patient portal development",
        description:
          "Secure self-service portals where patients can view records, schedule appointments, message providers, and manage prescriptions.",
      },
      {
        icon: "FileText",
        title: "EHR/EMR integration",
        description:
          "HL7 FHIR and legacy API integrations with Epic, Cerner, Allscripts, and other major electronic health record systems.",
      },
      {
        icon: "ShieldCheck",
        title: "HIPAA-compliant architecture",
        description:
          "End-to-end encryption, role-based access control, audit trails, and BAA-ready infrastructure from day one.",
      },
      {
        icon: "Video",
        title: "Telehealth & virtual care",
        description:
          "WebRTC-powered video consultations with waiting rooms, screen sharing, and integrated clinical notes.",
      },
      {
        icon: "CalendarCheck",
        title: "Appointment & scheduling systems",
        description:
          "Smart scheduling with provider availability, automated reminders, waitlist management, and calendar sync.",
      },
      {
        icon: "BarChart3",
        title: "Clinical analytics dashboards",
        description:
          "Real-time reporting on patient outcomes, operational metrics, and population health trends for data-driven decisions.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }, { slug: "postgresql" }],
    overview:
      "Healthcare organizations face a unique intersection of technical complexity and regulatory pressure. Off-the-shelf software rarely fits the specific workflows of clinics, hospitals, and health-tech startups, and when it does, customization is locked behind expensive vendor contracts. Custom healthcare software solves this by mapping directly to your clinical processes, integrating with the systems your staff already use, and scaling as your patient base grows.\n\nAt A Major, we specialize in building healthcare applications that meet HIPAA requirements without sacrificing user experience. Our team understands HL7 FHIR standards, PHI data handling, role-based access patterns, and the audit trail requirements that regulators expect. Whether you're building a patient-facing portal, a telehealth platform, or an internal clinical tool, we deliver software that clinicians actually want to use.\n\nFrom initial compliance architecture through deployment on HIPAA-eligible cloud infrastructure, we handle the full lifecycle, so your team can focus on patient care, not debugging integrations.",
    challenges: [
      {
        title: "HIPAA compliance is complex and non-negotiable",
        description:
          "A single data breach can cost millions in fines and destroy patient trust. Every component , database, API, frontend, hosting , must meet strict privacy and security requirements.",
      },
      {
        title: "EHR integration is fragmented",
        description:
          "Each electronic health record system uses different APIs, data formats, and authentication methods. Connecting to Epic differs vastly from connecting to Cerner or Allscripts.",
      },
      {
        title: "Clinical workflows vary across organizations",
        description:
          "No two clinics operate identically. Software must adapt to diverse scheduling patterns, documentation standards, and care team structures.",
      },
      {
        title: "User adoption among clinical staff",
        description:
          "Healthcare workers are time-constrained and resistant to clunky interfaces. If the software adds friction to their day, they won't use it.",
      },
    ],
    bestPractices: [
      {
        tip: "Design for HIPAA from the architecture layer",
        detail:
          "Retrofitting compliance is exponentially more expensive than building it in. Start with encrypted storage, access control, and audit logging before writing a single feature.",
      },
      {
        tip: "Use HL7 FHIR as your interoperability standard",
        detail:
          "FHIR is the modern healthcare data exchange standard. Building on FHIR makes future integrations with EHRs, labs, and payers dramatically simpler.",
      },
      {
        tip: "Test with real clinicians early and often",
        detail:
          "Healthcare UX is different from consumer UX. Get nurses, doctors, and admin staff involved in usability testing before you finalize workflows.",
      },
      {
        tip: "Plan for audit trails from day one",
        detail:
          "Every access to PHI must be logged. Immutable audit logs are a regulatory requirement and a critical debugging tool.",
      },
    ],
    usefulLinks: [
      {
        title: "HHS HIPAA Security Rule",
        url: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
        type: "docs",
      },
      {
        title: "HL7 FHIR Specification",
        url: "https://www.hl7.org/fhir/",
        type: "docs",
      },
      {
        title: "ONC Health IT Certification",
        url: "https://www.healthit.gov/topic/certification-ehrs/about-onc-health-it-certification-program",
        type: "docs",
      },
      {
        title: "OWASP Healthcare Security Guide",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "docs",
      },
    ],
    faq: [
      {
        question:
          "How do you ensure HIPAA compliance in the software you build?",
        answer:
          "We architect HIPAA compliance into the foundation: encrypted databases, TLS everywhere, role-based access control, immutable audit logs, and deployment on HIPAA-eligible infrastructure (AWS GovCloud or Azure Healthcare). We also provide documentation for your compliance officer and support BAA execution with cloud providers.",
      },
      {
        question: "How much does custom healthcare software development cost?",
        answer:
          "A patient portal or telehealth MVP typically ranges from $30,000–$80,000. Enterprise-grade platforms with EHR integrations, clinical dashboards, and multi-tenant architecture start at $80,000 and can exceed $250,000 depending on scope and compliance requirements.",
      },
      {
        question: "Can you integrate with our existing EHR system?",
        answer:
          "Yes. We have experience integrating with Epic, Cerner, Allscripts, and other EHR platforms using HL7 FHIR, SMART on FHIR, and legacy HL7v2 interfaces. We also work with labs, pharmacies, and insurance payer APIs.",
      },
      {
        question: "How long does it take to build a healthcare application?",
        answer:
          "A focused MVP (patient portal, scheduling, telehealth) takes 3–5 months. More complex platforms with multiple EHR integrations and compliance certifications typically take 6–12 months.",
      },
    ],
  },

  // ─── FINTECH DEVELOPMENT ─────────────────────────────────────────
  {
    slug: "fintech",
    name: "Fintech Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Secure, compliant financial software: from payment processing to banking platforms",
    pricingNote:
      "Payment integrations and financial dashboards from $25,000. Full neobanking or investment platforms from $80,000–300,000+. All projects include security architecture review and compliance documentation.",
    description:
      "We develop fintech applications that handle money with the reliability, security, and regulatory compliance the financial industry demands. From payment gateways and neobanking platforms to investment dashboards and crypto integrations, we build software that processes transactions accurately and passes audits confidently.",
    accentColor: "green",
    visualizationKey: "fintech",
    logo: null,
    lucideIcon: "Landmark",
    features: [
      {
        icon: "CreditCard",
        title: "Payment processing integration",
        description:
          "Stripe, Plaid, Adyen, and custom payment gateway integrations with PCI DSS-compliant data handling.",
      },
      {
        icon: "Landmark",
        title: "Banking & neobanking platforms",
        description:
          "Account management, fund transfers, KYC/AML verification, and multi-currency support for modern banking apps.",
      },
      {
        icon: "ShieldCheck",
        title: "PCI DSS & regulatory compliance",
        description:
          "Architecture designed to meet PCI DSS, SOC 2, and regional financial regulations from the ground up.",
      },
      {
        icon: "BarChart3",
        title: "Financial dashboards & reporting",
        description:
          "Real-time portfolio views, transaction histories, P&L reporting, and custom analytics for financial decision-making.",
      },
      {
        icon: "Lock",
        title: "Fraud detection & prevention",
        description:
          "Transaction monitoring, anomaly detection, velocity checks, and risk scoring to protect users and reduce chargebacks.",
      },
      {
        icon: "Coins",
        title: "Crypto & blockchain integration",
        description:
          "Wallet integrations, token management, DeFi protocol connections, and blockchain transaction tracking.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }, { slug: "stripe" }],
    overview:
      "Financial software operates under constraints that most applications never encounter: every transaction must be accurate to the cent, every piece of user data must be encrypted and auditable, and every feature must comply with regulations that vary by jurisdiction. Fintech companies, whether building payment platforms, lending tools, or investment apps: need development partners who understand these constraints deeply.\n\nAt A Major, we build fintech software that treats security and compliance as first-class engineering concerns, not afterthoughts. Our team has experience with PCI DSS cardholder data environments, KYC/AML verification flows, Plaid and Stripe integrations, and the double-entry accounting patterns that financial accuracy demands. We architect for auditability, because in fintech, if you can't prove it happened correctly, it didn't.\n\nWhether you're a startup building your first payment product or an established firm modernizing legacy banking infrastructure, we deliver software that regulators approve and users trust.",
    challenges: [
      {
        title: "Regulatory compliance across jurisdictions",
        description:
          "PCI DSS, SOC 2, PSD2, MiFID II: financial regulations vary by country and product type. Non-compliance means fines, license revocation, or worse.",
      },
      {
        title: "Transaction accuracy at scale",
        description:
          "Financial systems can't have rounding errors or race conditions. Every calculation must be deterministic, and every state change must be idempotent and auditable.",
      },
      {
        title: "Security threats are constant and sophisticated",
        description:
          "Fintech apps are high-value targets. Credential stuffing, API abuse, and social engineering require layered defenses well beyond basic authentication.",
      },
      {
        title: "Legacy system modernization",
        description:
          "Many financial institutions run on COBOL or outdated Java systems. Migrating without downtime or data loss requires careful, incremental strategies.",
      },
    ],
    bestPractices: [
      {
        tip: "Use decimal arithmetic, never floating point",
        detail:
          "Floating-point math causes rounding errors. All monetary calculations should use integer cents or dedicated decimal libraries to guarantee accuracy.",
      },
      {
        tip: "Design every transaction as idempotent",
        detail:
          "Network failures happen. Idempotency keys ensure that retried payments aren't processed twice: critical for user trust and reconciliation.",
      },
      {
        tip: "Implement audit logging from the start",
        detail:
          "Every financial action should produce an immutable log entry. Auditors and regulators will ask for this: it's far easier to build it in than bolt it on.",
      },
      {
        tip: "Separate sensitive data into isolated environments",
        detail:
          "PCI DSS requires cardholder data to be stored in segmented environments. Architect your infrastructure with clear data classification boundaries.",
      },
    ],
    usefulLinks: [
      {
        title: "PCI DSS Quick Reference Guide",
        url: "https://www.pcisecuritystandards.org/document_library/",
        type: "docs",
      },
      {
        title: "Stripe API Documentation",
        url: "https://stripe.com/docs/api",
        type: "docs",
      },
      {
        title: "Plaid Quickstart Guide",
        url: "https://plaid.com/docs/quickstart/",
        type: "docs",
      },
      {
        title: "OWASP Fintech Security Checklist",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "What fintech regulations do you help comply with?",
        answer:
          "We architect for PCI DSS (payment card data), SOC 2 (operational controls), KYC/AML (identity verification), and regional frameworks like PSD2 (EU) and state-level money transmitter laws. We work with your compliance counsel to ensure the software meets all applicable requirements.",
      },
      {
        question: "How much does fintech application development cost?",
        answer:
          "A payment integration or financial dashboard MVP typically costs $25,000–$60,000. Full neobanking platforms, lending systems, or multi-jurisdiction payment processors range from $80,000–$300,000+ depending on compliance scope and feature depth.",
      },
      {
        question:
          "What security measures do you implement for financial applications?",
        answer:
          "We implement end-to-end encryption, tokenized card storage, multi-factor authentication, rate limiting, fraud detection rules, penetration testing, and SOC 2-aligned operational controls. All sensitive data is stored in PCI-compliant segmented environments.",
      },
      {
        question:
          "Can you integrate with existing banking APIs and payment providers?",
        answer:
          "Yes. We integrate with Stripe, Plaid, Adyen, Square, Wise, and traditional banking APIs. We also build custom middleware for legacy banking systems that don't offer modern API access.",
      },
    ],
  },

  // ─── E-COMMERCE DEVELOPMENT ──────────────────────────────────────
  {
    slug: "ecommerce",
    name: "E-commerce Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Custom online stores built to sell: fast, conversion-optimized, and scalable",
    pricingNote:
      "Custom Shopify storefronts from $8,000. Headless e-commerce platforms with custom checkout and integrations from $25,000–80,000+. All builds include Core Web Vitals optimization.",
    description:
      "We build e-commerce experiences that go beyond templates. Whether you need a headless Shopify storefront, a custom WooCommerce build, or a fully bespoke shopping platform, we deliver stores that load fast, convert visitors into buyers, and scale with your inventory and traffic.",
    accentColor: "orange",
    visualizationKey: "ecommerce",
    logo: null,
    lucideIcon: "ShoppingCart",
    features: [
      {
        icon: "ShoppingCart",
        title: "Custom storefront development",
        description:
          "Unique, brand-aligned shopping experiences: not cookie-cutter templates that look like every other store in your niche.",
      },
      {
        icon: "Layers",
        title: "Headless commerce architecture",
        description:
          "Decoupled frontends with Shopify, WooCommerce, or Medusa backends for maximum performance and design flexibility.",
      },
      {
        icon: "CreditCard",
        title: "Payment & checkout optimization",
        description:
          "Stripe, PayPal, Apple Pay, and local payment method integrations with conversion-optimized single-page checkouts.",
      },
      {
        icon: "Package",
        title: "Inventory & order management",
        description:
          "Real-time stock tracking, multi-warehouse support, automated reorder alerts, and order lifecycle management.",
      },
      {
        icon: "Globe",
        title: "Multi-channel selling",
        description:
          "Sync products and orders across your website, Amazon, eBay, Instagram Shop, and brick-and-mortar POS systems.",
      },
      {
        icon: "Search",
        title: "Product search & filtering",
        description:
          "Fast, faceted product search with typo tolerance, filters, and AI-powered recommendations to increase average order value.",
      },
    ],
    subTechs: [{ slug: "woocommerce" }, { slug: "stripe" }, { slug: "nextjs" }],
    overview:
      "E-commerce is one of the most competitive spaces on the internet. Shoppers expect sub-second load times, seamless mobile checkout, and personalized product discovery, and they'll abandon their cart at the first sign of friction. Template-based stores can get you started, but they hit a ceiling fast: limited customization, sluggish performance under load, and rigid checkout flows that tank conversion rates.\n\nA Major builds custom e-commerce solutions that prioritize the metrics that actually drive revenue: page speed, conversion rate, and average order value. We work with headless architectures: decoupling the frontend experience from the commerce backend, so your store can be blazing fast on Next.js while still powered by Shopify, WooCommerce, or a custom product catalog behind the scenes.\n\nFrom inventory management and multi-currency support to subscription billing and wholesale portals, we build the commerce infrastructure that grows with your business instead of constraining it.",
    challenges: [
      {
        title: "Cart abandonment rates average 70%",
        description:
          "Most shoppers abandon before paying. Slow checkouts, surprise shipping costs, and forced account creation are the top killers. Every friction point costs revenue.",
      },
      {
        title: "Performance degrades as catalogs grow",
        description:
          "Stores with 10,000+ products often suffer from slow search, sluggish filters, and page load times that drive shoppers to Amazon. Architecture matters at scale.",
      },
      {
        title: "Platform lock-in limits growth",
        description:
          "Shopify and WooCommerce are great starting points, but their templating systems and plugin ecosystems create technical ceilings that require custom engineering to break through.",
      },
      {
        title: "Multi-channel inventory sync is error-prone",
        description:
          "Selling across multiple channels without a centralized inventory system leads to overselling, stockouts, and customer complaints.",
      },
    ],
    bestPractices: [
      {
        tip: "Optimize checkout to the fewest possible steps",
        detail:
          "Every additional form field or page in checkout increases abandonment. Guest checkout, autofill, and express payment options are table stakes.",
      },
      {
        tip: "Use headless architecture for performance-critical stores",
        detail:
          "Decoupling the frontend from the commerce backend lets you serve static or ISR pages via CDN while keeping the cart and checkout dynamic.",
      },
      {
        tip: "Invest in product search from early on",
        detail:
          "Shoppers who search convert at 2–3x the rate of browsers. Algolia, Meilisearch, or Typesense can transform your product discovery experience.",
      },
      {
        tip: "Implement structured data for Google Shopping",
        detail:
          "Product schema markup gets your items into Google Shopping results and rich snippets: free, high-intent traffic.",
      },
    ],
    usefulLinks: [
      {
        title: "Shopify Storefront API",
        url: "https://shopify.dev/docs/api/storefront",
        type: "docs",
      },
      {
        title: "WooCommerce REST API",
        url: "https://woocommerce.github.io/woocommerce-rest-api-docs/",
        type: "docs",
      },
      {
        title: "Google Merchant Center",
        url: "https://merchants.google.com/",
        type: "tool",
      },
      {
        title: "Baymard Institute UX Research",
        url: "https://baymard.com/research",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "Should I build a custom store or use Shopify/WooCommerce?",
        answer:
          "For most businesses starting out, Shopify or WooCommerce with a custom theme is the best path. You get proven commerce infrastructure with room to customize. We recommend going fully custom only when you've outgrown template limitations: typically at $1M+ annual revenue or when you need features platforms can't support.",
      },
      {
        question: "What is headless e-commerce and do I need it?",
        answer:
          "Headless commerce separates your storefront (what shoppers see) from your commerce backend (products, cart, orders). This lets you build ultra-fast frontends with Next.js while keeping Shopify or WooCommerce as your admin panel. It's ideal for high-traffic stores where performance directly impacts revenue.",
      },
      {
        question: "How much does a custom e-commerce store cost?",
        answer:
          "A custom WooCommerce or Shopify theme starts at $8,000–$20,000. Headless commerce builds with Next.js range from $25,000–$80,000. Enterprise multi-channel platforms with custom inventory management start at $60,000+.",
      },
      {
        question: "Can you migrate my existing store to a new platform?",
        answer:
          "Yes. We handle full e-commerce migrations: products, customers, order history, SEO redirects, and payment configurations. We've migrated stores from Magento, BigCommerce, Squarespace, and custom platforms to Shopify and WooCommerce without losing search rankings.",
      },
    ],
  },

  // ─── EDUCATION & EDTECH ──────────────────────────────────────────
  /* HIDDEN
  {
    slug: "education-software",
    name: "Education & EdTech",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Learning platforms that engage students and simplify administration",
    pricingNote:
      "Course platforms and student portals from $20,000. Full LMS builds with video, assessments, and progress tracking from $50,000–150,000+. Accessibility-compliant by default.",
    description:
      "We build education technology: from learning management systems and e-learning platforms to student portals and assessment engines. Our EdTech solutions are designed for engagement, accessibility, and scale, whether you're a university, K-12 district, or corporate training provider.",
    accentColor: "indigo",
    visualizationKey: "education-software",
    logo: null,
    lucideIcon: "GraduationCap",
    features: [
      {
        icon: "GraduationCap",
        title: "Learning management systems",
        description:
          "Custom LMS platforms with course creation, enrollment, progress tracking, and certification: tailored to your pedagogy.",
      },
      {
        icon: "Video",
        title: "Virtual classroom & live learning",
        description:
          "Video conferencing, screen sharing, breakout rooms, and interactive whiteboards for synchronous online education.",
      },
      {
        icon: "ClipboardCheck",
        title: "Assessment & grading systems",
        description:
          "Quizzes, exams, rubrics, auto-grading, and plagiarism detection: with detailed analytics on student performance.",
      },
      {
        icon: "Users",
        title: "Student & parent portals",
        description:
          "Self-service dashboards for students and parents to track grades, attendance, assignments, and communicate with educators.",
      },
      {
        icon: "BookOpen",
        title: "Content authoring tools",
        description:
          "WYSIWYG course builders, multimedia support, SCORM/xAPI compatibility, and reusable content libraries for instructors.",
      },
      {
        icon: "BarChart3",
        title: "Learning analytics & reporting",
        description:
          "Track engagement, completion rates, assessment scores, and learning outcomes to continuously improve course effectiveness.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }, { slug: "postgresql" }],
    overview:
      "Education is undergoing a permanent digital transformation. Students expect on-demand access to courses, interactive content, and progress tracking from any device. Educators need tools that reduce administrative burden while providing actionable insights into student engagement and outcomes. And institutions need platforms that scale from dozens to thousands of learners without compromising performance or accessibility.\n\nOff-the-shelf LMS platforms like Moodle or Canvas cover basic needs, but they struggle with customization, branding, and integration with existing institutional systems. When your pedagogy doesn't fit into a template, you need custom EdTech , purpose-built for how your organization actually teaches and learns.\n\nA Major builds education software that treats learner engagement as the primary design metric. We create platforms with intuitive course navigation, accessible content delivery, real-time progress tracking, and assessment systems that provide meaningful feedback , not just scores. From K-12 districts to corporate training departments, our EdTech solutions are built to make learning effective and administration effortless.",
    challenges: [
      {
        title: "Student engagement drops after initial enrollment",
        description:
          "Completion rates for online courses average below 15%. Without gamification, progress nudges, and engaging content delivery, learners disengage quickly.",
      },
      {
        title: "Accessibility is legally required and often overlooked",
        description:
          "Educational institutions must comply with Section 508, ADA, and WCAG standards. Inaccessible platforms exclude students with disabilities and invite lawsuits.",
      },
      {
        title: "Integration with existing school systems is complex",
        description:
          "SIS (Student Information Systems), LTI tools, SSO, and grade passback create a web of integrations that must work flawlessly for staff adoption.",
      },
      {
        title: "Scaling content for diverse learner needs",
        description:
          "Learners have different paces, prerequisites, and learning styles. Adaptive learning paths and differentiated content require thoughtful architecture.",
      },
    ],
    bestPractices: [
      {
        tip: "Design for mobile learners first",
        detail:
          "Over 70% of e-learning is accessed on mobile devices. Responsive design, offline access, and touch-friendly interfaces are essential.",
      },
      {
        tip: "Build in gamification and progress signals",
        detail:
          "Badges, streaks, progress bars, and leaderboards significantly improve course completion rates, especially for self-paced learning.",
      },
      {
        tip: "Support SCORM and xAPI from the start",
        detail:
          "These e-learning standards ensure your platform can import existing courseware and track detailed learning activities across tools.",
      },
      {
        tip: "Implement LTI for seamless tool integration",
        detail:
          "Learning Tools Interoperability (LTI) allows your LMS to connect with external tools like Turnitin, Zoom, and lab simulations without custom integration work.",
      },
    ],
    usefulLinks: [
      {
        title: "IMS Global LTI Specification",
        url: "https://www.imsglobal.org/activity/learning-tools-interoperability",
        type: "docs",
      },
      {
        title: "SCORM Overview",
        url: "https://scorm.com/scorm-explained/",
        type: "docs",
      },
      {
        title: "WCAG 2.1 Guidelines",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        type: "docs",
      },
      {
        title: "EdSurge Research",
        url: "https://www.edsurge.com/research",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "How much does a custom LMS cost to build?",
        answer:
          "A focused LMS with course management, enrollment, and basic assessments starts at $30,000–$60,000. Enterprise platforms with adaptive learning, virtual classrooms, detailed analytics, and SIS integrations range from $80,000–$200,000+.",
      },
      {
        question: "Should we build a custom LMS or use Moodle/Canvas?",
        answer:
          "If your needs fit standard course delivery and grading, Moodle or Canvas with customizations is often the most cost-effective path. Custom builds make sense when you need unique pedagogical features, deep branding, proprietary assessment methods, or integrations that existing platforms can't support.",
      },
      {
        question: "What features are essential for an e-learning platform?",
        answer:
          "At minimum: user registration, course catalog, content delivery (video, text, interactive), progress tracking, assessments, and certificates. For competitive platforms, add discussion forums, live sessions, mobile apps, gamification, and analytics dashboards.",
      },
      {
        question:
          "Can you integrate with our existing Student Information System?",
        answer:
          "Yes. We integrate with popular SIS platforms like PowerSchool, Infinite Campus, and Ellucian using their APIs and LTI standards. This includes roster sync, grade passback, and single sign-on.",
      },
    ],
  },
  HIDDEN */

  // ─── LOGISTICS & SUPPLY CHAIN ────────────────────────────────────
  {
    slug: "logistics-software",
    name: "Logistics & Supply Chain Software",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Real-time visibility into your fleet, inventory, and supply chain: from warehouse to doorstep",
    pricingNote:
      "Fleet tracking and delivery management systems from $25,000. Full WMS/TMS platforms with ERP integrations from $60,000–200,000+. Built to handle real-time data at operational scale.",
    description:
      "We build logistics and supply chain software that gives you full operational visibility. Fleet management, route optimization, warehouse management, and real-time shipment tracking: engineered for reliability at scale and integration with your existing ERP and WMS systems.",
    accentColor: "slate",
    visualizationKey: "logistics-software",
    logo: null,
    lucideIcon: "Truck",
    features: [
      {
        icon: "Truck",
        title: "Fleet management & GPS tracking",
        description:
          "Real-time vehicle tracking, driver assignment, maintenance scheduling, and fuel consumption monitoring across your fleet.",
      },
      {
        icon: "Route",
        title: "Route optimization",
        description:
          "AI-powered routing algorithms that minimize delivery time, fuel cost, and driver hours while respecting vehicle capacity and time windows.",
      },
      {
        icon: "Warehouse",
        title: "Warehouse management systems",
        description:
          "Pick/pack/ship workflows, bin location management, barcode scanning, and inventory cycle counting for efficient warehouse operations.",
      },
      {
        icon: "Package",
        title: "Real-time shipment tracking",
        description:
          "End-to-end package visibility with automated status updates, delivery ETAs, and customer notification integrations.",
      },
      {
        icon: "BarChart3",
        title: "Supply chain analytics",
        description:
          "Dashboards tracking on-time delivery rates, inventory turnover, carrier performance, and demand forecasting.",
      },
      {
        icon: "Link",
        title: "ERP & carrier integrations",
        description:
          "Connections to SAP, Oracle, NetSuite, and carrier APIs (FedEx, UPS, DHL) for seamless data flow across your supply chain.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nodejs" }, { slug: "postgresql" }],
    overview:
      "Supply chain complexity is increasing every year. More SKUs, faster delivery expectations, global sourcing, and volatile demand patterns mean that spreadsheets and manual processes no longer cut it. Companies that lack real-time visibility into their logistics operations lose money to inefficient routes, stockouts, overstocking, and missed delivery windows.\n\nCustom logistics software bridges the gap between off-the-shelf tools that can't handle your specific workflows and enterprise platforms that cost millions and take years to implement. At A Major, we build logistics applications that connect your warehouses, fleet, carriers, and customers into a single operational view: with the real-time data and automation that keeps goods moving efficiently.\n\nWhether you're managing a last-mile delivery fleet, operating a 3PL warehouse, or coordinating a multi-supplier supply chain, our solutions are built for the throughput and reliability your operations demand. We integrate with your existing ERP, WMS, and carrier systems so you don't have to rip and replace your entire tech stack.",
    challenges: [
      {
        title: "Real-time tracking across fragmented systems",
        description:
          "Shipments pass through multiple carriers, warehouses, and systems. Maintaining a unified, real-time view requires robust integration and event-driven architecture.",
      },
      {
        title: "Route optimization is computationally complex",
        description:
          "The Vehicle Routing Problem (VRP) with time windows, capacity constraints, and dynamic conditions is NP-hard. Effective solutions require specialized algorithms.",
      },
      {
        title: "Inventory accuracy degrades without automation",
        description:
          "Manual inventory counts are slow and error-prone. Warehouse operations need barcode/RFID scanning and real-time stock updates to maintain accuracy.",
      },
      {
        title: "Legacy ERP integration is painful",
        description:
          "Many logistics companies run on SAP, Oracle, or custom ERPs with outdated APIs. Integrating modern web applications with these systems requires middleware expertise.",
      },
    ],
    bestPractices: [
      {
        tip: "Use event-driven architecture for real-time updates",
        detail:
          "WebSockets and message queues (Kafka, RabbitMQ) enable real-time tracking and status updates that polling-based architectures can't match at scale.",
      },
      {
        tip: "Implement barcode/RFID scanning at every touchpoint",
        detail:
          "Scan events create an audit trail of every inventory movement. This eliminates guesswork and reduces inventory discrepancies to near zero.",
      },
      {
        tip: "Build for offline-first in field operations",
        detail:
          "Drivers and warehouse workers often have spotty connectivity. Offline-capable mobile apps that sync when connected prevent data loss and workflow interruptions.",
      },
      {
        tip: "Start with visibility before optimization",
        detail:
          "You can't optimize what you can't measure. Build dashboards and tracking first, then layer in route optimization and demand forecasting once you have clean data.",
      },
    ],
    usefulLinks: [
      {
        title: "Google OR-Tools (Route Optimization)",
        url: "https://developers.google.com/optimization",
        type: "tool",
      },
      {
        title: "GS1 Barcode Standards",
        url: "https://www.gs1.org/standards/barcodes",
        type: "docs",
      },
      {
        title: "ShipEngine API",
        url: "https://www.shipengine.com/docs/",
        type: "docs",
      },
      {
        title: "EasyPost Shipping API",
        url: "https://www.easypost.com/docs/api",
        type: "docs",
      },
    ],
    faq: [
      {
        question: "Can you integrate with our existing ERP system?",
        answer:
          "Yes. We integrate with SAP, Oracle, NetSuite, Microsoft Dynamics, and custom ERP systems using their APIs, EDI, or custom middleware. We also support real-time sync so inventory and order data stays consistent across platforms.",
      },
      {
        question: "How does real-time tracking work technically?",
        answer:
          "We use GPS devices or driver mobile apps to capture location data, stream it through WebSocket connections, and display it on map-based dashboards. Events like pickup, transit, and delivery are tracked and push notifications are sent to stakeholders automatically.",
      },
      {
        question: "How much does custom logistics software cost?",
        answer:
          "A fleet tracking or delivery management MVP starts at $25,000–$50,000. Full warehouse management systems with route optimization, carrier integrations, and analytics dashboards range from $60,000–$200,000+ depending on complexity.",
      },
      {
        question: "Do you support mobile apps for drivers and warehouse staff?",
        answer:
          "Yes. We build cross-platform mobile apps (React Native) for drivers, warehouse pickers, and field staff: with barcode scanning, GPS tracking, offline mode, and push notifications.",
      },
    ],
  },

  // ─── WEBSITE MIGRATION ───────────────────────────────────────────
  {
    slug: "website-migration",
    name: "Website Migration Services",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Move your website to a better platform: without losing rankings, traffic, or data",
    description:
      "We handle complete website migrations: from Wix, Squarespace, Shopify, or legacy platforms to WordPress, Next.js, or custom solutions. Every migration preserves your SEO equity, content, functionality, and user experience while upgrading your technology foundation.",
    accentColor: "blue",
    visualizationKey: "website-migration",
    logo: null,
    lucideIcon: "ArrowRightLeft",
    features: [
      {
        icon: "ArrowRightLeft",
        title: "Platform-to-platform migration",
        description:
          "Full migrations from Wix, Squarespace, Shopify, Magento, Joomla, and Drupal to WordPress, Next.js, or custom builds.",
      },
      {
        icon: "Search",
        title: "SEO preservation & redirect mapping",
        description:
          "Comprehensive 301 redirect maps, canonical URL structure, metadata transfer, and structured data migration to protect search rankings.",
      },
      {
        icon: "Database",
        title: "Content & data migration",
        description:
          "Automated extraction and transformation of pages, blog posts, products, images, users, and custom fields: nothing left behind.",
      },
      {
        icon: "ShieldCheck",
        title: "Zero-downtime cutover",
        description:
          "DNS management, staging environments, and parallel running ensure your site never goes offline during the transition.",
      },
      {
        icon: "Gauge",
        title: "Performance upgrade",
        description:
          "Migrations are an opportunity to fix performance debt: faster hosting, optimized images, cleaner code, and better Core Web Vitals.",
      },
    ],
    subTechs: [{ slug: "wordpress" }, { slug: "nextjs" }, { slug: "react" }],
    overview:
      "Website migrations are one of the highest-risk, highest-reward projects a business can undertake. When done right, a migration upgrades your performance, unlocks new features, and positions your site for long-term growth. When done wrong, you lose search rankings that took years to build, break links that drive traffic, and frustrate existing users with a degraded experience.\n\nThe reason most migrations go badly is that they're treated as simple copy-paste jobs. Real migrations require careful URL mapping, redirect strategy, content transformation, metadata preservation, and thorough post-launch monitoring. At A Major, we've migrated hundreds of sites across every major platform combination: from Wix to WordPress, Squarespace to Next.js, and Shopify to headless commerce. We follow a proven methodology that protects your SEO equity at every step.\n\nOur migration process includes pre-migration audits, URL inventory, 301 redirect mapping, content extraction and transformation, staging site validation, and 90 days of post-launch monitoring to catch and fix any ranking fluctuations.",
    challenges: [
      {
        title: "SEO rankings drop after migration",
        description:
          "Without comprehensive redirect maps and metadata preservation, search engines treat the new site as brand new: wiping out years of domain authority and keyword rankings.",
      },
      {
        title: "Content structure differs between platforms",
        description:
          "Wix stores content differently than WordPress, which stores it differently than Next.js. Data transformation between formats requires custom scripts and careful QA.",
      },
      {
        title: "Functionality gaps between old and new platforms",
        description:
          "Features built with plugins or custom code on the old platform may not have direct equivalents. Identifying and rebuilding these gaps is critical to user satisfaction.",
      },
      {
        title: "Downtime during cutover impacts revenue",
        description:
          "Every minute of downtime costs traffic and sales. Staging environments, DNS TTL management, and parallel running minimize the risk window to near zero.",
      },
    ],
    bestPractices: [
      {
        tip: "Crawl and audit the existing site before touching anything",
        detail:
          "Use Screaming Frog or Sitebulb to create a complete inventory of URLs, redirects, metadata, canonical tags, and internal links before starting the migration.",
      },
      {
        tip: "Map every URL and implement 301 redirects",
        detail:
          "Every old URL must redirect to its new equivalent. Missing redirects cause 404 errors, lost backlinks, and ranking drops. Test every redirect before launch.",
      },
      {
        tip: "Run the new site on staging and validate thoroughly",
        detail:
          "Compare page counts, metadata, images, forms, and functionality between old and new before cutting over. Automated testing catches issues humans miss.",
      },
      {
        tip: "Monitor for 90 days post-migration",
        detail:
          "Search engines take weeks to re-crawl and re-index. Monitor Google Search Console for crawl errors, ranking changes, and index coverage daily for the first three months.",
      },
    ],
    usefulLinks: [
      {
        title: "Google's Site Move Documentation",
        url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
        type: "docs",
      },
      {
        title: "Screaming Frog SEO Spider",
        url: "https://www.screamingfrog.co.uk/seo-spider/",
        type: "tool",
      },
      {
        title: "Google Search Console",
        url: "https://search.google.com/search-console/",
        type: "tool",
      },
      {
        title: "Ahrefs Site Audit",
        url: "https://ahrefs.com/site-audit",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Will I lose my Google rankings during a migration?",
        answer:
          "Not if the migration is handled correctly. With comprehensive 301 redirects, metadata preservation, and proper Google Search Console configuration, most sites maintain or improve their rankings within 4–8 weeks. We monitor rankings daily post-migration to catch and fix any issues immediately.",
      },
      {
        question: "How long does a website migration take?",
        answer:
          "Simple migrations (Wix to WordPress with under 50 pages) take 2–4 weeks. Complex migrations (e-commerce with thousands of products, custom functionality, and multiple integrations) take 6–12 weeks including QA and post-launch monitoring.",
      },
      {
        question: "How much does a website migration cost?",
        answer:
          "Basic content migrations start at $3,000–$8,000. E-commerce migrations with product catalogs, customer data, and order history range from $10,000–$30,000. Enterprise migrations with custom functionality and multiple integrations start at $25,000+.",
      },
      {
        question: "Can you migrate my e-commerce store without losing orders?",
        answer:
          "Yes. We migrate product catalogs, customer accounts, order history, and reviews. We typically run the old and new stores in parallel during cutover, then redirect all traffic once the new store is validated.",
      },
    ],
  },

  // ─── API DEVELOPMENT & INTEGRATION ───────────────────────────────
  {
    slug: "api-development",
    name: "API Development & Integration",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Well-designed APIs that connect your systems, partners, and products reliably",
    description:
      "We design, build, and document APIs that developers love to use. From RESTful services and GraphQL endpoints to third-party integrations and webhook systems, we create the connective tissue that makes your software ecosystem work together seamlessly.",
    accentColor: "violet",
    visualizationKey: "api-development",
    logo: null,
    lucideIcon: "Plug",
    features: [
      {
        icon: "Plug",
        title: "REST API design & development",
        description:
          "Clean, versioned RESTful APIs following OpenAPI standards with consistent error handling, pagination, and authentication.",
      },
      {
        icon: "GitBranch",
        title: "GraphQL API development",
        description:
          "Flexible GraphQL schemas with efficient resolvers, DataLoader batching, and subscription support for real-time data.",
      },
      {
        icon: "Link",
        title: "Third-party integrations",
        description:
          "Stripe, Twilio, SendGrid, HubSpot, Salesforce, and hundreds of other service integrations: built reliably with error handling and retry logic.",
      },
      {
        icon: "Bell",
        title: "Webhooks & event systems",
        description:
          "Outbound webhook delivery with retry policies, signature verification, and event log dashboards for your API consumers.",
      },
      {
        icon: "FileText",
        title: "API documentation",
        description:
          "Auto-generated, interactive API docs using OpenAPI/Swagger, Redoc, or custom documentation portals with code examples in multiple languages.",
      },
      {
        icon: "ShieldCheck",
        title: "Authentication & rate limiting",
        description:
          "OAuth 2.0, API keys, JWT tokens, and intelligent rate limiting to secure your API and protect against abuse.",
      },
    ],
    subTechs: [{ slug: "nodejs" }, { slug: "rest-api" }, { slug: "trpc" }],
    overview:
      "APIs are the backbone of modern software. Every mobile app, SaaS product, and microservice architecture depends on well-designed APIs to function. But the difference between a good API and a bad one isn't just technical , it's business-critical. A poorly designed API creates integration friction, increases support burden, and slows down every team that depends on it. A well-designed API accelerates development, enables partnerships, and can become a product in its own right.\n\nAt A Major, we build APIs with the same care we put into user-facing interfaces. That means consistent naming conventions, predictable error responses, comprehensive documentation, versioning strategies that don't break consumers, and performance that holds under load. Whether you're building an internal API for your microservices, a public API for third-party developers, or integrating with external services like Stripe and Twilio, we deliver APIs that are reliable, well-documented, and a pleasure to work with.\n\nWe work across REST, GraphQL, and tRPC , choosing the right protocol for your use case rather than defaulting to whatever's trendy.",
    challenges: [
      {
        title: "API design mistakes are expensive to fix",
        description:
          "Once external consumers depend on your API, breaking changes are painful and politically difficult. Getting the design right before launch prevents years of backward-compatibility headaches.",
      },
      {
        title: "Third-party APIs are unreliable",
        description:
          "External services go down, rate-limit you, and change their APIs without notice. Your integration layer needs retry logic, circuit breakers, and fallback strategies.",
      },
      {
        title: "Documentation is always out of date",
        description:
          "Manually maintained docs drift from reality within weeks. Auto-generated documentation from your actual code and schemas is the only sustainable approach.",
      },
      {
        title: "Authentication and authorization are complex",
        description:
          "OAuth flows, API key management, scope-based permissions, and token refresh: getting auth right requires understanding both security standards and developer experience.",
      },
    ],
    bestPractices: [
      {
        tip: "Design your API contract before writing code",
        detail:
          "OpenAPI specs let you define endpoints, request/response schemas, and error codes upfront. This enables parallel frontend and backend development and catches design issues early.",
      },
      {
        tip: "Version your API from day one",
        detail:
          "URL-based versioning (/v1/, /v2/) or header-based versioning: pick one and implement it before your first consumer integrates. Adding versioning later is far more painful.",
      },
      {
        tip: "Use idempotency keys for mutating operations",
        detail:
          "Network failures cause retries. Idempotency keys ensure that retried POST/PUT requests don't create duplicate resources: critical for payments and order processing.",
      },
      {
        tip: "Generate documentation from your code, not separately",
        detail:
          "Tools like OpenAPI, tRPC, and GraphQL introspection ensure your docs always match your implementation. Manually written docs are lies waiting to happen.",
      },
    ],
    usefulLinks: [
      {
        title: "OpenAPI Specification",
        url: "https://swagger.io/specification/",
        type: "docs",
      },
      {
        title: "GraphQL Best Practices",
        url: "https://graphql.org/learn/best-practices/",
        type: "docs",
      },
      {
        title: "tRPC Documentation",
        url: "https://trpc.io/docs",
        type: "docs",
      },
      {
        title: "Postman API Platform",
        url: "https://www.postman.com/",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "Should I use REST or GraphQL for my API?",
        answer:
          "REST is simpler, more widely understood, and better for public APIs with straightforward CRUD operations. GraphQL excels when clients need flexible queries, you have deeply nested data, or you're serving multiple frontends with different data needs. We help you choose based on your actual requirements, not hype.",
      },
      {
        question: "How do you secure APIs against abuse?",
        answer:
          "We implement layered security: OAuth 2.0 or API key authentication, role-based access control, rate limiting per consumer, request validation, input sanitization, and monitoring for anomalous patterns. For sensitive APIs, we add IP allowlisting and mutual TLS.",
      },
      {
        question: "How much does API development cost?",
        answer:
          "A focused REST API with 10–20 endpoints, authentication, and documentation typically costs $10,000–$25,000. Complex API platforms with GraphQL, webhooks, third-party integrations, and developer portals range from $30,000–$80,000+.",
      },
      {
        question: "Can you integrate our system with third-party services?",
        answer:
          "Yes. We've integrated with hundreds of third-party APIs including Stripe, Twilio, SendGrid, HubSpot, Salesforce, QuickBooks, Slack, and more. We build robust integration layers with error handling, retry logic, and monitoring.",
      },
    ],
  },

  // ─── STARTUP SOFTWARE DEVELOPMENT ────────────────────────────────
  {
    slug: "startup-development",
    name: "Startup Software Development",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "From idea to MVP to scale: engineering that moves at startup speed",
    description:
      "We help startups go from zero to one. Whether you need an MVP to validate product-market fit, a prototype for investor demos, or a production-ready platform that scales with your first thousand users, we build fast without cutting corners that come back to bite you at Series A.",
    accentColor: "pink",
    visualizationKey: "startup-development",
    logo: null,
    lucideIcon: "Rocket",
    features: [
      {
        icon: "Rocket",
        title: "MVP development",
        description:
          "Focused minimum viable products that validate your core hypothesis in 6–12 weeks: not bloated v1s that take 6 months and miss the market window.",
      },
      {
        icon: "Lightbulb",
        title: "Rapid prototyping",
        description:
          "Interactive prototypes and proof-of-concepts for investor pitches, user testing, and technical validation before committing to full development.",
      },
      {
        icon: "TrendingUp",
        title: "Scalable architecture from the start",
        description:
          "We build MVPs on production-grade foundations, so scaling from 100 to 10,000 users doesn't require a rewrite.",
      },
      {
        icon: "Users",
        title: "Product-market fit iteration",
        description:
          "Rapid feature iteration based on user feedback, analytics, and A/B testing to find the product configuration that retains users.",
      },
      {
        icon: "Code",
        title: "Technical co-founder support",
        description:
          "For non-technical founders: architecture decisions, technology selection, technical hiring guidance, and investor-ready technical documentation.",
      },
      {
        icon: "GitBranch",
        title: "Clean handoff to in-house teams",
        description:
          "Well-documented, well-tested codebases that your future engineering hires can understand and extend without needing us.",
      },
    ],
    subTechs: [{ slug: "react" }, { slug: "nextjs" }, { slug: "nodejs" }],
    overview:
      "Building a startup is a race against time and runway. Every week spent on the wrong feature, the wrong architecture, or the wrong technology stack is a week closer to running out of money before finding product-market fit. Startups need development partners who understand that speed matters, but that reckless speed creates technical debt that kills companies at the scaling stage.\n\nAt A Major, we've worked with dozens of early-stage startups, and we know the pattern: build the smallest thing that tests your riskiest assumption, put it in front of real users, measure what happens, and iterate. Our MVP development process strips away nice-to-haves to focus on the core value proposition. We ship in weeks, not months, and we build on foundations (Next.js, Node.js, PostgreSQL) that won't need to be thrown away when you raise your Series A.\n\nWe also support non-technical founders with architecture decisions, technology selection, and the kind of technical due diligence that investors ask about. Whether you need a development team for three months or three years, we structure engagements that make sense for startup economics.",
    challenges: [
      {
        title: "Building too much before validating the idea",
        description:
          "Most failed startups built a product nobody wanted. The key risk isn't technical: it's building the wrong thing. MVPs must be scoped ruthlessly around the riskiest assumption.",
      },
      {
        title: "Technical debt from moving too fast",
        description:
          "Startups need speed, but shortcuts in authentication, data modeling, or architecture create compounding problems. The trick is knowing which corners are safe to cut.",
      },
      {
        title: "Scaling infrastructure after traction",
        description:
          "Getting featured on Product Hunt or TechCrunch can 10x your traffic overnight. If your infrastructure can't handle the spike, you lose the moment.",
      },
      {
        title: "Hiring engineers before product-market fit",
        description:
          "Full-time engineers are expensive and hard to manage without a CTO. Agency partnerships let you scale development up and down with your funding and traction.",
      },
    ],
    bestPractices: [
      {
        tip: "Define your MVP by the riskiest assumption, not a feature list",
        detail:
          "Ask: what's the one thing that must be true for this business to work? Build the smallest product that tests that assumption with real users.",
      },
      {
        tip: "Choose boring, proven technology",
        detail:
          "Startups fail because of market risk, not technology risk. React, Node.js, PostgreSQL, and Vercel will serve you from 0 to 10,000 users without exotic infrastructure.",
      },
      {
        tip: "Ship in weeks, iterate based on data",
        detail:
          "Your first version will be wrong. The goal is to be wrong quickly and cheaply, then iterate based on real user behavior: not stakeholder opinions.",
      },
      {
        tip: "Write tests for your core business logic",
        detail:
          "You don't need 100% test coverage at the MVP stage. But your payment flow, auth system, and core value proposition should be tested: these are the things that break trust.",
      },
    ],
    usefulLinks: [
      {
        title: "Y Combinator Startup Library",
        url: "https://www.ycombinator.com/library",
        type: "docs",
      },
      {
        title: "Lean Startup Methodology",
        url: "https://theleanstartup.com/principles",
        type: "docs",
      },
      {
        title: "Vercel Deployment Platform",
        url: "https://vercel.com/docs",
        type: "docs",
      },
      {
        title: "Stripe Atlas (Startup Toolkit)",
        url: "https://stripe.com/atlas",
        type: "tool",
      },
    ],
    faq: [
      {
        question: "How much does MVP development cost?",
        answer:
          "Most MVPs we build cost between $15,000–$50,000, depending on complexity. A simple SaaS dashboard or marketplace MVP sits at the lower end; products with real-time features, payment processing, or mobile apps sit higher. We scope ruthlessly to keep costs aligned with startup budgets.",
      },
      {
        question: "How long does it take to build an MVP?",
        answer:
          "Typically 6–12 weeks from kickoff to launch. Simple products (landing page + waitlist + core feature) can ship in 4–6 weeks. More complex MVPs with auth, payments, dashboards, and integrations take 8–12 weeks.",
      },
      {
        question: "Do you work for equity instead of cash?",
        answer:
          "We primarily work on cash engagements, but we occasionally take equity positions in startups we're especially excited about: usually as a hybrid (reduced rate + equity). We're transparent about when equity makes sense for both sides.",
      },
      {
        question: "Will the code be maintainable when we hire our own team?",
        answer:
          "Yes. We write clean, documented, well-tested code using mainstream technologies (React, Next.js, Node.js, PostgreSQL). We include README files, architecture decision records, and onboarding documentation specifically so your future engineers can hit the ground running.",
      },
    ],
  },

  // ─── COPYWRITING ───────────────────────────────────────────────
  {
    slug: "copywriting",
    name: "Copywriting",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Words that convert: landing pages, ads, and website copy that drive action",
    pricingNote:
      "Landing page copy from $800. Full website copy (5–8 pages) from $2,500. Ad copy packages (3 variants × 5 formats) from $600. Fixed-price quotes after a 20-min brief.",
    description:
      "We write high-converting copy for websites, landing pages, and ads: combining AI-assisted drafting with human editorial judgment. Every deliverable is brief-driven, on-brand, and optimized for your specific audience and goal.",
    accentColor: "amber",
    visualizationKey: "web-design",
    logo: null,
    lucideIcon: "PenLine",
    features: [
      {
        icon: "PenLine",
        title: "Landing page copy",
        description:
          "Hero headlines, subheads, benefit bullets, social proof sections, and CTAs structured around conversion best practices.",
      },
      {
        icon: "Globe",
        title: "Full website copy",
        description:
          "Home, About, Services, and Contact pages written with consistent voice, clear hierarchy, and SEO-friendly structure.",
      },
      {
        icon: "Megaphone",
        title: "Ad copy",
        description:
          "Google Search ads, Meta ad copy, and LinkedIn sponsored content: multiple variants per format for A/B testing.",
      },
      {
        icon: "Target",
        title: "Conversion-focused structure",
        description:
          "Every page is structured around a single goal: getting the reader to take the next step. We use proven frameworks (AIDA, PAS, jobs-to-be-done) adapted to your context.",
      },
      {
        icon: "Sparkles",
        title: "Brand voice alignment",
        description:
          "We build or follow your brand voice guide so every word sounds like you: not generic AI output.",
      },
      {
        icon: "Search",
        title: "SEO keyword integration",
        description:
          "Target keywords woven naturally into copy without sacrificing readability or tone.",
      },
    ],
    subTechs: [],
    overview:
      "Great copy is the difference between a visitor who leaves in 3 seconds and one who books a call. We apply AI-assisted drafting to produce high-quality first drafts fast, then layer on human editorial judgment to ensure every word earns its place. Our copywriters understand both marketing psychology and SEO, so your pages rank and convert.",
    challenges: [
      {
        title: "Generic AI output",
        description:
          "AI-generated copy often sounds flat and interchangeable. We fix this by combining AI speed with editorial review, brand voice guidelines, and real customer language from interviews and reviews.",
      },
      {
        title: "Missing the brief",
        description:
          "Copy that doesn't reflect the actual customer pain points or unique positioning fails to convert. We start every project with a structured brief to capture audience, objections, and differentiators.",
      },
      {
        title: "Copy-design mismatch",
        description:
          "Copy written in isolation rarely fits the actual layout. We write with layout in mind: specifying word counts, headline hierarchies, and CTA placement from the start.",
      },
    ],
    bestPractices: [
      {
        tip: "Start with the brief",
        detail:
          "Before writing a word, we document target audience, key pain points, unique differentiators, tone of voice, and the one thing we want readers to do. Everything else flows from this.",
      },
      {
        tip: "Write for one reader",
        detail:
          "The best copy speaks directly to a single person, not a demographic. We keep a specific customer persona in mind throughout every draft.",
      },
      {
        tip: "Test headlines first",
        detail:
          "80% of readers never get past the headline. We spend disproportionate time on headline options and recommend testing at least 3 variants.",
      },
      {
        tip: "Edit ruthlessly",
        detail:
          "We cut every word that doesn't carry its weight. Shorter, tighter copy consistently outperforms longer copy for most digital contexts.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do you write copy in languages other than English?",
        answer:
          "Currently we write primarily in English. We can produce Mandarin and Malay copy for Singapore-market clients on request: contact us to discuss.",
      },
      {
        question: "How do you handle brand voice for a new company?",
        answer:
          "We run a short brand voice workshop as part of the brief: covering tone, vocabulary dos and don'ts, and example comparators. We then produce a one-page voice guide and apply it consistently across all deliverables.",
      },
      {
        question: "How many revision rounds are included?",
        answer:
          "Two rounds of revisions are included in every package. Additional rounds are billed at our hourly rate. In practice, most projects complete in one or two rounds when the brief is thorough.",
      },
      {
        question: "Can you write copy for technical products?",
        answer:
          "Yes. This is a core strength. Our team has engineering backgrounds, so we translate complex technical products into clear, benefit-driven language without dumbing things down.",
      },
    ],
  },

  // ─── CONTENT WRITING ───────────────────────────────────────────
  {
    slug: "content-writing",
    name: "Content Writing",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "SEO articles, blog posts, and thought leadership that build organic traffic",
    pricingNote:
      "Individual articles from $300 (1,500 words). Monthly content retainers (4–8 articles/month) from $1,200/month. Topic research and content strategy included.",
    description:
      "We produce long-form content that ranks: blog posts, SEO articles, and thought leadership pieces researched, written, and optimised for search. AI handles first drafts and keyword integration; human editors ensure accuracy, depth, and genuine insight.",
    accentColor: "green",
    visualizationKey: "content-writing",
    logo: null,
    lucideIcon: "FileText",
    features: [
      {
        icon: "FileText",
        title: "Long-form SEO articles",
        description:
          "1,000–3,000 word articles built around target keywords, search intent, and topical authority: optimised for Google's helpful content standards.",
      },
      {
        icon: "TrendingUp",
        title: "Keyword and topic research",
        description:
          "We identify low-competition, high-intent keywords your audience is actually searching for, then build a content calendar around them.",
      },
      {
        icon: "BookOpen",
        title: "Thought leadership",
        description:
          "Bylined articles, LinkedIn posts, and industry commentary that position your founders and team as credible voices in your space.",
      },
      {
        icon: "Link",
        title: "Internal linking strategy",
        description:
          "Every article is linked into your existing content structure to pass authority and reduce orphan pages.",
      },
      {
        icon: "RefreshCw",
        title: "Content refresh and optimisation",
        description:
          "We audit and update existing articles that have dropped in rankings: often faster ROI than writing new content from scratch.",
      },
      {
        icon: "BarChart",
        title: "Performance tracking",
        description:
          "Monthly reports on organic impressions, clicks, and ranking movements for all published content.",
      },
    ],
    subTechs: [],
    overview:
      "Content is the compounding asset of digital marketing: every article you publish continues driving traffic for years. We combine AI-assisted research and drafting with human editorial oversight to produce content that genuinely helps readers and ranks well. Our process starts with keyword research, flows through structured briefs, and ends with publish-ready copy that aligns with Google's quality guidelines.",
    challenges: [
      {
        title: "Thin content that doesn't rank",
        description:
          "Short, generic articles rarely rank in competitive niches. We write comprehensive, well-researched pieces that cover topics more thoroughly than the current top results.",
      },
      {
        title: "Content that doesn't convert",
        description:
          "Traffic without conversion is vanity. We include contextual CTAs, lead magnets, and related content links to move readers further down the funnel.",
      },
      {
        title: "Inconsistent publishing cadence",
        description:
          "One-off articles rarely build authority. Consistent monthly publishing is what compounds into measurable organic growth: our retainer model makes this sustainable.",
      },
    ],
    bestPractices: [
      {
        tip: "Match search intent first",
        detail:
          "Every article starts with understanding what the searcher actually wants: informational, navigational, or transactional, and matching the content format accordingly.",
      },
      {
        tip: "Cover the topic comprehensively",
        detail:
          "We aim to be the last article a reader needs to read on a topic: covering sub-questions, edge cases, and related concepts that competitors miss.",
      },
      {
        tip: "Use real examples and data",
        detail:
          "Generic advice ranks poorly and converts poorly. We anchor every article in concrete examples, case studies, and up-to-date statistics.",
      },
      {
        tip: "Optimise the title and meta description",
        detail:
          "Click-through rate from search results is a ranking factor. We write titles and meta descriptions that earn the click as well as the ranking.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do you handle publishing, or just writing?",
        answer:
          "We handle both. For clients on CMS platforms like WordPress, Webflow, or Notion, we can publish directly and handle all formatting, image alt text, and meta tags.",
      },
      {
        question: "How long before we see organic traffic results?",
        answer:
          "SEO content typically takes 3–6 months to rank meaningfully in competitive niches. Lower-competition topics and featured snippets can appear in 4–8 weeks. We set realistic expectations during onboarding and track progress monthly.",
      },
      {
        question: "Can you write about highly technical topics?",
        answer:
          "Yes. Our team includes engineers who can write accurately about software, infrastructure, APIs, and developer tooling without needing extensive hand-holding.",
      },
      {
        question: "What if we already have content that isn't performing?",
        answer:
          "We offer content audits as a standalone service. We review your existing articles, identify which ones have ranking potential, and produce an update plan: often this outperforms creating new content from scratch.",
      },
    ],
  },

  // ─── EMAIL MARKETING ───────────────────────────────────────────
  {
    slug: "email-marketing",
    name: "Email Marketing",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Drip sequences, newsletters, and onboarding flows that retain and convert",
    pricingNote:
      "Welcome/onboarding sequence (5–7 emails) from $1,200. Monthly newsletter production from $600/month. Full lifecycle email strategy and build from $3,500.",
    description:
      "We design and write email sequences that nurture leads, onboard users, and retain customers: from single welcome emails to multi-stage drip campaigns. AI accelerates copy production; human strategy ensures the right message reaches the right person at the right time.",
    accentColor: "blue",
    visualizationKey: "email-marketing",
    logo: null,
    lucideIcon: "Mail",
    features: [
      {
        icon: "Mail",
        title: "Welcome and onboarding sequences",
        description:
          "First-impression email flows that introduce your product, guide new users to their first win, and reduce early churn.",
      },
      {
        icon: "RefreshCw",
        title: "Drip nurture campaigns",
        description:
          "Multi-email sequences that educate leads over days or weeks, building trust before asking for the sale.",
      },
      {
        icon: "BookOpen",
        title: "Newsletters",
        description:
          "Regular newsletters that keep your audience engaged: curated content, company updates, or thought leadership, produced and scheduled monthly.",
      },
      {
        icon: "Bell",
        title: "Re-engagement campaigns",
        description:
          "Win-back sequences for inactive subscribers, with subject line testing and sunset flows for unresponsive contacts.",
      },
      {
        icon: "BarChart",
        title: "Performance analytics",
        description:
          "Open rate, click rate, and conversion tracking for every campaign, with monthly reporting and optimisation recommendations.",
      },
      {
        icon: "Target",
        title: "Segmentation strategy",
        description:
          "Audience segmentation by behaviour, signup source, or engagement level so each subscriber gets relevant content.",
      },
    ],
    subTechs: [],
    overview:
      "Email remains the highest-ROI digital marketing channel: averaging $36 return per $1 spent. But most email programs underperform because they treat all subscribers the same, send too infrequently or too often, and write copy that reads like bulk mail. We build email programs around your specific customer journey, with sequences timed and personalised to drive measurable action.",
    challenges: [
      {
        title: "Low open rates",
        description:
          "Most emails compete in crowded inboxes. We improve open rates through subject line testing, sender name optimisation, and send-time experimentation.",
      },
      {
        title: "One-size-fits-all messaging",
        description:
          "Blasting the same email to your entire list suppresses engagement and drives unsubscribes. Segmentation and conditional logic personalise the experience at scale.",
      },
      {
        title: "No lifecycle strategy",
        description:
          "Sending ad-hoc newsletters without a connected nurture sequence means leaving conversion opportunities on the table. We map the full customer journey before writing a single email.",
      },
    ],
    bestPractices: [
      {
        tip: "Write one email, one goal",
        detail:
          "Each email in a sequence has exactly one job. Multiple CTAs and mixed messages dilute action. We enforce this discipline across every campaign we write.",
      },
      {
        tip: "Optimise for mobile first",
        detail:
          "Over 60% of emails are opened on mobile. Short subject lines, single-column layouts, and large tap targets are non-negotiable.",
      },
      {
        tip: "Test subject lines systematically",
        detail:
          "Subject lines determine open rates. We A/B test at least 2 subject line variants for every campaign and document learnings for future sends.",
      },
      {
        tip: "Honour unsubscribes immediately",
        detail:
          "Every sequence we build includes proper unsubscribe handling and list hygiene: protecting your sender reputation and staying compliant with CAN-SPAM and GDPR.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Which email platforms do you work with?",
        answer:
          "We work with Mailchimp, Klaviyo, ConvertKit (Kit), ActiveCampaign, Loops, and Resend. If you have a platform preference, we'll work within it. If you're starting fresh, we'll recommend the right tool for your scale and needs.",
      },
      {
        question: "Do you handle list building as well?",
        answer:
          "We can design lead magnet landing pages and signup forms, but we don't run paid acquisition campaigns. We focus on converting and retaining the subscribers you already have or acquire organically.",
      },
      {
        question: "How do you handle GDPR and CAN-SPAM compliance?",
        answer:
          "Every sequence we build includes proper consent collection, unsubscribe links, physical address footers, and list management practices that comply with GDPR, CAN-SPAM, and Singapore's PDPA.",
      },
      {
        question: "Can you take over an existing email program?",
        answer:
          "Yes. We start with an audit of your current sequences, open rates, and list health, then produce a prioritised improvement plan before writing new content.",
      },
    ],
  },

  // ─── TECHNICAL DOCUMENTATION ───────────────────────────────────
  {
    slug: "technical-documentation",
    name: "Technical Documentation",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "API docs, developer guides, and user documentation written by engineers",
    pricingNote:
      "API reference documentation from $1,500. Full developer docs site (setup, guides, API reference) from $4,000. Ongoing docs maintenance retainers from $800/month.",
    description:
      "We write technical documentation that developers actually use: API references, integration guides, README files, and user manuals. Our writers have engineering backgrounds, so we understand the code and write docs that are accurate, complete, and scannable.",
    accentColor: "slate",
    visualizationKey: "technical-documentation",
    logo: null,
    lucideIcon: "BookOpen",
    features: [
      {
        icon: "Code",
        title: "API reference documentation",
        description:
          "Endpoint references with request/response examples, authentication guides, error code tables, and SDK quickstarts.",
      },
      {
        icon: "BookOpen",
        title: "Developer guides and tutorials",
        description:
          "Step-by-step integration guides, getting-started tutorials, and conceptual explainers that reduce time-to-first-success.",
      },
      {
        icon: "FileText",
        title: "README and repository docs",
        description:
          "Project READMEs, CONTRIBUTING guides, architecture decision records (ADRs), and inline code documentation.",
      },
      {
        icon: "Users",
        title: "End-user documentation",
        description:
          "User manuals, help centre articles, and onboarding guides written for non-technical audiences.",
      },
      {
        icon: "Search",
        title: "Docs site setup",
        description:
          "We set up and configure documentation sites using Mintlify, Docusaurus, or GitBook: with search, versioning, and custom styling.",
      },
      {
        icon: "RefreshCw",
        title: "Docs maintenance retainers",
        description:
          "Ongoing monthly retainers to keep docs in sync with product changes, so your documentation doesn't become a liability.",
      },
    ],
    subTechs: [],
    overview:
      "Bad documentation is a silent revenue killer: it increases support volume, slows integrations, and erodes developer trust. Good documentation is a product in itself. We treat docs as first-class deliverables: structured around what developers actually need to know, written with precision, and maintained as the product evolves. AI accelerates first-draft production; our engineering background ensures accuracy.",
    challenges: [
      {
        title: "Documentation drift",
        description:
          "Docs written at launch quickly fall out of sync with the actual product. We build documentation alongside development and offer maintenance retainers to prevent drift.",
      },
      {
        title: "Missing the developer mental model",
        description:
          "Docs written by non-technical writers often miss what developers actually need to know first. Our engineering background means we structure docs around real developer workflows.",
      },
      {
        title: "No discoverability",
        description:
          "Even great docs fail if developers can't find what they need. We design information architecture and search indexing so the right answer surfaces in under 30 seconds.",
      },
    ],
    bestPractices: [
      {
        tip: "Separate reference from guide",
        detail:
          "API reference and conceptual guides serve different needs. We structure documentation into four types: tutorials, how-to guides, reference, and explanation: following the Diátaxis framework.",
      },
      {
        tip: "Show, don't just tell",
        detail:
          "Every guide includes working code examples, not just descriptions. Examples are tested and copy-pasteable.",
      },
      {
        tip: "Write for the first five minutes",
        detail:
          "The getting-started experience determines whether a developer persists. We obsess over the first five minutes: from signup to first successful API call.",
      },
      {
        tip: "Version and changelog everything",
        detail:
          "Developers need to know what changed between versions. We maintain changelogs and version docs so migration paths are always clear.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do you need access to our codebase to write docs?",
        answer:
          "For API reference docs, yes: we review the actual code or OpenAPI spec to ensure accuracy. For user-facing docs, we work from product walkthroughs, existing materials, and interviews with your team.",
      },
      {
        question: "What documentation platforms do you use?",
        answer:
          "We work with Mintlify, Docusaurus, GitBook, Notion, and Confluence. We can also write docs in plain Markdown for any platform. We'll recommend the right tool based on your audience and existing stack.",
      },
      {
        question: "Can you document a legacy system with poor existing docs?",
        answer:
          "Yes. This is common. We start with a discovery phase: reading existing code, interviewing your engineers, and auditing what exists. From there we produce a docs inventory and a prioritised writing plan.",
      },
      {
        question: "Do you offer docs translation?",
        answer:
          "We currently write in English. For Singapore-market clients, we can produce key sections in Mandarin on request. Full multi-language docs are outside our current scope.",
      },
    ],
  },

  // ─── WORKFLOW AUTOMATION ───────────────────────────────────────
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline:
      "Automate repetitive operations with n8n, Make, and custom integrations",
    pricingNote:
      "Single automation workflow from $500. Multi-step automation suite from $2,000. Monthly automation retainer (build + maintain) from $1,500/month.",
    description:
      "We design and build workflow automations that eliminate manual, repetitive work: connecting your tools, triggering actions on events, and routing data without human intervention. From simple Zapier-style triggers to complex multi-step pipelines with conditional logic and error handling.",
    accentColor: "orange",
    visualizationKey: "workflow-automation",
    logo: null,
    lucideIcon: "Workflow",
    features: [
      {
        icon: "Workflow",
        title: "Multi-step workflow design",
        description:
          "End-to-end automation blueprints that map triggers, conditions, actions, and error paths before a single node is built.",
      },
      {
        icon: "Zap",
        title: "n8n and Make build",
        description:
          "We build and host automation workflows in n8n (self-hosted or cloud) and Make: covering API calls, webhooks, data transforms, and conditional branching.",
      },
      {
        icon: "Link",
        title: "SaaS integrations",
        description:
          "Connect CRMs, project management tools, communication platforms, databases, and custom APIs: HubSpot, Notion, Slack, Airtable, Google Workspace, and more.",
      },
      {
        icon: "Code",
        title: "Custom API connectors",
        description:
          "For tools without native integrations, we write custom HTTP nodes and scripts that connect any REST or GraphQL API.",
      },
      {
        icon: "Shield",
        title: "Error handling and alerting",
        description:
          "Production automations include retry logic, error branches, and Slack/email alerts so you know immediately when something breaks.",
      },
      {
        icon: "BarChart",
        title: "Monitoring and maintenance",
        description:
          "Monthly review of automation performance, failure rates, and volume: plus proactive updates when connected APIs change.",
      },
    ],
    subTechs: [],
    overview:
      "Most growing businesses have the same problem: their tools don't talk to each other, so people fill the gaps manually: copying data between spreadsheets, sending handoff messages, triggering reports by hand. We eliminate that overhead by building reliable, documented automations that run in the background. Our approach starts with process mapping before touching any tool, so we build the right automation, not just a fast one.",
    challenges: [
      {
        title: "Brittle point-to-point integrations",
        description:
          "Automations built without error handling break silently and cause data loss. We build every workflow with explicit error paths, retries, and failure alerts.",
      },
      {
        title: "Automating the wrong process",
        description:
          "Automating a broken process makes it break faster. We audit the underlying process before automating: sometimes the best ROI is simplifying first, then automating.",
      },
      {
        title: "Vendor lock-in",
        description:
          "Zapier and Make can become expensive at scale. We evaluate build vs. buy for each workflow and default to self-hosted n8n where volume makes it cost-effective.",
      },
    ],
    bestPractices: [
      {
        tip: "Map the process before the tool",
        detail:
          "Every automation starts with a process flowchart documenting every trigger, decision point, action, and exception: before opening n8n or Make.",
      },
      {
        tip: "Build idempotent workflows",
        detail:
          "Workflows should produce the same result whether they run once or ten times for the same event. We design for idempotency to prevent duplicate data and ghost actions.",
      },
      {
        tip: "Log everything",
        detail:
          "Every workflow writes execution logs to a central store. When something goes wrong, we need a complete audit trail: not just the last error message.",
      },
      {
        tip: "Document for handover",
        detail:
          "Every automation we build includes a one-page runbook: what it does, what it connects, how to pause it, and how to debug common failures.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Which tools can you connect?",
        answer:
          "Any tool with an API or webhook. Common integrations include HubSpot, Salesforce, Notion, Airtable, Google Workspace, Slack, Stripe, Xero, and custom internal systems. If it has an API, we can connect it.",
      },
      {
        question: "Do you self-host n8n or use cloud?",
        answer:
          "We recommend self-hosted n8n on a $10/month VPS for clients who need cost control at volume. For simpler needs or quick starts, n8n Cloud or Make work well. We advise based on your expected automation volume and IT preferences.",
      },
      {
        question: "What happens when a connected API changes?",
        answer:
          "API changes break automations silently if you're not monitoring. Our maintenance retainer includes proactive monitoring, API version tracking, and same-week fixes for breaking changes.",
      },
      {
        question: "Can you automate processes that involve PDFs or documents?",
        answer:
          "Yes. We can extract data from PDFs, generate documents from templates, and route them through approval workflows: combining automation platforms with AI document processing where needed.",
      },
    ],
  },

  // ─── AI CHATBOT ────────────────────────────────────────────────
  {
    slug: "ai-chatbot",
    name: "AI Chatbot",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline:
      "Custom AI assistants for customer support, lead qualification, and knowledge retrieval",
    pricingNote:
      "Basic FAQ chatbot from $1,500. Full RAG-powered knowledge assistant from $4,000. Ongoing hosting and improvement retainers from $500/month.",
    description:
      "We build custom AI chatbots trained on your own content , product docs, FAQs, policies, and knowledge bases , that answer customer questions accurately, qualify leads, and reduce support volume. Built on proven RAG (Retrieval-Augmented Generation) architecture using Claude or GPT.",
    accentColor: "purple",
    visualizationKey: "ai-chatbot",
    logo: null,
    lucideIcon: "Bot",
    features: [
      {
        icon: "Bot",
        title: "RAG knowledge assistants",
        description:
          "Chatbots that retrieve answers from your own documents, FAQs, and knowledge base: not hallucinated from general training data.",
      },
      {
        icon: "MessageSquare",
        title: "Website chat widget",
        description:
          "Embeddable chat widget for your website: branded to match your design, with escalation to human support when needed.",
      },
      {
        icon: "Target",
        title: "Lead qualification bots",
        description:
          "Conversational flows that qualify inbound leads, collect contact details, and route hot prospects to your sales team.",
      },
      {
        icon: "Database",
        title: "Knowledge base ingestion",
        description:
          "We ingest your existing documentation , PDFs, Notion pages, Confluence docs, web pages , into a vector database for retrieval.",
      },
      {
        icon: "Shield",
        title: "Guardrails and tone control",
        description:
          "System prompts, topic boundaries, and escalation logic that keep the bot on-brand and prevent off-topic or harmful responses.",
      },
      {
        icon: "BarChart",
        title: "Analytics and improvement",
        description:
          "Every conversation is logged. We review low-confidence answers monthly and expand the knowledge base to close gaps.",
      },
    ],
    subTechs: [],
    overview:
      "AI chatbots built on your own content are a force multiplier for lean teams: they handle repetitive questions instantly, 24/7, at negligible marginal cost. Unlike generic chatbots that frustrate users with irrelevant answers, RAG-powered assistants retrieve answers directly from your documentation, ensuring accuracy and on-brand tone. We build, deploy, and maintain these systems so your team focuses on higher-value work.",
    challenges: [
      {
        title: "Hallucination and inaccuracy",
        description:
          "General-purpose LLMs make things up. RAG architecture grounds every response in your actual content, if the answer isn't in your knowledge base, the bot says so rather than fabricating.",
      },
      {
        title: "Off-brand responses",
        description:
          "Chatbots without guardrails wander into off-topic territory. We build explicit topic boundaries, persona prompts, and fallback responses that keep the bot on-mission.",
      },
      {
        title: "Knowledge base going stale",
        description:
          "A chatbot is only as good as its knowledge base. We build ingestion pipelines that automatically re-sync with your documentation when it changes.",
      },
    ],
    bestPractices: [
      {
        tip: "Ground responses in your content",
        detail:
          "Every answer should cite a source from your knowledge base. This prevents hallucination and builds user trust: they can verify the answer themselves.",
      },
      {
        tip: "Design graceful escalation",
        detail:
          "When the bot can't answer confidently, it should hand off to a human immediately: not loop, apologise repeatedly, or give a low-confidence answer. We build explicit escalation paths.",
      },
      {
        tip: "Start narrow, expand deliberately",
        detail:
          "The best chatbots do one thing extremely well before expanding scope. We recommend starting with your top 20 most common support questions and proving value before broadening.",
      },
      {
        tip: "Review conversations regularly",
        detail:
          "Conversation logs are the most valuable feedback loop. We review low-confidence and escalated conversations monthly to identify knowledge gaps and improve the system.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Which AI models do you use?",
        answer:
          "We build on Claude (Anthropic) and GPT-4 (OpenAI) depending on use case and budget. For most customer-facing chatbots, Claude Haiku or GPT-4o-mini provide excellent quality at low cost. We recommend the right model after scoping.",
      },
      {
        question: "Can the chatbot integrate with our CRM or helpdesk?",
        answer:
          "Yes. We connect chatbot conversations to HubSpot, Intercom, Zendesk, and other CRMs: creating contacts, logging conversations, and triggering support tickets automatically.",
      },
      {
        question: "How do you keep the knowledge base up to date?",
        answer:
          "We build automated ingestion pipelines that re-sync with your source documents on a schedule or on push. For Notion and Confluence, we connect directly to their APIs. For static files, we set up a simple upload workflow.",
      },
      {
        question: "Is the chatbot data private?",
        answer:
          "Yes. We architect chatbots so your knowledge base and conversation logs stay within your own infrastructure or a private cloud account: not shared with third-party AI training datasets. We use Anthropic and OpenAI APIs with data processing agreements in place.",
      },
    ],
  },

  // ─── BRAND MESSAGING ───────────────────────────────────────────
  /* HIDDEN
  {
    slug: "brand-messaging",
    name: "Brand Messaging",
    category: "offering",
    pageType: "offering",
    targetAudience: "both",
    tagline: "Positioning, messaging frameworks, and brand voice that make you distinct",
    pricingNote:
      "Brand messaging sprint (positioning + voice guide + messaging framework) from $2,500. Includes 2 rounds of refinement and a final brand messaging document.",
    description:
      "We help early-stage companies and growing teams define what they stand for, who they're for, and how to talk about it. The output is a practical brand messaging framework , positioning statement, value proposition, tone of voice guide, and key message pillars , that keeps all your copy consistent.",
    accentColor: "rose",
    visualizationKey: "web-design",
    logo: null,
    lucideIcon: "Sparkles",
    features: [
      {
        icon: "Target",
        title: "Positioning statement",
        description:
          "A single, clear statement of who you serve, what you do, and why you're different: the foundation everything else is built on.",
      },
      {
        icon: "Sparkles",
        title: "Brand voice guide",
        description:
          "Tone, vocabulary, sentence style, and dos/don'ts: a practical guide any writer can apply consistently.",
      },
      {
        icon: "Layers",
        title: "Message pillar framework",
        description:
          "Three to five core message pillars with supporting proof points: the building blocks of all your marketing and sales content.",
      },
      {
        icon: "Users",
        title: "Audience and persona definition",
        description:
          "Primary and secondary audience profiles with jobs-to-be-done, pain points, objections, and language patterns.",
      },
      {
        icon: "FileText",
        title: "Tagline and boilerplate variants",
        description:
          "Short, medium, and long company descriptions for different contexts: website about, LinkedIn summary, pitch deck, press release.",
      },
      {
        icon: "PenLine",
        title: "Applied copy examples",
        description:
          "We apply the framework to real copy: homepage headline, email subject line, LinkedIn post, so you see exactly how it works in practice.",
      },
    ],
    subTechs: [],
    overview:
      "Most early-stage companies describe what they do, not why it matters to a specific person. The result is generic copy that could belong to any competitor. Brand messaging work fixes this at the source: by articulating a clear, differentiated position before a word of copy is written. The output is a reusable framework that makes every future piece of content faster to write and more effective.",
    challenges: [
      {
        title: "Sounding like everyone else",
        description:
          "Generic B2B SaaS language ('streamline your workflow', 'all-in-one platform') is invisible to buyers. We build positioning that highlights genuine differentiation, not category-speak.",
      },
      {
        title: "Inconsistent voice across channels",
        description:
          "When different team members write copy without a shared voice guide, the brand sounds fragmented. A single reference document solves this: without requiring a style police.",
      },
      {
        title: "Messaging that doesn't match buyer language",
        description:
          "Internal company language rarely matches how customers describe their problems. We anchor messaging in actual customer language, gathered through interviews or review mining.",
      },
    ],
    bestPractices: [
      {
        tip: "Position against a category, not a competitor",
        detail:           "The best positioning defines a category you can own: not a feature comparison against an incumbent. We help you find the frame where you win.",
      },
      {
        tip: "Write for the sceptic",
        detail:           "Assume every reader is scanning for reasons to dismiss you. Every claim needs a proof point; every benefit needs a specificity that prevents eye-rolling.",
      },
      {
        tip: "Test messaging with real customers",
        detail:           "The best messaging is discovered, not invented. We recommend at least 3 customer interviews before finalising your positioning, even short 20-minute calls reveal language gold.",
      },
      {
        tip: "Keep the voice guide short",
        detail:           "A 50-page brand bible is never used. We produce a one-page voice guide and a two-page messaging framework: short enough to actually read, specific enough to actually help.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do we need to have an existing brand to work with you?",
        answer:
          "No. We work with pre-launch companies defining their message for the first time, as well as established companies repositioning after a pivot or product expansion.",
      },
      {
        question: "How does this differ from a full brand identity project?",
        answer:
          "Brand messaging focuses on words: positioning, voice, and message architecture. It doesn't include visual identity (logo, colours, typography). We recommend completing messaging before visual identity so design reflects strategy, not the other way around.",
      },
      {
        question: "Will this replace our marketing agency or copywriter?",
        answer:
          "No. It makes them more effective. The messaging framework becomes the brief for every copywriter, designer, and agency you work with. It reduces revision cycles and ensures everyone is working from the same foundation.",
      },
      {
        question: "How long does the brand messaging sprint take?",
        answer:
          "Typically 2–3 weeks from kickoff to final deliverable. We run a 90-minute discovery workshop, produce a draft framework, and iterate through two rounds of feedback before finalising.",
      },
    ],
  },
  HIDDEN */

  // ─── PITCH DECKS ───────────────────────────────────────────────
  /* HIDDEN
  {
    slug: "pitch-decks",
    name: "Pitch Decks",
    category: "offering",
    pageType: "offering",
    targetAudience: "businesses",
    tagline: "Investor decks and sales presentations that communicate clearly and convert",
    pricingNote:
      "Investor pitch deck (10–15 slides, copy + design) from $2,500. Sales presentation deck from $1,800. Narrative and copy only (no design) from $1,200.",
    description:
      "We produce investor-ready pitch decks and sales presentations: handling both narrative structure and visual design. Our decks are built on clear investment thesis or sales logic first, then translated into slides that communicate the essentials without clutter.",
    accentColor: "indigo",
    visualizationKey: "consultancy",
    logo: null,
    lucideIcon: "Presentation",
    features: [
      {
        icon: "Presentation",
        title: "Investor pitch decks",
        description:
          "Seed, Series A, and growth-stage decks covering problem, solution, market, traction, team, and ask: structured for how investors actually evaluate deals.",
      },
      {
        icon: "Target",
        title: "Sales and partnership decks",
        description:
          "Sales presentations and partner decks that focus on ROI, proof points, and next steps: built for B2B sales cycles.",
      },
      {
        icon: "FileText",
        title: "Narrative development",
        description:
          "We structure the story before touching slides: defining the core thesis, the arc of the narrative, and the proof points at each stage.",
      },
      {
        icon: "Palette",
        title: "Slide design",
        description:
          "Clean, professional slide design in Figma or PowerPoint: on-brand, data-visualised, and free of the 'consultant deck' aesthetic.",
      },
      {
        icon: "BarChart",
        title: "Data visualisation",
        description:
          "Charts, graphs, and infographics that communicate traction, market size, and metrics clearly: without chartjunk.",
      },
      {
        icon: "RefreshCw",
        title: "Revision and iteration support",
        description:
          "We support you through investor feedback loops: quickly iterating the deck as you learn what questions arise in meetings.",
      },
    ],
    subTechs: [],
    overview:
      "A pitch deck has one job: get you to the next meeting. Most decks fail because they lead with features instead of the investment thesis, cram too much onto each slide, or bury the traction that investors care about most. We structure decks around what a specific audience needs to believe to say yes: then design slides that communicate that belief as efficiently as possible.",
    challenges: [
      {
        title: "Too much information per slide",
        description:
          "Slides are not documents. Each slide should communicate one idea. We enforce this discipline ruthlessly: cutting slides down to their essential message and moving supporting detail to an appendix.",
      },
      {
        title: "Narrative that starts in the wrong place",
        description:
          "Most founders open with the solution before establishing the problem is real and large. We structure the narrative to build the case before presenting the answer.",
      },
      {
        title: "Traction buried at the back",
        description:
          "Investors want to see traction early. We surface the most compelling evidence of momentum in the first third of the deck: not slide 12.",
      },
    ],
    bestPractices: [
      {
        tip: "One idea per slide",
        detail:           "If you can't summarise a slide in one sentence, it contains too many ideas. We write a one-sentence title for every slide that stands alone as the key takeaway.",
      },
      {
        tip: "Lead with the ask",
        detail:           "Investors who know upfront what you're raising and at what stage pay closer attention. We put the ask on slide 2 , after the hook , not at the end.",
      },
      {
        tip: "Show don't tell on traction",
        detail:           "Numbers beat adjectives. 'Strong growth' means nothing; '$180k ARR, 23% MoM for 6 months' is a signal. We replace all qualitative traction language with specific metrics.",
      },
      {
        tip: "Build a separate appendix",
        detail:           "Every slide cut from the main deck lives in an appendix. Investors who ask deeper questions get detailed answers: without cluttering the main narrative.",
      },
    ],
    usefulLinks: [],
    faq: [
      {
        question: "Do you work with pre-revenue startups?",
        answer:
          "Yes. Pre-revenue decks lean heavier on problem validation, market size, team credibility, and vision. We know how to tell a compelling story at each stage of the fundraising journey.",
      },
      {
        question: "What format do you deliver in?",
        answer:
          "We deliver in your preferred format: PowerPoint, Google Slides, or Figma. For investor decks, we also produce a PDF version optimised for email attachment.",
      },
      {
        question: "Can you update an existing deck rather than starting from scratch?",
        answer:
          "Yes. We offer a deck audit (reviewing narrative structure and design) and a deck refresh (updating content and visual design). Starting from scratch is only recommended when the narrative needs significant restructuring.",
      },
      {
        question: "Do you have experience with Singapore and Southeast Asia investors?",
        answer:
          "Yes. We have context on the local VC landscape: including what SGInnovate, Antler, and regional seed funds look for, and adapt decks accordingly for Singapore-market raises.",
      },
    ],
  },
  HIDDEN */
];

export const offeringsConfig = _allOfferings.filter(
  (o) => !HIDDEN_OFFERINGS.has(o.slug)
);

export function getOfferingBySlug(slug: string): OfferingConfig | undefined {
  return offeringsConfig.find((s) => s.slug === slug);
}
