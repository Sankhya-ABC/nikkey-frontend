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

import { clienteService } from "@/services/Clientes";
import { enderecoService } from "@/services/Endereco";
import { Estado } from "@/services/Endereco/types";

import { Select } from "../../components/Form/Select";
import { Switch } from "../../components/Form/Switch";
import { TextField } from "../../components/Form/Textfield";
import { Cliente } from "../../services/Clientes/types";
import { CRUDType } from "../../services/types";

interface FormCRUDClienteProps {
  open: boolean;
  handleClose: () => void;
  formType: CRUDType;
  selected: Cliente | null;
  persistCallback: () => Promise<void>;
}

const defaultValues: Cliente = {
  id: null,
  razaoSocial: "",
  nomeFantasia: "",
  cnpjCpf: "",
  validadeCertificado: "",
  tipoAtividade: "",
  possuiContrato: false,
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  estado: "",
  cidade: "",
  cep: "",
  contato: "",
  telefone: "",
  funcao: "",
  fax: "",
  email: "",
  observacoes: "",
  nomeAcesso: "",
  emailAcesso: "",
  departamento: "",
  senha: "",
  confirmarSenha: "",
  ativo: true,
  dataCadastro: null,
};

export const FormCRUDCliente: React.FC<FormCRUDClienteProps> = ({
  open,
  handleClose,
  formType,
  selected,
  persistCallback,
}) => {
  const { control, reset, handleSubmit } = useForm<Cliente>({ defaultValues });

  const [estados, setEstados] = useState<Estado[]>([]);

  const onSubmit = async (data: Cliente) => {
    try {
      if (formType === CRUDType.CREATE) {
        await clienteService.criarCliente(data);
      } else {
        await clienteService.atualizarCliente(data);
      }
      handleClose();
      persistCallback();
    } catch (error) {
      //
    }
  };

  const getAllEstados = async () => {
    try {
      const resp = await enderecoService.buscarTodosEstados();
      setEstados(resp);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getAllEstados();
  }, []);

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
              name="razaoSocial"
              label="Razão Social"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="nomeFantasia"
              label="Nome Fantasia"
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="cnpjCpf"
              label="CNPJ/CPF"
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="validadeCertificado"
              label="Validade do Certificado (Dias)"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="tipoAtividade"
              label="Tipo de Atividade"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Switch
              readOnly={formType === CRUDType.READ}
              control={control}
              name="possuiContrato"
              label="Cliente possui contrato?"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Endereço
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="logradouro"
              label="Logradouro"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="numero"
              label="Número"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="complemento"
              label="Complemento"
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="bairro"
              label="Bairro"
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Select
              readOnly={formType === CRUDType.READ}
              control={control}
              name="estado"
              label="Estado"
              options={estados}
              propertyLabel="nome"
              propertyValue="sigla"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="cidade"
              label="Cidade"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="cep"
              label="CEP"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Contato
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="contato"
              label="Contato"
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
              name="funcao"
              label="Função"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="fax"
              label="Fax"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="email"
              label="E-mail"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="observacoes"
              label="Observações"
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados de Acesso
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="nomeAcesso"
              label="Nome"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="emailAcesso"
              label="E-mail"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
              control={control}
              name="departamento"
              label="Departamento"
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
