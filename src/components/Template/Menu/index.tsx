import React from "react";
import { useDrawer } from "../../../hooks/useDrawer";
import { useTheme } from "../../../hooks/useTheme";
import { AppBar } from "./styles";

import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import { Link } from "react-router";
import { CountdownTimer } from "../../CountdownTimer";
import { ThemeMode } from "../tokens";
import nikkeyNameLogo from "/nikkey-name-logo.png";
import { Avatar } from "./Avatar";

export const Menu: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { isDrawerOpen } = useDrawer();

  return (
    <AppBar position="fixed" open={isDrawerOpen}>
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={nikkeyNameLogo}
              alt="Nikkey - Absoluto no Combate"
              height={30}
            />
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 4 }}>
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

          <Box sx={{ ml: 1.5 }}>
            <Avatar />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
