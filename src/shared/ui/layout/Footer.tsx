import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full pt-80 pb-[105px] bg-black">
      <Container>
        <Flex direction="col" className="w-full">
          <Flex justify="between" className="w-full">
            <Flex direction="col" gap={140}>
              <Link href={'/'}>
                <Image
                  width={187}
                  height={42}
                  src="/images/shared/logo-white.svg"
                  alt="푸터 로고"
                />
              </Link>
              <p className="body-md-regular text-line-30">
                © 2025 BIZKET. All Rights Reserved.
              </p>
            </Flex>
            <Flex justify="between" className="w-[736px]">
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">서비스 이용약관</p>
                <Link href="#" className="text-white/70 body-md-regular">
                  저작권 정보
                </Link>
                <Link href="#" className="text-white/70 body-md-regular">
                  개인정보처리방침
                </Link>
              </Flex>
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">이용 문의</p>
                <p className="text-white/70 body-md-regular">
                  nyeonui@gmail.com
                </p>
                <p className="text-white/70 body-md-regular">010-0000-0000</p>
              </Flex>
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">빠른 링크</p>
                <Link href="/create" className="text-white/70 body-md-regular">
                  마케팅 콘텐츠 생성 AI
                </Link>
                <Link href="/report" className="text-white/70 body-md-regular">
                  비지니스보고서
                </Link>
                <Link
                  href="/search-trend"
                  className="text-white/70 body-md-regular"
                >
                  검색어 트렌드
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
