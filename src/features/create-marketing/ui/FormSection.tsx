'use client';

import { motion, AnimatePresence } from 'framer-motion';
import CreateContent from '@/features/create-marketing/ui/CreateContent';
import CreateHistory from '@/features/create-marketing/ui/CreateHistory';
import { useTabStore } from '@/shared/store/useTabStore';

const FormSection = () => {
  const { activeTab, isTabOpen } = useTabStore();

  // 애니메이션 변수 설정
  const variants = {
    open: {
      x: 0,
      opacity: 1,
      width: 'auto',
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
          className="relative h-full overflow-x-hidden overflow-y-auto bg-white py-30 bg-primary-40 "
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
        >
          {activeTab === 'create' && (
            <div className="w-[360px] px-24">
              <CreateContent />
            </div>
          )}
          {activeTab === 'history' && (
            <div className="w-[526px] px-48">
              <CreateHistory />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSection;
