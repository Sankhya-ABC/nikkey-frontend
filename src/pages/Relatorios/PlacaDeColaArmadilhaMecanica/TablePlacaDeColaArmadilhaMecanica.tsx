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

import { PlacaDeColaArmadilhaMecanica } from "./types";

interface TablePlacaDeColaArmadilhaMecanicaProps {
  paginatedList: PlacaDeColaArmadilhaMecanica[];
  filteredList: PlacaDeColaArmadilhaMecanica[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: any) => void;
}

export const TablePlacaDeColaArmadilhaMecanica: React.FC<
  TablePlacaDeColaArmadilhaMecanicaProps
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
        <Table
          stickyHeader
          aria-label="tabela de placa de cola/armadilha mecânica"
        >
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
                Placa de Cola/Armadilha Mecânica
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
              paginatedList?.map((placaDeColaArmadilhaMecanica) => (
                <TableRow
                  key={placaDeColaArmadilhaMecanica?.periodo as string}
                  hover
                >
                  <TableCell align="center">
                    {placaDeColaArmadilhaMecanica?.periodo as string}
                  </TableCell>
                  <TableCell align="center">
                    {placaDeColaArmadilhaMecanica?.quantidade}
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
