import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

interface ModalVisualizar {
  selectedUser: any;
  openViewDialog: any;
  handleCloseViewDialog: any;
}

export const ModalVisualizar: React.FC<ModalVisualizar> = ({
  selectedUser,
  openViewDialog,
  handleCloseViewDialog,
}) => {
  return (
    <Dialog
      open={openViewDialog}
      onClose={handleCloseViewDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Visualizar
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Nome
            </Typography>
            <Typography variant="body1">
              {selectedUser?.nome || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              E-mail
            </Typography>
            <Typography variant="body1">
              {selectedUser?.email || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Departamento
            </Typography>
            <Typography variant="body1">
              {selectedUser?.departamento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Perfil
            </Typography>
            <Typography variant="body1">
              {selectedUser?.perfil || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Telefone
            </Typography>
            <Typography variant="body1">
              {selectedUser?.telefone || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={selectedUser?.ativo ? "Ativo" : "Inativo"}
              color={selectedUser?.ativo ? "success" : "default"}
              size="small"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Data de Cadastro
            </Typography>
            <Typography variant="body1">
              {selectedUser?.dataCadastro || "Não informado"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseViewDialog}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
