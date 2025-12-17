import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LoadingProps {
  loading: boolean;
  children: ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ loading, children }) => {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
      <Typography color="primary" sx={{ mt: 2, fontWeight: 600 }}>
        Carregando...
      </Typography>
    </Box>
  ) : (
    children
  );
};
