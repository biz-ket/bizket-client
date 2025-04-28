import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex border border-line-20 rounded-[30px] bg-white',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
