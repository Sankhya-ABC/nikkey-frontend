import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useAlert } from "@/hooks/useAlert";
import { ErrorMessage } from "@/services/types";
import { usuarioService } from "@/services/Usuarios";
import { Usuario } from "@/services/Usuarios/types";

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
  // hooks
  const { showAlert } = useAlert();

  // requests
  const atualizarStatusUsuario = async () => {
    try {
      await usuarioService.atualizarStatusUsuario(selected?.id! as number);
      showAlert({
        title: "Sucesso",
        children: `Usuario atualizado com sucesso!`,
        severity: "success",
        duration: 3000,
      });
      handleClose();
      persistCallback();
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message,
        severity: "error",
        duration: 3000,
      });
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
