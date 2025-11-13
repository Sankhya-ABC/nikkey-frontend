import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addWeeks = (d: Date, n: number) => addDays(d, n * 7);
const startOfWeek = (d: Date, weekStartsOnMonday = true) => {
  const day = d.getDay();
  const diff = weekStartsOnMonday ? (day === 0 ? -6 : 1 - day) : -day;
  const result = new Date(d);
  result.setDate(d.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

const formatMonthYear = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return formated.charAt(0).toUpperCase() + formated.slice(1);
};

const formatDayShort = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", { weekday: "short" });
  return formated.charAt(0).toUpperCase() + formated.slice(1).replace(".", "");
};

const formatDayNumber = (d: Date) => d.getDate();

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(timeString);
    }
  }
  return options;
};

const empresasOptions = ["Empresa A", "Empresa B", "Empresa C", "Empresa D"];

const tecnicosOptions = ["Técnico 1", "Técnico 2", "Técnico 3", "Técnico 4"];

const simulateBackendRequest = (month: number, year: number) => {
  const visits = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.7) {
      const visitCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < visitCount; j++) {
        visits.push({
          id: `${year}-${month}-${i}-${j}`,
          empresa:
            empresasOptions[Math.floor(Math.random() * empresasOptions.length)],
          tecnico:
            tecnicosOptions[Math.floor(Math.random() * tecnicosOptions.length)],
          dataVisita: new Date(year, month, i),
          horarioInicial: "08:00",
          horarioFinal: "09:00",
          descricao: `Visita ${j + 1} do dia ${i}`,
        });
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(visits), 300);
  });
};

export const Visitas = () => {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"list" | "form">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [horarioInicial, setHorarioInicial] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [monthVisits, setMonthVisits] = useState<any[]>([]);
  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  const fetchMonthVisits = async (date: Date) => {
    setLoading(true);
    try {
      const visits = await simulateBackendRequest(
        date.getMonth(),
        date.getFullYear(),
      );
      setMonthVisits(visits as any[]);
    } catch (error) {
      console.error("Erro ao buscar visitas:", error);
      setMonthVisits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthVisits(activeDate);
  }, [activeDate]);

  const getVisitsForDay = (date: Date) => {
    return monthVisits.filter(
      (visit) =>
        visit.dataVisita.getDate() === date.getDate() &&
        visit.dataVisita.getMonth() === date.getMonth() &&
        visit.dataVisita.getFullYear() === date.getFullYear(),
    );
  };

  const monthMatrix = useMemo(() => {
    const start = startOfMonth(activeDate);
    const end = endOfMonth(activeDate);

    const firstCell = startOfWeek(start);
    const weeks: Date[][] = [];
    let cursor = new Date(firstCell);
    while (cursor <= end || weeks.length < 6) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cursor));
        cursor = addDays(cursor, 1);
      }
      weeks.push(week);

      if (cursor > end && weeks.length >= 4) {
        break;
      }
    }
    return weeks;
  }, [activeDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(activeDate);
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
    return days;
  }, [activeDate]);

  const handlePrev = () => {
    if (view === "month") setActiveDate((d) => addMonths(d, -1));
    else setActiveDate((d) => addWeeks(d, -1));
  };

  const handleNext = () => {
    if (view === "month") setActiveDate((d) => addMonths(d, 1));
    else setActiveDate((d) => addWeeks(d, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setModalMode("list");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setModalMode("list");
    setEditingVisit(null);
    resetForm();
  };

  const resetForm = () => {
    setEmpresa("");
    setTecnico("");
    setHorarioInicial("");
    setHorarioFinal("");
    setDescricao("");
    setEditingVisit(null);
  };

  const handleNewVisit = () => {
    setModalMode("form");
    resetForm();
  };

  const handleEditVisit = (visit: any) => {
    setEditingVisit(visit);
    setEmpresa(visit.empresa);
    setTecnico(visit.tecnico);
    setHorarioInicial(visit.horarioInicial);
    setHorarioFinal(visit.horarioFinal);
    setDescricao(visit.descricao);
    setModalMode("form");
  };

  const handleSubmit = () => {
    console.log({
      id: editingVisit?.id || `new-${Date.now()}`,
      empresa,
      tecnico,
      dataVisita: selectedDate,
      horarioInicial,
      horarioFinal,
      descricao,
    });
    handleCloseModal();
  };

  const dayVisits = selectedDate ? getVisitsForDay(selectedDate) : [];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <RadioGroup
          row
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "week" | "day")}
          aria-label="view"
        >
          <FormControlLabel value="month" control={<Radio />} label="Mês" />
          <FormControlLabel value="week" control={<Radio />} label="Semana" />
          <FormControlLabel value="day" control={<Radio />} label="Dia" />
        </RadioGroup>
      </Box>
      <Paper elevation={2} sx={{ p: 2, width: "100%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Tooltip
            title={view === "month" ? "Mês anterior" : "Semana anterior"}
          >
            <IconButton
              onClick={handlePrev}
              size="small"
              aria-label="previous"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {view === "month"
              ? formatMonthYear(activeDate)
              : `${formatMonthYear(activeDate)} (Semana)`}
          </Typography>
          <Tooltip
            title={view === "month" ? "Mês posterior" : "Semana posterior"}
          >
            <IconButton
              onClick={handleNext}
              size="small"
              aria-label="next"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {view === "month" ? (
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                mb: 1,
              }}
            >
              {monthMatrix[0].map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    minWidth: 0,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    {formatDayShort(d)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ width: "100%" }}>
              {monthMatrix.map((week, wi) => (
                <Box
                  key={wi}
                  sx={{
                    display: "flex",
                    width: "100%",
                    mb: 1,
                    height: `calc((100vh - 300px) / ${monthMatrix.length})`,
                    minHeight: "60px",
                  }}
                >
                  {week.map((day, di) => {
                    const isCurrentMonth =
                      day.getMonth() === activeDate.getMonth();
                    const dayVisits = getVisitsForDay(day);
                    const hasVisits = dayVisits.length > 0;

                    return (
                      <Box
                        key={di}
                        sx={{
                          flex: 1,
                          borderRadius: 1,
                          p: 0.5,
                          textAlign: "center",
                          bgcolor: hasVisits
                            ? "#fffde7"
                            : isCurrentMonth
                              ? "background.paper"
                              : "action.hover",
                          cursor: "pointer",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          mx: 0.5,
                          boxSizing: "border-box",
                          border: "1px solid",
                          borderColor: "divider",
                          "&:hover": {
                            bgcolor: hasVisits
                              ? "#fff9c4"
                              : isCurrentMonth
                                ? "action.hover"
                                : "action.selected",
                          },
                        }}
                        onClick={() => handleDayClick(day)}
                      >
                        <Typography variant="body2">
                          {formatDayNumber(day)}
                        </Typography>
                        {hasVisits && (
                          <Typography
                            variant="caption"
                            sx={{ mt: 0.5, fontSize: "0.7rem" }}
                          >
                            {dayVisits.length}{" "}
                            {dayVisits.length === 1 ? "Visita" : "Visitas"}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
              {weekDays.map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    {formatDayShort(d)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", width: "100%" }}>
              {weekDays.map((d, i) => {
                const dayVisits = getVisitsForDay(d);
                const hasVisits = dayVisits.length > 0;

                return (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      borderRadius: 1,
                      p: 1,
                      textAlign: "center",
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      cursor: "pointer",
                      mx: 0.5,
                      boxSizing: "border-box",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: hasVisits ? "#fffde7" : "background.paper",
                      "&:hover": {
                        bgcolor: hasVisits ? "#fff9c4" : "action.hover",
                      },
                    }}
                    onClick={() => handleDayClick(d)}
                  >
                    <Typography variant="body2">
                      {formatDayNumber(d)}
                    </Typography>
                    {hasVisits && (
                      <Typography
                        variant="caption"
                        sx={{ mt: 0.5, fontSize: "0.7rem" }}
                      >
                        {dayVisits.length}{" "}
                        {dayVisits.length === 1 ? "Visita" : "Visitas"}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Paper>

      <Modal open={modalOpen} onClose={handleCloseModal}>
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
                          secondary={`${visit.horarioInicial} às ${visit.horarioFinal} - ${visit.descricao}`}
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
                value={horarioInicial}
                onChange={(e) => setHorarioInicial(e.target.value)}
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
                value={horarioFinal}
                onChange={(e) => setHorarioFinal(e.target.value)}
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
      </Modal>
    </>
  );
};
