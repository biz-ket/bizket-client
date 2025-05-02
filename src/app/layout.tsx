'use client';

import Header from '@/shared/ui/layout/Header';
import RootLayoutProvider from './provider/RootLayoutProvider';
import 'react-day-picker/style.css';
import './globals.css';
import Footer from '@/shared/ui/layout/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 헤더,푸터를 숨기고 싶은 경로들
  const hideLayoutOn = ['/login'];
  const shouldHideLayout = hideLayoutOn.includes(pathname);
  return (
    <html lang="ko">
      <body>
        <RootLayoutProvider>
          <div className="w-full">
            {!shouldHideLayout && <Header />}
            {children}
            {!shouldHideLayout && <Footer />}
          </div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
