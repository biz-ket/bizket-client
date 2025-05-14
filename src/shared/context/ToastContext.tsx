'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import ToastCheckIcon from '@/shared/ui/icons/ToastCheckIcon';

interface ToastOptions {
  message: string;
  duration?: number;
}

interface ToastContextType {
  openToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const openToast = (options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), options.duration || 2000);
  };

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={clsx(
              'fixed left-1/2 bottom-30 z-modal w-[580px] max-w-screen px-16',
            )}
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center w-full gap-20 px-20 text-white bg-font-50 rounded-12 py-19 body-md-medium">
              <ToastCheckIcon />
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
