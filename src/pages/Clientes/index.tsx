import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { FormCRUDCliente } from "./FormCRUDCliente";
import { FormStatus } from "./FormStatus";
import { mockClientes } from "./provider";
import { TableClientes } from "./TableClientes";
import { Cliente } from "./types";
import { CRUDType } from "../../types";
import { useForm } from "react-hook-form";
import { TextField } from "../../components/Form/Textfield";

interface ClienteSearch {
  search: string;
}

const defaultValues: ClienteSearch = {
  search: "",
};

export const Clientes = () => {
  // hooks
  const { control, watch } = useForm<ClienteSearch>({ defaultValues });

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
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedClientes = filteredClientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // handlers

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
    cliente?: Cliente | null,
  ) => {
    setFormType(crudType);
    setSelectedCliente(cliente || null);
    setOpenFormCRUDCliente(true);
  };

  const handleCloseFormCRUDCliente = () => {
    setSelectedCliente(null);
    setOpenFormCRUDCliente(false);
  };

  // -- status modal
  const handleOpenFormStatus = (cliente?: Cliente | null) => {
    setSelectedCliente(cliente || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedCliente(null);
    setOpenFormStatus(false);
  };

  const handleToggleClienteStatus = () => {
    if (selectedCliente) {
      const updatedClientes = clientes?.map((cliente) =>
        cliente?.id === selectedCliente.id
          ? {
              ...cliente,
              ativo: !cliente?.ativo,
            }
          : cliente,
      );
      setClientes(updatedClientes);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente?.nomeFantasia?.toLowerCase()?.includes(search?.toLowerCase()) ||
        cliente?.email?.toLowerCase()?.includes(search?.toLowerCase()),
    );
    setFilteredClientes(filtered);
    setPage(0);
  }, [search, clientes]);

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
            control={control}
            name="search"
            TextFieldProps={{
              InputProps: {
                placeholder: "Pesquise por nome ou email...",
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
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
