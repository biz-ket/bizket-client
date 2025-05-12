'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InstagramCallback } from '@/features/auth/instagram/ui/InstagramCallback';

export default function CallbackContent() {
  const code = useSearchParams().get('code');
  const router = useRouter();
  const onSuccess = useCallback(() => {
    router.push('/my');
  }, [router]);

  return <InstagramCallback code={code} onSuccess={onSuccess} />;
}
