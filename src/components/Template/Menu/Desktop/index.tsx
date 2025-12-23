import { Settings as SettingsIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router";

import { useAuth } from "../../../../hooks/useAuth";
import { useTheme } from "../../../../hooks/useTheme";

import { ROUTES } from "../../../../routes";
import { CountdownTimer } from "../../../CountdownTimer";
import { ThemeMode } from "../../tokens";
import nikkeyNameLogo from "/nikkey-name-logo.png";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Avatar } from "../components/Avatar";
import { MenuContainer } from "../components/MenuContainer";

export const MenuDesktop: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <MenuContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Link
          to={ROUTES.HOME}
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

      {isAuthenticated() && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 4 }}>
            <CountdownTimer />
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
                <Brightness7Icon />
              ) : (
                <NightlightIcon />
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
      )}
    </MenuContainer>
  );
};
