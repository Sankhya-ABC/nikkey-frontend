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

import { TextField } from "../../components/Form/Textfield";
import { useAuth } from "../../hooks/useAuth";
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
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || ROUTES.HOME;

  const { control, handleSubmit } = useForm<FormLogin>({ defaultValues });

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ usuario, senha }: FormLogin) => {
    setLoading(true);
    try {
      await auth.login(usuario, senha);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      //
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
