import { Search } from "@mui/icons-material";
import { Chip, Grid, InputAdornment } from "@mui/material";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/Form/Textfield";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Action } from "@/components/Table/types";
import { useAlert } from "@/hooks/useAlert";
import { ordemDeServicoService } from "@/services/OrdensDeServico";
import { OrdemDeServico } from "@/services/OrdensDeServico/types";
import { ErrorMessage, GetAllPaginated } from "@/services/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "@/utils/constants";

interface OrdemDeServicoSearch {
  search: string;
}

const defaultValues: OrdemDeServicoSearch = {
  search: "",
};

interface ConsultaOrdemDeServicoProps {
  actions?: Action<OrdemDeServico>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaOrdemDeServico: React.FC<ConsultaOrdemDeServicoProps> = ({
  actions,
  resetConsulta,
  setResetConsulta,
}) => {
  // hooks
  const { control, watch, setValue } = useForm<OrdemDeServicoSearch>({
    defaultValues,
  });
  const { showAlert } = useAlert();

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [ordensDeServico, setOrdensDeServico] =
    useState<GetAllPaginated<OrdemDeServico> | null>(null);

  // -- search
  const [loading, setLoading] = useState(false);

  // variables
  const search = watch("search");

  // handlers
  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    buscarTodosOrdensDeServico(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosOrdensDeServico(newRowsPerPage, DEFAULT_PAGE, search);
  };

  // requests
  const buscarTodosOrdensDeServico = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp = await ordemDeServicoService.buscarTodasOrdensDeServico({
        per_page,
        page: page + 1,
        search,
      });
      setOrdensDeServico(resp);
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message,
        severity: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // useEffects
  useEffect(() => {
    (async () => {
      setPage(DEFAULT_PAGE);
      await buscarTodosOrdensDeServico(rowsPerPage, page, search);
    })();
  }, [search]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        setPage(DEFAULT_PAGE);
        await buscarTodosOrdensDeServico(rowsPerPage, page, search);
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
                placeholder: "Pesquise por nome, email ou Nº da OS...",
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
          <Table<OrdemDeServico>
            headers={[
              {
                text: "Nº Ordem",
                value: (ordemDeServico: OrdemDeServico) => ordemDeServico?.id,
              },
              {
                text: "Cliente",
                value: (ordemDeServico: OrdemDeServico) =>
                  ordemDeServico?.cliente.nome,
              },
              {
                text: "Técnico",
                value: (ordemDeServico: OrdemDeServico) =>
                  ordemDeServico?.tecnico.nome,
              },
              {
                text: "Data e Hora",
                value: (ordemDeServico: OrdemDeServico) =>
                  `${
                    format(
                      ordemDeServico?.data?.data as string,
                      "dd/MM/yyyy",
                    ) as string
                  } ${
                    format(
                      ordemDeServico?.data?.horaInicio as string,
                      "HH:mm",
                    ) as string
                  } - ${
                    format(
                      ordemDeServico?.data?.horaFinal as string,
                      "HH:mm",
                    ) as string
                  }`,
              },
              {
                text: "Ativo",
                value: (ordemDeServico: OrdemDeServico) => (
                  <Chip
                    label={ordemDeServico?.ativo ? "Ativo" : "Inativo"}
                    color={ordemDeServico?.ativo ? "success" : "default"}
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
            dataList={ordensDeServico}
            itemId={(ordemDeServico: OrdemDeServico) =>
              ordemDeServico?.id!.toString()
            }
            noResultsMessage={"Nenhuma ordem de serviço encontrada."}
          />
        </Loading>
      </Grid>
    </Grid>
  );
};
