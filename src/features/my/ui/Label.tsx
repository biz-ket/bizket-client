import { LabelHTMLAttributes, ReactNode } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export default function Label({ children, className, ...rest }: Props) {
  return (
    <label
      className={`block label-xl-medium mb-12 text-font-50 ${className || ''}`}
      {...rest}
    >
      {children}
    </label>
  );
}
