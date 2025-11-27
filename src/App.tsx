import React, { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Template } from "./components/Template";
import { AuthProvider } from "./hooks/useAuth";
import { DrawerProvider } from "./hooks/useDrawer";
import { ThemeProvider } from "./hooks/useTheme";
import { Clientes } from "./pages/Clientes";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { OrdensDeServico } from "./pages/OrdensDeServico";
import { RelatoriosProdutividade } from "./pages/RelatoriosProdutividade";
import { Usuarios } from "./pages/Usuarios";
import { Visitas } from "./pages/Visitas";

interface Routes {
  path: string;
  element: JSX.Element;
  isProtected: boolean;
}

const routes: Routes[] = [
  {
    path: "login",
    element: <Login />,
    isProtected: false,
  },
  {
    path: "*",
    element: <NotFound />,
    isProtected: false,
  },
  {
    path: "",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "clientes",
    element: <Clientes />,
    isProtected: true,
  },
  {
    element: <Usuarios />,
    path: "usuarios",
    isProtected: true,
  },
  {
    path: "visitas",
    element: <Visitas />,
    isProtected: true,
  },
  {
    path: "ordens-de-servico",
    element: <OrdensDeServico />,
    isProtected: true,
  },
  {
    path: "relatorio-de-produtividade",
    element: <RelatoriosProdutividade />,
    isProtected: true,
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
                {routes.map(({ path, element, isProtected }) => {
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
