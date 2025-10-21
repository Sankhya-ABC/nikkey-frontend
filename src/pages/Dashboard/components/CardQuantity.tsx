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
      }}
      variant="outlined"
    >
      <Typography variant="h2">{quantity}</Typography>
      <Typography variant="h6">{type}</Typography>
    </Card>
  );
};
