/**
 * useModal Hook
 *
 * Simple hook for managing modal state with open/close/toggle functionality.
 *
 * Usage:
 * const modalInstance = useModal();
 * modalInstance.open();
 * modalInstance.close();
 * modalInstance.toggle();
 * modalInstance.isOpen
 *
 */

import { useState } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useModal = (initialState: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
