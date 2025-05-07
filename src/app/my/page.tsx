'use client';
import { useRouter } from 'next/navigation';
import AdditionalInfo from '@/features/my/ui/AdditionalInfo';
import CreationHistory from '@/features/my/ui/GenerationHistory';
import Header from '@/features/my/ui/Header';
import UserProfile from '@/features/my/ui/UserProfile';
import { useEffect } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

const MyPage = () => {
  const router = useRouter();
  const { data: user, isError, isLoading } = useCurrentUser();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

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
    <div>
      <Header />
      <div className="w-[1200px] py-80 mx-auto">
        <section className="w-full h-[210px] flex gap-24">
          <UserProfile user={user} />
          <AdditionalInfo />
        </section>
        <CreationHistory />
      </div>
    </div>
  );
};
export default MyPage;
