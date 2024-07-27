export interface TableData {
  columns: Column[];
  rows: Row[];
  filters?: TableFilter[];
  options?: TableOptions;
}

export interface Column {
  title: string;
  key: string;
  component?: 'link' | 'label';
  format?: Formatters;
  componentOptions?: ComponentLabelOptions & ComponentLinkOptions;
  sortField?: string;
}

export interface Row {
  [key: string]: string | number | boolean | object;
}

export interface TableFilter {
  type: 'date';
  filterKey: string;
  defaultValue?: string | number | boolean | object;
}

export interface TableOptions {
  actions?: Actions[];
  bulkSelect?: boolean;
  bulkSelectKey?: string;
  search?: {
    searchKeys: string[];
    placeholder: string;
  };
  pagination?: boolean;
}

export interface ComponentLabelOptions {
  bg?: {
    [key: string]: string;
  };
  text?: {
    [key: string]: string;
  };
}

export interface ComponentLinkOptions {
  onClick?: (row?: Row) => void;
}

export interface Action {
  icon?: string;
  title?: string;
  type: 'primary' | 'secondary';
  action: (row?: Row) => void;
}

export type Formatters = 'date' | 'price';
