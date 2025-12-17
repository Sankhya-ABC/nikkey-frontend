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

import { usuarioService } from "@/services/Usuarios";

import { Select } from "../../components/Form/Select";
import { TextField } from "../../components/Form/Textfield";
import { CRUDType } from "../../services/types";
import { Usuario } from "../../services/Usuarios/types";
import { Role } from "@/types";

interface FormCRUDUsuarioProps {
  open: boolean;
  handleClose: () => void;
  formType: CRUDType;
  selected: Usuario | null;
  persistCallback: () => Promise<void>;
}

const defaultValues: Usuario = {
  id: null,
  nome: "",
  email: "",
  departamento: "",
  perfil: null,
  idCliente: null,
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
  persistCallback,
}) => {
  const { control, reset, handleSubmit } = useForm<Usuario>({ defaultValues });

  const onSubmit = async (data: Usuario) => {
    try {
      if (formType === CRUDType.CREATE) {
        await usuarioService.criarUsuario(data);
      } else {
        await usuarioService.atualizarUsuario(data);
      }
      persistCallback();
    } catch (error) {
      //
    }
  };

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
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados Básicos
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="nome"
              label="Nome"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="email"
              label="Email"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="departamento"
              label="Departamento"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Select
              readOnly={formType === CRUDType.READ}
              control={control}
              name="perfil"
              label="Perfil"
              options={Object.keys(Role)?.map((perfil) => ({
                descricao: perfil,
              }))}
              propertyLabel="descricao"
              propertyValue="descricao"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="telefone"
              label="Telefone"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="senha"
              label="Senha"
              type="password"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Cliente
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      {formType !== CRUDType.READ && (
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => handleSubmit(onSubmit)()}>
            {formType === CRUDType.CREATE && "Cadastrar"}
            {formType === CRUDType.UPDATE && "Editar"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
