import Banner from '@/features/main/ui/Banner';
import Introduce from '@/features/main/ui/Introduce';
import Flex from '@/shared/ui/layout/Flex';

const MainSection = () => {
  return (
    <Flex direction="col" className="w-full">
      <Banner />
      <Introduce />
    </Flex>
  );
};

export default MainSection;
