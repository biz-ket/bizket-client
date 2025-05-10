'use client';

import React from 'react';
import clsx from 'clsx';

export interface Option {
  id: number | string;
  label: string;
}

export interface OptionsListProps {
  options: Option[];
  onSelect: (id: number | string) => void;
  className?: string;
  activeId?: number | string;
}

/**
 * 범용 옵션 리스트 컴포넌트
 * SelectBox 내부에 children으로 전달하여 사용합니다.
 */
const OptionsList: React.FC<OptionsListProps> = ({
  options,
  onSelect,
  className,
  activeId,
}) => (
  <div className={clsx('flex flex-col', className)}>
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        className={clsx(
          'w-full px-4 py-2 text-left hover:bg-gray-50',
          option.id === activeId && 'bg-primary-10 text-primary-50',
        )}
        onClick={() => onSelect(option.id)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default OptionsList;
