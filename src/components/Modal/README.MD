# Modal Component

A customizable modal dialog component built on top of PrimeReact's Dialog with enhanced header controls and responsive design.

## Usage

```tsx
import { Modal } from '@/components';
import { useModal } from '@/hooks';

const MyComponent = () => {
  const modal = useModal();

  return (
    <>
      <button onClick={modal.open}>Open Modal</button>

      <Modal visible={modal.isOpen} onClose={modal.close} header="Modal Title">
        <p>Modal content goes here...</p>
      </Modal>
    </>
  );
};
```

## Props

| Prop                | Type              | Required | Default | Description                         |
| ------------------- | ----------------- | -------- | ------- | ----------------------------------- |
| `visible`           | `boolean`         | ✅       | -       | Controls modal visibility           |
| `header`            | `string`          | ✅       | -       | Modal header title                  |
| `children`          | `React.ReactNode` | ✅       | -       | Modal content                       |
| `onHide`            | `() => void`      | ❌       | -       | Called when modal is hidden         |
| `onClose`           | `() => void`      | ❌       | -       | Called when close button is clicked |
| `className`         | `string`          | ❌       | -       | Additional CSS classes              |
| `icons`             | `React.ReactNode` | ❌       | -       | Custom icons in header              |
| `blockOutsideClick` | `boolean`         | ❌       | `false` | Prevent closing by clicking outside |
| `closeOnEscape`     | `boolean`         | ❌       | `false` | Allow closing with Escape key       |

## Examples

### Basic Modal

```tsx
<Modal visible={isOpen} onClose={handleClose} header="User Details">
  <div>User information content</div>
</Modal>
```

### Modal with Custom Icons

```tsx
<Modal visible={isOpen} onClose={handleClose} header="Settings" icons={<i className="pi pi-cog" />}>
  <div>Settings content</div>
</Modal>
```

### Non-Dismissible Modal

```tsx
<Modal
  visible={isOpen}
  onClose={handleClose}
  header="Important Notice"
  blockOutsideClick={true}
  closeOnEscape={false}
>
  <div>Critical information that requires user action</div>
</Modal>
```
