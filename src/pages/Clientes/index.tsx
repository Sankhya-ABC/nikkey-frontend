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
import { clienteService } from "../../services/Clientes";
import { Cliente } from "../../services/Clientes/types";
import { CRUDType, GetAllPaginated } from "../../services/types";
import { usuarioService } from "../../services/Usuarios";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "../../utils/constants";

import { FormCRUDCliente } from "./FormCRUDCliente";
import { FormStatus } from "./FormStatus";

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
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [clientes, setClientes] = useState<GetAllPaginated<Cliente> | null>(
    null,
  );
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDCliente, setOpenFormCRUDCliente] = useState(false);

  // -- search
  const [loading, setLoading] = useState(true);
  const search = watch("search");

  // handlers
  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    buscarTodosClientes(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosClientes(newRowsPerPage, DEFAULT_PAGE, search);
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

  // -- impersonate
  const handleAcessarComo = async (id: number) => {
    setLoading(true);
    try {
      const resp = await usuarioService.buscarUsuarioPorId(id);
      impersonate(resp);
      navigate(ROUTES.HOME);
    } catch (err: any) {
      //
    } finally {
      setLoading(false);
    }
  };

  // requests
  const buscarTodosClientes = async (
    per_page: number,
    current_page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp = await clienteService.buscarTodosClientes({
        per_page,
        current_page,
        search,
      });
      setClientes(resp);
    } catch (err: any) {
      //
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatusCliente = async () => {
    setLoading(true);
    try {
      await clienteService.atualizarStatusCliente(selectedCliente?.id!);
      await buscarTodosClientes(rowsPerPage, DEFAULT_PAGE, search);
    } catch (err: any) {
      //
    } finally {
      setLoading(false);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    buscarTodosClientes(rowsPerPage, page, search);
  }, [search]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Clientes">
        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenFormCRUDCliente(CRUDType.CREATE, null)}
          >
            Cadastrar
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
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

        <Grid size={{ xs: 12 }}>
          <Table<Cliente>
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
                onClick: (cliente: Cliente) => handleAcessarComo(cliente?.id!),
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
            dataList={clientes}
            itemId={(cliente: Cliente) => cliente?.id!.toString()}
            noResultsMessage={"Nenhum cliente encontrado."}
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
            handleToggle: atualizarStatusCliente,
          }}
        />
      </Layout>
    </Loading>
  );
};
