import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { usuarioService } from "@/services/Usuarios";

import { Cliente } from "@/services/Clientes/types";
import { departamentoService } from "@/services/Departamento";
import { Role } from "@/types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Select } from "../../components/Form/Select";
import { TextField } from "../../components/Form/Textfield";
import { CRUDType, Dominio } from "../../services/types";
import { Usuario } from "../../services/Usuarios/types";
import { ConsultaCliente } from "../Clientes/ConsultaCliente";

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
  idDepartamento: "",
  perfil: null,
  cliente: {
    id: "",
    nomeFantasia: "",
    cnpjCpf: "",
  },
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
  // hooks
  const { control, reset, watch, handleSubmit, setValue } = useForm<Usuario>({
    defaultValues,
  });

  // variables
  const cliente = watch("cliente");

  // useStates
  const [resetConsulta, setResetConsulta] = useState<boolean>(false);
  const [departamentos, setDepartamentos] = useState<Dominio[]>([]);

  // requests
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

  const getAllDepartamentos = async () => {
    try {
      const resp = await departamentoService.buscarDepartamentos();
      setDepartamentos(resp);
    } catch (error) {
      //
    }
  };

  // handlers
  const handleSelecionarCliente = (cliente: Cliente) => {
    setValue("cliente", cliente);
  };

  const handleResetCliente = () => {
    setValue("cliente", defaultValues.cliente);
  };

  // useEffects
  useEffect(() => {
    if (formType === CRUDType.UPDATE || formType === CRUDType.READ) {
      reset(selected || defaultValues);
    }
  }, [formType, selected]);

  useEffect(() => {
    getAllDepartamentos();
  }, []);

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
            <Select
              readOnly={formType === CRUDType.READ}
              control={control}
              name="idDepartamento"
              label="Departamento"
              options={departamentos}
              propertyLabel="id"
              propertyValue="descricao"
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

          {cliente?.id && cliente?.nomeFantasia ? (
            <>
              <Grid
                size={{ xs: 12 }}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="contained"
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={handleResetCliente}
                >
                  Selecionar outro cliente
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  readOnly={true}
                  control={control}
                  name="cliente.nomeFantasia"
                  label="Nome Fantasia"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  readOnly={true}
                  control={control}
                  name="cliente.cnpjCpf"
                  label="CNPJ/CPF"
                />
              </Grid>
            </>
          ) : (
            <Grid size={{ xs: 12 }}>
              <ConsultaCliente
                resetConsulta={resetConsulta}
                setResetConsulta={setResetConsulta}
                actions={[
                  {
                    tooltip: "Selecionar",
                    element: <CheckCircleOutlineIcon />,
                    onClick: (cliente: Cliente) =>
                      handleSelecionarCliente(cliente),
                  },
                ]}
              />
            </Grid>
          )}
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
