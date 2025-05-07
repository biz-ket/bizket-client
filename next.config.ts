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
        source: '/api/mypage/me',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/mypage/me`,
      },
      {
        source: '/api/member/me',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/member/me`,
      },
    ];
  },
};

export default nextConfig;
