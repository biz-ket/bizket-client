'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  useSubCategories,
  useDetailCategories,
  useBusinessCategories,
} from '@/features/report/hooks/useBusinessCategories';
import { useCustomerAgeGroups } from '@/features/report/hooks/useCustomerAgeGroups';
import { useUpdateMember } from '@/features/auth/hooks/useUpdateMemberMutation';
import { useUpdateBusinessProfile } from '@/features/report/hooks/useUpdateBusinessProfileMutation';
import { useProfileForm } from '@/features/profile/hooks/useProfileForm';
import Flex from '@/shared/ui/layout/Flex';
import Input from '@/shared/ui/input/Input';
import AgeCheckbox from '@/features/create-marketing/ui/AgeCheckbox';
import Label from '@/features/my/ui/Label';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import { ProfileFormValues } from '@/features/profile/schema';

import { Member } from '@/features/auth/hooks/useMemberInfo';
import { BusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import OptionsList, { Option } from '@/features/my/ui/OptionList';
import OptionSelectBox from '@/features/my/ui/OptionSelectBox';

import SingleDatePicker from '@/features/my/ui/SingleDatePicker';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteAccount } from '@/features/auth/hooks/useDeleteAccount';
import { useState } from 'react';
import CheckDeleteAccountModal from '@/features/update-my-info/ui/CheckDeleteAccountModal';

interface Props {
  member: Member;
  profile: BusinessProfile;
}

export const MyPageEditForm = ({ member, profile }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteAccount = useDeleteAccount();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { closeAllBoxes } = useSelectBoxStore();
  const { data: ageOptions = [] } = useCustomerAgeGroups();
  const { data: categories = [] } = useBusinessCategories();
  const { mutate: updateMember } = useUpdateMember();
  const { mutate: updateBusinessProfile } = useUpdateBusinessProfile();

  const methods = useProfileForm(member, profile);
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = methods;

  const watchedCategoryId = watch('categoryId') ?? 0;
  const watchedSubCategoryId = watch('subCategoryId') ?? 0;
  const { data: subCategories = [] } = useSubCategories(watchedCategoryId);
  const { data: detailCategories = [] } =
    useDetailCategories(watchedSubCategoryId);

  const toYMD = (d: Date) => d.toISOString().slice(0, 10);
  const onSubmit = (data: ProfileFormValues) => {
    if (!confirm('변경사항을 저장하시겠습니까?')) return;
    updateMember(
      {
        name: data.name,
        email: data.email,
        instagram: data.instagram ?? '',
        threads: data.threads ?? '',
      },
      {
        onSuccess: () => {
          updateBusinessProfile(
            {
              brand: data.brand,
              openDate: toYMD(data.startDate),
              phone1: data.phone1,
              phone2: data.phone2,
              phone3: data.phone3,
              categoryId: data.categoryId,
              subCategoryId: data.subCategoryId,
              detailCategoryId: data.detailCategoryId,
              street: data.street ?? '',
              ageGroupIds: data.ageGroupIds,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['businessProfile'],
                });
                queryClient.invalidateQueries({ queryKey: ['member'] });

                alert('저장에 성공했습니다.');
                router.push('/my');
              },
              onError: () => alert('사업장 정보 저장 중 오류가 발생했습니다.'),
            },
          );
        },
        onError: () => alert('회원 정보 저장 중 오류가 발생했습니다.'),
      },
    );
  };
  // 버튼 클릭 시 모달 열기
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // 모달에서 취소
  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // 모달에서 탈퇴 확정
  const handleModalConfirm = () => {
    deleteAccount.mutate();
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-60 pt-56 pb-[165px]"
      >
        {/* 오른쪽 */}
        <Flex className="flex-1" direction="col" gap={38} align="stretch">
          {/* 이름 */}
          <div>
            <Label htmlFor="name">이름</Label>
            <Input {...register('name')} placeholder="이름" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* 로그인 이메일 */}
          <div>
            <Label htmlFor="email">로그인 이메일</Label>
            <Input {...register('email')} readOnly />
          </div>
          {/* 연락처 */}
          <Flex gap={18}>
            {(['phone1', 'phone2', 'phone3'] as const).map((field, i) => (
              <div key={field}>
                <Label htmlFor="phone">연락처</Label>
                <Input
                  {...register(field)}
                  placeholder={i === 0 ? '010' : i === 1 ? '1234' : '5678'}
                />
              </div>
            ))}
          </Flex>
          {/* 계정 및 정보 */}
          <div>
            <Label htmlFor="instagram">인스타그램 계정</Label>
            <Input {...register('instagram')} placeholder="@your_account" />
          </div>
          <div>
            <Label htmlFor="threads">스레드 계정</Label>
            <Input {...register('threads')} placeholder="@your_threads" />
          </div>
        </Flex>
        {/* 왼쪽 */}
        <Flex className="flex-1" align="stretch" direction="col" gap={38}>
          {/* 상호명 */}
          <div>
            <Label htmlFor="brand">상호명</Label>
            <Input {...register('brand')} placeholder="상호명" />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          {/* 사업 시작일 */}
          <div>
            <Label htmlFor="startDate">사업 시작일</Label>
            <SingleDatePicker
              control={control}
              name="startDate"
              // {...register('startDate')}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
          {/* 업종 */}
          <div>
            <Label>업종</Label>
            <Flex gap={18} align="stretch">
              {/* 대분류 선택 */}
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
                        activeId={field.value ?? undefined}
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
              {/* 중분류 선택 */}
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
                        activeId={field.value ?? undefined}
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
              {/* 소분류 선택 */}
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
                        activeId={field.value ?? undefined}
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
          {/* 주소 */}
          <div>
            <Label htmlFor="street">사업장 주소</Label>
            <Input {...register('street')} placeholder="주소 입력" />
          </div>
          {/* 고객 연령층 */}
          <div>
            <Label htmlFor="ageGroupIds">고객 연령층</Label>
            <Controller
              control={control}
              name="ageGroupIds"
              render={({ field }) => (
                <div className="grid grid-cols-4 grid-rows-2 gap-x-6 gap-y-17">
                  {ageOptions.map((age) => (
                    <AgeCheckbox
                      key={age.id}
                      label={age.label}
                      isChecked={field.value.includes(age.id)}
                      labelClassName="body-lg-regular"
                      onClick={() => {
                        const updated = field.value.includes(age.id)
                          ? field.value.filter((a) => a !== age.id)
                          : [...field.value, age.id];
                        field.onChange(updated);
                      }}
                    />
                  ))}
                </div>
              )}
            />
            {errors.ageGroupIds && (
              <p className="text-red-500 text-sm">
                {errors.ageGroupIds.message}
              </p>
            )}
          </div>
          <Flex justify="end" className="mt-6" align="stretch" gap={20}>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="flex-1 h-65 px-6 border rounded-10 label-xl-medium text-font-20"
            >
              회원탈퇴
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-65 px-6 bg-primary-50 text-white rounded-10 label-xl-medium"
            >
              저장하기
            </button>
          </Flex>
        </Flex>
      </form>
      {isDeleteModalOpen && (
        <CheckDeleteAccountModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};
export default MyPageEditForm;
