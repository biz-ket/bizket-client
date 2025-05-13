import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import CommentIcon from '@/features/create-marketing-viewer/ui/CommentIcon';
import MenuIcon from '@/features/create-marketing-viewer/ui/MenuIcon';
import SaveIcon from '@/features/create-marketing-viewer/ui/SaveIcon';
import ShareIcon from '@/features/create-marketing-viewer/ui/ShareIcon';
import WishIcon from '@/features/create-marketing-viewer/ui/WishIcon';
import { MarketingHistoryItem } from '@/features/create-marketing/types/apiType';
import { useMarketingLoadingStore } from '@/shared/store/useMarketingStore';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ThreadIcons from '@/features/create-marketing-viewer/ui/ThreadIcons';
import MemberOnlyModal from '@/shared/ui/modal/MemberOnlyModal';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

interface PreviewProps {
  isHistory?: boolean;
  data: MarketingHistoryItem;
}

export const Preview = ({ isHistory, data }: PreviewProps) => {
  const { isSuccess } = useMarketingLoadingStore();
  const { data: userData } = useMemberInfo();

  const { token } = useAuthStore();

  return isSuccess || isHistory ? (
    <div className="relative overflow-hidden rounded-10 preview">
      <div className="w-[425px]  bg-white min-h-[600px] max-h-[820px] overflow-auto ">
        {!token ? (
          <>
            <Flex
              justify="between"
              align="center"
              className="w-full px-16 py-17"
            >
              <Flex align="center" gap={8}>
                <div className="relative overflow-hidden border-gray-300 rounded-full w-35 h-35">
                  <Image
                    style={{ objectFit: 'cover' }}
                    fill
                    src={'/images/shared/default-profile.png'}
                    alt="유저 프로필 이미지1"
                  />
                </div>
                <p className="body-lg-semibold text-font-50">김비즈</p>
              </Flex>
              <MenuIcon />
            </Flex>
            <div className="relative w-full h-[495px] bg-black/20"></div>
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
                <span className="mr-5 label-lg-semibold text-font-50">
                  김비즈
                </span>
                <pre className="inline body-md-regular text-font-40">
                  여리여리 분위기 가득 Mocha mousse 🤎
                  <br />
                  올해의 팬톤 컬러 #모카무스 메이크업 🤎☕️
                  <br />
                  <br />
                  makeup @makeup_jin hair @._.oh.in.
                  <br />
                  <br />
                  💌메이크업 예약 및 문의 👉🏻프로필링크 카카오채널
                  <br />
                  #모카무스메이크업 #모카무스 #촬영메이크업 #잠실메이크업
                </pre>
                <p className="body-sm-regular text-font-50 mt-15">
                  #김비즈 #마케팅팅
                </p>
              </div>
            </Flex>
            <MemberOnlyModal usePortal={false} />
          </>
        ) : data?.platform === 'instagram' ? (
          <>
            <Flex
              justify="between"
              align="center"
              className="w-full px-16 py-17"
            >
              <Flex align="center" gap={8}>
                <div className="relative overflow-hidden border-gray-300 rounded-full w-35 h-35">
                  <Image
                    style={{ objectFit: 'cover' }}
                    fill
                    src={
                      userData?.profileImageUrl ||
                      '/images/shared/default-profile.png'
                    }
                    alt="유저 프로필 이미지1"
                  />
                </div>
                <p className="body-lg-semibold text-font-50">
                  {userData?.instagramAccountId || '김비즈'}
                </p>
              </Flex>
              <MenuIcon />
            </Flex>
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full h-[495px]"
            >
              {data?.imageUrls.map((image, index) => (
                <SwiperSlide key={`insta-${index}`}>
                  <div className="relative w-full h-[495px]">
                    <Image
                      src={
                        isHistory
                          ? image
                          : image || '/images/create-marketing/preview.png'
                      }
                      style={{ objectFit: 'cover' }}
                      fill
                      alt="미리보기 이미지"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
                <span className="mr-5 label-lg-semibold text-font-50">
                  {userData?.instagramAccountId}
                </span>
                <pre className="inline body-md-regular text-font-40">
                  {data?.generatedContent}
                </pre>
                <p className="body-sm-regular text-font-50 mt-15">
                  {data?.hashtags.join(' ')}
                </p>
              </div>
            </Flex>
          </>
        ) : data?.platform === 'threads' ? (
          <>
            <Flex
              justify="between"
              align="center"
              className="w-full px-16 py-17"
            >
              <Flex align="center" gap={8}>
                <div className="relative overflow-hidden border-gray-300 rounded-full w-35 h-35">
                  <Image
                    style={{ objectFit: 'cover' }}
                    fill
                    src={
                      userData?.profileImageUrl ||
                      '/images/shared/default-profile.png'
                    }
                    alt="유저 프로필 이미지"
                  />
                </div>
                <p className="body-lg-semibold text-font-50">
                  {userData?.instagramAccountId || '김비즈'}
                </p>
              </Flex>
              <MenuIcon />
            </Flex>
            <Flex direction="col" gap={14} className="w-full px-26 pb-60">
              <>
                <pre className="inline body-md-regular text-font-40">
                  {data?.generatedContent}
                </pre>
                <p className="body-sm-regular text-font-50 mt-15">
                  {data?.hashtags.join(' ')}
                </p>
              </>
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full h-[200px] rounded-10 overflow-hidden"
              >
                {data?.imageUrls.map((image, index) => (
                  <SwiperSlide key={`thread-${index}`}>
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={
                          isHistory
                            ? image
                            : image || '/images/create-marketing/preview.png'
                        }
                        style={{ objectFit: 'cover' }}
                        fill
                        alt="미리보기 이미지"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <ThreadIcons />
            </Flex>
          </>
        ) : null}
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
