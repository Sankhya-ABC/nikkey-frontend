import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Template } from "./components/Template";
import { DrawerProvider } from "./hooks/useDrawer";
import { ThemeProvider } from "./hooks/useTheme";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DrawerProvider>
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
      </DrawerProvider>
    </ThemeProvider>
  );
};
