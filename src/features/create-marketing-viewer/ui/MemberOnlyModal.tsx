'use client';

import Modal from '@/shared/ui/modal/Modal';
import { useRouter } from 'next/navigation';

const MemberOnlyModal = () => {
  const router = useRouter();

  return (
    <Modal usePortal={false} width={303}>
      <Modal.Header>회원 전용 서비스</Modal.Header>
      <Modal.Body>
        <Modal.Image src="/images/modal/lock.svg" alt="자물쇠 이미지" />
        <Modal.MessageContainer>
          <Modal.Message>회원 전용 서비스</Modal.Message>
          <Modal.SubMessage>
            플랫폼 미리보기는 회원에게만
            <br />
            제공되는 서비스입니다.
          </Modal.SubMessage>
        </Modal.MessageContainer>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button onClick={() => router.push('/login')} variant="primary">
          로그인하기
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberOnlyModal;
