import {
  Chip,
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
import { OrdemDeServico, StatusColors } from "./types";
import { format } from "date-fns";

interface TableOrdensDeServicoProps {
  paginatedList: OrdemDeServico[];
  filteredList: OrdemDeServico[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: any) => void;
}

export const TableOrdensDeServico: React.FC<TableOrdensDeServicoProps> = ({
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
        <Table stickyHeader aria-label="tabela de ordens de serviço">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Nº OS
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Técnico
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
                Hora Início/Hora Fim
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhuma ordem de serviço encontrada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((ordemDeServico) => (
                <TableRow key={ordemDeServico?.id} hover>
                  <TableCell align="center">{ordemDeServico?.id}</TableCell>
                  <TableCell align="center">
                    {ordemDeServico?.tecnico?.nome}
                  </TableCell>
                  <TableCell align="center">
                    {
                      format(
                        ordemDeServico?.data as string,
                        "dd/MM/yyyy",
                      ) as string
                    }
                  </TableCell>
                  <TableCell align="center">
                    {`${ordemDeServico?.horaInicio as string} - ${ordemDeServico?.horaFim as string}`}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={ordemDeServico?.status}
                      color={StatusColors[ordemDeServico?.status]}
                      size="small"
                    />
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
