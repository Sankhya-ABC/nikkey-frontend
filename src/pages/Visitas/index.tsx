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

const formatMonthYear = (d: Date) =>
  d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
const formatDayShort = (d: Date) =>
  d.toLocaleDateString("pt-BR", { weekday: "short" });
const formatDayNumber = (d: Date) => d.getDate();

export const Visitas = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [activeDate, setActiveDate] = useState<Date>(new Date());

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
                        onClick={() => setActiveDate(new Date(day))}
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
                  onClick={() => setActiveDate(new Date(d))}
                >
                  <Typography variant="body2">{formatDayNumber(d)}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
};
