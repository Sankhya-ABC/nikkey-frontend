import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { usuarioService } from "@/services/Usuarios";
import { Usuario } from "../../services/Usuarios/types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: Usuario | null;
  persistCallback: () => void;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  open,
  handleClose,
  selected,
  persistCallback,
}) => {
  const atualizarStatusUsuario = async () => {
    try {
      await usuarioService.atualizarStatusUsuario(selected?.id! as number);
      handleClose();
      persistCallback();
    } catch (error: unknown) {
      //
    }
  };

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
        <Button variant="contained" onClick={atualizarStatusUsuario}>
          {selected?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
