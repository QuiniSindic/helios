import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "api.sofascore.app",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
