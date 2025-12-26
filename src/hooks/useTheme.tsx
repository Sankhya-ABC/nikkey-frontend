import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ThemeMode, themeTokens } from "../components/Template/tokens";
import { SESSION_STORAGE_KEYS } from "@/utils/constants";

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== "undefined") {
      const savedTheme = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.theme,
      ) as ThemeMode;
      if (
        savedTheme &&
        (savedTheme === ThemeMode.LIGHT || savedTheme === "dark")
      ) {
        return savedTheme;
      }
    }
    return ThemeMode.LIGHT;
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);

  const theme = createTheme(themeTokens(themeMode));

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.theme, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) =>
      prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
    );
  };

  const value: ThemeContextType = {
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
