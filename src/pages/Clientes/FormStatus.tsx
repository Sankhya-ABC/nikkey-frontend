import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { clienteService } from "@/services/Clientes";

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
  // requests
  const atualizarStatusCliente = async () => {
    try {
      await clienteService.atualizarStatusCliente(selected?.id! as number);
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
