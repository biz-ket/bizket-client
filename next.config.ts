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
      {
        source: '/api/instagram/insight/me/media-with-insights',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/instagram/insight/me/media-with-insights`,
      },
      {
        source: '/api/business-report/me/profile',
        destination: `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/business-report/me/profile`,
      },
    ];
  },
};

export default nextConfig;
