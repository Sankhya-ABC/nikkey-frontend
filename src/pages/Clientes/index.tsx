import { Add, Edit, Search, Visibility } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { Button, Chip, Grid, InputAdornment, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";
import { Layout } from "../../components/Template/Layout";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes";
import { Cliente } from "../../services/Clientes/types";
import { CRUDType } from "../../services/types";
import { Role } from "../../types";
import { FormCRUDCliente } from "./FormCRUDCliente";
import { FormStatus } from "./FormStatus";
import { mockClientes } from "./provider";
import { TableClientes } from "./TableClientes";

interface ClienteSearch {
  search: string;
}

const defaultValues: ClienteSearch = {
  search: "",
};

export const Clientes = () => {
  // hooks
  const { control, watch } = useForm<ClienteSearch>({ defaultValues });
  const { impersonate } = useAuth();
  const navigate = useNavigate();

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
          <Table
            headers={[
              {
                text: "Razão Social",
                value: (cliente: Cliente) => cliente?.razaoSocial,
              },
              {
                text: "CPF/CNPJ",
                value: (cliente: Cliente) => cliente?.cnpjCpf,
              },
              {
                text: "Endereco",
                value: (cliente: Cliente) =>
                  `${cliente?.logradouro}, ${cliente?.numero}`,
              },
              {
                text: "Contato",
                value: (cliente: Cliente) => cliente?.telefone,
              },
              {
                text: "Ativo",
                value: (cliente: Cliente) => (
                  <Chip
                    label={cliente?.ativo ? "Ativo" : "Inativo"}
                    color={cliente?.ativo ? "success" : "default"}
                    size="small"
                  />
                ),
              },
            ]}
            actions={[
              {
                tooltip: "Acessar como",
                element: <LoginIcon />,
                onClick: (cliente: Cliente) => () => {
                  impersonate({
                    id: cliente?.id,
                    name: cliente?.razaoSocial,
                    email: cliente?.email,
                    role: Role.COMMON,
                  });
                  navigate(ROUTES.HOME);
                },
              },
              {
                tooltip: "Visualizar",
                element: <Visibility />,
                onClick: (cliente: Cliente) =>
                  handleOpenFormCRUDCliente(CRUDType.READ, cliente),
              },
              {
                tooltip: "Editar",
                element: <Edit />,
                onClick: (cliente: Cliente) =>
                  handleOpenFormCRUDCliente(CRUDType.UPDATE, cliente),
              },
              {
                tooltip: (cliente: Cliente) =>
                  cliente?.ativo ? "Desativar" : "Ativar",
                element: (cliente: Cliente) => (
                  <Switch
                    checked={cliente?.ativo}
                    onChange={() => handleOpenFormStatus(cliente)}
                    color={cliente?.ativo ? "success" : "default"}
                  />
                ),
              },
            ]}
            pagination={{
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
            lists={{
              paginatedList: paginatedClientes,
              filteredList: filteredClientes,
            }}
            itemId={(cliente: Cliente) => cliente?.id!.toString()}
            noResultsMessage={"Nenhum cliente encontrado."}
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
