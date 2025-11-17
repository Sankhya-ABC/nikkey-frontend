import { Edit, Visibility } from "@mui/icons-material";
import PrintIcon from "@mui/icons-material/Print";
import {
  Chip,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

interface TableOrdensDeServicoProps {
  paginatedOrdemDeServicos: any;
  handleOpenViewDialog: any;
  handleOpenEditDialog: any;
  handleOpenDeactivateDialog: any;
  filteredOrdemDeServicos: any;
  rowsPerPage: any;
  page: any;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
}

export const TableOrdensDeServico: React.FC<TableOrdensDeServicoProps> = ({
  paginatedOrdemDeServicos,
  handleOpenViewDialog,
  handleOpenEditDialog,
  handleOpenDeactivateDialog,
  filteredOrdemDeServicos,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de ordens de servico">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Nº Ordem
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Cliente
              </TableCell>
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
                Data e Hora
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Ativo
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrdemDeServicos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhuma ordem de serviço encontrada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrdemDeServicos?.map((ordemDeServico: any) => (
                <TableRow key={ordemDeServico?.numero} hover>
                  <TableCell>{ordemDeServico?.numero}</TableCell>
                  <TableCell>{ordemDeServico?.cliente}</TableCell>
                  <TableCell>{ordemDeServico?.tecnico}</TableCell>
                  <TableCell>{`${ordemDeServico?.dataHora?.data?.split("-").reverse().join("/")} ${ordemDeServico?.dataHora?.horaDe} - ${ordemDeServico?.dataHora?.horaAte}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={ordemDeServico?.ativo ? "Ativo" : "Inativo"}
                      color={ordemDeServico?.ativo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar" arrow placement="top">
                      <IconButton
                        onClick={() => handleOpenViewDialog(ordemDeServico)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton
                        onClick={() => handleOpenEditDialog(ordemDeServico)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Imprimir" arrow placement="top">
                      <IconButton onClick={() => null}>
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={ordemDeServico?.ativo ? "Desativar" : "Ativar"}
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={ordemDeServico?.ativo}
                        onChange={() =>
                          handleOpenDeactivateDialog(ordemDeServico)
                        }
                        color={ordemDeServico?.ativo ? "success" : "default"}
                      />
                    </Tooltip>
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
        count={filteredOrdemDeServicos?.length}
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
