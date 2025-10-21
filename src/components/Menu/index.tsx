import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import React from "react";
import nikkeyCompleteLogo from "../../../public/nikkey-complete-logo.png";
import { CountdownTimer } from "../CountdownTimer";

interface AppHeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const Menu: React.FC<AppHeaderProps> = ({
  onThemeToggle,
  isDarkMode,
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src={nikkeyCompleteLogo}
            alt="Nikkey - Absoluto no Combate"
            height={50}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box>
            <CountdownTimer initialMinutes={120} />
          </Box>

          <Tooltip title={isDarkMode ? "Modo Claro" : "Modo Escuro"}>
            <IconButton
              onClick={onThemeToggle}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <IconButton
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Perfil">
            <IconButton sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
