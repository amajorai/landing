const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://amajor.ai/#organization",
  name: "A Major",
  url: "https://amajor.ai",
  logo: "https://amajor.ai/logos/amajor-submark.svg",
  sameAs: [
    "https://x.com/amajorhq",
    "https://www.linkedin.com/company/amajor",
    "https://github.com/amajor",
    "https://www.threads.net/@amajorai",
  ],
  founder: { "@id": "https://amajor.ai/#founder" },
  description:
    "A Major is a software company for the agent era. The Agency builds websites, apps, and enterprise systems with AI agents at the core. Products ships agent-native software — starting with Ryu, end-to-end managed infrastructure for AI agents.",
  hasPart: [
    {
      "@type": "Organization",
      name: "A Major Agency",
      url: "https://amajor.ai/agency",
      description:
        "Software that just works. Experts you can talk to. Websites, apps, and enterprise systems with AI agents at the core.",
    },
    {
      "@type": "Organization",
      name: "A Major Products",
      url: "https://amajor.ai/products",
      description:
        "Most AI agents didn't deliver. A Major builds the ones that do — starting with Ryu, end-to-end managed infrastructure for AI agents.",
    },
  ],
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
    cssSelector: ["h1"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: {
    "@type": "Organization",
    name: "A Major",
    url: "https://amajor.ai",
  },
  description:
    "Websites, apps, and enterprise systems with AI agents at the core — from the Agency arm. Agent-native products including Ryu, end-to-end managed AI agent infrastructure — from the Products arm.",
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
    "Singapore-based software company for the agent era. Agency: websites, apps, and enterprise systems with AI agents at the core. Products: agent-native software including Ryu, managed infrastructure for AI agents.",
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
    "https://x.com/amajorhq",
    "https://www.linkedin.com/company/amajor",
    "https://www.threads.net/@amajorai",
    "https://instagram.com/amajorai",
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

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://amajor.ai/#founder",
  name: "Jia Wei Ng",
  jobTitle: "Founder",
  worksFor: { "@id": "https://amajor.ai/#organization" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Glasgow" },
  sameAs: [
    "https://www.linkedin.com/in/jiaweing",
    "https://github.com/jiaweing",
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ryuSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        type="application/ld+json"
      />
    </>
  );
}
