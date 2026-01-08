import { Search } from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DatePicker } from "@/components/Form/DatePicker";
import { TextField } from "@/components/Form/Textfield";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Action } from "@/components/Table/types";
import { useAlert } from "@/hooks/useAlert";
import { relatorioProdutividadeService } from "@/services/RelatorioProdutividade";
import { RelatorioProdutividade } from "@/services/RelatorioProdutividade/types";
import { ErrorMessage, GetAllPaginated } from "@/services/types";
import {
  DEFAULT_DATA_FIM,
  DEFAULT_DATA_INICIO,
  DEFAULT_PAGE,
  DEFAULT_ROWS_PER_PAGE,
} from "@/utils/constants";
import { format } from "date-fns";

interface RelatorioProdutividadeSearch {
  search: string;
  dataInicio: Date | string;
  dataFim: Date | string;
}

const defaultValues: RelatorioProdutividadeSearch = {
  search: "",
  dataInicio: DEFAULT_DATA_INICIO,
  dataFim: DEFAULT_DATA_FIM,
};

interface ConsultaRelatorioProdutividadeProps {
  actions?: Action<RelatorioProdutividade>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaRelatorioProdutividade: React.FC<
  ConsultaRelatorioProdutividadeProps
> = ({ actions, resetConsulta, setResetConsulta }) => {
  // hooks
  const { control, watch, setValue } = useForm<RelatorioProdutividadeSearch>({
    defaultValues,
  });
  const { showAlert } = useAlert();

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [relatoriosProdutividade, setRelatoriosProdutividade] =
    useState<GetAllPaginated<RelatorioProdutividade> | null>(null);

  // -- search
  const [loading, setLoading] = useState(false);

  // variables
  const search = watch("search");
  const dataInicio = watch("dataInicio");
  const dataFim = watch("dataFim");

  // handlers
  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    buscarTodosRelatoriosProdutividade(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosRelatoriosProdutividade(newRowsPerPage, DEFAULT_PAGE, search);
  };

  // requests
  const buscarTodosRelatoriosProdutividade = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp =
        await relatorioProdutividadeService.buscarTodosRelatoriosProdutividade({
          per_page,
          page: page + 1,
          search,
          dataInicio: format(dataInicio, "yyyy-MM-dd"),
          dataFim: format(dataFim, "yyyy-MM-dd"),
        });
      setRelatoriosProdutividade(resp);
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
      await buscarTodosRelatoriosProdutividade(rowsPerPage, page, search);
    })();
  }, [search, dataInicio, dataFim]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        setPage(DEFAULT_PAGE);
        setValue("dataInicio", DEFAULT_DATA_INICIO);
        setValue("dataFim", DEFAULT_DATA_FIM);

        await buscarTodosRelatoriosProdutividade(rowsPerPage, page, search);
        setResetConsulta(false);
      })();
    }
  }, [resetConsulta]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          control={control}
          name="search"
          TextFieldProps={{
            slotProps: {
              input: {
                placeholder: "Pesquise por nome do técnico...",
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

      <Grid size={{ xs: 12, md: 3 }}>
        <DatePicker label="Data início" name="dataInicio" control={control} />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <DatePicker label="Data fim" name="dataFim" control={control} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Loading loading={loading}>
          <Table<RelatorioProdutividade>
            headers={[
              {
                text: "Técnico",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.tecnico?.nome,
              },
              {
                text: "Horas Trabalhadas",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.horasTrabalhadas,
              },
              {
                text: "Visitas Agendadas",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.visitasAgendadas,
              },
              {
                text: "OS Realizadas",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.osRealizadas,
              },
              {
                text: "OS Não Realizadas",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.osNaoRealizadas,
              },
              {
                text: "Visitas Pendentes",
                value: (relatorioProdutividade: RelatorioProdutividade) =>
                  relatorioProdutividade?.visitasPendentes,
              },
            ]}
            actions={actions}
            pagination={{
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
            dataList={relatoriosProdutividade}
            itemId={(relatorioProdutividade: RelatorioProdutividade) =>
              relatorioProdutividade?.id!.toString()
            }
            noResultsMessage={"Nenhum relatório de produtividade encontrado."}
          />
        </Loading>
      </Grid>
    </Grid>
  );
};
