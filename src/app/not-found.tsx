import Link from 'next/link';
import Image from 'next/image';
import Flex from '@/shared/ui/layout/Flex';

const NotFoundPage = () => (
  <Flex
    direction="col"
    align="center"
    justify="center"
    className="fixed inset-0 z-[9999] bg-white"
  >
    <Link href="/">
      <Image
        src={`/images/shared/logo.svg`}
        width={155}
        height={35}
        alt="비즈킷 로고"
      />
    </Link>
    <Image
      src="/images/shared/404page.png"
      width={330}
      height={330}
      alt="404"
      className="mt-45 mb-15"
    />
    <h1 className="text-30 font-semibold mb-10">
      요청하신 페이지를 찾을 수 없습니다.
    </h1>
    <p className="bodr-lg-lagular text-font-20 mb-43">
      페이지 에러로 접근할 수 없습니다. 입력하신 주소가 정확한지 확인해 주세요.
    </p>
    <Link
      href="/"
      className="mt-5 title-sm-bold text-font-10 rounded-[100px] bg-primary-50 px-55 py-15"
    >
      홈으로 가기
    </Link>
  </Flex>
);

export default NotFoundPage;
