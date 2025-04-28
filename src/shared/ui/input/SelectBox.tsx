'use client';

import ToggleIcon from '@/shared/ui/icons/ToggleIcon';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectBoxProps {
  placeholder: string;
  value?: string;
  isActive?: boolean;
  isSelected?: boolean;
  children: ReactNode;
  handleClick: () => void;
}

const SelectBox = ({
  placeholder,
  value,
  isActive,
  isSelected,
  children,
  handleClick,
}: SelectBoxProps) => {
  return (
    <div className="relative w-full z-modal">
      <button
        className={clsx(
          'flex items-center justify-between w-full h-48 px-20 border body-sm-regular rounded-8',
          isActive || isSelected
            ? 'bg-primary-10 text-primary-50 border-primary-50'
            : 'bg-white text-font-20 border-line-40',
        )}
        onClick={handleClick}
      >
        {value || placeholder}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ToggleIcon fill={isActive || isSelected ? '#FF7900' : '#ddd'} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute left-0 w-full overflow-hidden bg-white border rounded-8 border-primary-50 top-52"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectBox;
