import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

interface LoadingProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({
  loading,
  setLoading,
  children,
}) => {
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setLoading(false);
    };

    loadData();
  }, []);

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
