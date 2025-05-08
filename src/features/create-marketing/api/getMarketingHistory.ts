import { MarketingHistoryResponse } from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';

export const getMarketingHistory = async (): Promise<
  MarketingHistoryResponse[]
> => {
  const result = await fetchApi('/marketing/contents', {
    auth: true,
  });

  return result.data;
};
