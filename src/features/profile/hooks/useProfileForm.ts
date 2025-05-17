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
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      brand: '',
      placeEmail: '',
      startDate: undefined,
      phone1: '',
      phone2: '',
      phone3: '',
      categoryId: null,
      subCategoryId: null,
      detailCategoryId: null,
      instagram: '',
      street: '',
      threads: '',
      ageGroupId: 0,
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (!member || !profile) return;

    const [p1 = '', p2 = '', p3 = ''] = profile.placePhoneNumber
      ? profile.placePhoneNumber.split('-')
      : ['', '', ''];

    const parsedDate =
      typeof profile.openDate === 'string' && profile.openDate.includes('-')
        ? new Date(profile.openDate)
        : undefined;

    reset({
      name: member.nickname,
      brand: profile.placeName,
      placeEmail: profile.placeEmail,
      startDate: parsedDate,
      phone1: p1,
      phone2: p2,
      phone3: p3,
      categoryId: profile.businessCategoryId,
      subCategoryId: profile.businessSubCategoryId,
      detailCategoryId: profile.businessDetailCategoryId,
      instagram: member.instagramAccountId || '',
      street: profile.address || '',
      threads: member.threadsAccountId || '',
      ageGroupId: profile.customerAgeGroupId,
    });
  }, [member, profile, reset]);

  return methods;
};
