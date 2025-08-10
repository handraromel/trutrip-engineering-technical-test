import '@/assets/styles/datatable.css';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column, ColumnProps } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { JSX, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface ColumnDef<T> extends Omit<ColumnProps, 'field' | 'body'> {
  field?: keyof T;
  header: string;
  body?: (data: T) => React.ReactNode;
  sortable?: boolean;
  style?: React.CSSProperties;
  width?: string;
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
  hideSearch?: boolean;
  actions?: {
    header?: string;
    buttons: ActionButton<T>[];
    align?: 'left' | 'center' | 'right';
  };
  dataKey?: string;
}

const Table = <T extends { [key: string]: unknown }>({
  data,
  columns,
  title,
  loading = false,
  globalSearchFields = [],
  hideSearch = false,
  actions,
  dataKey,
}: TableProps<T>) => {
  const [filters, setFilters] = useState({
    global: {
      value: null as string | null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [displayColumns, setDisplayColumns] = useState<ColumnDef<T>[]>(columns);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState('500px');

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderActions = useCallback(
    (rowData: T) => {
      if (!actions?.buttons.length) return null;

      return (
        <div
          className={`flex gap-2 px-8 ${actions.align === 'center' ? 'justify-center' : actions.align === 'right' ? 'justify-end' : 'justify-start'}`}
        >
          {actions.buttons.map((button, index) => {
            const isVisible = button.visible ? button.visible(rowData) : true;
            if (!isVisible) return null;

            const isDisabled = button.disabled ? button.disabled(rowData) : false;
            const getIconName =
              typeof button.icon === 'function' ? button.icon(rowData) : button.icon;
            const tooltipText =
              typeof button.tooltip === 'function' ? button.tooltip(rowData) : button.tooltip;
            const buttonSeverity =
              typeof button.severity === 'function' ? button.severity(rowData) : button.severity;

            return (
              <Button
                key={index}
                size="small"
                rounded
                icon={getIconName}
                tooltip={tooltipText}
                severity={buttonSeverity}
                tooltipOptions={
                  button.tooltipOptions || {
                    position: 'top',
                    style: { fontSize: '12px' },
                  }
                }
                pt={{
                  root: {
                    style: { height: '37px', width: '30px' },
                  },
                }}
                className={button.className}
                raised
                onClick={() => button.onClick(rowData)}
                disabled={isDisabled}
                outlined={isDisabled}
                text={isDisabled}
              />
            );
          })}
        </div>
      );
    },
    [actions],
  );

  useEffect(() => {
    if (
      actions &&
      actions.buttons.length > 0 &&
      !columns.some((col) => col.header === actions.header || col.header === 'Actions')
    ) {
      const actionColumn: ColumnDef<T> = {
        header: actions.header || 'Actions',
        body: renderActions,
        align: 'center',
        width: '150px',
      };
      setDisplayColumns([...columns, actionColumn]);
    } else {
      setDisplayColumns(columns);
    }
  }, [columns, actions, renderActions]);

  useLayoutEffect(() => {
    if (tableContainerRef.current) {
      const calculateHeight = () => {
        const containerTop = tableContainerRef.current?.getBoundingClientRect().top || 0;
        const availableHeight = window.innerHeight - containerTop - 296;
        setTableHeight(`${Math.max(300, availableHeight)}px`);
      };

      calculateHeight();
      window.addEventListener('resize', calculateHeight);
      return () => window.removeEventListener('resize', calculateHeight);
    }
  }, []);

  const renderHeader = () => {
    return (
      <div className="mb-5 flex flex-col flex-wrap justify-between md:flex-row md:items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">
            <p>{title}</p>
            <p className="text-sm text-gray-500">
              {data.length} Record{`${data.length === 1 ? '' : 's'}`} found
            </p>
          </h2>
        </div>

        <div className="mt-2 flex flex-col flex-wrap gap-2 md:flex-row">
          {!hideSearch && (
            <div className="p-input-icon-left rounded border-1 border-teal-200 px-1">
              <i className="pi pi-search text-gray-500" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search..."
                className="h-[2.35rem] w-full pl-8 outline-0"
                style={{ fontSize: '13px' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const convertToColumnProps = (col: ColumnDef<T>): ColumnProps => {
    const style: React.CSSProperties = {
      ...(col.style || {}),
      ...(col.width ? { width: col.width, maxWidth: col.width } : {}),
    };

    return {
      ...col,
      field: col.field as string,
      style: Object.keys(style).length > 0 ? style : undefined,
      frozen: false,
    };
  };

  const getUniqueKeyField = () => {
    if (dataKey && data.length > 0 && dataKey in data[0]) {
      return dataKey;
    }

    if (data.length > 0 && 'uuid' in data[0]) {
      return 'uuid';
    }

    const possibleKeys = ['id', 'key', 'uuid', 'code'];

    for (const key of possibleKeys) {
      if (data.length > 0 && key in data[0]) {
        return key;
      }
    }

    return 'id';
  };

  return (
    <div ref={tableContainerRef} className="flex h-full flex-col overflow-hidden">
      <DataTable
        value={data}
        paginator={true}
        paginatorClassName="fixed-bottom-paginator border-t border-gray-200"
        paginatorPosition="bottom"
        first={first}
        rows={rows}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPage={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
        size="small"
        dataKey={getUniqueKeyField()}
        filters={filters}
        filterDisplay="menu"
        loading={loading}
        globalFilterFields={globalSearchFields as string[]}
        header={renderHeader}
        emptyMessage="No data found."
        scrollHeight={tableHeight}
        scrollable={true}
        resizableColumns={false}
        columnResizeMode="fit"
        tableStyle={{ minWidth: '100%' }}
        className="table-with-fixed-paginator"
        pt={{
          tbody: { className: 'text-[13px]' },
          headerRow: { className: 'text-[14px] font-semibold h-[40px] bg-slate-100' },
          root: { className: 'flex flex-col h-full' },
          wrapper: {
            className: 'flex-grow rounded-tl-md rounded-tr-md border border-slate-200',
          },
          bodyRow: { className: 'border-b border-slate-200' },
          column: { headerCell: { className: 'p-2' }, bodyCell: { className: 'px-2' } },
          emptyMessage: { className: 'text-center text-gray-500 h-[400px]' },
          loadingIcon: { className: 'w-7 h-7' },
        }}
      >
        {displayColumns.map((col, index) => (
          <Column key={index} {...convertToColumnProps(col)} />
        ))}
      </DataTable>
    </div>
  );
};

export default Table as <T>(props: TableProps<T>) => JSX.Element;
