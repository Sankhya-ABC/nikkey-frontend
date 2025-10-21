import { createTheme, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Menu } from "./components/Menu";
import { Sidebar } from "./components/Sidebar";

type ThemeMode = "light" | "dark";

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
          background: {
            default: themeMode === "light" ? "#f5f5f5" : "#121212",
            paper: themeMode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        typography: {
          h6: {
            fontWeight: 600,
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: themeMode === "light" ? "#ffffff" : "#1e1e1e",
              },
            },
          },
        },
      }),
    [themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Menu onThemeToggle={toggleTheme} isDarkMode={themeMode === "dark"} />
      <Sidebar />
      <p>aaa</p>
    </ThemeProvider>
  );
};
