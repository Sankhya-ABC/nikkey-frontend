import { Search } from "@mui/icons-material";
import { Chip, Grid, InputAdornment } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/Form/Textfield";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Action } from "@/components/Table/types";
import { useAlert } from "@/hooks/useAlert";
import { ordemDeServicoCommonService } from "@/services/OrdemDeServico/Common";
import { OrdemDeServico } from "@/services/OrdemDeServico/Common/types";
import { ErrorMessage, GetAllPaginated, StatusColors } from "@/services/types";
import {
  DEFAULT_DATA_FIM,
  DEFAULT_DATA_INICIO,
  DEFAULT_PAGE,
  DEFAULT_ROWS_PER_PAGE,
} from "@/utils/constants";
import { format } from "date-fns";
import { DatePicker } from "@/components/Form/DatePicker";
import { useAuth } from "@/hooks/useAuth";

interface OrdemDeServicoSearch {
  search: string;
  dataInicio: Date | string;
  dataFim: Date | string;
}

const defaultValues: OrdemDeServicoSearch = {
  search: "",
  dataInicio: DEFAULT_DATA_INICIO,
  dataFim: DEFAULT_DATA_FIM,
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
  const { getUser } = useAuth();

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
  const dataInicio = watch("dataInicio");
  const dataFim = watch("dataFim");
  const idCliente = getUser()?.cliente?.id;

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
      const resp = await ordemDeServicoCommonService.buscarTodasOrdensDeServico(
        {
          per_page,
          page: page + 1,
          search,
          dataInicio: format(dataInicio, "yyyy-MM-dd"),
          dataFim: format(dataFim, "yyyy-MM-dd"),
          idCliente: idCliente as number,
        },
      );
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
  }, [search, dataInicio, dataFim]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        setPage(DEFAULT_PAGE);
        setValue("dataInicio", DEFAULT_DATA_INICIO);
        setValue("dataFim", DEFAULT_DATA_FIM);

        await buscarTodosOrdensDeServico(rowsPerPage, page, search);
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
                placeholder:
                  "Pesquise por nome/email do técnico ou nº da OS...",
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
          <Table<OrdemDeServico>
            headers={[
              {
                text: "Nº OS",
                value: (ordemDeServico: OrdemDeServico) =>
                  ordemDeServico?.numOS,
              },
              {
                text: "Técnico",
                value: (ordemDeServico: OrdemDeServico) =>
                  ordemDeServico?.tecnico?.nome,
              },
              {
                text: "Data e Hora",
                value: (ordemDeServico: OrdemDeServico) =>
                  `${format(ordemDeServico?.data as string, "dd/MM/yyyy")} ${ordemDeServico?.horaInicio} - ${
                    ordemDeServico?.horaFim
                  }`,
              },
              {
                text: "Status",
                value: (ordemDeServico: OrdemDeServico) => (
                  <Chip
                    label={ordemDeServico?.status}
                    color={StatusColors[ordemDeServico?.status]}
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
              ordemDeServico?.numOS!.toString()
            }
            noResultsMessage={"Nenhuma ordem de serviço encontrada."}
          />
        </Loading>
      </Grid>
    </Grid>
  );
};
