import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select } from "../../components/Form/Select";
import { TextField } from "../../components/Form/Textfield";
import { CRUDType } from "../../types";
import { perfis } from "./provider";
import { Usuario } from "./types";

interface FormCRUDUsuarioProps {
  open: boolean;
  handleClose: () => void;
  formType: CRUDType;
  selected: Usuario | null;
}

const defaultValues: Usuario = {
  id: null,
  nome: "",
  email: "",
  departamento: "",
  perfil: "",
  telefone: "",
  senha: "",
  confirmarSenha: "",
  ativo: true,
  dataCadastro: null,
};

export const FormCRUDUsuario: React.FC<FormCRUDUsuarioProps> = ({
  open,
  handleClose,
  formType,
  selected,
}) => {
  const { control, reset } = useForm<Usuario>({ defaultValues });

  useEffect(() => {
    if (formType === CRUDType.UPDATE || formType === CRUDType.READ) {
      reset(selected || defaultValues);
    }
  }, [formType, selected]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        {formType}
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados Básicos
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} name="nome" label="Nome" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} name="email" label="Email" />
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <TextField
              control={control}
              name="departamento"
              label="Departamento"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Select
              control={control}
              name="perfil"
              label="Perfil"
              options={perfis?.map((perfil, index) => ({
                id: index,
                descricao: perfil,
              }))}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField control={control} name="telefone" label="Telefone" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              control={control}
              name="senha"
              label="Senha"
              type="password"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              control={control}
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
            />
          </Grid>
        </Grid>
      </DialogContent>
      {formType !== CRUDType.READ && (
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {formType === CRUDType.CREATE && "Cadastrar"}
            {formType === CRUDType.UPDATE && "Editar"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
