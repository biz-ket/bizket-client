import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const Header = () => {
  const onClickEditButton = () => {
    //TODO: navigate to edit page
  };

  return (
    <div className="w-full bg-black h-[216px]">
      <Container>
        <div className="pt-92 relative">
          <span className="body-lg-bold text-primary-50">마이페이지</span>
          <Flex align="center" className="mt-9">
            <p className="text-white heading-sm">
              안녕하세요, <span className="text-primary-50">김비즈</span>님!
            </p>
            <button
              className="ml-20 label-md-semibold text-white border-white border rounded-20 flex justify-center items-center px-12 py-6"
              onClick={onClickEditButton}
            >
              내 정보 수정
            </button>
          </Flex>
          <Image
            className="absolute right-0 top-45"
            src={`images/my/header-shapes.svg`}
            alt="마이페이지 헤더 장식"
            width={242}
            height={171}
          />
        </div>
      </Container>
    </div>
  );
};

export default Header;
