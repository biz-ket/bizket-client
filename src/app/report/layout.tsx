'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import MemberOnlyModal from '@/shared/ui/modal/MemberOnlyModal';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import Flex from '@/shared/ui/layout/Flex';
import Container from '@/shared/ui/layout/Container';

export const ReportLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(!token);
  }, [token]);

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  if (showModal) {
    return (
      <>
        <MemberOnlyModal usePortal onClose={handleClose} />

        <Container>
          <Flex gap={35} className="pt-90 pb-80">
            <Skeleton className="w-[400px] h-[635px] rounded-20" />
            <Skeleton as="div" count={5} className="h-[127px] flex-1 mb-4" />
          </Flex>
        </Container>
      </>
    );
  }

  return <>{children}</>;
};
export default ReportLayout;
