import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { FileUpload } from "@/components/FileUpload";
import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import { OrdemDeServico } from "@/services/OrdemDeServico/Admin/types";
import { CRUDType } from "@/services/types";

export const UploadEvidencias = () => {
  // hooks
  const { control, watch } = useFormContext<OrdemDeServico>();

  // variables
  const flagUploadEvidencias = watch("flagUploadEvidencias");
  const formType = watch("formType");

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Upload de Evidências
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="flagUploadEvidencias"
            label="Upload de evidências?"
          />
        </Grid>

        {flagUploadEvidencias && (
          <Grid size={{ xs: 12 }}>
            <FileUpload
              acceptedTypes={["image/*"]}
              maxSizeInMB={5}
              multiple={true}
              maxFiles={10}
            />
          </Grid>
        )}

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
      </Grid>
    </Box>
  );
};
