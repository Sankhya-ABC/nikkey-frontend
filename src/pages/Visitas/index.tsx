import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  FormControlLabel,
  Grid,
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
  d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
const formatDayShort = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short" });
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
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Tooltip title="Previous">
            <IconButton onClick={handlePrev} size="small" aria-label="previous">
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {view === "month"
              ? formatMonthYear(activeDate)
              : `${formatMonthYear(activeDate)} (Week)`}
          </Typography>
          <IconButton onClick={handleNext} size="small" aria-label="next">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        {view === "month" ? (
          <Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              {monthMatrix[0].map((d, i) => (
                <Typography
                  variant="caption"
                  align="center"
                  display="block"
                  key={i}
                >
                  {formatDayShort(d)}
                </Typography>
              ))}
            </Box>

            {monthMatrix.map((week, wi) => (
              <Grid container spacing={1} key={wi} sx={{ mb: 1 }}>
                {week.map((day, di) => {
                  const isCurrentMonth =
                    day.getMonth() === activeDate.getMonth();
                  return (
                    <Box
                      sx={{
                        borderRadius: 1,
                        p: 1,
                        textAlign: "center",
                        bgcolor: isCurrentMonth
                          ? "background.paper"
                          : "action.hover",
                        cursor: "pointer",
                        height: 100,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        width: "13.839%",
                      }}
                      onClick={() => setActiveDate(new Date(day))}
                    >
                      <Typography variant="body2">
                        {formatDayNumber(day)}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            ))}
          </Box>
        ) : (
          <Box>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              {weekDays.map((d, i) => (
                <Grid item xs key={i}>
                  <Typography variant="caption" align="center" display="block">
                    {formatDayShort(d)}
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 1,
                      p: 1,
                      textAlign: "center",
                      height: 120,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveDate(new Date(d))}
                  >
                    <Typography variant="body2">
                      {formatDayNumber(d)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </>
  );
};
