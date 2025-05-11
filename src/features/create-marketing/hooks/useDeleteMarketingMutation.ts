import { deleteMarketing } from '@/features/create-marketing/api/deleteMarketing';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMarketingMutation = () => {
  return useMutation({
    mutationKey: ['marketing-delete'],
    mutationFn: (id: number) => deleteMarketing(id),
    onSuccess: () => {
      console.log('삭제 성공');
    },
  });
};
