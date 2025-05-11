'use client';

import Modal from '@/shared/ui/modal/Modal';

interface CheckDeleteAccountModalProps {
  onClose?: () => void;
  onConfirm: () => void;
}

const CheckDeleteAccountModal = ({
  onClose,
  onConfirm,
}: CheckDeleteAccountModalProps) => {
  return (
    <Modal>
      <Modal.Header>탈퇴하기</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>정말 탈퇴하시겠습니까?</Modal.Message>
          <Modal.SubMessage>
            탈퇴 시, 계정 정보 및 생성 내역 삭제로 정보 복구가 불가능합니다.
          </Modal.SubMessage>
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/alert.svg" alt="경고 이미지" />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button onClick={onClose} variant="cancel">
          취소
        </Modal.Button>
        <Modal.Button onClick={onConfirm} variant="primary">
          탈퇴하기
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckDeleteAccountModal;
