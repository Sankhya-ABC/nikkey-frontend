import { Breakpoint } from "@mui/material";
import { ChangeEvent, CSSProperties, ReactNode } from "react";

import { GetAllPaginated } from "../../services/types";

export interface HeaderAndValues<T> {
  text?: string;
  totalCustomElement?: ReactNode;
  elementStyle?: CSSProperties;
  value: (value: T) => string | ReactNode;
  columnAlignment?:
    | "left"
    | "center"
    | "right"
    | "justify"
    | "inherit"
    | undefined;
}

export interface Action<T> {
  tooltip: string | ReactNode | ((value: T) => ReactNode);
  element: ReactNode | ((value: T) => ReactNode);
  onClick?: (value: T) => void;
  disabled?: boolean | ((value: T) => boolean);
}

export interface Pagination {
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface TableProps<T> {
  headers: HeaderAndValues<T>[];
  actions?: Action<T>[];
  pagination?: Pagination;
  dataList: GetAllPaginated<T> | null;
  itemId: (value: T) => string | number;
  noResultsMessage?: string | ReactNode;
  isMobileBreakpoint?: Breakpoint;
}
