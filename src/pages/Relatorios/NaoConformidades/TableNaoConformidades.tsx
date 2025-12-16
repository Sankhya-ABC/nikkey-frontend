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

import { NaoConformidades } from "./types";

interface TableNaoConformidadesProps {
  paginatedList: NaoConformidades[];
  filteredList: NaoConformidades[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TableNaoConformidades: React.FC<TableNaoConformidadesProps> = ({
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
        <Table stickyHeader aria-label="tabela de não conformidades">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                OS
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Data
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Área e Local
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Não Conformidade
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Ação Sugerida
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
              paginatedList?.map((naoConformidade) => (
                <TableRow key={naoConformidade?.OS} hover>
                  <TableCell align="center">{naoConformidade?.OS}</TableCell>
                  <TableCell align="center">
                    {naoConformidade?.data as string}
                  </TableCell>
                  <TableCell align="center">
                    {naoConformidade?.areaELocal}
                  </TableCell>
                  <TableCell align="center">
                    {naoConformidade?.naoConformidade}
                  </TableCell>
                  <TableCell align="center">
                    {naoConformidade?.acaoSugerida}
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
