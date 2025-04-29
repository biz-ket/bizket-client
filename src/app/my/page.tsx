'use client';

import { useRouter } from 'next/navigation';
import Container from '@/shared/ui/layout/Container';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

const MyPage = () => {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const isLoggedIn = useAuthStore((s) => Boolean(s.token));

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.push('/login');
    }
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated) return null;
  if (!isLoggedIn) return null;
  return (
    <Container>
      <h1>내 정보</h1>
      <p>로그인 상태입니다 🙂</p>
    </Container>
  );
};
export default MyPage;
