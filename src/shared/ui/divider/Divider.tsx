import clsx from 'clsx';

interface DividerProps {
  width?: string;
  height?: string;
  className?: string;
  bgColor?: string;
}

export default function Divider({
  width,
  height,
  className,
  bgColor,
}: DividerProps) {
  return (
    <div
      style={{
        width: width ? width : '100%',
        height: height ? height : '1px',
        backgroundColor: bgColor ? bgColor : '#fff',
      }}
      className={clsx(className)}
    />
  );
}
