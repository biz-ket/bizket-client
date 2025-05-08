import Preview from '@/features/create-marketing-viewer/ui/Preview';
import { useGetMarketingDetail } from '@/shared/hooks/useGetMarketingDetail';
import { useTabStore } from '@/shared/store/useTabStore';
import Flex from '@/shared/ui/layout/Flex';

const PreviewSection = () => {
  const { activeTab } = useTabStore();
  const { data: marketingDetailData } = useGetMarketingDetail('1');

  console.log(marketingDetailData);

  return (
    <Flex justify="center" align="center" className="relative flex-1 h-full">
      <Preview isHistory={activeTab === 'history'} />
    </Flex>
  );
};

export default PreviewSection;
