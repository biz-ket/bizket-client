import ContentSection from '@/features/create-marketing/ContentSection';
import SidebarContainer from '@/features/create-sidebar/SidebarContainer';
import Flex from '@/shared/ui/layout/Flex';

const CreatePage = () => {
  return (
    <Flex className="w-full" align="stretch">
      <SidebarContainer />
      <ContentSection />
    </Flex>
  );
};

export default CreatePage;
