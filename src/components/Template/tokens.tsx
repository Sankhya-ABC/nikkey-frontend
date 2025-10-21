export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export const themeTokens = (themeMode: ThemeMode) => ({
  palette: {
    mode: themeMode,
    primary: {
      main: themeMode === ThemeMode.DARK ? "#90caf9" : "#1976d2",
    },
    secondary: {
      main: themeMode === ThemeMode.DARK ? "#f48fb1" : "#dc004e",
    },
    background: {
      default: themeMode === ThemeMode.DARK ? "#121212" : "#f5f5f5",
      paper: themeMode === ThemeMode.DARK ? "#1e1e1e" : "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: themeMode === ThemeMode.DARK ? "#1e1e1e" : "#ffffff",
          color: themeMode === ThemeMode.DARK ? "#ffffff" : "#000000",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: themeMode === ThemeMode.DARK ? "#1e1e1e" : "#ffffff",
        },
      },
    },
  },
});
