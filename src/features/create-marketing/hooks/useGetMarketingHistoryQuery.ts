import { getMarketingHistory } from '@/features/create-marketing/api/getMarketingHistory';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMarketingHistoryQuery = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['marketing-history', keyword],
    queryFn: ({ pageParam = 0 }) => getMarketingHistory(pageParam, 10, keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage;
      const nextPage = number + 1;
      return nextPage < totalPages ? nextPage : undefined;
    },
  });
};
