'use client';

import Modal from './Modal';

const CompleteJoinModal = () => {
  return (
    <Modal>
      <Modal.Header>가입 완료</Modal.Header>
      <Modal.Body>
        <Modal.MessageContainer>
          <Modal.Message>
            환영합니다!
            <br />
            가입이 완료되었습니다
          </Modal.Message>
        </Modal.MessageContainer>
        <Modal.Image src="/images/modal/congratulation.svg" alt="축하 이미지" />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button variant="primary">시작하기</Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteJoinModal;
