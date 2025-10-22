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
        minHeight: 155,
        height: "100%",
      }}
    >
      <Typography variant="h2" align="center">
        {quantity}
      </Typography>
      <Typography variant="h6" align="center">
        {type}
      </Typography>
    </Card>
  );
};
