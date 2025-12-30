import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useAlert } from "@/hooks/useAlert";
import { ordemDeServicoAdminService } from "@/services/OrdemDeServico/Admin";
import { OrdemDeServico } from "@/services/OrdemDeServico/Admin/types";
import { ErrorMessage } from "@/services/types";

interface FormStatusProps {
  open: boolean;
  handleClose: () => void;
  selected: OrdemDeServico | null;
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
  const atualizarStatusOrdemDeServico = async () => {
    try {
      await ordemDeServicoAdminService.atualizarStatusOrdemDeServico(
        selected?.id! as number,
      );
      showAlert({
        title: "Sucesso",
        children: `Ordem de Serviço atualizada com sucesso!`,
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
            ? `Tem certeza que deseja desativar a OS ${selected?.id}?`
            : `Tem certeza que deseja ativar a OS ${selected?.id}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={atualizarStatusOrdemDeServico}>
          {selected?.ativo ? "Desativar" : "Ativar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
