import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: ["shiki"],
  images: {
    remotePatterns: [
      // legacy S3 regional endpoints like s3-us-west-2.amazonaws.com
      {
        protocol: "https",
        hostname: "s3-*.amazonaws.com",
        pathname: "**",
      },
      // virtual-hosted–style buckets: bucket.s3.amazonaws.com
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "**",
      },
      // regional virtual-hosted–style buckets: bucket.s3.us-west-2.amazonaws.com
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        pathname: "**",
      },
      // Keep Unsplash just in case, merging with user request to be safe, but primarily user request
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Favicon/avatar service for project logos
      {
        protocol: "https",
        hostname: "unavatar.io",
        pathname: "/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/og",
        search: "?**",
      },
    ],
  },
};

export default nextConfig;
