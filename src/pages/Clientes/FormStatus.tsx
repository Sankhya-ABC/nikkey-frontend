import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Cliente } from "../../services/Clientes/types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: Cliente | null;
  handleToggle: () => void;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  open,
  handleClose,
  selected,
  handleToggle,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Desativar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <DialogContentText>
          {selected?.ativo
            ? `Tem certeza que deseja desativar ${selected?.nomeFantasia}?`
            : `Tem certeza que deseja ativar ${selected?.nomeFantasia}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleToggle}>
          {selected?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
