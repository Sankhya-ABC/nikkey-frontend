import { Box, Theme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

import { ThemeMode } from "../Template/tokens";

export const CountdownTimer: React.FC = () => {
  const { getSessionRemaining } = useAuth();
  const { themeMode } = useTheme();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const formatTime = (seconds: number) => {
    const totalSeconds = seconds + 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return {
      hours: hours.toString().padStart(2, "0").split(""),
      minutes: minutes.toString().padStart(2, "0").split(""),
    };
  };

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getSessionRemaining();
      setTimeLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const { hours, minutes } = formatTime(timeLeft);
  const isLight = themeMode === ThemeMode.LIGHT;

  const boxStyle = {
    backgroundColor: ({ palette }: Theme) =>
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
