import { Box, Typography } from "@mui/material";

import { VisitaForm } from "./type";
import { formatDayNumber, formatDayShort } from "./utils";

interface DayProps {
  dayVisitsDisplay: VisitaForm[];
  activeDate: Date;
  handleEditVisit: (visit: VisitaForm) => void;
}

export const Day: React.FC<DayProps> = ({
  dayVisitsDisplay,
  activeDate,
  handleEditVisit,
}) => {
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

              {dayVisitsDisplay
                .filter((visit) => {
                  const visitHour = parseInt(visit.horaInicial.split(":")[0]);
                  return visitHour === hour;
                })
                .map((visit, visitIndex) => {
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
                        {visit.empresa} - {visit.tecnico}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ fontSize: "0.55rem" }}
                      >
                        {visit.horaInicial} - {visit.horaFinal}
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
};
