import { Box, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";

export const UploadEvidencias = () => {
  const { control, watch } = useFormContext();

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
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
              }}
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
