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
  async redirects() {
    return [
      {
        source: "/consultancy",
        destination: "/services/consultancy",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
