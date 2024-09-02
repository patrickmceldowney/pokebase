export interface TableData {
  columns: Column[];
  rows: Row[];
  filters?: TableFilter[];
  options?: TableOptions;
}

export interface Column {
  title: string;
  key: string;
  component?: 'link' | 'label' | 'set' | 'image';
  format?: Formatters;
  componentOptions?: ComponentLabelOptions &
    ComponentLinkOptions &
    ComponentImageOptions;
  sortable?: boolean;
  sortField?: string;
}

export interface Row {
  [key: string]: string | number | boolean | object;
}

export interface TableFilter {
  type: 'date' | 'dropdown';
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
  href?: string;
}

export interface ComponentImageOptions {
  src?: string;
  alt?: string;
  size?: {
    width: number;
    height: number;
  };
}

export interface PokemonSet {
  id?: string;
  name?: string;
  series?: string;
  printedTotal?: number;
  total?: number;
  legalities?: {
    unlimited?: string;
  };
  ptcgoCode?: 'TM';
  releaseData?: string;
  updatesAt?: string;
  images?: {
    symbol?: string;
    logo?: string;
  };
}

export interface Action {
  icon?: string;
  title?: string;
  type: 'primary' | 'secondary';
  action: (row?: Row) => void;
}

export type Formatters = 'date' | 'price';
