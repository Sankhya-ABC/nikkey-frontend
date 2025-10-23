import { Card, CardContent, SxProps, Theme, Typography } from "@mui/material";

interface CardInfoProps {
  title: string;
  children: React.ReactNode;
  sxCard?: SxProps<Theme>;
  sxContent?: SxProps<Theme>;
}

export const CardInfo: React.FC<CardInfoProps> = ({
  title,
  children,
  sxCard,
  sxContent,
}) => {
  return (
    <Card sx={{ p: 3, ...sxCard }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, lineHeight: 1 }}>
        {title}
      </Typography>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          padding: 0,
          paddingBottom: "0px !important",
          ...sxContent,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
