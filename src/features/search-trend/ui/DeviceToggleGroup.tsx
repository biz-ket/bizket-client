'use client';

import { Control, Controller } from 'react-hook-form';
import ToggleGroup from './ToggleGroup';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface DeviceToggleGroupProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const DeviceToggleGroup = ({ control }: DeviceToggleGroupProps) => {
  return (
    <Controller
      control={control}
      name="device"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <ToggleGroup.Root
          defaultValue="all"
          onValueChange={(value) => onChange(value)}
          value={value}
          className="w-full h-full grid grid-cols-3 gap-[12px]"
        >
          <ToggleGroup.Item value="all">전체</ToggleGroup.Item>
          <ToggleGroup.Item value="mo">모바일</ToggleGroup.Item>
          <ToggleGroup.Item value="pc">PC</ToggleGroup.Item>
        </ToggleGroup.Root>
      )}
    />
  );
};

export default DeviceToggleGroup;
