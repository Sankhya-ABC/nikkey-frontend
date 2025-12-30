import { Grid } from "@mui/material";

import { Layout } from "@/components/Template/Layout";

import { ConsultaOrdemDeServico } from "./ConsultaOrdemDeServico";

export const OrdensDeServicoCommon = () => {
  return (
    <Layout title="Ordens de Serviço">
      <Grid size={{ xs: 12 }}>
        <ConsultaOrdemDeServico />
      </Grid>
    </Layout>
  );
};
