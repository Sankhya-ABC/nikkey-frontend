import { Edit, Visibility } from "@mui/icons-material";
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
  paginatedUsers: any;
  handleOpenViewDialog: any;
  handleOpenEditDialog: any;
  handleOpenDeactivateDialog: any;
  filteredUsers: any;
  rowsPerPage: any;
  page: any;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
}

export const TableClientes: React.FC<TableClientesProps> = ({
  paginatedUsers,
  handleOpenViewDialog,
  handleOpenEditDialog,
  handleOpenDeactivateDialog,
  filteredUsers,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de usuários">
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
            {paginatedUsers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum cliente encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers?.map((user: any) => (
                <TableRow key={user?.id} hover>
                  <TableCell>{user?.nome}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.departamento}</TableCell>
                  <TableCell>{user?.dataCadastro}</TableCell>
                  <TableCell>
                    <Chip
                      label={user?.ativo ? "Ativo" : "Inativo"}
                      color={user?.ativo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar" arrow placement="top">
                      <IconButton onClick={() => handleOpenViewDialog(user)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton onClick={() => handleOpenEditDialog(user)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={user?.ativo ? "Desativar" : "Ativar"}
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={user?.ativo}
                        onChange={() => handleOpenDeactivateDialog(user)}
                        color={user?.ativo ? "success" : "default"}
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
        count={filteredUsers?.length}
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
