'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../../model/useAuthStore';
import { useInstagramExchange } from '../../hooks/useInstagramExchange';
import Image from 'next/image';

export const InstagramCallback = ({
  code,
  onSuccess,
}: {
  code: string | null;
  onSuccess: () => void;
}) => {
  const { setToken, setRefreshToken, setMemberId } = useAuthStore.getState();
  const { mutate, isPending, isError, error } = useInstagramExchange();

  useEffect(() => {
    if (code) {
      mutate(
        { code },
        {
          onSuccess: (data) => {
            setToken(data.jwtToken);
            setRefreshToken(data.refreshToken);
            setMemberId(data.memberId);
            onSuccess();
          },
        },
      );
    }
  }, [code, mutate, onSuccess, setToken, setRefreshToken, setMemberId]);

  if (isPending) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <Image
          src={'/images/shared/loading-text-gray.gif'}
          alt="로딩 이미지"
          width={100}
          height={89}
          unoptimized
          className="w-[200px] h-auto"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        {error?.message || '로그인 중 오류가 발생했습니다.'}
      </p>
    );
  }

  return null;
};
