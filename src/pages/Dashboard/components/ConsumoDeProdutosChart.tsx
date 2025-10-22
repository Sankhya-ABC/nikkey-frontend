import { Card, CardContent, Typography } from "@mui/material";
import { ResponsiveContainer } from "recharts";

export const ConsumoDeProdutosChart = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Consumo de Produtos
      </Typography>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ResponsiveContainer width="100%" height={120}>
          <></>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
