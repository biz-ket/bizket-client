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

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  onSelect,
  className,
  activeId,
}) => (
  <div className={clsx('flex flex-col px-8 py-8', className)}>
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        className={clsx(
          'w-full px-12 py-8 text-left hover:bg-gray-50',
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
