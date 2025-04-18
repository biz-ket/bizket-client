import CreateIcon from '@/features/create-sidebar/CreateIcon';
import HistoryIcon from '@/features/create-sidebar/HistoryIcon';
import SidebarIcon from '@/features/create-sidebar/SidebarIcon';
import SideButton from '@/features/create-sidebar/SideButton';
import Flex from '@/shared/ui/layout/Flex';

const SidebarContainer = () => {
  return (
    <Flex
      direction="col"
      gap={10}
      className="h-screen px-4 py-12 border-r w-72 border-line-20"
    >
      <SideButton label="사이드바" icon={<SidebarIcon />} />
      <SideButton
        label="콘텐츠생성"
        icon={<CreateIcon fill="#FF7900" />}
        isActive
      />
      <SideButton label="생성이력" icon={<HistoryIcon />} />
    </Flex>
  );
};

export default SidebarContainer;
