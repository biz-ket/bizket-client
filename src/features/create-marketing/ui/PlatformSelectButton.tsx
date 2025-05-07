import clsx from 'clsx';

interface PlatformSelectButtonProps {
  width?: string;
  height?: string;
  label: string;
  isActive?: boolean;
  name: 'INSTAGRAM' | 'THREADS';
  onClick: (platform: 'INSTAGRAM' | 'THREADS') => void;
}

const PlatformSelectButton = ({
  width,
  height,
  label,
  isActive,
  name,
  onClick,
}: PlatformSelectButtonProps) => {
  return (
    <button
      onClick={() => onClick(name)}
      style={{ width: width || '151px', height: height || '48px' }}
      className={clsx(
        'border rounded-10 body-sm-regular',
        isActive
          ? 'border-primary-50 bg-primary-10 text-primary-50'
          : 'border-line-40 text-font-20 bg-white',
      )}
    >
      {label}
    </button>
  );
};

export default PlatformSelectButton;
