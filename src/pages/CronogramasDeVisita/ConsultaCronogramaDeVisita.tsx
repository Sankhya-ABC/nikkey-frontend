import { Search } from "@mui/icons-material";
import { Chip, Grid, InputAdornment } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/Form/Textfield";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Action } from "@/components/Table/types";
import { useAlert } from "@/hooks/useAlert";
import { cronogramaDeVisitaService } from "@/services/CronogramaDeVisita";
import { CronogramaDeVisita } from "@/services/CronogramaDeVisita/types";
import { ErrorMessage, GetAllPaginated, StatusColors } from "@/services/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "@/utils/constants";
import { format } from "date-fns";

interface CronogramaDeVisitaSearch {
  search: string;
}

const defaultValues: CronogramaDeVisitaSearch = {
  search: "",
};

interface ConsultaCronogramaDeVisitaProps {
  actions?: Action<CronogramaDeVisita>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaCronogramaDeVisita: React.FC<
  ConsultaCronogramaDeVisitaProps
> = ({ actions, resetConsulta, setResetConsulta }) => {
  // hooks
  const { control, watch, setValue } = useForm<CronogramaDeVisitaSearch>({
    defaultValues,
  });
  const { showAlert } = useAlert();

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [cronogramasDeVisita, setCronogramasDeVisita] =
    useState<GetAllPaginated<CronogramaDeVisita> | null>(null);

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
    buscarTodosCronogramasDeVisita(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosCronogramasDeVisita(newRowsPerPage, DEFAULT_PAGE, search);
  };

  // requests
  const buscarTodosCronogramasDeVisita = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp =
        await cronogramaDeVisitaService.buscarTodosCronogramasDeVisita({
          per_page,
          page: page + 1,
          search,
        });
      setCronogramasDeVisita(resp);
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
      await buscarTodosCronogramasDeVisita(rowsPerPage, page, search);
    })();
  }, [search]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        setPage(DEFAULT_PAGE);
        await buscarTodosCronogramasDeVisita(rowsPerPage, page, search);
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
          <Table<CronogramaDeVisita>
            headers={[
              {
                text: "Técnico",
                value: (cronogramaDeVisita: CronogramaDeVisita) =>
                  cronogramaDeVisita?.tecnico?.nome,
              },
              {
                text: "Data/Hora",
                value: (cronogramaDeVisita: CronogramaDeVisita) =>
                  format(
                    cronogramaDeVisita?.dataHora as string,
                    "dd/MM/yyyy HH:mm",
                  ) as string,
              },
              {
                text: "Telefone",
                value: (cronogramaDeVisita: CronogramaDeVisita) =>
                  cronogramaDeVisita?.tecnico?.telefone,
              },
              {
                text: "Status",
                value: (cronogramaDeVisita: CronogramaDeVisita) => (
                  <Chip
                    label={cronogramaDeVisita?.status}
                    color={StatusColors[cronogramaDeVisita?.status]}
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
            dataList={cronogramasDeVisita}
            itemId={(cronogramaDeVisita: CronogramaDeVisita) =>
              cronogramaDeVisita?.id!.toString()
            }
            noResultsMessage={"Nenhum cronograma de visita encontrado."}
          />
        </Loading>
      </Grid>
    </Grid>
  );
};
