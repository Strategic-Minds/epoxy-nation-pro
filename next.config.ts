import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.shopify.com"],
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
