import { Grid } from "@mui/material";
import { useState } from "react";

import { Layout } from "../../components/Template/Layout";

import { ConsultaRelatorioProdutividade } from "./ConsultaRelatorioProdutividade";

export const RelatoriosProdutividade = () => {
  // useStates
  const [resetConsulta, setResetConsulta] = useState<boolean>(false);

  return (
    <Layout title="Relatório de Produtividade">
      <Grid size={{ xs: 12 }}>
        <ConsultaRelatorioProdutividade
          resetConsulta={resetConsulta}
          setResetConsulta={setResetConsulta}
        />
      </Grid>
    </Layout>
  );
};
