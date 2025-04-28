import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, height, placeholder, className, onChange, ...props }, ref) => {
    return (
      <div
        style={{
          width: width || '100%',
          height: height || '48px',
        }}
      >
        <input
          ref={ref}
          placeholder={placeholder}
          className={clsx(
            'h-full w-full rounded-10 bg-white px-20 py-13 label-lg-medium placeholder:text-line-40 text-font-60 border border-line-30',
            className,
          )}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
