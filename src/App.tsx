import React, { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Template } from "./components/Template";
import { DrawerProvider } from "./hooks/useDrawer";
import { ThemeProvider } from "./hooks/useTheme";
import { Clientes } from "./pages/Clientes";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { AuthProvider, Role } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { OrdensDeServico } from "./pages/OrdensDeServico";
import { RelatoriosProdutividade } from "./pages/RelatoriosProdutividade";
import { Visitas } from "./pages/Visitas";

interface Routes {
  path: string;
  element: JSX.Element;
  isProtected: boolean;
  roles: Role[];
}

const routes = [
  {
    path: "login",
    element: <Login />,
    isProtected: false,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "*",
    element: <NotFound />,
    isProtected: false,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "",
    element: <Dashboard />,
    isProtected: true,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    isProtected: true,
    roles: [Role.ADMIN],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    isProtected: true,
    roles: [Role.COMMON],
  },
  {
    path: "clientes",
    element: <Clientes />,
    isProtected: true,
    roles: [Role.ADMIN],
  },
  {
    element: <Usuarios />,
    path: "usuarios",
    isProtected: true,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "visitas",
    element: <Visitas />,
    isProtected: true,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "ordens-de-servico",
    element: <OrdensDeServico />,
    isProtected: true,
    roles: [Role.ADMIN, Role.COMMON],
  },
  {
    path: "relatorio-de-produtividade",
    element: <RelatoriosProdutividade />,
    isProtected: true,
    roles: [Role.ADMIN, Role.COMMON],
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
                {routes.map(({ path, element, isProtected, roles }) => {
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
