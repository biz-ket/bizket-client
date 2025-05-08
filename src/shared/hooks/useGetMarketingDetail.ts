import { getMarketingDetail } from '@/shared/api/getMarketingDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetMarketingDetail = (id: string) => {
  return useQuery({
    queryKey: ['market-detail'],
    queryFn: () => getMarketingDetail(id),
    enabled: !!id,
  });
};
