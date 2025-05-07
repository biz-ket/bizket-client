'use client';

import DeleteIcon from '@/features/create-marketing-viewer/ui/DeleteIcon';
import PasteIcon from '@/features/create-marketing-viewer/ui/PasteIcon';
import Flex from '@/shared/ui/layout/Flex';
import { useState } from 'react';

interface TextViewBoxProps {
  content: string;
}

const TextViewBox = ({ content }: TextViewBoxProps) => {
  const [isCopied, setIsCopied] = useState(false);

  console.log(isCopied);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <div className="relative w-full py-20 bg-white px-18 rounded-10">
      <pre className="body-md-light text-[#0b1014]">{content}</pre>
      <Flex align="center" justify="end" gap={12} className="w-full">
        <button onClick={handleCopy} className="relative flex items-center">
          <PasteIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
      </Flex>
    </div>
  );
};

export default TextViewBox;
