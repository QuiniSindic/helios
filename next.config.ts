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
        protocol: 'https',
        hostname: 'img.sofascore.com',
        pathname: '/api/v1/team/*/image',
      },
      {
        hostname: 'sofascore.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
