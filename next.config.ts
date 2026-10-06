import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'akash-selina.eweddingz.online',
            },
          ],
          destination: '/cristianweb/index.html',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'akash-selina.eweddingz.online',
            },
          ],
          destination: '/cristianweb/:path*',
        }
      ],
      afterFiles: [
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
          source: '/cristianweb',
          destination: '/cristianweb/index.html',
        }
      ],
      fallback: []
    };
  },
};

export default nextConfig;
