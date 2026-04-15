"use client";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A Major",
    url: "https://amajor.ai",
    logo: "https://amajor.ai/logos/amajor-submark.svg",
    sameAs: ["https://x.com/j14wei", "https://www.linkedin.com/company/base07"],
    description:
      "A Major is a Singapore-based software agency specialising in web design, software development, and digital solutions for businesses.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "A Major",
    url: "https://amajor.ai",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://amajor.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://amajor.ai/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: "https://amajor.ai/blog",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "A Major",
    image: "https://amajor.ai/og/index.png",
    url: "https://amajor.ai",
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
      "https://x.com/j14wei",
      "https://www.linkedin.com/company/base07",
      "https://www.threads.net/@j14.wei",
      "https://instagram.com/base7llp",
      "https://www.tiktok.com/@j14.wei",
      "https://www.youtube.com/@j14wei",
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
