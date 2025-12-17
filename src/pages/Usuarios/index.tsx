import { Add, Edit, Search, Visibility } from "@mui/icons-material";
import { Button, Chip, Grid, InputAdornment, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";
import { Layout } from "../../components/Template/Layout";
import { CRUDType, GetAllPaginated } from "../../services/types";
import { usuarioService } from "../../services/Usuarios";
import { Usuario } from "../../services/Usuarios/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "../../utils/constants";

import { FormCRUDUsuario } from "./FormCRUDUsuario";
import { FormStatus } from "./FormStatus";

interface UsuarioSearch {
  search: string;
}

const defaultValues: UsuarioSearch = {
  search: "",
};

export const Usuarios = () => {
  // hooks
  const { control, watch } = useForm<UsuarioSearch>({ defaultValues });

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [usuarios, setUsuarios] = useState<GetAllPaginated<Usuario> | null>(
    null,
  );
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDUsuario, setOpenFormCRUDUsuario] = useState(false);

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
    buscarTodosUsuarios(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosUsuarios(newRowsPerPage, DEFAULT_PAGE, search);
  };

  // -- crud modals
  const handleOpenFormCRUDUsuario = (
    crudType: CRUDType,
    usuario?: Usuario | null,
  ) => {
    setFormType(crudType);
    setSelectedUsuario(usuario || null);
    setOpenFormCRUDUsuario(true);
  };

  const handleCloseFormCRUDUsuario = () => {
    setSelectedUsuario(null);
    setOpenFormCRUDUsuario(false);
  };

  const persistCallback = async () => {
    handleCloseFormCRUDUsuario();
    handleCloseFormStatus();
    await buscarTodosUsuarios(rowsPerPage, DEFAULT_PAGE, search);
  };

  // -- status modal
  const handleOpenFormStatus = (usuario?: Usuario | null) => {
    setSelectedUsuario(usuario || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedUsuario(null);
    setOpenFormStatus(false);
  };

  // requests
  const buscarTodosUsuarios = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp = await usuarioService.buscarTodosUsuarios({
        per_page,
        page: page + 1,
        search,
      });
      setUsuarios(resp);
    } catch (error: unknown) {
      //
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatusUsuario = async () => {
    setLoading(true);
    try {
      await usuarioService.atualizarStatusUsuario(selectedUsuario?.id!);
      await buscarTodosUsuarios(rowsPerPage, DEFAULT_PAGE, search);
    } catch (error: unknown) {
      //
    } finally {
      setLoading(false);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    (async () => await buscarTodosUsuarios(rowsPerPage, page, search))();
  }, [search]);

  return (
    <Layout title="Usuários">
      <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenFormCRUDUsuario(CRUDType.CREATE, null)}
        >
          Cadastrar
        </Button>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          control={control}
          name="search"
          TextFieldProps={{
            slotProps: {
              input: {
                placeholder: "Pesquise por nome ou email...",
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Loading loading={loading}>
          <Table<Usuario>
            headers={[
              {
                text: "Nome",
                value: (usuario: Usuario) => usuario?.nome,
              },
              {
                text: "E-mail",
                value: (usuario: Usuario) => usuario?.email,
              },
              {
                text: "Departamento",
                value: (usuario: Usuario) => usuario?.departamento,
              },
              {
                text: "Data de Cadastro",
                value: (usuario: Usuario) => usuario?.dataCadastro as string,
              },
              {
                text: "Ativo",
                value: (usuario: Usuario) => (
                  <Chip
                    label={usuario?.ativo ? "Ativo" : "Inativo"}
                    color={usuario?.ativo ? "success" : "default"}
                    size="small"
                  />
                ),
              },
            ]}
            actions={[
              {
                tooltip: "Visualizar",
                element: <Visibility />,
                onClick: (usuario: Usuario) =>
                  handleOpenFormCRUDUsuario(CRUDType.READ, usuario),
              },
              {
                tooltip: "Editar",
                element: <Edit />,
                onClick: (usuario: Usuario) =>
                  handleOpenFormCRUDUsuario(CRUDType.UPDATE, usuario),
              },
              {
                tooltip: (usuario: Usuario) =>
                  usuario?.ativo ? "Desativar" : "Ativar",
                element: (usuario: Usuario) => (
                  <Switch
                    checked={usuario?.ativo}
                    onChange={() => handleOpenFormStatus(usuario)}
                    color={usuario?.ativo ? "success" : "default"}
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
            dataList={usuarios}
            itemId={(usuario: Usuario) => usuario?.id!.toString()}
            noResultsMessage={"Nenhum usuário encontrado."}
          />
        </Loading>
      </Grid>

      <FormCRUDUsuario
        {...{
          open: openFormCRUDUsuario,
          handleClose: handleCloseFormCRUDUsuario,
          selected: selectedUsuario,
          formType,
          persistCallback,
        }}
      />

      <FormStatus
        {...{
          open: openFormStatus,
          handleClose: handleCloseFormStatus,
          selected: selectedUsuario,
          handleToggle: atualizarStatusUsuario,
        }}
      />
    </Layout>
  );
};
