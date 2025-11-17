import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FileUpload } from "../../../components/FileUpload";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemServico } from "../types";

export const UploadEvidencias = () => {
  const { control, watch } = useFormContext<OrdemServico>();

  const flagUploadEvidencias = watch("flagUploadEvidencias");

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Upload de Evidências
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagUploadEvidencias"
            label="Upload de evidências?"
          />
        </Grid>

        {flagUploadEvidencias && (
          <Grid item size={{ xs: 12 }}>
            <FileUpload
              acceptedTypes={["image/*"]}
              maxSizeInMB={5}
              multiple={true}
              maxFiles={10}
            />
          </Grid>
        )}

        <Grid item size={{ xs: 12 }}>
          <TextField
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
