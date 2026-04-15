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
  ],
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
    </>
  );
}
