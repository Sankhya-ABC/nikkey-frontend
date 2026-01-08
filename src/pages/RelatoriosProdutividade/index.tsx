import { Grid } from "@mui/material";

import { Layout } from "@/components/Template/Layout";

import { ConsultaRelatorioProdutividade } from "./ConsultaRelatorioProdutividade";

export const RelatoriosProdutividade = () => {
  return (
    <Layout title="Relatório de Produtividade">
      <Grid size={{ xs: 12 }}>
        <ConsultaRelatorioProdutividade />
      </Grid>
    </Layout>
  );
};
