import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  height?: string;
  value: string;
  placeholder: string;
  className?: string;
  lengthError?: boolean;
  maxLength?: number;
}

export default function Textarea({
  width,
  height,
  placeholder,
  value,
  className,
  lengthError,
  maxLength,
  ...props
}: TextareaProps) {
  return (
    <div className="relative w-full">
      <textarea
        style={{ width: width || '100%', height: height || '140px' }}
        placeholder={placeholder}
        className={clsx(
          'resize-none rounded-10 bg-white px-20 py-16 text-font-60 body-sm-light placeholder:text-font-20 border border-line-40',
          className,
        )}
        value={value}
        {...props}
      />
      {maxLength && (
        <p className="absolute text-gray-400 bottom-14 right-16 font-caption">
          (
          <span className={clsx(lengthError && 'text-etc-red')}>
            {value.length}
          </span>
          /{maxLength})
        </p>
      )}
    </div>
  );
}
