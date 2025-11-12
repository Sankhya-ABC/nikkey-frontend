import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 800,
  margin: "0 auto",
  backgroundColor: "#f8f9fa",
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: "2px solid #e0e0e0",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#333",
}));

const MonthInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  alignItems: "center",
}));

const MonthText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: "#555",
}));

const WeekDayCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  padding: theme.spacing(1),
  color: "#333",
}));

const DayCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  border: "1px solid #e0e0e0",
  padding: theme.spacing(1.5),
  height: 80,
  verticalAlign: "top",
  backgroundColor: "#fff",
  position: "relative",
  "&.other-month": {
    backgroundColor: "#f5f5f5",
    color: "#999",
  },
}));

const VisitaBadge = styled(Box)(({ theme }) => ({
  backgroundColor: "#4caf50",
  color: "white",
  fontSize: "0.75rem",
  padding: "2px 6px",
  borderRadius: "4px",
  marginTop: theme.spacing(0.5),
  display: "inline-block",
}));

const VisitasBadge = styled(Box)(({ theme }) => ({
  backgroundColor: "#2196f3",
  color: "white",
  fontSize: "0.75rem",
  padding: "2px 6px",
  borderRadius: "4px",
  marginTop: theme.spacing(0.5),
  display: "inline-block",
}));

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  hasVisita?: boolean;
  hasVisitas?: boolean;
}

export const Visitas: React.FC = () => {
  const calendarData: CalendarDay[][] = [
    [
      { day: 26, isCurrentMonth: false },
      { day: 27, isCurrentMonth: false, hasVisita: true },
      { day: 28, isCurrentMonth: false },
      { day: 29, isCurrentMonth: false },
      { day: 30, isCurrentMonth: false },
      { day: 31, isCurrentMonth: false },
      { day: 1, isCurrentMonth: true },
    ],
    [
      { day: 2, isCurrentMonth: true },
      { day: 3, isCurrentMonth: true, hasVisita: true },
      { day: 4, isCurrentMonth: true },
      { day: 5, isCurrentMonth: true },
      { day: 6, isCurrentMonth: true },
      { day: 7, isCurrentMonth: true, hasVisitas: true },
      { day: 8, isCurrentMonth: true },
    ],
    [
      { day: 9, isCurrentMonth: true },
      { day: 10, isCurrentMonth: true, hasVisita: true },
      { day: 11, isCurrentMonth: true },
      { day: 12, isCurrentMonth: true },
      { day: 13, isCurrentMonth: true },
      { day: 14, isCurrentMonth: true },
      { day: 15, isCurrentMonth: true },
    ],
    [
      { day: 16, isCurrentMonth: true },
      { day: 17, isCurrentMonth: true },
      { day: 18, isCurrentMonth: true },
      { day: 19, isCurrentMonth: true },
      { day: 20, isCurrentMonth: true },
      { day: 21, isCurrentMonth: true },
      { day: 22, isCurrentMonth: true },
    ],
    [
      { day: 23, isCurrentMonth: true },
      { day: 24, isCurrentMonth: true },
      { day: 25, isCurrentMonth: true },
      { day: 26, isCurrentMonth: true },
      { day: 27, isCurrentMonth: true },
      { day: 28, isCurrentMonth: true },
      { day: 29, isCurrentMonth: true },
    ],
    [
      { day: 30, isCurrentMonth: true },
      { day: 1, isCurrentMonth: false },
      { day: 2, isCurrentMonth: false },
      { day: 3, isCurrentMonth: false },
      { day: 4, isCurrentMonth: false },
      { day: 5, isCurrentMonth: false },
      { day: 6, isCurrentMonth: false },
    ],
  ];

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  return (
    <CalendarContainer elevation={3}>
      <HeaderSection>
        <Title>VISITAS</Title>
        <MonthInfo>
          <MonthText>NOVEMBRO DE 2025</MonthText>
          <MonthText>MÊS SEMANA DIA</MonthText>
        </MonthInfo>
      </HeaderSection>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {weekDays.map((day) => (
                <WeekDayCell key={day}>{day}</WeekDayCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {calendarData.map((week, weekIndex) => (
              <TableRow key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <DayCell
                    key={`${weekIndex}-${dayIndex}`}
                    className={!day.isCurrentMonth ? "other-month" : ""}
                  >
                    <Typography variant="body2">{day.day}</Typography>
                    {day.hasVisita && <VisitaBadge>VISITA</VisitaBadge>}
                    {day.hasVisitas && <VisitasBadge>VISITAS</VisitasBadge>}
                  </DayCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CalendarContainer>
  );
};
