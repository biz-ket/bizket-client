import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';
import { TERMS_PRIVACY } from '@/shared/constant/TermsPrivacy';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal = ({ isOpen, onClose, title, content }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-important bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="bg-white w-[1000px] max-h-[90%] overflow-y-auto rounded-20 p-40 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute text-black top-20 right-20 text-24"
            >
              ✕
            </button>
            <h2 className="mb-20 font-bold text-24">{title}</h2>
            <pre className="text-16 leading-[24px] text-black/80 whitespace-pre-wrap">
              {content}
            </pre>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleOpenModal = (type: 'terms' | 'privacy') => {
    setModalContent({
      title: TERMS_PRIVACY[type].title,
      content: TERMS_PRIVACY[type].content,
    });

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className="w-full pt-80 pb-[105px] bg-black ">
      <Container>
        <Flex direction="col" className="w-full">
          <Flex justify="between" className="w-full">
            <Flex direction="col" gap={140}>
              <Link href={'/'}>
                <Image
                  width={187}
                  height={42}
                  src="/images/shared/logo-white.svg"
                  alt="푸터 로고"
                />
              </Link>
              <p className="text-white body-md-regular text-line-30">
                © 2025 BIZKET. All Rights Reserved.
              </p>
            </Flex>
            <Flex justify="between" className="w-[736px]">
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">서비스 이용약관</p>
                <button
                  onClick={() => handleOpenModal('terms')}
                  className="text-left text-white/70 body-md-regular hover:underline"
                >
                  이용약관
                </button>
                <button
                  onClick={() => handleOpenModal('privacy')}
                  className="text-left text-white/70 body-md-regular hover:underline"
                >
                  개인정보처리방침
                </button>
              </Flex>
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">이용 문의</p>
                <p className="text-white/70 body-md-regular">
                  nyeonui@gmail.com
                </p>
                <p className="text-white/70 body-md-regular">010-0000-0000</p>
              </Flex>
              <Flex direction="col" gap={22}>
                <p className="text-white body-lg-semibold">빠른 링크</p>
                <Link href="/create" className="text-white/70 body-md-regular">
                  마케팅 콘텐츠 생성 AI
                </Link>
                <Link href="/report" className="text-white/70 body-md-regular">
                  비지니스보고서
                </Link>
                <Link
                  href="/search-trend"
                  className="text-white/70 body-md-regular"
                >
                  검색어 트렌드
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </footer>
  );
};

export default Footer;
