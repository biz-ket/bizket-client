import TextViewBox from '@/features/create-marketing-viewer/ui/TextViewBox';
import { useMarketingLoadingStore } from '@/shared/store/useMarketingStore';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const TextViewList = () => {
  const testContent = '테스트 글자 \n테스트 테스트 \n\n테스트 테스트';
  const testHash = '#테스트 #좋아요 #인스타';

  const { isLoading, isSuccess } = useMarketingLoadingStore();

  return (
    <Flex direction="col" gap={10}>
      {!isSuccess && (
        <Flex
          direction="col"
          gap={20}
          justify="center"
          align="center"
          className="w-[380px] rounded-20 py-[113px] bg-white"
        >
          {isLoading && (
            <>
              <Image
                src={'/images/create-marketing/content-loading.png'}
                width={93}
                height={88}
                alt="콘텐츠 로딩 중 이미지"
              />
              <Flex direction="col" align="center" gap={3}>
                <p className="body-md-regular text-font-30">
                  SNS 콘텐츠 생성 중!
                </p>
                <p className="text-center body-sm-regular text-font-20">
                  창을 닫으면, 생성이 중단됩니다
                </p>
              </Flex>
              <p className="py-5 px-9 body-sm-regular text-font-20 bg-bg-10 rounded-8">
                9초 / 15초 예상
              </p>
            </>
          )}
          {!isSuccess && !isLoading && (
            <>
              <Image
                src={'/images/create-marketing/prev-list-image.png'}
                width={100}
                height={111}
                alt="콘텐츠 생성 전 이미지"
              />
              <Flex direction="col" align="center" gap={3}>
                <p className="body-md-regular text-font-30">
                  콘텐츠를 생성해주세요
                </p>
                <p className="text-center body-sm-regular text-font-20">
                  생성하기 버튼을 누르고 간편하게
                  <br />
                  게시물을 작성해보세요!{' '}
                </p>
              </Flex>
            </>
          )}
        </Flex>
      )}

      {isSuccess && (
        <Flex direction="col" gap={16} className="w-[380px]">
          <TextViewBox content={testContent} />
          <TextViewBox content={testHash} />
        </Flex>
      )}
    </Flex>
  );
};

export default TextViewList;
