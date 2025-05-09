import { fetchApi } from '@/shared/utils/fetchApi';

export const getMarketingDetail = async (id: string) => {
  const result = await fetchApi(`/marketing/contents/${id}`);
  return result.data;
};
