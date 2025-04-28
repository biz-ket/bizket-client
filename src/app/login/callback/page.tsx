'use client';
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InstagramCallback } from '@/features/auth/instagram/ui/InstagramCallback';

const CallbackPage = () => {
  const code = useSearchParams().get('code'); //인가코드
  const router = useRouter();
  const onSuccess = useCallback(() => {
    router.push('/my');
  }, [router]);

  return <InstagramCallback code={code} onSuccess={onSuccess} />;
};

export default CallbackPage;
