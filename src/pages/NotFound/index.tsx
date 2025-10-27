import { Home, SearchOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchOff
          sx={{
            fontSize: 96,
            color: theme.palette.text.secondary,
            opacity: 0.7,
          }}
        />
      </Box>

      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: isMobile ? "4rem" : "6rem",
          fontWeight: "bold",
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "medium",
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        Página não encontrada
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: "400px",
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        A página que você está procurando pode ter sido removida, renomeada ou
        está temporariamente indisponível.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={handleGoBack}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Voltar
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={handleGoHome}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Página Inicial
        </Button>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          mt: 4,
          opacity: 0.7,
        }}
      >
        Se você acredita que isso é um erro, entre em contato com o suporte.
      </Typography>
    </Box>
  );
};
