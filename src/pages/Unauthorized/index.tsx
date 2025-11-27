import { Home, Security, ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const Unauthorized: React.FC = () => {
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
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Security
          sx={{
            fontSize: 96,
            color: theme.palette.warning.main,
            opacity: 0.8,
          }}
        />
      </Box>

      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: isMobile ? "4rem" : "6rem",
          fontWeight: "bold",
          color: theme.palette.warning.dark,
          mb: 2,
        }}
      >
        403
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
        Acesso Negado
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
        Você não tem permissão para acessar esta página. Verifique suas
        credenciais ou entre em contato com o administrador do sistema para
        solicitar acesso.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
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
            backgroundColor: theme.palette.warning.main,
            "&:hover": {
              backgroundColor: theme.palette.warning.dark,
            },
          }}
        >
          Página Inicial
        </Button>
      </Box>
    </Box>
  );
};
