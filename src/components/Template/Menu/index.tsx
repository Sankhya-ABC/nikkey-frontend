import React from "react";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTheme } from "../../../hooks/useTheme";
import { AppBar } from "./styles";

import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import { CountdownTimer } from "../../CountdownTimer";
import { ThemeMode } from "../tokens";

export const Menu: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { isDrawerOpen } = useDrawer();

  return (
    <AppBar position="fixed" open={isDrawerOpen}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box>
            <CountdownTimer initialMinutes={120} />
          </Box>

          <Tooltip
            title={themeMode === ThemeMode.DARK ? "Modo Claro" : "Modo Escuro"}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: ({ palette }) => palette.text.primary,
                "&:hover": {
                  backgroundColor: ({ palette }) => palette.action.hover,
                },
              }}
            >
              {themeMode === ThemeMode.DARK ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <IconButton
              sx={{
                color: ({ palette }) => palette.text.primary,
                "&:hover": {
                  backgroundColor: ({ palette }) => palette.action.hover,
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
                  backgroundColor: ({ palette }) => palette.primary.main,
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
