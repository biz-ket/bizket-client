'use client';

import { Control, Controller } from 'react-hook-form';
import ToggleGroup from './ToggleGroup';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface GenderToggleGroupProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const GenderToggleGroup = ({ control }: GenderToggleGroupProps) => {
  return (
    <Controller
      control={control}
      name="gender"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        return (
          <ToggleGroup.Root
            defaultValue="all"
            onValueChange={(value) => onChange(value)}
            value={value}
            className="w-full h-full grid grid-cols-3 gap-[12px]"
          >
            <ToggleGroup.Item value="all">전체</ToggleGroup.Item>
            <ToggleGroup.Item value="f">여성</ToggleGroup.Item>
            <ToggleGroup.Item value="m">남성</ToggleGroup.Item>
          </ToggleGroup.Root>
        );
      }}
    />
  );
};

export default GenderToggleGroup;
