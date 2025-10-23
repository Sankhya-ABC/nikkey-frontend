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

const mainColors = {
  primary: {
    main: "#df0209",
  },
  secondary: {
    main: "#1976d2",
  },
};

const lightTheme = {
  palette: {
    mode: "light" as const,
    ...mainColors,
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
    ...mainColors,
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
