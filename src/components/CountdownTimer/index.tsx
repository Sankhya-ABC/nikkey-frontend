import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../hooks/useTheme";
import { ThemeMode } from "../Template/tokens";

interface CountdownTimerProps {
  initialMinutes?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 120,
}) => {
  const { themeMode } = useTheme();
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.min(initialMinutes, 120),
  );

  const formatTime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return {
      hours: hours.toString().padStart(2, "0").split(""),
      minutes: remainingMinutes.toString().padStart(2, "0").split(""),
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const { hours, minutes } = formatTime(timeLeft);
  const isLight = themeMode === ThemeMode.LIGHT;

  const boxStyle = {
    backgroundColor: ({ palette }: any) =>
      isLight ? palette.grey[300] : palette.grey[600],
    padding: "1px 6px",
    margin: "2px",
    borderRadius: "4px",
    textAlign: "center" as const,
    fontWeight: 500,
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={({ palette }) => palette.text.primary}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mr={1}>
        <Typography variant="caption">hora</Typography>
        <Box display="flex" sx={{ mt: -0.5 }}>
          {hours.map((digit, i) => (
            <Box key={i} sx={boxStyle}>
              {digit}
            </Box>
          ))}
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, ml: -1 }}>
        :
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="caption">minuto</Typography>
        <Box display="flex" sx={{ mt: -0.5 }}>
          {minutes.map((digit, i) => (
            <Box key={i} sx={boxStyle}>
              {digit}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
