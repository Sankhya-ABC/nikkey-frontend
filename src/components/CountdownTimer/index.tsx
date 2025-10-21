import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

interface CountdownTimerProps {
  initialMinutes?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 120,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.min(initialMinutes, 120),
  );

  const formatTime = useCallback((minutes: number): string[] => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursStr = hours.toString().padStart(2, "0");
    const minStr = remainingMinutes.toString().padStart(2, "0");

    return [...hoursStr.split(""), ":", ...minStr.split("")];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 60000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const timeDigits = formatTime(timeLeft);

  return (
    <Box sx={{ color: ({ palette }) => palette.text.primary }}>
      {timeDigits.map((digit, index) => (
        <Box
          key={index}
          component="span"
          sx={
            digit === ":"
              ? null
              : {
                  backgroundColor: ({ palette }) => palette.background.default,
                  padding: "5px",
                  margin: "2px",
                  borderRadius: "4px",
                }
          }
        >
          {digit}
        </Box>
      ))}
    </Box>
  );
};
