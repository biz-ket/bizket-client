import { InstagramLoginButton } from '@/features/auth/instagram/ui/InstagramLoginButton';
import Flex from '@/shared/ui/layout/Flex';

export default function Home() {
  return (
    <Flex
      className="h-screen text-white bg-gradient-to-r from-pink-500 to-yellow-500"
      align="center"
      justify="center"
    >
      초기 세팅 완료 🎉
      <InstagramLoginButton />
    </Flex>
  );
}
