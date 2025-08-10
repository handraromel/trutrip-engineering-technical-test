import React from 'react';

export interface ModalProps {
  visible: boolean;
  onHide?: () => void;
  onClose?: () => void;
  header: string;
  children: React.ReactNode;
  className?: string;
  icons?: React.ReactNode;
  blockOutsideClick?: boolean;
  closeOnEscape?: boolean;
}
