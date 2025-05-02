'use client';
import { useRouter } from 'next/navigation';
import Container from '@/shared/ui/layout/Container';
import { useEffect } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

const MyPage = () => {
  const router = useRouter();
  const { data: user, isError } = useCurrentUser();

  useEffect(() => {
    if (isError || !user) {
      router.push('/');
    }
  }, [isError, user, router]);

  if (isError || !user) return null;
  return (
    <Container>
      <h1>내 정보</h1>
      <p>닉네임: {user.nickname}</p>
    </Container>
  );
};
export default MyPage;
