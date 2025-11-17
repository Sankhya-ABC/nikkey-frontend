import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Usuario } from "./types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: Usuario | null;
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
            ? `Tem certeza que deseja desativar ${selected?.nome}?`
            : `Tem certeza que deseja ativar ${selected?.nome}?`}
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
