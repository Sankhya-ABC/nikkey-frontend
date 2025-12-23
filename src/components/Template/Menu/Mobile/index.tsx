import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router";

import { useAuth } from "../../../../hooks/useAuth";
import { useTheme } from "../../../../hooks/useTheme";

import { ROUTES } from "../../../../routes";
import { CountdownTimer } from "../../../CountdownTimer";
import { ThemeMode } from "../../tokens";
import nikkeyNameLogo from "/nikkey-name-logo.png";

import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "../components/Avatar";

const pages = ["Products", "Pricing", "Blog"];

export const MenuMobile = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

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
              title={
                themeMode === ThemeMode.DARK ? "Modo Claro" : "Modo Escuro"
              }
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
        )}
      </Toolbar>
    </AppBar>
  );
};
