import { Card, Typography } from "@mui/material";

interface CardQuantityProps {
  quantity: number;
  type: string;
}

export const CardQuantity: React.FC<CardQuantityProps> = ({
  quantity,
  type,
}) => {
  return (
    <Card
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant="h4" align="center" sx={{ lineHeight: 1, mb: 1 }}>
        {quantity}
      </Typography>
      <Typography variant="h6" align="center" sx={{ lineHeight: 1 }}>
        {type}
      </Typography>
    </Card>
  );
};
