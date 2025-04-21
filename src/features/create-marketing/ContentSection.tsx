'use client';

import CreateContent from '@/features/create-marketing/CreateContent';
import CreateHistory from '@/features/create-marketing/CreateHistory';
import { useTabStore } from '@/shared/store/useTabStore';

const ContentSection = () => {
  const { activeTab } = useTabStore();

  return (
    <div className="w-[526px] px-48 bg-white py-55 bg-primary-40">
      {activeTab === 'create' && <CreateContent />}
      {activeTab === 'history' && <CreateHistory />}
    </div>
  );
};

export default ContentSection;
