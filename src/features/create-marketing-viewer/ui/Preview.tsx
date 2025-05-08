import CommentIcon from '@/features/create-marketing-viewer/ui/CommentIcon';
import MenuIcon from '@/features/create-marketing-viewer/ui/MenuIcon';
import SaveIcon from '@/features/create-marketing-viewer/ui/SaveIcon';
import ShareIcon from '@/features/create-marketing-viewer/ui/ShareIcon';
import WishIcon from '@/features/create-marketing-viewer/ui/WishIcon';
import { useMarketingLoadingStore } from '@/shared/store/useMarketingStore';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const testText =
  '여리여리 분위기 가득 Mocha mousse 🤎\n올해의 팬톤 컬러 #모카무스 메이크업 🤎☕️\n\nmakeup @makeup_jin \nhair @._.oh.in. \n\n💌메이크업 예약 및 문의 \n👉🏻프로필링크 카카오채널';

interface PreviewProps {
  isHistory?: boolean;
}

export const Preview = ({ isHistory }: PreviewProps) => {
  const { isSuccess } = useMarketingLoadingStore();

  return isSuccess || isHistory ? (
    <div className="overflow-hidden rounded-10">
      <div className="w-[425px]  bg-white h-[820px] overflow-auto ">
        <Flex justify="between" align="center" className="w-full px-16 py-17">
          <Flex align="center" gap={8}>
            <div className="bg-gray-300 rounded-full w-35 h-35"></div>
            <p className="body-lg-semibold text-font-50">김비즈</p>
          </Flex>
          <MenuIcon />
        </Flex>
        <div className="w-full h-[495px] relative">
          <Image
            src="/images/create-marketing/preview.png"
            style={{ objectFit: 'cover' }}
            fill
            alt="미리보기 이미지"
          />
        </div>
        <Flex direction="col" gap={12} className="w-full px-16 py-12">
          <Flex justify="between" className="w-full">
            <Flex align="center" gap={13}>
              <WishIcon />
              <CommentIcon />
              <ShareIcon />
            </Flex>
            <SaveIcon />
          </Flex>
          <div>
            <span className="mr-5 label-lg-semibold text-font-50">김비즈</span>{' '}
            <pre className="inline">{testText}</pre>
          </div>
        </Flex>
      </div>
      <Flex
        justify="center"
        align="center"
        className="relative w-full h-47 bg-primary-50"
      >
        <p className="text-white body-md-medium">콘텐츠 미리보기 화면</p>
        <div className="absolute bottom-0 right-45">
          <Image
            src="/images/create-marketing/preview-character.svg"
            width={87}
            height={71}
            alt="비즈킷 캐릭터"
          />
        </div>
      </Flex>
    </div>
  ) : (
    <Flex
      direction="col"
      justify="center"
      align="center"
      gap={28}
      className="w-[425px] rounded-10 bg-white py-[280px]"
    >
      <Image
        src="/images/create-marketing/pencil.png"
        width={136}
        height={136}
        alt="콘텐츠 생성 전 이미지"
      />
      <Flex direction="col" align="center" gap={10}>
        <p className="text-center text-black title-sm">
          생성하고 싶은
          <br />
          콘텐츠를 입력해 보세요.
        </p>
        <p className="body-md-regular text-font-20">
          콘텐츠를 미리보실 수 있습니다.
        </p>
      </Flex>
    </Flex>
  );
};

export default Preview;
