'use client';

import { ModalProps } from '@/shared/types/modalProps';
import Modal from './Modal';

interface CheckDeleteModalProps extends ModalProps {
  onCancel?: () => void;
  onDelete?: () => void;
}

const CheckDeleteModal = ({ onCancel, onDelete, usePortal }: CheckDeleteModalProps) => {
  return (
    <Modal usePortal={usePortal}>
      <Modal.Header>삭제 확인</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>삭제하시겠습니까?</Modal.Message>
          <Modal.SubMessage>영구 삭제되어 복구할 수 없습니다.</Modal.SubMessage>
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/delete.svg" alt="삭제 이미지" />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button onClick={onCancel} variant="cancel">
          취소
        </Modal.Button>
        <Modal.Button onClick={onDelete} variant="primary">
          삭제
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckDeleteModal;
