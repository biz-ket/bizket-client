import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';

const user: {
  nickname: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
} = {
  nickname: '김비즈',
  email: 'kyh@kakao.com',
  phone: '010-9999-2222',
};

const UserProfile = () => {
  return (
    <Flex
      justify="between"
      align="center"
      className="w-[360px] h-full rounded-20 bg-primary-50 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] px-35"
    >
      <div className="text-white">
        <span className="heading-sm">{user.nickname}</span>
        <Flex direction="col" gap={8} className="body-md-regular mt-27">
          <span>{user.email}</span>
          <span>{user.phone}</span>
        </Flex>
      </div>
      <div className="w-[126px] h-[126px] rounded-[50%] overflow-hidden bg-white">
        <Image
          src={user.profileImageUrl ?? 'images/shared/character.svg'}
          width={126}
          height={126}
          alt="사용자 프로필 이미지"
        />
      </div>
    </Flex>
  );
};

export default UserProfile;
