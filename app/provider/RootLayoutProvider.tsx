import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

interface RootLayoutProviderProps {
  children: ReactNode;
}

export default function RootLayoutProvider({
  children,
}: RootLayoutProviderProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
