import { getMarketingDetail } from '@/shared/api/getMarketingDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetMarketingDetail = (id: number | null) => {
  return useQuery({
    queryKey: ['market-detail', id],
    queryFn: () => getMarketingDetail(id),
    enabled: !!id,
  });
};
