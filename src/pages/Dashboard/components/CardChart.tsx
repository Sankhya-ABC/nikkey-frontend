import { Card, CardContent, Typography } from "@mui/material";

interface CardChartProps {
  title: string;
  children: React.ReactNode;
}

export const CardChart: React.FC<CardChartProps> = ({ title, children }) => {
  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
