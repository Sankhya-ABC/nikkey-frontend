import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select } from "../../components/Form/Select";
import { TextField } from "../../components/Form/Textfield";
import { CRUDType } from "../../types";
import { empresasOptions, tecnicosOptions } from "./provider";
import { ModalMode, VisitaForm } from "./type";
import { generateTimeOptions } from "./utils";
import { DatePicker } from "../../components/Form/DatePicker";

interface VisitaModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  modalMode: ModalMode;
  formType: CRUDType;
  selectedDate: Date | null;
  dayVisits: VisitaForm[];
  selectedVisit: VisitaForm | null;
  handleEditVisit: (visit: VisitaForm) => void;
  handleNewVisit: () => void;
  handleCRUDSubmit: (data: VisitaForm) => void;
  handleModeChange: (mode: ModalMode) => void;
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

export const VisitaModal: React.FC<VisitaModalProps> = ({
  modalOpen,
  handleCloseModal,
  modalMode,
  formType,
  selectedDate,
  dayVisits,
  selectedVisit,
  handleEditVisit,
  handleNewVisit,
  handleCRUDSubmit,
  handleModeChange,
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

  const renderListMode = () => (
    <>
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Visitas ({selectedDate?.toLocaleDateString("pt-BR")})
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset", minHeight: 400 }}>
        {dayVisits.length > 0 ? (
          <List sx={{ mt: 2 }}>
            {dayVisits.map((visit) => (
              <ListItem
                key={visit.id}
                divider
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditVisit(visit)}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${visit.empresa} - ${visit.tecnico}`}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {visit.horaInicial} às {visit.horaFinal}
                      </Typography>
                      <br />
                      <Typography variant="body2" color="text.secondary">
                        {visit.descricao}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" gutterBottom>
              Nenhuma visita agendada para esse dia
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="contained" onClick={handleNewVisit}>
          Agendar Nova Visita
        </Button>
      </DialogActions>
    </>
  );

  const renderFormMode = () => (
    <>
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
        <Button
          variant="outlined"
          onClick={() =>
            formType === CRUDType.CREATE
              ? handleModeChange(ModalMode.LIST)
              : handleCloseModal()
          }
        >
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          {formType === CRUDType.CREATE ? "Agendar" : "Atualizar"}
        </Button>
      </DialogActions>
    </>
  );

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
      {modalMode === ModalMode.LIST ? renderListMode() : renderFormMode()}
    </Dialog>
  );
};
