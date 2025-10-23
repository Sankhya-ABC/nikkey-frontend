import { Grid } from "@mui/material";
import { useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { AtendimentosChart } from "./components/AtendimentosChart";
import { CardQuantity } from "./components/CardQuantity";
import { ConsumoDeProdutosChart } from "./components/ConsumoDeProdutosChart";
import { OrdensDeServicoChart } from "./components/OrdensDeServicoChart";
import { ProximasVisitas } from "./components/ProximasVisitas";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Dashboard">
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 9 }}>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item size={{ xs: 12, sm: 12, md: 4 }}>
                <CardQuantity quantity={11} type="Ordens de Serviço" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 12, md: 4 }}>
                <CardQuantity quantity={163} type="Clientes" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 12, md: 4 }}>
                <CardQuantity quantity={20} type="Equipes" />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <OrdensDeServicoChart />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <AtendimentosChart />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
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
      </Layout>
    </Loading>
  );
};
