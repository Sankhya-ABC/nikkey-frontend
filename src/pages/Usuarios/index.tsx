import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { FormCRUDUsuario } from "./FormCRUDUsuario";
import { FormStatus } from "./FormStatus";
import { mockUsuarios } from "./provider";
import { TableUsuarios } from "./TableUsuarios";
import { Usuario } from "./types";
import { CRUDType } from "../../types";
import { useForm } from "react-hook-form";
import { TextField } from "../../components/Form/Textfield";

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
  // -- data
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [filteredUsuarios, setFilteredUsuarios] = useState(mockUsuarios);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDUsuario, setOpenFormCRUDUsuario] = useState(false);

  // -- search
  const [loading, setLoading] = useState(true);
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedUsuarios = filteredUsuarios.slice(
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

  // -- status modal
  const handleOpenFormStatus = (usuario?: Usuario | null) => {
    setSelectedUsuario(usuario || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedUsuario(null);
    setOpenFormStatus(false);
  };

  const handleToggleUsuarioStatus = () => {
    if (selectedUsuario) {
      const updatedUsuarios = usuarios?.map((usuario) =>
        usuario?.id === selectedUsuario.id
          ? {
              ...usuario,
              ativo: !usuario?.ativo,
            }
          : usuario,
      );
      setUsuarios(updatedUsuarios);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    const filtered = usuarios.filter(
      (usuario) =>
        usuario?.nome?.toLowerCase()?.includes(search?.toLowerCase()) ||
        usuario?.email?.toLowerCase()?.includes(search?.toLowerCase()),
    );
    setFilteredUsuarios(filtered);
    setPage(0);
  }, [search, usuarios]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Usuários">
        <Grid
          item
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenFormCRUDUsuario(CRUDType.CREATE, null)}
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
          <TableUsuarios
            {...{
              paginatedList: paginatedUsuarios,
              handleOpenFormCRUD: handleOpenFormCRUDUsuario,
              handleOpenFormStatus,
              filteredList: filteredUsuarios,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <FormCRUDUsuario
          {...{
            open: openFormCRUDUsuario,
            handleClose: handleCloseFormCRUDUsuario,
            selected: selectedUsuario,
            formType,
          }}
        />

        <FormStatus
          {...{
            open: openFormStatus,
            handleClose: handleCloseFormStatus,
            selected: selectedUsuario,
            handleToggle: handleToggleUsuarioStatus,
          }}
        />
      </Layout>
    </Loading>
  );
};
