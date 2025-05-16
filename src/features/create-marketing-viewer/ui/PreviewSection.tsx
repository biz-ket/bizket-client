import Preview from '@/features/create-marketing-viewer/ui/Preview';
import { useGetMarketingDetail } from '@/shared/hooks/useGetMarketingDetail';
import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import { useMarketingDataStore } from '@/shared/store/useMarketingStore';
import { useTabStore } from '@/shared/store/useTabStore';
import Flex from '@/shared/ui/layout/Flex';

const PreviewSection = () => {
  const { activeTab } = useTabStore();
  const { id } = useContentHistoryStore();

  const { data: marketingHistoryData } = useGetMarketingDetail(id);
  const { data: marketingViewData } = useMarketingDataStore();

  return (
    <Flex justify="center" className="relative flex-1 h-full">
      <Preview
        isHistory={activeTab === 'history'}
        data={
          activeTab === 'history' ? marketingHistoryData : marketingViewData
        }
      />
    </Flex>
  );
};

export default PreviewSection;
