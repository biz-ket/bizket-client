import PreviewSection from '@/features/create-marketing-viewer/ui/PreviewSection';
import TextViewList from '@/features/create-marketing-viewer/ui/TextViewList';
import Flex from '@/shared/ui/layout/Flex';

const ContentViewer = () => {
  return (
    <Flex className="w-full h-full px-32 py-34 bg-bg-10 rounded-20">
      <TextViewList />
      <PreviewSection />
    </Flex>
  );
};

export default ContentViewer;
