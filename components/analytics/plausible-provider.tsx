"use client";

import PlausibleProvider from "next-plausible";
import { analyticsConfig } from "@/lib/analytics-config";

export function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  const { domain, customDomain, enabled } = analyticsConfig.plausible;

  return (
    <PlausibleProvider
      customDomain={customDomain}
      domain={domain}
      enabled={enabled}
      trackOutboundLinks
    >
      {children}
    </PlausibleProvider>
  );
}
