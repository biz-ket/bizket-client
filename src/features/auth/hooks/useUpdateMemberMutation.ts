import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

type UpdateMemberInput = {
  name: string;
  email: string;
  instagram: string;
  threads: string;
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMemberInput) => {
      await fetchApi('/member/me', {
        method: 'PATCH',
        auth: true,
        body: {
          nickname: data.name,
          email: data.email,
          instagramAccountId: data.instagram,
          threadsAccountId: data.threads,
        },
      });
    },
    // onSuccess 콜백
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};
