const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://amajor.ai/#organization",
  name: "A Major",
  url: "https://amajor.ai",
  logo: "https://amajor.ai/logos/amajor-submark.svg",
  sameAs: ["https://x.com/amajorai", "https://www.linkedin.com/company/amajor"],
  description:
    "A Major is a Singapore-based software agency specialising in web design, software development, and digital solutions for businesses.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://amajor.ai/contact",
    areaServed: ["SG", "Worldwide"],
    availableLanguage: "English",
  },
  knowsAbout: [
    "Web Design",
    "Custom Software Development",
    "SaaS Development",
    "Mobile App Development",
    "E-commerce Development",
    "Enterprise Software",
    "Engineering Consultancy",
    "AI Agents",
    "React",
    "Next.js",
    "Node.js",
    "Model Context Protocol (MCP)",
    "MCP Server Development",
    "AI Agent Infrastructure",
    "LLM Integration",
    "Agent Orchestration",
    "Ryu AI Orchestration",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design",
          url: "https://amajor.ai/services/web-design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Apps",
          url: "https://amajor.ai/services/web-apps",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Apps",
          url: "https://amajor.ai/services/mobile-apps",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS Products",
          url: "https://amajor.ai/services/saas-products",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enterprise Systems",
          url: "https://amajor.ai/services/enterprise-systems",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MCP Server Development",
          url: "https://amajor.ai/services/api-development",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "A Major",
  url: "https://amajor.ai",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://amajor.ai/services?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", ".services-summary"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: {
    "@type": "Organization",
    name: "A Major",
  },
  description:
    "Web design, software development, and digital solutions for businesses. From discovery through to launch.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "A Major",
  image: "https://amajor.ai/og/index.png",
  url: "https://amajor.ai",
  description:
    "Singapore software agency offering web design, custom software development, SaaS, mobile apps, e-commerce, and engineering consultancy.",
  priceRange: "$$$",
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressRegion: "Singapore",
    addressCountry: "SG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "1.3521",
    longitude: "103.8198",
  },
  sameAs: [
    "https://x.com/amajorai",
    "https://www.linkedin.com/company/amajor",
    "https://www.threads.net/@amajorai",
    "https://instagram.com/amajorai",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does A Major offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Major offers web design, web app development, mobile app development (React Native, Swift, Flutter), SaaS product development, enterprise systems, UI/UX design, DevOps, performance optimization, MCP server development, AI agent infrastructure, MVP scoping, digital transformation, and engineering consultancy.",
      },
    },
    {
      "@type": "Question",
      name: "Where is A Major based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Major is based in Singapore and works with clients worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While headquartered in Singapore, A Major works with founders and businesses across Southeast Asia, Europe, and North America.",
      },
    },
    {
      "@type": "Question",
      name: "What is Ryu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ryu is end-to-end managed infrastructure for AI agents, built by A Major. Pick your engine — Hermes, OpenClaw, ZeroClaw, or any compatible agent — and Ryu handles security, model routing, memory, tools, workflows, and deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build MCP servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A Major builds Model Context Protocol (MCP) servers that connect AI agents to databases, APIs, and internal tools, enabling reliable LLM-powered workflows in production environments.",
      },
    },
  ],
};

const ryuSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ryu",
  applicationCategory: "DeveloperApplication",
  description:
    "Ryu is end-to-end managed infrastructure for AI agents. Pick your engine — Hermes, OpenClaw, ZeroClaw, or any compatible agent — and Ryu handles security, model routing, memory, tools, workflows, and deployment.",
  url: "https://amajor.ai/products",
  operatingSystem: "Web",
  author: {
    "@type": "Organization",
    name: "A Major",
    url: "https://amajor.ai",
  },
};

export default function StructuredData() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ryuSchema) }}
        type="application/ld+json"
      />
    </>
  );
}
