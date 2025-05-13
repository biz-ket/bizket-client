import { getAuthState } from '@/features/auth/model/useAuthStore';
import { getMarketingHistory } from '@/features/create-marketing/api/getMarketingHistory';
import { getClientToken } from '@/shared/utils/getClientToken';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMarketingHistoryQuery = (keyword: string) => {
  const { memberId } = getAuthState();
  const clientToken = getClientToken();

  return useInfiniteQuery({
    queryKey: ['marketing-history', keyword || '', memberId, clientToken],
    queryFn: ({ pageParam = 0 }) => getMarketingHistory(pageParam, 10, keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage;
      const nextPage = number + 1;
      return nextPage < totalPages ? nextPage : undefined;
    },
    staleTime: 0,
  });
};
