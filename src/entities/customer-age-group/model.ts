import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';
export interface AgeOption {
  id: number;
  label: string;
}
/**
 * 고객 연령층 조회
 */
export function useCustomerAgeGroups() {
  return useQuery<AgeOption[], Error>({
    queryKey: ['customer-age-groups'],
    queryFn: () =>
      fetchApi('/business/customer-age-groups', { auth: true }) as Promise<
        AgeOption[]
      >,
    staleTime: 5 * 60 * 1000,
  });
}
