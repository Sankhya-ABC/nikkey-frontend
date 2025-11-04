import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "../../../components/Form/Textfield";
import { Switch } from "../../../components/Form/Switch";
import { useFormContext } from "react-hook-form";

export const InformacoesBasicasServico = () => {
  const { control, watch } = useFormContext();

  const flagServicoRealizado = watch("flagServicoRealizado");

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Informações Básicas do Serviço
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagServicoRealizado"
            label="Serviço realizado?"
          />
        </Grid>

        {!flagServicoRealizado && (
          <Grid item size={{ xs: 12 }}>
            <TextField
              control={control}
              name="motivoNaoRealizacao"
              label="Motivo da não realização"
              multiline
              rows={3}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
