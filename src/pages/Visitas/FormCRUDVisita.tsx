import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "../../components/Form/DatePicker";
import { Select } from "../../components/Form/Select";
import { TextField } from "../../components/Form/Textfield";
import { CRUDType } from "../../services/types";
import { empresasOptions, tecnicosOptions } from "./provider";
import { VisitaForm } from "./type";
import { generateTimeOptions } from "./utils";

interface VisitaModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  formType: CRUDType;
  selectedDate: Date | null;
  selectedVisit: VisitaForm | null;
  handleCRUDSubmit: (data: VisitaForm) => void;
}

const defaultValues: VisitaForm = {
  id: null,
  empresa: "",
  tecnico: "",
  dataVisita: new Date(),
  horaInicial: "",
  horaFinal: "",
  descricao: "",
};

export const FormCRUDVisita: React.FC<VisitaModalProps> = ({
  modalOpen,
  handleCloseModal,
  formType,
  selectedDate,
  selectedVisit,
  handleCRUDSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm<VisitaForm>({
    defaultValues: {
      ...defaultValues,
      dataVisita: selectedDate || new Date(),
    },
  });

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (formType === CRUDType.UPDATE && selectedVisit) {
      reset({
        ...selectedVisit,
        dataVisita: selectedDate || new Date(),
      });
    } else if (formType === CRUDType.CREATE) {
      reset({
        ...defaultValues,
        dataVisita: selectedDate || new Date(),
      });
    }
  }, [formType, selectedVisit, selectedDate, reset]);

  const handleFormSubmit = (data: VisitaForm) => {
    handleCRUDSubmit({
      ...data,
      dataVisita: selectedDate || new Date(),
      id: formType === CRUDType.UPDATE ? selectedVisit?.id! : null,
    });
  };

  const handleClose = () => {
    reset();
    handleCloseModal();
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: "90vh" },
      }}
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        {formType === CRUDType.CREATE ? "Agendar Visita" : "Editar Visita"}
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <DatePicker
              control={control}
              name="dataVisita"
              label="Data da Visita"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Select
              control={control}
              name="empresa"
              label="Empresa"
              options={empresasOptions.map((empresa, index) => ({
                id: index,
                descricao: empresa,
              }))}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Select
              control={control}
              name="tecnico"
              label="Técnico"
              options={tecnicosOptions.map((tecnico, index) => ({
                id: index,
                descricao: tecnico,
              }))}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <Select
              control={control}
              name="horaInicial"
              label="Horário Inicial"
              options={timeOptions.map((time, index) => ({
                id: index,
                descricao: time,
              }))}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <Select
              control={control}
              name="horaFinal"
              label="Horário Final"
              options={timeOptions.map((time, index) => ({
                id: index,
                descricao: time,
              }))}
              propertyLabel="descricao"
              propertyValue="id"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              control={control}
              name="descricao"
              label="Descrição"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleCloseModal()}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          {formType === CRUDType.CREATE ? "Agendar" : "Atualizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
