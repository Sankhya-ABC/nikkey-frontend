import { Card, CardContent, SxProps, Theme, Typography } from "@mui/material";

interface CardInfoProps {
  title: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const CardInfo: React.FC<CardInfoProps> = ({ title, children, sx }) => {
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
          ...sx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
