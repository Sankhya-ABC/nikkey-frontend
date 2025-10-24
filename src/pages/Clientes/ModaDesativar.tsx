import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModalDesativarProps {
  selectedCostumer: any;
  handleToggleCostumerStatus: any;
  openDeactivateDialog: any;
  handleCloseDeactivateDialog: any;
}

export const ModalDesativar: React.FC<ModalDesativarProps> = ({
  selectedCostumer,
  handleToggleCostumerStatus,
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
          {selectedCostumer?.ativo
            ? `Tem certeza que deseja desativar ${selectedCostumer?.nome}?`
            : `Tem certeza que deseja ativar ${selectedCostumer?.nome}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDeactivateDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleToggleCostumerStatus}>
          {selectedCostumer?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
