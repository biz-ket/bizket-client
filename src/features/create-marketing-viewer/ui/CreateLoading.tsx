import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const CreateLoading = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-black/60 z-modal"
    >
      <Flex
        direction="col"
        gap={14}
        align="center"
        className="w-[343px] bg-white rounded-10 py-28"
      >
        <div className="py-3 px-25 rounded-8 bg-primary-10 label-md-semibold text-primary-60">
          로딩 중
        </div>
        <p className="title-sm text-font-50">SNS 콘텐츠 생성 중!</p>
        <p className="body-md-regular text-font-20">곧 콘텐츠가 완성됩니다.</p>
        <Flex direction="col" align="center" gap={8}>
          <Image
            src="/images/create-marketing/create-loading.png"
            width={155}
            height={142}
            alt="로딩 이미지"
          />
          <p className="body-sm-regular text-line-40">9초 / 15초 예상</p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateLoading;
