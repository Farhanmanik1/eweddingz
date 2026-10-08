import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/akash-selina',
        destination: '/akash-selina/index.html',
      },
      {
        source: '/sahil-geet',
        destination: '/sahil-geet/index.html',
      },
      {
        source: '/alex-jamie',
        destination: '/alex-jamie/index.html',
      },
      {
        source: '/farhan-muskan',
        destination: '/farhan-muskan/index.html',
      },
      {
        source: '/cristianweb',
        destination: '/cristianweb/index.html',
      }
    ];
  },
};

export default nextConfig;
