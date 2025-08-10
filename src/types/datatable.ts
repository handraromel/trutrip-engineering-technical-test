import { CSSProperties, ReactNode } from 'react';

// Generic DataTable column interface
export interface DataTableColumn<T = Record<string, unknown>> {
  field: keyof T | string;
  header: string;
  body?: (rowData: T) => ReactNode;
  sortable?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  style?: CSSProperties;
  className?: string;
  hidden?: boolean;
}

// DataTable filter option
export interface FilterOption {
  label: string;
  value: string | number;
}

// DataTable pagination event
export interface PaginationEvent {
  first: number;
  rows: number;
  page?: number;
  pageCount?: number;
}

// Generic DataTable props
export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  error?: Error | string | null;
  paginator?: boolean;
  rows?: number;
  globalFilterFields?: string[];
  emptyMessage?: string;
  className?: string;
  header?: ReactNode;
  showGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  stripedRows?: boolean;
  showGridlines?: boolean;
  showRowNumbers?: boolean;
}
