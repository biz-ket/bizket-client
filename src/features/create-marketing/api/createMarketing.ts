import {
  CreateMarketingRequestType,
  CreateMarketingResponseType,
} from '@/features/create-marketing/types/apiType';
import { fetchApi } from '@/shared/utils/fetchApi';

export const createMarketing = async (
  data: CreateMarketingRequestType,
): Promise<CreateMarketingResponseType> => {
  const formData = new FormData();
  const { imageUrls, ...requestData } = data;

  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
  );

  imageUrls?.forEach((file: File) => {
    formData.append('images', file);
  });

  const result = await fetchApi('/marketing/contents', {
    method: 'POST',
    body: formData,
  });

  return result.data;
};
