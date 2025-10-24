import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { ModalDesativar } from "./ModaDesativar";
import { ModalCadastrar } from "./ModalCadastrar";
import { ModalEditar } from "./ModalEditar";
import { ModalVisualizar } from "./ModalVisualizar";
import { mockClientes } from "./provider";
import { TableClientes } from "./TableClientes";

export const Clientes = () => {
  const [users, setUsers] = useState(mockClientes);
  const [filteredUsers, setFilteredUsers] = useState(mockClientes);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user?.nome?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  const handleOpenViewDialog = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleOpenDeactivateDialog = (user) => {
    setSelectedUser(user);
    setOpenDeactivateDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedUser(null);
    setOpenCreateDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
    setSelectedUser(null);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setSelectedUser(null);
  };

  const handleToggleUserStatus = () => {
    if (selectedUser) {
      const updatedUsers = users?.map((user) =>
        user?.id === selectedUser?.id
          ? {
              ...user,
              ativo: !user?.ativo,
            }
          : user,
      );
      setUsers(updatedUsers);
      handleCloseDeactivateDialog();
    }
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Clientes">
        <Grid
          item
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreateDialog}
          >
            Cadastrar
          </Button>
        </Grid>

        <Grid item size={{ xs: 12 }}>
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
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TableClientes
            {...{
              paginatedUsers,
              handleOpenViewDialog,
              handleOpenEditDialog,
              handleOpenDeactivateDialog,
              filteredUsers,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <ModalVisualizar
          {...{
            selectedUser,
            openViewDialog,
            handleCloseViewDialog,
          }}
        />

        <ModalEditar
          {...{
            selectedUser,
            openEditDialog,
            handleCloseEditDialog,
          }}
        />

        <ModalDesativar
          {...{
            selectedUser,
            handleToggleUserStatus,
            openDeactivateDialog,
            handleCloseDeactivateDialog,
          }}
        />

        <ModalCadastrar
          {...{
            openCreateDialog,
            handleCloseCreateDialog,
          }}
        />
      </Layout>
    </Loading>
  );
};
