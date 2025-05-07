// features/insight/hooks/useBusinessProfile.ts
import { useQuery } from '@tanstack/react-query';
import { authFetch } from '@/features/auth/lib/authFetch';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export interface BusinessProfile {
  placeName: string;
  customerAgeGroupLabel: string;
  openDate: string;
  address: string;
  followerCount: number;
  instagramAccountId: string;
  businessSubCategoryName: string;
}
const defaultProfile: BusinessProfile = {
  placeName: '행복합니다',
  customerAgeGroupLabel: '20대',
  openDate: '2025-02-05',
  address: '서울시 은평구 신사동',
  followerCount: 121,
  instagramAccountId: 'bizkit',
  businessSubCategoryName: '메이크업',
};

// export const useBusinessProfile = () => {
//   const token = useAuthStore((s) => s.token);

//   return useQuery<BusinessProfile, Error, BusinessProfile>({
//     queryKey: ['businessProfile'],
//     queryFn: () => authFetch('/api/business-report/me/profile'),
//     staleTime: 5 * 60 * 1000,
//     enabled: Boolean(token),
//     initialData: defaultProfile,
//     onError: () => {},
//   });
// };
export const useBusinessProfile = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery<BusinessProfile>({
    // token 변화를 key에 포함시켜, 토큰이 발급되면 재실행되도록
    queryKey: ['businessProfile', token],
    queryFn: async () => {
      // 토큰 없으면 기본값 바로 리턴
      if (!token) return defaultProfile;

      try {
        return await authFetch('/business-report/me/profile');
      } catch {
        // 에러나도 기본값 리턴
        return defaultProfile;
      }
    },
    // 5분 동안 stale 처리
    staleTime: 5 * 60 * 1000,
    // 기본적으로 재시도하지 않음
    retry: false,
  });
};
