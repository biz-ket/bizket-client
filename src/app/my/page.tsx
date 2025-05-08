'use client';
import { useRouter } from 'next/navigation';
import AdditionalInfo from '@/features/my/ui/AdditionalInfo';
import CreationHistory from '@/features/my/ui/GenerationHistory';
import Header from '@/features/my/ui/Header';
import UserProfile from '@/features/my/ui/UserProfile';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';

const MyPage = () => {
  const router = useRouter();

  const { data: member, isError, isLoading } = useMemberInfo();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  useEffect(() => {
    console.log('멤버데이터', member);
    if (!hasHydrated || isLoading) return;

    if (isError || !member) {
      router.push('/');
    }
  }, [hasHydrated, isLoading, isError, member, router]);

  if (!hasHydrated || isLoading) {
    return null;
  }
  if (isError || !member) {
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
