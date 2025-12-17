import { Search } from "@mui/icons-material";
import { Chip, Grid, InputAdornment } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Action } from "@/components/Table/types";
import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";
import { clienteService } from "../../services/Clientes";
import { Cliente } from "../../services/Clientes/types";
import { GetAllPaginated } from "../../services/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "../../utils/constants";

interface ClienteSearch {
  search: string;
}

const defaultValues: ClienteSearch = {
  search: "",
};

interface ConsultaClienteProps {
  actions?: Action<Cliente>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaCliente: React.FC<ConsultaClienteProps> = ({
  actions,
  resetConsulta,
  setResetConsulta,
}) => {
  // hooks
  const { control, watch, setValue } = useForm<ClienteSearch>({
    defaultValues,
  });

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [clientes, setClientes] = useState<GetAllPaginated<Cliente> | null>(
    null,
  );

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

  // requests
  const buscarTodosClientes = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp = await clienteService.buscarTodosClientes({
        per_page,
        page: page + 1,
        search,
      });
      setClientes(resp);
    } catch (error: unknown) {
      //
    } finally {
      setLoading(false);
    }
  };

  // useEffects
  useEffect(() => {
    (async () =>
      await buscarTodosClientes(rowsPerPage, DEFAULT_PAGE, search))();
  }, [search]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        await buscarTodosClientes(rowsPerPage, DEFAULT_PAGE, search);
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
            actions={actions}
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
        </Loading>
      </Grid>
    </Grid>
  );
};
