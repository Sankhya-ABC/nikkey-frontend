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

import { ArmadilhasLuminosas } from "./types";

interface TableArmadilhasLuminosasProps {
  paginatedList: ArmadilhasLuminosas[];
  filteredList: ArmadilhasLuminosas[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TableArmadilhasLuminosas: React.FC<
  TableArmadilhasLuminosasProps
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
        <Table stickyHeader aria-label="tabela de armadilhas luminosas">
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
                Mosca
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Mosquito
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Mariposa
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Besouro
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Outros
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Não especificado
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
              paginatedList?.map((armadilhaLuminosas) => (
                <TableRow key={armadilhaLuminosas?.periodo as string} hover>
                  <TableCell align="center">
                    {armadilhaLuminosas?.periodo as string}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.mosca}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.mosquito}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.mariposa}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.besouro}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.outros}
                  </TableCell>
                  <TableCell align="center">
                    {armadilhaLuminosas?.naoEspecificado}
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
