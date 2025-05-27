'use client';
import Image from 'next/image';

export const InstagramLoginButton = () => {
  const handleLogin = () => {
    // const frontend =
    //   typeof window !== 'undefined'
    //     ? window.location.origin
    //     : process.env.NEXT_PUBLIC_FRONTEND_URL!;

    const redirectUrl = encodeURIComponent(
      process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin,
    );

    const apiBase = process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL!;
    const loginUrl = `${apiBase}/auth/instagram/login?redirect_uri=${redirectUrl}`;
    window.location.href = loginUrl;
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
        className="absolute bottom-0 right-0"
      />
      인스타그램 로그인
    </button>
  );
};
