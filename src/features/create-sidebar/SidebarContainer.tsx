'use client';

import CreateIcon from '@/features/create-sidebar/CreateIcon';
import HistoryIcon from '@/features/create-sidebar/HistoryIcon';
import SidebarIcon from '@/features/create-sidebar/SidebarIcon';
import SideButton from '@/features/create-sidebar/SideButton';
import { useTabStore } from '@/shared/store/useTabStore';
import Flex from '@/shared/ui/layout/Flex';

const SidebarContainer = () => {
  const { activeTab, setActiveTab } = useTabStore();

  const handleChangeTab = (tab: 'create' | 'history') => {
    setActiveTab(tab);
  };

  return (
    <Flex
      direction="col"
      gap={10}
      className="h-[calc(100vh-87px)] px-4 py-12 border-r w-72 border-line-20"
    >
      <SideButton label="사이드바" icon={<SidebarIcon />} />
      <SideButton
        label="콘텐츠생성"
        icon={<CreateIcon fill={activeTab === 'create' ? '#FF7900' : '#666'} />}
        onClick={() => handleChangeTab('create')}
        isActive={activeTab === 'create'}
      />
      <SideButton
        label="생성이력"
        icon={
          <HistoryIcon fill={activeTab === 'history' ? '#FF7900' : '#666'} />
        }
        onClick={() => handleChangeTab('history')}
        isActive={activeTab === 'history'}
      />
    </Flex>
  );
};

export default SidebarContainer;
