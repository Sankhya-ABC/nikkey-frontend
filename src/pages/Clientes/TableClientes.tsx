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
import { Cliente } from "../../services/Clientes/types";
import { CRUDType } from "../../services/types";
import { Role, useAuth } from "../../hooks/useAuth";

interface TableClientesProps {
  paginatedList: Cliente[];
  filteredList: Cliente[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: any) => void;

  handleOpenFormCRUD: (crudType: CRUDType, cliente?: Cliente | null) => void;
  handleOpenFormStatus: (cliente?: Cliente | null) => void;
}

export const TableClientes: React.FC<TableClientesProps> = ({
  paginatedList,
  handleOpenFormCRUD,
  handleOpenFormStatus,
  filteredList,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { impersonate } = useAuth();

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
                Razão Social
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                CPF/CNPJ
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Endereco
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                Contato
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
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum cliente encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((cliente) => (
                <TableRow key={cliente?.id} hover>
                  <TableCell>{cliente?.razaoSocial}</TableCell>
                  <TableCell>{cliente?.cnpjCpf}</TableCell>
                  <TableCell>
                    {cliente?.logradouro}, {cliente?.numero}
                  </TableCell>
                  <TableCell>{cliente?.telefone}</TableCell>
                  <TableCell>
                    <Chip
                      label={cliente?.ativo ? "Ativo" : "Inativo"}
                      color={cliente?.ativo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Acessar como" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          impersonate({
                            id: cliente?.id,
                            name: cliente?.razaoSocial,
                            email: cliente?.email,
                            role: Role.COMMON,
                          })
                        }
                      >
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Visualizar" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.READ, cliente)
                        }
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.UPDATE, cliente)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={cliente?.ativo ? "Desativar" : "Ativar"}
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={cliente?.ativo}
                        onChange={() => handleOpenFormStatus(cliente)}
                        color={cliente?.ativo ? "success" : "default"}
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
