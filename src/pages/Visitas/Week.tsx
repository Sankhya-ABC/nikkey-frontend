import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

import { VisitaForm } from "./type";
import { addDays, formatDayNumber, formatDayShort, startOfWeek } from "./utils";

interface WeekProps {
  activeDate: Date;
  handleGetVisitsForDay: (date: Date) => VisitaForm[];
  handleDayClick: (date: Date) => void;
  handleEditVisit: (visit: VisitaForm) => void;
}

export const Week: React.FC<WeekProps> = ({
  activeDate,
  handleGetVisitsForDay,
  handleDayClick,
  handleEditVisit,
}) => {
  const weekDays = useMemo(() => {
    const start = startOfWeek(activeDate);
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
    return days;
  }, [activeDate]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          mb: 1,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 45,
            minWidth: 45,
            flexShrink: 0,
          }}
        ></Box>
        {weekDays.map((d, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              minWidth: 0,
              textAlign: "center",
              px: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {formatDayShort(d)} {formatDayNumber(d)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          overflow: "auto",
        }}
      >
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
              <Box
                sx={{
                  width: 45,
                  minWidth: 45,
                  py: 1,
                  textAlign: "center",
                  borderRight: "1px solid #e0e0e0",
                  bgcolor: "background.default",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                  {hour.toString().padStart(2, "0")}:00
                </Typography>
              </Box>

              {weekDays.map((day, dayIndex) => {
                const dayVisits = handleGetVisitsForDay(day);
                const hourVisits = dayVisits.filter((visit) => {
                  const visitHour = parseInt(visit.horaInicial.split(":")[0]);
                  return visitHour === hour;
                });

                return (
                  <Box
                    key={dayIndex}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      minHeight: 60,
                      position: "relative",
                      borderRight: dayIndex < 6 ? "1px solid #e0e0e0" : "none",
                      bgcolor: "background.paper",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                    onClick={() => handleDayClick(day)}
                  >
                    {Array.from({ length: 12 }, (_, minuteIndex) => (
                      <Box
                        key={minuteIndex}
                        sx={{
                          height: 5,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      />
                    ))}

                    {hourVisits.map((visit, visitIndex) => {
                      const startMinutes = parseInt(
                        visit.horaInicial.split(":")[1],
                      );
                      const endMinutes = parseInt(
                        visit.horaFinal.split(":")[1],
                      );
                      const startHour = parseInt(
                        visit.horaInicial.split(":")[0],
                      );
                      const endHour = parseInt(visit.horaFinal.split(":")[0]);

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
                            height: height,
                            p: 0.5,
                            cursor: "pointer",
                            zIndex: 1,
                            overflow: "hidden",
                            width: "100%",
                            bgcolor: "#e9f6fd",
                            "&:hover": {
                              bgcolor: "#a8d1e9",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditVisit(visit);
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.6rem",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {visit.empresa}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ fontSize: "0.55rem" }}
                          >
                            {visit.horaInicial} - {visit.horaFinal}
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
    </Box>
  );
};
