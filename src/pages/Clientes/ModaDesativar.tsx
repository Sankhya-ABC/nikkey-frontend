import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModalDesativarProps {
  selectedUser: any;
  handleToggleUserStatus: any;
  openDeactivateDialog: any;
  handleCloseDeactivateDialog: any;
}

export const ModalDesativar: React.FC<ModalDesativarProps> = ({
  selectedUser,
  handleToggleUserStatus,
  openDeactivateDialog,
  handleCloseDeactivateDialog,
}) => {
  return (
    <Dialog
      open={openDeactivateDialog}
      onClose={handleCloseDeactivateDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Desativar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedUser?.ativo
            ? `Tem certeza que deseja desativar o usuário ${selectedUser?.nome}?`
            : `Tem certeza que deseja ativar o usuário ${selectedUser?.nome}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeactivateDialog}>Cancelar</Button>
        <Button variant="contained" onClick={handleToggleUserStatus}>
          {selectedUser?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
