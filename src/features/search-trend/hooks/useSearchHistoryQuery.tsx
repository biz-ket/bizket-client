import { useQuery } from '@tanstack/react-query';
import { getSearchHistory } from '../utils/searchHistoryUtils';

const useSearchHistoryQuery = () => {
  const queryResult = useQuery({
    queryKey: ['search-history'],
    queryFn: getSearchHistory,
    staleTime: 1000 * 60 * 5,
  });

  return queryResult;
};

export default useSearchHistoryQuery;
