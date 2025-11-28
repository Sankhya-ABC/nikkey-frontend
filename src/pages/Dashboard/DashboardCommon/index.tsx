import { Grid } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Loading } from "../../../components/Loading";
import { Layout } from "../../../components/Template/Layout";
import { ConsumoDeProdutosChart } from "./ConsumoDeProdutosChart";
import { FocoPragasEncontradasChart } from "./FocoPragasEncontradasChart";
import { ProximasVisitas } from "./ProximasVisitas";
import { RoedoresCapturadosChart } from "./RoedoresCapturadosChart";
import { UltimaVisita } from "./UltimaVisita";
import { FormDashboard } from "./types";

const defaultValues: FormDashboard = {
  dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

export const DashboardCommon = () => {
  const methods = useForm<FormDashboard>({ defaultValues });
  const { control } = methods;

  const [loading, setLoading] = useState(true);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Dashboard">
        <FormProvider {...methods}>
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
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 9 }}>
              <Grid container spacing={3} alignItems="stretch">
                <Grid item size={{ xs: 12 }}>
                  <UltimaVisita />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <FocoPragasEncontradasChart />
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <RoedoresCapturadosChart />
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <ConsumoDeProdutosChart />
                </Grid>
              </Grid>
            </Grid>

            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 3 }}>
              <Grid container spacing={3}>
                <Grid item size={{ xs: 12 }}>
                  <ProximasVisitas />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </Layout>
    </Loading>
  );
};
