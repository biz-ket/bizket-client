import Divider from '@/shared/ui/divider/Divider';
import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full pt-92 pb-[118px] bg-black">
      <Container>
        <Flex direction="col" gap={94} className="w-full">
          <Flex justify="between" className="w-full">
            <Image
              width={226}
              height={51}
              src="/images/shared/logo-white.svg"
              alt="푸터 로고"
            />
            <Flex justify="between" className="w-[736px]">
              <Flex direction="col" gap={30}>
                <p className="text-white body-lg-bold">서비스 이용약관</p>
                <Link href="#" className="text-white body-lg-regular">
                  저작권 정보
                </Link>
                <Link href="#" className="text-white body-lg-regular">
                  개인정보처리방침
                </Link>
              </Flex>
              <Flex direction="col" gap={30}>
                <p className="text-white body-lg-bold">이용 문의</p>
                <p className="text-white body-lg-regular">nyeonui@gmail.com</p>
                <p className="text-white body-lg-regular">010-9999-2222</p>
              </Flex>
              <Flex direction="col" gap={30}>
                <p className="text-white body-lg-bold">빠른 링크</p>
                <Link href="#" className="text-white body-lg-regular">
                  저작권 정보
                </Link>
                <Link href="/create" className="text-white body-lg-regular">
                  마케팅 콘텐츠 생성 AI
                </Link>
                <Link href="/report" className="text-white body-lg-regular">
                  비지니스보고서
                </Link>
                <Link
                  href="/search-trend"
                  className="text-white body-lg-regular"
                >
                  검색어 트렌드
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="col" gap={40} className="w-full">
            <Divider />
            <p className="body-md-regular text-line-30">
              © 2025 BIZKET. All Rights Reserved.
            </p>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
