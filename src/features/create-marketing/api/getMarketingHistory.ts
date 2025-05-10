import { MarketingHistoryData } from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';

export const getMarketingHistory = async (
  page: number = 0,
  size: number = 10,
  keyword?: string,
): Promise<MarketingHistoryData> => {
  const result = await fetchApi(
    `/marketing/contents?page=${page}&size=${size}&keyword=${keyword}`,
    {
      auth: true,
    },
  );

  return result.data;
};
