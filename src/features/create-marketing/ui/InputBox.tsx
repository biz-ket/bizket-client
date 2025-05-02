'use client';

import Flex from '@/shared/ui/layout/Flex';
import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface InputBoxProps {
  label: string;
  width?: string;
  children: ReactNode;
  usePortal?: boolean; // 포털 사용 여부 선택적 옵션
}

const InputBox = ({
  label,
  width,
  children,
  usePortal = false,
}: InputBoxProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const renderContent = () => (
    <div style={{ width: width || '100%' }}>
      <Flex direction="col" gap={6} className="w-full">
        <label className="relative label-md-medium text-font-30">{label}</label>
        {usePortal
          ? // 포털을 사용하지 않는 경우 그대로 렌더링
            children
          : // 일반적인 렌더링
            children}
      </Flex>
    </div>
  );

  // 포털을 사용하는 경우 + 클라이언트 사이드 렌더링인 경우
  if (usePortal && mounted) {
    return (
      <>
        <div style={{ width: width || '100%' }}>
          <Flex direction="col" gap={6} className="w-full">
            <label className="relative label-md-medium text-font-30">
              {label}
            </label>
            {/* 여기에는 빈 공간이 유지됨 */}
            <div style={{ height: '48px' }}></div>
          </Flex>
        </div>
        {createPortal(
          <div
            className="fixed z-50"
            style={{
              // 이 위치는 실제 사용 환경에 맞게 조정해야 합니다
              // 예시 위치입니다
              top: '50px',
              left: '50px',
              width: width || '100%',
            }}
          >
            {children}
          </div>,
          document.body,
        )}
      </>
    );
  }

  // 포털을 사용하지 않는 경우 또는 서버 사이드 렌더링인 경우
  return renderContent();
};

export default InputBox;
