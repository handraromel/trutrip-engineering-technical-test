import { ColumnProps } from 'primereact/column';
import React from 'react';
export interface ColumnDef<T> extends Omit<ColumnProps, 'field' | 'body'> {
  field?: keyof T;
  header: string;
  body?: (data: T) => React.ReactNode;
  sortable?: boolean;
  style?: React.CSSProperties;
  width?: string;
}

export interface TableMainAction {
  icon?: string;
  label?: string;
  tooltip?: string;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast';
  onClick: () => void;
  tooltipOptions?: object;
  className?: string;
  disabled?: boolean;
  raised?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  text?: boolean;
  visible?: boolean | (() => boolean);
}

export interface ActionButton<T> {
  icon: string | ((rowData: T) => string);
  tooltip?: string | ((rowData: T) => string);
  severity?:
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'contrast'
    | ((
        rowData: T,
      ) => 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'help' | 'contrast');
  onClick: (rowData: T) => void;
  disabled?: (rowData: T) => boolean;
  visible?: (rowData: T) => boolean;
  className?: string;
  tooltipOptions?: object;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title: string;
  loading?: boolean;
  globalSearchFields?: Array<keyof T>;
  mainActions?: TableMainAction[];
  hideSearch?: boolean;
  actions?: {
    header?: string;
    buttons: ActionButton<T>[];
    align?: 'left' | 'center' | 'right';
  };
  dataKey?: string;
}
