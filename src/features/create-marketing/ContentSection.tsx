'use client';

import { motion, AnimatePresence } from 'framer-motion';
import CreateContent from '@/features/create-marketing/CreateContent';
import CreateHistory from '@/features/create-marketing/CreateHistory';
import { useTabStore } from '@/shared/store/useTabStore';

const ContentSection = () => {
  const { activeTab, isTabOpen } = useTabStore();

  // 애니메이션 변수 설정
  const variants = {
    open: {
      x: 0,
      opacity: 1,
      width: '526px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      width: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <AnimatePresence>
      {isTabOpen && (
        <motion.div
          className="relative h-[calc(100vh-72px)] overflow-x-hidden overflow-y-auto bg-white py-55 bg-primary-40 "
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
        >
          <div className="w-[526px] px-48">
            {activeTab === 'create' && <CreateContent />}
            {activeTab === 'history' && <CreateHistory />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentSection;
