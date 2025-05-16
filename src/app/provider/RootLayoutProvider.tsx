'use client';

import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import { ToastProvider } from '@/shared/context/ToastContext';

interface RootLayoutProviderProps {
  children: ReactNode;
}

export default function RootLayoutProvider({
  children,
}: RootLayoutProviderProps) {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
}
