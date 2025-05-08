'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  width?: number;
  classname?: string;
  usePortal?: boolean;
}

const Modal = ({
  children,
  width,
  classname,
  usePortal = true,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const layout = usePortal ? 'fixed inset-0' : 'absolute inset-0';

  const ModalContent = (
    <div
      className={clsx(
        layout,
        'z-50 flex justify-center items-center bg-[rgba(0,0,0,0.6)]',
      )}
    >
      <div
        className={clsx(
          'h-fit bg-white rounded-10 px-20 pt-24 pb-20 flex flex-col gap-14',
          classname,
        )}
        style={{ width: `${width ?? 343}px` }}
      >
        {children}
      </div>
    </div>
  );

  if (usePortal) {
    return createPortal(ModalContent, document.getElementById('modal-root')!);
  }

  return ModalContent;
};

interface ModalHeaderProps {
  children: ReactNode;
}

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="label-md-semibold text-primary-60 bg-primary-10 py-3 px-10 mx-auto">
      {children}
    </div>
  );
};
Modal.Header = ModalHeader;

interface ModalBodyProps {
  children: ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <div className="w-full flex flex-col gap-14 items-center">{children}</div>
  );
};
Modal.Body = ModalBody;

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="w-full flex gap-10">{children}</div>;
};
Modal.Footer = ModalFooter;

interface MessageContainerProps {
  children: ReactNode;
}

const ModalMessageContainer = ({ children }: MessageContainerProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
Modal.MessageContainer = ModalMessageContainer;

interface ModalMessageProps {
  children: ReactNode;
}

const ModalMessage = ({ children }: ModalMessageProps) => {
  return <span className="title-sm text-center">{children}</span>;
};
Modal.Message = ModalMessage;

interface ModalSubMessageProps {
  children: ReactNode;
}

const ModalSubMessage = ({ children }: ModalSubMessageProps) => {
  return (
    <span className="body-md-regular text-font-20 text-center">{children}</span>
  );
};
Modal.SubMessage = ModalSubMessage;

interface ModalImageProps {
  src: string;
  alt: string;
}

const ModalImage = ({ src, alt }: ModalImageProps) => {
  return <Image src={src} alt={alt} width={150} height={150} />;
};
Modal.Image = ModalImage;

interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'cancel';
}

const ModalButton = ({ children, onClick, variant }: ModalButtonProps) => {
  const style =
    variant === 'primary'
      ? 'bg-primary-50 text-white'
      : variant === 'cancel'
      ? 'bg-line-20 text-font-30'
      : undefined;

  return (
    <button
      className={clsx('flex-1 px-16 py-13 rounded-8 body-md-medium', style)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
Modal.Button = ModalButton;

export default Modal;
