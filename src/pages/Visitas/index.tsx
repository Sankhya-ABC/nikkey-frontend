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
  Popover,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

enum View {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

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
const endOfWeek = (d: Date) => addDays(startOfWeek(d), 6);

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

const formatDate = (d: Date) => d.toLocaleDateString("pt-BR");

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
  const [view, setView] = useState<View>(View.MONTH);
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
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [tempDate, setTempDate] = useState<Date>(new Date());

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

  const getTitle = () => {
    switch (view) {
      case View.MONTH:
        return formatMonthYear(activeDate);
      case View.WEEK:
        const weekStart = startOfWeek(activeDate);
        const weekEnd = endOfWeek(activeDate);
        return `Semana: ${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
      case View.DAY:
        return `Dia: ${formatDate(activeDate)}`;
      default:
        return formatMonthYear(activeDate);
    }
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
    switch (view) {
      case View.MONTH:
        setActiveDate((d) => addMonths(d, -1));
        break;
      case View.WEEK:
        setActiveDate((d) => addWeeks(d, -1));
        break;
      case View.DAY:
        setActiveDate((d) => addDays(d, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case View.MONTH:
        setActiveDate((d) => addMonths(d, 1));
        break;
      case View.WEEK:
        setActiveDate((d) => addWeeks(d, 1));
        break;
      case View.DAY:
        setActiveDate((d) => addDays(d, 1));
        break;
    }
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

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempDate(new Date(activeDate));
    setDatePickerAnchor(event.currentTarget);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchor(null);
  };

  const handleDateChange = () => {
    setActiveDate(new Date(tempDate));
    handleDatePickerClose();
  };

  const dayVisits = selectedDate ? getVisitsForDay(selectedDate) : [];

  const renderCalendarContent = () => {
    switch (view) {
      case View.MONTH:
        return (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
              {monthMatrix[0].map((d, i) => (
                <Box key={i} sx={{ flex: 1, textAlign: "center", minWidth: 0 }}>
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
        );

      case View.WEEK:
        return (
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
              <Box sx={{ width: 80, minWidth: 80 }}></Box>
              {weekDays.map((d, i) => (
                <Box
                  key={i}
                  sx={{ flex: 1, textAlign: "center", minWidth: 120 }}
                >
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    {formatDayShort(d)} {formatDayNumber(d)}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Grade de horários */}
            <Box sx={{ width: "100%" }}>
              {Array.from({ length: 24 }, (_, hour) => (
                <Box
                  key={hour}
                  sx={{
                    display: "flex",
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {/* Coluna de horários */}
                  <Box
                    sx={{
                      width: 80,
                      minWidth: 80,
                      py: 1,
                      textAlign: "center",
                      borderRight: "1px solid #e0e0e0",
                      bgcolor: "background.default",
                    }}
                  >
                    <Typography variant="caption">
                      {hour.toString().padStart(2, "0")}:00
                    </Typography>
                  </Box>

                  {/* Colunas dos dias */}
                  {weekDays.map((day, dayIndex) => {
                    const dayVisits = getVisitsForDay(day);
                    const hourVisits = dayVisits.filter((visit) => {
                      const visitHour = parseInt(
                        visit.horarioInicial.split(":")[0],
                      );
                      return visitHour === hour;
                    });

                    return (
                      <Box
                        key={dayIndex}
                        sx={{
                          flex: 1,
                          minWidth: 120,
                          minHeight: 60,
                          position: "relative",
                          borderRight: "1px solid #e0e0e0",
                          bgcolor: "background.paper",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                        onClick={() => handleDayClick(day)}
                      >
                        {/* Divisões de 5 minutos */}
                        {Array.from({ length: 12 }, (_, minuteIndex) => (
                          <Box
                            key={minuteIndex}
                            sx={{
                              height: 5,
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          />
                        ))}

                        {/* Visitas */}
                        {hourVisits.map((visit, visitIndex) => {
                          const startMinutes = parseInt(
                            visit.horarioInicial.split(":")[1],
                          );
                          const endMinutes = parseInt(
                            visit.horarioFinal.split(":")[1],
                          );
                          const startHour = parseInt(
                            visit.horarioInicial.split(":")[0],
                          );
                          const endHour = parseInt(
                            visit.horarioFinal.split(":")[0],
                          );

                          const duration =
                            (endHour - startHour) * 60 +
                            (endMinutes - startMinutes);
                          const height = (duration / 60) * 60; // altura proporcional

                          return (
                            <Box
                              key={visitIndex}
                              sx={{
                                position: "absolute",
                                top: (startMinutes / 60) * 60,
                                left: 4,
                                right: 4,
                                height: height,
                                bgcolor: "#fffde7",
                                border: "1px solid #ffeb3b",
                                borderRadius: 1,
                                p: 0.5,
                                cursor: "pointer",
                                zIndex: 1,
                                "&:hover": {
                                  bgcolor: "#fff9c4",
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditVisit(visit);
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: "bold", fontSize: "0.6rem" }}
                              >
                                {visit.empresa}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                sx={{ fontSize: "0.55rem" }}
                              >
                                {visit.horarioInicial} - {visit.horarioFinal}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        );

      case View.DAY:
        const dayVisitsDisplay = getVisitsForDay(activeDate);
        return (
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
              <Box sx={{ width: 80, minWidth: 80 }}></Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  {formatDayShort(activeDate)} {formatDayNumber(activeDate)}
                </Typography>
              </Box>
            </Box>

            {/* Grade de horários */}
            <Box sx={{ width: "100%" }}>
              {Array.from({ length: 24 }, (_, hour) => (
                <Box
                  key={hour}
                  sx={{
                    display: "flex",
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {/* Coluna de horários */}
                  <Box
                    sx={{
                      width: 80,
                      minWidth: 80,
                      py: 1,
                      textAlign: "center",
                      borderRight: "1px solid #e0e0e0",
                      bgcolor: "background.default",
                    }}
                  >
                    <Typography variant="caption">
                      {hour.toString().padStart(2, "0")}:00
                    </Typography>
                  </Box>

                  {/* Coluna do dia */}
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: 60,
                      position: "relative",
                      bgcolor: "background.paper",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                    onClick={() => handleDayClick(activeDate)}
                  >
                    {/* Divisões de 5 minutos */}
                    {Array.from({ length: 12 }, (_, minuteIndex) => (
                      <Box
                        key={minuteIndex}
                        sx={{
                          height: 5,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      />
                    ))}

                    {/* Visitas */}
                    {dayVisitsDisplay
                      .filter((visit) => {
                        const visitHour = parseInt(
                          visit.horarioInicial.split(":")[0],
                        );
                        return visitHour === hour;
                      })
                      .map((visit, visitIndex) => {
                        const startMinutes = parseInt(
                          visit.horarioInicial.split(":")[1],
                        );
                        const endMinutes = parseInt(
                          visit.horarioFinal.split(":")[1],
                        );
                        const startHour = parseInt(
                          visit.horarioInicial.split(":")[0],
                        );
                        const endHour = parseInt(
                          visit.horarioFinal.split(":")[0],
                        );

                        const duration =
                          (endHour - startHour) * 60 +
                          (endMinutes - startMinutes);
                        const height = (duration / 60) * 60;

                        return (
                          <Box
                            key={visitIndex}
                            sx={{
                              position: "absolute",
                              top: (startMinutes / 60) * 60,
                              left: 4,
                              right: 4,
                              height: height,
                              bgcolor: "#fffde7",
                              border: "1px solid #ffeb3b",
                              borderRadius: 1,
                              p: 0.5,
                              cursor: "pointer",
                              zIndex: 1,
                              "&:hover": {
                                bgcolor: "#fff9c4",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditVisit(visit);
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: "bold", fontSize: "0.6rem" }}
                            >
                              {visit.empresa} - {visit.tecnico}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{ fontSize: "0.55rem" }}
                            >
                              {visit.horarioInicial} - {visit.horarioFinal}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.55rem" }}
                            >
                              {visit.descricao}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        );
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <RadioGroup
          row
          value={view}
          onChange={(e) => setView(e.target.value as View)}
          aria-label="view"
        >
          <FormControlLabel
            value={View.MONTH}
            control={<Radio />}
            label="Mês"
          />
          <FormControlLabel
            value={View.WEEK}
            control={<Radio />}
            label="Semana"
          />
          <FormControlLabel value={View.DAY} control={<Radio />} label="Dia" />
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
            title={
              view === View.MONTH
                ? "Mês anterior"
                : view === View.WEEK
                  ? "Semana anterior"
                  : "Dia anterior"
            }
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
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={handleTitleClick}
          >
            {getTitle()}
          </Typography>
          <Tooltip
            title={
              view === View.MONTH
                ? "Mês posterior"
                : view === View.WEEK
                  ? "Semana posterior"
                  : "Dia posterior"
            }
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

        {renderCalendarContent()}
      </Paper>

      <Popover
        open={Boolean(datePickerAnchor)}
        anchorEl={datePickerAnchor}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Selecione a data
          </Typography>

          {view === View.MONTH && (
            <>
              <TextField
                fullWidth
                select
                label="Mês"
                value={tempDate.getMonth()}
                onChange={(e) =>
                  setTempDate(
                    new Date(
                      tempDate.getFullYear(),
                      parseInt(e.target.value),
                      tempDate.getDate(),
                    ),
                  )
                }
                margin="normal"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {new Date(2000, i, 1).toLocaleDateString("pt-BR", {
                      month: "long",
                    })}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Ano"
                value={tempDate.getFullYear()}
                onChange={(e) =>
                  setTempDate(
                    new Date(
                      parseInt(e.target.value),
                      tempDate.getMonth(),
                      tempDate.getDate(),
                    ),
                  )
                }
                margin="normal"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <MenuItem key={i} value={new Date().getFullYear() - 5 + i}>
                    {new Date().getFullYear() - 5 + i}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {(view === View.WEEK || view === View.DAY) && (
            <>
              <TextField
                fullWidth
                type="date"
                label="Data"
                value={tempDate.toISOString().split("T")[0]}
                onChange={(e) => setTempDate(new Date(e.target.value))}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button onClick={handleDatePickerClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleDateChange}>
              Aplicar
            </Button>
          </Box>
        </Box>
      </Popover>

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
