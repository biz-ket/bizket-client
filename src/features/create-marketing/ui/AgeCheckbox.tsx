import clsx from 'clsx';

interface AgeCheckboxProps {
  isChecked?: boolean;
  label: string;
  onClick: (label: string) => void;
  labelClassName?: string;
}

const AgeCheckbox = ({
  label,
  isChecked,
  onClick,
  labelClassName,
}: AgeCheckboxProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className="flex items-center gap-12 "
    >
      <div
        className={clsx(
          'w-20 h-20 border rounded-4 flex justify-center items-center',
          isChecked
            ? 'bg-primary-50 border-primary-50'
            : 'border-line-30 bg-white',
        )}
      >
        <svg
          width="13"
          height="10"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 9.70078L0.5 5.70078L1.9 4.30078L4.5 6.90078L11.1 0.300781L12.5 1.70078L4.5 9.70078Z"
            fill="white"
          />
        </svg>
      </div>
      <span className={clsx('text-black', labelClassName ?? 'body-sm-regular')}>
        {label}
      </span>
    </button>
  );
};

export default AgeCheckbox;
