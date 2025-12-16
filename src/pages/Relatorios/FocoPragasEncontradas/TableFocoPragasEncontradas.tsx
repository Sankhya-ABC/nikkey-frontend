import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

import { FocoPragasEncontradas } from "./types";

interface TableFocoPragasEncontradasProps {
  paginatedList: FocoPragasEncontradas[];
  filteredList: FocoPragasEncontradas[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TableFocoPragasEncontradas: React.FC<
  TableFocoPragasEncontradasProps
> = ({
  paginatedList,
  filteredList,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de foco pragas encontradas">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Período
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Pragas Encontradas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum relatório encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((focoPragasEncontrada) => (
                <TableRow key={focoPragasEncontrada?.periodo as string} hover>
                  <TableCell align="center">
                    {focoPragasEncontrada?.periodo as string}
                  </TableCell>
                  <TableCell align="center">
                    {focoPragasEncontrada?.quantidade}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Paper>
  );
};
