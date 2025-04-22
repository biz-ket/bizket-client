'use client';

import ToggleGroup from './ToggleGroup';

const DeviceToggleGroup = () => {
  return (
    <ToggleGroup.Root
      defaultValue="ALL"
      className="w-full h-full grid grid-cols-3 gap-[12px]"
    >
      <ToggleGroup.Item value="ALL">전체</ToggleGroup.Item>
      <ToggleGroup.Item value="MOBILE">모바일</ToggleGroup.Item>
      <ToggleGroup.Item value="PC">PC</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default DeviceToggleGroup;
