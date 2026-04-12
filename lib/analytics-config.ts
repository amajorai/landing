/**
 * Analytics configuration for the application
 * This file centralizes all analytics-related configuration
 */

export const analyticsConfig = {
  // Plausible Analytics configuration
  plausible: {
    domain: "base07.com",
    customDomain: "https://quasarite.com",
    enabled: process.env.NODE_ENV === "production",
  },

  // Google Analytics configuration
  googleAnalytics: {
    gaId: "G-WZL3Y4X8NE",
    enabled: process.env.NODE_ENV === "production",
  },
};
