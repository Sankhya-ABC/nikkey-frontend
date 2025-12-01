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
import { CronogramaDeVisitas, StatusColors } from "./types";
import { format } from "date-fns";

interface TableCronogramasDeVisitasProps {
  paginatedList: CronogramaDeVisitas[];
  filteredList: CronogramaDeVisitas[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: any) => void;
}

export const TableCronogramasDeVisitas: React.FC<
  TableCronogramasDeVisitasProps
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
        <Table stickyHeader aria-label="tabela de cronograma de visitas">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Técnico
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Data/Hora
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Telefone
              </TableCell>
              <TableCell
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
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum cronograma de visitas encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((cronogramaDeVisitas) => (
                <TableRow key={cronogramaDeVisitas?.id} hover>
                  <TableCell>{cronogramaDeVisitas?.tecnico?.nome}</TableCell>
                  <TableCell>
                    {
                      format(
                        cronogramaDeVisitas?.dataHora as string,
                        "dd/MM/yyyy HH:mm",
                      ) as string
                    }
                  </TableCell>
                  <TableCell>
                    {cronogramaDeVisitas?.tecnico?.telefone}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cronogramaDeVisitas?.status}
                      color={StatusColors[cronogramaDeVisitas?.status]}
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
