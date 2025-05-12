'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../../model/useAuthStore';
import { useInstagramExchange } from '../../hooks/useInstagramExchange';

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
      <div className="flex items-center justify-center h-full">
        <p className="ml-4">로그인 처리 중…</p>
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
