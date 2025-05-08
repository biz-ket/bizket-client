import {
  CreateMarketingRequestType,
  CreateMarketingResponseType,
} from '@/features/create-marketing/types/apiType';
import { convertToFormData } from '@/shared/utils/convertToFormData';
import { fetchApi } from '@/shared/utils/fetchApi';

export const createMarketing = async (
  data: CreateMarketingRequestType,
): Promise<CreateMarketingResponseType[]> => {
  const result = await fetchApi('/marketing/contents', {
    method: 'POST',
    body: convertToFormData(data),
  });

  return result.data;
};
