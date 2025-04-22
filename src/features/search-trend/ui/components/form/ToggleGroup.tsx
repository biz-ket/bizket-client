'use client';

import clsx from 'clsx';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ToggleGroupContext = {
  selected: string;
  setSelected: (value: string) => void;
};

const ToggleGroupContext = createContext<ToggleGroupContext | null>(null);

const useToggleGroupContext = () => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error('You must use within ToggleGroupContext.Provider.');
  }

  return context;
};

interface RootProps {
  children: ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

const Root = ({
  defaultValue,
  children,
  value,
  onValueChange,
  className,
}: RootProps) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    onValueChange?.(selected);
  }, [selected]);

  return (
    <ToggleGroupContext.Provider value={{ selected, setSelected }}>
      <div className={className}>{children}</div>
    </ToggleGroupContext.Provider>
  );
};

interface ItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const Item = ({ children, value, className }: ItemProps) => {
  const { selected, setSelected } = useToggleGroupContext();

  const isSelected = useMemo(() => selected === value, [value, selected]);

  return (
    <button
      className={clsx(
        isSelected
          ? 'bg-primary-10 text-primary-50 border-primary-[#F67824]'
          : 'bg-white text-font-20 border-line-30',
        'border rounded-12 label-lg-medium flex justify-center items-center',
        className,
      )}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  );
};

export default {
  Root,
  Item,
};
