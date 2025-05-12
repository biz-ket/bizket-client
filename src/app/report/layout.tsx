'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import MemberOnlyModal from '@/shared/ui/modal/MemberOnlyModal';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import Flex from '@/shared/ui/layout/Flex';
import Container from '@/shared/ui/layout/Container';

const ReportLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  const handleClose = () => {
    router.back();
  };

  if (!token) {
    return (
      <>
        <MemberOnlyModal usePortal onClose={handleClose} />

        <Container>
          <Flex gap={35} className="pt-90 pb-80">
            <Skeleton className="w-[400px] h-[635px] rounded-20" />
            <Flex direction="col" className="flex-1 w-full gap-4">
              <Skeleton as="div" count={10} className="h-[50px] w-full mb-14" />
            </Flex>
          </Flex>
        </Container>
      </>
    );
  }

  return <>{children}</>;
};
export default ReportLayout;
