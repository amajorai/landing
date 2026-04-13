import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sileo";
import { PlausibleWrapper } from "@/components/analytics/plausible-provider";
import { FloatingBookingButton } from "@/components/floating-booking-button";
import FooterSection from "@/components/footer";
import Header from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { SeasonalEffects } from "@/components/SeasonalEffects";
import SEO from "@/components/seo";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { analyticsConfig } from "@/lib/analytics-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { generateMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  ...generateMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
  }),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "A Major",
    startupImage: [
      {
        url: "/ios/1024.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/ios/1024.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlausibleWrapper>
      <html lang="en">
        <head>
          <SEO />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <Header />
            <MobileNav />
            <FloatingBookingButton />
            <SeasonalEffects />
            <div className="relative mx-auto max-w-3xl divide-y divide-dashed divide-border border-border border-x border-dashed">
              {children}
            </div>
            <FooterSection />
            <TailwindIndicator />
            <Toaster position="bottom-right" />
            {analyticsConfig.googleAnalytics.enabled && (
              <GoogleAnalytics gaId={analyticsConfig.googleAnalytics.gaId} />
            )}
          </ThemeProvider>
        </body>
      </html>
    </PlausibleWrapper>
  );
}
