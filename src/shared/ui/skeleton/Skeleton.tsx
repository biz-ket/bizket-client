'use client';

import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  count?: number;
  as?: React.ElementType;
}

export const Skeleton = ({
  className = '',
  count = 1,
  as: Tag = 'div',
}: SkeletonProps) => {
  const baseCls = 'bg-gray-200 rounded animate-pulse';

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => (
          <Tag key={idx} className={clsx(baseCls, className)} />
        ))}
      </>
    );
  }

  return <Tag className={clsx(baseCls, className)} />;
};

export default Skeleton;
