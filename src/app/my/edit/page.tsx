'use client';

import React, { useState } from 'react';
import Flex from '@/shared/ui/layout/Flex';
import Input from '@/shared/ui/input/Input';
import SelectBox from '@/shared/ui/input/SelectBox';
import Image from 'next/image';

export default function MyPageEdit() {
  // 기본 정보 상태
  const [name, setName] = useState('김비즈');
  const [brand, setBrand] = useState('오메이크업');
  const [email, setEmail] = useState('kyh@kakao.com');
  const [startDate, setStartDate] = useState('2024.12.01');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('9999');
  const [phone3, setPhone3] = useState('2222');

  // 셀렉트용 스태틱 옵션
  const categories = ['소매업', '서비스', '도소매'];
  const subCategories = ['화장품/뷰티', '패션', '식품'];
  const detailCategories = ['코스메틱 전문', '스킨케어 전문'];
  const ageOptions = ['10대 이하', '20대', '30대', '40대', '50대', '60대 이상'];

  // 선택 상태
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [detailCategory, setDetailCategory] = useState('');
  const [instagram, setInstagram] = useState('@ohmakeup');
  const [street, setStreet] = useState('서울 송파구 오금로18길 6 1층 104호');
  const [store, setStore] = useState('@ohmakeup');
  const [ageGroups, setAgeGroups] = useState<string[]>([]);

  // 연령대 토글
  const toggleAge = (age: string) => {
    setAgeGroups((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age],
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 헤더 */}
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

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 이름 */}
          <div>
            <label className="block mb-1 text-sm font-medium">이름</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
          </div>
          {/* 상호명 */}
          <div>
            <label className="block mb-1 text-sm font-medium">상호명</label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="상호명"
            />
          </div>
          {/* 이메일 */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              로그인 이메일
            </label>
            <Input value={email} readOnly />
          </div>
          {/* 사업 시작일 */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              사업 시작일
            </label>
            <Input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="YYYY.MM.DD"
            />
          </div>
          {/* 연락처 */}
          <div className="md:col-span-2 grid grid-cols-3 gap-2">
            {[phone1, phone2, phone3].map((val, i) => (
              <div key={i}>
                <label className="block mb-1 text-sm font-medium">
                  {i === 0 ? '연락처' : '\u00A0'}
                </label>
                <Input
                  value={val}
                  onChange={(e) =>
                    [setPhone1, setPhone2, setPhone3][i](e.target.value)
                  }
                  placeholder={i === 0 ? '010' : i === 1 ? '9999' : '2222'}
                />
              </div>
            ))}
          </div>

          {/* 업종 */}
          <div>
            <label className="block mb-1 text-sm font-medium">업종</label>
            <SelectBox
              id="category"
              placeholder="업종 선택"
              value={category}
              isSelected={!!category}
            >
              {categories.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => setCategory(opt)}
                >
                  {opt}
                </button>
              ))}
            </SelectBox>
          </div>

          {/* 세부업종 */}
          <div>
            <label className="block mb-1 text-sm font-medium">세부업종</label>
            <SelectBox
              id="subCategory"
              placeholder="세부업종 선택"
              value={subCategory}
              isSelected={!!subCategory}
            >
              {subCategories.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => setSubCategory(opt)}
                >
                  {opt}
                </button>
              ))}
            </SelectBox>
          </div>

          {/* 전문 분야 */}
          <div>
            <label className="block mb-1 text-sm font-medium">전문 분야</label>
            <SelectBox
              id="detailCategory"
              placeholder="전문 분야 선택"
              value={detailCategory}
              isSelected={!!detailCategory}
            >
              {detailCategories.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => setDetailCategory(opt)}
                >
                  {opt}
                </button>
              ))}
            </SelectBox>
          </div>

          {/* SNS 및 기타 */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              인스타그램 계정
            </label>
            <Input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@ohmakeup"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              사업장 주소
            </label>
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="주소 입력"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              스토어 계정
            </label>
            <Input
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="@ohmakeup"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              고객 연령층
            </label>
            <div className="flex flex-wrap gap-4">
              {ageOptions.map((age) => (
                <label key={age} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ageGroups.includes(age)}
                    onChange={() => toggleAge(age)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="text-sm">{age}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <Flex justify="end" className="mt-6 gap-4">
          <button type="button" className="h-12 px-6 border rounded-md">
            회원탈퇴
          </button>
          <button
            type="submit"
            className="h-12 px-6 bg-primary-50 text-white rounded-md"
          >
            저장하기
          </button>
        </Flex>
      </form>
    </div>
  );
}
