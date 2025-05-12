import { CurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

interface UserProfileProps {
  user: CurrentUser;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { data: memberInfo } = useMemberInfo();

  return (
    <Flex
      justify="between"
      align="center"
      className="w-[360px] h-full rounded-20 bg-primary-50 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] px-35"
    >
      <div className="text-white overflow-hidden">
        <div className="heading-sm max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {user.nickname}
        </div>
        <Flex direction="col" gap={8} className="body-md-regular mt-27">
          <div className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {user.placeEmail}
          </div>
          <div className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {user.placePhoneNumber}
          </div>
        </Flex>
      </div>
      <div className="w-[126px] h-[126px] shrink-0 rounded-[50%] overflow-hidden bg-white">
        <Image
          src={memberInfo?.profileImageUrl || 'images/shared/profile.svg'}
          width={126}
          height={126}
          alt="사용자 프로필 이미지"
        />
      </div>
    </Flex>
  );
};

export default UserProfile;
