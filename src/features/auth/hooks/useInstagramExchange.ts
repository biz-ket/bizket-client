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
      fetchApi('/auth/instagram/exchange', {
        method: 'POST',
        auth: false,
        body: { code },
      }) as Promise<ExchangeResponse>,
  });
};
