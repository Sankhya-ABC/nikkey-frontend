import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Loading } from "../../../components/Loading";
import { Layout } from "../../../components/Template/Layout";
import { FocoPragasEncontradasChart } from "./FocoPragasEncontradasChart";
import { mockFocoPragasEncontradas } from "./provider";
import { TableFocoPragasEncontradas } from "./TableFocoPragasEncontradas";
import { FormRelatorio } from "./types";

const defaultValues: FormRelatorio = {
  dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

export const RelatorioFocoPragasEncontradas = () => {
  // hooks
  const methods = useForm<FormRelatorio>({ defaultValues });
  const { control } = methods;

  // useStates
  // -- data
  const [filteredFocoPragasEncontradas] = useState(mockFocoPragasEncontradas);

  // -- search
  const [loading, setLoading] = useState(true);

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedFocoPragasEncontradas = filteredFocoPragasEncontradas.slice(
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

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Foco/Pragas Encontradas">
        <FormProvider {...methods}>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12 }}>
                <Grid container spacing={3} sx={{ justifyContent: "end" }}>
                  <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                    <DatePicker
                      label="Data início"
                      name="dataInicio"
                      control={control}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                    <DatePicker
                      label="Data Fim"
                      name="dataFim"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <FocoPragasEncontradasChart />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <TableFocoPragasEncontradas
                  {...{
                    paginatedList: paginatedFocoPragasEncontradas,
                    filteredList: filteredFocoPragasEncontradas,
                    rowsPerPage,
                    page,
                    handleChangePage,
                    handleChangeRowsPerPage,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Layout>
    </Loading>
  );
};
