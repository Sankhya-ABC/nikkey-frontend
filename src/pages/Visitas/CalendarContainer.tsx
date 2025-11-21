import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import { View } from "./type";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  formatDate,
  formatMonthYear,
  startOfWeek,
} from "./utils";

interface CalendarContainerProps {
  view: View;
  handleSelectCalendarDate: (event: React.MouseEvent<HTMLElement>) => void;
  activeDate: Date;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
  children: ReactNode;
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  view,
  handleSelectCalendarDate,
  activeDate,
  setActiveDate,
  children,
}) => {
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

  return (
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
          onClick={handleSelectCalendarDate}
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

      {children}
    </Paper>
  );
};
