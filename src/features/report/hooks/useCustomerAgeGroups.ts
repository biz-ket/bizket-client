import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

export interface AgeOption {
  id: number;
  label: string;
}

export const useCustomerAgeGroups = () =>
  useQuery<AgeOption[], Error>({
    queryKey: ['customerAgeGroups'],
    queryFn: () =>
      fetchApi('/business/customer-age-groups', { auth: true }) as Promise<
        AgeOption[]
      >,
    staleTime: 5 * 60 * 1000,
  });
