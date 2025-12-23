import { Search } from "@mui/icons-material";
import { Chip, Grid, InputAdornment } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Action } from "@/components/Table/types";
import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";
import { usuarioService } from "../../services/Usuarios";
import { Usuario } from "../../services/Usuarios/types";
import { GetAllPaginated } from "../../services/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "../../utils/constants";
import { format } from "date-fns";

interface UsuarioSearch {
  search: string;
}

const defaultValues: UsuarioSearch = {
  search: "",
};

interface ConsultaUsuarioProps {
  actions?: Action<Usuario>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaUsuario: React.FC<ConsultaUsuarioProps> = ({
  actions,
  resetConsulta,
  setResetConsulta,
}) => {
  // hooks
  const { control, watch, setValue } = useForm<UsuarioSearch>({
    defaultValues,
  });

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [usuarios, setUsuarios] = useState<GetAllPaginated<Usuario> | null>(
    null,
  );

  // -- search
  const [loading, setLoading] = useState(false);
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

  // useEffects
  useEffect(() => {
    (async () =>
      await buscarTodosUsuarios(rowsPerPage, DEFAULT_PAGE, search))();
  }, [search]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        await buscarTodosUsuarios(rowsPerPage, DEFAULT_PAGE, search);
        setResetConsulta(false);
      })();
    }
  }, [resetConsulta]);

  return (
    <Grid container spacing={3}>
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
                value: (usuario: Usuario) => usuario?.departamento?.descricao,
              },
              {
                text: "Data de Cadastro",
                value: (usuario: Usuario) =>
                  format(
                    usuario?.dataCadastro as string,
                    "dd/MM/yyyy",
                  ) as string,
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
            actions={actions}
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
    </Grid>
  );
};
