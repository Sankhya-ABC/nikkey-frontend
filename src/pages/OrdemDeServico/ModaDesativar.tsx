import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModalDesativarProps {
  selectedOrdemDeServico: any;
  handleToggleOrdemDeServicoStatus: any;
  openDeactivateDialog: any;
  handleCloseDeactivateDialog: any;
}

export const ModalDesativar: React.FC<ModalDesativarProps> = ({
  selectedOrdemDeServico,
  handleToggleOrdemDeServicoStatus,
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
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Desativar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <DialogContentText>
          {selectedOrdemDeServico?.ativo
            ? `Tem certeza que deseja desativar a OS ${selectedOrdemDeServico?.numero}?`
            : `Tem certeza que deseja ativar a OS ${selectedOrdemDeServico?.numero}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDeactivateDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleToggleOrdemDeServicoStatus}>
          {selectedOrdemDeServico?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
