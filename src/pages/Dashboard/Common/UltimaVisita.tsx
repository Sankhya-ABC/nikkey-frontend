import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "../../../components/Form/DateTimePicker";
import { TextField } from "../../../components/Form/Textfield";
import { CardInfo } from "../components/CardInfo";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect } from "react";

interface UltimaVisitaForm {
  numeroOS: number | "";
  dataHora: Date | null;
}

const defaultValues: UltimaVisitaForm = {
  numeroOS: "",
  dataHora: null,
};

export const UltimaVisita = () => {
  const { control, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset({ numeroOS: 245, dataHora: new Date() });
  }, []);

  return (
    <CardInfo title="Última Visita">
      <Grid container spacing={3} width="100%">
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <TextField
            control={control}
            name="numeroOS"
            label="Nº OS"
            TextFieldProps={{ inputProps: { readOnly: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <DateTimePicker
            control={control}
            name="dataHora"
            label="Data/Hora"
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <Button variant="contained" endIcon={<DownloadIcon />} fullWidth>
            Baixar Certificado
          </Button>
        </Grid>
      </Grid>
    </CardInfo>
  );
};
