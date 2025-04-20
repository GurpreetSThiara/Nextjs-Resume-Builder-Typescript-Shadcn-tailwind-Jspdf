import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.freepik.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
