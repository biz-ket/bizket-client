'use client';

import Header from '@/shared/ui/layout/Header';
import RootLayoutProvider from './provider/RootLayoutProvider';
import 'react-day-picker/style.css';
import './globals.css';
import Footer from '@/shared/ui/layout/Footer';

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
            <Footer />
          </div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
