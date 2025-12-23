import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

import { VisitaForm } from "./type";
import {
  addDays,
  endOfMonth,
  formatDayNumber,
  formatDayShort,
  startOfMonth,
  startOfWeek,
} from "./utils";

interface MonthProps {
  activeDate: Date;
  handleGetVisitsForDay: (date: Date) => VisitaForm[];
  handleDayClick: (date: Date) => void;
}

export const Month: React.FC<MonthProps> = ({
  activeDate,
  handleGetVisitsForDay,
  handleDayClick,
}) => {
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
              height: `calc((100vh - 340px) / ${monthMatrix.length})`,
              minHeight: "60px",
            }}
          >
            {week.map((day, di) => {
              const isCurrentMonth = day.getMonth() === activeDate.getMonth();
              const dayVisits = handleGetVisitsForDay(day);
              const hasVisits = dayVisits.length > 0;
              const lastRow = wi === monthMatrix?.length - 1;

              return (
                <Box
                  key={di}
                  sx={{
                    flex: 1,
                    p: 0.5,
                    textAlign: "center",
                    bgcolor: hasVisits
                      ? "#e9f6fd"
                      : isCurrentMonth
                        ? "background.paper"
                        : "action.hover",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    boxSizing: "border-box",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "divider",
                    borderTop: 0,
                    borderLeft: 0,
                    borderRight: di === 6 ? 0 : undefined,
                    borderBottom: lastRow ? 0 : undefined,

                    minWidth: 0,
                    "&:hover": {
                      bgcolor: hasVisits
                        ? "#a8d1e9"
                        : isCurrentMonth
                          ? "action.hover"
                          : "action.selected",
                    },
                  }}
                  onClick={() => handleDayClick(day)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatDayNumber(day)}
                  </Typography>
                  {hasVisits && (
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        fontSize: "0.7rem",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong>{dayVisits.length} </strong>
                      {dayVisits.length === 1 ? "visita" : "visitas"}
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
};
