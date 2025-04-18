'use client';

import Header from '@/shared/ui/layout/Header';
import './globals.css';
import RootLayoutProvider from './provider/RootLayoutProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RootLayoutProvider>
          <div className="w-full min-w-[1920px]">
            <Header />
            {children}
          </div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
