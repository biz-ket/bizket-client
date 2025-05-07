import { createMarketing } from '@/features/create-marketing/api/createMarketing';
import { CreateMarketingRequestType } from '@/features/create-marketing/types/apiType';
import { useMutation } from '@tanstack/react-query';

export const useCreateMarketingMutation = () => {
  return useMutation({
    mutationKey: ['create-marketing'],
    mutationFn: (data: CreateMarketingRequestType) => createMarketing(data),
    onSuccess: () => {
      console.log('성공');
    },
  });
};
