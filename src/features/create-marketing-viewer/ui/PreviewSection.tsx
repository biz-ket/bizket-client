import Preview from '@/features/create-marketing-viewer/ui/Preview';
import Flex from '@/shared/ui/layout/Flex';

const PreviewSection = () => {
  return (
    <Flex justify="center" align="center" className="relative flex-1 h-full">
      <Preview />
    </Flex>
  );
};

export default PreviewSection;
