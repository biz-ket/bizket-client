import clsx from 'clsx';
import { ReactNode } from 'react';

interface SideButtonProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

const SideButton = ({ icon, label, isActive }: SideButtonProps) => {
  return (
    <button
      className={clsx(
        'flex flex-col items-center w-full gap-4 py-6 label-sm-medium rounded-10',
        isActive ? 'text-primary-50 bg-primary-10' : 'text-font-30 bg-white',
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default SideButton;
