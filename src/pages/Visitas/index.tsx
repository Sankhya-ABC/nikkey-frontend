import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";

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

export const Visitas = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [horarioInicial, setHorarioInicial] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [descricao, setDescricao] = useState("");

  const timeOptions = useMemo(() => generateTimeOptions(), []);

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
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setEmpresa("");
    setTecnico("");
    setHorarioInicial("");
    setHorarioFinal("");
    setDescricao("");
  };

  const handleSubmit = () => {
    console.log({
      empresa,
      tecnico,
      dataVisita: selectedDate,
      horarioInicial,
      horarioFinal,
      descricao,
    });
    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <RadioGroup
          row
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "week")}
          aria-label="view"
        >
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="Calendário"
          />
          <FormControlLabel value="week" control={<Radio />} label="Semana" />
        </RadioGroup>
      </Box>
      <Paper elevation={2} sx={{ p: 2, width: "100%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Tooltip title="Mês anterior">
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
          <Tooltip title="Próximo mês">
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
                    return (
                      <Box
                        key={di}
                        sx={{
                          flex: 1,
                          borderRadius: 1,
                          p: 1,
                          textAlign: "center",
                          bgcolor: isCurrentMonth
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
                        }}
                        onClick={() => handleDayClick(day)}
                      >
                        <Typography variant="body2">
                          {formatDayNumber(day)}
                        </Typography>
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
              {weekDays.map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    borderRadius: 1,
                    p: 1,
                    textAlign: "center",
                    height: "120px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                    mx: 0.5,
                    boxSizing: "border-box",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                  onClick={() => handleDayClick(d)}
                >
                  <Typography variant="body2">{formatDayNumber(d)}</Typography>
                </Box>
              ))}
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" mb={2}>
            Cadastro - Agendar Visita
          </Typography>

          <TextField
            fullWidth
            label="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Técnico"
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Data da Visita"
            value={selectedDate ? selectedDate.toLocaleDateString("pt-BR") : ""}
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
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
