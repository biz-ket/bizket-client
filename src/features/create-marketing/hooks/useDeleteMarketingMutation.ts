import { deleteMarketing } from '@/features/create-marketing/api/deleteMarketing';
import { useToast } from '@/shared/context/ToastContext';
import { useGetMarketingHistoryQuery } from '@/shared/hooks/useGetMarketingHistoryQuery';
import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMarketingMutation = () => {
  const { contents, refetch: marketingHistoryRefetch } =
    useGetMarketingHistoryQuery('');
  const { setId } = useContentHistoryStore();
  const { openToast } = useToast();

  return useMutation({
    mutationKey: ['marketing-delete'],
    mutationFn: (id: number | null) => deleteMarketing(id),
    onSuccess: () => {
      marketingHistoryRefetch();
      openToast({
        message: '삭제되었습니다.',
      });

      setTimeout(() => {
        setId(contents?.[0].id || null);
      }, 300);
    },
  });
};
