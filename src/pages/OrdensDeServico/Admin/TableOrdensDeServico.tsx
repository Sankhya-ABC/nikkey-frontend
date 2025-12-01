import { Edit, Visibility } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
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
import { CRUDType } from "../../../services/types";
import { OrdemDeServico } from "./types";

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

  handleOpenFormCRUD: (
    crudType: CRUDType,
    ordemDeServico?: OrdemDeServico | null,
  ) => void;
  handleOpenFormStatus: (ordemDeServico?: OrdemDeServico | null) => void;
}

export const TableOrdensDeServico: React.FC<TableOrdensDeServicoProps> = ({
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
        <Table stickyHeader aria-label="tabela de ordens de serviço">
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
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhuma ordem de serviço encontrada.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((ordemDeServico) => (
                <TableRow key={ordemDeServico?.id} hover>
                  <TableCell>{ordemDeServico?.id}</TableCell>
                  <TableCell>{ordemDeServico?.cliente.nome}</TableCell>
                  <TableCell>{ordemDeServico?.tecnico.nome}</TableCell>
                  <TableCell>{`${ordemDeServico?.data?.data} ${ordemDeServico?.data?.horaInicio} - ${ordemDeServico?.data?.horaFinal}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={ordemDeServico?.ativo ? "Ativo" : "Inativo"}
                      color={ordemDeServico?.ativo ? "success" : "default"}
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
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.READ, ordemDeServico)
                        }
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow placement="top">
                      <IconButton
                        onClick={() =>
                          handleOpenFormCRUD(CRUDType.UPDATE, ordemDeServico)
                        }
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
                        onChange={() => handleOpenFormStatus(ordemDeServico)}
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
