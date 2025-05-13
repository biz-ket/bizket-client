import { getAuthState } from '@/features/auth/model/useAuthStore';
import { getMarketingHistory } from '@/shared/api/getMarketingHistory';
import { getClientToken } from '@/shared/utils/getClientToken';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useGetMarketingHistoryQuery = (keyword: string, size?: number) => {
  const { memberId } = getAuthState();
  const clientToken = getClientToken();

  const queryResult = useInfiniteQuery({
    queryKey: ['marketing-history', keyword || '', memberId, clientToken],
    queryFn: ({ pageParam = 0 }) =>
      getMarketingHistory(pageParam, size ?? 10, keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage;
      const nextPage = number + 1;
      return nextPage < totalPages ? nextPage : undefined;
    },
    staleTime: 0,
  });

  const contents = useMemo(() => {
    if (queryResult.data) {
      return queryResult.data.pages.flatMap((page) => page.content);
    }
    return queryResult.data;
  }, [queryResult.data]);

  return {
    contents,
    ...queryResult,
  };
};
