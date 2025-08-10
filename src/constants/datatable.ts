// DataTable configuration constants
export const DATATABLE_CONFIG = {
  defaultRows: 10,
  rowsPerPageOptions: [5, 10, 25, 50],
  paginatorTemplate:
    'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  currentPageReportTemplate: '{first} to {last} of {totalRecords} entries',
};

// Common severity colors for tags
export const TAG_SEVERITIES = ['success', 'info', 'warning', 'danger', 'secondary'] as const;
export type TagSeverity = (typeof TAG_SEVERITIES)[number];

// Common filter options
export const FILTER_MATCH_MODES = {
  CONTAINS: 'contains',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
} as const;
