import { deleteMarketing } from '@/features/create-marketing/api/deleteMarketing';
import { useGetMarketingHistoryQuery } from '@/features/create-marketing/hooks/useGetMarketingHistoryQuery';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMarketingMutation = () => {
  const { refetch: marketingHistoryRefetch } = useGetMarketingHistoryQuery('');

  return useMutation({
    mutationKey: ['marketing-delete'],
    mutationFn: (id: number | null) => deleteMarketing(id),
    onSuccess: () => {
      marketingHistoryRefetch();
    },
  });
};
