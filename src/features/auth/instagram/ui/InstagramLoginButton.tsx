'use client';

export const InstagramLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/auth/instagram/login`;
  };

  return (
    <button
      className="px-4 py-2 bg-white text-black rounded"
      onClick={handleLogin}
    >
      인스타그램 로그인
    </button>
  );
};
