import { TablePagination, useMediaQuery, useTheme } from "@mui/material";
import { TableProps } from "./types";
import { TableMobile } from "./TableMobile";
import { TableDesktop } from "./TableDesktop";

export const Table: React.FC<TableProps> = ({
  headers,
  actions,
  pagination,
  lists,
  itemId,
  noResultsMessage,
}) => {
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    pagination!;
  const { filteredList } = lists;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const table = isMobile ? (
  //   <TableMobile
  //     {...{ headers, actions, pagination, lists, itemId, noResultsMessage }}
  //   />
  // ) : (
  //   <TableDesktop
  //     {...{ headers, actions, pagination, lists, itemId, noResultsMessage }}
  //   />
  // );

  return (
    <>
      <TableDesktop
        {...{ headers, actions, pagination, lists, itemId, noResultsMessage }}
      />

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredList?.length}
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
