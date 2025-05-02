'use client';

import Image from 'next/image';

export const InstagramLoginButton = () => {
  const handleLogin = () => {
    const frontend =
      process.env.NEXT_PUBLIC_FRONTEND_URL ?? window.location.origin;
    const redirectUrl = encodeURIComponent(`${frontend}/login/callback`);

    const apiBase = process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL!;
    window.location.href = `${apiBase}/auth/instagram/login?redirect_uri=${redirectUrl}`;
  };

  return (
    <button
      className="title-sm relative bg-primary-50 py-18 height-[70px] text-white rounded-14 w-[421px]"
      onClick={handleLogin}
    >
      <Image
        src={`/images/shared/login-character.svg`}
        width={112}
        height={95}
        alt="비즈킷 캐릭터"
        className="absolute right-0 bottom-0"
      />
      인스타그램 로그인
    </button>
  );
};
