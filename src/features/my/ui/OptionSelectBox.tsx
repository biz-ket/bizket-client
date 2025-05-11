'use client';

import ToggleIcon from '@/shared/ui/icons/ToggleIcon';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';

interface SelectBoxProps {
  id: string;
  placeholder: string;
  value?: string;
  isSelected?: boolean;
  children: ReactNode;
}

const OptionSelectBox = ({
  id,
  placeholder,
  value,
  isSelected,
  children,
}: SelectBoxProps) => {
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const isOpen = useSelectBoxStore((state) => state.isBoxOpen(id));
  const toggleBox = useSelectBoxStore((state) => state.toggleBox);
  const closeAllBoxes = useSelectBoxStore((state) => state.closeAllBoxes);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current?.contains(event.target as Node) ||
        dropdownRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      closeAllBoxes();
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeAllBoxes]);

  const getContainer = () => selectBoxRef.current || document.body;

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      <button
        type="button"
        className={clsx(
          'flex items-center justify-between w-full h-48 px-20 border body-sm-regular rounded-8',
          isOpen || isSelected
            ? 'bg-primary-10 text-primary-50 border-primary-50'
            : 'bg-white text-font-20 border-line-40',
        )}
        onClick={() => toggleBox(id)}
      >
        {value || placeholder}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ToggleIcon fill={isOpen || isSelected ? '#FF7900' : '#ddd'} />
        </motion.div>
      </button>

      {mounted &&
        isOpen &&
        selectBoxRef.current &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                ref={dropdownRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-full mt-1 w-full z-50"
              >
                <motion.div
                  className="overflow-hidden bg-white border rounded-8 border-primary-50"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {children}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          getContainer(),
        )}
    </div>
  );
};

export default OptionSelectBox;
