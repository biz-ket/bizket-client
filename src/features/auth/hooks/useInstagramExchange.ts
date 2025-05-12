'use client';
import { fetchApi } from '@/shared/utils/fetchApi';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface ExchangeResponse {
  jwtToken: string;
  refreshToken: string;
  memberId: number;
}

export const useInstagramExchange = (): UseMutationResult<
  ExchangeResponse,
  Error,
  { code: string },
  unknown
> => {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin,
  );

  return useMutation<ExchangeResponse, Error, { code: string }>({
    mutationFn: ({ code }) =>
      fetchApi(`/auth/instagram/exchange?redirect_uri=${redirectUrl}`, {
        method: 'POST',
        auth: false,
        body: { code },
      }) as Promise<ExchangeResponse>,
  });
};
