import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { Template } from "./components/Template";
import { AlertProvider } from "./hooks/useAlert";
import { AuthProvider } from "./hooks/useAuth";
import { DrawerProvider } from "./hooks/useDrawer";
import { ThemeProvider } from "./hooks/useTheme";
import { routes } from "./routes";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <DrawerProvider>
              <Routes>
                <Route element={<Template />}>
                  {routes.map(
                    (
                      {
                        path,
                        element,
                        isProtected,
                        requiredRole,
                        requiredAnyRole,
                      },
                      index,
                    ) => {
                      return (
                        <Route
                          path={path}
                          key={index}
                          element={
                            isProtected ? (
                              <ProtectedRoute
                                requiredRole={requiredRole}
                                requiredAnyRole={requiredAnyRole}
                              >
                                {element}
                              </ProtectedRoute>
                            ) : (
                              element
                            )
                          }
                        />
                      );
                    },
                  )}
                </Route>
              </Routes>
            </DrawerProvider>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
