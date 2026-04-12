"use client";

export default function StructuredData() {
  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A Major",
    url: "https://amajor.ai",
    logo: "https://amajor.ai/logos/amajor-submark.svg",
    sameAs: ["https://x.com/j14wei", "https://www.linkedin.com/company/base07"],
    description:
      "A Major is a Singapore-based software company specialising in web design, software development, and digital solutions for businesses.",
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "A Major",
    url: "https://amajor.ai",
  };

  // Service schema
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

  // Breadcrumb schema
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
        name: "About",
        item: "https://amajor.ai/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: "https://amajor.ai/#services",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://amajor.ai/#contact",
      },
    ],
  };

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does A Major do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Major is a Singapore-based software company. We design and build websites, web applications, and digital platforms for businesses across industries, with a clear process, transparent communication, and close collaboration from discovery to launch.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of software do you build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Websites, web apps, mobile apps, desktop software, and digital platforms. We work with businesses across industries who need high-performance software built properly, with a founder personally involved in every project.",
        },
      },
      {
        "@type": "Question",
        name: "What does founder-led mean in practice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It means Jia Wei, our founder, is directly involved in your project from discovery to launch. You get someone with 7+ years of engineering experience, a CS degree from the University of Glasgow, and a track record across web, mobile, and enterprise platforms.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects move from discovery to launch in under 30 days. We scope everything upfront so there are no surprises.",
        },
      },
      {
        "@type": "Question",
        name: "How do we get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reach out through our contact form or book a call. We get back to everyone within 24 hours.",
        },
      },
    ],
  };

  // Local Business schema
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
