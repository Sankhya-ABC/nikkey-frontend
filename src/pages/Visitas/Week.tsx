import { Box, Typography } from "@mui/material";
import { VisitaForm } from "./type";

interface WeekProps {
  weekDays: Date[];

  formatDayShort: (d: Date) => string;
  getVisitsForDay: (date: Date) => VisitaForm[];
  handleDayClick: (date: Date) => void;
  formatDayNumber: (d: Date) => number;

  handleEditVisit: (visit: VisitaForm) => void;
}

export const Week: React.FC<WeekProps> = ({
  weekDays,
  formatDayShort,
  getVisitsForDay,
  handleDayClick,
  formatDayNumber,
  handleEditVisit,
}) => {
  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
        <Box sx={{ width: 80, minWidth: 80 }}></Box>
        {weekDays.map((d, i) => (
          <Box key={i} sx={{ flex: 1, textAlign: "center", minWidth: 120 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {formatDayShort(d)} {formatDayNumber(d)}
            </Typography>
          </Box>
        ))}
      </Box>

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

            {weekDays.map((day, dayIndex) => {
              const dayVisits = getVisitsForDay(day);
              const hourVisits = dayVisits.filter((visit) => {
                const visitHour = parseInt(visit.horaInicial.split(":")[0]);
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
                    const endMinutes = parseInt(visit.horaFinal.split(":")[1]);
                    const startHour = parseInt(visit.horaInicial.split(":")[0]);
                    const endHour = parseInt(visit.horaFinal.split(":")[0]);

                    const duration =
                      (endHour - startHour) * 60 + (endMinutes - startMinutes);
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
  );
};
