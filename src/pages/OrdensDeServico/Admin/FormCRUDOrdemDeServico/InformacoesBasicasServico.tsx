import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import { OrdemDeServico } from "@/services/OrdemDeServico/Admin/types";
import { CRUDType } from "@/services/types";

export const InformacoesBasicasServico = () => {
  // hooks
  const { control, watch } = useFormContext<OrdemDeServico>();

  // variables
  const flagServicoRealizado = watch("flagServicoRealizado");
  const formType = watch("formType");

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Informações Básicas do Serviço
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="flagServicoRealizado"
            label="Serviço realizado?"
          />
        </Grid>

        {!flagServicoRealizado && (
          <Grid size={{ xs: 12 }}>
            <TextField
              readOnly={formType === CRUDType.READ}
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
