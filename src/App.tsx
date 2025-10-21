import { createTheme, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Menu } from "./components/Template/Menu";
import { Sidebar } from "./components/Template/Sidebar";
import { Template } from "./components/Template";
import { BrowserRouter, Route, Routes } from "react-router";

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
      <BrowserRouter>
        <Routes>
          <Route element={<Template />}>
            <Route path="dashboard" element={<p>dashboard</p>} />
            <Route path="clientes" element={<p>clientes</p>} />
            <Route path="usuarios" element={<p>usuarios</p>} />
            <Route path="visitas" element={<p>visitas</p>} />
            <Route
              path="ordens-de-servico"
              element={<p>ordens-de-servico</p>}
            />
            <Route
              path="relatorio-de-produtividade"
              element={<p>relatorio-de-produtividade</p>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
