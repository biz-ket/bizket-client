import { fetchApi } from '@/shared/utils/fetchApi';

export const deleteMarketing = async (id: number | null) => {
  if (!id) return;

  const result = await fetchApi(`/marketing/contents/${id}`, {
    method: 'DELETE',
  });

  return result;
};
