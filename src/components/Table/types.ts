import { ReactNode } from "react";

export interface HeaderAndValues {
  text?: string;
  totalCustomElement?: ReactNode;
  elementStyle?: any; // any should be CSSProperties
  value: (value: any) => string | ReactNode; // any should be generic T
  columnAlignment?:
    | "left"
    | "center"
    | "right"
    | "justify"
    | "inherit"
    | undefined;
}

export interface Action {
  tooltip: string | ReactNode | ((value: any) => ReactNode);
  element: ReactNode | ((value: any) => ReactNode);
  onClick?: (value: any) => void;
  disabled?: boolean | ((value: any) => boolean);
}

export interface Pagination {
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: any) => void;
}

export interface List {
  paginatedList: any[]; // any should be generic T
  filteredList: any[]; // any should be generic T
}

export interface TableProps {
  headers: HeaderAndValues[];
  actions?: Action[];
  pagination?: Pagination;
  lists: List;
  itemId: (value: any) => string | number; // any should be generic T
  noResultsMessage?: string | ReactNode;
}
