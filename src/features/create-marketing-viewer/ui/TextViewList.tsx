import TextViewBox from '@/features/create-marketing-viewer/ui/TextViewBox';
import Flex from '@/shared/ui/layout/Flex';

const TextViewList = () => {
  const testContent = '테스트 글자 \n테스트 테스트 \n\n테스트 테스트';
  const testHash = '#테스트 #좋아요 #인스타';

  return (
    <Flex direction="col" gap={16} className="w-[380px]">
      <TextViewBox content={testContent} />
      <TextViewBox content={testHash} />
    </Flex>
  );
};

export default TextViewList;
