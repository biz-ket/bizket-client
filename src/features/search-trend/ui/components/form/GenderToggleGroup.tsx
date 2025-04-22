'use client';

import ToggleGroup from './ToggleGroup';

const GenderToggleGroup = () => {
  return (
    <ToggleGroup.Root
      defaultValue="ALL"
      className="w-full h-full grid grid-cols-3 gap-[12px]"
    >
      <ToggleGroup.Item value="ALL">전체</ToggleGroup.Item>
      <ToggleGroup.Item value="FEMALE">여성</ToggleGroup.Item>
      <ToggleGroup.Item value="MALE">남성</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default GenderToggleGroup;
