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

export const OrdemDeServico = () => {
  const [costumers, setCostumer] = useState(mockClientes);
  const [filteredCostumers, setFilteredCostumers] = useState(mockClientes);
  const [loading, setLoading] = useState(true);

  const [selectedCostumer, setSelectedCostumer] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const filtered = costumers.filter(
      (costumer) =>
        costumer?.nome?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        costumer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredCostumers(filtered);
    setPage(0);
  }, [searchTerm, costumers]);

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

  const handleOpenViewDialog = (costumer) => {
    setSelectedCostumer(costumer);
    setOpenViewDialog(true);
  };

  const handleOpenEditDialog = (costumer) => {
    setSelectedCostumer(costumer);
    setOpenEditDialog(true);
  };

  const handleOpenDeactivateDialog = (costumer) => {
    setSelectedCostumer(costumer);
    setOpenDeactivateDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedCostumer(null);
    setOpenCreateDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedCostumer(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCostumer(null);
  };

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
    setSelectedCostumer(null);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setSelectedCostumer(null);
  };

  const handleToggleCostumerStatus = () => {
    if (selectedCostumer) {
      const updatedCostumers = costumers?.map((costumer) =>
        costumer?.id === selectedCostumer?.id
          ? {
              ...costumer,
              ativo: !costumer?.ativo,
            }
          : costumer,
      );
      setCostumer(updatedCostumers);
      handleCloseDeactivateDialog();
    }
  };

  const paginatedCostumers = filteredCostumers.slice(
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
              paginatedCostumers,
              handleOpenViewDialog,
              handleOpenEditDialog,
              handleOpenDeactivateDialog,
              filteredCostumers,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <ModalVisualizar
          {...{
            selectedCostumer,
            openViewDialog,
            handleCloseViewDialog,
          }}
        />

        <ModalEditar
          {...{
            selectedCostumer,
            openEditDialog,
            handleCloseEditDialog,
          }}
        />

        <ModalDesativar
          {...{
            selectedCostumer,
            handleToggleCostumerStatus,
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
