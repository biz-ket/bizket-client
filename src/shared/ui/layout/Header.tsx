import LoginIcon from '@/shared/ui/icons/LoginIcon';
import MyIcon from '@/shared/ui/icons/MyIcon';
import Flex from '@/shared/ui/layout/Flex';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isDark = pathname.includes('/report') || pathname.includes('/my');
  const isFull = pathname.includes('/create');

  return (
    <header
      className={clsx(
        'flex items-center w-full h-60 border-b',
        isDark ? 'border-line-40 bg-black' : 'border-line-20 bg-white',
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between  m-auto transition-[0.3s]',
          isFull ? 'w-full pl-74 pr-84' : 'w-[1200px]',
        )}
      >
        <Flex align="center" gap={40}>
          <Image
            src={`/images/shared/${isDark ? 'logo-white.svg' : 'logo.svg'}`}
            width={117}
            height={25}
            alt="비즈킷 로고"
          />
          <nav>
            <ul
              className={clsx(
                'flex items-center gap-40',
                isDark ? 'text-white' : 'text-font-60',
              )}
            >
              <li>
                <Link href={'/create'} className="body-md-regular">
                  마케팅 콘텐츠 생성 AI
                </Link>
              </li>
              <li>
                <Link href={'/report'} className="body-md-regular">
                  비즈니스 보고서
                </Link>
              </li>
              <li>
                <Link href={'/search-trend'} className="body-md-regular">
                  검색어 트렌드
                </Link>
              </li>
            </ul>
          </nav>
        </Flex>
        <ul
          className={clsx(
            'flex items-center gap-20',
            isDark ? 'text-white' : 'text-font-60',
          )}
        >
          <li>
            <Link
              href={'/my'}
              className="flex items-center gap-6 body-md-regular"
            >
              <MyIcon fill={isDark ? 'white' : 'black'} />
              마이페이지
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className="flex items-center gap-6 body-md-regular"
            >
              <LoginIcon fill={isDark ? 'white' : 'black'} />
              로그인
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
