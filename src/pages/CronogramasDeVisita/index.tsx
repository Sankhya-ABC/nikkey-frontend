import { Grid } from "@mui/material";

import { Layout } from "@/components/Template/Layout";

import { ConsultaCronogramaDeVisita } from "./ConsultaCronogramaDeVisita";

export const CronogramasDeVisita = () => {
  return (
    <Layout title="Cronograma de Visitas">
      <Grid size={{ xs: 12 }}>
        <ConsultaCronogramaDeVisita />
      </Grid>
    </Layout>
  );
};
