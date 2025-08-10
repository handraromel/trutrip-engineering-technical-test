# ConfirmationDialog Component

A reusable confirmation dialog component built on top of PrimeReact's ConfirmDialog with enhanced loading and disabled states.

## Usage

```tsx
import { ConfirmationDialog } from '@/components';
import { useModal } from '@/hooks';

const MyComponent = () => {
  const confirmModal = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteItem();
      confirmModal.close();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={confirmModal.open}>Delete Item</button>

      <ConfirmationDialog
        visible={confirmModal.isOpen}
        onHide={confirmModal.close}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this item?"
        header="Delete Confirmation"
        acceptLabel="Delete"
        rejectLabel="Cancel"
        loading={isLoading}
      />
    </>
  );
};
```

## Props

| Prop          | Type         | Required | Default                        | Description                            |
| ------------- | ------------ | -------- | ------------------------------ | -------------------------------------- |
| `visible`     | `boolean`    | ✅       | -                              | Controls dialog visibility             |
| `onHide`      | `() => void` | ✅       | -                              | Called when dialog is closed/cancelled |
| `onConfirm`   | `() => void` | ✅       | -                              | Called when user confirms the action   |
| `message`     | `string`     | ✅       | -                              | Main confirmation message to display   |
| `header`      | `string`     | ❌       | `"Confirmation"`               | Dialog header title                    |
| `icon`        | `string`     | ❌       | `"pi pi-exclamation-triangle"` | PrimeIcons class for the icon          |
| `acceptLabel` | `string`     | ❌       | `"Yes"`                        | Text for the confirm button            |
| `rejectLabel` | `string`     | ❌       | `"No"`                         | Text for the cancel button             |
| `loading`     | `boolean`    | ❌       | `false`                        | Shows loading state with spinner       |
| `disabled`    | `boolean`    | ❌       | `false`                        | Disables the confirm button            |

## Features

- **Loading State**: When `loading={true}`, shows spinner icon and "Processing..." text
- **Disabled State**: When `disabled={true}`, prevents confirmation action
- **Auto-disable**: During loading, both buttons are automatically disabled
- **Non-dismissible**: When loading, dialog cannot be closed by clicking outside or X button
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Proper ARIA attributes and keyboard navigation

## Examples

### Basic Confirmation

```tsx
<ConfirmationDialog
  visible={isOpen}
  onHide={onClose}
  onConfirm={handleConfirm}
  message="Are you sure?"
/>
```

### Custom Labels and Icon

```tsx
<ConfirmationDialog
  visible={isOpen}
  onHide={onClose}
  onConfirm={handleSave}
  message="Save changes to this document?"
  header="Save Document"
  icon="pi pi-save"
  acceptLabel="Save"
  rejectLabel="Discard"
/>
```

### With Loading State

```tsx
<ConfirmationDialog
  visible={isOpen}
  onHide={onClose}
  onConfirm={handleAsyncAction}
  message="This will permanently delete the user."
  header="Delete User"
  acceptLabel="Delete"
  loading={isDeleting}
/>
```
