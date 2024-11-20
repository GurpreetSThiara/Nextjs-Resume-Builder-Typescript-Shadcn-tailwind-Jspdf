import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.freepik.com'],
  },
  sitemap: {
    siteUrl: 'https://resume.giveaways4u.com',
    generateRobotsTxt: true,
  },
};

export default nextConfig;
