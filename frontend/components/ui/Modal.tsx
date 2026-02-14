'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const Modal = ({ isOpen, onClose, children, title, showCloseButton = true }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Reset overflow
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal container */}
          <motion.div
            className="relative z-10 bg-secondary-bg dark:bg-secondary-bg-dark rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-4 border-b border-border dark:border-border-dark">
                {title && (
                  <h2 className="text-h3 font-semibold text-primary-text dark:text-primary-text-dark">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
                  </button>
                )}
              </div>
            )}

            <div className="p-6 pt-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render the modal in a portal to avoid stacking context issues
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default Modal;