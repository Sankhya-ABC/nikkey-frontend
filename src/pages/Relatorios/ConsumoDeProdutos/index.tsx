import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Loading } from "../../../components/Loading";
import { Layout } from "../../../components/Template/Layout";
import { ConsumoDeProdutosChart } from "./ConsumoDeProdutosChart";
import { FormRelatorio } from "./types";

const defaultValues: FormRelatorio = {
  dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

export const RelatorioConsumoDeProdutos = () => {
  const methods = useForm<FormRelatorio>({ defaultValues });
  const { control } = methods;

  const [loading, setLoading] = useState(true);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Consumo de Produtos">
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
                <ConsumoDeProdutosChart />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Layout>
    </Loading>
  );
};
