'use client';

import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { ModalProps } from '@/shared/types/modalProps';

interface MemberOnlyModalProps extends ModalProps {
  onClose?: () => void;
}

const MemberOnlyModal = ({ onClose, usePortal }: MemberOnlyModalProps) => {
  const router = useRouter();

  return (
    <Modal usePortal={usePortal}>
      <Modal.Header>회원 전용 서비스</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>
            서비스를 이용하려면
            <br />
            로그인해 주세요.
          </Modal.Message>
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/lock.svg" alt="자물쇠 이미지" />
      </Modal.Body>
      <Modal.Footer>
        {onClose && (
          <Modal.Button onClick={onClose} variant="cancel">
            취소
          </Modal.Button>
        )}
        <Modal.Button onClick={() => router.push('/login')} variant="primary">
          로그인
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberOnlyModal;
