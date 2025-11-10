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
import { NotFound } from "./pages/NotFound";
import { OrdemDeServico } from "./pages/OrdemDeServico";
import { RelatorioProdutividade } from "./pages/RelatorioProdutividade";

const routes = [
  {
    path: "login",
    element: <Login />,
    isProtected: false,
    permissions: [],
  },
  {
    path: "*",
    element: <NotFound />,
    isProtected: false,
    permissions: [],
  },
  {
    path: "",
    element: <Dashboard />,
    isProtected: true,
    permissions: [],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    isProtected: true,
    permissions: [],
  },
  {
    path: "clientes",
    element: <Clientes />,
    isProtected: true,
    permissions: [],
  },
  {
    element: <Usuarios />,
    path: "usuarios",
    isProtected: true,
    permissions: [],
  },
  {
    path: "visitas",
    element: <span>visitas</span>,
    isProtected: true,
    permissions: [],
  },
  {
    path: "ordens-de-servico",
    element: <OrdemDeServico />,
    isProtected: true,
    permissions: [],
  },
  {
    path: "relatorio-de-produtividade",
    element: <RelatorioProdutividade />,
    isProtected: true,
    permissions: [],
  },
];

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<Template />}>
                {routes.map(({ path, element, isProtected, permissions }) => {
                  return (
                    <Route
                      path={path}
                      element={
                        isProtected ? (
                          <ProtectedRoute>{element}</ProtectedRoute>
                        ) : (
                          element
                        )
                      }
                    />
                  );
                })}
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </DrawerProvider>
    </ThemeProvider>
  );
};
