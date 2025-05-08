import { getMarketingHistory } from '@/features/create-marketing/api/getMarketingHistory';
import { useQuery } from '@tanstack/react-query';

export const useGetMarketingHistoryQuery = () => {
  return useQuery({
    queryKey: ['marketing-history'],
    queryFn: getMarketingHistory,
  });
};
