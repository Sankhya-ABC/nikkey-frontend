import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { OrdemDeServico } from "./types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: OrdemDeServico | null;
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
            ? `Tem certeza que deseja desativar a OS ${selected?.id}?`
            : `Tem certeza que deseja ativar a OS ${selected?.id}?`}
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
