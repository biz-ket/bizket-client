'use client';

import PreviewSection from '@/features/create-marketing-viewer/ui/PreviewSection';
import TextViewList from '@/features/create-marketing-viewer/ui/TextViewList';
import { useTabStore } from '@/shared/store/useTabStore';
import Flex from '@/shared/ui/layout/Flex';

const ContentViewer = () => {
  const { activeTab } = useTabStore();

  return (
    <Flex className="w-full h-full px-32 py-34 bg-bg-10 rounded-20">
      {activeTab === 'create' && <TextViewList />}
      <PreviewSection />
    </Flex>
  );
};

export default ContentViewer;
