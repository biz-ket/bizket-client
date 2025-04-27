'use client';

import Flex from '@/shared/ui/layout/Flex';
import Card from './Card';
import { ReactNode, useCallback } from 'react';
import DeviceToggleGroup from './DeviceToggleGroup';
import DateRangePicker from './DateRangePicker';
import GenderToggleGroup from './GenderToggleGroup';
import AgeSlider from './AgeSlider';
import InitiateIcon from './InitiateIcon';
import { Control } from 'react-hook-form';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface SearchFiltersProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const SearchFilters = ({ control }: SearchFiltersProps) => {
  const onClickInitiateButton = useCallback(() => {
    control._reset();
  }, [control]);

  return (
    <Card className="w-full h-[310px] mt-80 flex-col justify-center items-center">
      <div className="w-[905px] h-[127px] grid grid-cols-2 grid-rows-2">
        <Item title="기간">
          <DateRangePicker control={control} />
        </Item>
        <Item title="범위">
          <DeviceToggleGroup control={control} />
        </Item>
        <Item title="성별">
          <GenderToggleGroup control={control} />
        </Item>
        <Item title="연령선택">
          <AgeSlider control={control} />
        </Item>
      </div>

      <div className="w-[1028px] h-1 bg-line-10 mt-38 mb-16" />

      <Flex align="center" className="w-[905px]">
        <span className="body-md-regular text-font-20 block flex-1">
          ※ 기간은 2016년 1월 이후부터 조회가능합니다.
        </span>
        <button
          className="flex gap-2 items-center"
          onClick={onClickInitiateButton}
          type="button"
        >
          <span className="body-md-regular text-font-20">초기화하기</span>
          <InitiateIcon fill="#999999" />
        </button>
        <button
          type="submit"
          className="bg-font-40 text-white label-xl-semibold rounded-[50px] flex justify-center items-center px-50 py-10 ml-22"
        >
          검색하기
        </button>
      </Flex>
    </Card>
  );
};

interface ItemProps {
  title: string;
  children: ReactNode;
}

const Item = ({ title, children }: ItemProps) => {
  return (
    <Flex align="center" gap={21}>
      <span className="flex-1 text-end body-lg-semibold">{title}</span>
      <div className="w-[342px] h-[48px] flex justify-center items-center">
        {children}
      </div>
    </Flex>
  );
};

export default SearchFilters;
