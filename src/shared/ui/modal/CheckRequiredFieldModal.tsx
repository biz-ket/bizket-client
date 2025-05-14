'use client';

import { ModalProps } from '@/shared/types/modalProps';
import Modal from './Modal';

interface CheckRequiredFieldModalProps extends ModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

const CheckRequiredFieldModal = ({
  onClose,
  onConfirm,
  usePortal,
}: CheckRequiredFieldModalProps) => {
  return (
    <Modal usePortal={usePortal}>
      <Modal.Header>저장하기</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>내 정보를 저장하시겠습니까?</Modal.Message>
          {/* <Modal.SubMessage>남은 필수 항목이 있습니다.</Modal.SubMessage> */}
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/pencil.svg" alt="연필 이미지" />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button onClick={onClose} variant="cancel">
          취소
        </Modal.Button>
        <Modal.Button onClick={onConfirm} variant="primary">
          저장하기
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckRequiredFieldModal;
