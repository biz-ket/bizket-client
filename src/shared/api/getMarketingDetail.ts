import { fetchApi } from '@/shared/utils/fetchApi';

export const getMarketingDetail = async (id: number | null) => {
  if (!id) return;

  const result = await fetchApi(`/marketing/contents/${id}`);
  return result.data;
};
