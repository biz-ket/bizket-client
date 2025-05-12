import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import Flex from '@/shared/ui/layout/Flex';

const PlatformProfile = () => {
  const { data } = useMemberInfo();

  return (
    <div className="flex-1 h-full overflow-hidden pl-42 pt-37">
      {data && (
        <Flex direction="col" gap={58}>
          <div className="body-sm-regular text-font-20">{`플랫폼 정보 >`}</div>
          <div>
            <Flex className="body-md-regular">
              <div className="text-font-20 w-98">인스타그램</div>
              <div>{data.instagramAccountId}</div>
            </Flex>
            <Flex>
              <div className="text-font-20 w-98">스레드</div>
              <div>{data.threadsAccountId}</div>
            </Flex>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default PlatformProfile;
