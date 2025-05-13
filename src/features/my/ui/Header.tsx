import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

interface HeaderProps {
  title: string;
  userName?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  subtitle?: string;
}

const Header = ({ title, userName, action, subtitle }: HeaderProps) => {
  return (
    <div className="w-full bg-black h-[216px]">
      <Container>
        <div className="pt-92 relative">
          <span className="body-lg-bold text-primary-50">{title}</span>

          {subtitle ? (
            <p className="mt-9 text-white heading-sm">{subtitle}</p>
          ) : (
            <Flex align="center" className="mt-9">
              {userName && (
                <p className="text-white heading-sm">
                  안녕하세요,{' '}
                  <span className="text-primary-50">{userName}</span>님!
                </p>
              )}
              {action && (
                <button
                  className="ml-20 label-md-semibold text-white border-white border rounded-20 flex justify-center items-center px-12 py-6"
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              )}
            </Flex>
          )}

          <Image
            className="absolute right-95 top-45"
            src={`/images/my/header-shapes.svg`}
            alt="헤더 장식"
            width={242}
            height={171}
          />
        </div>
      </Container>
    </div>
  );
};
export default Header;
