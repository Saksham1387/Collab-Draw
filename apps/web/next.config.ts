import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fuchsia-legal-roundworm-794.mypinata.cloud',
      },
    ],
  },
};

export default nextConfig;
