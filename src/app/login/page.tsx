import { InstagramLoginButton } from '@/features/auth/instagram/ui/InstagramLoginButton';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="relative min-h-scree">
      <Flex className="h-screen">
        <Flex direction="col" justify="between" className="h-screen flex-1">
          <Flex
            justify="center"
            align="center"
            direction="col"
            className="w-full flex-1"
          >
            <Link href="/">
              <Image
                src="/images/shared/logo.svg"
                width={239}
                height={55}
                alt="비즈킷 로고"
                priority
              />
            </Link>
            <p className="text-font-30 pt-19 pb-60 body-lg-regular">
              인스타그램 계정으로 로그인해 주세요.
            </p>
            <InstagramLoginButton />
            <Link
              href="https://www.instagram.com/accounts/emailsignup/"
              target="_blank"
            >
              <button className="title-sm mt-15 mb-28 py-18 text-font-30 border border-line-40 rounded-14 w-[421px]">
                인스타그램 계정 생성하기
              </button>
            </Link>
            <p className="text-center text-font-20">
              원활한 서비스 이용을 위해, 개인 계정이 아닌
              <br />
              사업자용 계정 생성 후 로그인해 주세요.
            </p>
          </Flex>

          <Flex
            justify="center"
            align="center"
            direction="col"
            gap={6}
            className="w-full text-center text-font-20 pb-[70px]"
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
        </Flex>

        <div className="relative h-screen w-auto">
          <Image
            src={`/images/login/login-banner.svg`}
            alt="비즈킷 로그인 이미지"
            width={800}
            height={1200}
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'cover',
            }}
            priority
          />
        </div>
      </Flex>
    </div>
  );
};

export default LoginPage;
