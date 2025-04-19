import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-[1200px] m-auto">{children}</div>;
};

export default Container;
