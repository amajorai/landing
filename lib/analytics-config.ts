/**
 * Analytics configuration for the application
 * This file centralizes all analytics-related configuration
 */

export const analyticsConfig = {
  // Plausible Analytics configuration
  plausible: {
    domain: "amajor.ai",
    customDomain: "https://stats.jiaweing.com",
    enabled: process.env.NODE_ENV === "production",
  },

  // Google Analytics configuration
  googleAnalytics: {
    gaId: "G-WZL3Y4X8NE",
    enabled: process.env.NODE_ENV === "production",
  },
};
