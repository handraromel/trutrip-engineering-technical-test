# Table Component

A feature-rich data table component built on PrimeReact DataTable with search, pagination, and action buttons.

## Usage

```tsx
import { Table } from '@/components';
import { ColumnDef } from '@/types';

const MyTable = () => {
  const columns: ColumnDef<User>[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'status', header: 'Status', width: '100px' },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      title="Users"
      globalSearchFields={['name', 'email']}
      dataKey="id"
    />
  );
};
```

## Props

| Prop                 | Type                | Required | Default | Description               |
| -------------------- | ------------------- | -------- | ------- | ------------------------- |
| `data`               | `T[]`               | ✅       | -       | Array of data objects     |
| `columns`            | `ColumnDef<T>[]`    | ✅       | -       | Column definitions        |
| `title`              | `string`            | ✅       | -       | Table title               |
| `loading`            | `boolean`           | ❌       | `false` | Show loading state        |
| `globalSearchFields` | `Array<keyof T>`    | ❌       | `[]`    | Fields to search globally |
| `hideSearch`         | `boolean`           | ❌       | `false` | Hide search input         |
| `mainActions`        | `TableMainAction[]` | ❌       | `[]`    | Header action buttons     |
| `actions`            | `ActionConfig<T>`   | ❌       | -       | Row action buttons        |
| `dataKey`            | `string`            | ❌       | `'id'`  | Unique key field          |

## Column Definition

```tsx
interface ColumnDef<T> {
  field?: keyof T; // Data field name
  header: string; // Column header text
  body?: (data: T) => React.ReactNode; // Custom cell renderer
  sortable?: boolean; // Enable sorting
  width?: string; // Column width
  className?: string; // CSS classes
  style?: React.CSSProperties; // Inline styles
}
```

## Examples

### Basic Table

```tsx
<Table
  data={users}
  columns={[
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
  ]}
  title="User List"
/>
```

### Table with Search

```tsx
<Table
  data={users}
  columns={columns}
  title="Searchable Users"
  globalSearchFields={['name', 'email', 'status']}
/>
```

### Table with Main Actions

```tsx
<Table
  data={users}
  columns={columns}
  title="Users"
  mainActions={[
    {
      icon: 'pi pi-plus',
      label: 'Add User',
      severity: 'success',
      onClick: () => handleAddUser(),
    },
    {
      icon: 'pi pi-download',
      label: 'Export',
      severity: 'info',
      onClick: () => handleExport(),
    },
  ]}
/>
```

### Table with Row Actions

```tsx
<Table
  data={users}
  columns={columns}
  title="Users"
  actions={{
    header: 'Actions',
    align: 'center',
    buttons: [
      {
        icon: 'pi pi-eye',
        tooltip: 'View',
        severity: 'info',
        onClick: (user) => handleView(user),
      },
      {
        icon: 'pi pi-pencil',
        tooltip: 'Edit',
        severity: 'warning',
        onClick: (user) => handleEdit(user),
      },
      {
        icon: 'pi pi-trash',
        tooltip: 'Delete',
        severity: 'danger',
        onClick: (user) => handleDelete(user),
        visible: (user) => user.status !== 'Protected',
      },
    ],
  }}
/>
```

### Custom Column Rendering

```tsx
const columns: ColumnDef<User>[] = [
  { field: 'name', header: 'Name' },
  {
    header: 'Status',
    body: (user) => (
      <span className={`badge ${user.active ? 'badge-success' : 'badge-danger'}`}>
        {user.active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];
```
