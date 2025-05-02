import clsx from 'clsx';
import { ReactNode } from 'react';

interface IconSelectButtonProps {
  width?: string;
  height?: string;
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  name: 'quality' | 'price' | 'design' | 'trend';
  onClick: (accent: 'quality' | 'price' | 'design' | 'trend') => void;
}

const IconSelectButton = ({
  width,
  height,
  label,
  icon,
  isActive,
  name,
  onClick,
}: IconSelectButtonProps) => {
  return (
    <button
      style={{ width: width || '70px', height: height || '84px' }}
      className={clsx(
        'border body-sm-regular rounded-10 relative flex px-12 py-10',
        isActive
          ? 'border-primary-50 text-primary-50 bg-primary-10'
          : 'border-line-40 text-font-20 bg-white',
      )}
      onClick={() => onClick(name)}
    >
      {label}
      <div className="absolute bottom-10 right-10">{icon}</div>
    </button>
  );
};

export default IconSelectButton;
