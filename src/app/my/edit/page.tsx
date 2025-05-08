'use client';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Flex from '@/shared/ui/layout/Flex';
import Input from '@/shared/ui/input/Input';
import SelectBox from '@/shared/ui/input/SelectBox';
import Image from 'next/image';
import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import { useBusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import {
  useBusinessCategories,
  useSubCategories,
  useDetailCategories,
} from '@/features/report/hooks/useBusinessCategories';
import { useCustomerAgeGroups } from '@/features/report/hooks/useCustomerAgeGroups';
import { useUpdateMember } from '@/features/auth/hooks/useUpdateMemberMutation';
import { useUpdateBusinessProfile } from '@/features/report/hooks/useUpdateBusinessProfileMutation';
import { useProfileForm } from '@/features/profile/hooks/useProfileForm';
import { ProfileFormValues } from '@/features/profile/schema';
import AgeCheckbox from '@/features/create-marketing/ui/AgeCheckbox';
import { useRouter } from 'next/navigation';

export default function MyPageEdit() {
  const { data: member, isLoading: memLoading } = useMemberInfo();
  const { data: profile, isLoading: profLoading } = useBusinessProfile();
  const { mutate: updateMember } = useUpdateMember();
  const { mutate: updateBusinessProfile } = useUpdateBusinessProfile();

  const router = useRouter();

  const { data: ageOptions = [] } = useCustomerAgeGroups();
  const { data: categories = [] } = useBusinessCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const { data: subCategories = [] } = useSubCategories(
    selectedCategoryId ?? 0,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);
  const { data: detailCategories = [] } = useDetailCategories(
    selectedSubCategoryId ?? 0,
  );

  const methods = useProfileForm(member, profile);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  if (memLoading || profLoading) return <div>로딩 중...</div>;

  const onSubmit = async (data: ProfileFormValues) => {
    if (!confirm('변경사항을 저장하시겠습니까?')) return;

    // 1) 멤버 정보 업데이트
    updateMember(
      {
        name: data.name,
        email: data.email,
        instagram: data.instagram ?? '',
        threads: data.threads ?? '',
      },
      {
        onError: () => {
          alert('회원 정보 저장 중 오류가 발생했습니다.');
        },
        onSuccess: () => {
          // 사업장 정보 업데이트
          updateBusinessProfile(
            {
              brand: data.brand,
              openDate: data.startDate,
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
              onError: () => {
                alert('사업장 정보 저장 중 오류가 발생했습니다.');
              },
              onSuccess: () => {
                alert('저장에 성공했습니다.');
                router.push('/my');
              },
            },
          );
        },
      },
    );
  };
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Flex justify="between" align="start" className="mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            내 정보를 입력해서 사업을 성장시키세요!
          </h1>
          <p className="text-sm text-gray-600">
            비즈니스 보고서와 트렌드 키워드 검색에서 마케팅 인사이트를 얻을 수
            있습니다.
          </p>
        </div>

        <Flex gap={4}>
          <div className="w-[125px] h-[125px] relative rounded-full overflow-hidden border">
            <Image src="/images/shared/profile.svg" fill alt="프로필" />
          </div>
        </Flex>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 이름 */}
        <div>
          <label className="block mb-1 text-sm font-medium">이름</label>
          <Input {...register('name')} placeholder="이름" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* 상호명 */}
        <div>
          <label className="block mb-1 text-sm font-medium">상호명</label>
          <Input {...register('brand')} placeholder="상호명" />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>
        {/* 로그인 이메일 */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            로그인 이메일
          </label>
          <Input {...register('email')} readOnly />
        </div>

        {/* 사업 시작일 */}
        <div>
          <label className="block mb-1 text-sm font-medium">사업 시작일</label>
          <Input {...register('startDate')} placeholder="YYYY.MM.DD" />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>

        {/* 연락처 */}
        <div className="md:col-span-2 grid grid-cols-3 gap-2">
          {(['phone1', 'phone2', 'phone3'] as const).map((field, i) => (
            <div key={field}>
              <label className="block mb-1 text-sm font-medium">
                {i === 0 ? '연락처' : '\u00A0'}
              </label>
              <Input
                {...register(field)}
                placeholder={i === 0 ? '010' : i === 1 ? '1234' : '5678'}
              />
            </div>
          ))}
        </div>
        <Flex gap={2}>
          {/* 대분류 선택 */}
          <div>
            <label className="block mb-1 text-sm font-medium">업종</label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <SelectBox
                  id="category"
                  placeholder="업종 선택"
                  value={
                    categories.find((c) => c.id === field.value)?.name || ''
                  }
                  isSelected={!!field.value}
                >
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        field.onChange(c.id);
                        setSelectedCategoryId(c.id);
                        setSelectedSubCategoryId(null);
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </SelectBox>
              )}
            />
          </div>

          {/* 중분류 선택 */}
          <div>
            <label className="block mb-1 text-sm font-medium">세부업종</label>
            <Controller
              control={control}
              name="subCategoryId"
              render={({ field }) => (
                <SelectBox
                  id="subCategory"
                  placeholder="세부업종 선택"
                  value={
                    subCategories.find((sc) => sc.id === field.value)?.name ||
                    ''
                  }
                  isSelected={!!field.value}
                >
                  {subCategories.map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        field.onChange(sc.id);
                        setSelectedSubCategoryId(sc.id);
                      }}
                    >
                      {sc.name}
                    </button>
                  ))}
                </SelectBox>
              )}
            />
          </div>

          {/* 소분류 선택 */}
          <div>
            <label className="block mb-1 text-sm font-medium">전문 분야</label>
            <Controller
              control={control}
              name="detailCategoryId"
              render={({ field }) => (
                <SelectBox
                  id="detailCategory"
                  placeholder="전문 분야 선택"
                  value={
                    detailCategories.find((dc) => dc.id === field.value)
                      ?.name || ''
                  }
                  isSelected={!!field.value}
                >
                  {detailCategories.map((dc) => (
                    <button
                      key={dc.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => field.onChange(dc.id)}
                    >
                      {dc.name}
                    </button>
                  ))}
                </SelectBox>
              )}
            />
          </div>
        </Flex>

        {/* 계정 및 정보 */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            인스타그램 계정
          </label>
          <Input {...register('instagram')} placeholder="@your_account" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">사업장 주소</label>
          <Input {...register('street')} placeholder="주소 입력" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">스레드 계정</label>
          <Input {...register('threads')} placeholder="@your_threads" />
        </div>

        {/* 고객 연령층 */}
        <div>
          <label className="block mb-1 text-sm font-medium">고객 연령층</label>
          <Controller
            control={control}
            name="ageGroupIds"
            render={({ field }) => (
              <div className="flex flex-wrap gap-4">
                {ageOptions.map((age) => (
                  <AgeCheckbox
                    key={age.id}
                    label={age.label}
                    isChecked={field.value.includes(age.id)}
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
            <p className="text-red-500 text-sm">{errors.ageGroupIds.message}</p>
          )}
        </div>
        <Flex justify="end" className="mt-6" gap={4}>
          <button type="button" className="w-100 h-50 px-6 border rounded-md">
            회원탈퇴
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-100 h-50 px-6 bg-primary-50 text-white rounded-md"
          >
            저장하기
          </button>
        </Flex>
      </form>
    </div>
  );
}
