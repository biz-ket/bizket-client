import Flex from '@/shared/ui/layout/Flex';

const platform: {
  instagram: string;
  thread: string;
} = {
  instagram: 'ohmakeup',
  thread: 'ohmakeup_official',
};

const PlatformProfile = () => {
  return (
    <div className="flex-1 h-full ml-42">
      <Flex direction="col" gap={58}>
        <div className="body-sm-regular text-font-20">{`플랫폼 정보 >`}</div>
        <div>
          <Flex className="body-md-regular">
            <div className="text-font-20 w-98">인스타그램</div>
            <div>{platform.instagram}</div>
          </Flex>
          <Flex>
            <div className="text-font-20 w-98">스레드</div>
            <div>{platform.thread}</div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default PlatformProfile;
