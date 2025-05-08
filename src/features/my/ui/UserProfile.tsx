import { CurrentUser } from '@/features/auth/hooks/useCurrentUser';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

interface UserProfileProps {
  user: CurrentUser;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Flex
      justify="between"
      align="center"
      className="w-[360px] h-full rounded-20 bg-primary-50 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] px-35"
    >
      <div className="text-white">
        <span className="heading-sm">{user.nickname}</span>
        <Flex direction="col" gap={8} className="body-md-regular mt-27">
          <span>{user.placeEmail}</span>
          <span>{user.placePhoneNumber}</span>
        </Flex>
      </div>
      <div className="w-[126px] h-[126px] rounded-[50%] overflow-hidden bg-white">
        <Image
          src={'images/shared/character.svg'}
          width={126}
          height={126}
          alt="사용자 프로필 이미지"
        />
      </div>
    </Flex>
  );
};

export default UserProfile;
