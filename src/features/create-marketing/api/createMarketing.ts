import {
  CreateMarketingRequestType,
  CreateMarketingResponseType,
} from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';

export const createMarketing = async (
  data: CreateMarketingRequestType,
): Promise<CreateMarketingResponseType[]> => {
  const result = await fetchApi('/marketing/contents', {
    method: 'POST',
    body: data,
  });

  return result.data;
};
