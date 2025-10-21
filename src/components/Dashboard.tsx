import React from "react";
import { Box, Paper, Typography, Grid, Card, CardContent } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Vendas
              </Typography>
              <Typography variant="h5" component="div">
                R$ 12,345
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Usuários
              </Typography>
              <Typography variant="h5" component="div">
                1,234
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pedidos
              </Typography>
              <Typography variant="h5" component="div">
                567
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Taxa de Conversão
              </Typography>
              <Typography variant="h5" component="div">
                24.5%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Conteúdo Principal
        </Typography>
        <Typography>
          Este é o conteúdo da página que será empurrado para o lado quando o
          drawer estiver aberto. Nada escurece ou fica sobreposto - o conteúdo
          simplesmente se ajusta ao espaço disponível.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
