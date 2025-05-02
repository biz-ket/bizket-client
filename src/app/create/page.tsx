import ContentSection from '@/features/create-marketing-viewer/ui/ContentSection';
import FormSection from '@/features/create-marketing/ui/FormSection';
import SidebarContainer from '@/features/create-sidebar/ui/SidebarContainer';
import Flex from '@/shared/ui/layout/Flex';

const CreatePage = () => {
  return (
    <Flex className="w-full" align="stretch">
      <SidebarContainer />
      <FormSection />
      <ContentSection />
      <div className="flex-1 bg-red-200"></div>
    </Flex>
  );
};

export default CreatePage;
