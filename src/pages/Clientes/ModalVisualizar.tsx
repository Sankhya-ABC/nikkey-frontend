import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
      <DialogTitle>Visualizar</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Nome
            </Typography>
            <Typography variant="body1">{selectedUser?.nome}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{selectedUser?.email}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Departamento
            </Typography>
            <Typography variant="body1">
              {selectedUser?.departamento}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={selectedUser?.ativo ? "Ativo" : "Inativo"}
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Data de Cadastro
            </Typography>
            <Typography variant="body1">
              {selectedUser?.dataCadastro}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseViewDialog}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};
