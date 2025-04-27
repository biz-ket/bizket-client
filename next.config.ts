import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/auth/:path*`,
      },
      {
        source: '/api/members/:path*',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/members/:path*`,
      },
      {
        source: '/api/members/me',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/members/me`,
      },
    ];
  },
};

export default nextConfig;
