import clsx from 'clsx';

interface PlatformSelectButtonProps {
  width?: string;
  height?: string;
  label: string;
  isActive?: boolean;
}

const PlatformSelectButton = ({
  width,
  height,
  label,
  isActive,
}: PlatformSelectButtonProps) => {
  return (
    <button
      style={{ width: width || '210px', height: height || '50px' }}
      className={clsx(
        'border rounded-10 label-lg-medium',
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
