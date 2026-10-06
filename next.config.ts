import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/akash-selina',
        destination: '/akash-selina/index.html',
      },
    ]
  },
};

export default nextConfig;
