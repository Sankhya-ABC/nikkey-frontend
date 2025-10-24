import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { perfis } from "./provider";

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Cadastrar
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <TextField size="small" fullWidth label="Nome" variant="outlined" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="E-mail"
              variant="outlined"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <TextField size="small" fullWidth label="Departamento" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="perfil-label">Perfil</InputLabel>
              <Select
                labelId="perfil-label"
                label="Perfil"
                defaultValue={"Administrador"}
                size="small"
              >
                {perfis?.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Telefone" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Senha" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Confirmar senha" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseCreateDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCloseCreateDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
