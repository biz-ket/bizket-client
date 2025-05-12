import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '@/features/profile/schema';
import { BusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import { Member } from '@/features/auth/hooks/useMemberInfo';
import { useEffect } from 'react';

/**
 * useProfileForm 훅
 * - react-hook-form 설정 및 초기값 reset 로직을 포함
 * @param member React Query로 가져온 사용자 정보
 * @param profile React Query로 가져온 비즈니스 프로필 정보
 */
export const useProfileForm = (member?: Member, profile?: BusinessProfile) => {
  // react-hook-form 셋업: validator + 기본값
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      brand: '',
      email: '',
      startDate: new Date(),
      phone1: '',
      phone2: '',
      phone3: '',
      categoryId: null,
      subCategoryId: null,
      detailCategoryId: null,
      instagram: '',
      street: '',
      threads: '',
      ageGroupIds: [],
    },
  });

  // methods.reset만 추출하여 의존성 배열 관리
  const { reset } = methods;

  // member와 profile 데이터 들어오면 초기값 세팅
  useEffect(() => {
    if (member && profile) {
      const [p1 = '', p2 = '', p3 = ''] = profile.placePhoneNumber.split('-');
      reset({
        name: member.nickname,
        brand: profile.placeName,
        email: member.email,
        startDate: profile.openDate ? new Date(profile.openDate) : undefined,
        phone1: p1,
        phone2: p2,
        phone3: p3,
        categoryId: profile.businessCategoryId,
        subCategoryId: profile.businessSubCategoryId,
        detailCategoryId: profile.businessDetailCategoryId,
        instagram: member.instagramAccountId || '',
        street: profile.address || '',
        threads: member.threadsAccountId || '',
        ageGroupIds: [profile.customerAgeGroupId],
      });
    }
  }, [member, profile, reset]);

  return methods;
};
