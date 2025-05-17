'use client';

import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import { useState, useEffect } from 'react';

interface CategorySelectBoxProps {
  onSelect: (value: string) => void;
  currentValue?: string; // 현재 선택된 값 props 추가
}

// 카테고리 데이터 구조 정의
interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

const CategorySelectBox: React.FC<CategorySelectBoxProps> = ({
  onSelect,
  currentValue = '',
}) => {
  const categories: Category[] = [
    {
      id: 'cook',
      name: '요식업',
      subcategories: [
        '전체',
        '한식당',
        '중식당',
        '양식당',
        '일식당',
        '분식점',
        '카페-베이커리',
        '치킨-피자',
        'bars-펍',
        '기타',
      ],
    },
    {
      id: 'retail',
      name: '소매업',
      subcategories: [
        '전체',
        '편의점',
        '의류-패션',
        '슈퍼마켓',
        '잡화점',
        '문구-서적',
        '식품점',
        '화장품',
        '전자제품',
        '기타',
      ],
    },
    {
      id: 'beauty',
      name: '뷰티-미용업',
      subcategories: [
        '전체',
        '헤어샵',
        '네일샵',
        '피부관리실',
        '메이크업숍',
        '마사지-스파',
        '왁싱',
        '반영구화장',
        '에스테틱',
        '기타',
      ],
    },
    {
      id: 'service',
      name: '생활서비스',
      subcategories: [
        '전체',
        '세탁소',
        '청소-방역',
        '렌터카-카셰어링',
        '헬스-피트니스',
        '반려동물 서비스',
        '주차장',
        '자동차 정비',
        '여행사',
        '기타',
      ],
    },
    {
      id: 'education',
      name: '교육-학원',
      subcategories: [
        '전체',
        '어학원',
        '미술-음악학원',
        '입시학원',
        '컴퓨터-IT학원',
        '댄스-체육학원',
        '요리학원',
        '보습학원',
        '외국어학원',
        '기타',
      ],
    },
    {
      id: 'real-estate',
      name: '부동산-임대업',
      subcategories: [
        '전체',
        '부동산중개소',
        '임대-렌탈',
        '창고-사무실',
        '공간대여',
        '상가-오피스텔',
        '주택임대',
        '컨설팅',
        '부동산개발',
        '기타',
      ],
    },
  ];

  const [selectedMainIndex, setSelectedMainIndex] = useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);

  const toggleBox = useSelectBoxStore((state) => state.toggleBox);

  useEffect(() => {
    if (currentValue) {
      const [categoryName, subcategoryName] = currentValue.split('/');

      const categoryIndex = categories.findIndex(
        (cat) => cat.name === categoryName,
      );
      if (categoryIndex >= 0) {
        setSelectedMainIndex(categoryIndex);

        const subcategoryIndex = categories[
          categoryIndex
        ].subcategories.findIndex((sub) => sub === subcategoryName);
        if (subcategoryIndex >= 0) {
          setSelectedSubIndex(subcategoryIndex);
        } else {
          setSelectedSubIndex(0);
        }
      }
    }
  }, [currentValue]);

  const handleMainCategoryClick = (index: number) => {
    setSelectedMainIndex(index);
    setSelectedSubIndex(0);
  };

  const handleSubCategoryClick = (index: number) => {
    setSelectedSubIndex(index);
  };

  const handleApply = () => {
    const category = categories[selectedMainIndex];
    const subcategory = category.subcategories[selectedSubIndex];

    if (selectedSubIndex === 0) {
      onSelect(`${category.name}/전체`);
    } else {
      onSelect(`${category.name}/${subcategory}`);
    }
  };

  const handleBack = () => {
    toggleBox('category');
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex">
        <div className="w-[140px]">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`px-12 py-[10.5px] flex justify-between items-center cursor-pointer hover:bg-primary-10 ${
                selectedMainIndex === index
                  ? 'bg-primary-10 text-primary-50'
                  : ''
              }`}
              onClick={() => handleMainCategoryClick(index)}
            >
              <span>{category.name}</span>
              {selectedMainIndex === index && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-50"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="w-[173px]">
          {categories[selectedMainIndex].subcategories.map(
            (subcategory, index) => (
              <div
                key={index}
                className={`px-12 py-[10.5px] cursor-pointer hover:bg-primary-10 ${
                  selectedSubIndex === index
                    ? 'bg-primary-10 text-primary-50'
                    : ''
                }`}
                onClick={() => handleSubCategoryClick(index)}
              >
                {subcategory}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 border-t border-line-30 p-14">
        <button
          className="flex items-center justify-center gap-6 border h-36 w-100 border-line-30 rounded-8 body-sm-regular text-font-40"
          onClick={handleBack}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.60526 4.26347V7.00031L0.5 3.57926L4.60526 0.158203V2.89505H8.02632C9.47803 2.89505 10.8703 3.47174 11.8968 4.49825C12.9233 5.52477 13.5 6.91702 13.5 8.36873C13.5 9.82044 12.9233 11.2127 11.8968 12.2392C10.8703 13.2657 9.47803 13.8424 8.02632 13.8424H1.86842V12.474H8.02632C9.1151 12.474 10.1593 12.0415 10.9292 11.2716C11.6991 10.5017 12.1316 9.45751 12.1316 8.36873C12.1316 7.27995 11.6991 6.23576 10.9292 5.46587C10.1593 4.69598 9.1151 4.26347 8.02632 4.26347H4.60526Z"
              fill="#666666"
            />
          </svg>
          뒤로가기
        </button>
        <button
          className="w-[176px] h-36 label-md-medium text-center text-white bg-primary-50 rounded-8"
          onClick={handleApply}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default CategorySelectBox;
