"use client";

export default function StructuredData() {
  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Base 7",
    url: "https://base7.com",
    logo: "https://base7.com/logos/base7-submark.svg",
    sameAs: ["https://x.com/j14wei", "https://www.linkedin.com/company/base07"],
    description:
      "Base 7 is a Singapore-based software company specializing in rapid app development. We build web, mobile, and desktop apps in just 10 days.",
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Base 7",
    url: "https://base7.com",
  };

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "App Development",
    provider: {
      "@type": "Organization",
      name: "Base 7",
    },
    description:
      "We build digital experiences in days that others take months to create. From web apps to mobile apps to desktop software.",
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
        item: "https://base7.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: "https://base7.com/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: "https://base7.com/#services",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://base7.com/#contact",
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
        name: "What can you actually build for me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pretty much anything digital you can imagine. Web apps that work on any browser. Mobile apps for iOS and Android. Desktop software for Mac and PC. Browser extensions that supercharge your online experience. If it's software, we can build it — and make it work across all your devices.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can you get it done?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects go from idea to launch in under 30 days. Seriously. Our team has the experience to move quickly without cutting corners. Got something more complex? We'll map out a clear timeline so you know exactly what to expect.",
        },
      },
      {
        "@type": "Question",
        name: "What's it like working with you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We keep it refreshingly simple. First, we chat about what you need. Then we create a plan that makes sense. We build in small chunks so you can see progress and give feedback along the way. No tech jargon, no surprises — just regular updates in plain English and a finished product you'll love.",
        },
      },
      {
        "@type": "Question",
        name: "How do we get this on the app stores?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We handle the entire publishing process. Don't want to pay for developer accounts? No problem — we can publish under our company accounts at no extra cost. If you prefer your own accounts, we'll guide you through setup. For web apps, we'll either host it for you or set it up on your existing servers. Either way, we make launch day stress-free.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after you build it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We don't just build and bail. Your app is like a living thing that needs care to thrive. We offer ongoing support to keep everything running smoothly, fix any issues that pop up, and add new features as you need them. Think of us as your tech team on standby, ready when you need us.",
        },
      },
    ],
  };

  // Local Business schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Base 7",
    image: "https://base7.com/og-image.svg",
    url: "https://base7.com",
    telephone: "+6500000000",
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
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
