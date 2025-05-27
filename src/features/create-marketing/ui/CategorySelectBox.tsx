'use client';

import {
  useBusinessCategories,
  useSubCategories,
} from '@/entities/business-category/model';
import { useBusinessProfile } from '@/entities/business-profile';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import { useEffect, useState } from 'react';

interface CategorySelectBoxProps {
  onSelect: (value: string) => void;
  currentValue?: string;
}

const CategorySelectBox: React.FC<CategorySelectBoxProps> = ({ onSelect }) => {
  interface Category {
    id: number;
    name: string;
  }

  type categoryType = Category | null;

  const [selectCategory, setSelectCategory] = useState<categoryType>(null);
  const [selectSubCategory, setSelectSubCategory] =
    useState<categoryType>(null);

  const { data: businessData } = useBusinessProfile();
  const { data: categoryData } = useBusinessCategories();
  const { data: categorySubData } = useSubCategories(selectCategory?.id);

  const handleChangeCategory = (category: categoryType) => {
    setSelectCategory(category);
  };

  const handleChangeSubCategory = (category: categoryType) => {
    setSelectSubCategory(category);
  };

  const toggleBox = useSelectBoxStore((state) => state.toggleBox);

  const handleApply = () => {
    if (!selectCategory) return;

    onSelect(`${selectCategory.name}-${selectSubCategory?.name}`);
  };

  const handleBack = () => {
    toggleBox('category');
  };

  useEffect(() => {
    setSelectCategory({
      id: Number(businessData?.businessCategoryId),
      name: businessData?.businessCategoryName || '',
    });
    setSelectSubCategory({
      id: Number(businessData?.businessSubCategoryId),
      name: businessData?.businessSubCategoryName || '',
    });
  }, [businessData]);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex">
        <div className="w-[140px]">
          {categoryData?.map((category) => (
            <div
              key={category.id}
              className={`px-12 py-[10.5px] flex justify-between items-center cursor-pointer hover:bg-primary-10 ${
                selectCategory?.name === category.name
                  ? 'bg-primary-10 text-primary-50'
                  : ''
              }`}
              onClick={() => handleChangeCategory(category)}
            >
              <span>{category.name}</span>
              {selectCategory?.name === category.name && (
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
          {categorySubData && categorySubData?.length > 0 && (
            <div
              className={`px-12 py-[10.5px] cursor-pointer hover:bg-primary-10 ${
                '전체' === selectSubCategory?.name
                  ? 'bg-primary-10 text-primary-50'
                  : ''
              }`}
              onClick={() => handleChangeSubCategory({ id: 999, name: '전체' })}
            >
              전체
            </div>
          )}

          {categorySubData && categorySubData?.length > 0 ? (
            categorySubData?.map((subcategory, index) => (
              <div
                key={index}
                className={`px-12 py-[10.5px] cursor-pointer hover:bg-primary-10 ${
                  subcategory?.name === selectSubCategory?.name
                    ? 'bg-primary-10 text-primary-50'
                    : ''
                }`}
                onClick={() => handleChangeSubCategory(subcategory)}
              >
                {subcategory?.name}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full text-black body-sm-regular">
              대분류를 선택해주세요.
            </div>
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
