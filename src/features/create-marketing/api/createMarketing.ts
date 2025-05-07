import { CreateMarketingRequestType } from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';

export const createMarketing = async (data: CreateMarketingRequestType) => {
  return await fetchApi('/marketing/contents', {
    method: 'POST',
    body: data,
  });
};
