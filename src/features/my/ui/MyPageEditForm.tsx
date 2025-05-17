'use client';

import { useState, useRef } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  useSubCategories,
  useDetailCategories,
  useBusinessCategories,
} from '@/features/report/hooks/useBusinessCategories';
import { useCustomerAgeGroups } from '@/features/report/hooks/useCustomerAgeGroups';
import { useUpdateMember } from '@/features/auth/hooks/useUpdateMemberMutation';
import { useProfileForm } from '@/features/profile/hooks/useProfileForm';
import Flex from '@/shared/ui/layout/Flex';
import Input from '@/shared/ui/input/Input';
import AgeCheckbox from '@/features/create-marketing/ui/AgeCheckbox';
import Label from '@/features/my/ui/Label';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import { ProfileFormValues } from '@/features/profile/schema';

import { Member, useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import { BusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import OptionsList, { Option } from '@/features/my/ui/OptionList';
import OptionSelectBox from '@/features/my/ui/OptionSelectBox';

import SingleDatePicker from '@/features/my/ui/SingleDatePicker';
import { useDeleteAccount } from '@/features/auth/hooks/useDeleteAccount';
import CheckDeleteAccountModal from '@/features/update-my-info/ui/CheckDeleteAccountModal';
import CheckRequiredFieldModal from '@/shared/ui/modal/CheckRequiredFieldModal';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useToast } from '@/shared/context/ToastContext';
import {
  useUpdateBusinessProfile,
  useCreateBusinessProfile,
  BusinessProfilePayload,
} from '@/features/report/hooks/useUpdateBusinessProfileMutation';
import SaveConfirmModal from '@/shared/ui/modal/SaveConfirmModal';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  member: Member;
  profile: BusinessProfile;
}

export const MyPageEditForm = ({ member, profile }: Props) => {
  const router = useRouter();
  const deleteAccount = useDeleteAccount();
  const queryClient = useQueryClient();
  const { openToast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const pendingData = useRef<ProfileFormValues | null>(null);

  const { closeAllBoxes } = useSelectBoxStore();
  const { data: ageOptions = [] } = useCustomerAgeGroups();
  const { data: categories = [] } = useBusinessCategories();

  const { mutate: updateMember } = useUpdateMember();
  const updateBP = useUpdateBusinessProfile();
  const createBP = useCreateBusinessProfile();

  const { refetch: refetchUser } = useCurrentUser();
  const { refetch: refetchMember } = useMemberInfo();
  const methods = useProfileForm(member, profile);
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { isValid, dirtyFields },
  } = methods;

  const watchedCategoryId = watch('categoryId') ?? 0;
  const watchedSubCategoryId = watch('subCategoryId') ?? 0;
  const { data: subCategories = [] } = useSubCategories(watchedCategoryId);
  const { data: detailCategories = [] } =
    useDetailCategories(watchedSubCategoryId);

  const toYMD = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  };

  const handleSaveClick = () => {
    if (!isValid) {
      setIsRequiredModalOpen(true);
      return;
    }
    handleSubmit((data) => {
      pendingData.current = data;
      setIsSaveModalOpen(true);
    })();
  };

  const onSaved = () => {
    refetchUser();
    refetchMember();
    queryClient.invalidateQueries({
      queryKey: ['business-profile'],
    });
    openToast({ message: '저장되었습니다.' });
    router.push('/my?refresh=true');
  };

  const handleSaveConfirm = () => {
    if (!pendingData.current) return;
    const d = pendingData.current;
    const payload: BusinessProfilePayload = {
      placeName: d.brand,
      customerAgeGroupId: d.ageGroupId,
      businessCategoryId: d.categoryId,
      businessSubCategoryId: d.subCategoryId,
      businessDetailCategoryId: d.detailCategoryId,
      openDate: toYMD(d.startDate),
      address: d.street || '',
      placeEmail: d.placeEmail,
      placePhoneNumber: `${d.phone1}-${d.phone2}-${d.phone3}`,
    };

    // 1) 회원 정보 업데이트
    updateMember(
      {
        name: d.name,
        email: d.placeEmail,
        instagram: d.instagram!,
        threads: d.threads!,
      },
      {
        onSuccess: () => {
          const mutateFn = profile.placeName
            ? updateBP.mutate
            : createBP.mutate;
          mutateFn(payload, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['business-profile'],
              });
              onSaved();
            },
            onError: () => alert('사업장 정보 저장 중 오류가 발생했습니다.'),
          });
        },
        onError: () => alert('회원 정보 저장 중 오류가 발생했습니다.'),
      },
    );

    setIsSaveModalOpen(false);
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleModalClose = () => setIsDeleteModalOpen(false);
  const handleModalConfirm = () => {
    deleteAccount.mutate();
    setIsDeleteModalOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex gap-60 pt-56 pb-[165px]">
        {/* 오른쪽 컬럼: 회원 정보 */}
        <Flex className="flex-1" direction="col" gap={38} align="stretch">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              {...register('name', { required: '필수 입력입니다' })}
              placeholder="이름"
            />
          </div>

          <div>
            <Label htmlFor="email">로그인 이메일</Label>
            <Input
              id="email"
              {...register('placeEmail', { required: '필수 입력입니다' })}
              placeholder="example@mail.com"
            />
          </div>
          {/* 왼쪽: 연락처 라벨 */}
          <div>
            <div className="flex-none">
              <Label htmlFor="phone1">연락처</Label>
            </div>

            <Flex gap={8}>
              {(['phone1', 'phone2', 'phone3'] as const).map((field, i) => (
                <div key={field}>
                  <Input
                    id={field}
                    inputMode="numeric" // 모바일 숫자 키패드
                    maxLength={4}
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const t = e.currentTarget;
                      // 비숫자 전부 지우고, 앞 4자리만 남김
                      t.value = t.value.replace(/\D/g, '').slice(0, 4);
                    }}
                    {...register(field, {
                      required: '필수 입력입니다',
                      pattern: {
                        value: /^\d*$/,
                        message: '숫자만 입력할 수 있습니다',
                      },
                      maxLength: {
                        value: 4,
                        message: '최대 4자리까지 입력 가능합니다',
                      },
                    })}
                    placeholder={i === 0 ? '010' : i === 1 ? '1234' : '5678'}
                  />
                </div>
              ))}
            </Flex>
          </div>

          <div>
            <Label htmlFor="instagram">인스타그램 계정</Label>
            <Input
              id="instagram"
              {...register('instagram', { required: '필수 입력입니다' })}
              placeholder="@your_account"
            />
          </div>

          <div>
            <Label htmlFor="threads">스레드 계정</Label>
            <Input
              id="threads"
              {...register('threads', { required: '필수 입력입니다' })}
              placeholder="@your_threads"
            />
          </div>
        </Flex>

        {/* 왼쪽 컬럼: 사업장 정보 */}
        <Flex className="flex-1" direction="col" gap={38} align="stretch">
          <div>
            <Label htmlFor="brand">상호명</Label>
            <Input
              id="brand"
              {...register('brand', { required: '필수 입력입니다' })}
              placeholder="상호명"
            />
          </div>

          <div>
            <Label htmlFor="startDate">사업 시작일</Label>
            <SingleDatePicker control={control} name="startDate" />
          </div>

          <div>
            <Label>업종</Label>
            <Flex gap={18} align="stretch">
              {/* 대분류 */}
              <div className="flex-1">
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <OptionSelectBox
                      id="category"
                      placeholder="대분류"
                      value={
                        categories.find((c) => c.id === field.value)?.name || ''
                      }
                      isSelected={!!dirtyFields.categoryId}
                    >
                      <OptionsList
                        options={categories.map<Option>((c) => ({
                          id: c.id,
                          label: c.name,
                        }))}
                        activeId={field.value!}
                        onSelect={(id) => {
                          field.onChange(id as number);
                          methods.setValue('subCategoryId', null);
                          methods.setValue('detailCategoryId', null);
                          closeAllBoxes();
                        }}
                      />
                    </OptionSelectBox>
                  )}
                />
              </div>

              {/* 중분류 */}
              <div className="flex-1">
                <Controller
                  control={control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <OptionSelectBox
                      id="subCategory"
                      placeholder="중분류"
                      value={
                        subCategories.find((sc) => sc.id === field.value)
                          ?.name || ''
                      }
                      isSelected={!!dirtyFields.subCategoryId}
                    >
                      <OptionsList
                        options={subCategories.map<Option>((sc) => ({
                          id: sc.id,
                          label: sc.name,
                        }))}
                        activeId={field.value!}
                        onSelect={(id) => {
                          field.onChange(id as number);
                          methods.setValue('detailCategoryId', null);
                          closeAllBoxes();
                        }}
                      />
                    </OptionSelectBox>
                  )}
                />
              </div>

              {/* 소분류 */}
              <div className="flex-1">
                <Controller
                  control={control}
                  name="detailCategoryId"
                  render={({ field }) => (
                    <OptionSelectBox
                      id="detailCategory"
                      placeholder="소분류"
                      value={
                        detailCategories.find((dc) => dc.id === field.value)
                          ?.name || ''
                      }
                      isSelected={!!dirtyFields.detailCategoryId}
                    >
                      <OptionsList
                        options={detailCategories.map<Option>((dc) => ({
                          id: dc.id,
                          label: dc.name,
                        }))}
                        activeId={field.value!}
                        onSelect={(id) => {
                          field.onChange(id as number);
                          closeAllBoxes();
                        }}
                      />
                    </OptionSelectBox>
                  )}
                />
              </div>
            </Flex>
          </div>

          <div>
            <Label htmlFor="street">사업장 주소</Label>
            <Input
              id="street"
              {...register('street', { required: '필수 입력입니다' })}
              placeholder="주소 입력"
            />
          </div>

          <div>
            <Label>고객 연령층</Label>
            <Controller
              control={control}
              name="ageGroupId"
              render={({ field }) => (
                <div className="grid grid-cols-4 gap-6">
                  {ageOptions.map((age) => (
                    <AgeCheckbox
                      key={age.id}
                      label={age.label}
                      isChecked={field.value === age.id}
                      onClick={() => field.onChange(age.id)}
                      labelClassName="body-lg-regular"
                    />
                  ))}
                </div>
              )}
            />
          </div>

          <Flex justify="end" className="mt-6" gap={20}>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="flex-1 h-65 px-6 border rounded-10 label-xl-medium text-font-20"
            >
              회원탈퇴
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              // disabled={!isValid || isSubmitting}
              className="flex-1 h-65 px-6 bg-primary-50 text-white rounded-10 label-xl-medium disabled:opacity-50"
            >
              저장하기
            </button>
          </Flex>

          {/* {!isValid && (
            <p className="text-red-500 text-center mt-4">
              필수 항목을 모두 입력해주세요.
            </p>
          )} */}
        </Flex>
      </form>

      {/* 회원 탈퇴 모달 */}
      {isDeleteModalOpen && (
        <CheckDeleteAccountModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}

      {/* 필수 항목 미입력 모달 */}
      {isRequiredModalOpen && (
        <CheckRequiredFieldModal
          usePortal
          onClose={() => setIsRequiredModalOpen(false)}
        />
      )}

      {/* 저장 확인 모달 */}
      {isSaveModalOpen && (
        <SaveConfirmModal
          usePortal
          onClose={() => setIsSaveModalOpen(false)}
          onConfirm={handleSaveConfirm}
        />
      )}
    </FormProvider>
  );
};

export default MyPageEditForm;
