export interface ConfirmationProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  message: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}
