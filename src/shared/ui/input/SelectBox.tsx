'use client';

import ToggleIcon from '@/shared/ui/icons/ToggleIcon';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';

interface SelectBoxProps {
  id: string; // 각 SelectBox를 구분하기 위한 고유 ID 추가
  placeholder: string;
  value?: string;
  isActive?: boolean;
  isSelected?: boolean;
  children: ReactNode;
  handleClick?: () => void;
}

const SelectBox = ({
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

  const handleToggleOpen = () => {
    toggleBox(id);
  };

  // 핵심 수정: 드롭다운 클릭 이벤트 중지
  const handleDropdownClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 중지
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 드롭다운과 버튼 영역 모두 확인
      const isClickInsideBox =
        selectBoxRef.current &&
        selectBoxRef.current.contains(event.target as Node);
      const isClickInsideDropdown =
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node);

      // 두 영역 모두 아닌 경우에만 닫기
      if (!isClickInsideBox && !isClickInsideDropdown) {
        closeAllBoxes();
      }
    };

    // 이벤트 리스너 추가
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAllBoxes, isOpen]);

  // 드롭다운의 위치 계산을 위한 함수
  const getDropdownPosition = () => {
    if (selectBoxRef.current) {
      const rect = selectBoxRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width,
      };
    }
    return { top: 0, left: 0, width: 0 };
  };

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      <button
        className={clsx(
          'flex items-center justify-between w-full h-48 px-20 border body-sm-regular rounded-8',
          isOpen || isSelected
            ? 'bg-primary-10 text-primary-50 border-primary-50'
            : 'bg-white text-font-20 border-line-40',
        )}
        onClick={handleToggleOpen}
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
        createPortal(
          <div
            ref={dropdownRef}
            onClick={handleDropdownClick}
            className="fixed z-50"
            style={{
              top: `${getDropdownPosition().top}px`,
              left: `${getDropdownPosition().left}px`,
              width: `${getDropdownPosition().width}px`,
            }}
          >
            <AnimatePresence>
              <motion.div
                className="overflow-hidden bg-white border rounded-8 border-primary-50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default SelectBox;
