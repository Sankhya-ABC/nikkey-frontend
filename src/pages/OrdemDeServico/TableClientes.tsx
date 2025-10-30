import { Edit, Visibility } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
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

interface TableClientesProps {
  paginatedCostumers: any;
  handleOpenViewDialog: any;
  handleOpenEditDialog: any;
  handleOpenDeactivateDialog: any;
  filteredcostumers: any;
  rowsPerPage: any;
  page: any;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
}

export const TableClientes: React.FC<TableClientesProps> = ({
  paginatedCostumers,
  handleOpenViewDialog,
  handleOpenEditDialog,
  handleOpenDeactivateDialog,
  filteredcostumers,
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
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Departamento
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Data de Cadastro
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
            {paginatedCostumers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum cliente encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCostumers?.map((costumer: any) => (
                <TableRow key={costumer?.id} hover>
                  <TableCell>{costumer?.nome}</TableCell>
                  <TableCell>{costumer?.email}</TableCell>
                  <TableCell>{costumer?.departamento}</TableCell>
                  <TableCell>{costumer?.dataCadastro}</TableCell>
                  <TableCell>
                    <Chip
                      label={costumer?.ativo ? "Ativo" : "Inativo"}
                      color={costumer?.ativo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Acessar como" arrow placement="top">
                      <IconButton onClick={() => null}>
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Visualizar" arrow placement="top">
                      <IconButton
                        onClick={() => handleOpenViewDialog(costumer)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton
                        onClick={() => handleOpenEditDialog(costumer)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={costumer?.ativo ? "Desativar" : "Ativar"}
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={costumer?.ativo}
                        onChange={() => handleOpenDeactivateDialog(costumer)}
                        color={costumer?.ativo ? "success" : "default"}
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
        count={filteredcostumers?.length}
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
