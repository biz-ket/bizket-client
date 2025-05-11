import { fetchApi } from '@/shared/utils/fetchApi';

export const deleteMarketing = async (id: number) => {
  const result = await fetchApi(`/marketing/contents/${id}`, {
    method: 'DELETE',
  });

  return result;
};
