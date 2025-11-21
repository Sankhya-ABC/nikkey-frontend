import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal as ModalUI,
  TextField,
  Typography,
} from "@mui/material";
import { generateTimeOptions } from "./utils";

interface ModalProps {
  modalOpen: any;
  handleCloseModal: any;
  selectedDate: any;
  dayVisits: any;
  handleEditVisit: any;
  handleNewVisit: any;
  editingVisit: any;
  setEmpresa: any;
  empresasOptions: any;
  tecnico: any;
  setTecnico: any;
  modalMode: any;
  empresa: any;
  tecnicosOptions: any;
  horaInicial: any;
  sethoraInicial: any;
  horaFinal: any;
  sethoraFinal: any;
  descricao: any;
  setDescricao: any;
  setModalMode: any;
  handleSubmit: any;
}

export const Modal: React.FC<ModalProps> = ({
  modalOpen,
  handleCloseModal,
  selectedDate,
  dayVisits,
  handleEditVisit,
  handleNewVisit,
  editingVisit,
  setEmpresa,
  empresasOptions,
  tecnico,
  setTecnico,
  modalMode,
  empresa,
  tecnicosOptions,
  horaInicial,
  sethoraInicial,
  horaFinal,
  sethoraFinal,
  descricao,
  setDescricao,
  setModalMode,
  handleSubmit,
}) => {
  const timeOptions = generateTimeOptions();

  return (
    <ModalUI open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxHeight: "80vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          overflow: "auto",
        }}
      >
        {modalMode === "list" ? (
          <>
            <Typography variant="h6" mb={2}>
              Visitas do dia {selectedDate?.toLocaleDateString("pt-BR")}
            </Typography>

            {dayVisits.length > 0 ? (
              <>
                <List>
                  {dayVisits.map((visit) => (
                    <ListItem key={visit.id} divider>
                      <ListItemText
                        primary={`${visit.empresa} - ${visit.tecnico}`}
                        secondary={`${visit.horaInicial} às ${visit.horaFinal} - ${visit.descricao}`}
                      />
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditVisit(visit)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleNewVisit}
                  sx={{ mt: 2 }}
                >
                  Agendar Nova Visita
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" gutterBottom>
                  Nenhuma visita agendada para{" "}
                  {selectedDate?.toLocaleDateString("pt-BR")}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNewVisit}
                  sx={{ mt: 2 }}
                >
                  Agendar Visita
                </Button>
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="h6" mb={2}>
              {editingVisit ? "Editar Visita" : "Cadastro - Agendar Visita"}
            </Typography>

            <TextField
              fullWidth
              select
              label="Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              margin="normal"
            >
              {empresasOptions.map((emp) => (
                <MenuItem key={emp} value={emp}>
                  {emp}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Técnico"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              margin="normal"
            >
              {tecnicosOptions.map((tec) => (
                <MenuItem key={tec} value={tec}>
                  {tec}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Data da Visita"
              value={
                selectedDate ? selectedDate.toLocaleDateString("pt-BR") : ""
              }
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              select
              label="Horário Inicial"
              value={horaInicial}
              onChange={(e) => sethoraInicial(e.target.value)}
              margin="normal"
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Horário Final"
              value={horaFinal}
              onChange={(e) => sethoraFinal(e.target.value)}
              margin="normal"
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button onClick={() => setModalMode("list")}>Cancelar</Button>
              <Button variant="contained" onClick={handleSubmit}>
                {editingVisit ? "Atualizar" : "Salvar"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ModalUI>
  );
};
