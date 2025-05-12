'use client';

import Footer from '@/shared/ui/layout/Footer';
import Header from '@/shared/ui/layout/Header';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutComponentProps {
  children: ReactNode;
}
const LayoutComponent = ({ children }: LayoutComponentProps) => {
  const pathname = usePathname();

  // 헤더,푸터를 숨기고 싶은 경로들
  const hideLayoutOn = ['/login'];
  const shouldHideLayout = hideLayoutOn.includes(pathname);
  const wrapperClass = `w-full min-w-[1500px] ${
    shouldHideLayout ? '' : 'pt-60'
  }`;
  return (
    <div className={wrapperClass}>
      {!shouldHideLayout && <Header />}
      {children}
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default LayoutComponent;
