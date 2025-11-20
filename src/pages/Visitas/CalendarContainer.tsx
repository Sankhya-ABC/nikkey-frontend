import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import { View } from "./type";

interface CalendarContainerProps {
  view: any;
  handlePrev: any;
  handleNext: any;
  handleSelectCalendarDate: any;
  getTitle: any;
  children: ReactNode;
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  view,
  handlePrev,
  handleNext,
  handleSelectCalendarDate,
  getTitle,
  children,
}) => {
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
