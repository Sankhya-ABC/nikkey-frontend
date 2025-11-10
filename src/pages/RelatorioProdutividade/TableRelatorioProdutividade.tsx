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

interface TableRelatorioProdutividadeProps {
  paginatedRelatoriosProdutividade: any;
  filteredRelatoriosProdutividade: any;
  rowsPerPage: any;
  page: any;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
}

export const TableRelatorioProdutividade: React.FC<
  TableRelatorioProdutividadeProps
> = ({
  paginatedRelatoriosProdutividade,
  filteredRelatoriosProdutividade,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de clientes">
          <TableHead>
            <TableRow>
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
                Horas Trabalhadas
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Visitas Agendadas
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                OS Realizadas
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                OS Não Realizadas
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Visitas Pendentes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRelatoriosProdutividade?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum relatório encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRelatoriosProdutividade?.map(
                (relatorioProdutividade: any) => (
                  <TableRow key={relatorioProdutividade?.id} hover>
                    <TableCell>{relatorioProdutividade?.tecnico}</TableCell>
                    <TableCell align="center">
                      {relatorioProdutividade?.horasTrabalhadas}
                    </TableCell>
                    <TableCell align="center">
                      {relatorioProdutividade?.visitasAgendadas}
                    </TableCell>
                    <TableCell align="center">
                      {relatorioProdutividade?.osRealizadas}
                    </TableCell>
                    <TableCell align="center">
                      {relatorioProdutividade?.osNaoRealizadas}
                    </TableCell>
                    <TableCell align="center">
                      {relatorioProdutividade?.visitasPendentes}
                    </TableCell>
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredRelatoriosProdutividade?.length}
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
