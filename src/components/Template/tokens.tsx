export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export const themeTokens = (themeMode: ThemeMode) => ({
  ...(themeMode === ThemeMode.LIGHT
    ? lightTheme
    : {
        ...darkTheme,
      }),
});

const lightTheme = {
  palette: {
    mode: "light" as const,
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark" as const,
    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
    },
    secondary: {
      main: "#f48fb1",
      light: "#fce4ec",
      dark: "#ad1457",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
};
