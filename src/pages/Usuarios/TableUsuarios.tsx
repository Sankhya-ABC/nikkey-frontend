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
import { ChangeEvent } from "react";

import { CRUDType } from "../../services/types";

import { Usuario } from "./types";

interface TableUsuariosProps {
  paginatedList: Usuario[];
  filteredList: Usuario[];

  rowsPerPage: number;
  page: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;

  handleOpenFormCRUD: (crudType: CRUDType, usuario?: Usuario | null) => void;
  handleOpenFormStatus: (usuario?: Usuario | null) => void;
}

export const TableUsuarios: React.FC<TableUsuariosProps> = ({
  paginatedList,
  handleOpenFormCRUD,
  handleOpenFormStatus,
  filteredList,
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
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum usuário encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((usuario) => (
                <TableRow key={usuario?.id} hover>
                  <TableCell>{usuario?.nome}</TableCell>
                  <TableCell>{usuario?.email}</TableCell>
                  <TableCell>{usuario?.departamento}</TableCell>
                  <TableCell>{usuario?.dataCadastro as string}</TableCell>
                  <TableCell>
                    <Chip
                      label={usuario?.ativo ? "Ativo" : "Inativo"}
                      color={usuario?.ativo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.READ, usuario)
                        }
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.UPDATE, usuario)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={usuario?.ativo ? "Desativar" : "Ativar"}
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={usuario?.ativo}
                        onChange={() => handleOpenFormStatus(usuario)}
                        color={usuario?.ativo ? "success" : "default"}
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
