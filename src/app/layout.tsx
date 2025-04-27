'use client';

import Header from '@/shared/ui/layout/Header';
import './globals.css';
import RootLayoutProvider from './provider/RootLayoutProvider';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 헤더를 숨기고 싶은 경로들
  const hideHeaderOn = ['/login', '/login/callback'];
  const showHeader = !hideHeaderOn.includes(pathname);
  return (
    <html lang="ko">
      <body>
        <RootLayoutProvider>
          <div className="w-full">
            {showHeader && <Header />}
            {children}
          </div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
