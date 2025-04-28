import Flex from '@/shared/ui/layout/Flex';
import { ReactNode } from 'react';

interface InputBoxProps {
  label: string;
  width?: string;
  children: ReactNode;
}

const InputBox = ({ label, width, children }: InputBoxProps) => {
  return (
    <div style={{ width: width || '100%' }}>
      <Flex direction="col" gap={6} className="w-full">
        <label className="label-md-medium text-font-30">{label}</label>
        {children}
      </Flex>
    </div>
  );
};

export default InputBox;
