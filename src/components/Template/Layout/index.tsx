import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
  spacing?: number;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  spacing = 3,
}) => {
  return (
    <Grid container spacing={spacing}>
      <Grid item size={{ xs: 12 }}>
        <Typography
          color="primary"
          variant="h4"
          sx={{ lineHeight: 1, fontWeight: 600 }}
        >
          {title}
        </Typography>
      </Grid>

      {children}
    </Grid>
  );
};
