import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <Grid container spacing={3}>
      <Grid item size={{ xs: 12 }}>
        <Typography variant="h4" sx={{ lineHeight: 1 }}>
          {title}
        </Typography>
      </Grid>

      {children}
    </Grid>
  );
};
