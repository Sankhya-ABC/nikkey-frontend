import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{ mb: 2 }}>
          Funcionalidade de edição em desenvolvimento
        </Alert>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nome" defaultValue={selectedUser?.nome} fullWidth />
          <TextField
            label="Email"
            defaultValue={selectedUser?.email}
            fullWidth
          />
          <TextField
            label="Departamento"
            defaultValue={selectedUser?.departamento}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog}>Cancelar</Button>
        <Button variant="contained" onClick={handleCloseEditDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
