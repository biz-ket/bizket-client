'use client';

import { ModalProps } from '@/shared/types/modalProps';
import Modal from './Modal';

interface CheckRequiredFieldModalProps extends ModalProps {
  onClose?: () => void;
}

const CheckRequiredFieldModal = ({
  onClose,
  usePortal,
}: CheckRequiredFieldModalProps) => {
  return (
    <Modal usePortal={usePortal}>
      <Modal.Header>필수 항목 확인</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>필수 항목을 입력해 주세요</Modal.Message>
          <Modal.SubMessage>남은 필수 항목이 있습니다.</Modal.SubMessage>
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/pencil.svg" alt="연필 이미지" />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button onClick={onClose} variant="primary">
          계속 작성하기
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckRequiredFieldModal;
