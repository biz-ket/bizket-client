import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { fetchApi } from '@/shared/utils/fetchApi';
import { useQuery } from '@tanstack/react-query';

export interface BusinessProfile {
  placeName: string;
  customerAgeGroupId: number;
  customerAgeGroupLabel: string;
  businessCategoryId: number;
  businessCategoryName: string;
  businessSubCategoryId: number;
  businessSubCategoryName: string;
  businessDetailCategoryId: number;
  businessDetailCategoryName: string;
  openDate: string;
  address: string;
  placeEmail: string;
  placePhoneNumber: string;
  followerCount: number;
  instagramAccountId: string;
}

const useBusinessProfile = () => {
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  return useQuery<BusinessProfile, Error>({
    queryKey: ['business-profile'],
    queryFn: () =>
      fetchApi('/business-report/me/profile', {
        auth: true,
      }) as Promise<BusinessProfile>,
    enabled: Boolean(token) && hasHydrated, // 토큰이 있어야만 호출
    staleTime: 1000 * 60 * 5,
  });
};

export default useBusinessProfile;
