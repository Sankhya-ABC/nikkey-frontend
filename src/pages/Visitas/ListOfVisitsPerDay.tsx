import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

import { VisitaForm } from "./type";

interface ListOfVisitsPerDayProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  selectedDate: Date | null;
  dayVisits: VisitaForm[];
  handleEditVisit: (visit: VisitaForm) => void;
  handleNewVisit: () => void;
}

export const ListOfVisitsPerDay: React.FC<ListOfVisitsPerDayProps> = ({
  modalOpen,
  handleCloseModal,
  selectedDate,
  dayVisits,
  handleEditVisit,
  handleNewVisit,
}) => {
  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { maxHeight: "90vh" },
      }}
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Visitas ({selectedDate?.toLocaleDateString("pt-BR")})
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
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
    </Dialog>
  );
};
