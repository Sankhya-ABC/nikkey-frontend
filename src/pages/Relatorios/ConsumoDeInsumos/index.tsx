import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Loading } from "../../../components/Loading";
import { Layout } from "../../../components/Template/Layout";
import { ConsumoDeInsumosChart } from "./ConsumoDeInsumosChart";
import { mockConsumoDeInsumos } from "./provider";
import { TableConsumoDeInsumos } from "./TableConsumoDeInsumos";
import { FormRelatorio } from "./types";

const defaultValues: FormRelatorio = {
  dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

export const RelatorioConsumoDeInsumos = () => {
  // hooks
  const methods = useForm<FormRelatorio>({ defaultValues });
  const { control } = methods;

  // useStates
  // -- data
  const [filteredConsumoDeInsumos] = useState(mockConsumoDeInsumos);

  // -- search
  const [loading, setLoading] = useState(true);

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedConsumoDeInsumos = filteredConsumoDeInsumos.slice(
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
      <Layout title="Consumo de Insumos">
        <FormProvider {...methods}>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={3} sx={{ justifyContent: "end" }}>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                    <DatePicker
                      label="Data início"
                      name="dataInicio"
                      control={control}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                    <DatePicker
                      label="Data Fim"
                      name="dataFim"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <ConsumoDeInsumosChart />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TableConsumoDeInsumos
                  {...{
                    paginatedList: paginatedConsumoDeInsumos,
                    filteredList: filteredConsumoDeInsumos,
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
