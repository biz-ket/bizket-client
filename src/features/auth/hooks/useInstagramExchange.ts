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
  return useMutation<ExchangeResponse, Error, { code: string }>({
    mutationFn: ({ code }) =>
      fetchApi('/api/auth/instagram/exchange', {
        method: 'POST',
        body: { code },
        credentials: 'include',
      }) as Promise<ExchangeResponse>,
  });
};
