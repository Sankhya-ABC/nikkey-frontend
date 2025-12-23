import {
  Avatar as AvatarUI,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";

import { useTheme as useHookTheme } from "@/hooks/useTheme";
import { useAuth } from "../../../../hooks/useAuth";
import { ThemeMode } from "../../tokens";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { CountdownTimer } from "@/components/CountdownTimer";

export const Avatar = () => {
  // hooks
  const { logout, getUser, isImpersonating } = useAuth();
  const { themeMode, toggleTheme } = useHookTheme();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  // mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // varibales
  const userName = getUser()?.nome;

  // handlers
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // data
  const options = [
    {
      title: "Logout",
      callback: () => logout(),
    },
    ...(isMobile
      ? [
          {
            title: "Configurações",
          },
          {
            title: (
              <Box sx={{ display: "flex", gap: 1 }}>
                <span>{`Alterar tema`}</span>
                {themeMode === ThemeMode.DARK ? (
                  <Brightness7Icon />
                ) : (
                  <NightlightIcon />
                )}
              </Box>
            ),
            callback: () => toggleTheme(),
          },
          {
            title: (
              <Box>
                <Typography variant="subtitle2" color="textSecondary" mb={0.5}>
                  Tempo Restante de Sessão
                </Typography>
                <CountdownTimer />
              </Box>
            ),
            divider: true,
          },
        ]
      : []),
  ];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Conta">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AvatarUI
            alt={userName}
            sx={{ background: isImpersonating() ? "orange" : "gray" }}
          >
            {userName?.substring(0, 2)?.toUpperCase()}
          </AvatarUI>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {options.map(({ title, callback = () => null, divider }, index) => (
          <>
            {divider && <Divider />}
            <MenuItem
              key={index}
              onClick={() => {
                callback();
                handleCloseUserMenu();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>{title}</Typography>
            </MenuItem>
          </>
        ))}
      </Menu>
    </Box>
  );
};
