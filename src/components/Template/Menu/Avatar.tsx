import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Avatar as AvatarUI,
} from "@mui/material";
import * as React from "react";
import { useAuth } from "../../../hooks/useAuth";

export const Avatar = () => {
  const { logout } = useAuth();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const perfil = [
    {
      name: "Logout",
      callback: () => logout(),
    },
  ];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Conta">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AvatarUI alt="Amanda Souza" src="/static/images/avatar/2.jpg">
            AS
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
        {perfil.map(({ name, callback }) => (
          <MenuItem
            key={name}
            onClick={() => {
              callback();
              handleCloseUserMenu();
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
