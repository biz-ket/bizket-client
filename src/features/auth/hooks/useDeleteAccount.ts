import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetchApi('/business-report/me', {
        method: 'DELETE',
        auth: true,
      });
    },
    // 삭제 성공 시 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      queryClient.invalidateQueries({ queryKey: ['business-profile'] });
    },
  });
};
