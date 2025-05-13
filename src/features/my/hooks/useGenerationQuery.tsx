import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { MarketingContentsGeneration } from '../model/types';
import { useMemo } from 'react';
import { fetchGenerationsByKeyword } from '../api/fetchGenerationsByKeyword';

const limit = 8;

interface useGenerationQueryProps {
  keyword: string;
}

const useGenerationQuery = ({ keyword }: useGenerationQueryProps) => {
  const memberId = useAuthStore((s) => s.memberId);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  const { data, ...others } = useInfiniteQuery({
    queryKey: ['marketing-contents', memberId, keyword],
    queryFn: async ({ pageParam }) => {
      return await fetchGenerationsByKeyword(
        memberId!,
        keyword,
        pageParam,
        limit,
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    enabled: memberId !== null && hasHydrated,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const generations = useMemo(() => {
    const result: MarketingContentsGeneration[] = [];
    data?.pages.forEach((page) => result.push(...page.content));
    return result;
  }, [data]);

  return {
    generations,
    ...others
  };
};

export default useGenerationQuery;
