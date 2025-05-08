import { createMarketing } from '@/features/create-marketing/api/createMarketing';
import { CreateMarketingRequestType } from '@/features/create-marketing/types/apiType';
import {
  // useMarketingDataStore,
  useMarketingLoadingStore,
} from '@/shared/store/useMarketingStore';
import { useMutation } from '@tanstack/react-query';

export const useCreateMarketingMutation = () => {
  const { setLoading, setIsSuccess } = useMarketingLoadingStore();

  return useMutation({
    mutationKey: ['create-marketing'],
    mutationFn: (data: CreateMarketingRequestType) => createMarketing(data),
    onMutate: () => {
      setLoading(true);
      setIsSuccess(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log(data);
      // useMarketingDataStore.getState().setData(data);
      setIsSuccess(true);
    },
  });
};
