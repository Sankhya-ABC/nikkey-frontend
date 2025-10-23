import {
  Add,
  Block,
  CheckCircle,
  Edit,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const mockUsers = Array.from({ length: 45 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
  email: `usuario${index + 1}@email.com`,
  departamento: index % 3 === 0 ? `Administração` : `Operacional`,
  ativo: index % 4 === 0 ? true : false,
  dataCadastro: new Date(2024, 0, index + 1).toLocaleDateString("pt-BR"),
}));

export const Clientes = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogType, setDialogType] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (user, type) => {
    setSelectedUser(user);
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setDialogType("");
  };

  const handleDeactivateUser = () => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              ativo: user.ativo === "active" ? "inactive" : "active",
            }
          : user,
      );
      setUsers(updatedUsers);
      handleCloseDialog();
    }
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const renderDialogContent = () => {
    if (!selectedUser) return null;

    switch (dialogType) {
      case "view":
        return (
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Detalhes do Usuário
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Nome
                </Typography>
                <Typography variant="body1">{selectedUser.nome}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{selectedUser.email}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  ativo
                </Typography>
                <Chip
                  label={selectedUser.ativo === "active" ? "Ativo" : "Inativo"}
                  color={
                    selectedUser.ativo === "active" ? "success" : "default"
                  }
                  size="small"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Data de Criação
                </Typography>
                <Typography variant="body1">
                  {selectedUser.dataCadastro}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        );

      case "edit":
        return (
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Editar Usuário
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Funcionalidade de edição em desenvolvimento
            </Alert>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nome"
                defaultValue={selectedUser.nome}
                fullWidth
              />
              <TextField
                label="Email"
                defaultValue={selectedUser.email}
                fullWidth
              />
            </Box>
          </DialogContent>
        );

      case "deactivate":
        return (
          <DialogContent>
            <DialogContentText>
              {selectedUser.ativo === "active"
                ? `Tem certeza que deseja desativar o usuário ${selectedUser.nome}?`
                : `Tem certeza que deseja ativar o usuário ${selectedUser.nome}?`}
            </DialogContentText>
          </DialogContent>
        );

      default:
        return null;
    }
  };

  const renderDialogActions = () => {
    switch (dialogType) {
      case "view":
        return (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Fechar</Button>
          </DialogActions>
        );

      case "edit":
        return (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button variant="contained" onClick={handleCloseDialog}>
              Salvar
            </Button>
          </DialogActions>
        );

      case "deactivate":
        return (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              variant="contained"
              color={selectedUser?.ativo === "active" ? "warning" : "success"}
              onClick={handleDeactivateUser}
            >
              {selectedUser?.ativo === "active" ? "Desativar" : "Ativar"}
            </Button>
          </DialogActions>
        );

      default:
        return null;
    }
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
      <Typography color="primary" sx={{ mt: 2, fontWeight: 600 }}>
        Carregando...
      </Typography>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog(null, "create")}
        >
          Cadastrar Usuário
        </Button>
      </Box>

      <Box sx={{ py: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome ou email..."
          value={searchTerm}
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="tabela de usuários">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Data de Cadastro</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Nenhum usuário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.departamento}</TableCell>
                    <TableCell>{user.dataCadastro}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.ativo ? "Ativo" : "Inativo"}
                        color={user.ativo ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog(user, "view")}
                        title="Visualizar"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDialog(user, "edit")}
                        title="Editar"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDialog(user, "deactivate")}
                        title={user.ativo ? "Desativar" : "Ativar"}
                      >
                        {user.ativo ? <Block /> : <CheckCircle />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredUsers.length}
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

      {/* Diálogo */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "view" && "Visualizar Usuário"}
          {dialogType === "edit" && "Editar Usuário"}
          {dialogType === "deactivate" && "Alterar ativo do Usuário"}
          {dialogType === "create" && "Cadastrar Novo Usuário"}
        </DialogTitle>
        {renderDialogContent()}
        {renderDialogActions()}
      </Dialog>
    </Box>
  );
};
