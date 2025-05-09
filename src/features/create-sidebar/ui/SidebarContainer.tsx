'use client';

import CreateIcon from '@/features/create-sidebar/ui/CreateIcon';
import HistoryIcon from '@/features/create-sidebar/ui/HistoryIcon';
import SidebarIcon from '@/features/create-sidebar/ui/SidebarIcon';
import SideButton from '@/features/create-sidebar/ui/SideButton';
import { useTabStore } from '@/shared/store/useTabStore';
import Flex from '@/shared/ui/layout/Flex';

const SidebarContainer = () => {
  const { isTabOpen, toggleTab, activeTab, setActiveTab } = useTabStore();

  const handleChangeTab = (tab: 'create' | 'history') => {
    setActiveTab(tab);
  };

  return (
    <Flex
      direction="col"
      gap={10}
      className="relative z-10 px-4 py-12 bg-white border-r w-72 border-line-20"
    >
      <SideButton
        label="사이드바"
        isActive={!isTabOpen}
        icon={<SidebarIcon fill={isTabOpen ? '#666' : '#FF7900'} />}
        onClick={toggleTab}
      />
      <SideButton
        label="콘텐츠생성"
        icon={
          <CreateIcon
            fill={isTabOpen && activeTab === 'create' ? '#FF7900' : '#666'}
          />
        }
        onClick={() => handleChangeTab('create')}
        isActive={isTabOpen && activeTab === 'create'}
      />
      <SideButton
        label="생성이력"
        icon={
          <HistoryIcon
            fill={isTabOpen && activeTab === 'history' ? '#FF7900' : '#666'}
          />
        }
        onClick={() => handleChangeTab('history')}
        isActive={isTabOpen && activeTab === 'history'}
      />
    </Flex>
  );
};

export default SidebarContainer;
