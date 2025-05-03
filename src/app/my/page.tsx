'use client';
import { useRouter } from 'next/navigation';
import Container from '@/shared/ui/layout/Container';
import { useEffect } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

const MyPage = () => {
  const router = useRouter();
  const { data: user, isError, isLoading } = useCurrentUser();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const token = useAuthStore((s) => s.token);
  console.log('[MyPage]', { hasHydrated, token, isError, user, isLoading });
  useEffect(() => {
    if (!hasHydrated || isLoading) return;

    if (isError || !user) {
      router.push('/');
    }
  }, [hasHydrated, isLoading, isError, user, router]);

  if (!hasHydrated || isLoading) {
    return null;
  }
  if (isError || !user) {
    return null;
  }
  return (
    <Container>
      <h1>내 정보</h1>
      <p>닉네임: {user.nickname}</p>
    </Container>
  );
};
export default MyPage;
