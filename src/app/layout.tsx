import RootLayoutProvider from './provider/RootLayoutProvider';
import 'react-day-picker/style.css';
import './globals.css';
import LayoutComponent from '@/shared/ui/layout/LayoutComponent';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'BIZKET',
  description:
    '마케팅 전문 인력이나 경험이 부족한 자영업자를 위한 AI 기반 마케팅 지원 사이트입니다. 마케팅 콘텐츠 생성, 검색어 트렌트 조회, SNS 인사이트 보고서 등의 기능을 제공합니다.',
  keywords: [
    '마케팅',
    'AI마케팅',
    'SNS마케팅',
    '인사이트',
    '검색어',
    '트렌드',
    '생성형',
    'AI',
    '자영업',
    '소상공인',
  ],
  openGraph: {
    title: 'BIZKET',
    description:
      '마케팅 전문 인력이나 경험이 부족한 자영업자를 위한 AI 기반 마케팅 지원 사이트입니다. 마케팅 콘텐츠 생성, 검색어 트렌트 조회, SNS 인사이트 보고서 등의 기능을 제공합니다.',
    type: 'website',
    url: 'https://bizket.swygbro.com',
    siteName: 'BIZKET',
    images: [
      {
        url: '/images/shared/open_graph.png',
        width: 1200,
        height: 630,
        alt: 'BIZKET 썸네일',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        />
        <RootLayoutProvider>
          <LayoutComponent>{children}</LayoutComponent>
          <div id="modal-root" />
        </RootLayoutProvider>
      </body>
    </html>
  );
}
