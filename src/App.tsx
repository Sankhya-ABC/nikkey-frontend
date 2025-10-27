import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Template } from "./components/Template";
import { DrawerProvider } from "./hooks/useDrawer";
import { ThemeProvider } from "./hooks/useTheme";
import { Clientes } from "./pages/Clientes";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Template />}>
                <Route
                  path=""
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="visitas" element={<span>visitas</span>} />
                <Route
                  path="ordens-de-servico"
                  element={<span>ordens-de-servico</span>}
                />
                <Route
                  path="relatorio-de-produtividade"
                  element={<span>relatorio-de-produtividade</span>}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </DrawerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
