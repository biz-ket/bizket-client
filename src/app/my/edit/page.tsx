'use client';

import { Controller } from 'react-hook-form';
import Flex from '@/shared/ui/layout/Flex';
import Input from '@/shared/ui/input/Input';
import SelectBox from '@/shared/ui/input/SelectBox';
import Header from '@/features/my/ui/Header';
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
import Container from '@/shared/ui/layout/Container';
import Label from '@/features/my/ui/Label';
import { useRef, useEffect } from 'react';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';

export default function MyPageEdit() {
  const { data: member, isLoading: memLoading } = useMemberInfo();
  const { data: profile, isLoading: profLoading } = useBusinessProfile();
  const { mutate: updateMember } = useUpdateMember();
  const { mutate: updateBusinessProfile } = useUpdateBusinessProfile();

  const router = useRouter();
  const { closeAllBoxes } = useSelectBoxStore();

  const { data: ageOptions = [] } = useCustomerAgeGroups();
  const { data: categories = [] } = useBusinessCategories();
  const methods = useProfileForm(member!, profile!);

  const {
    watch,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = methods;

  const watchedCategoryId = watch('categoryId') ?? 0;
  const watchedSubCategoryId = watch('subCategoryId') ?? 0;

  const isFirstCat = useRef(true);
  const isFirstSub = useRef(true);

  // 대분류가 실제 변경됐을 때에만 중/소분류 초기화
  useEffect(() => {
    if (isFirstCat.current) {
      isFirstCat.current = false;
      return; // 첫 마운트 때는 초기화하지 않음
    }
    setValue('subCategoryId', null);
    setValue('detailCategoryId', null);
  }, [watchedCategoryId, setValue]);

  // 중분류가 실제 변경됐을 때에만 소분류 초기화
  useEffect(() => {
    if (isFirstSub.current) {
      isFirstSub.current = false;
      return;
    }
    setValue('detailCategoryId', null);
  }, [watchedSubCategoryId, setValue]);

  // 훅 호출
  const { data: subCategories = [] } = useSubCategories(watchedCategoryId);
  const { data: detailCategories = [] } =
    useDetailCategories(watchedSubCategoryId);

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
    <>
      <Header title="마이페이지" subtitle="정보수정" />
      <Container>
        <Flex justify="between" align="center" className="mt-90">
          <div>
            <h1 className="title-xl-semibold mb-10">
              내 정보를 입력해서 사업을 성장시키세요!
            </h1>
            <p className="body-md-regular text-font-30">
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
              <Input {...register('startDate')} placeholder="YYYY.MM.DD" />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            {/* 업종 */}
            <div>
              <Label>업종</Label>
              <Flex gap={18}>
                {/* 대분류 선택 */}
                <div>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <SelectBox
                        id="category"
                        placeholder="대분류"
                        value={
                          categories.find((c) => c.id === field.value)?.name ||
                          ''
                        }
                        // isSelected={!!field.value}
                        isSelected={!!dirtyFields.categoryId}
                      >
                        {categories.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                            onClick={() => {
                              field.onChange(c.id);
                              methods.setValue('subCategoryId', null);
                              methods.setValue('detailCategoryId', null);
                              closeAllBoxes();
                              // setSelectedCategoryId(c.id);
                              // setSelectedSubCategoryId(null);
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
                  <Controller
                    control={control}
                    name="subCategoryId"
                    render={({ field }) => (
                      <SelectBox
                        id="subCategory"
                        placeholder="중분류"
                        value={
                          subCategories.find((sc) => sc.id === field.value)
                            ?.name || ''
                        }
                        // isSelected={!!field.value}
                        isSelected={!!dirtyFields.categoryId}
                      >
                        {subCategories.map((sc) => (
                          <button
                            key={sc.id}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                            onClick={() => {
                              field.onChange(sc.id);
                              methods.setValue('detailCategoryId', null);
                              closeAllBoxes();
                              // setSelectedSubCategoryId(sc.id);
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
                  <Controller
                    control={control}
                    name="detailCategoryId"
                    render={({ field }) => (
                      <SelectBox
                        id="detailCategory"
                        placeholder="소분류"
                        value={
                          detailCategories.find((dc) => dc.id === field.value)
                            ?.name || ''
                        }
                        // isSelected={!!field.value}
                        isSelected={!!dirtyFields.categoryId}
                      >
                        {detailCategories.map((dc) => (
                          <button
                            key={dc.id}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                            onClick={() => {
                              field.onChange(dc.id);
                              closeAllBoxes();
                            }}
                          >
                            {dc.name}
                          </button>
                        ))}
                      </SelectBox>
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
                <p className="text-red-500 text-sm">
                  {errors.ageGroupIds.message}
                </p>
              )}
            </div>
            <Flex justify="end" className="mt-6" align="stretch" gap={20}>
              <button
                type="button"
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
      </Container>
    </>
  );
}
