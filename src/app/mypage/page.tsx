'use client';

import { useRouter } from 'next/navigation';
import Container from '@/shared/ui/layout/Container';
import { useIsLoggedIn } from '@/features/auth/hooks/useIsLoggedIn';
import { useEffect } from 'react';

export default function MyPage() {
  const isLoggedIn = useIsLoggedIn();

  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <h1>내 정보</h1>
      <p>로그인 상태입니다 🙂</p>
    </Container>
  );
}
