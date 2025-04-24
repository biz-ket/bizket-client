import { useQuery } from '@tanstack/react-query';
import { TrendSearchParams } from '../model/types';

const createTrendQueryKey = (params: TrendSearchParams) => {
  return [
    'trend-search',
    params.keyword,
    params.startDate,
    params.endDate,
    params.device ?? 'all',
    params.gender ?? 'all',
    params.ages?.join(',') ?? 'all',
  ];
};

interface useSearchResultQueryProps {
  searchParams: TrendSearchParams;
}

const useSearchResultQuery = ({ searchParams }: useSearchResultQueryProps) => {
  const queryResult = useQuery({
    queryKey: createTrendQueryKey(searchParams),
    queryFn: () => {
      // TODO: api 호출 코드로 대체
      return true;
    },
  });

  return queryResult;
};

export default useSearchResultQuery;
