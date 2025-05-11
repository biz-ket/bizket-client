import { InstagramLoginButton } from '@/features/auth/instagram/ui/InstagramLoginButton';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <Flex className="relative min-h-scree">
      <div className="flex-1 relative">
        <Flex
          justify="center"
          align="center"
          direction="col"
          className="w-full h-[calc(100vh-60px)]"
        >
          <Image
            src={`/images/shared/logo.svg`}
            width={239}
            height={55}
            alt="비즈킷 로고"
            priority
          />
          <p className="text-font-30 pt-19 pb-60 body-lg-regular">
            인스타그램 계정으로 로그인해주세요.
          </p>
          <InstagramLoginButton />
          <button className="title-sm mt-15 mb-28 py-18 text-font-30 border border-line-40 rounded-14 w-[421px]">
            인스타그램 계정 생성하기
          </button>
          <div className="text-center text-font-20">
            <p className="body-lg-regular">
              원활한 서비스 이용을 위해, 개인 계정이 아닌
              <br />
              사업자용 계정 생성 후 로그인해주세요.
            </p>
          </div>
        </Flex>
        <Flex
          justify="center"
          align="center"
          direction="col"
          gap={6}
          className="text-center w-full text-font-20 absolute bottom-70"
        >
          <p>CONTACT US</p>
          <p>© 2025 BIZKET. All Rights Reserved.</p>
          <div className="flex justify-center items-center">
            <p>이용약관</p>
            <span
              className="inline-block w-[1px] h-[13px] bg-font-20 mx-8"
              aria-hidden="true"
            />
            <p>개인정보 처리방침</p>
          </div>
        </Flex>
      </div>
      <div className="flex-1 relative w-1/2 h-screen top-[-60px]">
        <Image src="/images/login/login-banner.svg" fill alt="로그인 배경" />
      </div>
    </Flex>
  );
};

export default LoginPage;
