import { Card, Grid, Typography } from "@mui/material";
import { CardQuantity } from "./components/CardQuantity";

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item size={{ xs: 12 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>

      {/* Gráficos */}
      <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 9 }}>
        <Grid container spacing={3}>
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
            <Card sx={{ p: 3 }} variant="outlined">
              Ordens de Serviço Chart
            </Card>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }} variant="outlined">
              Atendimentos Chart
            </Card>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }} variant="outlined">
              Consumo de Produtos Chart
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Visitas */}
      <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 3 }}>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <Card sx={{ p: 3 }} variant="outlined">
              Lista próximas visitas
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
