import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { FormCRUDCliente } from "./FormCRUDCliente";
import { FormStatus } from "./FormStatus";
import { mockClientes } from "./provider";
import { TableClientes } from "./TableClientes";
import { Cliente } from "./types";
import { CRUDType } from "../../types";

export const Clientes = () => {
  // useStates
  // -- data
  const [clientes, setClientes] = useState(mockClientes);
  const [filteredClientes, setFilteredClientes] = useState(mockClientes);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDCliente, setOpenFormCRUDCliente] = useState(false);

  // -- search
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedClientes = filteredClientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // handlers
  // -- search
  const handleSearchChange = (event: any) => {
    setSearchTerm(event?.target?.value);
  };

  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  // -- crud modals
  const handleOpenFormCRUDCliente = (
    crudType: CRUDType,
    costumer?: Cliente | null,
  ) => {
    setFormType(crudType);
    setSelectedCliente(costumer || null);
    setOpenFormCRUDCliente(true);
  };

  const handleCloseFormCRUDCliente = () => {
    setSelectedCliente(null);
    setOpenFormCRUDCliente(false);
  };

  // -- status modal
  const handleOpenFormStatus = (costumer?: Cliente | null) => {
    setSelectedCliente(costumer || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedCliente(null);
    setOpenFormStatus(false);
  };

  const handleToggleClienteStatus = () => {
    if (selectedCliente) {
      const updatedClientes = clientes?.map((costumer) =>
        costumer?.id === selectedCliente.id
          ? {
              ...costumer,
              ativo: !costumer?.ativo,
            }
          : costumer,
      );
      setClientes(updatedClientes);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    const filtered = clientes.filter(
      (costumer) =>
        costumer?.nomeFantasia
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        costumer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredClientes(filtered);
    setPage(0);
  }, [searchTerm, clientes]);

  console.log(formType, selectedCliente);

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
            onClick={() => handleOpenFormCRUDCliente(CRUDType.CREATE, null)}
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
            autoComplete="no"
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
              paginatedList: paginatedClientes,
              handleOpenFormCRUD: handleOpenFormCRUDCliente,
              handleOpenFormStatus,
              filteredList: filteredClientes,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <FormCRUDCliente
          {...{
            open: openFormCRUDCliente,
            handleClose: handleCloseFormCRUDCliente,
            selected: selectedCliente,
            formType,
          }}
        />

        <FormStatus
          {...{
            open: openFormStatus,
            handleClose: handleCloseFormStatus,
            selected: selectedCliente,
            handleToggle: handleToggleClienteStatus,
          }}
        />
      </Layout>
    </Loading>
  );
};
