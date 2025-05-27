import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/context/ToastContext';
import { useProfileForm } from '@/features/profile/hooks/useProfileForm';
import { Member } from '@/features/auth/hooks/useMemberInfo';
import { useUpdateMember } from '@/features/auth/hooks/useUpdateMemberMutation';
import { ProfileFormValues } from '@/features/profile/model/profileSchema';
import {
  BusinessProfile,
  toBusinessProfilePayload,
  useCreateBusinessProfile,
  useDeleteAccount,
  useUpdateBusinessProfile,
} from '@/entities/business-profile';
import {
  useBusinessCategories,
  useSubCategories,
  useDetailCategories,
} from '@/entities/business-category/model';
import { useCustomerAgeGroups } from '@/entities/customer-age-group/model';

/**
 * useMyPageEditForm
 * @param member - 사용자 정보
 * @param profile - 비즈니스 프로필 정보
 */
const useMyPageEditForm = (member: Member, profile?: BusinessProfile) => {
  const router = useRouter();
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const deleteAccount = useDeleteAccount();

  // 폼 세팅
  const methods = useProfileForm(member, profile);
  const { watch, handleSubmit, formState } = methods;
  const { isValid, dirtyFields } = formState;

  // 모달 상태
  const [isRequiredOpen, setRequiredOpen] = useState(false);
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const pendingData = useRef<ProfileFormValues | null>(null); //pendingData: 모달을 띄운 뒤 실제 저장할 폼 데이터를 잠깐 보관 / ProfileFormValues의 타입을 참조

  // 옵션 데이터
  const { data: ageOptions = [] } = useCustomerAgeGroups();
  const { data: categories = [] } = useBusinessCategories();
  const categoryId = watch('categoryId') ?? 0;
  const subCategoryId = watch('subCategoryId') ?? 0;
  const { data: subCategories = [] } = useSubCategories(categoryId);
  const { data: detailCategories = [] } = useDetailCategories(subCategoryId);

  // React Query 뮤테이션 훅은 항상 동일한 순서로 호출
  const updateMember = useUpdateMember();
  const createBP = useCreateBusinessProfile();
  const updateBP = useUpdateBusinessProfile();

  // 편집 모드 확인
  const isEditing = Boolean(profile?.placeName);

  // 저장 클릭 핸들러
  const onSaveClick = useCallback(() => {
    if (!isValid) {
      setRequiredOpen(true);
      return;
    }
    handleSubmit((data) => {
      pendingData.current = data;
      setSaveOpen(true);
    })();
  }, [isValid, handleSubmit]);

  // 저장 확정 핸들러
  const onConfirmSave = useCallback(() => {
    const data = pendingData.current;
    if (!data) return;

    const payload = toBusinessProfilePayload(data);

    updateMember.mutate(
      {
        name: data.name,
        email: data.placeEmail,
        instagram: data.instagram || '',
        threads: data.threads || '',
      },
      {
        onSuccess: () => {
          const mutateFn = isEditing ? updateBP.mutate : createBP.mutate;
          mutateFn(payload, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['business-profile'],
              });
              queryClient.invalidateQueries({
                queryKey: ['member'],
              });
              queryClient.invalidateQueries({
                queryKey: ['currentUser'],
              });
              openToast({ message: '저장되었습니다.' });
              router.push('/my?refresh=true');
            },
            onError: () => alert('사업장 정보 저장 중 오류'),
          });
        },
        onError: () => alert('회원 정보 저장 중 오류'),
      },
    );
    setSaveOpen(false);
  }, [
    updateMember,
    createBP,
    updateBP,
    queryClient,
    router,
    openToast,
    isEditing,
  ]);

  // 회원 탈퇴 핸들러
  const onDelete = useCallback(() => {
    deleteAccount.mutate();
    setDeleteOpen(false);
  }, [deleteAccount]);

  return {
    methods,
    data: {
      ageOptions,
      categories,
      subCategories,
      detailCategories,
      dirtyFields,
    },
    handlers: {
      onSaveClick,
      onConfirmSave,
      onDelete,
      openDelete: () => setDeleteOpen(true),
    },
    modals: { isRequiredOpen, setRequiredOpen, isSaveOpen, isDeleteOpen },
  };
};
export default useMyPageEditForm;
