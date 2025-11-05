import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { TimePicker } from "../../../components/Form/TimePicker";
import { OrdemServico } from "../type";
import { listClientes, listTecnicos } from "./provider";

export const InformacoesGerais = () => {
  const { control } = useFormContext<OrdemServico>();

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Informações Gerais
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Select
            label="Cliente"
            name="informacoesGerais.idCliente"
            control={control}
            propertyLabel="descricao"
            propertyValue="id"
            options={listClientes}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Select
            label="Técnico"
            name="informacoesGerais.idTecnico"
            control={control}
            propertyLabel="descricao"
            propertyValue="id"
            options={listTecnicos}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <DatePicker
            label="Data Visita"
            name="informacoesGerais.data.data"
            control={control}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <TimePicker
            label="Hora início"
            name="informacoesGerais.data.horaInicio"
            control={control}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <TimePicker
            label="Hora final"
            name="informacoesGerais.data.horaFinal"
            control={control}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            control={control}
            name="informacoesGerais.responsavel.nome"
            label="Nome do Responsável"
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            control={control}
            name="informacoesGerais.responsavel.cargo"
            label="Cargo do Responsável"
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="informacoesGerais.flagPossuiVisitaPendente"
            label="Possui visita pendente?"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
