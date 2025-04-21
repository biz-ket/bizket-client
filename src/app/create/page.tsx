import ContentSection from '@/features/create-marketing/ContentSection';
import SidebarContainer from '@/features/create-sidebar/SidebarContainer';
import Flex from '@/shared/ui/layout/Flex';

const CreatePage = () => {
  return (
    <Flex className="w-full" align="stretch">
      <SidebarContainer />
      <ContentSection />
      <div className="flex-1 bg-red-200"></div>
    </Flex>
  );
};

export default CreatePage;
