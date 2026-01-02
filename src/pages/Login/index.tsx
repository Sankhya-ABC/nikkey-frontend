import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import { TextField } from "@/components/Form/Textfield";
import { useAlert } from "@/hooks/useAlert";
import { useAuth } from "@/hooks/useAuth";
import { ErrorMessage } from "@/services/types";

import { loginService } from "@/services/Login";
import { ROUTES } from "../../routes";

interface FormLogin {
  usuario: string;
  senha: string;
}

const defaultValues: FormLogin = {
  usuario: "",
  senha: "",
};

export const Login = () => {
  // hooks
  const { persistSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlert();
  const { control, handleSubmit } = useForm<FormLogin>({ defaultValues });

  // useStates
  const [loading, setLoading] = useState(false);

  // variables
  const from = (location.state as any)?.from?.pathname || ROUTES.HOME;

  // requests
  const onSubmit = async ({ usuario, senha }: FormLogin) => {
    setLoading(true);
    try {
      const resp = await loginService.logar({
        email: usuario,
        password: senha,
      });
      persistSession(resp);
      navigate(from, { replace: true });
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message,
        severity: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography
              color="primary"
              variant="h4"
              sx={{ lineHeight: 1, fontWeight: 600, mb: 2 }}
            >
              Login
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              control={control}
              name="usuario"
              label="Usuário"
              autoComplete={false}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              control={control}
              name="senha"
              label="Senha"
              type="password"
              autoComplete={false}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              fullWidth
            >
              {loading ? <CircularProgress size={20} /> : "Entrar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
