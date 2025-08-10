import { ConfirmationProps } from '@/types';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const ConfirmationDialog = ({
  visible,
  onHide,
  onConfirm,
  message,
  header = 'Confirmation',
  icon = 'pi pi-exclamation-triangle',
  acceptLabel = 'Yes',
  rejectLabel = 'No',
  loading = false,
  disabled = false,
}: ConfirmationProps) => {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      message={message}
      header={header}
      icon={loading ? 'pi pi-spin pi-spinner' : icon}
      acceptLabel={loading ? 'Processing...' : acceptLabel}
      rejectLabel={rejectLabel}
      accept={onConfirm}
      reject={onHide}
      acceptClassName={`${disabled || loading ? 'p-button-secondary opacity-50 cursor-not-allowed' : ''}`}
      rejectClassName={`${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      dismissableMask={!loading}
      closable={!loading}
      pt={{
        acceptButton: {
          disabled: disabled || loading,
        },
        rejectButton: {
          disabled: loading,
        },
      }}
    />
  );
};
