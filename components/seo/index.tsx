"use client";

import StructuredData from "./structured-data";

/**
 * SEO component that includes structured data for the site
 * Other meta tags are handled by Next.js metadata in app/layout.tsx
 */
export default function SEO() {
  return (
    <>
      {/* Font preconnect for performance */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="anonymous"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      {/* JSON-LD Structured Data */}
      <StructuredData />
    </>
  );
}
