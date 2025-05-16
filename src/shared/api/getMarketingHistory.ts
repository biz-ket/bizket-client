'use client';

import { getAuthState } from '@/features/auth/model/useAuthStore';
import { MarketingHistoryData } from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';
import { getClientToken } from '@/shared/utils/getClientToken';

export const getMarketingHistory = async (
  page = 0,
  size = 10,
  keyword?: string,
): Promise<MarketingHistoryData> => {
  const params = new URLSearchParams();
  const { memberId } = getAuthState();
  const clientToken = getClientToken();

  params.set('page', String(page));
  params.set('size', String(size));
  if (keyword) params.set('keyword', keyword);

  if (memberId) {
    params.set('memberId', String(memberId));
  } else if (clientToken) {
    params.set('clientToken', clientToken);
  } else {
    throw new Error('Either memberId or clientToken must be provided');
  }

  const result = await fetchApi(`/marketing/contents?${params.toString()}`, {
    auth: true,
  });

  return result.data;
};
