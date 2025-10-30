import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker } from "../../components/Form/DatePicker";
import { Switch } from "../../components/Form/Switch";
import { TextField } from "../../components/Form/Textfield";
import { TimePicker } from "../../components/Form/TimePicker";
import { Select } from "../../components/Form/Select";

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  const { control } = useForm();

  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      maxWidth="md"
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Cadastrar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Informações Gerais
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} label="Cliente" name="aaaa" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} label="Técnico" name="aaaa" />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <DatePicker
              label="Data Visita"
              name="dataVisita"
              control={control}
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TextField
              control={control}
              name="aaaa"
              label="Visitas pendentes"
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TimePicker
              label="Hora início"
              name="horaInicio"
              control={control}
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TimePicker label="Hora fim" name="horaFim" control={control} />
          </Grid>

          <Grid item size={{ xs: 8 }}>
            <TextField control={control} name="aaaa" label="Responsável" />
          </Grid>
          <Grid item size={{ xs: 4 }}>
            <TextField
              control={control}
              name="aaaa"
              label="Cargo do responsável"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Informações do Serviço
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Serviço foi realizado?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              control={control}
              name="aaaa"
              label="Motivo da não realização"
              rows={3}
              multiline
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Houve evidências ou focos de pragas encontrados?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Select
              name="pragas"
              control={control}
              label="Pragas"
              options={[]}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Houve revisão de equipamentos?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Select
              name="oQueFoiVisualizado"
              control={control}
              label="O que foi visuailzado?"
              options={[]}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} name="aaaa" label="Quantidade" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              control={control}
              name="aaaa"
              label="Área onde foi encontrado"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Houve consumo de produtos?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Houveram não conformidades?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="aaaa"
              label="Deseja realizar upload de evidências?"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              control={control}
              name="aaaa"
              label="Observações"
              rows={3}
              multiline
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button name="aaaa" onClick={handleCloseCreateDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCloseCreateDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
