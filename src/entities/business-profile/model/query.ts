import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';
import { BusinessProfile } from './types';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export const useBusinessProfile = () => {
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  return useQuery<BusinessProfile, Error>({
    queryKey: ['business-profile'],
    queryFn: () =>
      fetchApi('/business-report/me/profile', {
        auth: true,
      }) as Promise<BusinessProfile>,
    enabled: Boolean(token) && hasHydrated,
    staleTime: 1000 * 60 * 5,
  });
};
