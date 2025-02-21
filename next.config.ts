import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'sofascore.app',
        protocol: 'https',
      },
      {
        hostname: 'img.sofascore.com',
        protocol: 'https',
      },
      {
        hostname: 'sofascore.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
