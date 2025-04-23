'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function InstagramCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/auth/instagram/exchange`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ 로그인 성공:', data);

        // 토큰 저장 예시
        localStorage.setItem('token', data.jwtToken);

        router.push('/'); // 로그인 후 이동 경로
      })
      .catch((err) => {
        console.error('❌ 로그인 실패', err);
      });
  }, [code]);

  return <p>로그인 처리 중입니다... 🌀</p>;
}
