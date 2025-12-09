import { TablePagination, useMediaQuery, useTheme } from "@mui/material";
import { TableProps } from "./types";
import { TableMobile } from "./TableMobile";
import { TableDesktop } from "./TableDesktop";

export const Table: React.FC<TableProps> = ({
  headers,
  actions,
  pagination,
  dataList,
  itemId,
  noResultsMessage,
  isMobileBreakpoint = "md",
}) => {
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    pagination!;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(isMobileBreakpoint));
  const total = dataList?.meta?.total || 0;

  const table = isMobile ? (
    <TableMobile
      {...{
        headers,
        actions,
        pagination,
        dataList,
        itemId,
        noResultsMessage,
        isMobileBreakpoint,
      }}
    />
  ) : (
    <TableDesktop
      {...{
        headers,
        actions,
        pagination,
        dataList,
        itemId,
        noResultsMessage,
        isMobileBreakpoint,
      }}
    />
  );

  return (
    <>
      {table}

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      )}
    </>
  );
};
