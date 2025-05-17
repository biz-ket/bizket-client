import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { fetchApi } from '@/shared/utils/fetchApi';

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
  threadsAccountId: string;
}
const defaultProfile: BusinessProfile = {
  placeName: '',
  customerAgeGroupId: 2,
  customerAgeGroupLabel: '20대',
  businessCategoryId: 1,
  businessCategoryName: '요식업',
  businessSubCategoryId: 13,
  businessSubCategoryName: '카페',
  businessDetailCategoryId: 16,
  businessDetailCategoryName: '로스터리/핸드드립',
  openDate: '2023-05-01',
  address: '서울시 강남구 역삼동 123-45',
  placeEmail: 'owner@urigaegae.com',
  placePhoneNumber: '010-1234-5678',
  followerCount: 1,
  instagramAccountId: 'bizket27',
  threadsAccountId: 'bizzket',
};

export const useBusinessProfile = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery<BusinessProfile, Error>({
    queryKey: ['business-profile'],
    queryFn: () =>
      fetchApi('/business-report/me/profile', {
        auth: true,
      }) as Promise<BusinessProfile>,
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(token),
    placeholderData: defaultProfile,
  });
};
