import Flex from '@/shared/ui/layout/Flex';
import BusinessProfile from './BusinessProfile';
import PlatformProfile from './PlatformProfile';

const AdditionalInfo = () => {
  return (
    <Flex className="flex-1 h-full rounded-20 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]">
      <BusinessProfile />
      <div className="bg-line-30 w-[0.5px] h-full" />
      <PlatformProfile />
    </Flex>
  );
};

export default AdditionalInfo;
