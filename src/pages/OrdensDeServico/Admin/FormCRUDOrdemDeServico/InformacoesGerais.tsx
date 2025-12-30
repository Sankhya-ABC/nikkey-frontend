import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { DatePicker } from "@/components/Form/DatePicker";
import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import { TimePicker } from "@/components/Form/TimePicker";
import { OrdemDeServico } from "@/services/OrdemDeServico/Admin/types";
import { CRUDType } from "@/services/types";

import { Autocomplete } from "@/components/Form/Autocomplete";
import { clienteService } from "@/services/Clientes";
import { tecnicoService } from "@/services/Tecnico";

export const InformacoesGerais = () => {
  // hooks
  const { control, watch } = useFormContext<OrdemDeServico>();

  // variables
  const formType = watch("formType");

  // requests
  const pesquisarClientes = async (search: string) => {
    try {
      return await clienteService.pesquisarClientes(search);
    } catch {
      return [];
    }
  };

  const pesquisarTecnicos = async (search: string) => {
    try {
      return await tecnicoService.pesquisarTecnicos(search);
    } catch {
      return [];
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Informações Gerais
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            label="Cliente"
            name="informacoesGerais.cliente.id"
            readOnly={formType === CRUDType.READ}
            control={control}
            propertyLabel="nomeFantasia"
            propertyValue="id"
            fetchOptions={pesquisarClientes}
            minCharsToSearch={1}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            label="Técnico"
            name="informacoesGerais.tecnico.id"
            readOnly={formType === CRUDType.READ}
            control={control}
            propertyLabel="nome"
            propertyValue="id"
            fetchOptions={pesquisarTecnicos}
            minCharsToSearch={1}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DatePicker
            label="Data Visita"
            name="informacoesGerais.data.data"
            readOnly={formType === CRUDType.READ}
            control={control}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TimePicker
            label="Hora início"
            name="informacoesGerais.data.horaInicio"
            readOnly={formType === CRUDType.READ}
            control={control}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TimePicker
            label="Hora final"
            name="informacoesGerais.data.horaFinal"
            readOnly={formType === CRUDType.READ}
            control={control}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            readOnly={formType === CRUDType.READ}
            control={control}
            name="informacoesGerais.responsavel.nome"
            label="Nome do Responsável"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            readOnly={formType === CRUDType.READ}
            control={control}
            name="informacoesGerais.responsavel.cargo"
            label="Cargo do Responsável"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="informacoesGerais.flagPossuiVisitaPendente"
            label="Possui visita pendente?"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
