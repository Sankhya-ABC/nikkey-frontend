import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useAlert } from "@/hooks/useAlert";
import { clienteService } from "@/services/Clientes";
import { ErrorMessage } from "@/services/types";

import { Cliente } from "../../services/Clientes/types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: Cliente | null;
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
  const atualizarStatusCliente = async () => {
    try {
      await clienteService.atualizarStatusCliente(selected?.id! as number);
      showAlert({
        title: "Sucesso",
        children: `Cliente atualizado com sucesso!`,
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
            ? `Tem certeza que deseja desativar ${selected?.nomeFantasia}?`
            : `Tem certeza que deseja ativar ${selected?.nomeFantasia}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={atualizarStatusCliente}>
          {selected?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
