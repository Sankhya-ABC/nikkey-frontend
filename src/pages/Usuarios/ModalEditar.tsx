import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { perfis } from "./provider";

interface ModalEditarProps {
  selectedUser: any;
  openEditDialog: any;
  handleCloseEditDialog: any;
}

export const ModalEditar: React.FC<ModalEditarProps> = ({
  selectedUser,
  openEditDialog,
  handleCloseEditDialog,
}) => {
  return (
    <Dialog
      open={openEditDialog}
      onClose={handleCloseEditDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Editar
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Nome"
              variant="outlined"
              defaultValue={selectedUser?.nome || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="E-mail"
              variant="outlined"
              defaultValue={selectedUser?.email || ""}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              size="small"
              fullWidth
              label="Departamento"
              defaultValue={selectedUser?.departamento || ""}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="perfil-label">Perfil</InputLabel>
              <Select
                labelId="perfil-label"
                label="Perfil"
                defaultValue={selectedUser?.perfil || "Administrador"}
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

          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Telefone"
              defaultValue={selectedUser?.telefone || ""}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Senha"
              type="password"
              placeholder="Manter senha atual"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Confirmar senha"
              type="password"
              placeholder="Manter senha atual"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseEditDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCloseEditDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
